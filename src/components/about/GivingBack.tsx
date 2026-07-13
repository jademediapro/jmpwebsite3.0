import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import weCare from "@/assets/we-care.jpg";

export function GivingBack() {
  const { t } = useTranslation();
  return (
    <section className="px-4 py-6">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-brand-teal px-6 pb-6 pt-8 md:px-10 md:pb-10 md:pt-10">
        <div className="grid gap-4 md:grid-cols-2 md:items-start">
          <h2 className="whitespace-pre-line font-display text-2xl font-extrabold leading-tight text-brand-purple-deep md:text-3xl">
            {t("about.giving.title")}
          </h2>
          <p className="text-xs text-brand-purple-deep/80 md:text-right md:text-sm">
            {t("about.giving.sub")}
          </p>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-2xl">
          <img
            src={weCare}
            alt="WE CARE tote bag — community initiative"
            loading="lazy"
            width={1280}
            height={720}
            className="h-72 w-full object-cover md:h-[420px]"
          />
          <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[10px] font-semibold text-brand-purple-deep shadow-sm">
            {t("about.giving.partnership")}
          </span>
          <a
            href="https://vimeo.com/691920808?fl=pl&fe=sh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Explore more on Vimeo"
            className="absolute right-4 top-4 grid h-16 w-16 place-items-center rounded-full bg-brand-purple-deep text-white transition hover:scale-105"
          >
            <ArrowUpRight size={20} />
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-[spin_18s_linear_infinite]">
              <defs>
                <path id="circle-text" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
              </defs>
              <text fill="white" fontSize="9" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="2">
                <textPath href="#circle-text">{t("about.giving.explore")}</textPath>
              </text>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
