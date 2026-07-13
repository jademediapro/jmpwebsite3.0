import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, Palette, Briefcase, Megaphone, Film, Code, Camera } from "lucide-react";
import brandingImg from "@/assets/service-branding-design.jpg";
import strategyImg from "@/assets/service-business-strategy.jpg";
import marketingImg from "@/assets/service-digital-marketing.jpg";
import motionImg from "@/assets/service-motion-graphics.jpg";
import webImg from "@/assets/service-web-mobile.jpg";
import artImg from "@/assets/service-art-photography.jpg";

const meta = [
  { slug: "branding-design", Icon: Palette, image: brandingImg },
  { slug: "business-strategy", Icon: Briefcase, image: strategyImg },
  { slug: "digital-marketing", Icon: Megaphone, image: marketingImg },
  { slug: "motion-graphics-design", Icon: Film, image: motionImg },
  { slug: "web-mobile-app-development", Icon: Code, image: webImg },
  { slug: "art-photography", Icon: Camera, image: artImg },
];

type Item = { title: string; label: string; body: string; tags: string[] };

export function WhatWeDoBest() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(0);
  const items = t("services.what.items", { returnObjects: true }) as Item[];

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-surface p-5 md:p-10">
        <h2 className="text-center font-display text-3xl font-extrabold text-brand-purple md:text-4xl">
          {t("services.what.title")}
        </h2>

        <ul className="mt-8 flex flex-col gap-3">
          {items.map((it, i) => {
            const isOpen = open === i;
            const Icon = meta[i].Icon;
            return (
              <li
                key={meta[i].slug}
                id={meta[i].slug}
                className={
                  "scroll-mt-24 rounded-2xl transition " +
                  (isOpen ? "bg-brand-purple-soft" : "bg-background")
                }
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="flex items-center gap-3 font-display text-base font-bold text-brand-purple-deep md:text-lg">
                    <Icon size={20} className="text-brand-purple-deep" />
                    {it.title}
                  </span>
                  <ChevronDown
                    size={20}
                    className={
                      "text-brand-purple-deep transition " + (isOpen ? "rotate-180" : "")
                    }
                  />
                </button>

                {isOpen && (
                  <div className="grid gap-6 px-5 pb-6 md:grid-cols-[1.2fr_1fr]">
                    <div>
                      <p className="text-xs leading-relaxed text-brand-purple-deep/80">
                        {it.body}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {it.tags.map((tag, k) => (
                          <span
                            key={k}
                            className="inline-flex items-center gap-1 rounded-full border border-brand-purple-deep/15 bg-background/60 px-3 py-1 text-[11px] text-brand-purple-deep"
                          >
                            {tag}
                            <span className="text-brand-purple">✱</span>
                          </span>
                        ))}
                      </div>
                      <a
                        href="/contact"
                        className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-teal-deep px-4 py-2 text-xs font-semibold text-white"
                      >
                        {t("services.what.cta")}
                      </a>
                    </div>
                    <div className="relative overflow-hidden rounded-2xl">
                      <img
                        src={meta[i].image}
                        alt={`${it.title} case study mockups`}
                        loading="lazy"
                        width={896}
                        height={896}
                        className="h-56 w-full object-cover md:h-full"
                      />
                      <span className="absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-background/90 px-3 py-1 text-[11px] font-medium text-brand-purple-deep">
                        {it.label}
                      </span>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
