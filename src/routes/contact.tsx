import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle2, Layers, Mail, MapPin, Phone } from "lucide-react";
import { z } from "zod";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — JadeMediaPro" },
      {
        name: "description",
        content:
          "Get in touch with JadeMediaPro. We don't just handle your branding and marketing — we make your brand snapworthy.",
      },
      { property: "og:title", content: "Contact — JadeMediaPro" },
      {
        property: "og:description",
        content: "Reach out for branding, marketing and creative partnership inquiries.",
      },
    ],
  }),
  component: ContactPage,
});

type FormValues = {
  name: string;
  email: string;
  location: string;
  category: string;
  service: string;
  availability: string;
  budget: string;
  message: string;
};
type Errors = Partial<Record<keyof FormValues, string>> & { _form?: string };

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-xs font-medium text-foreground"
      >
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-[11px] font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function PillSelect({
  id,
  value,
  onChange,
  placeholder,
  options,
  invalid,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: string[];
  invalid?: boolean;
}) {
  return (
    <Select value={value || undefined} onValueChange={onChange}>
      <SelectTrigger
        id={id}
        aria-invalid={invalid}
        className={
          "h-auto rounded-full border-0 bg-background px-5 py-3.5 text-xs text-foreground shadow-none focus:ring-2 focus:ring-brand-purple/30 " +
          (invalid ? "ring-2 ring-destructive" : "")
        }
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-72">
        {options.map((o) => (
          <SelectItem key={o} value={o} className="text-xs">
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function ContactPage() {
  const { t } = useTranslation();
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    location: "",
    category: "",
    service: "",
    availability: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const services = t("contact.options.services", { returnObjects: true }) as string[];
  const categories = t("contact.options.categories", { returnObjects: true }) as string[];
  const availabilities = t("contact.options.availabilities", { returnObjects: true }) as string[];
  const budgets = t("contact.options.budgets", { returnObjects: true }) as string[];

  const contactSchema = useMemo(
    () =>
      z.object({
        name: z.string().trim().min(2, t("contact.errors.name")).max(100, t("contact.errors.nameMax")),
        email: z.string().trim().email(t("contact.errors.email")).max(255, t("contact.errors.emailMax")),
        location: z.string().trim().min(2, t("contact.errors.location")).max(120, t("contact.errors.locationMax")),
        category: z.string().min(1, t("contact.errors.category")),
        service: z.string().min(1, t("contact.errors.service")),
        availability: z.string().min(1, t("contact.errors.availability")),
        budget: z.string().min(1, t("contact.errors.budget")),
        message: z.string().trim().min(10, t("contact.errors.message")).max(1000, t("contact.errors.messageMax")),
      }),
    [t],
  );

  const set = <K extends keyof FormValues>(key: K, v: FormValues[K]) => {
    setValues((p) => ({ ...p, [key]: v }));
    if (errors[key] || errors._form) setErrors((p) => ({ ...p, [key]: undefined, _form: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const next: Errors = {};
      for (const issue of result.error.issues) {
        const k = issue.path[0] as keyof FormValues;
        if (!next[k]) next[k] = issue.message;
      }
      setErrors(next);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      if (!res.ok) throw new Error(`http_${res.status}`);
      setSubmitted(true);
      setValues({
        name: "",
        email: "",
        location: "",
        category: "",
        service: "",
        availability: "",
        budget: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setErrors({ _form: t("contact.errors.network") });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Header variant="light" active="Contact" ctaLabel={t("nav.startHere")} />

      <section className="px-4 pt-4">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-surface px-6 py-12 md:px-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-5xl font-extrabold text-brand-purple md:text-7xl">
              {t("contact.title")}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm text-foreground md:text-base">
              {t("contact.sub")}{" "}
              <em className="text-brand-purple">{t("contact.subEm")}</em>
              {t("contact.subEnd")}
            </p>
          </div>

          {submitted ? (
            <div
              role="status"
              className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-3 rounded-3xl bg-background px-6 py-12 text-center"
            >
              <CheckCircle2 size={40} className="text-brand-teal-deep" />
              <h2 className="font-display text-2xl font-bold text-brand-purple">
                {t("contact.successTitle")}
              </h2>
              <p className="max-w-md text-xs text-foreground/70">
                {t("contact.successBody")}
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-teal-deep px-5 py-2.5 text-xs font-semibold text-white"
              >
                {t("contact.successAgain")}
              </button>
            </div>
          ) : (
            <form
              className="mx-auto mt-10 max-w-3xl space-y-5"
              onSubmit={handleSubmit}
              noValidate
            >
              <Field label={t("contact.labels.name")} htmlFor="name" error={errors.name}>
                <input
                  id="name"
                  type="text"
                  placeholder={t("contact.placeholders.name")}
                  maxLength={100}
                  value={values.name}
                  onChange={(e) => set("name", e.target.value)}
                  aria-invalid={!!errors.name}
                  className={
                    "w-full rounded-full bg-background px-5 py-3.5 text-xs text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-brand-purple/30 " +
                    (errors.name ? "ring-2 ring-destructive" : "")
                  }
                />
              </Field>

              <Field label={t("contact.labels.email")} htmlFor="email" error={errors.email}>
                <div className="relative">
                  <Mail
                    size={14}
                    className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-foreground/50"
                  />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t("contact.placeholders.email")}
                    maxLength={255}
                    value={values.email}
                    onChange={(e) => set("email", e.target.value)}
                    aria-invalid={!!errors.email}
                    className={
                      "w-full rounded-full bg-background py-3.5 pl-11 pr-5 text-xs text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-brand-purple/30 " +
                      (errors.email ? "ring-2 ring-destructive" : "")
                    }
                  />
                </div>
              </Field>


              <Field label={t("contact.labels.location")} htmlFor="location" error={errors.location}>
                <div className="relative">
                  <MapPin
                    size={14}
                    className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-foreground/50"
                  />
                  <input
                    id="location"
                    type="text"
                    placeholder={t("contact.placeholders.location")}
                    maxLength={120}
                    value={values.location}
                    onChange={(e) => set("location", e.target.value)}
                    aria-invalid={!!errors.location}
                    className={
                      "w-full rounded-full bg-background py-3.5 pl-11 pr-5 text-xs text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-brand-purple/30 " +
                      (errors.location ? "ring-2 ring-destructive" : "")
                    }
                  />
                </div>
              </Field>

              <div className="grid gap-5 md:grid-cols-2">
                <Field label={t("contact.labels.category")} htmlFor="category" error={errors.category}>
                  <PillSelect
                    id="category"
                    value={values.category}
                    onChange={(v) => set("category", v)}
                    placeholder={t("contact.placeholders.category")}
                    options={categories}
                    invalid={!!errors.category}
                  />
                </Field>
                <Field label={t("contact.labels.service")} htmlFor="service" error={errors.service}>
                  <PillSelect
                    id="service"
                    value={values.service}
                    onChange={(v) => set("service", v)}
                    placeholder={t("contact.placeholders.service")}
                    options={services}
                    invalid={!!errors.service}
                  />
                </Field>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Field label={t("contact.labels.availability")} htmlFor="availability" error={errors.availability}>
                  <PillSelect
                    id="availability"
                    value={values.availability}
                    onChange={(v) => set("availability", v)}
                    placeholder={t("contact.placeholders.availability")}
                    options={availabilities}
                    invalid={!!errors.availability}
                  />
                </Field>
                <Field label={t("contact.labels.budget")} htmlFor="budget" error={errors.budget}>
                  <PillSelect
                    id="budget"
                    value={values.budget}
                    onChange={(v) => set("budget", v)}
                    placeholder={t("contact.placeholders.budget")}
                    options={budgets}
                    invalid={!!errors.budget}
                  />
                </Field>
              </div>

              <Field label={t("contact.labels.message")} htmlFor="message" error={errors.message}>
                <div
                  className={
                    "relative rounded-3xl bg-background p-5 " +
                    (errors.message ? "ring-2 ring-destructive" : "")
                  }
                >
                  <textarea
                    id="message"
                    placeholder={t("contact.placeholders.message")}
                    maxLength={1000}
                    rows={6}
                    value={values.message}
                    onChange={(e) => set("message", e.target.value)}
                    aria-invalid={!!errors.message}
                    className="w-full resize-none bg-transparent text-xs text-foreground placeholder:text-foreground/50 focus:outline-none"
                  />
                  <Layers
                    size={16}
                    className="absolute bottom-4 left-5 text-foreground/40"
                  />
                  <span className="absolute bottom-4 right-5 text-[10px] text-foreground/40">
                    {values.message.length}/1000
                  </span>
                </div>
              </Field>

              {errors._form && (
                <p role="alert" className="text-center text-xs font-medium text-destructive">
                  {errors._form}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-brand-teal-deep py-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {submitting ? t("contact.submitting") : t("contact.submit")}
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {[
            { icon: Mail, label: t("contact.info.email"), value: "solutions@jademediapro.com" },
            { icon: MapPin, label: t("contact.info.location"), value: t("contact.info.locationValue") },
            { icon: Phone, label: t("contact.info.phone"), value: "+1 (263) 378 3338" },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-2xl bg-brand-purple px-6 py-10 text-center text-white"
            >
              <Icon size={32} strokeWidth={1.5} className="mx-auto" />
              <div className="mt-6 text-[11px] tracking-[0.2em] text-white/70">{label}</div>
              <div className="mt-2 font-display text-base font-bold">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
