import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — JadeMediaPro" },
      {
        name: "description",
        content:
          "How JadeMediaPro collects, uses, and protects your personal information.",
      },
      { property: "og:title", content: "Privacy Policy — JadeMediaPro" },
      {
        property: "og:description",
        content: "Our commitment to protecting your personal information and privacy.",
      },
    ],
  }),
  component: PrivacyPage,
});

const navItems = [
  "Engagement",
  "Deliverables",
  "Fees & Payment",
  "Intellectual Property",
  "Confidentiality",
  "Limitation of Liability",
  "Termination",
  "Governing Law",
  "Contact Us",
];

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header variant="light" active="" ctaLabel="Start Here" />

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-12 md:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="relative border-l-2 border-brand-teal-deep pl-5">
            <h1 className="font-display text-5xl font-extrabold leading-[1.05] text-brand-purple-deep md:text-7xl">
              Privacy Policy
            </h1>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-teal-deep">
              Last Updated: October 24, 2024
            </p>
            <span
              aria-hidden
              className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-display text-[10rem] font-extrabold leading-none text-brand-purple-deep/[0.05] md:text-[18rem]"
            >
              PRIVACY
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="px-4 py-14">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[240px_1fr]">
          {/* Sidebar */}
          <aside className="md:sticky md:top-6 md:self-start">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-teal-deep">
              Navigation
            </p>
            <ul className="space-y-3 text-xs text-brand-purple-deep/80">
              {navItems.map((item, i) => (
                <li key={item}>
                  <a href={`#sec-${i + 1}`} className="hover:text-brand-purple-deep">
                    {String(i + 1).padStart(2, "0")}. {item}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Content */}
          <div className="space-y-12 text-sm leading-relaxed text-brand-purple-deep/80 md:text-base">
            <div className="space-y-4">
              <p>
                Thank you for choosing to be part of our community at JadeMediaPro
                ("Company," "we," "us," or "our"). We are committed to protecting your
                personal information and your right to privacy. If you have any
                questions or concerns about this privacy notice or our practices with
                regard to your personal information, please contact us at
                privacy@jademediapro.com.
              </p>
              <p>
                This privacy notice describes how we might use your information if you:
                Visit our website at{" "}
                <a
                  href="https://www.jademediapro.com"
                  className="text-brand-teal-deep underline underline-offset-2"
                >
                  https://www.jademediapro.com
                </a>{" "}
                or engage with us in other related ways.
              </p>
            </div>

            {/* 01 */}
            <article id="sec-1">
              <h2 className="font-display text-base font-bold text-brand-purple-deep">
                <span className="mr-3 font-display text-2xl font-extrabold text-brand-teal-deep">
                  01
                </span>
                WHAT INFORMATION DO WE COLLECT?
              </h2>
              <div className="mt-2 h-px w-full bg-brand-purple-deep/10" />
              <div className="mt-6 rounded-md border-l-4 border-brand-teal-deep bg-surface px-5 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-teal-deep">
                  In Short
                </p>
                <p className="mt-2 text-sm text-brand-purple-deep/85">
                  We collect personal information that you provide to us such as name,
                  address, contact information, passwords and security data, and payment
                  information.
                </p>
              </div>
              <div className="mt-5 space-y-4">
                <p>
                  We collect personal information that you voluntarily provide to us when
                  you register on the Website, express an interest in obtaining
                  information about us or our products and Services, when you participate
                  in activities on the Website or otherwise when you contact us.
                </p>
                <ul className="space-y-3 pl-4">
                  <li>
                    <strong className="text-brand-purple-deep">
                      Personal Information Provided by You.
                    </strong>{" "}
                    The personal information that we collect depends on the context of
                    your interactions with us and the Website, the choices you make and
                    the products and features you use.
                  </li>
                  <li>
                    <strong className="text-brand-purple-deep">Log and Usage Data.</strong>{" "}
                    Log and usage data is service-related, diagnostic, usage and
                    performance information our servers automatically collect when you
                    access or use our Website and which we record in log files.
                  </li>
                </ul>
              </div>
            </article>

            {/* 02 */}
            <article id="sec-2">
              <h2 className="font-display text-base font-bold text-brand-purple-deep">
                <span className="mr-3 font-display text-2xl font-extrabold text-brand-teal-deep">
                  02
                </span>
                HOW DO WE USE YOUR INFORMATION?
              </h2>
              <div className="mt-2 h-px w-full bg-brand-purple-deep/10" />
              <div className="mt-6 rounded-md border-l-4 border-brand-teal-deep bg-surface px-5 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-teal-deep">
                  In Short
                </p>
                <p className="mt-2 text-sm text-brand-purple-deep/85">
                  We process your information for purposes based on legitimate business
                  interests, the fulfilment of our contract with you, compliance with our
                  legal obligations, and/or your consent.
                </p>
              </div>
              <div className="mt-5 space-y-4">
                <p>
                  We use personal information collected via our Website for a variety of
                  business purposes described below. We process your personal information
                  for these purposes in reliance on our legitimate business interests, in
                  order to enter into or perform a contract with you, with your consent,
                  and/or for compliance with our legal obligations.
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>To facilitate account creation and logon process.</li>
                  <li>To post testimonials.</li>
                  <li>Request feedback.</li>
                  <li>To enable user-to-user communications.</li>
                  <li>To manage user accounts.</li>
                </ul>
              </div>
            </article>

            {/* 12 */}
            <article id="sec-12">
              <h2 className="font-display text-base font-bold text-brand-purple-deep">
                <span className="mr-3 font-display text-2xl font-extrabold text-brand-teal-deep">
                  12
                </span>
                CALIFORNIA RESIDENT RIGHTS
              </h2>
              <div className="mt-2 h-px w-full bg-brand-purple-deep/10" />
              <p className="mt-5">
                California Civil Code Section 1798.83, also known as the "Shine The
                Light" law, permits our users who are California residents to request and
                obtain from us, once a year and free of charge, information about
                categories of personal information (if any) we disclosed to third parties
                for direct marketing purposes.
              </p>
              <div className="mt-6 overflow-hidden rounded-xl border border-brand-purple-deep/10">
                <table className="w-full text-left text-xs md:text-sm">
                  <thead className="bg-surface text-brand-purple-deep">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Category</th>
                      <th className="px-4 py-3 font-semibold">Examples</th>
                      <th className="px-4 py-3 font-semibold">Collected</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-purple-deep/10 text-brand-purple-deep/80">
                    {[
                      [
                        "A. Identifiers",
                        "Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, IP address, email address and account name.",
                        "YES",
                      ],
                      [
                        "B. Personal information categories",
                        "Name, contact information, education, employment, employment history and financial information.",
                        "YES",
                      ],
                      [
                        "C. Protected classification characteristics",
                        "Gender and date of birth.",
                        "NO",
                      ],
                      [
                        "D. Commercial information",
                        "Transaction information, purchase history, financial details and payment information.",
                        "YES",
                      ],
                    ].map(([cat, ex, col]) => (
                      <tr key={cat}>
                        <td className="px-4 py-4 align-top font-medium">{cat}</td>
                        <td className="px-4 py-4 align-top">{ex}</td>
                        <td className="px-4 py-4 align-top font-semibold text-brand-teal-deep">
                          {col}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            {/* 14 */}
            <article id="sec-14">
              <h2 className="font-display text-base font-bold text-brand-purple-deep">
                <span className="mr-3 font-display text-2xl font-extrabold text-brand-teal-deep">
                  14
                </span>
                HOW CAN YOU CONTACT US?
              </h2>
              <div className="mt-2 h-px w-full bg-brand-purple-deep/10" />
              <div className="mt-6 rounded-2xl bg-[#1a1a1a] p-6 text-sm text-white/85 md:p-8">
                <p>
                  If you have questions or comments about this notice, you may email us at
                  privacy@jademediapro.com or by post to:
                </p>
                <div className="mt-5 space-y-1 text-brand-teal">
                  <p>JadeMediaPro</p>
                  <p>123 Cinematic Plaza</p>
                  <p>Los Angeles, CA 90210</p>
                  <p>United States</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
