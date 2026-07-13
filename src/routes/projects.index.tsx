import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { CtaBanner } from "@/components/landing/CtaBanner";
import { ProjectsHero } from "@/components/projects/ProjectsHero";
import { VideoShowreel } from "@/components/projects/VideoShowreel";
import { MoreProjects } from "@/components/projects/MoreProjects";
import { ProjectsFeedback } from "@/components/projects/ProjectsFeedback";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — JadeMediaPro" },
      {
        name: "description",
        content:
          "A unique journey for every client — explore branding, design, and motion case studies from JadeMediaPro.",
      },
      { property: "og:title", content: "Projects — JadeMediaPro" },
      {
        property: "og:description",
        content: "Branding, print and digital case studies that define modern brands.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header variant="light" active="Projects" ctaLabel="Start Free" />
      <ProjectsHero />
      <VideoShowreel />
      <MoreProjects />
      <ProjectsFeedback />
      <CtaBanner />
      <Footer />
    </main>
  );
}
