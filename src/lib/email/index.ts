/**
 * Self-contained Resend email integration.
 *
 * Everything in this folder is framework-agnostic except for the
 * `process.env` reads in `config.ts`. The helpers use only the standard
 * `fetch` API and plain HTML, so they work in Node, Cloudflare Workers,
 * Deno, or any edge runtime.
 *
 * To reuse in another project, copy the entire `src/lib/email/` folder,
 * set the environment variables documented in `config.ts` (and README.md),
 * and wire the two server routes from `src/routes/api/public/`.
 */

export { getEmailConfig, type EmailConfig } from "./config";
export { sendEmail, addAudienceContact, type SendEmailInput } from "./resend.server";
export {
  contactNotification,
  contactAutoReply,
  newsletterNotification,
  newsletterWelcome,
  escapeHtml,
  type ContactSubmission,
} from "./templates";
