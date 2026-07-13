import { useTranslation } from "react-i18next";
import heroImg from "@/assets/hero-team.jpg";
import { FlipWord } from "./FlipWord";

export function Hero() {
  const { t } = useTranslation();
  const chips = [
    t("hero.chips.branding"),
    t("hero.chips.coding"),
    t("hero.chips.marketing"),
    t("hero.chips.fullStack"),
    t("hero.chips.audience"),
  ];

  return (
    <section className="bg-brand-purple-deep px-4 pb-12 pt-6 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
          <h1 className="font-display text-4xl font-bold leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            <span className="block whitespace-nowrap">{t("hero.title")}</span>
            <span className="mt-1 block whitespace-nowrap">
              {t("hero.in")} <FlipWord />
            </span>
          </h1>
          <p className="max-w-xs justify-self-end text-sm text-white/70 md:text-base">
            {t("hero.tagline")}
          </p>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-3xl">
          <img
            src={heroImg}
            alt="Creative team working at a digital agency in Montréal"
            width={1280}
            height={768}
            className="h-[280px] w-full object-cover md:h-[440px]"
          />
          <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2 md:inset-x-6 md:bottom-6">
            {chips.map((c) => (
              <span
                key={c}
                className="rounded-full border border-white/30 bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
