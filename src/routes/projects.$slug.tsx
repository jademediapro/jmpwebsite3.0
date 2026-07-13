import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { CtaBanner } from "@/components/landing/CtaBanner";
import { MoreProjects } from "@/components/projects/MoreProjects";
import { caseStudies, getCaseStudy, type CaseStudy } from "@/data/caseStudies";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const study = getCaseStudy(params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ params, loaderData }) => {
    const study = loaderData?.study;
    if (!study) return {};
    return {
      meta: [
        { title: study.metaTitle.en },
        { name: "description", content: study.metaDescription.en },
        { property: "og:title", content: study.metaTitle.en },
        { property: "og:description", content: study.metaDescription.en },
        { property: "og:url", content: `/projects/${params.slug}` },
        { property: "og:type", content: "article" },
        { property: "og:image", content: study.hero },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: study.hero },
      ],
      links: [{ rel: "canonical", href: `/projects/${params.slug}` }],
    };
  },
  notFoundComponent: () => (
    <main className="min-h-screen bg-background">
      <Header variant="light" active="Projects" />
      <section className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Case study not found</h1>
        <p className="mt-4 text-foreground/70">The project you're looking for may have moved.</p>
        <Link to="/projects" className="mt-6 inline-block text-brand-purple underline">
          Back to Projects
        </Link>
      </section>
      <Footer />
    </main>
  ),
  component: CaseStudyPage,
});

function useLocale(): "en" | "fr" {
  const { i18n } = useTranslation();
  return i18n.language?.startsWith("fr") ? "fr" : "en";
}

function CaseStudyPage() {
  const { study } = Route.useLoaderData();
  return (
    <main className="min-h-screen bg-background">
      <Header variant="light" active="Projects" ctaLabel="Start Here" />
      <CaseHero study={study} />
      <ClientOverview study={study} />
      <ChallengeSolution study={study} />
      {study.gallery && study.gallery.length > 0 ? <GalleryProcess study={study} /> : null}
      <MoreProjects />
      <CtaBanner />
      <Footer />
    </main>
  );
}

function CaseHero({ study }: { study: CaseStudy }) {
  const lang = useLocale();
  return (
    <section className="px-4 pt-6">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[1.75rem]">
          <img
            src={study.hero}
            alt={study.heroAlt[lang]}
            width={1600}
            height={800}
            className="h-56 w-full object-cover md:h-[420px]"
          />
        </div>
        <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-purple">
          {study.subtitle[lang]}
        </p>
        <h1 className="mt-2 font-display text-3xl font-extrabold leading-tight text-foreground md:text-5xl">
          {study.title[lang]}
        </h1>
      </div>
    </section>
  );
}

function ClientOverview({ study }: { study: CaseStudy }) {
  const lang = useLocale();
  const { t } = useTranslation();
  const first = study.sections[0];
  return (
    <section className="px-4 py-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[260px_1fr]">
        <aside className="space-y-6 text-xs">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-purple">
              {t("casestudy.client")}
            </p>
            <p className="mt-2 font-display text-sm font-bold text-foreground">
              {study.client[lang]}
            </p>
            <p className="mt-1 text-foreground/70">{study.location[lang]}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-purple">
              {t("casestudy.expertise")}
            </p>
            <ul className="mt-2 space-y-1 text-foreground/80">
              {study.expertise[lang].map((e) => (
                <li key={e}>• {e}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-purple">
              {t("casestudy.duration")}
            </p>
            <p className="mt-2 text-foreground/80">{study.duration[lang]}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-purple">
              Scope
            </p>
            <ul className="mt-2 space-y-1 text-foreground/80">
              {study.scope[lang].map((s) => (
                <li key={s}>• {s}</li>
              ))}
            </ul>
          </div>
        </aside>

        <div>
          <p className="max-w-2xl text-sm leading-relaxed text-foreground/75 md:text-base">
            {study.overview[lang]}
          </p>

          {first?.image ? (
            <div className="mt-6 overflow-hidden rounded-2xl bg-foreground/5">
              <img
                src={first.image}
                alt={first.imageAlt?.[lang] ?? study.heroAlt[lang]}
                loading="lazy"
                className="h-64 w-full object-cover md:h-96"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ChallengeSolution({ study }: { study: CaseStudy }) {
  const lang = useLocale();
  const { t } = useTranslation();
  // Skip the first section here since it appears alongside the overview image.
  const rest = study.sections.slice(1);
  return (
    <section className="bg-surface px-4 py-14">
      <div className="mx-auto max-w-7xl">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-purple">
          {t("casestudy.challengeLabel")}
        </p>
        <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
          {study.sections[0]?.label[lang] ?? t("casestudy.challengeTitle")}
        </h2>
        <div className="mt-6 grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <p className="max-w-md text-sm leading-relaxed text-foreground/75">
              {study.sections[0]?.body[lang]}
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-purple hover:opacity-80"
            >
              {t("casestudy.readReport")} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="relative">
            <div className="rounded-2xl bg-background p-6 shadow-lg">
              <div className="flex items-start gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-teal/30 text-brand-purple-deep">
                  <TrendingUp size={14} />
                </span>
                <div>
                  <p className="font-display text-2xl font-extrabold text-brand-purple">
                    {study.metricValue}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {study.metricLabel[lang]}
                  </p>
                  <p className="mt-1 text-xs text-foreground/60">{study.metricSub[lang]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {rest.length > 0 ? (
          <div className="mt-14 space-y-14">
            {rest.map((sec, i) => (
              <div
                key={sec.label[lang]}
                className={"grid gap-8 md:grid-cols-2 md:items-center " + (i % 2 === 1 ? "md:[&>*:first-child]:order-2" : "")}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-purple">
                    {sec.label[lang]}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-extrabold text-foreground md:text-2xl">
                    {sec.label[lang]}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                    {sec.body[lang]}
                  </p>
                </div>
                {sec.image ? (
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={sec.image}
                      alt={sec.imageAlt?.[lang] ?? sec.label[lang]}
                      loading="lazy"
                      className="h-64 w-full object-cover md:h-80"
                    />
                  </div>
                ) : (
                  <div className="hidden md:block" />
                )}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function GalleryProcess({ study }: { study: CaseStudy }) {
  const lang = useLocale();
  const { t } = useTranslation();
  const gallery = study.gallery ?? [];
  return (
    <section className="bg-surface px-4 pb-14 pt-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-purple">
              {t("casestudy.visualLabel")}
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
              {t("casestudy.galleryTitle")}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-foreground/75 md:justify-self-end">
            {t("casestudy.gallerySub")}
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((g, i) => (
            <div key={i} className="overflow-hidden rounded-2xl">
              <img
                src={g.image}
                alt={g.alt[lang]}
                loading="lazy"
                className="h-64 w-full object-cover md:h-72"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Silence unused warning in case future maintenance needs the full list.
void caseStudies;
