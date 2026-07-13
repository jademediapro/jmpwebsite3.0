import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { blogPosts, type BlogLocale } from "@/data/blog";

export function Posts() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage ?? "en") as BlogLocale;
  const posts = blogPosts.slice(0, 3);

  return (
    <section className="px-4 py-6">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-surface p-5 md:p-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">{t("home.posts.title")}</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              {t("home.posts.sub")}
            </p>
          </div>
          <Link
            to="/blog"
            className="self-start rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold text-foreground md:self-auto"
          >
            {t("home.posts.viewAll")}
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {posts.map((p) => (
            <article key={p.slug} className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <img
                src={p.image}
                alt={p.title[lang]}
                loading="lazy"
                width={768}
                height={576}
                className="h-44 w-full object-cover md:h-52"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-[11px] font-medium">
                  <span className="rounded-md bg-brand-purple-soft px-2 py-0.5 text-brand-purple-deep">
                    {p.category[lang]}
                  </span>
                  <span className="text-muted-foreground">{p.date[lang]}</span>
                </div>
                <h3 className="mt-3 font-display text-base font-bold leading-snug">
                  {p.title[lang]}
                </h3>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="mt-3 inline-block text-xs font-semibold text-brand-purple-deep"
                >
                  {t("home.posts.readMore")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
