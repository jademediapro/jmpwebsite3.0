import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { CtaBanner } from "@/components/landing/CtaBanner";
import author from "@/assets/blog-author.jpg";
import { getPostBySlug, getRelatedPosts, type BlogLocale, type BlogPost } from "@/data/blog";

const SITE_URL = "https://pixel-perfect-polish-550.lovable.app";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    const post = loaderData?.post as BlogPost | undefined;
    const title = post?.seoTitle?.en ?? post?.title.en ?? "Blog post";
    const description = post?.metaDescription?.en ?? post?.excerpt.en ?? "";
    const pageUrl = `${SITE_URL}/blog/${params.slug}`;
    const imageUrl = post?.image?.startsWith("http") ? post.image : `${SITE_URL}${post?.image ?? ""}`;
    const keywords = post?.keywords?.en?.join(", ");

    const meta: Array<Record<string, string>> = [
      { title: `${title} — JadeMediaPro` },
      { name: "description", content: description },
      ...(keywords ? [{ name: "keywords", content: keywords }] : []),
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: pageUrl },
      { property: "og:type", content: "article" },
      { property: "og:site_name", content: "JadeMediaPro" },
      { property: "article:published_time", content: post?.isoDate ?? "" },
      { property: "article:author", content: post?.author ?? "JadeMediaPro" },
      { property: "article:section", content: post?.category.en ?? "Blog" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      ...(post ? [{ property: "og:image", content: imageUrl }, { name: "twitter:image", content: imageUrl }, { property: "og:image:alt", content: post.imageAlt.en }] : []),
    ];

    const articleSchema = post
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description,
          image: [imageUrl],
          datePublished: post.isoDate,
          dateModified: post.isoDate,
          author: { "@type": "Organization", name: post.author },
          publisher: {
            "@type": "Organization",
            name: "JadeMediaPro",
            logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.ico` },
          },
          mainEntityOfPage: pageUrl,
          keywords,
          articleSection: post.category.en,
          inLanguage: "en",
        }
      : null;

    const faqSchema = post?.faq?.en?.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.en.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }
      : null;

    const scripts: Array<{ type: string; children: string }> = [];
    if (articleSchema) scripts.push({ type: "application/ld+json", children: JSON.stringify(articleSchema) });
    if (faqSchema) scripts.push({ type: "application/ld+json", children: JSON.stringify(faqSchema) });

    return {
      meta,
      links: [{ rel: "canonical", href: pageUrl }],
      scripts,
    };
  },
  notFoundComponent: () => (
    <main className="min-h-screen bg-background px-4 py-24 text-center">
      <p className="text-sm text-foreground/70">Post not found.</p>
    </main>
  ),
  errorComponent: () => (
    <main className="min-h-screen bg-background px-4 py-24 text-center">
      <p className="text-sm text-foreground/70">Something went wrong.</p>
    </main>
  ),
  component: BlogPostPage,
});

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function renderContent(content: string) {
  const blocks = content.split(/\n\s*\n/);
  return blocks.map((raw, i) => {
    const block = raw.trim();
    if (!block) return null;
    if (block.startsWith("#### ")) {
      return (
        <h4 key={i} className="pt-2 font-display text-sm font-bold text-foreground">
          {block.slice(5)}
        </h4>
      );
    }
    if (block.startsWith("### ")) {
      return (
        <h3 key={i} className="pt-2 font-display text-base font-bold text-foreground">
          {block.slice(4)}
        </h3>
      );
    }
    if (block.startsWith("## ")) {
      const text = block.slice(3);
      return (
        <h2 key={i} id={slugify(text)} className="scroll-mt-24 pt-4 font-display text-lg font-bold text-foreground md:text-xl">
          {text}
        </h2>
      );
    }
    if (/^\d+\.\s/.test(block)) {
      const items = block.split(/\n/).map((l) => l.replace(/^\d+\.\s*/, ""));
      return (
        <ol key={i} className="list-decimal space-y-1 pl-5">
          {items.map((it, k) => (
            <li key={k}>{renderInline(it)}</li>
          ))}
        </ol>
      );
    }
    if (block.startsWith("- ")) {
      const items = block.split(/\n/).map((l) => l.replace(/^-\s*/, ""));
      return (
        <ul key={i} className="list-disc space-y-1 pl-5">
          {items.map((it, k) => (
            <li key={k}>{renderInline(it)}</li>
          ))}
        </ul>
      );
    }
    return <p key={i}>{renderInline(block)}</p>;
  });
}

function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((seg, k) => {
    if (seg.startsWith("**") && seg.endsWith("**")) return <strong key={k}>{seg.slice(2, -2)}</strong>;
    if (seg.startsWith("*") && seg.endsWith("*")) return <em key={k}>{seg.slice(1, -1)}</em>;
    return <span key={k}>{seg}</span>;
  });
}

function extractHeadings(content: string): { id: string; text: string }[] {
  return content
    .split(/\n/)
    .filter((l) => l.startsWith("## "))
    .map((l) => l.slice(3).trim())
    .map((text) => ({ id: slugify(text), text }));
}

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const { t, i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage ?? "en") as BlogLocale;
  const related = getRelatedPosts(post.slug, 3);
  const headings = extractHeadings(post.content[lang]);
  const faq = post.faq?.[lang];
  const cta = post.cta?.[lang];

  return (
    <main className="min-h-screen bg-background">
      <Header variant="light" active="Blog" ctaLabel={t("nav.startHere")} />
      <article className="px-4 pt-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 text-[11px]">
            <span className="rounded-full bg-brand-teal/30 px-3 py-1 font-semibold text-brand-purple-deep">
              {post.category[lang]}
            </span>
            <span className="text-foreground/60">{post.date[lang]}</span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
            {post.title[lang]}
          </h1>

          <div className="mt-4 flex items-center gap-2">
            <img
              src={author}
              alt={post.author}
              loading="lazy"
              width={48}
              height={48}
              className="h-7 w-7 rounded-full object-cover"
            />
            <span className="text-xs text-foreground/70">
              {t("blog.post.by")} {post.author}
            </span>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl">
            <img
              src={post.image}
              alt={post.imageAlt[lang]}
              width={1600}
              height={1008}
              className="h-64 w-full object-cover md:h-[420px]"
            />
          </div>

          {headings.length > 2 && (
            <nav
              aria-label={lang === "fr" ? "Table des matières" : "Table of contents"}
              className="mt-8 rounded-2xl border border-brand-purple-deep/10 bg-brand-teal/10 p-5"
            >
              <p className="font-display text-sm font-bold text-foreground">
                {lang === "fr" ? "Table des matières" : "Table of contents"}
              </p>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-xs text-foreground/80">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="hover:text-brand-purple-deep hover:underline">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="mt-8 space-y-5 text-sm leading-relaxed text-foreground/80">
            {renderContent(post.content[lang])}
          </div>

          {faq && faq.length > 0 && (
            <section id={slugify(lang === "fr" ? "Foire aux questions" : "Frequently Asked Questions")} className="mt-12">
              <h2 className="scroll-mt-24 font-display text-xl font-extrabold text-foreground md:text-2xl">
                {lang === "fr" ? "Foire aux questions" : "Frequently Asked Questions"}
              </h2>
              <div className="mt-4 space-y-4">
                {faq.map((item: { q: string; a: string }, i: number) => (
                  <div key={i} className="rounded-2xl border border-brand-purple-deep/10 bg-background p-5">
                    <p className="font-display text-sm font-bold text-foreground">{item.q}</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/75">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {cta && (
            <div className="mt-12 rounded-3xl bg-brand-purple-deep p-6 text-center md:p-10">
              <p className="font-display text-lg font-extrabold text-white md:text-2xl">
                {lang === "fr" ? "Prêt à passer à l’action ?" : "Ready to take the next step?"}
              </p>
              <p className="mx-auto mt-2 max-w-lg text-xs text-white/80 md:text-sm">
                {lang === "fr"
                  ? "Notre équipe est prête à vous aider à mettre ces idées en pratique."
                  : "Our team is ready to help you put these ideas to work."}
              </p>
              <Link
                to={cta.href}
                className="mt-5 inline-block rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-brand-purple-deep transition hover:bg-brand-teal"
              >
                {cta.label}
              </Link>
            </div>
          )}
        </div>
      </article>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-extrabold text-foreground md:text-3xl">
              {t("blog.post.moreTrending")}
            </h2>
            <Link
              to="/blog"
              className="rounded-full border border-brand-purple-deep/15 px-4 py-1.5 text-[11px] font-semibold text-brand-purple-deep"
            >
              {t("blog.post.viewAll")}
            </Link>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((p) => (
              <article
                key={p.slug}
                className="overflow-hidden rounded-2xl border border-brand-purple-deep/10 bg-background"
              >
                <img
                  src={p.image}
                  alt={p.imageAlt[lang]}
                  loading="lazy"
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="rounded-full bg-brand-teal/30 px-2.5 py-0.5 font-semibold text-brand-purple-deep">
                      {p.category[lang]}
                    </span>
                    <span className="text-foreground/60">{p.date[lang]}</span>
                  </div>
                  <h3 className="mt-3 font-display text-sm font-bold leading-snug text-foreground">
                    {p.title[lang]}
                  </h3>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="mt-3 inline-block text-[11px] font-semibold text-brand-purple"
                  >
                    {t("blog.readMore")}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </main>
  );
}
