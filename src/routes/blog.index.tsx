import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import heroImg from "@/assets/blog-hero.jpg";
import author from "@/assets/blog-author.jpg";
import { blogPosts, type BlogLocale } from "@/data/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — JadeMediaPro" },
      {
        name: "description",
        content:
          "Insights, case studies and articles from JadeMediaPro — written to inspire the design community.",
      },
      { property: "og:title", content: "Blog — JadeMediaPro" },
      {
        property: "og:description",
        content: "Read our latest blogs and articles on branding, design and technology.",
      },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage ?? "en") as BlogLocale;
  const featured = blogPosts[0];

  return (
    <main className="min-h-screen bg-background">
      <Header variant="light" active="Blog" ctaLabel={t("nav.startHere")} />

      <section className="px-4 pt-4">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem]">
          <img
            src={heroImg}
            alt="Two professionals reviewing analytics on laptops"
            width={1280}
            height={720}
            className="h-80 w-full object-cover md:h-[460px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-start px-7 pt-10 md:px-14 md:pt-16">
            <h1 className="whitespace-pre-line font-display text-3xl font-extrabold leading-tight text-white md:text-5xl">
              {t("blog.heroTitle")}
            </h1>
          </div>
        </div>

        <div className="relative z-10 mx-auto -mt-16 max-w-7xl px-4 md:px-10">
          <Link
            to="/blog/$slug"
            params={{ slug: featured.slug }}
            className="relative z-10 block max-w-md rounded-2xl bg-background p-5 shadow-xl ring-1 ring-border transition hover:shadow-2xl"
          >
            <span className="inline-block rounded-full bg-brand-purple px-3 py-1 text-[10px] font-semibold text-white">
              {featured.category[lang]}
            </span>
            <h2 className="mt-3 font-display text-base font-bold leading-snug text-foreground md:text-lg">
              {featured.title[lang]}
            </h2>
            <div className="mt-4 flex items-center gap-3 border-t border-border pt-3 text-[11px] text-muted-foreground">
              <img
                src={author}
                alt={t("blog.featuredAuthor")}
                width={28}
                height={28}
                loading="lazy"
                className="h-7 w-7 rounded-full object-cover"
              />
              <span className="font-semibold text-foreground">{t("blog.featuredAuthor")}</span>
              <span>{featured.date[lang]}</span>
            </div>
          </Link>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-2xl font-extrabold text-foreground md:text-3xl">
            {t("blog.listTitle")}
          </h2>
          <p className="mt-2 max-w-2xl text-xs text-foreground/65 md:text-sm">
            {t("blog.listSub")}
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((p) => (
              <article key={p.slug} className="rounded-2xl bg-background p-3 ring-1 ring-border">
                <img
                  src={p.image}
                  alt={p.title[lang]}
                  width={800}
                  height={500}
                  loading="lazy"
                  className="h-44 w-full rounded-xl object-cover"
                />
                <div className="mt-3 flex items-center gap-3 px-1 text-[11px]">
                  <span className="rounded-full bg-brand-teal/30 px-2.5 py-0.5 font-semibold text-brand-purple-deep">
                    {p.category[lang]}
                  </span>
                  <span className="text-muted-foreground">{p.date[lang]}</span>
                </div>
                <h3 className="mt-3 px-1 font-display text-sm font-bold leading-snug text-foreground md:text-base">
                  {p.title[lang]}
                </h3>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="mt-3 inline-block px-1 text-xs font-semibold text-brand-purple"
                >
                  {t("blog.readMore")}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
