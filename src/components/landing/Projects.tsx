import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import ariwaHeader from "@/assets/casestudies/ariwa-header.jpg.asset.json";
import coinplayHeader from "@/assets/casestudies/coinplay-header.jpg.asset.json";
import tozomeHeader from "@/assets/casestudies/tozome-header.jpg.asset.json";

const projects = [
  { img: ariwaHeader.url, slug: "ariwa-fashion", label: "Ariwa Fashion" },
  { img: coinplayHeader.url, slug: "coinplay", label: "Coinplay.ca" },
  { img: tozomeHeader.url, slug: "tozome", label: "Tozome" },
];

export function Projects() {
  const { t } = useTranslation();
  const filters = t("home.projects.filters", { returnObjects: true }) as string[];
  const title = t("home.projects.title");

  return (
    <section className="px-4 py-6">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-brand-teal p-5 md:p-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="whitespace-pre-line font-display text-2xl font-bold text-brand-purple-deep md:text-4xl">
            {title}
          </h2>
          <div className="flex flex-wrap gap-2">
            {filters.map((f, i) => (
              <button
                key={f}
                className={
                  "rounded-full border border-brand-purple-deep/20 px-4 py-1.5 text-xs font-semibold transition " +
                  (i === 1
                    ? "bg-brand-purple-deep text-white"
                    : "bg-transparent text-brand-purple-deep hover:bg-white/40")
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {projects.map((p) => (
            <Link
              key={p.slug}
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="group relative block overflow-hidden rounded-3xl"
            >
              <img
                src={p.img}
                alt={p.label}
                loading="lazy"
                width={768}
                height={768}
                className="h-72 w-full object-cover transition duration-500 group-hover:scale-105 md:h-80"
              />
              <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-brand-purple-deep backdrop-blur">
                {p.label}
              </span>
              <span className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-black/80 text-white transition group-hover:bg-brand-purple-deep">
                <ArrowUpRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
