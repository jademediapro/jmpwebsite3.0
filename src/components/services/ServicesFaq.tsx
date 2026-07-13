import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

type FaqItem = { q: string; a: string };

export function ServicesFaq() {
  const { t } = useTranslation();
  const [open, setOpen] = useState<number | null>(0);
  const faqs = t("services.faq.items", { returnObjects: true }) as FaqItem[];

  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-display text-3xl font-extrabold text-brand-purple md:text-4xl">
          {t("faq.title")}
          <br />
          {t("faq.titleLine2")}
        </h2>

        <ul
          className="mt-8 flex flex-col gap-3"
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li
                key={i}
                className="overflow-hidden rounded-3xl bg-brand-purple-soft data-[open=false]:rounded-full"
                data-open={isOpen}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-3 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className="text-xs font-medium text-brand-purple-deep md:text-sm"
                    itemProp="name"
                  >
                    {f.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={"text-brand-purple-deep transition " + (isOpen ? "rotate-180" : "")}
                  />
                </button>
                {isOpen && (
                  <div
                    className="px-5 pb-4 text-xs text-brand-purple-deep/80 md:text-sm"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <span itemProp="text">{f.a}</span>
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
