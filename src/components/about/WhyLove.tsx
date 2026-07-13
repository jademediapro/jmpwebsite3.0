import { useTranslation } from "react-i18next";

export function WhyLove() {
  const { t } = useTranslation();
  const items = t("about.why.items", { returnObjects: true }) as { title: string; body: string }[];

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-surface px-6 py-12 md:px-12 md:py-16">
        <div className="text-center">
          <h2 className="font-display text-2xl font-extrabold text-brand-purple md:text-3xl">
            {t("about.why.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-xs text-foreground/70 md:text-sm">
            {t("about.why.sub")}
          </p>
        </div>

        <div className="relative mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
          {items.map((it, i) => {
            const n = String(i + 1).padStart(2, "0");
            return (
              <div
                key={i}
                className="group relative rounded-2xl border border-brand-purple/15 bg-background px-6 pb-6 pt-10 text-center text-foreground shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand-green/30 hover:bg-brand-green hover:text-white hover:shadow-xl"
              >
                <span
                  className="absolute -top-6 left-1/2 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full bg-background font-display text-sm font-bold text-foreground ring-1 ring-brand-purple/15 transition-all duration-300 ease-out group-hover:bg-brand-green group-hover:text-white group-hover:ring-4 group-hover:ring-surface"
                >
                  {n}
                </span>
                <h3 className="font-display text-sm font-bold text-brand-purple transition-colors duration-300 group-hover:text-white">
                  {it.title}
                </h3>
                <p className="mt-2 text-[11px] leading-relaxed text-foreground/70 transition-colors duration-300 group-hover:text-white/90">
                  {it.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
