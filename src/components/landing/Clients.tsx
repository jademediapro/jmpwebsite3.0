import { useTranslation } from "react-i18next";
import logo0 from "@/assets/clients/client-logo-01.png";
import logo1 from "@/assets/clients/client-logo-02.png";
import logo2 from "@/assets/clients/client-logo-03.png";
import logo3 from "@/assets/clients/client-logo-04.png";
import logo4 from "@/assets/clients/client-logo-05.png";
import logo5 from "@/assets/clients/client-logo-06.png";
import logo6 from "@/assets/clients/client-logo-07.png";
import logo7 from "@/assets/clients/client-logo-08.png";
import logo8 from "@/assets/clients/client-logo-09.png";
import logo9 from "@/assets/clients/client-logo-10.png";

const logos = [
  { src: logo0, alt: "Holthy" },
  { src: logo1, alt: "Client" },
  { src: logo2, alt: "Cendmate" },
  { src: logo3, alt: "Client" },
  { src: logo4, alt: "Client" },
  { src: logo5, alt: "The Redeemed Christian Church of God" },
  { src: logo6, alt: "AIS" },
  { src: logo7, alt: "CRISPR Biotech Engineering" },
  { src: logo8, alt: "Toz Home" },
  { src: logo9, alt: "Client" },
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
