import { ArrowRight, Award } from "lucide-react";
import { useTranslation } from "react-i18next";
import teamPhoto from "@/assets/about-team.jpg";

export function AboutHero() {
  const { t } = useTranslation();
  return (
    <section className="px-4 pt-4">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem]">
        <div className="relative">
          <img
            src={teamPhoto}
            alt="JadeMediaPro team sitting together outdoors"
            width={1280}
            height={720}
            className="h-72 w-full rounded-[2rem] object-cover md:h-[420px]"
          />
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-7 md:px-14">
            <h1 className="font-display text-5xl font-extrabold leading-none text-white md:text-7xl">
              {t("about.hero.title")}
            </h1>
            <p className="mt-5 max-w-xs text-sm text-white/90 md:text-base">
              {t("about.hero.sub")}
            </p>
          </div>
        </div>

        <div className="relative z-10 -mt-[2.8125rem] grid gap-8 rounded-[2rem] bg-brand-purple px-7 py-10 text-white md:grid-cols-2 md:px-12 md:py-12">
          <div>
            <h2 className="font-display text-xl font-bold leading-snug md:text-2xl">
              {t("about.hero.heading")}
            </h2>
            <p className="mt-4 text-xs leading-relaxed text-white/75">
              {t("about.hero.body")}
            </p>
            <a
              href="https://zcal.co/i/r9qC4iCe"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-teal-deep px-5 py-2.5 text-xs font-semibold text-white"
            >
              {t("about.hero.book")} <ArrowRight size={14} />
            </a>
          </div>

          <div className="space-y-6 md:pl-8">
            <div className="flex gap-4 border-b border-white/20 pb-6">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/30">
                <Award size={18} />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold">{t("about.hero.missionTitle")}</h3>
                <p className="mt-1.5 text-xs text-white/75">
                  {t("about.hero.missionBody")}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/30">
                <Award size={18} />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold">{t("about.hero.visionTitle")}</h3>
                <p className="mt-1.5 text-xs text-white/75">
                  {t("about.hero.visionBody")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
