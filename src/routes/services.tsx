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
