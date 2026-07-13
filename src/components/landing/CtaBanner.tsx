import { useTranslation } from "react-i18next";

export function CtaBanner() {
  const { t } = useTranslation();
  return (
    <section className="px-4 py-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-brand-teal p-8 md:p-14">
        <div className="relative z-10 max-w-2xl">
          <div className="font-display text-5xl leading-none text-white">“</div>
          <h2 className="mt-2 whitespace-pre-line font-display text-3xl font-bold leading-tight text-white md:text-5xl">
            {t("home.cta.title")}
          </h2>
          <p className="mt-4 max-w-md text-sm text-white/80">
            {t("home.cta.sub")}
          </p>
        </div>

        <a
          href="/contact"
          className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-purple-deep shadow-md md:inline-block"
        >
          {t("home.cta.button")}
        </a>
        <a
          href="/contact"
          className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-purple-deep shadow-md md:hidden"
        >
          {t("home.cta.button")}
        </a>

        <svg
          viewBox="0 0 400 400"
          aria-hidden
          className="absolute -right-10 -top-6 h-[120%] w-auto text-brand-purple/70"
          fill="none"
          stroke="currentColor"
          strokeWidth="22"
          strokeLinecap="round"
        >
          <path d="M200 320 C 80 240, 60 130, 140 100 C 190 85, 200 140, 200 170 C 200 140, 210 85, 260 100 C 340 130, 320 240, 200 320 Z" />
          <path d="M120 200 C 100 180, 110 150, 140 150" />
        </svg>
      </div>
    </section>
  );
}
