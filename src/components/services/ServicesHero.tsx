import { useTranslation } from "react-i18next";
import heroImg from "@/assets/services-hero.jpg";

export function ServicesHero() {
  const { t } = useTranslation();
  return (
    <section className="px-4 pt-6">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-surface p-6 md:p-10">
        <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] text-brand-purple md:text-6xl">
              {t("services.hero.titlePart1")}{" "}
              <span className="bg-brand-teal/70 px-1 py-0.5 box-decoration-clone">
                {t("services.hero.titleHighlight")}
              </span>{" "}
              {t("services.hero.titlePart2")}
            </h1>
            <p className="mt-5 max-w-md text-sm text-brand-purple-deep/70">
              {t("services.hero.sub")}
            </p>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[1.75rem]">
              <img
                src={heroImg}
                alt="Team collaborating around a meeting table"
                width={1280}
                height={896}
                className="h-64 w-full object-cover md:h-80"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
