# Portable Resend Email Integration

A dependency-free, self-contained email layer built on the [Resend](https://resend.com) REST API. It handles contact-form submissions and newsletter signups with server-side validation, HTML templates, and optional audience storage.

## What makes it portable

- **No SDK** — uses the standard `fetch` API.
- **No framework lock-in** — the core helpers work in Node, Cloudflare Workers, Deno, or any edge runtime.
- **No external storage** — subscribers are stored in Resend Audiences (optional). No database required.
- **Single configuration surface** — all required values come from environment variables.

## Files

```text
src/lib/email/
├── config.ts          # Environment-variable loader + types
├── resend.server.ts   # Minimal Resend REST client
├── templates.ts       # Plain-HTML email templates
├── index.ts           # Public barrel export
└── README.md          # This file

src/routes/api/public/
├── contact.ts         # POST /api/public/contact
└── newsletter.ts      # POST /api/public/newsletter
```

## Required environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | Resend API key from https://resend.com/api-keys |
| `RESEND_FROM_EMAIL` | Yes | Verified sender, e.g. `Acme <hello@acme.com>` or just `hello@acme.com` |
| `RESEND_TO_EMAIL` | Yes | Comma-separated list of notification recipients |
| `RESEND_REPLY_TO` | No | Default reply-to address for notification emails |
| `RESEND_AUDIENCE_ID` | No | Resend Audience ID for newsletter subscriber storage |
| `SITE_NAME` | No | Brand name used in email copy. Falls back to `DEFAULT_SITE_NAME` in `config.ts` |

> **Tip:** Set `RESEND_AUDIENCE_ID` to `skip`, `none`, `n/a`, or `-` to disable audience storage while keeping the rest of the integration working.

## How to reuse in another project

1. **Copy the folder**
   Copy `src/lib/email/` into the new project.

2. **Set the environment variables**
   Add the variables above to your hosting platform or `.env` file.

3. **Copy the API routes**
   Copy `src/routes/api/public/contact.ts` and `src/routes/api/public/newsletter.ts` (or adapt them to your framework's routing convention).
   Also copy `src/lib/newsletter.ts`, which contains the shared newsletter/review validation schemas and browser submission helper.

4. **Update defaults in `config.ts` and `templates.ts`**
   - Change `DEFAULT_SITE_NAME` in `config.ts`.
   - Change `BRAND_COLOR` / `ACCENT_COLOR` in `templates.ts` to match the new brand.

5. **Wire up your forms**
   POST JSON to the two routes:

   ```ts
   // Contact form
   await fetch("/api/public/contact", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
       name: "Jane Doe",
       email: "jane@example.com",
       location: "Montréal",
       category: "Branding",
       service: "Brand Strategy",
       availability: "ASAP",
       budget: "$5,000 – $10,000",
       message: "Hi, I'd like to work with you.",
     }),
   });

   // Newsletter signup
   await fetch("/api/public/newsletter", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ email: "jane@example.com", source: "footer" }),
   });
   ```

## Homepage free website reviews

The homepage popup posts to the same newsletter endpoint with `source: "free-website-review"`, `name`, `email`, `website`, and `language` (`en` or `fr`). Name, email, and website are required and validated on both sides. Website addresses without a scheme are normalized to HTTPS.

Review requests include the website, name, and language in the team notification. Existing subscribers can still request a review without subscribing again; their unsubscribed state is preserved. The optional Resend Audience stores the name alongside the email, while the team notification retains the website and preferred language. Ordinary footer subscriptions retain their existing behavior.

The popup confirms receipt only after the team notification is accepted by Resend. A bilingual acknowledgement is sent best-effort using the existing welcome-email helper. The actual review is completed and delivered by the team; no automated review engine is introduced.

## Security notes

- All inputs are validated with [Zod](https://zod.dev) on the server before any external API call.
- HTML output is escaped with a built-in helper — no `dangerouslySetInnerHTML` or raw user HTML is used.
- The Resend API key is read inside request handlers, never at module scope, so it is not exposed to the client bundle.
- For production use, consider adding rate limiting or a honeypot field to protect against abuse.

## Extending

- Add new templates in `templates.ts`.
- Add new routes that call `sendEmail()` from `resend.server.ts`.
- Use `addAudienceContact()` to store contacts in other Resend Audiences.
