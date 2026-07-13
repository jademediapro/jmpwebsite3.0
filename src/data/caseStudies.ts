import mercedesHero from "@/assets/cs-mercedes-hero.jpg";
import mercedesUi1 from "@/assets/cs-ui-1.jpg";
import mercedesUi2 from "@/assets/cs-ui-2.jpg";
import mercedesPlant from "@/assets/cs-plant.jpg";
import mercedesWelding from "@/assets/cs-welding.jpg";
import mercedesCorridor from "@/assets/cs-corridor.jpg";
import mercedesWall from "@/assets/cs-wall.jpg";
import mercedesControl from "@/assets/cs-control.jpg";

import tozomeHeader from "@/assets/casestudies/tozome-header.jpg.asset.json";
import tozomeAnalysis from "@/assets/casestudies/tozome-analysis.jpg.asset.json";
import tozomeStrategy from "@/assets/casestudies/tozome-strategy.jpg.asset.json";
import tozomeProduction from "@/assets/casestudies/tozome-production.jpg.asset.json";
import tozomeEditing from "@/assets/casestudies/tozome-editing.jpg.asset.json";

import ariwaHeader from "@/assets/casestudies/ariwa-header.jpg.asset.json";
import ariwaAnalysis from "@/assets/casestudies/ariwa-analysis.jpg.asset.json";
import ariwaStrategy from "@/assets/casestudies/ariwa-strategy.jpg.asset.json";
import ariwaDesign1 from "@/assets/casestudies/ariwa-design-01.jpg.asset.json";
import ariwaDesign2 from "@/assets/casestudies/ariwa-design-02.jpg.asset.json";
import ariwaDev2 from "@/assets/casestudies/ariwa-dev-02.jpg.asset.json";
import ariwaDev3 from "@/assets/casestudies/ariwa-dev-03.jpg.asset.json";
import ariwaColl1 from "@/assets/casestudies/ariwa-coll-01.jpg.asset.json";
import ariwaColl2 from "@/assets/casestudies/ariwa-coll-02.jpg.asset.json";
import ariwaColl3 from "@/assets/casestudies/ariwa-coll-03.jpg.asset.json";

import developfulHeader from "@/assets/casestudies/developful-header.jpg.asset.json";

import coinplayHeader from "@/assets/casestudies/coinplay-header.jpg.asset.json";
import coinplay01 from "@/assets/casestudies/coinplay-01.jpg.asset.json";
import coinplay02 from "@/assets/casestudies/coinplay-02.jpg.asset.json";
import coinplay03 from "@/assets/casestudies/coinplay-03.jpg.asset.json";
import coinplay04 from "@/assets/casestudies/coinplay-04.jpg.asset.json";

type Bi = { en: string; fr: string };

export type CaseSection = {
  label: Bi;
  body: Bi;
  image?: string;
  imageAlt?: Bi;
};

export type CaseStudy = {
  slug: string;
  hero: string;
  heroAlt: Bi;
  title: Bi;
  subtitle: Bi;
  client: Bi;
  location: Bi;
  duration: Bi;
  scope: { en: string[]; fr: string[] };
  expertise: { en: string[]; fr: string[] };
  overview: Bi;
  metricValue: string;
  metricLabel: Bi;
  metricSub: Bi;
  sections: CaseSection[];
  gallery?: { image: string; alt: Bi }[];
  metaTitle: Bi;
  metaDescription: Bi;
  categoryTag: Bi;
};

const AR = (en: string, fr: string): Bi => ({ en, fr });

export const caseStudies: CaseStudy[] = [
  {
    slug: "tozome",
    hero: tozomeHeader.url,
    heroAlt: AR("Tozome travel storytelling case study", "Étude de cas Tozome, récit de voyage"),
    title: AR("Tozome — Travel Storytelling", "Tozome — Récits de voyage"),
    subtitle: AR("Motion & Video Case Study", "Étude de cas motion et vidéo"),
    client: AR("Tozome", "Tozome"),
    location: AR("United Kingdom", "Royaume-Uni"),
    duration: AR("3 Months", "3 mois"),
    scope: {
      en: ["Business Model", "Workshops", "Brand Strategy", "Brand Identity", "Website"],
      fr: ["Modèle d’affaires", "Ateliers", "Stratégie de marque", "Identité de marque", "Site web"],
    },
    expertise: {
      en: ["Video Production", "Motion Editing", "Cinematography", "Colour Grading"],
      fr: ["Production vidéo", "Montage animé", "Cinématographie", "Étalonnage"],
    },
    overview: AR(
      "Tozome is a UK-based community of explorers, creators, and storytellers from across Europe. We produced a series of short, cinematic travel films that stitch together footage from many contributors into a single, honest portrait of each destination — capturing the cultural, historical and social realities travellers actually experience.",
      "Tozome est une communauté britannique d’explorateurs, créateurs et conteurs de partout en Europe. Nous avons réalisé une série de courts films cinématographiques réunissant des séquences de plusieurs contributeurs pour brosser un portrait sincère de chaque destination — en captant les réalités culturelles, historiques et sociales que vivent réellement les voyageurs."
    ),
    metricValue: "2–3 min",
    metricLabel: AR("Runtime per film", "Durée par film"),
    metricSub: AR("Scenes change every 3–4 seconds to keep viewers engaged", "Les plans changent toutes les 3–4 secondes pour maintenir l’intérêt"),
    sections: [
      {
        label: AR("Challenge", "Défi"),
        body: AR(
          "Turn footage sourced from many travellers into a cohesive final film that represents each destination authentically. Every video had to feel approachable, delightful and cinematic — a true reflection of the culture, history and everyday life travellers encountered on the ground.",
          "Transformer des séquences captées par plusieurs voyageurs en un film final cohérent qui représente fidèlement chaque destination. Chaque vidéo devait sembler accessible, agréable et cinématographique — un vrai reflet de la culture, de l’histoire et de la vie quotidienne rencontrée sur place."
        ),
        image: tozomeAnalysis.url,
        imageAlt: AR("Analysis moodboard for Tozome travel films", "Planche d’analyse pour les films de voyage Tozome"),
      },
      {
        label: AR("Strategy", "Stratégie"),
        body: AR(
          "We built a short-form editorial framework: 2–3 minutes per film, scene changes every 3–4 seconds, and a consistent colour grade across every transition. The result feels streamlined without overdramatising a place — a rhythm designed to inspire real travel, not just clicks.",
          "Nous avons défini un cadre éditorial court : 2 à 3 minutes par film, un changement de plan toutes les 3 à 4 secondes et un étalonnage cohérent entre chaque transition. Le résultat est fluide sans surdramatiser un lieu — un rythme conçu pour susciter de vrais voyages, pas juste des clics."
        ),
        image: tozomeStrategy.url,
        imageAlt: AR("Strategy frame from Tozome production", "Image de stratégie de la production Tozome"),
      },
      {
        label: AR("Production", "Production"),
        body: AR(
          "Aerial, ground and low-light plates were shot to add dimension to each landscape. Pan-and-tilt and time-lapse techniques replaced static crowds, adding movement even in quiet moments. Golden-hour, blue-hour and night sequences layered dynamism into the final cuts.",
          "Nous avons capté des plans aériens, au sol et en basse lumière pour donner du relief à chaque paysage. Panoramiques, tilts et time-lapses ont remplacé les foules statiques et injecté du mouvement, même dans les instants calmes. Les séquences à l’heure dorée, à l’heure bleue et de nuit ajoutent du dynamisme au montage final."
        ),
        image: tozomeProduction.url,
        imageAlt: AR("Aerial and ground production stills", "Photogrammes de production aériens et au sol"),
      },
      {
        label: AR("Editing & Delivery", "Montage et livraison"),
        body: AR(
          "Consistent colour correction, subtle music and gentle transitions carry the viewer through each scene. Every film was delivered in 4K to preserve the beauty of the landscapes, with location references keyed to the dynamic movement of the footage.",
          "Un étalonnage constant, une musique subtile et des transitions douces guident le spectateur d’un plan à l’autre. Chaque film a été livré en 4K pour préserver la beauté des paysages, avec des repères de lieu synchronisés au mouvement des séquences."
        ),
        image: tozomeEditing.url,
        imageAlt: AR("Editing suite still for Tozome", "Photogramme de montage pour Tozome"),
      },
    ],
    metaTitle: AR("Tozome Travel Film Case Study — JadeMediaPro", "Étude de cas — Films de voyage Tozome — JadeMediaPro"),
    metaDescription: AR(
      "How JadeMediaPro shaped cinematic 2–3 minute travel films for Tozome, a UK community of explorers, using strategy, production and editing built for authentic storytelling.",
      "Comment JadeMediaPro a façonné pour Tozome des films de voyage cinématographiques de 2 à 3 minutes, grâce à une stratégie, une production et un montage au service d’un récit authentique."
    ),
    categoryTag: AR("Motion & Video", "Motion et vidéo"),
  },
  {
    slug: "ariwa-fashion",
    hero: ariwaHeader.url,
    heroAlt: AR("Ariwa leather fashion brand identity", "Identité de marque du cuir Ariwa"),
    title: AR("Ariwa Fashion — Leather Brand Identity", "Ariwa Fashion — Identité de marque cuir"),
    subtitle: AR("Branding & Design Case Study", "Étude de cas image de marque et design"),
    client: AR("Ariwa Fashion", "Ariwa Fashion"),
    location: AR("Lagos, Nigeria", "Lagos, Nigeria"),
    duration: AR("6 Weeks", "6 semaines"),
    scope: {
      en: ["Brand Strategy", "Logo Design", "Visual Identity", "Brand Guidelines", "Collateral"],
      fr: ["Stratégie de marque", "Design du logo", "Identité visuelle", "Guides de marque", "Supports"],
    },
    expertise: {
      en: ["Brand Positioning", "Typography Systems", "Colour Systems", "Packaging"],
      fr: ["Positionnement de marque", "Systèmes typographiques", "Systèmes chromatiques", "Emballage"],
    },
    overview: AR(
      "Ariwa is a Lagos-born leather house at the forefront of African-inspired fashion — grounded in originality, craftsmanship and modern aesthetics. We designed an identity system that mirrors the quality of the product: quietly luxurious, unmistakably Ariwa, and built to hold up on everything from a shoe box to a storefront.",
      "Ariwa est une maison de cuir née à Lagos, à l’avant-garde de la mode d’inspiration africaine — enracinée dans l’originalité, l’artisanat et une esthétique moderne. Nous avons conçu un système d’identité qui reflète la qualité du produit : discrètement luxueux, résolument Ariwa, pensé pour tenir sur tout support, d’une boîte à chaussures à une vitrine."
    ),
    metricValue: "1",
    metricLabel: AR("Wordmark system", "Système wordmark"),
    metricSub: AR("Extensible across product, packaging and campaigns", "Extensible aux produits, à l’emballage et aux campagnes"),
    sections: [
      {
        label: AR("Challenge", "Défi"),
        body: AR(
          "Design a mark that captures Ariwa’s luxurious, classy character while staying instantly recognisable on hand-crafted leather goods. Every choice — colour, stroke weight, type and layout — had to work in harmony with the products so the brand and the object felt like one thing.",
          "Créer une marque qui traduit le caractère luxueux et raffiné d’Ariwa tout en restant immédiatement reconnaissable sur des articles en cuir façonnés à la main. Chaque choix — couleur, épaisseur de trait, typographie, mise en page — devait s’harmoniser avec les produits pour que la marque et l’objet ne fassent qu’un."
        ),
        image: ariwaAnalysis.url,
        imageAlt: AR("Ariwa brand exploration boards", "Planches d’exploration de la marque Ariwa"),
      },
      {
        label: AR("Strategy", "Stratégie"),
        body: AR(
          "We ran a positioning exercise on the brand’s core attributes — modern vs. traditional, everyday vs. luxury, gendered vs. universal — and defined the values Ariwa needed to communicate. Those signals became the guardrails for every visual decision that followed.",
          "Nous avons mené un exercice de positionnement sur les attributs clés — moderne ou traditionnel, quotidien ou luxueux, genré ou universel — et défini les valeurs qu’Ariwa devait transmettre. Ces repères ont guidé toutes les décisions visuelles suivantes."
        ),
        image: ariwaStrategy.url,
        imageAlt: AR("Ariwa strategy references", "Références stratégiques Ariwa"),
      },
      {
        label: AR("Design", "Design"),
        body: AR(
          "The simpler, the better. We landed on an abstract wordmark system built on neutral tones, moderately thick strokes and a refined serif — a professional, timeless palette that complements finely hand-crafted leather without competing with it, and speaks equally to men and women.",
          "Plus c’est simple, mieux c’est. Nous avons opté pour un système de wordmark abstrait, décliné en tons neutres, avec des traits d’épaisseur modérée et un serif raffiné — une palette professionnelle et intemporelle qui accompagne le cuir façonné à la main sans lui faire d’ombre, et qui s’adresse autant aux hommes qu’aux femmes."
        ),
        image: ariwaDesign1.url,
        imageAlt: AR("Ariwa wordmark and product application", "Wordmark Ariwa et application produit"),
      },
      {
        label: AR("Development", "Développement"),
        body: AR(
          "We rolled the system across business cards, letterheads, campaign pages and product touchpoints using a single colour palette and typographic hierarchy — so every asset feels part of the same family, and every future launch has a clear playbook to follow.",
          "Nous avons décliné le système sur les cartes de visite, papiers à en-tête, pages de campagne et supports produit avec une seule palette et une hiérarchie typographique unique — chaque livrable appartient à la même famille, et chaque futur lancement dispose d’un cadre clair."
        ),
        image: ariwaDev2.url,
        imageAlt: AR("Ariwa collateral applications", "Applications des supports Ariwa"),
      },
      {
        label: AR("Collateral", "Supports"),
        body: AR(
          "Product-first collateral shot from multiple angles gives customers a true sense of the piece before they buy. Sophisticated tone, concise copy and consistent colour throughout the system make every touchpoint feel intentional, elegant and unmistakably Ariwa.",
          "Des supports axés produit, photographiés sous plusieurs angles, offrent aux clients une idée juste de la pièce avant l’achat. Un ton soigné, un texte concis et une couleur constante font de chaque point de contact quelque chose d’intentionnel, d’élégant et de résolument Ariwa."
        ),
        image: ariwaDev3.url,
        imageAlt: AR("Ariwa retail collateral spread", "Ensemble des supports commerciaux Ariwa"),
      },
    ],
    gallery: [
      { image: ariwaColl1.url, alt: AR("Ariwa collateral one", "Support Ariwa 1") },
      { image: ariwaColl2.url, alt: AR("Ariwa collateral two", "Support Ariwa 2") },
      { image: ariwaColl3.url, alt: AR("Ariwa collateral three", "Support Ariwa 3") },
      { image: ariwaDesign2.url, alt: AR("Ariwa design detail", "Détail de design Ariwa") },
    ],
    metaTitle: AR("Ariwa Fashion Brand Identity Case Study — JadeMediaPro", "Étude de cas — Identité Ariwa Fashion — JadeMediaPro"),
    metaDescription: AR(
      "Discover how JadeMediaPro built a timeless, minimalist brand identity for Ariwa, a Lagos-based African-inspired leather fashion house.",
      "Découvrez comment JadeMediaPro a bâti une identité de marque minimaliste et intemporelle pour Ariwa, maison de cuir d’inspiration africaine basée à Lagos."
    ),
    categoryTag: AR("Branding & Design", "Image de marque et design"),
  },
  {
    slug: "developful",
    hero: developfulHeader.url,
    heroAlt: AR("Developful Swiss web agency rebrand", "Refonte de marque de l’agence suisse Developful"),
    title: AR("Developful — Swiss Web Agency Rebrand", "Developful — Refonte de la marque"),
    subtitle: AR("Branding & Web Case Study", "Étude de cas image de marque et web"),
    client: AR("Developful", "Developful"),
    location: AR("Switzerland", "Suisse"),
    duration: AR("8 Weeks", "8 semaines"),
    scope: {
      en: ["Brand Strategy", "Brand Identity", "Website", "Design System"],
      fr: ["Stratégie de marque", "Identité de marque", "Site web", "Système de design"],
    },
    expertise: {
      en: ["Rebranding", "Logo System", "UI Design", "Web Development"],
      fr: ["Refonte de marque", "Système de logo", "Design UI", "Développement web"],
    },
    overview: AR(
      "Developful is a Swiss web agency founded in 2020 that has grown into web development, mobile apps, marketing, SEO and SEA. We rebuilt the brand from the ground up so it feels timeless, professional and approachable — a system engineered to scale as the business expands.",
      "Developful est une agence web suisse fondée en 2020, désormais active en développement web et mobile, marketing, SEO et SEA. Nous avons refondu la marque en profondeur pour qu’elle soit intemporelle, professionnelle et accessible — un système pensé pour évoluer avec l’entreprise."
    ),
    metricValue: "5",
    metricLabel: AR("Service lines aligned", "Services alignés"),
    metricSub: AR("Web, mobile, marketing, SEO and SEA under one brand", "Web, mobile, marketing, SEO et SEA sous une seule marque"),
    sections: [
      {
        label: AR("Challenge", "Défi"),
        body: AR(
          "Redesign the logo, colour system and typography so they match a modern, technical service line without losing the human, approachable feel that had helped Developful grow. Every element had to signal ‘trusted specialist’ at a glance.",
          "Redessiner le logo, la palette et la typographie pour qu’ils reflètent une offre moderne et technique, sans perdre le côté humain et accessible qui a fait le succès de Developful. Chaque élément devait communiquer d’un coup d’œil : « spécialiste de confiance »."
        ),
      },
      {
        label: AR("Analysis", "Analyse"),
        body: AR(
          "Customers should instantly recognise what Developful offers from the visual system alone. We audited the previous identity, benchmarked competitor patterns and defined the simplicity we needed — clean typography, restrained colour and a wordmark that reads at any size.",
          "Les clients devaient reconnaître instantanément l’offre Developful à travers le seul système visuel. Nous avons audité l’ancienne identité, comparé les tendances concurrentes et défini la simplicité recherchée — typographie nette, couleurs mesurées, wordmark lisible à toute taille."
        ),
      },
      {
        label: AR("Strategy", "Stratégie"),
        body: AR(
          "We anchored the rebrand in Developful’s beliefs — freedom, joy and helpfulness — and turned them into a design language that reflects the tech services on offer: web, mobile, marketing, SEO and SEA, communicated with neutral tones and simple layered content that any prospect can navigate quickly.",
          "Nous avons ancré la refonte dans les valeurs de Developful — liberté, plaisir et sens du service — et les avons traduites en un langage visuel reflétant l’offre technique : web, mobile, marketing, SEO et SEA, avec des tons neutres et un contenu structuré facile à parcourir."
        ),
      },
      {
        label: AR("Design", "Design"),
        body: AR(
          "The new mark lives comfortably inside rounded and hexagonal containers, so it scales from a business card to a hero image. Warm yellow tones express the brand’s values — freedom, joy and helpfulness — while neutral supporting colours keep the system professional and easy to use.",
          "Le nouveau logo s’intègre naturellement dans des formes arrondies et hexagonales, du carton de visite à l’image principale. Des tons jaunes chaleureux traduisent les valeurs de la marque — liberté, plaisir et sens du service — tandis que les couleurs neutres complémentaires gardent le système sobre et professionnel."
        ),
      },
      {
        label: AR("Development", "Développement"),
        body: AR(
          "We codified colour, type, iconography and layout into a lightweight design system, then shipped a redesigned website with the same rules baked in. Every page inherits the same rhythm and voice, so the brand is impossible to mistake as it grows.",
          "Nous avons codifié couleurs, typographies, iconographie et gabarits dans un système de design léger, puis livré un site refondu où ces règles sont directement intégrées. Chaque page hérite du même rythme et de la même voix, ce qui rend la marque immédiatement reconnaissable à mesure qu’elle grandit."
        ),
      },
    ],
    metaTitle: AR("Developful Rebrand Case Study — JadeMediaPro", "Étude de cas — Refonte de marque Developful — JadeMediaPro"),
    metaDescription: AR(
      "How JadeMediaPro rebranded Developful, a Swiss web agency, with a simple, timeless identity system and a redesigned website that scales across services.",
      "Comment JadeMediaPro a refondu Developful, agence web suisse, avec une identité simple et intemporelle et un site refondu qui évolue avec les services."
    ),
    categoryTag: AR("Branding & Web", "Image de marque et web"),
  },
  {
    slug: "coinplay",
    hero: coinplayHeader.url,
    heroAlt: AR("Coinplay cryptocurrency brand identity", "Identité de marque crypto Coinplay"),
    title: AR("Coinplay.ca — Crypto Trading Brand", "Coinplay.ca — Marque de trading crypto"),
    subtitle: AR("Branding & Product Case Study", "Étude de cas image de marque et produit"),
    client: AR("Coinplay", "Coinplay"),
    location: AR("Vancouver, Canada", "Vancouver, Canada"),
    duration: AR("10 Weeks", "10 semaines"),
    scope: {
      en: ["Brand Strategy", "Brand Identity", "Website", "Product Design"],
      fr: ["Stratégie de marque", "Identité de marque", "Site web", "Design produit"],
    },
    expertise: {
      en: ["Fintech Branding", "UI/UX Design", "Iconography", "Web Development"],
      fr: ["Image de marque fintech", "Design UI/UX", "Iconographie", "Développement web"],
    },
    overview: AR(
      "Coinplay is a Canadian platform that makes buying cryptocurrency fast, simple and unintimidating. We built a bold, confident identity and product experience that mirror the promise of the service — approachable enough for a first-time buyer, credible enough for a serious trader.",
      "Coinplay est une plateforme canadienne qui rend l’achat de cryptomonnaies rapide, simple et rassurant. Nous avons bâti une identité et une expérience produit affirmées, à l’image de la promesse : accessibles pour un débutant, crédibles pour un investisseur sérieux."
    ),
    metricValue: "1-tap",
    metricLabel: AR("Purchase experience", "Expérience d’achat"),
    metricSub: AR("Buy multiple cryptocurrencies without friction", "Achetez plusieurs cryptomonnaies sans friction"),
    sections: [
      {
        label: AR("Challenge", "Défi"),
        body: AR(
          "Design an identity that feels bold and approachable at the same time — one that captures the real image of the brand and helps a first-time crypto buyer trust the platform on sight. Logo, palette and layout all had to make the service look effortless.",
          "Créer une identité à la fois affirmée et accessible — qui traduise l’image réelle de la marque et permette à un premier acheteur crypto de faire confiance à la plateforme au premier regard. Logo, palette et mise en page devaient rendre le service évidemment simple."
        ),
        image: coinplay01.url,
        imageAlt: AR("Coinplay brand exploration artboard one", "Planche d’exploration Coinplay 1"),
      },
      {
        label: AR("Strategy", "Stratégie"),
        body: AR(
          "We anchored the identity in the two things Coinplay had to prove: speed and clarity. Content, iconography and colour were kept simple and neutral so the product’s value — buying crypto in a few taps — always leads the story.",
          "Nous avons ancré l’identité dans les deux promesses que Coinplay devait prouver : rapidité et clarté. Contenu, iconographie et couleur restent simples et neutres pour que la valeur du produit — acheter des cryptos en quelques touches — reste au premier plan."
        ),
        image: coinplay02.url,
        imageAlt: AR("Coinplay strategy artboard", "Planche stratégique Coinplay"),
      },
      {
        label: AR("Design", "Design"),
        body: AR(
          "The mark was designed for versatility — it collapses into an icon that lives comfortably inside circular and square avatars across app stores, social profiles and hardware. Vibrant yellow tones reference the world of Bitcoin while a clean, bold typeface keeps the brand grown-up and confident.",
          "Le logo est pensé pour la polyvalence — il se réduit en icône qui s’intègre naturellement dans les avatars ronds ou carrés (app store, profils sociaux, matériel). Les tons jaunes vibrants évoquent l’univers du Bitcoin, tandis qu’une typographie nette et affirmée donne à la marque un ton mature et sûr."
        ),
        image: coinplay03.url,
        imageAlt: AR("Coinplay design artboard", "Planche de design Coinplay"),
      },
      {
        label: AR("Development", "Développement"),
        body: AR(
          "The website is fresh, modern and user-friendly, with a rigorous colour and type system, purposeful imagery and consistent layout across every page. The result is a product that looks and feels as effortless as the service it promises.",
          "Le site est frais, moderne et convivial, avec un système rigoureux de couleurs et de typographies, des images choisies et une mise en page cohérente d’une page à l’autre. Le résultat : un produit aussi fluide que la promesse du service."
        ),
        image: coinplay04.url,
        imageAlt: AR("Coinplay web product interface", "Interface produit web Coinplay"),
      },
    ],
    metaTitle: AR("Coinplay Crypto Brand Case Study — JadeMediaPro", "Étude de cas — Marque crypto Coinplay — JadeMediaPro"),
    metaDescription: AR(
      "How JadeMediaPro built a bold, approachable brand identity and web experience for Coinplay, a Canadian platform for buying cryptocurrency in a few taps.",
      "Comment JadeMediaPro a bâti une identité et une expérience web à la fois affirmées et accessibles pour Coinplay, plateforme canadienne d’achat de cryptomonnaies en quelques touches."
    ),
    categoryTag: AR("Branding & Product", "Image de marque et produit"),
  },
  {
    slug: "mercedes",
    hero: mercedesHero,
    heroAlt: AR("Mercedes-Benz emblem close-up", "Emblème Mercedes-Benz en gros plan"),
    title: AR("Mercedes — Plant Designs", "Mercedes — Design d’usine"),
    subtitle: AR("Print & Environmental Design", "Design imprimé et environnemental"),
    client: AR("Mercedes-Benz Global", "Mercedes-Benz Global"),
    location: AR("Germany", "Allemagne"),
    duration: AR("8 Months", "8 mois"),
    scope: {
      en: ["Plant Design", "Industrial Visualization", "Workflow Automation"],
      fr: ["Design d’usine", "Visualisation industrielle", "Automatisation des flux"],
    },
    expertise: {
      en: ["Environmental Design", "Print Production", "Brand Systems"],
      fr: ["Design environnemental", "Production imprimée", "Systèmes de marque"],
    },
    overview: AR(
      "We reimagined the visual identity of the Mercedes-Benz plant experience, marrying precision engineering with a refined architectural design language that scales across huge functional manufacturing environments.",
      "Nous avons repensé l’identité visuelle de l’expérience d’usine Mercedes-Benz en alliant l’ingénierie de précision à un langage architectural raffiné, adapté à d’immenses environnements de fabrication."
    ),
    metricValue: "70%",
    metricLabel: AR("Efficiency Increase", "Gain d’efficacité"),
    metricSub: AR("In production workflow", "Dans les flux de production"),
    sections: [
      {
        label: AR("Challenge", "Défi"),
        body: AR(
          "Transform the sterile perception of industrial manufacturing into an immersive brand experience. Mercedes-Benz needed a design language that bridged high-tech automation with a human-centred workflow.",
          "Transformer la perception austère de la fabrication industrielle en une expérience de marque immersive. Mercedes-Benz cherchait un langage de design qui concilie automatisation de pointe et flux centrés sur l’humain."
        ),
        image: mercedesPlant,
        imageAlt: AR("Mercedes plant building", "Bâtiment de l’usine Mercedes"),
      },
      {
        label: AR("Solution", "Solution"),
        body: AR(
          "We integrated immersive lighting structures with a refined architectural framework and a visual language that conveys the precision of the assembly line while keeping the premium, contemporary feel the Mercedes brand values.",
          "Nous avons intégré des structures d’éclairage immersives dans un cadre architectural raffiné et un langage visuel qui traduit la précision de la chaîne de montage tout en conservant l’image haut de gamme et contemporaine chère à Mercedes."
        ),
        image: mercedesCorridor,
        imageAlt: AR("Glowing teal corridor", "Couloir lumineux teal"),
      },
    ],
    gallery: [
      { image: mercedesUi1, alt: AR("Futuristic dashboard interface", "Interface de tableau de bord futuriste") },
      { image: mercedesUi2, alt: AR("Analytics dashboard", "Tableau d’analyses") },
      { image: mercedesWelding, alt: AR("Industrial welding sparks", "Étincelles de soudure industrielle") },
      { image: mercedesWall, alt: AR("Glowing wall lines", "Lignes lumineuses murales") },
      { image: mercedesControl, alt: AR("Control room", "Salle de contrôle") },
    ],
    metaTitle: AR("Mercedes Plant Designs Case Study — JadeMediaPro", "Étude de cas — Design d’usine Mercedes — JadeMediaPro"),
    metaDescription: AR(
      "How JadeMediaPro reimagined Mercedes-Benz plant design with a seamless integration of automation and human-centred workflow.",
      "Comment JadeMediaPro a réinventé le design des usines Mercedes-Benz en conjuguant automatisation et flux centrés sur l’humain."
    ),
    categoryTag: AR("Print & Design", "Impression et design"),
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
