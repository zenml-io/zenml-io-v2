/**
 * labs-home.ts — every visible string, link and analytics event of the
 * ZenML Labs parent homepage (`/`), in one place.
 *
 * Copy rules (2026-09-08 rulings): "Start free" is the only signup action
 * and it leads to the Kitaru cloud app; "Explore ZenML / Explore Kitaru"
 * live only in the blocks that explain each product and link to the
 * product pages; no "Book a demo"; no helper lines under CTAs. Facts
 * (install commands, licences, compliance strings, case-study titles and
 * routes, customer logos) are imported from their canonical constants,
 * never retyped here.
 */
import type { Surface } from "./analytics";
import {
  CASE_STUDY_CARDS,
  type CaseStudyCard,
  LOGO_CLOUD,
  type LogoItem,
} from "./homepage";
import {
  KITARU_INSTALL_CMD,
  KITARU_LICENSE,
  KITARU_LINKS,
} from "./productKitaru";
import { ZENML_INSTALL_CMD, ZENML_LINKS } from "./productZenml";

/** ZenML is Apache 2.0 too; productZenml.ts has no licence constant yet. */
const ZENML_LICENSE = KITARU_LICENSE;

export const LABS_HOME_SEO = {
  title: "ZenML Labs: The unified infrastructure layer for AI in production",
  description:
    "ZenML Labs is the unified infrastructure layer for AI in production: ZenML orchestrates your pipelines and agents on the infra you choose, and Kitaru replays them on production data.",
  surface: "unified" satisfies Surface,
} as const;

/* ---------------------------------------------------------------------- */
/* CTAs + analytics                                                        */
/* ---------------------------------------------------------------------- */

export interface LabsCta {
  label: string;
  href: string;
  /** Plausible event name — `data-analytics` IS the event name. */
  analytics: string;
}

/** The single signup action. Same label everywhere; the event names differ by placement. */
export const LABS_SIGNUP = {
  label: "Start free",
  href: KITARU_LINKS.signup.href,
} as const;

export const LABS_NAV_SIGNUP: LabsCta = {
  ...LABS_SIGNUP,
  analytics: "Nav-Signup-Kitaru",
};
export const LABS_HERO_SIGNUP: LabsCta = {
  ...LABS_SIGNUP,
  analytics: "Hero-Signup-Kitaru",
};
export const LABS_FINAL_SIGNUP: LabsCta = {
  ...LABS_SIGNUP,
  analytics: "Final-Signup-Kitaru",
};

/* ---------------------------------------------------------------------- */
/* Shell                                                                   */
/* ---------------------------------------------------------------------- */

export interface LabsNavLink {
  label: string;
  href: string;
  /** Rendered with a chevron; the menu itself lands with the product pages. */
  hasMenu?: boolean;
}

export const LABS_NAV_LINKS: readonly LabsNavLink[] = [
  { label: "Product", href: "/product/zenml", hasMenu: true },
  {
    label: "Docs",
    href: "https://docs.zenml.io/getting-started/introduction",
    hasMenu: true,
  },
  { label: "Case studies", href: "/case-studies", hasMenu: true },
  { label: "Compare", href: "/compare" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

export const LABS_FOOTER = {
  /** Ruling 8 (2026-09-08): derived from the re-issued company USP. */
  tagline: "The unified infrastructure layer for AI in production",
  compliance: ["SOC 2 Type II", "ISO 27001"] as const,
  copyright: "ZenML GmbH",
} as const;

/* ---------------------------------------------------------------------- */
/* Hero                                                                    */
/* ---------------------------------------------------------------------- */

export const LABS_HERO = {
  /** Two lines, break kept deliberate. */
  headlineLines: ["AI in production,", "on infrastructure you own"] as const,
  deck: "ZenML Labs builds two open-source products. ZenML orchestrates your pipelines and agents on the infra you choose. Kitaru replays your agents on production data, so a change is tested before it ships.",
  cta: LABS_HERO_SIGNUP,
} as const;

/* ---------------------------------------------------------------------- */
/* Product doors                                                           */
/* ---------------------------------------------------------------------- */

export interface ProductDoor {
  name: "ZenML" | "Kitaru";
  /** Kitaru carries the one orange detail on the page: a dot beside its name. */
  accent?: "orange";
  leadLine: string;
  body: string;
  installCmd: string;
  license: string;
  cta: LabsCta;
}

export const LABS_DOORS = {
  headline: "Two products, one foundation",
  doors: [
    {
      name: "ZenML",
      leadLine: "AI orchestration, on the infra you choose",
      body: "Write pipelines and agents in Python and run them on the orchestrator and cloud you already have. Move between them without rewriting, from a laptop to Kubernetes.",
      installCmd: ZENML_INSTALL_CMD,
      license: ZENML_LICENSE,
      cta: {
        label: "Explore ZenML",
        href: "/product/zenml",
        analytics: "Door-Explore-ZenML",
      },
    },
    {
      name: "Kitaru",
      accent: "orange",
      leadLine: "Replay your agents on production data",
      body: "Import the sessions your agent has actually run, find what repeats, and replay a change against them. See what improved, what regressed, and what it costs before it ships.",
      installCmd: KITARU_INSTALL_CMD,
      license: KITARU_LICENSE,
      cta: {
        label: "Explore Kitaru",
        href: "/product/kitaru",
        analytics: "Door-Explore-Kitaru",
      },
    },
  ] satisfies readonly ProductDoor[],
} as const;

/* ---------------------------------------------------------------------- */
/* Feature grid — four panels                                              */
/* ---------------------------------------------------------------------- */

export type FeaturePanelTone =
  | "sage-tint"
  | "sage-deep"
  | "canvas"
  | "sage-light";

export interface FeaturePanel {
  index: string;
  title: string;
  body: string;
  /** Icon id resolved by the component (icons live beside it). */
  icon: "pipeline" | "layers" | "open-box" | "shield";
  tone: FeaturePanelTone;
}

export const LABS_FEATURE_PANELS: readonly FeaturePanel[] = [
  {
    index: "01.",
    title: "Orchestrate",
    body: "Pipelines and agents in Python, on the orchestrator and cloud you already run.",
    icon: "pipeline",
    tone: "sage-tint",
  },
  {
    index: "02.",
    title: "Replay",
    body: "Real production sessions become the test set. Replay a change and see what improved, what regressed, and what it costs.",
    icon: "layers",
    tone: "sage-deep",
  },
  {
    index: "03.",
    title: "Open source",
    body: "ZenML and Kitaru are Apache 2.0. Self-host, read the code, keep your data where it is.",
    icon: "open-box",
    tone: "canvas",
  },
  {
    index: "04.",
    title: "Ready for enterprise",
    body: "SOC 2 Type II and ISO 27001, on infrastructure you own.",
    icon: "shield",
    tone: "sage-light",
  },
];

/* ---------------------------------------------------------------------- */
/* Proof                                                                   */
/* ---------------------------------------------------------------------- */

export const LABS_LOGO_GRID: { headline: string; logos: readonly LogoItem[] } =
  {
    headline: "Teams running production AI on ZenML",
    logos: LOGO_CLOUD.logos,
  };

export const LABS_STORIES: {
  headline: string;
  allLink: LabsCta;
  readLabel: string;
  cards: readonly CaseStudyCard[];
} = {
  headline: "Customer stories",
  allLink: {
    label: "All case studies",
    href: "/case-studies",
    analytics: "Stories-All",
  },
  readLabel: "Read the story",
  cards: CASE_STUDY_CARDS,
};

/* ---------------------------------------------------------------------- */
/* Close                                                                   */
/* ---------------------------------------------------------------------- */

export const LABS_CLOSE = {
  headlineLines: ["Start with your", "production data"] as const,
  /** The company value proposition, verbatim. */
  deck: "Own your infrastructure, build it the way you want, and keep pace as your organization evolves.",
  cta: LABS_FINAL_SIGNUP,
} as const;

/** Kept for the deferred ZenML signup fallback (not rendered in v1). */
export const LABS_ZENML_SIGNUP_HREF = ZENML_LINKS.signup.href;
