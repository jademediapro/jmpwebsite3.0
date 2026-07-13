import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, Search, Lightbulb, Palette, Settings, BarChart3 } from "lucide-react";
import research from "@/assets/process-research.jpg";
import ideation from "@/assets/process-ideation.jpg";
import design from "@/assets/process-design.jpg";
import implementation from "@/assets/process-implementation.jpg";
import monitoring from "@/assets/process-monitoring.jpg";

const meta = [
  { Icon: Search, image: research },
  { Icon: Lightbulb, image: ideation },
  { Icon: Palette, image: design },
  { Icon: Settings, image: implementation },
  { Icon: BarChart3, image: monitoring },
];

export function Professional() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const items = t("home.professional.items", { returnObjects: true }) as { title: string; description: string }[];
  const current = items[active];
  const CurIcon = meta[active].Icon;
  const curImage = meta[active].image;

  return (
    <section className="px-4 py-6">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-brand-purple-deep p-6 text-white md:p-12">
        <h2 className="max-w-3xl whitespace-pre-line font-display text-2xl font-bold leading-tight md:text-4xl">
          {t("home.professional.title")}
        </h2>
        <p className="mt-4 max-w-3xl text-sm text-white/70 md:text-base">
          {t("home.professional.intro")}
        </p>

        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <div>
            {items.map((it, i) => {
              const isActive = i === active;
              const Icon = meta[i].Icon;
              return (
                <button
                  key={it.title}
                  onClick={() => setActive(i)}
                  className="block w-full border-b border-white/15 py-5 text-left transition"
                >
                  {isActive ? (
                    <div className="flex items-start gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-md bg-white/10">
                        <Icon size={18} className="text-brand-teal" />
                      </span>
                      <h3 className="font-display text-lg font-bold text-brand-teal">
                        {it.title}
                      </h3>
                    </div>
                  ) : (
                    <span className="font-display text-lg font-medium text-white/90">
                      {it.title}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div>
            <p className="text-sm text-white/70 md:text-base">{current.description}</p>
            <div className="mt-6 overflow-hidden rounded-2xl">
              <img
                src={curImage}
                alt={current.title}
                loading="lazy"
                width={896}
                height={640}
                className="h-56 w-full object-cover md:h-72"
              />
            </div>
            <div className="mt-6 flex justify-end">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-brand-teal px-5 py-2.5 text-sm font-semibold text-brand-purple-deep transition hover:bg-brand-teal/90"
              >
                {t("home.professional.cta")}
                <ArrowRight size={16} />
              </a>
            </div>
            <CurIcon className="hidden" />
          </div>
        </div>
      </div>
    </section>
  );
}
