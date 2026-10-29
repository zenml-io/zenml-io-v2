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
import { type CaseStudyCard, LOGO_CLOUD, type LogoItem } from "./homepage";
import {
  KITARU_DOCS_URL,
  KITARU_INSTALL_CMD,
  KITARU_LINKS,
} from "./productKitaru";
import { ZENML_LINKS } from "./productZenml";

export type { CaseStudyCard };

/** The two products the Labs shell can be "inside" (header wordmark, switcher, CTA target). */
export type LabsProduct = "zenml" | "kitaru";

export const LABS_HOME_SEO = {
  title: "ZenML Labs: Find what your evals miss",
  description:
    "Our AI engineer reads your agent's production traces next to the evals you already run, shows you what those evals miss, and turns a few of your answers into checks you can trust. It works on top of open-source Kitaru and ZenML.",
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
  { label: "Benchmarks", href: "/benchmarks" },
  { label: "Case studies", href: "/case-studies", menu: "case-studies" },
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
  /** One short line under the install command: what it installs. */
  installNote?: string;
  /** A quiet text link beside the primary pill, for the second path in. */
  textLink?: LabsCta;
  /** One proof line under the actions, e.g. customer names. */
  proof?: string;
}

/** A product page's opening band led by its install command instead of a
 *  signup pill: the command is the primary action, an optional ghost pill
 *  sits beside it. */
export interface LabsInstallBandContent {
  headlineLines: readonly [string, string];
  deck: string;
  install: LabsInstallChip;
  secondaryCta?: LabsCta;
  cta?: never;
}

export interface LabsInstallChip {
  cmd: string;
  /** Plausible event for the copy button. */
  analytics: string;
}

/** A model's mark: a brand icon where the service-logo set has one, or a
 *  neutral glyph (`open`, `chip`) for models without an approved mark yet. */
export type ModelMark =
  | "openai"
  | "anthropic"
  | "deepseek"
  | "qwen"
  | "zai"
  | "open"
  | "chip";

export const LABS_HERO: LabsProductBandContent = {
  headlineLines: ["Find what your agent’s", "evals miss"],
  deck: "Our AI engineer reads your traces next to your evals and shows you what they let through. You answer a few questions. It writes the checks.",
  cta: LABS_HERO_SIGNUP,
  textLink: {
    label: "or request a demo",
    href: "/book-your-demo",
    analytics: "Hero-Request-Demo",
  },
  install: { cmd: KITARU_INSTALL_CMD, analytics: "Hero-Install-Kitaru" },
  proof: "Used by teams at JetBrains, AXA, Airbus and Leroy Merlin",
};

/* ---------------------------------------------------------------------- */
/* Gap report: the hero's example and the two kinds of gap                 */
/* ---------------------------------------------------------------------- */

/** One gap on the example report: an eval that passes the wrong thing, or
 *  a behavior nothing checks. */
export interface GapItem {
  kind: "wrong" | "missing";
  title: string;
  count: string;
}

export interface GapReportVisualContent {
  /** Accessible description of the whole card. */
  label: string;
  eyebrow: string;
  agent: string;
  window: string;
  /** The two pass rates the report opens with: the evals', then the team's. */
  scores: readonly [GapScore, GapScore];
  kindLabels: Record<GapItem["kind"], string>;
  items: readonly GapItem[];
}

export interface GapScore {
  label: string;
  value: number;
}

/**
 * The example everything on `/` shares: an insurance underwriting agent, a
 * week of traces, the team's own evals. Illustrative numbers, not a
 * customer result.
 */
export const LABS_GAP_REPORT: GapReportVisualContent = {
  label:
    "An example of what your AI engineer tells you about a customer support agent after one week. The team's evals pass 91% of 1,482 sessions; the team's own reviewers would pass 74%. One eval passed 41 replies that promised refunds the policy doesn't allow, and no eval checks the 58 replies sent without looking up the order.",
  eyebrow: "What your evals missed",
  agent: "support-agent",
  window: "1,482 sessions",
  scores: [
    { label: "Your evals pass", value: 91 },
    { label: "You would pass", value: 74 },
  ],
  kindLabels: { wrong: "Eval wrong", missing: "No eval" },
  items: [
    { kind: "wrong", title: "Promises refunds it can't give", count: "41" },
    { kind: "missing", title: "Never looks up the order", count: "58" },
  ],
};

/* ---------------------------------------------------------------------- */
/* Problem                                                                 */
/* ---------------------------------------------------------------------- */

export interface ProblemPoint {
  title: string;
  body: string;
}

export interface ProblemBandContent {
  eyebrow: string;
  /** Two sentences, set on two lines. */
  headlineLines: readonly [string, string];
  deck: string;
  points: readonly ProblemPoint[];
}

/* ---------------------------------------------------------------------- */
/* Onboarding: connect, a short call, what it found, a weekly review     */
/* ---------------------------------------------------------------------- */

export type OnboardingWidget =
  | {
      kind: "connect";
      repos: readonly OnboardingRepo[];
    }
  | {
      kind: "call";
      question: string;
      options: readonly string[];
      picked: string;
      context: string;
    }
  | {
      kind: "report";
      items: readonly GapItem[];
      kindLabels: Record<GapItem["kind"], string>;
    }
  | {
      kind: "review";
      session: string;
      excerpt: string;
      question: string;
      options: readonly string[];
    };

export interface OnboardingRepo {
  name: string;
  role: string;
  /** What it found there, one short line. */
  detail: string;
}

export interface OnboardingStep {
  title: string;
  body: string;
  widget: OnboardingWidget;
}

export interface OnboardingStepsContent {
  eyebrow: string;
  headline: string;
  deck: string;
  steps: readonly OnboardingStep[];
}

export const LABS_ONBOARDING: OnboardingStepsContent = {
  eyebrow: "Eval therapy",
  headline: "You answer a few questions. Good evals fall out.",
  deck: "You don't write evals from scratch. Your AI engineer asks only what it can't work out alone.",
  steps: [
    {
      title: "Connect your repos",
      body: "Add the GitHub app and your tracing keys. Revoke them any time.",
      widget: {
        kind: "connect",
        repos: [
          {
            name: "support-agent",
            role: "Agent",
            detail: "OpenAI Agents SDK · 7 tools",
          },
          { name: "support-evals", role: "Evals", detail: "9 judges · pytest" },
          {
            name: "help-center",
            role: "Policies",
            detail: "Refunds, returns · 38 rules",
          },
        ],
      },
    },
    {
      title: "A short interview",
      body: "A few questions about what it found. Tap to answer.",
      widget: {
        kind: "call",
        context: "reply_quality has passed every reply for 30 days.",
        question: "Do you trust it?",
        options: ["Yes", "Not really", "Never checked"],
        picked: "Not really",
      },
    },
    {
      title: "Hear what your evals miss",
      body: "What your evals missed last week, in your order.",
      widget: {
        kind: "report",
        items: [
          {
            kind: "wrong",
            title: "Passes replies in the wrong language",
            count: "22",
          },
          {
            kind: "missing",
            title: "Shares another customer's order",
            count: "3",
          },
        ],
        kindLabels: LABS_GAP_REPORT.kindLabels,
      },
    },
    {
      title: "Fifteen minutes a week",
      body: "Ten quick questions on three real sessions.",
      widget: {
        kind: "review",
        session: "Session #3318 · refund",
        excerpt:
          "Customer: Can I return these shoes? Agent: Yes, full refund within 90 days. Policy: 30 days.",
        question: "Should this reply have passed?",
        options: ["Pass", "Fail"],
      },
    },
  ],
};

/* ---------------------------------------------------------------------- */
/* How it fits: the intelligence layer on the stack you already run       */
/* ---------------------------------------------------------------------- */

export interface StackMark {
  name: string;
  /** A full-colour service mark; absent renders the name alone. */
  logo?: string;
}

export interface StackColumn {
  id: "traces" | "evals" | "agent";
  title: string;
  /** Which way the layer works with it: it reads, or it replays through. */
  link: "reads" | "replays";
  marks: readonly StackMark[];
  /** A static line under the marks for a column with no journey stop. */
  note?: { title: string; detail: string };
}

/** One stop of the example session's journey through the diagram. */
export interface JourneyStep {
  /** Where the step sits: a stack column or the layer above. */
  at: "traces" | "layer" | "agent";
  tag: string;
  tone: "neutral" | "missing" | "new" | "pass";
  title: string;
  detail: string;
}

export interface StackLayerContent {
  eyebrow: string;
  headline: string;
  deck: string;
  layer: {
    label: string;
    title: string;
  };
  stackLabel: string;
  columns: readonly [StackColumn, StackColumn, StackColumn];
  linkLabels: Record<StackColumn["link"], string>;
  /** Four stops, in order: traces, layer, layer, agent. */
  journey: readonly [JourneyStep, JourneyStep, JourneyStep, JourneyStep];
  journeyLabel: string;
  install: LabsInstallChip;
  installLabel: string;
  link: LabsCta;
}

export const LABS_STACK_LAYER: StackLayerContent = {
  eyebrow: "How it fits",
  headline: "An intelligence layer on the stack you already run",
  deck: "Nothing to rewrite, no new framework. It reads your repos and traces through keys you can revoke.",
  layer: {
    label: "Intelligence layer",
    title: "Your AI engineer",
  },
  stackLabel: "What you already run",
  columns: [
    {
      id: "traces",
      title: "Your traces",
      link: "reads",
      marks: [
        { name: "Langfuse", logo: "/compare/langfuse.svg" },
        { name: "Braintrust", logo: "/compare/braintrust.svg" },
        { name: "LangSmith", logo: "/compare/langsmith.svg" },
        { name: "Phoenix", logo: "/images/service-logos/arize-phoenix.svg" },
        { name: "MLflow" },
        { name: "Logfire", logo: "/compare/logfire.svg" },
      ],
    },
    {
      id: "evals",
      title: "Your evals",
      link: "reads",
      marks: [
        { name: "LLM judges" },
        { name: "pytest" },
        { name: "promptfoo" },
        { name: "DeepEval" },
        { name: "Scores in your tracer" },
      ],
      note: {
        title: "9 checks",
        detail: "None of them checks the order lookup",
      },
    },
    {
      id: "agent",
      title: "Your agent",
      link: "replays",
      marks: [
        { name: "Claude Agent SDK", logo: "/compare/claude-agent-sdk.svg" },
        { name: "OpenAI Agents SDK", logo: "/compare/openai-agents-sdk.svg" },
        { name: "PydanticAI", logo: "/compare/pydantic-ai.svg" },
        { name: "LangGraph", logo: "/compare/langgraph-deep-agents.svg" },
        { name: "Vercel AI SDK" },
        { name: "Mastra" },
      ],
    },
  ],
  linkLabels: { reads: "reads", replays: "replays" },
  journey: [
    {
      at: "traces",
      tag: "Reads a trace",
      tone: "neutral",
      title: "Session 2207 · refund",
      detail: "Refunded without finding the order",
    },
    {
      at: "layer",
      tag: "Finds a gap",
      tone: "missing",
      title: "Answers before looking up the order",
      detail: "58 sessions like it, no eval checks it",
    },
    {
      at: "layer",
      tag: "Writes a check",
      tone: "new",
      title: "order_looked_up_first",
      detail: "Agrees with your reviewers 57 of 58 times",
    },
    {
      at: "agent",
      tag: "Tests the fix",
      tone: "pass",
      title: "Prompt fix, replayed via OpenAI Agents SDK",
      detail: "58 of 58 now pass",
    },
  ],
  journeyLabel: "One session's journey",
  install: { cmd: KITARU_INSTALL_CMD, analytics: "Home-Stack-Install" },
  installLabel: "Try it on your laptop",
  link: {
    label: "Security and trust",
    href: "https://security.zenml.io",
    analytics: "Home-Stack-Trust",
  },
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
  headline: "Open source underneath",
  caption:
    "Your AI engineer works on top of both. Use them on their own, free, on your own machines.",
  doors: [
    {
      name: "ZenML",
      tint: "sage",
      leadLine: "Orchestrate AI on the infra you choose",
      body: "Run pipelines and agents in Python on the orchestrator and cloud you already have, with every run, artifact, and model version recorded.",
      cta: {
        label: "Explore ZenML",
        href: "/product/zenml",
        analytics: "Door-Explore-ZenML",
      },
    },
    {
      name: "Kitaru",
      tint: "orange",
      leadLine: "Test every agent update on real traces",
      body: "Import the traces you already have, review sessions, turn your verdicts into evaluators, and replay any change before it ships.",
      cta: {
        label: "Explore Kitaru",
        href: "/product/kitaru",
        analytics: "Door-Explore-Kitaru",
      },
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

/* ---------------------------------------------------------------------- */
/* Proof                                                                   */
/* ---------------------------------------------------------------------- */

export interface LogoGridContent {
  headline: string;
  logos: readonly LogoItem[];
}

export const LABS_LOGO_GRID: LogoGridContent = {
  headline: "Trusted to run production AI, from pipelines to agents, at",
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

/* ---------------------------------------------------------------------- */
/* Close                                                                   */
/* ---------------------------------------------------------------------- */

export const LABS_HOME_CLOSE: LabsBandContent = {
  headlineLines: ["Bring one agent", "and a week of traces"],
  deck: "Connect your repo and your tracing keys. By the end of the interview you know what your evals miss. 14 days free, no credit card.",
  cta: LABS_FINAL_SIGNUP,
};

export const LABS_CLOSE: LabsBandContent = {
  headlineLines: ["Start with your", "production data"],
  /** The company value proposition, verbatim. */
  deck: "Own your infrastructure, build it the way you want, and keep pace as your organization evolves.",
  cta: LABS_FINAL_SIGNUP,
};
