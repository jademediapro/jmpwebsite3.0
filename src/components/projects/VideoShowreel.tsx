import { useTranslation } from "react-i18next";

const REELS = [
  { id: "691920896", title: "JadeMediaPro reel one" },
  { id: "784755666", title: "JadeMediaPro reel two" },
  { id: "784752176", title: "JadeMediaPro reel three" },
];

export function VideoShowreel() {
  const { t } = useTranslation();
  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-display text-2xl font-extrabold text-foreground md:text-3xl">
          {t("projects.showreel.title")}
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {REELS.map((r) => (
            <div key={r.id} className="relative aspect-video overflow-hidden rounded-[1.25rem] bg-foreground">
              <iframe
                src={`https://player.vimeo.com/video/${r.id}?title=0&byline=0&portrait=0&dnt=1`}
                title={r.title}
                loading="lazy"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
