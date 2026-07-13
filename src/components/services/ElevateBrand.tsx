import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import uiux from "@/assets/services-uiux.jpg";
import paint from "@/assets/services-paint.jpg";
import webdev from "@/assets/services-webdev.jpg";

export function ElevateBrand() {
  const { t } = useTranslation();
  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-brand-teal/60 p-6 md:p-12">
        <div className="text-center">
          <h2 className="font-display text-3xl font-extrabold text-brand-purple-deep md:text-4xl">
            {t("services.elevate.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xs text-brand-purple-deep/70 md:text-sm">
            {t("services.elevate.sub")}
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div>
            <div className="relative overflow-hidden rounded-[1.5rem]">
              <img
                src={uiux}
                alt="Hand drawn UI wireframe sketch"
                loading="lazy"
                width={768}
                height={768}
                className="h-56 w-full object-cover"
              />
              <button className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-foreground text-white shadow-lg">
                <ArrowUpRight size={16} />
              </button>
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-brand-purple-deep">
              {t("services.elevate.uiuxTitle")}
            </h3>
            <p className="mt-1 text-xs text-brand-purple-deep/70">
              {t("services.elevate.uiuxBody")}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[1.5rem]">
            <img
              src={paint}
              alt="Designer holding paint color samples"
              loading="lazy"
              width={768}
              height={1024}
              className="h-full max-h-[28rem] w-full object-cover"
            />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-background/70 bg-background/80 px-4 py-1.5 text-[11px] font-medium text-brand-purple-deep backdrop-blur">
              {t("services.elevate.centerLabel")}
            </span>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold text-brand-purple-deep">
              {t("services.elevate.webTitle")}
            </h3>
            <p className="mt-1 text-xs text-brand-purple-deep/70">
              {t("services.elevate.webBody")}
            </p>
            <div className="relative mt-4 overflow-hidden rounded-[1.5rem]">
              <img
                src={webdev}
                alt="Two designers collaborating at a computer"
                loading="lazy"
                width={768}
                height={768}
                className="h-56 w-full object-cover"
              />
              <button className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-foreground text-white shadow-lg">
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
