import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t("footer.backToTop")}
      className="fixed bottom-10 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-brand-teal px-4 py-2 text-xs font-semibold text-brand-purple-deep shadow-lg transition hover:scale-105"
    >
      {t("footer.backToTop")} <ArrowUp size={14} />
    </button>
  );
}
