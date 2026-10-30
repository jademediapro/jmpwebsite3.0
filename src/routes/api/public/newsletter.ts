import { createFileRoute } from "@tanstack/react-router";
import { newsletterSchema } from "@/lib/newsletter";
import { getEmailConfig } from "@/lib/email/config";
import { addAudienceContact, sendEmail } from "@/lib/email/resend.server";
import { newsletterNotification, newsletterWelcome } from "@/lib/email/templates";

export const Route = createFileRoute("/api/public/newsletter")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const parsed = newsletterSchema.safeParse(await request.json());
          if (!parsed.success) {
            return Response.json({ ok: false, error: "invalid_input" }, { status: 400 });
          }

          const email = parsed.data.email.toLowerCase();
          const source = parsed.data.source ?? "footer";
          const review = "website" in parsed.data ? parsed.data : undefined;
          const config = getEmailConfig();

          // Store the subscriber in the Resend Audience (also handles duplicates).
          const result = await addAudienceContact(email, config, review?.name);
          if (result === "error") throw new Error("subscriber_storage_failed");
          if (result === "duplicate" && !review) {
            return Response.json({ ok: true, duplicate: true });
          }

          // Notify the team.
          const notification = newsletterNotification(config.siteName, email, source, review);
          const sent = await sendEmail({ ...notification, config });
          if (!sent.ok) throw new Error("notification_failed");

          // Welcome the subscriber (best effort).
          const welcome = newsletterWelcome(config.siteName, review);
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
