import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { WhyLove } from "@/components/about/WhyLove";
import { GivingBack } from "@/components/about/GivingBack";
import { ProjectsFeedback } from "@/components/projects/ProjectsFeedback";
import { ProjectsCta } from "@/components/services/ProjectsCta";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — JadeMediaPro" },
      {
        name: "description",
        content:
          "We're not just an agency, we're your creative partner. Discover our mission, vision and values.",
      },
      { property: "og:title", content: "About — JadeMediaPro" },
      {
        property: "og:description",
        content: "Our identity, mission, vision, and how we give back to the community.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header variant="light" active="About" ctaLabel="Start Here" />
      <AboutHero />
      <WhyLove />
      <GivingBack />
      <ProjectsFeedback />
      <ProjectsCta />
      <Footer />
    </main>
  );
}
