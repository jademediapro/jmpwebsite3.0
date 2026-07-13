import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const WORDS = ["Montréal", "Ottawa", "Lagos"];
const DISPLAY_MS = 8000;
const OUT_MS = 520;
const IN_MS = 620;

// Elegant crossfade: outgoing word blurs and lifts, incoming word rises from
// below with a soft blur-to-focus. Loops seamlessly through the three cities.
export function FlipWord() {
  useTranslation(); // re-render on language change so the surrounding layout stays in sync
  const [index, setIndex] = useState(0);
  const [next, setNext] = useState(1);
  const [phase, setPhase] = useState<"idle" | "swap">("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const clear = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    const schedule = () => {
      const tDisplay = setTimeout(() => {
        const upcoming = (index + 1) % WORDS.length;
        setNext(upcoming);
        setPhase("swap");
        const tDone = setTimeout(() => {
          setIndex(upcoming);
          setPhase("idle");
          schedule();
        }, Math.max(OUT_MS, IN_MS));
        timers.current.push(tDone);
      }, DISPLAY_MS);
      timers.current.push(tDisplay);
    };
    schedule();
    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const current = WORDS[index];
  const incoming = WORDS[next];
  const swapping = phase === "swap";

  // Smooth, natural easing — Material "standard" curve.
  const EASE = "cubic-bezier(0.22, 0.61, 0.36, 1)";

  return (
    <span
      className="relative inline-block align-baseline"
      aria-live="polite"
      aria-atomic="true"
      style={{ lineHeight: 1 }}
    >
      {/* Sizer keeps inline width/height stable across word swaps */}
      <span className="invisible whitespace-pre">
        {current.length >= incoming.length ? current : incoming}
      </span>

      {/* Outgoing word — fades out, blurs, drifts up */}
      <span
        aria-hidden={swapping ? true : undefined}
        className="pointer-events-none absolute inset-0 whitespace-pre"
        style={{
          opacity: swapping ? 0 : 1,
          transform: swapping ? "translateY(-24%)" : "translateY(0)",
          filter: swapping ? "blur(6px)" : "blur(0)",
          transition: `opacity ${OUT_MS}ms ${EASE}, transform ${OUT_MS}ms ${EASE}, filter ${OUT_MS}ms ${EASE}`,
          willChange: "opacity, transform, filter",
        }}
      >
        {current}
      </span>

      {/* Incoming word — rises up into place, blur resolves to focus */}
      <span
        aria-hidden={swapping ? undefined : true}
        className="pointer-events-none absolute inset-0 whitespace-pre"
        style={{
          opacity: swapping ? 1 : 0,
          transform: swapping ? "translateY(0)" : "translateY(28%)",
          filter: swapping ? "blur(0)" : "blur(8px)",
          transition: `opacity ${IN_MS}ms ${EASE}, transform ${IN_MS}ms ${EASE}, filter ${IN_MS}ms ${EASE}`,
          willChange: "opacity, transform, filter",
        }}
      >
        {incoming}
      </span>
    </span>
  );
}
