import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import johnImg from "@/assets/team-john.jpg";
import ayindeImg from "@/assets/team-ayinde.jpg";
import oluwatobiImg from "@/assets/team-oluwatobi.jpg";
import mubashirImg from "@/assets/team-mubashir.jpg";
import chigozirimImg from "@/assets/team-chigozirim.jpg";
import tolulopeImg from "@/assets/team-tolulope.jpg";
import laptopImg from "@/assets/team-laptop.jpg";
import cansImg from "@/assets/team-cans.jpg";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team — JadeMediaPro" },
      {
        name: "description",
        content:
          "Meet the JadeMediaPro team. We are a team. We love what we do. Simple.",
      },
      { property: "og:title", content: "Our Team — JadeMediaPro" },
      {
        property: "og:description",
        content: "The founders, strategists, designers and engineers behind JadeMediaPro.",
      },
    ],
  }),
  component: TeamPage,
});

type Member = { name: string; roleKey: string; img: string };

const row1: Member[] = [
  { name: "John Ademiluyi", roleKey: "team.members.founder", img: johnImg },
  { name: "Ayinde Aminat", roleKey: "team.members.growth", img: ayindeImg },
  { name: "Oluwatobi Fabusuyi", roleKey: "team.members.designer", img: oluwatobiImg },
  { name: "Mubashir Asiyanbi", roleKey: "team.members.cto", img: mubashirImg },
];

const row2: Member[] = [
  { name: "Chigozirim Amadi", roleKey: "team.members.marketing", img: chigozirimImg },
  { name: "Tolulope Aluko", roleKey: "team.members.sales", img: tolulopeImg },
];

function MemberCard({ m }: { m: Member }) {
  const { t } = useTranslation();
  return (
    <article className="overflow-hidden rounded-2xl bg-background">
      <img
        src={m.img}
        alt={m.name}
        loading="lazy"
        width={768}
        height={1024}
        className="aspect-[3/4] w-full object-cover"
      />
      <div className="px-3 py-4 text-center">
        <h3 className="font-display text-sm font-bold text-brand-purple-deep">{m.name}</h3>
        <p className="mt-1 text-[10px] font-semibold tracking-[0.18em] text-foreground/60">
          {t(m.roleKey)}
        </p>
      </div>
    </article>
  );
}

function TeamPage() {
  const { t } = useTranslation();
  const bullets = t("team.careerBullets", { returnObjects: true }) as string[];

  return (
    <main className="min-h-screen bg-background">
      <Header variant="light" active="About" ctaLabel={t("nav.startHere")} />

      <section className="px-4 pt-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-display text-2xl font-extrabold text-brand-purple-deep md:text-3xl">
            {t("team.title")}
          </h1>

          <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4">
            {row1.map((m) => (
              <MemberCard key={m.name} m={m} />
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 items-center gap-5 md:grid-cols-4">
            <div className="md:col-span-2">
              <h2 className="whitespace-pre-line font-display text-3xl font-extrabold leading-tight text-brand-purple-deep md:text-4xl">
                {t("team.heading")}
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-5 md:col-span-2">
              {row2.map((m) => (
                <MemberCard key={m.name} m={m} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="careers" className="mt-16 bg-surface px-4 py-14">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] font-bold tracking-[0.18em] text-brand-purple-deep">
            {t("team.careerLabel")}
          </p>
          <h2 className="mt-3 font-display text-2xl font-extrabold text-brand-purple-deep md:text-3xl">
            {t("team.careerTitle")}
            <br />
            {t("team.careerTitle2")}{" "}
            <span className="text-brand-teal-deep">{t("team.careerJoin")}</span>
          </h2>

          <div className="mt-8 grid gap-10 md:grid-cols-2">
            <div className="space-y-4 text-xs leading-relaxed text-foreground/75">
              <p>{t("team.careerP1")}</p>
              <p>{t("team.careerP2")}</p>
              <p className="font-bold text-brand-purple-deep">
                {t("team.careerLead")}
              </p>
              <ul className="space-y-2">
                {bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal-deep" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p>{t("team.careerOutro")}</p>
              <Link
                to="/contact"
                className="mt-2 inline-flex items-center gap-2 rounded-full bg-brand-purple px-5 py-2.5 text-xs font-semibold text-white"
              >
                {t("team.apply")} <ArrowRight size={14} />
              </Link>
            </div>
            <div className="overflow-hidden rounded-2xl">
              <img
                src={laptopImg}
                alt="Workstation"
                loading="lazy"
                width={1024}
                height={768}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="mx-auto grid max-w-7xl items-center gap-6 overflow-hidden rounded-[2rem] bg-surface px-7 py-10 md:grid-cols-2 md:px-12">
          <div>
            <h2 className="whitespace-pre-line font-display text-2xl font-extrabold leading-tight text-brand-purple md:text-3xl">
              {t("team.prideTitle")}
            </h2>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-teal-deep px-5 py-2.5 text-xs font-semibold text-white"
            >
              {t("team.prideCta")} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="flex justify-end">
            <img
              src={cansImg}
              alt=""
              loading="lazy"
              width={1024}
              height={768}
              className="h-56 w-auto object-contain md:h-64"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
