import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { appendSubmissionRow, readSubmissionColumn, sendNotificationEmail } from "@/lib/submissions.server";

const schema = z.object({
  email: z.string().trim().email().max(255),
  source: z.string().trim().max(120).optional(),
});

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export const Route = createFileRoute("/api/public/newsletter")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const parsed = schema.safeParse(body);
          if (!parsed.success) {
            return Response.json({ ok: false, error: "invalid_input" }, { status: 400 });
          }
          const email = parsed.data.email.toLowerCase();
          const source = parsed.data.source ?? "footer";

          // Duplicate check
          try {
            const existing = await readSubmissionColumn("Newsletter!B:B");
            if (existing.includes(email)) {
              return Response.json({ ok: true, duplicate: true });
            }
          } catch (err) {
            console.error("duplicate check failed, proceeding", err);
          }

          await appendSubmissionRow("Newsletter!A:C", [
            new Date().toISOString(),
            email,
            source,
          ]);

          // Fire-and-forget notification
          sendNotificationEmail(
            `New newsletter subscriber: ${email}`,
            `<h2>New Newsletter Subscriber</h2>
             <p><strong>Email:</strong> ${escapeHtml(email)}</p>
             <p><strong>Source:</strong> ${escapeHtml(source)}</p>
             <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>`,
          ).catch((e) => console.error("notify failed", e));

          return Response.json({ ok: true });
        } catch (err) {
          console.error("newsletter submission failed", err);
          return Response.json({ ok: false, error: "send_failed" }, { status: 500 });
        }
      },
    },
  },
});
