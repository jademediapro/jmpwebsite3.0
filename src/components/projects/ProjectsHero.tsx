import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import ariwaHeader from "@/assets/casestudies/ariwa-header.jpg.asset.json";
import coinplayHeader from "@/assets/casestudies/coinplay-header.jpg.asset.json";
import mercedes from "@/assets/proj-mercedes.jpg";

type CardProps = {
  img: string;
  alt: string;
  title: string;
  subtitle: string;
  slug: string;
  ctaLabel: string;
  className?: string;
};

function ProjectCard({ img, alt, title, subtitle, slug, ctaLabel, className }: CardProps) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug }}
      className={"group relative block overflow-hidden rounded-[1.75rem] " + (className ?? "")}
    >
      <img
        src={img}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute right-4 top-4 text-right text-[11px] font-medium leading-tight text-white/90 drop-shadow">
        <div>{title}</div>
        <div>{subtitle}</div>
      </div>
      <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold text-brand-purple-deep shadow-sm transition group-hover:bg-brand-purple-deep group-hover:text-white">
        {ctaLabel} <ArrowUpRight size={12} />
      </span>
    </Link>
  );
}

export function ProjectsHero() {
  const { t } = useTranslation();
  const cta = t("projects.hero.caseStudy");
  return (
    <section className="px-4 pt-6">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-brand-teal/70 p-5 md:p-10">
        <h1 className="text-center font-display text-2xl font-extrabold leading-tight text-foreground md:text-4xl">
          {t("projects.hero.title")}
        </h1>

        <div className="mt-6 grid items-stretch gap-4 md:grid-cols-3 md:min-h-[560px]">
          <ProjectCard
            img={ariwaHeader.url}
            alt="Ariwa Fashion brand identity"
            title="Ariwa Fashion"
            subtitle={t("projects.hero.ariwaSub")}
            slug="ariwa-fashion"
            ctaLabel={cta}
            className="aspect-[3/4] md:aspect-auto md:h-full"
          />

          <div className="flex min-h-0 flex-col gap-4">
            <Link
              to="/process"
              className="flex items-center justify-between gap-2 rounded-full border border-foreground/15 bg-background/40 px-4 py-2 text-[11px] font-semibold text-foreground transition hover:bg-background/70"
            >
              <span className="rounded-full bg-brand-purple-deep px-3 py-1 text-[10px] uppercase tracking-wide text-white">
                {t("projects.hero.process")}
              </span>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-purple-deep text-white">
                <ArrowRight size={12} />
              </span>
            </Link>
            <ProjectCard
              img={coinplayHeader.url}
              alt="Coinplay cryptocurrency brand"
              title="Coinplay.ca"
              subtitle={t("projects.hero.coinplaySub")}
              slug="coinplay"
              ctaLabel={cta}
              className="aspect-[3/4] md:aspect-auto md:flex-1"
            />
          </div>

          <ProjectCard
            img={mercedes}
            alt="Mercedes emblem"
            title="Mercedes"
            subtitle={t("projects.hero.mercedesSub")}
            slug="mercedes"
            ctaLabel={cta}
            className="aspect-[3/4] md:aspect-auto md:h-full"
          />
        </div>
      </div>
    </section>
  );
}
