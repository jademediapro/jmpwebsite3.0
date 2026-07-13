import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import ball from "@/assets/proj-ball.jpg";
import stickers from "@/assets/proj-stickers.jpg";
import cubes from "@/assets/proj-cubes.jpg";
import laptop from "@/assets/proj-laptop.jpg";
import cup from "@/assets/proj-cup.jpg";
import patches from "@/assets/proj-patches.jpg";
import neon from "@/assets/proj-neon.jpg";
import tozomeHeader from "@/assets/casestudies/tozome-header.jpg.asset.json";
import developfulHeader from "@/assets/casestudies/developful-header.jpg.asset.json";

const featuredCaseStudies = [
  { img: tozomeHeader.url, slug: "tozome", label: "Tozome", tagKey: "tagMobile" as const },
  { img: developfulHeader.url, slug: "developful", label: "Developful", tagKey: "tagBranding" as const },
];

type TileProps = {
  img: string;
  alt: string;
  label?: string;
  tag?: string;
  className?: string;
};

function Tile({ img, alt, label, tag, className }: TileProps) {
  return (
    <div className={"group relative overflow-hidden rounded-2xl " + (className ?? "")}>
      <img src={img} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      {tag && (
        <span className="absolute right-2 top-2 rounded-full bg-background/90 px-2.5 py-0.5 text-[10px] font-semibold text-brand-purple-deep">
          {tag}
        </span>
      )}
      {label && (
        <button className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1 text-[10px] font-semibold text-brand-purple-deep">
          {label}
          <span className="grid h-4 w-4 place-items-center rounded-full bg-foreground text-white">
            <ArrowUpRight size={9} />
          </span>
        </button>
      )}
    </div>
  );
}

export function MoreProjects() {
  const { t } = useTranslation();
  const branding = t("projects.more.tagBranding");
  const print = t("projects.more.tagPrint");
  const three = t("projects.more.tag3d");
  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-display text-2xl font-extrabold text-foreground md:text-3xl">
          {t("projects.more.title")}
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {featuredCaseStudies.map((c) => (
            <Link
              key={c.slug}
              to="/projects/$slug"
              params={{ slug: c.slug }}
              className="group relative block aspect-[16/10] overflow-hidden rounded-2xl"
            >
              <img src={c.img} alt={c.label} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute right-2 top-2 rounded-full bg-background/90 px-2.5 py-0.5 text-[10px] font-semibold text-brand-purple-deep">
                {t("projects.more." + c.tagKey)}
              </span>
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1 text-[10px] font-semibold text-brand-purple-deep">
                {c.label}
                <span className="grid h-4 w-4 place-items-center rounded-full bg-foreground text-white">
                  <ArrowUpRight size={9} />
                </span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-6 grid auto-rows-[110px] grid-cols-2 gap-3 md:auto-rows-[140px] md:grid-cols-12">
          <Tile img={ball} alt="Blue ball with orange peel" label={t("projects.more.labelAwareness")} tag={branding} className="col-span-2 row-span-2 md:col-span-6" />
          <Tile img={neon} alt="Neon sign" label={t("projects.more.labelBrand")} tag={branding} className="col-span-2 row-span-1 md:col-span-6" />
          <Tile img={laptop} alt="Laptop with stickers" tag={print} className="col-span-2 row-span-2 md:col-span-6" />
          <Tile img={stickers} alt="Pile of stickers" tag={print} className="col-span-1 row-span-2 md:col-span-3 md:row-span-2" />
          <Tile img={cubes} alt="Translucent cubes" tag={three} className="col-span-1 row-span-2 md:col-span-3 md:row-span-2" />
          <Tile img={patches} alt="Patches collection" tag={print} className="col-span-2 row-span-2 md:col-span-8 md:row-span-2" />
          <Tile img={cup} alt="Orange cup with markers" tag={print} className="col-span-2 row-span-1 md:col-span-4 md:row-span-2" />
        </div>
      </div>
    </section>
  );
}
