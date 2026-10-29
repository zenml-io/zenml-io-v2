/**
 * Company page data — centralized marketing copy.
 *
 * Used by src/pages/company.astro.
 * Content extracted from Webflow HTML snapshot.
 */
import { defaultOgUrl } from "./seo";

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------
export const COMPANY_SEO = {
  title: "Company - ZenML",
  description:
    "ZenML has spent five years putting AI into production with some of the world's best companies. Meet the team behind ZenML, Kitaru and our AI engineer.",
  ogTitle: "Company - ZenML",
  ogDescription:
    "Five years of putting AI into production. Meet the team behind ZenML, Kitaru and our AI engineer.",
  ogImage: defaultOgUrl("pages", "company"),
} as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
export const COMPANY_HERO = {
  eyebrow: "Company",
  headline: "Five years of AI in production",
  deck: "We started ZenML to get machine learning out of notebooks and into production. Today the same team builds Kitaru and our AI engineer, so the agents you ship can be trusted too.",
} as const;

// ---------------------------------------------------------------------------
// About section
// ---------------------------------------------------------------------------
export const COMPANY_ABOUT = {
  headline: "Our company",
  body: "For five years we have worked with some of the world's best companies to run AI in production: first pipelines and models with ZenML, now agents and their evals with Kitaru. We're a team spread out across the world. We welcome people from all backgrounds, disciplines, and cultures. Apply now to be part of a growing, open source startup! You can work with us either remotely, or join us at our beautiful office @ Schellingstra\u00dfe, Munich. Or just catch us on a sailing boat at Ammersee or grilling in the Englischer Garten!",
  image: {
    url: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/7cea56ef/652ea57525920a782529bb0e_zenml_team_jul23.webp`,
    alt: "Group of people posing in front of a historic statue and building under a blue sky.",
  },
} as const;

// ---------------------------------------------------------------------------
// Values
// ---------------------------------------------------------------------------
export const COMPANY_VALUES = [
  {
    title: "Challenge Everything",
    subtitle: "Embrace change and always improve",
    bullets: [
      "Never settle for the status quo",
      "Seek feedback to improve yourself",
      "Minimize complexity and simplify where possible",
    ],
  },
  {
    title: "Empathize",
    subtitle: "Understand your peers and stay candid",
    bullets: [
      "Everyone deserves your patience",
      "Listen, understand, acknowledge and assist",
      "Communicate thoughts for the betterment of the company & peers",
    ],
  },
  {
    title: "Be Efficient",
    subtitle: "Fail fast and learn even faster",
    bullets: [
      "Set goals and iterate approach",
      "Don't do everything, do what needs to be done",
      "Failure is no sign of weakness - only not learning from it is",
    ],
  },
  {
    title: "Enable Others",
    subtitle: "Enable and motivate others to bring their A-game",
    bullets: [
      "Overcome bias, utilize diversity",
      "Support others taking risks and collaborate",
      "Distribute relevant information proactively",
    ],
  },
  {
    title: "Be Honest",
    subtitle: "Provide candid feedback and own your actions",
    bullets: [
      "Give feedback early, often, and candidly",
      "Take responsibility for failures transparently and proactively",
      "Don't judge the failures of others - aid in learning from them",
    ],
  },
] as const;

// ---------------------------------------------------------------------------
// Open positions (shared with careers page)
// ---------------------------------------------------------------------------
export const OPEN_POSITIONS = [
  {
    title: "Product Engineer (f/m/d) - Kitaru / ZenML",
    type: "Full-time",
    href: "https://zenml.notion.site/Product-Engineer-f-m-d-Kitaru-ZenML-3d5f8dff25388147a33bc8acc70cfb80",
  },
  {
    title: "GTM Engineer (f/m/d) - San Francisco",
    type: "Full-time",
    href: "https://zenml.notion.site/GTM-Engineer-f-m-d-San-Francisco-3faf8dff253881efa7cdd196acdec5f3",
  },
] as const;
