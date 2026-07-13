import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — JadeMediaPro" },
      {
        name: "description",
        content:
          "General Terms and Conditions governing your engagement with JadeMediaPro.",
      },
      { property: "og:title", content: "Terms & Conditions — JadeMediaPro" },
      {
        property: "og:description",
        content: "Our framework of professional excellence — read carefully.",
      },
    ],
  }),
  component: TermsPage,
});

const sections = [
  {
    n: "01",
    title: "Engagement",
    body: [
      "JadeMediaPro (\"the Agency\") agrees to provide digital content production, cinematic storytelling, and consulting services as specified in the agreed project proposal or Statement of Work (SOW).",
      "The Client agrees to provide all necessary information, assets, and approvals required for the Agency to perform its duties efficiently.",
    ],
  },
  {
    n: "02",
    title: "Deliverables",
    body: [
      "The Agency shall deliver the project components as defined in the SOW. Any changes to the scope of work must be agreed upon in writing and may incur additional fees.",
      "Timelines provided are estimates based on prompt client feedback. The Agency is not liable for delays caused by third parties or pending client approvals.",
    ],
  },
  {
    n: "03",
    title: "Fees & Payment",
    body: [
      "Clients agree to pay the fees set out in the SOW. A non-refundable commencement deposit is typically required before work begins.",
      "Final deliverables will be released only upon receipt of full payment. Late payments may attract interest or suspension of services.",
    ],
  },
  {
    n: "04",
    title: "Intellectual Property",
    body: [
      "Upon full payment, ownership of final deliverables is transferred to the Client. However, the Agency retains ownership of all preliminary sketches, unselected drafts, and proprietary processes.",
      "The Agency reserves the right to showcase the final work in its professional portfolio and showreels for promotional purposes, unless restricted by a specific Non-Disclosure Agreement (NDA).",
    ],
  },
  {
    n: "05",
    title: "Confidentiality",
    body: [
      "Both parties agree to protect and keep confidential any sensitive business information shared during the course of the engagement.",
    ],
  },
  {
    n: "06",
    title: "Limitation of Liability",
    body: [
      "JadeMediaPro shall not be liable for any indirect, incidental, or consequential damages. Our total liability for any project shall not exceed the total amount paid for that specific project.",
    ],
  },
  {
    n: "07",
    title: "Termination",
    body: [
      "Either party may terminate the agreement with written notice if the other party breaches these terms. Upon termination, the Client shall pay for all work completed up to the date of termination.",
    ],
  },
  {
    n: "08",
    title: "Governing Law",
    body: [
      "These terms are governed by the laws of the Federal Republic of Nigeria. Any disputes shall be settled in the competent courts of Lagos State.",
    ],
  },
  {
    n: "09",
    title: "Contact Us",
    body: ["For any inquiries regarding these terms, please contact our legal desk."],
    isContact: true,
  },
];

function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header variant="light" active="" ctaLabel="Start Here" />

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-12 md:pt-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-purple-deep/70">
            <span className="h-px w-8 bg-brand-purple-deep/40" />
            Legal Document
          </p>
          <div className="relative">
            <h1 className="font-display text-5xl font-extrabold leading-[1.05] text-brand-purple-deep md:text-7xl">
              General Terms and<br />Conditions for Services
            </h1>
            <span
              aria-hidden
              className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none font-display text-[10rem] font-extrabold leading-none text-brand-purple-deep/[0.05] md:text-[16rem]"
            >
              TERMS
            </span>
          </div>
          <p className="mt-6 max-w-2xl text-sm text-brand-purple-deep/70 md:text-base">
            These Terms and Conditions govern your engagement with JadeMediaPro.
            Please read them carefully to understand our framework of professional
            excellence.
          </p>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-teal-deep">
            Last Updated: October 24, 2024
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="px-4 py-14">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[260px_1fr]">
          {/* Sidebar nav */}
          <aside className="md:sticky md:top-6 md:self-start">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-purple-deep/70">
              Navigation
            </p>
            <ul className="space-y-2 border-l border-brand-purple-deep/10 pl-4">
              {sections.map((s) => (
                <li key={s.n}>
                  <a
                    href={`#section-${s.n}`}
                    className="block py-1 text-xs text-brand-purple-deep/80 transition hover:text-brand-purple-deep"
                  >
                    {s.n}. {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Content */}
          <div className="space-y-14">
            {sections.map((s) => (
              <article key={s.n} id={`section-${s.n}`}>
                <h2 className="font-display text-3xl font-extrabold text-brand-purple-deep md:text-4xl">
                  {s.n}. {s.title}
                </h2>
                <div className="mt-2 h-px w-full bg-brand-purple-deep/10" />
                <div className="mt-6 space-y-4 text-sm leading-relaxed text-brand-purple-deep/80 md:text-base">
                  {s.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                {s.isContact && (
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-3 rounded-xl border border-brand-purple-deep/10 bg-surface px-5 py-4">
                      <Mail size={16} className="mt-1 text-brand-teal-deep" />
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-teal-deep">
                          Email
                        </p>
                        <p className="mt-1 text-sm text-brand-purple-deep">
                          legal@jademediapro.com
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl border border-brand-purple-deep/10 bg-surface px-5 py-4">
                      <MapPin size={16} className="mt-1 text-brand-teal-deep" />
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-teal-deep">
                          Studio
                        </p>
                        <p className="mt-1 text-sm text-brand-purple-deep">
                          Victoria Island, Lagos, Nigeria
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
