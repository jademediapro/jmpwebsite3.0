import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import daniel from "@/assets/testimonial-daniel.jpg";
import olatundun from "@/assets/testimonial-olatundun.jpg";
import simeon from "@/assets/testimonial-simeon.jpg";
import martina from "@/assets/testimonial-martina.jpg";
import michael from "@/assets/testimonial-michael.jpg";

type Testimonial = {
  photo: string;
  badge: string;
  quote: string;
  firstName: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    photo: daniel,
    badge: "CendMate Project",
    quote:
      "Before developing our professional brand strategy and identity, the JadeMediaPro team took the time to fully understand our business, vision, and services. They were incredibly accommodating throughout the project and often worked late nights to bridge the time difference and meet our deadline. Their dedication, professionalism, and quality of work were exceptional. We highly recommend them and look forward to working together again.",
    firstName: "Daniel",
    role: "R.A. — CendMate",
  },
  {
    photo: olatundun,
    badge: "TRIO Brand Project",
    quote:
      "Working with the JadeMediaPro team was an excellent experience. They consistently exceeded my expectations, accommodating my ideas while creating our business logo. They deliver quickly, maintain outstanding quality, and truly know how to transform concepts into reality. I highly recommend this talented and professional team.",
    firstName: "Olatundun",
    role: "CEO — TRIO Brand",
  },
  {
    photo: simeon,
    badge: "Tozome Project",
    quote:
      "I've worked with JadeMediaPro for several years on various design projects, including posters and video editing. Their ability to transform complex ideas into clean, elegant designs continues to impress me. Their attention to detail, commitment to quality, and reliability make them an exceptional creative partner. I wholeheartedly recommend their services.",
    firstName: "Simeon",
    role: "Founder — Tozome",
  },
  {
    photo: martina,
    badge: "CBEHx Project",
    quote:
      "We've partnered with JadeMediaPro for several years, and their service has consistently been outstanding. Their professionalism, creativity, and reliability make them an easy recommendation for anyone seeking quality digital solutions.",
    firstName: "Martina",
    role: "Director — CBEHx",
  },
  {
    photo: michael,
    badge: "Developful Project",
    quote:
      "Excellent work from start to finish. The JadeMediaPro team understood our requirements perfectly and delivered work of exceptional quality. Their communication, customer service, creativity, and professionalism exceeded our expectations. We look forward to collaborating again.",
    firstName: "Michael",
    role: "Founder — Developful",
  },
];

export function Feedback() {
  const { t: tr } = useTranslation();
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const prev = () => setI((n) => (n - 1 + testimonials.length) % testimonials.length);
  const next = () => setI((n) => (n + 1) % testimonials.length);

  return (
    <section className="px-4 py-14">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-3xl font-bold md:text-4xl">{tr("feedback.title")}</h2>



        <div className="relative mt-8 inline-block">
          <img
            src={t.photo}
            alt={`${t.firstName} — ${t.role}`}
            loading="lazy"
            width={512}
            height={512}
            className="mx-auto h-72 w-full max-w-md rounded-3xl object-cover md:h-96"
          />
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-brand-purple-deep shadow-md">
            {t.badge}
          </span>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            onClick={prev}
            aria-label={tr("feedback.prev")}
            className="grid h-10 w-10 place-items-center rounded-full border border-border text-brand-purple-deep transition hover:bg-surface"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="max-w-xl">
            <div className="font-display text-5xl leading-none text-brand-purple-deep">“</div>
            <p className="mt-1 text-sm italic text-foreground/80 md:text-base">{t.quote}</p>
            <div className="mt-4 font-display text-base font-bold">{t.firstName}</div>
            <div className="text-xs text-muted-foreground">{t.role}</div>
          </div>
          <button
            onClick={next}
            aria-label={tr("feedback.next")}
            className="grid h-10 w-10 place-items-center rounded-full border border-border text-brand-purple-deep transition hover:bg-surface"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
