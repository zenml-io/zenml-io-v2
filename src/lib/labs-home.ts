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
    "Our AI engineer reads your agent's production traces next to the evals you already run, shows you what those evals miss, and turns a few of your answers into checks you can trust. Built on Kitaru and ZenML, both open source.",
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

/** One proposed update in the hero explainer, and which sessions it changes. */
export interface HeroUpdate {
  kind: string;
  from: string;
  to: string;
  /** Marks for `from` and `to`, when the update swaps models. */
  fromMark?: ModelMark;
  toMark?: ModelMark;
  /** Indexes into `sessions` whose answers differ under this update. */
  differs: readonly number[];
}

export interface HeroVisualContent {
  /** Accessible description of the whole explainer. */
  label: string;
  updateLabel: string;
  sessions: readonly string[];
  updates: readonly HeroUpdate[];
  sameLabel: string;
  differsLabel: string;
}

export const LABS_HERO_VISUAL: HeroVisualContent = {
  label:
    "An example: four recorded sessions from an insurance and banking agent (a water damage claim, a policy coverage question, a card dispute and a KYC document check) are replayed under one proposed update at a time. Swapping GPT-6 for DeepSeek changes one answer, a prompt with new claims rules changes one, moving from LangGraph to the Claude Agent SDK changes two, and turning on PII redaction changes none. Each changed session goes to you to review.",
  updateLabel: "Proposed update",
  sessions: [
    "Water damage claim",
    "Policy coverage question",
    "Card dispute",
    "KYC document check",
  ],
  updates: [
    {
      kind: "Model",
      from: "GPT-6",
      to: "DeepSeek",
      fromMark: "openai",
      toMark: "open",
      differs: [2],
    },
    { kind: "Prompt", from: "v12", to: "new claims rules", differs: [0] },
    {
      kind: "Framework",
      from: "LangGraph",
      to: "Claude Agent SDK",
      differs: [1, 3],
    },
    { kind: "PII redaction", from: "off", to: "on", differs: [] },
  ],
  sameLabel: "same",
  differsLabel: "differs · review",
};

export const LABS_HERO: LabsProductBandContent = {
  headlineLines: ["Know which evals", "to write"],
  deck: "Writing evals isn't the hard part. Our AI engineer reads your traces next to your evals and shows you what they miss.",
  cta: LABS_HERO_SIGNUP,
  install: { cmd: KITARU_INSTALL_CMD, analytics: "Hero-Install-Kitaru" },
};

/* ---------------------------------------------------------------------- */
/* Gap report: the hero's example and the two kinds of gap                 */
/* ---------------------------------------------------------------------- */

/** One gap on the example report: an eval that passes the wrong thing, or
 *  a behavior nothing checks. */
export interface GapItem {
  kind: "wrong" | "missing";
  title: string;
  /** The eval it concerns (wrong) or the rule it breaks (missing). */
  source: string;
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
  note: string;
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
    "An example of what your AI engineer tells you about an insurance underwriting agent, Oct 21 to 27. The team's evals pass 91% of last week's sessions; by the team's own underwriting manual, 74% should pass. Two gaps lead the report: a completeness judge that passed 41 quotes without the flood exclusion, and 58 quotes priced on loss runs older than 90 days that no eval checks.",
  eyebrow: "What your evals missed this week",
  agent: "underwriting-agent",
  window: "Oct 21 to 27 · 1,482 sessions",
  scores: [
    { label: "Your evals pass", value: 91 },
    { label: "Your manual passes", value: 74 },
  ],
  kindLabels: { wrong: "Wrong", missing: "Missing" },
  items: [
    {
      kind: "wrong",
      title: "Passes quotes without the flood exclusion",
      source: "quote_completeness",
      count: "41",
    },
    {
      kind: "missing",
      title: "Quotes priced on loss runs older than 90 days",
      source: "UW 4.2",
      count: "58",
    },
    {
      kind: "missing",
      title: "Sprinkler credit with no inspection report",
      source: "UW 5.1",
      count: "37",
    },
  ],
  note: "From your AI engineer",
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

export const LABS_PROBLEM: ProblemBandContent = {
  eyebrow: "The problem",
  headlineLines: ["The dashboard says 91%.", "The complaints keep coming."],
  deck: "Your agent is live and its traces flow into Langfuse. Everyone on the team knows the number is off. Nobody knows where.",
  points: [
    {
      title: "Written once, never checked",
      body: "Judges get written in a sprint, often by an AI tool, and nobody compares them with their own verdicts again.",
    },
    {
      title: "High score, unhappy users",
      body: "The evals keep passing while traffic drifts to cases they never looked at.",
    },
    {
      title: "Nobody wants the job",
      body: "Every hour spent on evals is an hour not spent building, so the checking never happens.",
    },
  ],
};

/* ---------------------------------------------------------------------- */
/* Onboarding: connect, a short call, what it found, a weekly review     */
/* ---------------------------------------------------------------------- */

export type OnboardingWidget =
  | {
      kind: "connect";
      repos: readonly OnboardingRepo[];
      providers: readonly string[];
      picked: string;
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
  deck: "You never sit down to write evals. Your AI engineer reads what you already have and asks you only what it can't work out alone.",
  steps: [
    {
      title: "Connect your repo and your traces",
      body: "Install the GitHub app, pick your tracing provider and paste two keys. It finds your agent, your eval code and the scores you already track.",
      widget: {
        kind: "connect",
        repos: [
          { name: "underwriting-agent", role: "Agent" },
          { name: "uw-evals", role: "Evals" },
        ],
        providers: ["Langfuse", "LangSmith", "Braintrust", "MLflow", "Phoenix"],
        picked: "Langfuse",
      },
    },
    {
      title: "A short interview",
      body: "Your AI engineer asks you a few questions about what it found, in the browser or in Slack. Tap to answer.",
      widget: {
        kind: "call",
        context: "quote_completeness has passed every quote for 30 days.",
        question: "Do you trust it?",
        options: ["Yes", "Not really", "Never checked"],
        picked: "Not really",
      },
    },
    {
      title: "Hear what your evals miss",
      body: "Right after, it tells you what your evals missed last week, in the order you said you care about. More follows in Slack.",
      widget: {
        kind: "report",
        items: LABS_GAP_REPORT.items.slice(0, 2),
        kindLabels: LABS_GAP_REPORT.kindLabels,
      },
    },
    {
      title: "Fifteen minutes a week",
      body: "Three real sessions and about ten quick questions. Your answers become a calibrated check and a frozen set of sessions.",
      widget: {
        kind: "review",
        session: "Session #3318 · quote",
        excerpt:
          "Premium $4,180 · Limit $1.2M · Deductible $5,000. Property in FEMA zone A.",
        question: "Should this quote have passed?",
        options: ["Pass", "Fail"],
      },
    },
  ],
};

/* ---------------------------------------------------------------------- */
/* Where it runs                                                           */
/* ---------------------------------------------------------------------- */

export interface WhereItRunsTraceRow {
  /** Indent level in the trace tree: 0 is the session. */
  depth: 0 | 1;
  name: string;
  meta: string;
  /** A score the team's eval left on the span. Absence collapses. */
  score?: { label: string; verdict: "pass" | "fail" };
}

export interface WhereItRunsDeployment {
  label: string;
  note: string;
}

export interface WhereItRunsContent {
  eyebrow: string;
  headline: string;
  deck: string;
  sources: {
    title: string;
    body: string;
    providers: readonly { name: string; logo?: string }[];
    trace: { label: string; rows: readonly WhereItRunsTraceRow[] };
  };
  engineer: {
    title: string;
    body: string;
    /** The first is the default and renders filled. */
    deployments: readonly [WhereItRunsDeployment, WhereItRunsDeployment];
  };
  local: {
    title: string;
    body: string;
    install: LabsInstallChip;
    pieces: readonly string[];
  };
  link: LabsCta;
}

export const LABS_WHERE_IT_RUNS: WhereItRunsContent = {
  eyebrow: "Where it runs",
  headline: "Keep your tracing tool. Pick where the rest runs.",
  deck: "Your AI engineer reads traces from the tool you already use. It runs in our cloud by default, or on-prem in yours. The open-source parts run on your laptop.",
  sources: {
    title: "Your traces and evals",
    body: "Read in place, through keys you can revoke.",
    providers: [
      { name: "Langfuse", logo: "/compare/langfuse.svg" },
      { name: "Braintrust", logo: "/compare/braintrust.svg" },
      { name: "LangSmith", logo: "/compare/langsmith.svg" },
      { name: "Phoenix", logo: "/images/service-logos/arize-phoenix.svg" },
      { name: "Logfire", logo: "/compare/logfire.svg" },
      { name: "MLflow" },
    ],
    trace: {
      label: "Braintrust · underwriting-agent",
      rows: [
        { depth: 0, name: "session 3318 · quote", meta: "4.2s" },
        { depth: 1, name: "fetch_loss_runs", meta: "310ms" },
        { depth: 1, name: "price_quote", meta: "2.1s" },
        {
          depth: 1,
          name: "quote_completeness",
          meta: "judge",
          score: { label: "pass", verdict: "pass" },
        },
      ],
    },
  },
  engineer: {
    title: "Your AI engineer",
    body: "Reads traces next to your evals, interviews you, and keeps the checks up to date.",
    deployments: [
      { label: "ZenML cloud", note: "Default" },
      { label: "Your cloud", note: "On-prem, air-gapped on request" },
    ],
  },
  local: {
    title: "Open source, on your machine",
    body: "Kitaru records, reviews and replays sessions on your laptop or your cluster, with your own model keys.",
    install: { cmd: KITARU_INSTALL_CMD, analytics: "Home-Where-Install" },
    pieces: ["Kitaru", "ZenML", "Your model keys"],
  },
  link: {
    label: "Security and trust",
    href: "https://security.zenml.io",
    analytics: "Home-Where-Trust",
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
/* How it works — three steps from traces to a recommendation             */
/* ---------------------------------------------------------------------- */

export interface HowItWorksStep {
  title: string;
  body: string;
  /** What renders under the body: the trace tools' marks, or a prompt. */
  detail?: { kind: "sources" } | { kind: "prompt"; text: string };
}

export interface HowItWorksContent {
  /** The reader's question, in their words. */
  headline: string;
  /** One plain-language definition answering it. */
  intro: string;
  steps: readonly HowItWorksStep[];
  /** The pinned stage the steps play out on as the reader scrolls. */
  stage: HowItWorksStage;
  link: LabsCta;
}

/** One worked example for the stage: recorded sessions, one model swap, the
 *  one session it changes. Reuses the hero card's example so both agree. */
export interface HowItWorksStage {
  /** Accessible text for the figure: the whole example in one sentence. */
  label: string;
  sessionsLabel: string;
  resultLabel: string;
  replayingLabel: string;
  replayedLabel: string;
  sessions: readonly string[];
  from: string;
  to: string;
  /** Index into `sessions` of the one session the swap changes. */
  differs: number;
  sameLabel: string;
  differsLabel: string;
  switchLabel: string;
}

export const LABS_HOW_IT_WORKS: HowItWorksContent = {
  headline: "Then prove every change before it ships",
  intro:
    "Your calibrated checks and frozen sessions become the test for every new model, prompt or harness. Kitaru replays them and shows which sessions would change, so you review only those.",
  steps: [
    {
      title: "Bring the traces you have",
      body: "Import from the tool your agent already reports to. No code changes.",
      detail: { kind: "sources" },
    },
    {
      title: "Ask an agent",
      body: "Your coding agent, or ours in the background. It tries the update on your real calls.",
      detail: {
        kind: "prompt",
        text: "Use kitaru-model-swap to find a better model for this agent.",
      },
    },
    {
      title: "Switch what's better",
      body: "See which calls can move, review every difference, then replay the winner on whole sessions.",
    },
  ],
  stage: {
    label:
      "An example: four recorded sessions are imported from trace tools, a coding agent is asked to find a better model, Kitaru replays every session with DeepSeek instead of GPT-6, and three sessions come back the same while the card dispute differs and goes to you to review.",
    sessionsLabel: "Recorded sessions",
    resultLabel: "Result",
    replayingLabel: "Replaying",
    replayedLabel: "Replayed",
    sessions: LABS_HERO_VISUAL.sessions,
    from: "GPT-6",
    to: "DeepSeek",
    differs: 2,
    sameLabel: LABS_HERO_VISUAL.sameLabel,
    differsLabel: LABS_HERO_VISUAL.differsLabel,
    switchLabel: "Switch",
  },
  link: {
    label: "See the full walkthrough",
    href: "/product/kitaru",
    analytics: "Home-HowItWorks-Kitaru",
  },
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
    title: "No re-instrumenting",
    body: "Connect the tracing provider you already use. Your agent's code stays as it is.",
    icon: "pipeline",
    tone: "sage-tint",
  },
  {
    index: "02.",
    title: "Your judgment, kept",
    body: "Your verdicts become checks the whole team shares, instead of one engineer's notebook.",
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
  headline: "ZenML Labs is trusted to run production AI at",
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

export const LABS_HOME_CLOSE: LabsBandContent = {
  headlineLines: ["Find what your", "evals miss"],
  deck: "Connect your repo and your tracing provider. Your AI engineer takes it from there.",
  cta: LABS_FINAL_SIGNUP,
};

export const LABS_CLOSE: LabsBandContent = {
  headlineLines: ["Start with your", "production data"],
  /** The company value proposition, verbatim. */
  deck: "Own your infrastructure, build it the way you want, and keep pace as your organization evolves.",
  cta: LABS_FINAL_SIGNUP,
};
