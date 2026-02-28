/**
 * Company page data — centralized marketing copy.
 *
 * Used by src/pages/company.astro.
 * Content extracted from Webflow HTML snapshot.
 */
// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------
export const COMPANY_SEO = {
  title: "Company - ZenML",
  description:
    "Meet the team behind ZenML. We're a young, dynamic team building the open-source MLOps framework trusted by ML engineers worldwide.",
  ogTitle: "Company - ZenML",
  ogDescription:
    "Meet the team behind ZenML. We're a young, dynamic team building the open-source MLOps framework.",
  ogImage: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/3ae53e01/64b9920cd04b7c4c0340ce50_og-img-0625.jpg`,
} as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
export const COMPANY_HERO = {
  eyebrow: "Company",
  headline: "Nothing Beats an Unbeatable Team",
  deck: "Culture eats strategy for breakfast.",
} as const;

// ---------------------------------------------------------------------------
// About section
// ---------------------------------------------------------------------------
export const COMPANY_ABOUT = {
  headline: "Our company",
  body: "We're a young, dynamic team spread out across the world. We welcome people from all backgrounds, disciplines, and cultures. Apply now to be part of a growing, open source startup! You can work with us either remotely, or join us at our beautiful office @ Schellingstra\u00dfe, Munich. Or just catch us on a sailing boat at Ammersee or grilling in the Englischer Garten!",
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
    title: "GTM Generalist (f/m/d)",
    type: "Full-time",
    href: "https://zenml.notion.site/GTM-Generalist-m-f-d-2fcf8dff2538800f9cc7d4c53f6f8b06",
  },
  {
    title: "Head of Developer Marketing (f/m/d)",
    type: "Full-time",
    href: "https://zenml.notion.site/head-of-developer-marketing-f-m-d",
  },
  {
    title: "Senior Platform Engineer - Cloud & Infrastructure (f/m/d)",
    type: "Full-time",
    href: "https://zenml.notion.site/Senior-Platform-Engineer-Cloud-Infrastructure-f-m-d-2d2f8dff253880e3811deb82ecace05b",
  },
] as const;
