import { ArrowUp, Check, Facebook, Instagram, Linkedin, Loader2, Mail, Phone, Youtube } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "@/assets/jademediapro-logo.svg";

type FooterLink = { labelKey: string; to?: string; href?: string };

const cols: { titleKey: string; items: FooterLink[] }[] = [
  {
    titleKey: "footer.work",
    items: [
      { labelKey: "footer.links.caseStudies", to: "/projects" },
      { labelKey: "footer.links.process", to: "/process" },
      { labelKey: "footer.links.showreel", href: "https://vimeo.com/jademediapro" },
      { labelKey: "footer.links.photos", href: "https://www.pinterest.com/jademediapro/" },
    ],
  },
  {
    titleKey: "footer.about",
    items: [
      { labelKey: "footer.links.ourStory", to: "/about" },
      { labelKey: "footer.links.testimonials", to: "/about" },
      { labelKey: "footer.links.team", to: "/team" },
      { labelKey: "footer.links.careers", href: "/team#careers" },
      { labelKey: "footer.links.contactUs", to: "/contact" },
    ],
  },
  {
    titleKey: "footer.services",
    items: [
      { labelKey: "footer.links.branding", href: "/services#branding-design" },
      { labelKey: "footer.links.strategy", href: "/services#business-strategy" },
      { labelKey: "footer.links.marketing", href: "/services#digital-marketing" },
      { labelKey: "footer.links.motion", href: "/services#motion-graphics-design" },
      { labelKey: "footer.links.web", href: "/services#web-mobile-app-development" },
    ],
  },
];

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25h6.83l4.713 6.231 5.447-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

export function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate" | "error" | "invalid">("idle");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) && trimmed.length <= 255;
    if (!valid) {
      setStatus("invalid");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/public/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, source: "footer" }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; duplicate?: boolean };
      if (!res.ok || !data.ok) throw new Error(`http_${res.status}`);
      setStatus(data.duplicate ? "duplicate" : "success");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <footer className="bg-brand-purple-deep px-4 pb-6 pt-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr_1.4fr]">
        <div>
          <Link to="/" className="inline-flex items-center">
            <img src={logo.url} alt="JadeMediaPro" className="h-[1.875rem] w-auto" />
          </Link>
          <p className="mt-4 max-w-xs text-xs text-white/70">{t("footer.tagline")}</p>
          <div className="mt-5 flex items-center gap-3 text-white/80">
            <a href="https://www.facebook.com/jademediapro" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white"><Facebook size={18} /></a>
            <a href="https://youtube.com/@jademediapro" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-white"><Youtube size={18} /></a>
            <a href="https://www.instagram.com/jademediapro/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white"><Instagram size={18} /></a>
            <a href="https://www.linkedin.com/company/jademediapro" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white"><Linkedin size={18} /></a>
            <a href="https://x.com/Jademediapro" target="_blank" rel="noopener noreferrer" aria-label="X" className="hover:text-white"><XIcon size={16} /></a>
          </div>
          <div className="mt-5 space-y-2 text-xs text-white/80">
            <a href="mailto:solutions@jademediapro.com" className="flex items-center gap-2 text-brand-teal hover:text-white">
              <Mail size={14} /> solutions@jademediapro.com
            </a>
            <a href="tel:+12633783338" className="flex items-center gap-2 text-brand-teal hover:text-white">
              <Phone size={14} /> +1 (263) 378-3338
            </a>
          </div>
        </div>

        {cols.map((col) => (
          <div key={col.titleKey}>
            <h4 className="font-display text-sm font-bold">{t(col.titleKey)}</h4>
            <ul className="mt-4 space-y-2 text-xs text-white/75">
              {col.items.map((i) => (
                <li key={i.labelKey}>
                  {i.to ? (
                    <Link to={i.to} className="hover:text-white">{t(i.labelKey)}</Link>
                  ) : (
                    <a
                      href={i.href}
                      target={i.href?.startsWith("http") ? "_blank" : undefined}
                      rel={i.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="hover:text-white"
                    >
                      {t(i.labelKey)}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="font-display text-2xl font-bold">
            {t("footer.newsletter")} <span className="text-brand-teal">✱</span>
          </h4>
          <p className="mt-3 text-xs text-white/70">{t("footer.newsletterSub")}</p>
          <form
            onSubmit={handleNewsletterSubmit}
            className={
              "mt-4 flex items-center gap-2 rounded-full border bg-white/5 px-4 py-2 transition-colors " +
              (status === "invalid" || status === "error"
                ? "border-red-400/60"
                : status === "success" || status === "duplicate"
                  ? "border-brand-teal/60"
                  : "border-white/20")
            }
            noValidate
          >
            <input
              type="email"
              required
              maxLength={255}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== "idle" && status !== "loading") setStatus("idle");
              }}
              placeholder={t("footer.emailPlaceholder")}
              aria-label={t("footer.emailPlaceholder")}
              disabled={status === "loading"}
              className="flex-1 bg-transparent text-xs text-white placeholder:text-white/50 outline-none disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === "loading" || status === "success" || status === "duplicate"}
              aria-label={t("footer.newsletterSubmit")}
              className="grid h-8 w-8 place-items-center rounded-full bg-white text-brand-purple-deep transition hover:opacity-90 disabled:opacity-70"
            >
              {status === "loading" ? (
                <Loader2 size={14} className="animate-spin" />
              ) : status === "success" || status === "duplicate" ? (
                <Check size={14} />
              ) : (
                <ArrowUp size={14} className="rotate-45" />
              )}
            </button>
          </form>
          {status === "success" && (
            <p role="status" className="mt-2 text-[11px] text-brand-teal">
              {t("footer.newsletterSuccess")}
            </p>
          )}
          {status === "duplicate" && (
            <p role="status" className="mt-2 text-[11px] text-brand-teal">
              {t("footer.newsletterDuplicate")}
            </p>
          )}
          {status === "invalid" && (
            <p role="alert" className="mt-2 text-[11px] text-red-300">
              {t("footer.newsletterInvalid")}
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="mt-2 text-[11px] text-red-300">
              {t("footer.newsletterError")}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-2 border-t border-white/10 pt-5 text-[11px] text-white/60 md:flex-row">
        <p>{t("footer.rights")}</p>
        <div className="flex gap-4">
          <Link to="/terms" className="hover:text-white">{t("footer.terms")}</Link>
          <Link to="/privacy" className="hover:text-white">{t("footer.privacy")}</Link>
        </div>
      </div>
    </footer>
  );
}
