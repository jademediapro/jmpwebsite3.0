import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import whiteboard from "@/assets/whiteboard-hand.jpg";
import manLaptop from "@/assets/man-laptop.png";

const slugs = [
  "branding-design",
  "business-strategy",
  "digital-marketing",
  "motion-graphics-design",
  "web-mobile-app-development",
  "art-photography",
];

export function Services() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(0);
  const items = t("home.services.items", { returnObjects: true }) as { title: string; body: string }[];
  const whatWeCanDo = t("home.services.whatWeCanDo");

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-surface p-5 md:p-10">
        <h2 className="text-center font-display text-3xl font-bold text-brand-purple md:text-4xl">
          {t("home.services.title")}
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-5">
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src={whiteboard}
                alt="Strategy planning on a whiteboard"
                loading="lazy"
                width={768}
                height={640}
                className="h-56 w-full object-cover md:h-64"
              />
              <button className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-black text-white shadow-lg">
                <ArrowUpRight size={18} />
              </button>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-brand-teal p-6 md:h-64">
              <h3 className="whitespace-pre-line font-display text-2xl font-bold leading-tight text-brand-purple-deep md:text-3xl">
                {whatWeCanDo}
              </h3>
              <img
                src={manLaptop}
                alt="Friendly developer with laptop"
                loading="lazy"
                className="absolute -bottom-2 right-0 h-[110%] w-auto object-contain"
              />
              <svg viewBox="0 0 200 200" className="absolute -bottom-6 right-1/2 h-32 w-32 text-white/60" fill="none" stroke="currentColor" strokeWidth="6">
                <circle cx="100" cy="100" r="70" />
              </svg>
            </div>
          </div>

          <ul className="flex flex-col gap-3">
            {items.map((it, i) => {
              const isOpen = open === i;
              const n = String(i + 1).padStart(2, "0");
              const slug = slugs[i];
              return (
                <li
                  key={slug}
                  className={
                    "rounded-2xl transition " +
                    (isOpen ? "bg-brand-purple-soft" : "bg-white")
                  }
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="flex items-center gap-4 font-display text-base font-semibold text-brand-purple-deep md:text-lg">
                      <span className="tabular-nums text-brand-purple-deep/80">{n}</span>
                      <span className="text-brand-purple-deep/30">|</span>
                      <span>{it.title}</span>
                    </span>
                    <ChevronDown
                      size={20}
                      className={"text-brand-purple-deep transition " + (isOpen ? "rotate-180" : "")}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pl-16 text-sm text-brand-purple-deep/80">
                      <p>{it.body}</p>
                      <a href={`/services#${slug}`} className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-brand-purple-deep">
                        {t("home.services.learnMore")}
                      </a>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
