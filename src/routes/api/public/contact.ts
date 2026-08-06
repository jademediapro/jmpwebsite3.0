import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { getEmailConfig } from "@/lib/email/config";
import { sendEmail } from "@/lib/email/resend.server";
import { contactAutoReply, contactNotification } from "@/lib/email/templates";

// Server-side validation — mirrors the client-side schema in src/routes/contact.tsx.
const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  location: z.string().trim().min(2).max(120),
  category: z.string().trim().min(1).max(120),
  service: z.string().trim().min(1).max(120),
  availability: z.string().trim().min(1).max(120),
  budget: z.string().trim().min(1).max(120),
  message: z.string().trim().min(10).max(1000),
});

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const parsed = contactSchema.safeParse(await request.json());
          if (!parsed.success) {
            return Response.json(
              { ok: false, error: "invalid_input", issues: parsed.error.flatten() },
              { status: 400 },
            );
          }

          const data = parsed.data;
          const config = getEmailConfig();

          // 1. Notify the team (must succeed for the submission to count).
          const notification = contactNotification(config.siteName, data);
          const sent = await sendEmail({
            ...notification,
            replyTo: data.email, // replying goes straight back to the visitor
            config,
          });
          if (!sent.ok) throw new Error("notification_failed");

          // 2. Auto-reply to the visitor (best effort — never blocks the response).
          const autoReply = contactAutoReply(config.siteName, data);
          await sendEmail({ ...autoReply, to: [data.email], config }).catch((e) =>
            console.error("contact auto-reply failed", e),
          );

          return Response.json({ ok: true });
        } catch (err) {
          console.error("contact submission failed", err);
          return Response.json({ ok: false, error: "send_failed" }, { status: 500 });
        }
      },
    },
  },
});
