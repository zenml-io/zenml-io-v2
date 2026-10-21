/**
 * labs-home.ts — every visible string, link and analytics event of the
 * ZenML Labs parent homepage (`/`), in one place.
 *
 * Copy rules (2026-09-08 rulings): "Start free" is the only signup action
 * and it leads to the unified cloud.zenml.io signup with no product
 * preselected (Sept 2026; the product pages pass their own `product`); "Explore ZenML / Explore Kitaru"
 * live only in the blocks that explain each product and link to the
 * product pages; no "Book a demo"; no helper lines under CTAs. Facts
 * (install commands, licences, compliance strings, case-study titles and
 * routes, customer logos) are imported from their canonical constants,
 * never retyped here.
 */
import type { Surface } from "./analytics";
import type { FeatureIconId } from "./featureIcons";
import {
  CASE_STUDY_CARDS,
  type CaseStudyCard,
  LOGO_CLOUD,
  type LogoItem,
} from "./homepage";
import { KITARU_DOCS_URL, KITARU_LINKS } from "./productKitaru";
import { ZENML_LINKS } from "./productZenml";

export type { CaseStudyCard };

/** The two products the Labs shell can be "inside" (header wordmark, switcher, CTA target). */
export type LabsProduct = "zenml" | "kitaru";

export const LABS_HOME_SEO = {
  title: "ZenML Labs: Ship AI you can trust",
  description:
    "ZenML Labs is the unified infrastructure layer for AI in production: Kitaru tests your agent's real traffic on open, local, and cheaper models so you choose on quality, cost, and speed, and ZenML orchestrates your pipelines and agents on the infra you choose.",
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

/**
 * The single signup action. Same label everywhere; the event names differ by
 * placement. The href is the unified signup with no `product` — the page
 * defaults to ZenML and offers the Kitaru toggle.
 */
export const LABS_SIGNUP = {
  label: "Start free",
  href: "https://cloud.zenml.io/signup",
} as const;

export const LABS_NAV_SIGNUP: LabsCta = {
  ...LABS_SIGNUP,
  analytics: "Nav-Signup",
};
export const LABS_HERO_SIGNUP: LabsCta = {
  ...LABS_SIGNUP,
  analytics: "Hero-Signup",
};
export const LABS_FINAL_SIGNUP: LabsCta = {
  ...LABS_SIGNUP,
  analytics: "Final-Signup",
};

/**
 * Nav pill on a product page follows the product (2026-09-08 ruling): same
 * label, the product's own cloud app. Pages without a product keep
 * LABS_NAV_SIGNUP.
 */
export const LABS_NAV_SIGNUP_BY_PRODUCT: Record<LabsProduct, LabsCta> = {
  kitaru: {
    label: LABS_SIGNUP.label,
    href: KITARU_LINKS.signup.href,
    analytics: "Nav-Signup-Kitaru",
  },
  zenml: {
    label: LABS_SIGNUP.label,
    href: ZENML_LINKS.signup.href,
    analytics: "Nav-Signup-ZenML",
  },
};

/* ---------------------------------------------------------------------- */
/* Shell                                                                   */
/* ---------------------------------------------------------------------- */

export interface LabsNavLink {
  label: string;
  href: string;
  /** Present only on the three items with a hover menu (chevron follows the label). */
  menu?: "products" | "docs" | "case-studies";
}

export const LABS_NAV_LINKS: readonly LabsNavLink[] = [
  {
    label: "Products",
    href: "/product/zenml",
    menu: "products",
  },
  {
    label: "Docs",
    href: "https://docs.zenml.io/getting-started/introduction",
    menu: "docs",
  },
  { label: "Case studies", href: "/case-studies", menu: "case-studies" },
  { label: "Compare", href: "/compare" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

/* ---------------------------------------------------------------------- */
/* Docs / Case studies menus                                               */
/* ---------------------------------------------------------------------- */

/** One row of the Docs or Case studies menu: a label + a one-line description, no icon. */
export interface LabsNavMenuRow {
  label: string;
  href: string;
  description: string;
  /** External rows get the small outbound-arrow glyph. */
  external?: true;
}

export interface LabsNavMenu {
  ariaLabel: string;
  rows: readonly LabsNavMenuRow[];
}

const LLMOPS_DATABASE_NAV_COUNT_FORMATTER = new Intl.NumberFormat("en-US");

export function formatLlmopsDatabaseNavDescription(count: number): string {
  return `${LLMOPS_DATABASE_NAV_COUNT_FORMATTER.format(count)} LLMOps case studies, searchable`;
}

/**
 * Docs and Case studies menu content for the Labs shell's nav. Only the
 * LLMOps Database row's description is computed (the non-draft entry
 * count), so this is a function rather than a constant: the caller
 * (LabsNavigation) awaits `getNonDraftLlmopsDatabaseCount()` once and
 * passes it in.
 */
export function labsNavMenus(
  llmopsCaseStudyCount: number,
): Record<"docs" | "case-studies", LabsNavMenu> {
  return {
    docs: {
      ariaLabel: "Docs",
      rows: [
        {
          label: "Kitaru docs",
          href: KITARU_DOCS_URL,
          description: "Record, replay, and evaluate agents",
          external: true,
        },
        {
          label: "ZenML docs",
          href: "https://docs.zenml.io",
          description: "Pipelines, components, integrations",
          external: true,
        },
      ],
    },
    "case-studies": {
      ariaLabel: "Case studies",
      rows: [
        {
          label: "Customer stories",
          href: "/case-studies",
          description: "How teams ship AI workflows and agents with ZenML",
        },
        {
          label: "LLMOps Database",
          href: "/llmops-database",
          description: formatLlmopsDatabaseNavDescription(llmopsCaseStudyCount),
        },
      ],
    },
  };
}

export const LABS_FOOTER = {
  /** Ruling 8 (2026-09-08): derived from the re-issued company USP. */
  tagline: "The unified infrastructure layer for AI in production",
  compliance: ["SOC 2 Type II", "ISO 27001"] as const,
  copyright: "ZenML GmbH",
} as const;

/* ---------------------------------------------------------------------- */
/* Hero                                                                    */
/* ---------------------------------------------------------------------- */

/** Shape of the short opening band interior pages use (the blog index): one
 * headline line, an optional deck, no pill — the page's own controls follow. */
export interface LabsShortBandContent {
  headline: string;
  deck?: string;
}

/** Shape of an opening or closing band: two headline lines, a deck, one pill. */
export interface LabsBandContent {
  /** Two lines, break kept deliberate. */
  headlineLines: readonly [string, string];
  deck: string;
  cta: LabsCta;
}

/** A product page's opening/closing band: the homepage shape plus an optional
 * ghost pill and a copyable install command. Every extra is optional, so the
 * homepage content still fits. */
export interface LabsProductBandContent extends LabsBandContent {
  secondaryCta?: LabsCta;
  install?: LabsInstallChip;
}

export interface LabsInstallChip {
  cmd: string;
  /** Plausible event for the copy button. */
  analytics: string;
}

export const LABS_HERO: LabsBandContent = {
  headlineLines: ["Ship AI you can trust,", "on any model"],
  deck: "Kitaru tests your agent's real traffic on open, local, and cheaper models, so you choose on quality, cost, and speed. ZenML runs it all on the infra you already have. Both open source, always.",
  cta: LABS_HERO_SIGNUP,
};

/* ---------------------------------------------------------------------- */
/* Product doors                                                           */
/* ---------------------------------------------------------------------- */

/** One quick-link row under a door's body (e.g. a docs link). */
export interface ProductDoorLink {
  label: string;
  href: string;
  external?: true;
}

/** One title/detail pair under a door's body (e.g. a compliance bullet). */
export interface ProductDoorDetail {
  title: string;
  detail: string;
}

export interface ProductDoor {
  name: "ZenML" | "Kitaru";
  /** Corner wash behind the card: the product's lightest palette tint. */
  tint: "sage" | "orange";
  leadLine: string;
  body: string;
  /** Quick-link rows rendered after the body. Absence collapses. */
  links?: readonly ProductDoorLink[];
  /** Title/detail rows rendered after the body. Absence collapses. */
  details?: readonly ProductDoorDetail[];
  cta: LabsCta & { external?: true };
}

export interface ProductDoorsContent {
  /** Absence collapses the heading row (the cards render alone). */
  headline?: string;
  doors: readonly ProductDoor[];
  /** Rendered after the cards. Absence collapses. */
  caption?: string;
}

export const LABS_DOORS: ProductDoorsContent = {
  headline: "Build it, then prove it",
  doors: [
    {
      name: "ZenML",
      tint: "sage",
      leadLine: "AI orchestration, on the infra you choose",
      body: "Write pipelines and agents in Python and run them on the orchestrator and cloud you already have. Move between them without rewriting, from a laptop to Kubernetes.",
      cta: {
        label: "Explore ZenML",
        href: "/product/zenml",
        analytics: "Door-Explore-ZenML",
      },
    },
    {
      name: "Kitaru",
      tint: "orange",
      leadLine: "Pick your model on real traffic",
      body: "Resend the calls your agent really made to open, local, and cheaper models, and see which is closest, cheapest, fastest, or the best mix. Then replay the winner on whole sessions before it ships.",
      cta: {
        label: "Explore Kitaru",
        href: "/product/kitaru",
        analytics: "Door-Explore-Kitaru",
      },
    },
  ],
};

/* ---------------------------------------------------------------------- */
/* Stance — what the company believes about choosing models                */
/* ---------------------------------------------------------------------- */

/** One way of judging a model: who does the judging, and what it measures. */
export interface StanceRow {
  source: string;
  verdict: string;
}

export interface StanceContent {
  /** Two lines, break kept deliberate. */
  headlineLines: readonly [string, string];
  /** The last row is the page's own answer and renders emphasised. */
  rows: readonly StanceRow[];
  deck: string;
}

export const LABS_STANCE: StanceContent = {
  headlineLines: ["Your traffic", "is the benchmark"],
  rows: [
    {
      source: "Leaderboards",
      verdict: "score models on someone else's tasks.",
    },
    {
      source: "A demo",
      verdict: "scores the one conversation you picked.",
    },
    {
      source: "Your traffic",
      verdict: "scores every call your agent really makes.",
    },
  ],
  deck: "The model you chose last year is rarely the one you'd choose today. Asking again should take an afternoon, not a migration.",
};

/* ---------------------------------------------------------------------- */
/* Fan-out — one recorded call, sent to every candidate                    */
/* ---------------------------------------------------------------------- */

/** One candidate model's lane and how its answer compares with the recording. */
export interface FanoutLane {
  model: string;
  detail: string;
  outcome: string;
  /** Whether the candidate answered like the recording. */
  outcomeKind: "match" | "review";
}

export interface FanoutContent {
  headline: string;
  deck: string;
  call: {
    label: string;
    input: string;
    recordedLabel: string;
    recorded: string;
  };
  lanes: readonly FanoutLane[];
  caption: string;
}

export const LABS_FANOUT: FanoutContent = {
  headline: "One recorded call. Every model you're weighing.",
  deck: "Kitaru resends the calls in your traces to every candidate, with the same messages and tools, and shows what each would have done.",
  call: {
    label: "A recorded call",
    input: "\u201cMy kettle arrived cracked. Order 48213.\u201d",
    recordedLabel: "Your model answered",
    recorded: 'lookup_order("48213")',
  },
  lanes: [
    {
      model: "Today's model",
      detail: "Reruns as the baseline",
      outcome: "Same tool",
      outcomeKind: "match",
    },
    {
      model: "A cheaper tier",
      detail: "Same provider, smaller",
      outcome: "Same tool",
      outcomeKind: "match",
    },
    {
      model: "An open model",
      detail: "Any OpenAI-compatible host",
      outcome: "Same tool",
      outcomeKind: "match",
    },
    {
      model: "A local model",
      detail: "Your own hardware",
      outcome: "Escalates instead",
      outcomeKind: "review",
    },
  ],
  caption:
    "An illustration. Your report does this for every call you sample, and you judge each difference.",
};

/* ---------------------------------------------------------------------- */
/* Choices — the goals a model choice can optimise for                     */
/* ---------------------------------------------------------------------- */

/** One goal the comparison names a best candidate for, and the rule it uses. */
export interface ChoiceCard {
  goal: string;
  rule: string;
  /** Spans two columns from `sm` up and renders on the deep tone. */
  featured?: true;
}

export interface ChoicePrinciple {
  title: string;
  detail: string;
}

export interface ChoiceBoardContent {
  headline: string;
  deck: string;
  cards: readonly ChoiceCard[];
  principles: readonly ChoicePrinciple[];
}

export const LABS_CHOICES: ChoiceBoardContent = {
  headline: "Choose on what matters to you",
  deck: "No single winner: the best candidate for each goal, by a rule you can read.",
  cards: [
    {
      goal: "Closest to today",
      rule: "Answers like your current model most often.",
    },
    {
      goal: "Cheapest",
      rule: "Lowest cost per call, within 10 points of the closest.",
    },
    {
      goal: "Fastest",
      rule: "Lowest latency, within the same 10 points.",
    },
    {
      goal: "Best open model",
      rule: "The closest match you can run anywhere.",
    },
    {
      goal: "Best mix",
      rule: "Each kind of call on the cheapest model that handles it. Everything else stays on today's model.",
      featured: true,
    },
  ],
  principles: [
    {
      title: "Your keys, your infrastructure",
      detail: "Calls go from your worker straight to your providers.",
    },
    {
      title: "Rules you set",
      detail: "Rule out a lab or region and it's never recommended.",
    },
    {
      title: "Agreement isn't the verdict",
      detail: "You judge the differences, then replay the winner.",
    },
  ],
};

/* ---------------------------------------------------------------------- */
/* Feature grid — four panels                                              */
/* ---------------------------------------------------------------------- */

export type FeaturePanelTone =
  | "sage-tint"
  | "sage-deep"
  | "canvas"
  | "sage-light";

/** Either an isometric mark from `FEATURE_ICONS` or a 24px stroke path
 *  (a line icon, as on the `/docs` resources panels). Never both. */
export type FeaturePanelIcon =
  | { icon: FeatureIconId; lineIcon?: never }
  | { lineIcon: string; icon?: never };

export type FeaturePanel = FeaturePanelIcon & {
  /** "01." style counter in the top-right corner; absent on /docs. */
  index?: string;
  title: string;
  body: string;
  tone: FeaturePanelTone;
  /** Optional link (the /docs resources panels). Absence renders a plain,
   *  non-interactive panel — the homepage and comparison usages. */
  href?: string;
  external?: true;
  /** Plausible event name — `data-analytics` IS the event name. */
  analytics?: string;
};

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
    body: "Prove a change on whole production sessions before it ships: a new model, a new prompt, or a fix.",
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

export interface LogoGridContent {
  headline: string;
  logos: readonly LogoItem[];
}

export const LABS_LOGO_GRID: LogoGridContent = {
  headline: "Running production AI today",
  logos: LOGO_CLOUD.logos,
};

/** A testimonial-style story card (quote + attribution) rather than a case-study link. */
export interface QuoteCard {
  quote: string;
  name: string;
  title: string;
  avatar?: string;
  logo?: { url: string; alt: string };
  /** Spans two columns at lg. */
  wide?: true;
}

export interface StoryCardsContent {
  /** Absence collapses the heading row. */
  headline?: string;
  /** Absence collapses the "all case studies" link. */
  allLink?: LabsCta;
  /** Absence collapses the per-card read label (quote cards don't use one). */
  readLabel?: string;
  cards: readonly (CaseStudyCard | QuoteCard)[];
}

export const LABS_STORIES: StoryCardsContent = {
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

export const LABS_CLOSE: LabsBandContent = {
  headlineLines: ["Start with your", "production data"],
  /** The company value proposition, verbatim. */
  deck: "Own your infrastructure, build it the way you want, and keep pace as your organization evolves.",
  cta: LABS_FINAL_SIGNUP,
};
