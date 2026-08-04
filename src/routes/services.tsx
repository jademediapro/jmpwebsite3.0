import { absoluteUrl } from "@/lib/seo";
import en from "@/i18n/locales/en.json";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { ServicesHero } from "@/components/services/ServicesHero";
import { WhatWeDoBest } from "@/components/services/WhatWeDoBest";
import { ElevateBrand } from "@/components/services/ElevateBrand";
import { ServicesFaq } from "@/components/services/ServicesFaq";
import { ProjectsCta } from "@/components/services/ProjectsCta";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — JadeMediaPro" },
      {
        name: "description",
        content:
          "Branding, design, web development and digital strategy services that elevate brands and win attention.",
      },
      { property: "og:title", content: "Services — JadeMediaPro" },
      {
        property: "og:description",
        content: "We don't just offer services, we build brands that actually win.",
      },
      { property: "og:url", content: absoluteUrl("/services") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/services") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: (en.services.faq.items as { q: string; a: string }[]).map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }),
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header variant="light" active="Services" ctaLabel="Start Free" />
      <ServicesHero />
      <WhatWeDoBest />
      <ElevateBrand />
      <ServicesFaq />
      <ProjectsCta />
      <Footer />
    </main>
  );
}
