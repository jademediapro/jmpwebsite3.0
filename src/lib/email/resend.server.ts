/**
 * Minimal, dependency-free Resend client (REST API via fetch).
 *
 * Server-only: never import this from client/browser code.
 * Portable: works in Node, Cloudflare Workers, Deno — no SDK required.
 * Docs: https://resend.com/docs/api-reference/introduction
 */

import { getEmailConfig, type EmailConfig } from "./config";

const RESEND_API_URL = "https://api.resend.com";

type ResendRequest = {
  path: string;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  apiKey: string;
};

async function resendFetch<T>({ path, method = "GET", body, apiKey }: ResendRequest): Promise<{
  ok: boolean;
  status: number;
  data: T | null;
  error: string | null;
}> {
  const res = await fetch(`${RESEND_API_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const text = await res.text();
  let parsed: unknown = null;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    parsed = null;
  }

  if (!res.ok) {
    // Surface the provider status + body so failures are debuggable.
    console.error(`Resend ${method} ${path} failed [${res.status}]: ${text}`);
    return { ok: false, status: res.status, data: null, error: text || res.statusText };
  }

  return { ok: true, status: res.status, data: parsed as T, error: null };
}

export type SendEmailInput = {
  subject: string;
  html: string;
  text?: string;
  /** Defaults to RESEND_TO_EMAIL. */
  to?: string[];
  /** Defaults to RESEND_REPLY_TO. */
  replyTo?: string;
  config?: EmailConfig;
};

/** Shared send helper used by every form on the site. */
export async function sendEmail(input: SendEmailInput): Promise<{ ok: boolean; id?: string }> {
  const config = input.config ?? getEmailConfig();

  const result = await resendFetch<{ id: string }>({
    path: "/emails",
    method: "POST",
    apiKey: config.apiKey,
    body: {
      from: config.from,
      to: input.to ?? config.to,
      subject: input.subject,
      html: input.html,
      ...(input.text ? { text: input.text } : {}),
      ...(input.replyTo ?? config.replyTo ? { reply_to: input.replyTo ?? config.replyTo } : {}),
    },
  });

  return { ok: result.ok, ...(result.data?.id ? { id: result.data.id } : {}) };
}

/**
 * Newsletter storage via Resend Audiences (optional).
 * Returns "created" | "duplicate" | "skipped" (no audience configured) | "error".
 */
export async function addAudienceContact(
  email: string,
  config: EmailConfig = getEmailConfig(),
): Promise<"created" | "duplicate" | "skipped" | "error"> {
  if (!config.audienceId) return "skipped";

  const existing = await resendFetch<{ id: string; unsubscribed: boolean }>({
    path: `/audiences/${config.audienceId}/contacts/${encodeURIComponent(email)}`,
    apiKey: config.apiKey,
  });
  if (existing.ok && existing.data?.id) return "duplicate";

  const created = await resendFetch<{ id: string }>({
    path: `/audiences/${config.audienceId}/contacts`,
    method: "POST",
    apiKey: config.apiKey,
    body: { email, unsubscribed: false },
  });

  return created.ok ? "created" : "error";
}
