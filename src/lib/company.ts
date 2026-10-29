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
  deck: "Founders who have built together for ten years. Five years of ZenML, running AI in production for some of the world's best companies. Now the same team builds Kitaru and our AI engineer.",
} as const;

// ---------------------------------------------------------------------------
// About section
// ---------------------------------------------------------------------------
export const COMPANY_ABOUT = {
  headline: "Our company",
  body: "Our founders have built together for ten years, and ZenML has been their company for five. In that time we have worked with some of the world's best companies to run AI in production: orchestrating pipelines and agents, training and fine-tuning models, and now testing agents with Kitaru and our AI engineer. Everything we build starts open source. We're a remote team with an office in Munich, and we're hiring.",
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
