import { useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { reviewRequestSchema, submitNewsletter, websiteAddressSchema } from "@/lib/newsletter";

export function FreeReviewOffer() {
  const { t, i18n } = useTranslation();
  const [website, setWebsite] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function startReview(event: FormEvent) {
    event.preventDefault();
    if (!websiteAddressSchema.safeParse(website).success) {
      setErrors({ website: t("freeReview.invalidWebsite") });
      return;
    }
    setErrors({});
    setStatus("idle");
    setOpen(true);
  }

  async function requestReview(event: FormEvent) {
    event.preventDefault();
    if (status === "loading") return;
    const input = { source: "free-website-review" as const, website, name, email, language: i18n.resolvedLanguage === "fr" ? "fr" as const : "en" as const };
    const parsed = reviewRequestSchema.safeParse(input);
    if (!parsed.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const field = String(issue.path[0]);
        nextErrors[field] = t(field === "name" ? "freeReview.invalidName" : field === "email" ? "freeReview.invalidEmail" : "freeReview.invalidWebsite");
      }
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      await submitNewsletter(input);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <aside className="free-review-offer" aria-labelledby="free-review-title">
        <h2 id="free-review-title" className="free-review-title">{t("freeReview.title")}</h2>
        <form onSubmit={startReview} noValidate className="free-review-address">
          <Input type="text" inputMode="url" autoComplete="url" maxLength={2048} value={website}
            onChange={(event) => { setWebsite(event.target.value); setErrors({}); }}
            placeholder={t("freeReview.websitePlaceholder")} aria-label={t("freeReview.websiteLabel")}
            aria-invalid={Boolean(errors.website)} aria-describedby={errors.website ? "review-website-error" : undefined}
            className="free-review-input" />
          <Button type="submit" size="icon" className="free-review-arrow" aria-label={t("freeReview.open")} title={t("freeReview.open")}><ArrowUpRight /></Button>
        </form>
        {errors.website && <p id="review-website-error" role="alert" className="mt-2 text-xs text-brand-purple-foreground">{errors.website}</p>}
      </aside>
      <Dialog open={open} onOpenChange={(value) => { if (status !== "loading") setOpen(value); }}>
        <DialogContent closeLabel={t("freeReview.close")} className="free-review-dialog">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold leading-tight tracking-normal text-brand-purple-deep">{t(status === "success" ? "freeReview.successTitle" : "freeReview.popupTitle")}</DialogTitle>
            <DialogDescription className="pt-2 leading-relaxed">{t(status === "success" ? "freeReview.successMessage" : "freeReview.popupMessage")}</DialogDescription>
          </DialogHeader>
          {status === "success" ? (
            <div role="status" className="space-y-5">
              <CheckCircle2 className="size-10 text-offer-background" aria-hidden="true" />
              <p className="break-all text-sm text-muted-foreground">{website}</p>
              <Button className="free-review-submit" onClick={() => setOpen(false)}>{t("freeReview.done")}</Button>
            </div>
          ) : (
            <form noValidate onSubmit={requestReview} className="space-y-4">
              <p className="break-all rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">{website}</p>
              <div className="space-y-1.5">
                <label htmlFor="review-name" className="text-sm font-medium">{t("freeReview.name")}</label>
                <Input id="review-name" name="name" autoComplete="name" required maxLength={100} value={name} disabled={status === "loading"}
                  onChange={(event) => { setName(event.target.value); setErrors((previous) => ({ ...previous, name: "" })); }}
                  aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "review-name-error" : undefined} />
                {errors.name && <p id="review-name-error" role="alert" className="text-xs text-destructive">{errors.name}</p>}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="review-email" className="text-sm font-medium">{t("freeReview.email")}</label>
                <Input id="review-email" name="email" type="email" autoComplete="email" required maxLength={255} value={email} disabled={status === "loading"}
                  onChange={(event) => { setEmail(event.target.value); setErrors((previous) => ({ ...previous, email: "" })); }}
                  aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "review-email-error" : undefined} />
                {errors.email && <p id="review-email-error" role="alert" className="text-xs text-destructive">{errors.email}</p>}
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">{t("freeReview.newsletterNotice")}</p>
              {status === "error" && <p role="alert" className="text-sm text-destructive">{t("freeReview.submitError")}</p>}
              <Button type="submit" disabled={status === "loading"} className="free-review-submit">
                {status === "loading" ? <Loader2 className="animate-spin" /> : <ArrowUpRight />}
                {t(status === "loading" ? "freeReview.submitting" : "freeReview.submit")}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}