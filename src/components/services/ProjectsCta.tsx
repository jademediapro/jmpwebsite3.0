import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import cans from "@/assets/services-cans.png";

export function ProjectsCta() {
  const { t } = useTranslation();
  return (
    <section className="px-4 pb-12">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-surface px-6 py-8 md:px-12 md:py-10">
        <div className="grid items-center gap-6 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="whitespace-pre-line font-display text-3xl font-extrabold leading-tight text-brand-purple md:text-4xl">
              {t("services.cta.title")}
            </h2>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-teal-deep px-5 py-2.5 text-xs font-semibold text-white"
            >
              {t("services.cta.button")} <ArrowRight size={14} />
            </Link>
          </div>

          <div className="relative h-44 md:h-56">
            <img
              src={cans}
              alt="Energy drink can product mockup"
              loading="lazy"
              width={896}
              height={640}
              className="absolute inset-0 h-full w-full object-contain object-right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
