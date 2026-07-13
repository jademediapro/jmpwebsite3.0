# JadeMediaPro Landing Page — Pixel-Faithful Recreation

Recreate the provided design as the home page (`/`) using TanStack Start, Tailwind v4, and the existing shadcn components. The layout, spacing, typography, and color palette will match the reference; only image assets will be substituted (sourced via AI image generation to approximate the originals).

## Design system

Add tokens to `src/styles.css` matching the reference palette:
- `--brand-purple`: deep purple (hero, professional services, footer) ~ `oklch(0.32 0.13 300)`
- `--brand-purple-soft`: light lavender card (Branding & Design active item)
- `--brand-teal`: mint/teal (CTA banner, "What We Can Do For You" card, projects bg) ~ `oklch(0.78 0.09 175)`
- `--brand-teal-dark`: deeper teal for the CTA button on purple
- `--surface`: light gray section bg (Services, Popular Post)
- Foreground tokens for purple and teal sections

Typography: bold sans-serif display for headings (Inter/Plus Jakarta Sans bold), regular sans for body. Logo wordmark uses a custom display style.

## Page structure (single route: `src/routes/index.tsx`)

Replace `PlaceholderIndex`. Build as composed sections, each in its own component file under `src/components/landing/`:

1. **Header / NavBar** — purple bar with JadeMediaPro logo (left), pill-shaped nav (Home active in green pill, Services, Pricing, Blog, About, Contact), "Get a Quote" rounded button with arrow icon (right).
2. **Hero** — purple background, "Digital Agency in Montréal" large heading, supporting tagline top-right, embedded rounded photo of team at desks, floating chip pills overlaid bottom-left ("Branding", "Coding", "Marketing", etc.).
3. **Our Clients** — purple band, centered title, row of 6 monochrome client logos (amazon, LinkedIn, Medium, Airbnb, Spotify, tumblr).
4. **Our Services** — light gray rounded section. Left column: two stacked image cards (whiteboard photo with circular arrow badge; teal card with "What We Can Do For You" + man with laptop). Right column: numbered accordion list (01 Branding & Design expanded with description + "Learn more" pill, 02 Business Strategy, 03 Digital Marketing, 04 Motion Graphics Design, 05 Web & Mobile App Development, 06 Art & Photography). Use shadcn Accordion.
5. **Latest Projects and Success Stories** — teal rounded section. Heading left, 3 filter pills right (All, Branding active, Software Development). 3 image project cards with rounded corners, label pill bottom-left, arrow icon bottom-right.
6. **Professional Practice Management Services** — purple rounded section. Heading + paragraph, then two-column layout: left has "Streamlined Research" highlighted item with icon, then list (Organized Ideation, Design Thinking, Controlled Implementation, Result Monitoring) with separators; right has paragraph + photo of team collaborating + teal "Get Your Free Proposal" CTA.
7. **Our Clients Feedback** — white section. Centered title, large rounded photo of testimonial person with floating name pill, large quote glyph, italic testimonial text, name + role, left/right carousel arrows.
8. **Popular Post** — light gray rounded section. Heading + subtitle left, "View all" pill right. 3 blog cards: image, category pill + date, title, "Read More".
9. **Make Your Business Globally Recognized Today** — teal rounded CTA banner with quote marks, heading, subtitle, white "Get Started Today!" button, decorative purple heart graphic on right.
10. **Footer** — purple. Logo + description + social icons + contact left; columns: Work, About, Services; Newsletter signup with email input and teal "Back to Top" button. Bottom row: copyright + Terms & Privacy.

## Images

Generate placeholder images via `imagegen--generate_image` (fast tier) for: hero team photo, whiteboard hand, man with laptop, 3 project images (cosmetics, highway aerial, finance illustration), testimonial person, 3 popular post images (beach, Venice, orange car). Client logos: use simple SVG/text approximations in monochrome white/light. Decorative heart in CTA: inline SVG.

## Responsiveness

Mobile-first matching the reference (it is a mobile/narrow layout). At `md`+ breakpoints, expand grids (services 2-col, projects 3-col, posts 3-col, footer 4-col) — proportions matching the design.

## Technical notes

- One route file: `src/routes/index.tsx` renders `<Landing />`.
- Sections in `src/components/landing/*.tsx`.
- Use shadcn `Accordion`, `Button`, `Input`, `Card` where helpful; restyle via design tokens, no hard-coded colors in components.
- Set `head()` meta with title "JadeMediaPro — Digital Agency in Montréal" and matching description/og tags.
- No backend, no Lovable Cloud — pure presentation.

## Out of scope

- Functional nav routing (links present but only `/` exists).
- Real form submission for newsletter.
- Real testimonials carousel logic (static slide; arrows non-functional).
