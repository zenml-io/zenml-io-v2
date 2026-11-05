/**
 * labs-home.ts — every visible string, link and analytics event of the
 * ZenML Labs parent homepage (`/`), in one place.
 *
 * Copy rules (2026-09-08 rulings): "Start free" is the only signup action
 * and it leads to the unified cloud.zenml.io signup (the product
 * pages tag their own links); "Explore ZenML / Explore Kitaru"
 * live only in the blocks that explain each product and link to the
 * product pages; no "Book a demo"; no helper lines under CTAs. Facts
 * (install commands, licences, compliance strings, case-study titles and
 * routes, customer logos) are imported from their canonical constants,
 * never retyped here.
 */

import type { Surface } from "./analytics";
import { cloudSignupUrl } from "./constants";
import type { FeatureIconId } from "./featureIcons";
import { type CaseStudyCard, LOGO_CLOUD, type LogoItem } from "./homepage";
import type { BenchmarkBandContent } from "./labs-industries";
import {
  KITARU_CLOUD_PRICE,
  KITARU_DOCS_URL,
  KITARU_INSTALL_CMD,
  KITARU_LINKS,
  KITARU_TRIAL_DAYS,
} from "./productKitaru";
import { ZENML_LINKS } from "./productZenml";

export type { CaseStudyCard };

/** The two products the Labs shell can be "inside" (header wordmark, switcher, CTA target). */
export type LabsProduct = "zenml" | "kitaru";

export const LABS_HOME_SEO = {
  title: "ZenML Labs: Find what your evals miss",
  description:
    "Our AI engineers read your agent's production traces next to the evals you already run, show you what those evals miss, and turn a few of your answers into checks you can trust. Next, they’ll fine-tune a cheaper open model on the same traces. They work on top of open-source Kitaru and ZenML.",
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
 * placement. The href is the unified signup, tagged as the shared CTA.
 */
export const LABS_SIGNUP = {
  label: "Start free",
  href: cloudSignupUrl("start-free"),
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
    href: "/product/kitaru",
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
          description: "Insights and evals from agent traces",
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
  /** A small news pill above the headline (the homepage's launch note). */
  announcement?: LabsAnnouncement;
  secondaryCta?: LabsCta;
  install?: LabsInstallChip;
  /** A small label above the install command. */
  installLabel?: string;
  /** One short line under the install command: what it installs. */
  installNote?: string;
}

export interface LabsAnnouncement {
  /** Short tag in the pill, e.g. "New". */
  tag: string;
  text: string;
  href: string;
  /** Plausible event name. */
  analytics: string;
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
  announcement: {
    tag: "New",
    text: "ZenML is now ZenML Labs. Read the story",
    href: "/blog/introducing-zenml-labs",
    analytics: "Hero-Announcement-Labs-Launch",
  },
  headlineLines: ["AI systems should get", "better after they ship"],
  deck: "AI in production shouldn’t need babysitting. ZenML Pro gives you a team of AI engineers that constantly read your traces, find what broke and get the fix ready.",
  cta: LABS_HERO_SIGNUP,
  installLabel: "Or start open source",
  install: { cmd: KITARU_INSTALL_CMD, analytics: "Hero-Install-Kitaru" },
};

/* ---------------------------------------------------------------------- */
/* Product demo: the hero's walk through one claims case                    */
/* ---------------------------------------------------------------------- */

/** One entry in the AI engineer's work feed. */
export type DemoFeedItem =
  | {
      kind: "sources";
      text: string;
      sources: readonly { name: string; logo: string }[];
      count: string;
    }
  | { kind: "repo"; text: string; repo: string; files: readonly string[] }
  | {
      kind: "gap";
      text: string;
      title: string;
      body: string;
      check: string;
    }
  | {
      kind: "experiment";
      text: string;
      title: string;
      /** Column heads: the metric, what runs today, the candidate. */
      columns: readonly [string, string, string];
      rows: readonly { label: string; current: string; candidate: string }[];
      result: string;
    }
  | {
      kind: "finetune";
      text: string;
      /** Marks the step as not shipped yet, e.g. "Coming next". */
      tag: string;
      model: string;
      rows: readonly { label: string; value: string; hot?: true }[];
    };

export interface ProductDemoContent {
  /** Accessible description of the whole demo. */
  label: string;
  /** The agent the feed belongs to, first in the breadcrumb. */
  agent: string;
  items: readonly DemoFeedItem[];
  /** The public benchmark the example is drawn from. */
  link: { label: string; href: string; analytics: string };
}

/** The homepage hero: the AI engineer's work feed on one claims agent,
 *  from importing traces to a cheaper fine-tuned model. Illustrative, not a
 *  customer result; the benchmark is the measured version. */
export const LABS_HERO_DEMO: ProductDemoContent = {
  label:
    "An AI engineer at work on an insurance claims agent. It imports 18,402 traces from Langfuse, LangSmith and Braintrust where they already live. It reads the agent's code on GitHub and finds the prompt and 9 evals. It finds a gap in the evals: decision_format passed 31 appeals that never reached a decision, so it drafts a decision_made check. It tests a prompt fix as an experiment on 214 past appeals against what runs today: appeals decided go from 86% to 100%, agreement with reviewers from 91.2% to 93.8%, and none of 40 good appeals change. Coming next: it fine-tunes an open model on 41,200 of your traces that passes 9 of 9 evals at $0.10 a decision instead of $0.36.",
  agent: "claims-agent",
  items: [
    {
      kind: "sources",
      text: "Imports your traces from where they already live.",
      sources: [
        { name: "Langfuse", logo: "/compare/langfuse.svg" },
        { name: "LangSmith", logo: "/compare/langsmith.svg" },
        { name: "Braintrust", logo: "/compare/braintrust.svg" },
      ],
      count: "18,402 traces",
    },
    {
      kind: "repo",
      text: "Reads your agent’s code on GitHub.",
      repo: "acme/claims-agent",
      files: ["agent.py", "prompt.py", "evals/ · 9 evals"],
    },
    {
      kind: "gap",
      text: "Finds a gap in your evals.",
      title: "31 appeals never reached a decision",
      body: "All since Tuesday’s switch to a cheaper model. decision_format passed every one.",
      check: "+ decision_made check",
    },
    {
      kind: "experiment",
      text: "Tests a fix against what runs today.",
      title: "Experiment · 214 past appeals, 3 runs each",
      columns: ["", "Today", "With the fix"],
      rows: [
        { label: "Appeals decided", current: "86%", candidate: "100%" },
        {
          label: "Agrees with reviewers",
          current: "91.2%",
          candidate: "93.8%",
        },
        { label: "Good appeals changed", current: "", candidate: "0 of 40" },
      ],
      result: "7 of 8 failed appeals fixed · 1 flagged for your review",
    },
    {
      kind: "finetune",
      text: "Trains a cheaper model on your traces.",
      tag: "Coming next",
      model: "claims-8b, fine-tuned on 41,200 traces",
      rows: [
        { label: "Evals passed", value: "9 of 9" },
        { label: "Cost a decision", value: "$0.36 → $0.10", hot: true },
      ],
    },
  ],
  link: {
    label: "See the claims agent benchmark",
    href: "/benchmarks/claims-over-time",
    analytics: "Home-Hero-Benchmark",
  },
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
export interface MissedSessionMessage {
  from: "customer" | "agent";
  text: string;
}

export interface MissedSessionVisualContent {
  /** Accessible description of the whole card. */
  label: string;
  session: string;
  /** The label above each message, by sender. */
  speakers: Record<MissedSessionMessage["from"], string>;
  messages: readonly MissedSessionMessage[];
  /** The team's own eval and the verdict it gave. */
  eval: { label: string; name: string; verdict: string };
  /** What the AI engineer says the reply got wrong, and its verdict. */
  finding: { by: string; text: string; verdict: string };
  tally: string;
  /** The check it drafts. */
  check: string;
}

/**
 * The homepage hero's example: one support session the team's eval passed
 * and the AI engineer flagged. Illustrative, not a customer result.
 */
export const LABS_HERO_SESSION: MissedSessionVisualContent = {
  label:
    "An example session from a customer support agent. The customer asks to return shoes bought seven weeks ago, and the agent promises a full refund within 90 days. The team's reply_quality eval passed the reply. Your AI engineers flag it: the refund policy allows 30 days. 41 replies like this passed last week, and it drafts a refund_within_policy check.",
  session: "session 3318",
  speakers: { customer: "Customer", agent: "support-agent" },
  messages: [
    {
      from: "customer",
      text: "Can I still return these? I bought them seven weeks ago.",
    },
    { from: "agent", text: "Of course! Full refund within 90 days." },
  ],
  eval: { label: "Your eval", name: "reply_quality", verdict: "Pass" },
  finding: {
    by: "Your AI engineer",
    text: "Your refund policy allows 30 days. This reply promised 90.",
    verdict: "Fail",
  },
  tally: "41 replies like this passed last week",
  check: "refund_within_policy",
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
      /** The verdict the example lands on, one of `options`. */
      picked: string;
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

/** The name the homepage gives the product's agent, shared by the onboarding window and the stack layer. */
export const AI_ENGINEER = "AI engineer";

export const LABS_ONBOARDING: OnboardingStepsContent = {
  eyebrow: "How it works",
  headline: "How your AI engineers get to work",
  deck: "You connect what you already run. They do the reading, and ask you only what they can’t work out alone.",
  steps: [
    {
      title: "Connect your stack",
      body: "Connect GitHub and your tracing keys. They find your agent, your evals and your policies.",
      widget: {
        kind: "connect",
        repos: [
          {
            name: "claims-agent",
            role: "Agent",
            detail: "LangGraph · 6 tools",
          },
          { name: "claims-evals", role: "Evals", detail: "9 judges · pytest" },
          {
            name: "coverage-rules",
            role: "Policies",
            detail: "Plans, exclusions · 38 rules",
          },
        ],
      },
    },
    {
      title: "A short interview",
      body: "They ask about what they found. Talk it through or type.",
      widget: {
        kind: "call",
        context: "decision_format has passed every case for 30 days.",
        question: "Do you trust it?",
        options: ["Yes", "Not really", "Never checked"],
        picked: "Not really",
      },
    },
    {
      title: "See what broke",
      body: "Right after, they show you what your evals missed, in the order you care about.",
      widget: {
        kind: "report",
        // The first row is the gap in the hero's feed, so the number matches.
        items: [
          {
            kind: "wrong",
            title: "Appeals end without a decision",
            count: "31",
          },
          {
            kind: "missing",
            title: "Never checks the member’s plan",
            count: "58",
          },
        ],
        kindLabels: { wrong: "Eval wrong", missing: "No eval" },
      },
    },
    {
      title: "They test and keep watching",
      body: "They test every fix on past sessions and read every new trace. They ask you only when a case needs your call.",
      widget: {
        kind: "review",
        session: "Case #3318 · appeal",
        excerpt:
          "Member appeals a denied MRI. Agent: Approved, covered under the plan. Policy: needs prior authorization.",
        question: "Should this decision have passed?",
        options: ["Pass", "Fail"],
        picked: "Fail",
      },
    },
  ],
};

/* ---------------------------------------------------------------------- */
/* Benchmarks: the proof behind the hero                                   */
/* ---------------------------------------------------------------------- */

/** The homepage's proof section: published benchmarks on real claims,
 *  appeals and underwriting work (labs.benchmark-band). */
export const LABS_HOME_BENCHMARKS: BenchmarkBandContent = {
  eyebrow: "Benchmarks",
  headline: "Measured on real work, published in full",
  deck: "We run real claims, appeals and underwriting cases through open and frontier models, test model swaps, and let our AI engineer improve the agent batch after batch. Every result publishes its method, its noise and its limits.",
  slugs: ["claims-over-time", "underwriting", "decision-agents", "swapbench"],
  link: {
    label: "All benchmarks",
    href: "/benchmarks",
    analytics: "Home-Benchmarks-All",
  },
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
  marks: readonly StackMark[];
}

export interface StackLayerContent {
  eyebrow: string;
  headline: string;
  deck: string;
  layer: {
    label: string;
    title: string;
  };
  columns: readonly [StackColumn, StackColumn, StackColumn];
  /** Four stops, in order: traces, layer, layer, agent. */
  link: LabsCta;
}

export const LABS_STACK_LAYER: StackLayerContent = {
  eyebrow: "How it fits",
  headline: "Plugs into the stack you already run",
  deck: "Nothing to rewrite, no new framework. They read your repos and traces through keys you can revoke, and the models they train run in your own cloud.",
  layer: {
    label: "read all of it, on top of what you already run",
    title: "Your AI engineers",
  },
  columns: [
    {
      id: "traces",
      title: "Your traces",
      marks: [
        { name: "Langfuse", logo: "/compare/langfuse.svg" },
        { name: "Braintrust", logo: "/compare/braintrust.svg" },
        { name: "LangSmith", logo: "/compare/langsmith.svg" },
        { name: "Phoenix", logo: "/images/service-logos/arize-phoenix.svg" },
        { name: "MLflow", logo: "/images/service-logos/mlflow.svg" },
        { name: "Logfire", logo: "/compare/logfire.svg" },
      ],
    },
    {
      id: "evals",
      title: "Your evals",
      marks: [
        { name: "LLM judges" },
        { name: "pytest", logo: "/images/service-logos/pytest.svg" },
        { name: "promptfoo", logo: "/images/service-logos/promptfoo.svg" },
        { name: "DeepEval", logo: "/images/service-logos/deepeval.svg" },
        { name: "Scores in your tracer" },
      ],
    },
    {
      id: "agent",
      title: "Your agent",
      marks: [
        { name: "Claude Agent SDK", logo: "/compare/claude-agent-sdk.svg" },
        { name: "OpenAI Agents SDK", logo: "/compare/openai-agents-sdk.svg" },
        { name: "PydanticAI", logo: "/compare/pydantic-ai.svg" },
        { name: "LangGraph", logo: "/compare/langgraph-deep-agents.svg" },
        { name: "Vercel AI SDK", logo: "/images/service-logos/vercel.svg" },
        { name: "Mastra", logo: "/images/service-logos/mastra.svg" },
      ],
    },
  ],
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

/**
 * The paid layer drawn above the two open-source doors: what ZenML Pro is,
 * what it adds, and what it costs. Absence collapses it (the doors render
 * alone, as on /pricing).
 */
export interface ProductDoorsPro {
  name: string;
  /** Short line beside the name, e.g. the price and the trial. */
  tag: string;
  headline: string;
  body: string;
  /** What Pro adds, as short chips. */
  adds: readonly string[];
  cta: LabsCta;
  /** Label over the open-source doors underneath. */
  underneath: string;
}

export interface ProductDoorsContent {
  /** Absence collapses the heading row (the cards render alone). */
  headline?: string;
  pro?: ProductDoorsPro;
  doors: readonly ProductDoor[];
  /** Rendered after the cards. Absence collapses. */
  caption?: string;
}

export const LABS_DOORS: ProductDoorsContent = {
  headline: "What is ZenML Pro?",
  pro: {
    name: "ZenML Pro",
    tag: `From ${KITARU_CLOUD_PRICE} a month · ${KITARU_TRIAL_DAYS} days free`,
    headline: "Your AI engineers, across your agents and your ML",
    body: "ZenML Pro is our paid platform. It hosts Kitaru and ZenML for your team and adds a team of AI engineers that watch every agent trace and every pipeline run, around the clock. One account, one bill.",
    adds: [
      "AI engineers",
      "Hosted dashboard",
      "Schedules and alerts",
      "Unlimited seats",
    ],
    cta: {
      label: "See pricing",
      href: "/pricing",
      analytics: "Home-Pro-Pricing",
    },
    underneath: "Built on two open source products",
  },
  caption:
    "Both are free and Apache 2.0. Use them on their own, on your own machines.",
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
      leadLine: "Find what your agent’s evals miss",
      body: "Import the traces you already have, see where your evals pass the wrong thing, turn your verdicts into evaluators, and test any change on real sessions before it ships.",
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
  headlineLines: ["Start with the evals", "you already run"],
  deck: "Connect your repo and your tracing keys. By the end of the interview you know what your evals miss. 14 days free, no credit card.",
  cta: LABS_FINAL_SIGNUP,
};

export const LABS_CLOSE: LabsBandContent = {
  headlineLines: ["Start with your", "production data"],
  /** The company value proposition, verbatim. */
  deck: "Own your infrastructure, build it the way you want, and keep pace as your organization evolves.",
  cta: LABS_FINAL_SIGNUP,
};
