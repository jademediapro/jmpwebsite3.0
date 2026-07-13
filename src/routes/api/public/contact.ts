import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { appendSubmissionRow, sendNotificationEmail } from "@/lib/submissions.server";

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

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
          const body = await request.json();
          const parsed = contactSchema.safeParse(body);
          if (!parsed.success) {
            return Response.json(
              { ok: false, error: "invalid_input", issues: parsed.error.flatten() },
              { status: 400 },
            );
          }
          const d = parsed.data;
          await appendSubmissionRow("Contact!A:I", [
            new Date().toISOString(),
            d.name,
            d.email,
            d.location,
            d.category,
            d.service,
            d.availability,
            d.budget,
            d.message,
          ]);

          sendNotificationEmail(
            `New contact form submission from ${d.name}`,
            `<h2>New Contact Form Submission</h2>
             <p><strong>Name:</strong> ${escapeHtml(d.name)}</p>
             <p><strong>Email:</strong> ${escapeHtml(d.email)}</p>
             <p><strong>Location:</strong> ${escapeHtml(d.location)}</p>
             <p><strong>Category:</strong> ${escapeHtml(d.category)}</p>
             <p><strong>Service:</strong> ${escapeHtml(d.service)}</p>
             <p><strong>Availability:</strong> ${escapeHtml(d.availability)}</p>
             <p><strong>Budget:</strong> ${escapeHtml(d.budget)}</p>
             <p><strong>Message:</strong><br/>${escapeHtml(d.message).replace(/\n/g, "<br/>")}</p>
             <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>`,
          ).catch((e) => console.error("notify failed", e));

          return Response.json({ ok: true });
        } catch (err) {
          console.error("contact submission failed", err);
          return Response.json({ ok: false, error: "send_failed" }, { status: 500 });
        }
      },
    },
  },
});
