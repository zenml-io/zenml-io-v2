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
    "Our AI engineer reads your agent's production traces next to the evals you already run, shows you what those evals miss, and turns a few of your answers into checks you can trust. It can fine-tune a cheaper open model on the same traces. It works on top of open-source Kitaru and ZenML.",
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
  secondaryCta?: LabsCta;
  install?: LabsInstallChip;
  /** A small label above the install command. */
  installLabel?: string;
  /** One short line under the install command: what it installs. */
  installNote?: string;
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
  headlineLines: ["AI systems should get", "better after they ship"],
  deck: "ZenML Pro’s AI engineer finds what your agent’s evals miss. It reads your production traces next to the evals you already run, drafts the fix, and replays it before you merge.",
  cta: LABS_HERO_SIGNUP,
  installLabel: "Or start open source",
  install: { cmd: KITARU_INSTALL_CMD, analytics: "Hero-Install-Kitaru" },
};

/* ---------------------------------------------------------------------- */
/* Findings: the hero's rotating example                                   */
/* ---------------------------------------------------------------------- */

export interface Finding {
  /** Tab label: the kind of problem. */
  kind: string;
  /** The agent, step or pipeline it was found in. */
  where: string;
  evidence: {
    label: string;
    /** `hot` marks the line that gives the problem away. */
    lines: readonly { text: string; hot?: boolean }[];
  };
  finding: string;
  impact: string;
  fix: string;
}

export interface FindingsContent {
  /** Accessible description of the whole card. */
  label: string;
  findings: readonly Finding[];
}

/** One column of the findings log: a kind of problem and a few
 *  one-line examples of it. */
export interface FindingsLogColumn {
  label: string;
  items: readonly string[];
}

export interface FindingsLogContent {
  eyebrow: string;
  headline: string;
  deck: string;
  columns: readonly FindingsLogColumn[];
  footer: string;
}

/** The homepage's breadth moment: what else the AI engineer turns up,
 *  none of it repeating the hero card. Illustrative, not customer results. */
export const LABS_FINDINGS_LOG: FindingsLogContent = {
  eyebrow: "What your evals miss",
  headline:
    "Most teams find out what broke from a customer, not from their evals.",
  deck: "Your AI engineer reads every session, tool call and eval result. A few things it turned up last week, each with a fix drafted.",
  columns: [
    {
      label: "Evals",
      items: [
        "tone_check hasn’t failed once since March. It stopped checking anything.",
        "A new kind of question showed up last week. None of your evals cover it.",
        "Your LLM judge disagrees with your reviewers on 1 in 5 sessions.",
      ],
    },
    {
      label: "Reliability",
      items: [
        "The hand-off to the billing agent drops the customer’s plan.",
        "The search tool times out on 6% of calls and nothing retries.",
        "The agent answers before the lookup tool returns.",
      ],
    },
    {
      label: "Cost",
      items: [
        "The same 9,000-token policy doc goes out on every turn.",
        "Failed calls retry 3 times on the most expensive model.",
        "The summarizer runs twice per session.",
      ],
    },
    {
      label: "Models and training",
      items: [
        "41,200 of your traces are ready to fine-tune on. The ZenML pipeline is drafted.",
        "A newer model scores 4 points higher on your hardest sessions.",
        "Your nightly retrain ran 9 times on data that hadn’t changed.",
      ],
    },
  ],
  footer:
    "It reads your repos and traces through keys you can revoke. Your data stays where it is.",
};

/** The homepage hero's example week: four findings, one per tab.
 *  Illustrative, not a customer result. */
export const LABS_HERO_FINDINGS: FindingsContent = {
  label:
    "Four example findings from your AI engineer. Evals: the agent promised a 90 day refund on a 30 day policy and the reply_quality eval passed it, 41 times last week; it drafts a refund_within_policy check. Reliability: the support agent loops on lookup_order when the customer gives no order ID, in 312 sessions; fix: ask for the order ID first. Cost: the system prompt starts with the current time, so the prompt cache never hits; about $3,870 a month; fix: move the time to the user turn. Models: an open model fine-tuned on 41,200 of your traces with a ZenML pipeline passes all 212 evals on the triage step at 81% lower cost.",
  findings: [
    {
      kind: "Evals",
      where: "support-agent · session 3318",
      evidence: {
        label: "Session",
        lines: [
          { text: "customer: Can I return these? I bought them 7 weeks ago." },
          { text: "agent: Of course! Full refund within 90 days.", hot: true },
          { text: "reply_quality: pass" },
        ],
      },
      finding:
        "Your refund policy allows 30 days. Your eval passed 41 replies like this last week.",
      impact: "41 sessions",
      fix: "+ refund_within_policy",
    },
    {
      kind: "Reliability",
      where: "support-agent · order lookups",
      evidence: {
        label: "Session 4471",
        lines: [
          { text: "lookup_order(order_id=None)   error" },
          { text: "lookup_order(order_id=None)   error", hot: true },
          { text: "… 41 more calls, then a timeout" },
        ],
      },
      finding:
        "Your agent loops on lookup_order when the customer gives no order ID. It never asks for one.",
      impact: "312 sessions",
      fix: "Ask for the order ID first",
    },
    {
      kind: "Cost",
      where: "support-agent",
      evidence: {
        label: "System prompt",
        lines: [
          { text: "You are the support agent for a shoe store." },
          { text: "Current time: 2026-11-03 14:02:31", hot: true },
          { text: "Cache read: 0 tokens on 18,402 of 18,402 calls", hot: true },
        ],
      },
      finding:
        "Your prompt cache never hits. Line 2 changes on every call, so the whole prompt is written again each time.",
      impact: "$3,870 a month",
      fix: "Move the time to the user turn",
    },
    {
      kind: "Models",
      where: "triage step",
      evidence: {
        label: "Fine-tuned on 41,200 of your traces",
        lines: [
          { text: "frontier model      212/212 evals   $0.021 a call" },
          {
            text: "fine-tuned open 8B  212/212 evals   $0.004 a call",
            hot: true,
          },
        ],
      },
      finding:
        "An open model, fine-tuned on your traces with a ZenML pipeline, passes all 212 of your evals on this step.",
      impact: "−81% cost",
      fix: "Switch the triage step",
    },
  ],
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
    "An example session from a customer support agent. The customer asks to return shoes bought seven weeks ago, and the agent promises a full refund within 90 days. The team's reply_quality eval passed the reply. Your AI engineer flags it: the refund policy allows 30 days. 41 replies like this passed last week, and it drafts a refund_within_policy check.",
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
export const AI_ENGINEER = "Your AI engineer";

export const LABS_ONBOARDING: OnboardingStepsContent = {
  eyebrow: "Eval therapy",
  headline: "You answer a few questions. Good evals fall out.",
  deck: "You don't write evals from scratch. Your AI engineer asks only what it can't work out alone.",
  steps: [
    {
      title: "Connect your repos",
      body: "Connect GitHub. It reads your repos and finds your agent, your evals and your policies. Then add your tracing keys.",
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
      body: "It asks about what it found. Talk it through or type.",
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
      body: "Right after, it shows what your evals missed, in the order you care about.",
      widget: {
        kind: "report",
        // The hero's refund session (41 passed) and the thread's order
        // lookup (58), so the numbers match down the page.
        items: [
          {
            kind: "wrong",
            title: "Promises refunds it can't give",
            count: "41",
          },
          { kind: "missing", title: "Never looks up the order", count: "58" },
        ],
        kindLabels: { wrong: "Eval wrong", missing: "No eval" },
      },
    },
    {
      title: "It keeps watching",
      body: "It reads every new trace and asks you only when a session needs your call.",
      widget: {
        kind: "review",
        session: "Session #3318 · refund",
        excerpt:
          "Customer: Can I return these shoes? Agent: Yes, full refund within 90 days. Policy: 30 days.",
        question: "Should this reply have passed?",
        options: ["Pass", "Fail"],
        picked: "Fail",
      },
    },
  ],
};

/* ---------------------------------------------------------------------- */
/* Model cost: a fine-tuned model from the same traces                    */
/* ---------------------------------------------------------------------- */

/** One month of model spend, in thousands of dollars, split by where calls went. */
export interface CostMonth {
  month: string;
  frontier: number;
  own: number;
  /** Numbered note pinned above this month's bar. */
  note?: number;
}

export interface ModelCostContent {
  eyebrow: string;
  headlineLines: readonly [string, string];
  deck: string;
  chart: {
    label: string;
    series: { frontier: string; own: string };
    months: readonly CostMonth[];
    notes: readonly string[];
  };
}

export const LABS_MODEL_COST: ModelCostContent = {
  eyebrow: "Models",
  headlineLines: ["Same agent.", "A fifth of the bill."],
  deck: "Your traces are also training data. Your AI engineer fine-tunes an open model on them, holds it to your evals, and keeps a few calls on the frontier model to catch drift. The weights are yours: download them or run them in your own cloud.",
  chart: {
    label: "Example: a support agent's model spend a month",
    series: { frontier: "Frontier model", own: "Your fine-tuned model" },
    months: [
      { month: "Jan", frontier: 31.4, own: 0 },
      { month: "Feb", frontier: 31.9, own: 0 },
      { month: "Mar", frontier: 32.7, own: 0 },
      { month: "Apr", frontier: 1.6, own: 5.3, note: 1 },
      { month: "May", frontier: 1.6, own: 5.4 },
      { month: "Jun", frontier: 1.7, own: 5.3 },
      { month: "Jul", frontier: 9.8, own: 4.1, note: 2 },
      { month: "Aug", frontier: 1.7, own: 5.4, note: 3 },
      { month: "Sep", frontier: 1.6, own: 5.3 },
      { month: "Oct", frontier: 1.6, own: 5.3 },
    ],
    notes: [
      "Fine-tuned on 41,200 of your traces. The same 9 evals pass.",
      "Return policy changed. More calls go back to the frontier model while it catches the drift.",
      "Retrained on 2,318 new traces. 9 of 9 evals pass again.",
    ],
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

/** One stop of the example session's journey through the diagram. */
export interface JourneyStep {
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
  columns: readonly [StackColumn, StackColumn, StackColumn];
  /** Four stops, in order: traces, layer, layer, agent. */
  journey: readonly [JourneyStep, JourneyStep, JourneyStep, JourneyStep];
  journeyLabel: string;
  link: LabsCta;
}

export const LABS_STACK_LAYER: StackLayerContent = {
  eyebrow: "How it fits",
  headline: "An intelligence layer on the stack you already run",
  deck: "Nothing to rewrite, no new framework. It reads your repos and traces through keys you can revoke.",
  layer: {
    label: "Intelligence layer",
    title: AI_ENGINEER,
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
  journey: [
    {
      tag: "Reads a trace",
      tone: "neutral",
      title: "Session 2207 · refund",
      detail: "Refunded without finding the order",
    },
    {
      tag: "Finds a gap",
      tone: "missing",
      title: "Answers before looking up the order",
      detail: "58 sessions like it, no eval checks it",
    },
    {
      tag: "Writes a check",
      tone: "new",
      title: "order_looked_up_first",
      detail: "Agrees with your reviewers 57 of 58 times",
    },
    {
      tag: "Tests the fix",
      tone: "pass",
      title: "Prompt fix, replayed via OpenAI Agents SDK",
      detail: "58 of 58 now pass",
    },
  ],
  journeyLabel: "One session's journey",
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
    headline: "Your AI engineer, across your agents and your ML",
    body: "ZenML Pro is our paid platform. It hosts Kitaru and ZenML for your team and adds an AI engineer that watches every agent trace and every pipeline run, around the clock. One account, one bill.",
    adds: [
      "AI engineer",
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
