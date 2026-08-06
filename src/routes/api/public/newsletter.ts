import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { getEmailConfig } from "@/lib/email/config";
import { addAudienceContact, sendEmail } from "@/lib/email/resend.server";
import { newsletterNotification, newsletterWelcome } from "@/lib/email/templates";

const schema = z.object({
  email: z.string().trim().email().max(255),
  source: z.string().trim().max(120).optional(),
});

export const Route = createFileRoute("/api/public/newsletter")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const parsed = schema.safeParse(await request.json());
          if (!parsed.success) {
            return Response.json({ ok: false, error: "invalid_input" }, { status: 400 });
          }

          const email = parsed.data.email.toLowerCase();
          const source = parsed.data.source ?? "footer";
          const config = getEmailConfig();

          // Store the subscriber in the Resend Audience (also handles duplicates).
          const result = await addAudienceContact(email, config);
          if (result === "duplicate") {
            return Response.json({ ok: true, duplicate: true });
          }

          // Notify the team.
          const notification = newsletterNotification(config.siteName, email, source);
          const sent = await sendEmail({ ...notification, config });
          if (!sent.ok) throw new Error("notification_failed");

          // Welcome the subscriber (best effort).
          const welcome = newsletterWelcome(config.siteName);
          await sendEmail({ ...welcome, to: [email], config }).catch((e) =>
            console.error("newsletter welcome failed", e),
          );

          return Response.json({ ok: true });
        } catch (err) {
          console.error("newsletter submission failed", err);
          return Response.json({ ok: false, error: "send_failed" }, { status: 500 });
        }
      },
    },
  },
});
