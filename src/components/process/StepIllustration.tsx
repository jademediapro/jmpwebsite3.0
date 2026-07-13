import {
  ClipboardList,
  FileText,
  Palette,
  LayoutGrid,
  Mic,
  PenTool,
  Film,
  Music,
  Rocket,
  Search,
  Target,
  Sparkles,
  Layers,
  Activity,
  BarChart3,
  Zap,
  FileCheck,
  LayoutTemplate,
  MonitorSmartphone,
  Type,
  Code2,
  FlaskConical,
  Wrench,
  Image as ImageIcon,
  Pencil,
  Droplets,
  SlidersHorizontal,
  CalendarCheck,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

// Deeper accent per card, matching bgPalette hues (295/160/200/295/25/200/160/295/25)
const accents = [
  { hue: 295, base: "oklch(0.55 0.18 295)", deep: "oklch(0.38 0.16 295)" },
  { hue: 160, base: "oklch(0.60 0.15 160)", deep: "oklch(0.42 0.14 160)" },
  { hue: 200, base: "oklch(0.60 0.14 200)", deep: "oklch(0.42 0.13 200)" },
  { hue: 295, base: "oklch(0.55 0.18 295)", deep: "oklch(0.38 0.16 295)" },
  { hue: 25, base: "oklch(0.65 0.17 25)", deep: "oklch(0.48 0.16 25)" },
  { hue: 200, base: "oklch(0.60 0.14 200)", deep: "oklch(0.42 0.13 200)" },
  { hue: 160, base: "oklch(0.60 0.15 160)", deep: "oklch(0.42 0.14 160)" },
  { hue: 295, base: "oklch(0.55 0.18 295)", deep: "oklch(0.38 0.16 295)" },
  { hue: 25, base: "oklch(0.65 0.17 25)", deep: "oklch(0.48 0.16 25)" },
];

function iconFor(title: string): LucideIcon {
  const t = title.toLowerCase();
  if (t.includes("brief")) return ClipboardList;
  if (t.includes("script")) return FileText;
  if (t.includes("style frame") || t.includes("style layout")) return LayoutGrid;
  if (t.includes("storyboard")) return LayoutTemplate;
  if (t.includes("voice")) return Mic;
  if (t.includes("music") || t.includes("sound")) return Music;
  if (t.includes("animation")) return Film;
  if (t.includes("release") || t.includes("launch") || t.includes("delivery")) return Rocket;
  if (t.includes("research") || t.includes("reference") || t.includes("analysis")) return Search;
  if (t.includes("strategy")) return Target;
  if (t.includes("logo") || t.includes("identity")) return Sparkles;
  if (t.includes("touchpoint")) return Layers;
  if (t.includes("monitor")) return Activity;
  if (t.includes("goal")) return Target;
  if (t.includes("result") || t.includes("kpi") || t.includes("measure")) return BarChart3;
  if (t.includes("optimize") || t.includes("automate")) return Zap;
  if (t.includes("requirement") || t.includes("feasibility")) return FileCheck;
  if (t.includes("sitemap") || t.includes("wireframe") || t.includes("planning")) return LayoutTemplate;
  if (t.includes("ui") || t.includes("interface")) return MonitorSmartphone;
  if (t.includes("content") || t.includes("writing")) return Type;
  if (t.includes("development") || t.includes("develop")) return Code2;
  if (t.includes("prototyping") || t.includes("testing")) return FlaskConical;
  if (t.includes("operation") || t.includes("maintenance")) return Wrench;
  if (t.includes("plan")) return CalendarCheck;
  if (t.includes("imagery") || t.includes("image")) return ImageIcon;
  if (t.includes("rough") || t.includes("sketch")) return Pencil;
  if (t.includes("tone") || t.includes("color")) return Droplets;
  if (t.includes("detail")) return SlidersHorizontal;
  if (t.includes("illustration") || t.includes("design")) return PenTool;
  if (t.includes("implement") || t.includes("tactic")) return Zap;
  if (t.includes("marketing")) return Target;
  if (t.includes("palette")) return Palette;
  return Lightbulb;
}

export function StepIllustration({ index, title }: { index: number; title: string }) {
  const a = accents[index % accents.length];
  const Icon = iconFor(title);

  return (
    <svg
      viewBox="0 0 320 240"
      role="img"
      aria-label={`${title} illustration`}
      className="h-60 w-auto md:h-64"
    >
      {/* soft outer halo */}
      <circle cx="230" cy="120" r="110" fill={a.base} opacity="0.12" />
      {/* deep rounded plate */}
      <rect
        x="70"
        y="35"
        width="200"
        height="170"
        rx="36"
        fill={a.deep}
      />
      {/* mid accent blob */}
      <circle cx="95" cy="180" r="38" fill={a.base} opacity="0.85" />
      {/* small dot cluster */}
      <circle cx="255" cy="55" r="8" fill={a.base} />
      <circle cx="278" cy="78" r="4" fill={a.base} opacity="0.7" />
      <circle cx="245" cy="82" r="3" fill={a.base} opacity="0.5" />
      {/* thin decorative arc */}
      <path
        d="M 90 60 Q 170 20 260 60"
        fill="none"
        stroke={a.base}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* icon glyph */}
      <foreignObject x="130" y="80" width="80" height="80">
        <div
          style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Icon size={72} color="white" strokeWidth={1.5} />
        </div>
      </foreignObject>
    </svg>
  );
}
