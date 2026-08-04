import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SITE_URL } from "@/lib/seo";
import { BackToTop } from "@/components/BackToTop";
import "@/i18n";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "JadeMediaPro — Creative Digital Agency in Montréal" },
      {
        name: "description",
        content:
          "JadeMediaPro is a creative digital agency in Montréal delivering branding, web design, video production and digital marketing for growing brands.",
      },
      { name: "author", content: "JadeMediaPro" },
      { property: "og:site_name", content: "JadeMediaPro" },
      { property: "og:title", content: "JadeMediaPro — Creative Digital Agency in Montréal" },
      {
        property: "og:description",
        content:
          "Branding, web design, video production and digital marketing from a Montréal-based creative agency.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_CA" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${SITE_URL}/#organization`,
              name: "JadeMediaPro",
              url: SITE_URL,
              logo: `${SITE_URL}/android-chrome-512x512.png`,
              description:
                "Creative digital agency delivering branding, web design, video production and digital marketing.",
              areaServed: ["Montréal", "Ottawa", "Lagos"],
              email: "jademediapro@gmail.com",
              sameAs: ["https://www.instagram.com/jademediapro", "https://www.linkedin.com/company/jademediapro"],
            },
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: SITE_URL,
              name: "JadeMediaPro",
              publisher: { "@id": `${SITE_URL}/#organization` },
              inLanguage: ["en-CA", "fr-CA"],
            },
            {
              "@type": "LocalBusiness",
              "@id": `${SITE_URL}/#localbusiness`,
              name: "JadeMediaPro",
              url: SITE_URL,
              image: `${SITE_URL}/android-chrome-512x512.png`,
              email: "jademediapro@gmail.com",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Montréal",
                addressRegion: "QC",
                addressCountry: "CA",
              },
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <BackToTop />
    </QueryClientProvider>
  );
}
