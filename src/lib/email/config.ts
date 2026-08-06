/**
 * Portable Resend email configuration.
 *
 * REUSE CHECKLIST — when copying this folder into another project, the only
 * things you need to change are the environment variables below:
 *
 *   RESEND_API_KEY       (required) API key from https://resend.com/api-keys
 *   RESEND_FROM_EMAIL    (required) Verified sender, e.g. "Acme <hello@acme.com>"
 *   RESEND_TO_EMAIL      (required) Where form notifications are delivered
 *   RESEND_REPLY_TO      (optional) Reply-To address for notification emails
 *   RESEND_AUDIENCE_ID   (optional) Resend Audience used to store newsletter
 *                        subscribers and detect duplicates. If unset, the
 *                        newsletter still works (notification email only).
 *   SITE_NAME            (optional) Brand name shown in emails. Defaults below.
 *
 * No other project-specific code lives in this folder.
 */

/** Fallback brand name if SITE_NAME is not set. CHANGE ME per project. */
const DEFAULT_SITE_NAME = "JadeMediaPro";

export type EmailConfig = {
  apiKey: string;
  from: string;
  to: string[];
  replyTo?: string;
  audienceId?: string;
  siteName: string;
};

/** Treats empty strings and opt-out placeholders ("skip", "none") as unset. */
function normalizeOptional(value: string | undefined): string | undefined {
  const v = value?.trim();
  if (!v || ["skip", "none", "n/a", "-"].includes(v.toLowerCase())) return undefined;
  return v;
}

/**
 * Reads configuration from the server environment.
 * Must be called inside a request handler (env is injected per request).
 * Throws when required values are missing so failures are loud and obvious.
 */
export function getEmailConfig(): EmailConfig {
  const apiKey = process.env["RESEND_API_KEY"];
  const from = process.env["RESEND_FROM_EMAIL"];
  const to = process.env["RESEND_TO_EMAIL"];

  const missing = [
    !apiKey && "RESEND_API_KEY",
    !from && "RESEND_FROM_EMAIL",
    !to && "RESEND_TO_EMAIL",
  ].filter(Boolean);

  if (missing.length) {
    throw new Error(`Email is not configured. Missing: ${missing.join(", ")}`);
  }

  return {
    apiKey: apiKey!,
    from: from!,
    // Supports a comma-separated list of recipients.
    to: to!
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    replyTo: process.env["RESEND_REPLY_TO"] || undefined,
    // Treat opt-out placeholders as "no audience configured".
    audienceId: normalizeOptional(process.env["RESEND_AUDIENCE_ID"]),
    siteName: process.env["SITE_NAME"] || DEFAULT_SITE_NAME,
  };
}
