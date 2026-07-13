import { useTranslation } from "react-i18next";
import logo0 from "@/assets/clients/Client-logo_0000_3Asset-3@2x.png.asset.json";
import logo1 from "@/assets/clients/Client-logo_0001_2Asset-1@2x.png.asset.json";
import logo2 from "@/assets/clients/Client-logo_0002_Asset-3@2x.png.asset.json";
import logo3 from "@/assets/clients/Client-logo_0003_Asset-8@2x.png.asset.json";
import logo4 from "@/assets/clients/Client-logo_0004_Asset-1@2x.png.asset.json";
import logo5 from "@/assets/clients/Client-logo_0005_pngkey.com-rccg-logo-png-2089134.png.asset.json";
import logo6 from "@/assets/clients/Client-logo_0009_Long-Red-AIS-white-logo-transparent.png.asset.json";
import logo7 from "@/assets/clients/Client-logo_0011_source-01.png.asset.json";
import logo8 from "@/assets/clients/Client-logo_0012_logo-big-blue.png.asset.json";
import logo9 from "@/assets/clients/Client-logo_0013_V-White.png.asset.json";

const logos = [
  { src: logo0.url, alt: "Holthy" },
  { src: logo1.url, alt: "Client" },
  { src: logo2.url, alt: "Cendmate" },
  { src: logo3.url, alt: "Client" },
  { src: logo4.url, alt: "Client" },
  { src: logo5.url, alt: "The Redeemed Christian Church of God" },
  { src: logo6.url, alt: "AIS" },
  { src: logo7.url, alt: "CRISPR Biotech Engineering" },
  { src: logo8.url, alt: "Toz Home" },
  { src: logo9.url, alt: "Client" },
];

export function Clients() {
  const { t } = useTranslation();
  const loop = [...logos, ...logos];
  return (
    <section className="bg-brand-purple-deep px-4 pb-14 pt-2 text-white">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="font-display text-2xl font-bold md:text-3xl">{t("clients.title")}</h2>
        <div
          className="group relative mt-8 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="flex w-max animate-clients-marquee gap-14 group-hover:[animation-play-state:paused]">
            {loop.map((l, i) => (
              <div
                key={i}
                className="flex h-16 w-40 shrink-0 items-center justify-center md:h-20 md:w-48"
              >
                <img
                  src={l.src}
                  alt={l.alt}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
