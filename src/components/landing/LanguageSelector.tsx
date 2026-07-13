import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "@/i18n";

type Props = { variant?: "dark" | "light" };

export function LanguageSelector({ variant = "dark" }: Props) {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isLight = variant === "light";
  const active =
    SUPPORTED_LANGUAGES.find((l) => l.code === i18n.resolvedLanguage) ??
    SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = i18n.resolvedLanguage ?? "en";
    }
  }, [i18n.resolvedLanguage]);

  const change = (code: string) => {
    void i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("language.label")}
        className={
          "inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition " +
          (isLight
            ? "border border-brand-purple-deep/15 bg-background text-brand-purple-deep hover:bg-surface"
            : "border border-white/15 bg-white/5 text-white hover:bg-white/10")
        }
      >
        <Globe size={13} className="opacity-80" />
        <span className="tracking-wide">{active.label}</span>
        <ChevronDown
          size={13}
          className={"opacity-70 transition-transform duration-200 " + (open ? "rotate-180" : "")}
        />
      </button>

      <div
        role="listbox"
        className={
          "absolute right-0 top-[calc(100%+8px)] z-50 min-w-[12rem] origin-top-right overflow-hidden rounded-2xl border shadow-lg transition duration-200 " +
          (isLight ? "border-brand-purple-deep/10 bg-background" : "border-white/10 bg-brand-purple-deep") +
          " " +
          (open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-95 opacity-0")
        }
      >
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isActive = lang.code === active.code;
          return (
            <button
              key={lang.code}
              role="option"
              aria-selected={isActive}
              onClick={() => change(lang.code)}
              className={
                "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-xs transition " +
                (isLight
                  ? "text-brand-purple-deep hover:bg-surface"
                  : "text-white hover:bg-white/10")
              }
            >
              <span className="flex items-center gap-2">
                <span className="font-semibold tracking-wide">{lang.label}</span>
                <span className="opacity-70">— {lang.name}</span>
              </span>
              {isActive && <Check size={13} className="opacity-80" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
