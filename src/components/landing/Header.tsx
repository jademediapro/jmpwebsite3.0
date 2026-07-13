import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "@/assets/logo.svg";
import { LanguageSelector } from "./LanguageSelector";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";

type HeaderProps = {
  variant?: "dark" | "light";
  active?: string;
  ctaLabel?: string;
  logoSrc?: string;
};

export function Header({ variant = "dark", active = "Home", ctaLabel, logoSrc = logo }: HeaderProps) {
  const { t } = useTranslation();
  const isLight = variant === "light";
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const nav = [
    { label: t("nav.home"), key: "Home", to: "/" },
    { label: t("nav.services"), key: "Services", to: "/services" },
    { label: t("nav.projects"), key: "Projects", to: "/projects" },
    { label: t("nav.blog"), key: "Blog", to: "/blog" },
    { label: t("nav.about"), key: "About", to: "/about" },
    { label: t("nav.contact"), key: "Contact", to: "/contact" },
  ];

  return (
    <header className={(isLight ? "bg-background" : "bg-brand-purple-deep") + " px-4 pt-4"}>
      <div
        className={
          "mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full px-3 py-2 " +
          (isLight ? "bg-background text-brand-purple-deep" : "bg-brand-purple-deep text-white")
        }
      >
        <Link to="/" className="flex min-w-0 items-center pl-2">
          <img src={logoSrc} alt="JadeMediaPro" className="h-8 w-auto" />
        </Link>

        <nav
          className={
            "hidden items-center gap-1 rounded-full px-1.5 py-1 backdrop-blur md:flex " +
            (isLight
              ? "border border-brand-purple-deep/10 bg-brand-purple-deep/[0.03]"
              : "border border-white/10 bg-white/5")
          }
        >
          {nav.map((item) => {
            const isActive = item.key === active;
            return (
              <Link
                key={item.key}
                to={item.to}
                className={
                  "rounded-full px-4 py-1.5 text-xs font-medium transition " +
                  (isActive
                    ? "bg-brand-green text-white shadow-sm"
                    : isLight
                      ? "text-brand-purple-deep/70 hover:text-brand-purple-deep"
                      : "text-white/80 hover:text-white")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageSelector variant={variant} />

          <a
            href="https://zcal.co/i/r9qC4iCe"
            target="_blank"
            rel="noopener noreferrer"
            className={
              "hidden items-center gap-1.5 rounded-full py-2 pl-4 pr-1.5 text-xs font-semibold transition sm:inline-flex " +
              (isLight
                ? "border border-brand-purple-deep/15 bg-background text-brand-purple-deep hover:bg-surface"
                : "bg-white text-brand-purple-deep hover:bg-white/90")
            }
          >
            {ctaLabel ?? t("nav.startHere")}
            <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-purple-deep text-white">
              <ArrowUpRight size={14} />
            </span>
          </a>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label={t("nav.menu")}
                aria-expanded={open}
                className={
                  "grid h-9 w-9 shrink-0 place-items-center rounded-full transition md:hidden " +
                  (isLight ? "bg-brand-purple-deep/10 text-brand-purple-deep" : "bg-white/10 text-white")
                }
              >
                <Menu size={18} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-[85vw] max-w-sm flex-col gap-0 border-l border-white/10 bg-brand-purple-deep p-0 text-white [&>button]:hidden"
            >
              <SheetHeader className="flex flex-row items-center justify-between border-b border-white/10 p-4 space-y-0">
                <SheetTitle className="text-left text-white">
                  <img src={logoSrc} alt="JadeMediaPro" className="h-7 w-auto" />
                </SheetTitle>
                <SheetDescription className="sr-only">{t("nav.menu")}</SheetDescription>
                <SheetClose asChild>
                  <button
                    aria-label={t("nav.menu")}
                    className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  >
                    <X size={18} />
                  </button>
                </SheetClose>
              </SheetHeader>

              <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-6">
                <ul className="flex flex-col gap-1">
                  {nav.map((item) => {
                    const isActive = item.key === active;
                    return (
                      <li key={item.key}>
                        <Link
                          to={item.to}
                          onClick={() => setOpen(false)}
                          className={
                            "flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition " +
                            (isActive
                              ? "bg-brand-green text-white"
                              : "text-white/85 hover:bg-white/10 hover:text-white")
                          }
                        >
                          <span>{item.label}</span>
                          <ArrowUpRight size={16} className="opacity-60" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="border-t border-white/10 p-4">
                <a
                  href="https://zcal.co/i/r9qC4iCe"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between gap-2 rounded-full bg-white py-2.5 pl-5 pr-1.5 text-sm font-semibold text-brand-purple-deep transition hover:bg-white/90"
                >
                  {ctaLabel ?? t("nav.startHere")}
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-purple-deep text-white">
                    <ArrowUpRight size={16} />
                  </span>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
