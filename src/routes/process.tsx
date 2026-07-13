import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { CtaBanner } from "@/components/landing/CtaBanner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StepIllustration } from "@/components/process/StepIllustration";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Our Process — JadeMediaPro" },
      {
        name: "description",
        content:
          "A clear, step-by-step approach to design and development that helps us produce amazing results.",
      },
      { property: "og:title", content: "Our Process — JadeMediaPro" },
      {
        property: "og:description",
        content:
          "Animation, branding, illustration, marketing and web/app development project workflows.",
      },
    ],
  }),
  component: ProcessPage,
});

const phases = [
  {
    label: "DISCOVERY",
    n: "01",
    body: "We start by listening — meetings to understand your goals, audience and existing brand foundations.",
  },
  {
    label: "PLAN",
    n: "02",
    body: "We outline a strategy with clear milestones, deliverables and a timeline tailored to your project.",
  },
  {
    label: "CREATE",
    n: "03",
    body: "Our team designs, writes and produces every asset needed to bring your story to life.",
  },
  {
    label: "DEVELOP",
    n: "04",
    body: "We build, refine and review every piece with you to make sure each detail is on point.",
  },
  {
    label: "LAUNCH",
    n: "05",
    body: "We deploy your project, monitor performance and stay close to support what comes next.",
  },
];

const bgPalette = [
  "bg-[oklch(0.93_0.04_295)]",
  "bg-[oklch(0.93_0.05_160)]",
  "bg-[oklch(0.93_0.04_200)]",
  "bg-[oklch(0.92_0.05_295)]",
  "bg-[oklch(0.93_0.04_25)]",
  "bg-[oklch(0.93_0.04_200)]",
  "bg-[oklch(0.93_0.05_160)]",
  "bg-[oklch(0.92_0.05_295)]",
  "bg-[oklch(0.93_0.04_25)]",
];

type Step = { title: string; body: string };

const projects: Record<string, { label: string; steps: Step[] }> = {
  animation: {
    label: "Animation Project",
    steps: [
      {
        title: "Briefing",
        body: "To kick off the journey, we host an immersive discovery alignment meeting to uncover your brand goals, target audience profile, and messaging parameters. By diving deep into your timeline and budget parameters, our creative team synthesizes this foundational data into a comprehensive project brief. This blueprint establishes a clear strategic direction, aligning all key stakeholders from day one and effectively eliminating scope creep before production even begins.",
      },
      {
        title: "Scripting",
        body: "Building directly upon that established brief, we transition into developing your project's narrative backbone. Whether you supply an initial draft or collaborate directly with our writers, we translate your complex value propositions into an engaging, high-converting story. You retain full creative control with explicit sign-off milestones, ensuring the script is strategically optimized and fully approved before any visual assets are generated.",
      },
      {
        title: "Style Frames",
        body: "Once the narrative is locked in, we begin exploring visual aesthetics, color palettes, and design techniques tailored to your brand guidelines. Our team curates comprehensive mood boards and bespoke style frames that establish the exact look, texture, and visual identity of your upcoming video. This phase bridges the gap between words and imagery, securing early creative alignment and ensuring the final aesthetic matches your corporate identity.",
      },
      {
        title: "Storyboard",
        body: "With the visual style established, we map out the script sequence-by-scene to pre-visualize your story prior to active production. We construct a fully realized digital storyboard that defines layouts, objects, camera movements, and initial voiceover cues through descriptive notes and arrows. This layout phase creates a perfect blueprint of the film's structural flow, allowing you to review asset composition and minimize time-consuming revisions later.",
      },
      {
        title: "Voiceover Recording",
        body: "As the visual layout takes shape, we simultaneously source and direct the ideal vocal talent to match your brand's unique tone and budget. We provide meticulous performance direction regarding pace, mood, and audio clarity, or we can expertly edit and integrate an asset provided by your team. This professional audio architecture injects human emotion into the project, significantly increasing viewer retention and brand authority.",
      },
      {
        title: "Design & Illustration",
        body: "Following storyboard approval, our illustration team works undisturbed to build out every custom, animation-ready asset. We craft high-quality backgrounds, characters, icons, and infographics in the approved style, ranging from organic sketches to crisp vectors. By focusing entirely on asset precision during this specialized production phase, we deliver unique visual components that elevate your digital brand presence and set the stage for fluid motion.",
      },
      {
        title: "Animation",
        body: "Now that all visual and audio components are perfectly prepared, our animators bring the static designs to life with high-end motion techniques. We meticulously animate each frame over several weeks to match the rhythm of your script and storyboard layout. This high-impact phase transforms abstract ideas into dynamic visual sequences, capturing target audience attention and delivering the core engagement that drives digital conversions.",
      },
      {
        title: "Music & Sound Effects",
        body: "With the primary animation sequences compiled, we introduce cinematic depth by layering a bespoke, multi-sensory audio track. We refine the voiceover files, eliminate acoustic imperfections, and mix in tailored background music and custom sound effects (SFX) that complement the onscreen action. This careful acoustic balancing act acts as a final polish, amplifying the emotional narrative and maximizing user immersion.",
      },
      {
        title: "Release",
        body: "To wrap up the production lifecycle, we export and deliver your stunning animated video in optimized digital formats tailored to your distribution channels. We ensure your assets are completely launch-ready for web, social media campaigns, or commercial broadcasts, delivering them right to your digital doorstep. To maximize your return on investment, we also provide contemporary video marketing tips to ensure your campaign launches with maximum market impact.",
      },
    ],
  },
  branding: {
    label: "Branding Project",
    steps: [
      {
        title: "Briefing",
        body: "The branding transformation begins with an in-depth creative briefing session designed to uncover the core business drivers and future goals behind your organization. We ask targeted strategic questions to map out your initial ideas, resource requirements, and project timelines. This exploratory phase establishes absolute alignment among stakeholders, building a clear directional roadmap that forms the baseline for all creative engineering.",
      },
      {
        title: "Market & User Research",
        body: "Moving from alignment to execution, we immerse ourselves in your industry by conducting deep competitive intelligence and behavioral audits. We analyze market conditions, benchmark your top competitors, and build data-validated buyer personas to define exactly how your audience interacts with your space. This research-driven phase mitigates commercial risk, ensuring your future brand messaging targets high-yield market opportunities accurately from the start.",
      },
      {
        title: "Develop Brand Strategy",
        body: "Armed with data-backed insights, we combine logical thinking and creative ingenuity to define your unique corporate DNA. We collaborate with your leadership team to establish sustainable brand values, distinct brand voices, identity promises, and long-term market positioning statements. This resulting strategy forms a unified internal and external framework that effectively differentiates your business in crowded modern markets.",
      },
      {
        title: "Design Logo & Brand Identity",
        body: "With a definitive strategy in place, our design team translates abstract corporate values into an iconic, scalable visual presence. We evaluate typography layouts, color systems, and graphic treatments to engineer an authoritative primary logo and supporting visual marks. This identity functions as the visual anchor for your business, driving immediate market recognition and fostering deep consumer trust across all channels.",
      },
      {
        title: "Create Brand Touchpoints",
        body: "Once the visual identity is anchored, we expand the design framework across every physical and digital asset your consumer interacts with. We craft cohesive layouts for product packaging, corporate stationery, business cards, websites, and promotional brochures, ensuring a flexible yet harmonic aesthetic. This structural alignment delivers a premium, unified customer experience that reinforces your brand equity at every consumer touchpoint.",
      },
      {
        title: "Launch Strategy",
        body: "With your entire corporate asset suite finalized and approved, we architect a strategic rollout plan to introduce your new identity to the world. We supply production-ready file kits alongside custom internal and external launch communication blueprints. By prioritizing internal alignment first, we ensure your team embodies the brand values, maximizing the public marketplace impact and awareness during the official reveal.",
      },
      {
        title: "Monitor Assets Application",
        body: "To secure the long-term success of your rollout, we play an ongoing role in governing and managing your new brand assets. We compile a comprehensive brand identity guidelines handbook to streamline future asset application, maintaining consistency across evolving channels. By continually auditing and updating your brand elements as market conditions shift, we preserve your identity's credibility and relevance as your business scales.",
      },
    ],
  },
  illustration: {
    label: "Illustration Project",
    steps: [
      {
        title: "Briefing",
        body: "To initiate the creative process, we clarify your core concept through a series of foundational questions regarding your visual objectives. Once we establish your specific aesthetic requirements, we draft a comprehensive proposal that details the exact scope of work and upfront project quotes. This upfront alignment eliminates project ambiguity, giving you an explicit roadmap and ensuring predictable delivery with zero hidden costs.",
      },
      {
        title: "Reference Imagery",
        body: "With the project parameters defined, we begin gathering thematic inspiration, texture photo fragments, and environmental style benchmarks. We collage these diverse visual resources into cohesive reference mood boards that map out your vision in a realistic, actionable format. This baseline phase validates the artistic direction early, providing a vital source of visual inspiration before we put pen to paper.",
      },
      {
        title: "Style Layout",
        body: "Building directly on those reference collages, we select the precise technical illustration method that best suits your concept. We evaluate geometric or organic shapes, line weights, vector structures, and core layout grids to balance text and visual hierarchies. This structural phase establishes the underlying composition rules, ensuring the final asset layout perfectly aligns with your marketing goals.",
      },
      {
        title: "Rough Sketching",
        body: "Once the style layout rules are set, we rapidly iterate on low-fidelity thumbnail sketches to establish perfect proportions, scale, and character dimensions. We map out rough digital strokes over the reference layout without worrying about fine details, keeping the composition highly agile. This iterative sketching phase catches structural alignment issues early, preserving production timelines and project budgets.",
      },
      {
        title: "Clean Sketching",
        body: "Moving forward from initial rough concepts, we refine the approved linework into a high-definition digital sketch. We thin out construction scribbles, sharpen character expressions, and introduce smaller background objects to build clear perspectives and depth. This detailing phase solidifies the overarching layout, providing a crisp preview of the final piece before any color blocking begins.",
      },
      {
        title: "Basic Tone",
        body: "With the structural linework locked in, we slowly introduce color theory to establish the precise mood and narrative tone of the artwork. We apply light base colors before layering darker values to build up rich textures, dimension, and visual contrast. This intentional coloring process ensures a harmonic balance of complementary tones that capture user attention and reinforce your brand's style guide.",
      },
      {
        title: "Final Detailing",
        body: "After establishing the color tone, we enter a meticulous rendering phase to inject lifelike energy into the illustration. Our design team adjusts stroke widths, blending modes, custom brushes, and light gradients to masterfully enhance depth and highlights. This comprehensive refining pass ensures that all individual components fit together flawlessly, creating a striking, polished masterpiece.",
      },
      {
        title: "Delivery",
        body: "To conclude the creative workflow, we export your finalized, high-fidelity artwork into publication-ready digital file formats. We provide print-ready and web-optimized vectors (including SVG, EPS, and PNG options) along with actionable sharing guidelines to maximize engagement. This seamless handoff delivers instantly deployable visual assets designed to connect with your target audience across any modern marketing channel.",
      },
    ],
  },
  marketing: {
    label: "Marketing Project",
    steps: [
      {
        title: "Understanding Marketing Goals",
        body: "To launch a high-performing campaign, we anchor all digital initiatives to your overarching business objectives using the specialized SMART goals framework. We collaborate with you to define specific, measurable, attainable, relevant, and time-bound milestones spanning short, medium, and long-term timelines. This foundational matrix ensures every advertising dollar is structured to support measurable corporate growth and operational success.",
      },
      {
        title: "Research & Situational Analysis",
        body: "Building upon your defined targets, we dive into comprehensive market audits to identify high-yield growth opportunities. We execute exhaustive SWOT analyses, study changing market conditions, benchmark competitors, and construct data-validated buyer personas. This intelligence phase takes the guesswork out of your campaign, ensuring ad spend is directed exclusively toward high-value customer segments.",
      },
      {
        title: "Develop Marketing Strategy",
        body: "Once the data is audited, we engineer custom marketing funnels for the channels most frequented by your ideal consumers. We craft integrated campaigns blending search engine optimization (SEO), content marketing, paid search (SEM), targeted email sequencing, and social media outreach. This omnichannel blueprint protects business continuity by diversifying your lead generation and leaving a lasting brand impression.",
      },
      {
        title: "Implement Strategies & Tactics",
        body: "With your channels mapped out, we transition into deploying creative, highly personalized campaigns designed to move users through your conversion funnel. We tailor messaging to your validated buyer personas, delivering relevant touchpoints that turn passive web traffic into active clients. As your digital footprint scales, we continuously expand these tactics to match your emerging business goals.",
      },
      {
        title: "Measure Results & KPIs",
        body: "Following execution, we continually monitor your live campaign performance using advanced analytics dashboards to ensure optimal efficiency. We routinely test your core key performance indicators (KPIs) and adapt messaging elements if specific segments underperform. This real-time agility eliminates wasted ad spend, ensuring your budget is constantly funneled into your highest-performing marketing assets.",
      },
      {
        title: "Optimize & Automate Process",
        body: "To scale your customer acquisition while cutting overhead, we integrate advanced marketing automation systems directly into your operational workflow. We build automated email nurturing systems and social media distribution tracks to eliminate repetitive tasks from your daily pipeline. This automation optimization maximizes total revenue per customer while freeing up internal resources to focus entirely on high-level communications.",
      },
    ],
  },
  web: {
    label: "Web/App Development Project",
    steps: [
      {
        title: "Requirements & Feasibility Analysis",
        body: "Our collaboration begins with an in-depth requirements engineering workshop to define your product's core functionality, user parameters, and business metrics. We translate your concept into a precise technical blueprint, evaluating operational, legal, and financial feasibility matrices. This structured analysis removes costly assumptions, providing a sustainable, cost-efficient infrastructure plan before a single line of code is written.",
      },
      {
        title: "Planning: Sitemap & Wireframe",
        body: "Moving from blueprint to structure, we define your digital architecture by mapping out a technical sitemap to establish page hierarchy and asset relations. We then design low-fidelity user interface wireframes to sketch out the fundamental screen layouts without the distraction of colors or typography. This spatial layout phase secures early structural approval, ensuring intuitive user navigation flows from the very start.",
      },
      {
        title: "User Interface (UI) Design",
        body: "Once the wireframes are approved, our UI design team transforms the structural skeletons into stunning, brand-aligned visual experiences. We design cohesive components, typography hierarchies, interactive menus, custom buttons, and smooth animations that define the exact look and feel of the product. This creative phase establishes an engaging user experience that reflects your brand and maximizes conversion potential.",
      },
      {
        title: "Content Writing & Visual Elements",
        body: "Simultaneously with visual design, we construct high-converting, SEO-optimized copy to capture user attention and drive digital actions. If you have internal content, we integrate and polish it to ensure it fits perfectly within the interface layouts. We also convert complex text blocks into professional icons and graphics, improving copy scannability and keeping users engaged with your brand narrative.",
      },
      {
        title: "Development",
        body: "Following design validation, our development team initiates production sprints to construct your core frontend and backend infrastructure. We hold collaborative planning meetings to prioritize the product backlog, assess development workloads, and translate static mockups into responsive, live code. Utilizing cutting-edge technologies, we engineer a secure, robust product that behaves flawlessly across all modern devices.",
      },
      {
        title: "Prototyping & Testing",
        body: "Throughout the development lifecycle, we conduct continuous manual and automated quality assurance testing to optimize speed, usability, and data security. We deploy functional prototypes in staging environments to execute cross-browser evaluations, device compatibility checks, and bug tracking. This rigorous validation mitigates technical bugs early, protecting your platform's operational integrity prior to public deployment.",
      },
      {
        title: "Launch",
        body: "Once quality assurance testing wraps up, we execute a seamless transition to your production cloud servers or on-premises hosting environments. We manage the deployment architecture and coordinate targeted launch communication timelines to turn your product release into an engaging market event. This precise deployment phase ensures zero system downtime, protecting user experiences from day one.",
      },
      {
        title: "Operations & Maintenance",
        body: "Following a successful launch, we protect your digital investment by providing comprehensive post-launch support and regular system updates. We collect direct end-user feedback, deploy security patches, and monitor system health parameters to keep your application functioning optimally. As your organization grows, we scale your infrastructure seamlessly, adding new pages and complex features without interrupting daily business operations.",
      },
    ],
  },
};

function ProcessPage() {
  const { t } = useTranslation();
  const [project, setProject] = useState<keyof typeof projects>("animation");
  const steps = projects[project].steps;
  const translatedPhases = t("process.phases", { returnObjects: true }) as { label: string; body: string }[];
  const projectLabels = t("process.projectLabels", { returnObjects: true }) as Record<string, string>;

  return (
    <main className="min-h-screen bg-background">
      <Header variant="light" active="Projects" ctaLabel={t("nav.startHere")} />

      <section className="px-4 pt-10">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="font-display text-3xl font-extrabold text-brand-purple-deep md:text-4xl">
            {t("process.title")}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-xs text-foreground/70 md:text-sm">
            {t("process.intro")}
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-2 md:grid-cols-5">
          {translatedPhases.map((p, idx) => (
            <div key={p.label} className="relative">
              <h3 className="text-[11px] font-bold tracking-[0.18em] text-brand-purple-deep">
                {p.label}
              </h3>
              <p className="mt-2 text-[11px] leading-relaxed text-foreground/70">{p.body}</p>
              <div
                aria-hidden
                className="pointer-events-none mt-3 select-none font-display text-[64px] font-extrabold leading-none text-brand-teal/30 md:text-[80px]"
              >
                {phases[idx]?.n ?? String(idx + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="whitespace-pre-line font-display text-2xl font-extrabold text-brand-purple-deep md:text-3xl">
            {t("process.workflowTitle")}
          </h2>

          <div className="mt-5 flex justify-center">
            <Select value={project} onValueChange={(v) => setProject(v as keyof typeof projects)}>
              <SelectTrigger className="h-auto w-auto gap-2 rounded-full border-0 bg-brand-purple-soft px-4 py-1.5 text-[11px] font-semibold text-brand-purple-deep shadow-none focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                {Object.keys(projects).map((key) => (
                  <SelectItem key={key} value={key} className="text-xs">
                    {projectLabels[key] ?? projects[key as keyof typeof projects].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-5xl flex-col gap-6">
          {steps.map((s, i) => (
            <article
              key={s.title}
              className={`overflow-hidden rounded-3xl ${bgPalette[i % bgPalette.length]} grid grid-cols-1 gap-4 p-6 md:grid-cols-2 md:p-8`}
            >
              <div className="flex flex-col justify-center">
                <h3 className="font-display text-lg font-extrabold text-brand-purple-deep md:text-xl">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-md text-xs leading-relaxed text-foreground/75">
                  {s.body}
                </p>
              </div>
              <div className="flex items-center justify-center md:justify-end">
                <StepIllustration index={i} title={s.title} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </main>
  );
}
