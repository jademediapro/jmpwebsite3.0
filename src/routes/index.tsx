import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import homeLogo from "@/assets/jademediapro-logo.svg.asset.json";
import { Hero } from "@/components/landing/Hero";
import { Clients } from "@/components/landing/Clients";
import { Services } from "@/components/landing/Services";
import { Projects } from "@/components/landing/Projects";
import { Professional } from "@/components/landing/Professional";
import { Feedback } from "@/components/landing/Feedback";
import { Posts } from "@/components/landing/Posts";
import { CtaBanner } from "@/components/landing/CtaBanner";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JadeMediaPro — Digital Agency in Montréal" },
      {
        name: "description",
        content:
          "JadeMediaPro is a Montréal digital agency crafting branding, web, and marketing that makes brands shine.",
      },
      { property: "og:title", content: "JadeMediaPro — Digital Agency in Montréal" },
      { property: "og:description", content: "Branding, web, and marketing from Montréal." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <Header logoSrc={homeLogo.url} />
      <Hero />
      <Clients />
      <Services />
      <Projects />
      <Professional />
      <Feedback />
      <Posts />
      <CtaBanner />
      <Footer />
    </main>
  );
}
