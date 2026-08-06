/**
 * Plain-HTML email templates (no dependencies, inline styles only).
 * CHANGE ME per project: colors and wording below.
 */

const BRAND_COLOR = "#2B1A4A"; // deep purple
const ACCENT_COLOR = "#12B78B"; // teal

export function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}

function layout(siteName: string, title: string, inner: string): string {
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f5f5f7;font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;">
    <div style="background:${BRAND_COLOR};padding:20px 24px;">
      <p style="margin:0;color:#ffffff;font-size:16px;font-weight:bold;">${escapeHtml(siteName)}</p>
    </div>
    <div style="padding:24px;">
      <h1 style="margin:0 0 16px;font-size:18px;color:${BRAND_COLOR};">${escapeHtml(title)}</h1>
      ${inner}
    </div>
    <div style="padding:16px 24px;border-top:1px solid #ececec;font-size:12px;color:#777;">
      Sent automatically by the ${escapeHtml(siteName)} website.
    </div>
  </div>
</body></html>`;
}

function row(label: string, value: string): string {
  return `<p style="margin:0 0 10px;font-size:14px;line-height:1.5;">
    <strong style="color:${BRAND_COLOR};">${escapeHtml(label)}:</strong> ${value}
  </p>`;
}

export type ContactSubmission = {
  name: string;
  email: string;
  location: string;
  category: string;
  service: string;
  availability: string;
  budget: string;
  message: string;
};

/** Internal notification sent to the team when the contact form is submitted. */
export function contactNotification(siteName: string, d: ContactSubmission) {
  const html = layout(
    siteName,
    "New contact form submission",
    [
      row("Name", escapeHtml(d.name)),
      row("Email", `<a href="mailto:${escapeHtml(d.email)}">${escapeHtml(d.email)}</a>`),
      row("Location", escapeHtml(d.location)),
      row("Category", escapeHtml(d.category)),
      row("Service", escapeHtml(d.service)),
      row("Availability", escapeHtml(d.availability)),
      row("Budget", escapeHtml(d.budget)),
      row("Message", `<br/>${escapeHtml(d.message).replace(/\n/g, "<br/>")}`),
      row("Received", escapeHtml(new Date().toUTCString())),
    ].join(""),
  );

  return { subject: `New contact form submission from ${d.name}`, html };
}

/** Auto-reply sent to the person who submitted the contact form. */
export function contactAutoReply(siteName: string, d: ContactSubmission) {
  const html = layout(
    siteName,
    `Thanks for reaching out, ${d.name}`,
    `<p style="font-size:14px;line-height:1.6;margin:0 0 12px;">
       We received your message and a member of our team will get back to you within one business day.
     </p>
     <p style="font-size:14px;line-height:1.6;margin:0 0 12px;color:#555;">
       <strong style="color:${ACCENT_COLOR};">Your message:</strong><br/>
       ${escapeHtml(d.message).replace(/\n/g, "<br/>")}
     </p>`,
  );

  return { subject: `We received your message — ${siteName}`, html };
}

/** Internal notification for a new newsletter subscriber. */
export function newsletterNotification(siteName: string, email: string, source: string) {
  const html = layout(
    siteName,
    "New newsletter subscriber",
    row("Email", escapeHtml(email)) +
      row("Source", escapeHtml(source)) +
      row("Received", escapeHtml(new Date().toUTCString())),
  );

  return { subject: `New newsletter subscriber: ${email}`, html };
}

/** Welcome email sent to a new newsletter subscriber. */
export function newsletterWelcome(siteName: string) {
  const html = layout(
    siteName,
    `Welcome to the ${siteName} newsletter`,
    `<p style="font-size:14px;line-height:1.6;margin:0;">
       Thanks for subscribing. You'll receive our latest insights, case studies and updates —
       no spam, unsubscribe any time.
     </p>`,
  );

  return { subject: `Welcome to the ${siteName} newsletter`, html };
}
