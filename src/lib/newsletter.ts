import { z } from "zod";

export const websiteAddressSchema = z.string().trim().max(2048).transform((value) =>
  /^https?:\/\//i.test(value) ? value : `https://${value}`,
).pipe(z.string().url().refine((value) => {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) && url.hostname.includes(".") && !url.username && !url.password;
  } catch {
    return false;
  }
}));

const emailSchema = z.string().trim().email().max(255);
const nameSchema = z.string().trim().min(1).max(100);

export const reviewRequestSchema = z.object({
  source: z.literal("free-website-review"),
  name: nameSchema,
  email: emailSchema,
  website: websiteAddressSchema,
  language: z.enum(["en", "fr"]),
});

export const newsletterSchema = z.union([
  reviewRequestSchema,
  z.object({ email: emailSchema, source: z.string().trim().max(120).optional() })
    .refine((data) => data.source !== "free-website-review"),
]);

export async function submitNewsletter(input: z.input<typeof newsletterSchema>) {
  const payload = newsletterSchema.parse(input);
  const response = await fetch("/api/public/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({})) as { ok?: boolean; duplicate?: boolean };
  if (!response.ok || !data.ok) throw new Error("newsletter_submission_failed");
  return data;
}