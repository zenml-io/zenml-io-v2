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
import type { ValuePropsSectionContent } from "./labs-product-zenml";
import { KITARU_DOCS_URL, KITARU_LINKS } from "./productKitaru";
import { ZENML_LINKS } from "./productZenml";

export type { CaseStudyCard };

/** The two products the Labs shell can be "inside" (header wordmark, switcher, CTA target). */
export type LabsProduct = "zenml" | "kitaru";

export const LABS_HOME_SEO = {
  title: "ZenML Labs: The autonomous AI engineer for your agents and models",
  description:
    "An autonomous AI engineer for AI in production. Think Devin, but it takes care of your agents and models: it finds what's wrong in your runs and traces, fixes it and proves the change, on your own infrastructure. Built on ZenML and Kitaru, both open source.",
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
  headlineLines: ["Meet your autonomous", "AI engineer"],
  deck: "Think Devin, but it takes care of your AI agents and models.",
  cta: LABS_HERO_SIGNUP,
};

/* ---------------------------------------------------------------------- */
/* Hero job box ("Give it a job") — HeroJob island, homepage hero only     */
/* ---------------------------------------------------------------------- */

/**
 * The five conversations; which one a job gets is decided by heroJobPlan.ts
 * from keywords in the job.
 */
export type HeroJobIntent =
  | "agents"
  | "ml"
  | "reliability"
  | "cost"
  | "general";

/**
 * One tappable answer. `value` is the compact id carried to the signup in
 * `answers=` (and, for the use-case question, the key of the case-study
 * proof built from the research databases in heroJobProof.ts). `vars` fill
 * the `{name}` placeholders of the flow's plan and week templates.
 */
export interface HeroJobOption {
  label: string;
  value: string;
  vars?: Readonly<Record<string, string>>;
}

export interface HeroJobQuestion {
  /** Compact id carried to the signup in `answers=`. */
  id: string;
  prompt: string;
  options: readonly HeroJobOption[];
}

export interface HeroJobDay {
  day: string;
  /** Template: `{name}` placeholders are filled from the answers. */
  text: string;
}

/**
 * One intent's conversation: the use-case question first (its answer picks
 * the case studies), then at most two more; then the plan and the first
 * week, both templates filled from the answers. A skipped question leaves
 * the flow's default `vars` in place. `needs` is a var too, so an answer
 * can narrow it.
 */
export interface HeroJobFlow {
  questions: readonly [HeroJobQuestion, ...HeroJobQuestion[]];
  vars: Readonly<Record<string, string>> & { needs: string };
  plan: readonly [string, string, string];
  /** Which plan bullet names a team from the case studies, when there are any. */
  peerStep: 0 | 1 | 2;
  week: readonly [HeroJobDay, HeroJobDay, HeroJobDay];
}

export interface HeroJobContent {
  /** Accessible name of the composer input. */
  label: string;
  /** Composer placeholder before the first message. */
  placeholder: string;
  /** Composer placeholder once the conversation runs on quick replies. */
  replyPlaceholder: string;
  /** Accessible name of the arrow submit button. */
  submitLabel: string;
  /** Quick replies before the first message: tapping one sends it as the job. */
  examples: readonly string[];
  /** The chat window's header. */
  window: {
    name: string;
    status: string;
    /** Accessible name of the chat window. */
    label: string;
  };
  reply: {
    /** The engineer's opening message, shown before anything is sent. */
    greeting: string;
    /** "On it: “<job>”." — the job sits in curly quotes after this. */
    acceptedPrefix: string;
    /** Quick reply that skips a question; also echoed as the visitor's bubble. */
    skipLabel: string;
    /** Screen-reader prefixes of the two sides' bubbles. */
    engineerPrefix: string;
    visitorPrefix: string;
    /** Screen-reader text of the typing indicator. */
    typingLabel: string;
    proofHeading: string;
    /** Source label on a case-study card, by database. */
    sourceLabels: { llmops: string; mlops: string };
    /** Wraps the plan's peer bullet: "{peer}" is a company, "{step}" the bullet. */
    peerTemplate: string;
    planHeading: string;
    weekHeading: string;
    /** "{needs}" is the flow's needs var. */
    ready: string;
    /** Used as `needs` when a job names both agents and models. */
    needsBoth: string;
  };
  flows: Record<HeroJobIntent, HeroJobFlow>;
  /** Primary pill: the unified signup with `?job=` and `&answers=`. */
  connect: LabsCta;
  /** The unchanged hero signup, shown as the small secondary text link. */
  signup: LabsCta;
  changeJobLabel: string;
  /** Plausible events the island fires itself (link clicks use data-analytics). */
  analytics: {
    submit: string;
    example: string;
    answer: string;
    skip: string;
    caseStudy: string;
  };
}

export const LABS_HERO_JOB: HeroJobContent = {
  label: "What should it take care of?",
  placeholder: "Give it a job…",
  replyPlaceholder: "Reply…",
  submitLabel: "Give it the job",
  examples: [
    "Keep our support agent cheap and accurate",
    "Retrain the fraud model when data drifts",
    "Fix failed pipelines before standup",
  ],
  window: {
    name: "Your AI engineer",
    status: "online",
    label: "Chat with your AI engineer",
  },
  reply: {
    greeting: "Hi. What should I take care of?",
    acceptedPrefix: "On it:",
    skipLabel: "Skip",
    engineerPrefix: "AI engineer:",
    visitorPrefix: "You:",
    typingLabel: "Your AI engineer is typing",
    proofHeading: "Teams doing this in production:",
    sourceLabels: { llmops: "LLMOps database", mlops: "MLOps database" },
    peerTemplate: "Like {peer}, {step}",
    planHeading: "Here's my plan",
    weekHeading: "Your first week with me",
    ready: "Ready to start tonight. I just need read access to your {needs}.",
    needsBoth: "traces and runs",
  },
  flows: {
    agents: {
      questions: [
        {
          id: "use_case",
          prompt: "What's the agent for?",
          options: [
            {
              label: "Customer support",
              value: "support",
              vars: { sessions: "support conversations" },
            },
            {
              label: "Search / RAG",
              value: "rag",
              vars: { sessions: "search answers" },
            },
            {
              label: "Coding assistant",
              value: "coding",
              vars: { sessions: "coding sessions" },
            },
            {
              label: "Document processing",
              value: "docs",
              vars: { sessions: "document runs" },
            },
            { label: "Other", value: "other" },
          ],
        },
        {
          id: "model",
          prompt: "What does it run on?",
          options: [
            { label: "GPT-4o", value: "gpt", vars: { cheaper: "GPT-4o mini" } },
            {
              label: "Claude",
              value: "claude",
              vars: { cheaper: "Claude Haiku" },
            },
            {
              label: "Open-source model",
              value: "oss",
              vars: { cheaper: "a smaller open-source model" },
            },
            { label: "Not sure", value: "unsure" },
          ],
        },
        {
          id: "focus",
          prompt: "What matters more right now?",
          options: [
            {
              label: "Cost",
              value: "cost",
              vars: {
                focusStep: "test {cheaper} on your most expensive {sessions}.",
                wedStep:
                  "Replay the most expensive ones on {cheaper} and score both.",
                outcome: "typically about −35% cost at the same quality",
              },
            },
            {
              label: "Quality",
              value: "quality",
              vars: {
                focusStep:
                  "find the {sessions} that go wrong and fix the prompts behind them.",
                wedStep:
                  "Replay the weakest ones with a prompt fix and score both.",
                outcome:
                  "a prompt fix for your weakest {sessions}, with the eval",
              },
            },
            { label: "Both", value: "both" },
          ],
        },
      ],
      vars: {
        needs: "traces",
        sessions: "conversations",
        cheaper: "cheaper models",
        focusStep:
          "test {cheaper} and prompt fixes on your most expensive and weakest {sessions}.",
        wedStep:
          "Replay expensive and weak ones on {cheaper} with a prompt fix.",
        outcome:
          "typically about −30% cost and fewer bad answers, with the eval",
      },
      plan: [
        "Watch all your {sessions} and flag quality drops within a day.",
        "{focusStep}",
        "Nothing ships without an eval on your production sessions. You approve every change.",
      ],
      peerStep: 1,
      week: [
        {
          day: "Mon",
          text: "Read the last two weeks of {sessions} and sort them by cost and quality.",
        },
        { day: "Wed", text: "{wedStep}" },
        { day: "Fri", text: "PR ready: {outcome}. You approve." },
      ],
    },
    ml: {
      questions: [
        {
          id: "use_case",
          prompt: "What's the model for?",
          options: [
            {
              label: "Fraud & risk",
              value: "fraud",
              vars: { model: "risk model" },
            },
            {
              label: "Recommendations",
              value: "recs",
              vars: { model: "recommender" },
            },
            {
              label: "Forecasting",
              value: "forecasting",
              vars: { model: "forecasting model" },
            },
            {
              label: "Computer vision",
              value: "vision",
              vars: { model: "vision model" },
            },
            { label: "Other", value: "other" },
          ],
        },
        {
          id: "cadence",
          prompt: "How often does the data change?",
          options: [
            { label: "Daily", value: "daily", vars: { batch: "day's data" } },
            {
              label: "Weekly",
              value: "weekly",
              vars: { batch: "week's data" },
            },
            {
              label: "Monthly",
              value: "monthly",
              vars: { batch: "month's data" },
            },
          ],
        },
        {
          id: "today",
          prompt: "What happens today when it drifts?",
          options: [
            {
              label: "We notice late",
              value: "late",
              vars: {
                todayStep: "Alert you the day drift starts, not weeks later.",
              },
            },
            {
              label: "Manual retrain",
              value: "manual",
              vars: {
                todayStep:
                  "Take over the retrain: run it, compare against the current {model}, write it up.",
              },
            },
            {
              label: "Nothing yet",
              value: "nothing",
              vars: {
                todayStep:
                  "Set up drift checks on your {model} from the runs you already have.",
              },
            },
          ],
        },
      ],
      vars: {
        needs: "runs",
        model: "model",
        batch: "new batch of data",
        todayStep:
          "Retrain when it drifts and compare against the current {model}.",
      },
      plan: [
        "check inputs and predictions for drift as each {batch} lands.",
        "{todayStep}",
        "Promote a retrained {model} only if it beats the champion. You approve.",
      ],
      peerStep: 0,
      week: [
        {
          day: "Mon",
          text: "Map your {model}'s training runs, data and current metrics.",
        },
        {
          day: "Wed",
          text: "Retrain on recent data and compare against the champion.",
        },
        {
          day: "Fri",
          text: "Retrained {model} ready if it beats the champion, with the comparison. You approve.",
        },
      ],
    },
    reliability: {
      questions: [
        {
          id: "use_case",
          prompt: "What do the pipelines do?",
          options: [
            {
              label: "Training",
              value: "training",
              vars: { pipes: "training pipelines" },
            },
            {
              label: "Feature / data prep",
              value: "data",
              vars: { pipes: "data pipelines" },
            },
            {
              label: "Batch inference",
              value: "inference",
              vars: { pipes: "batch inference jobs" },
            },
            { label: "Other", value: "other" },
          ],
        },
        {
          id: "platform",
          prompt: "Where do pipelines run?",
          options: [
            {
              label: "Kubernetes",
              value: "k8s",
              vars: { where: "Kubernetes" },
            },
            {
              label: "Cloud (SageMaker/Vertex/…)",
              value: "cloud",
              vars: { where: "your cloud platform" },
            },
            { label: "Airflow", value: "airflow", vars: { where: "Airflow" } },
            { label: "Other", value: "other" },
          ],
        },
        {
          id: "owner",
          prompt: "Who fixes them?",
          options: [
            {
              label: "Whoever's on call",
              value: "oncall",
              vars: {
                ownerStep:
                  "Hand whoever is on call a diagnosis and a fix, not a stack trace.",
              },
            },
            {
              label: "One person",
              value: "one",
              vars: {
                ownerStep:
                  "Take the first pass off that one person: cause, fix and evidence, ready to review.",
              },
            },
            {
              label: "Nobody, it waits",
              value: "nobody",
              vars: {
                ownerStep:
                  "Pick up failures the moment they happen, so nothing waits for a free afternoon.",
              },
            },
          ],
        },
      ],
      vars: {
        needs: "pipelines",
        pipes: "pipelines",
        where: "your orchestrator",
        ownerStep: "Open a fix with the evidence and re-run it on the branch.",
      },
      plan: [
        "catch failed {pipes} on {where} as they happen and find the cause from logs and lineage.",
        "{ownerStep}",
        "Post a summary before standup. You approve merges.",
      ],
      peerStep: 0,
      week: [
        {
          day: "Mon",
          text: "Read every failed run on {where} from the last month and group them by cause.",
        },
        {
          day: "Wed",
          text: "Open fixes for the top causes and re-run them on a branch.",
        },
        {
          day: "Fri",
          text: "Fixes ready for the most common failures, with the evidence. You approve merges.",
        },
      ],
    },
    cost: {
      questions: [
        {
          id: "use_case",
          prompt: "What's getting expensive?",
          options: [
            {
              label: "LLM calls",
              value: "llm",
              vars: {
                spend: "LLM calls",
                swap: "cheaper models and shorter prompts",
              },
            },
            {
              label: "Model training",
              value: "train",
              vars: {
                spend: "training runs",
                swap: "right-sized GPUs and spot capacity",
              },
            },
            {
              label: "Inference",
              value: "serve",
              vars: {
                spend: "inference",
                swap: "smaller models and right-sized instances",
              },
            },
            { label: "Not sure", value: "unsure" },
          ],
        },
        {
          id: "margin",
          prompt: "How much quality can you trade?",
          options: [
            {
              label: "None",
              value: "none",
              vars: { guard: "Ship only what holds quality exactly." },
            },
            {
              label: "A little",
              value: "little",
              vars: {
                guard:
                  "Ship only what stays inside the quality margin you set.",
              },
            },
            {
              label: "Not sure",
              value: "unsure",
              vars: {
                guard:
                  "Show you the cost and quality of each change side by side.",
              },
            },
          ],
        },
      ],
      vars: {
        needs: "runs",
        spend: "agents and pipelines",
        swap: "cheaper models and right-sized GPUs",
        guard: "Ship only what holds quality.",
      },
      plan: [
        "Find the most expensive steps in your {spend}.",
        "test {swap} on real data.",
        "{guard} You approve.",
      ],
      peerStep: 1,
      week: [
        {
          day: "Mon",
          text: "Rank your {spend} by cost over the last 30 days.",
        },
        { day: "Wed", text: "Test {swap} on the top three." },
        {
          day: "Fri",
          text: "PR ready: typically about −30% on those steps. You approve.",
        },
      ],
    },
    general: {
      questions: [
        {
          id: "use_case",
          prompt: "What do you run in production?",
          options: [
            {
              label: "Agents / LLM apps",
              value: "agents",
              vars: { what: "agents", needs: "traces" },
            },
            {
              label: "ML models",
              value: "models",
              vars: { what: "models", needs: "runs" },
            },
            { label: "Both", value: "both" },
          ],
        },
        {
          id: "worry",
          prompt: "What worries you most?",
          options: [
            {
              label: "Quality",
              value: "quality",
              vars: { worry: "getting worse" },
            },
            {
              label: "Cost",
              value: "cost",
              vars: { worry: "costing too much" },
            },
            {
              label: "Failures",
              value: "failures",
              vars: { worry: "failing" },
            },
          ],
        },
      ],
      vars: {
        needs: "runs and traces",
        what: "agents and models",
        worry: "getting worse or costing too much",
      },
      plan: [
        "learn how your {what} run in production.",
        "Find what's {worry} and why.",
        "Fix it and prove it before anything ships. You approve.",
      ],
      peerStep: 0,
      week: [
        { day: "Mon", text: "Map your {what} from their runs and traces." },
        { day: "Wed", text: "Rank what's {worry}, with the evidence." },
        {
          day: "Fri",
          text: "First fix ready, proven on production data. You approve.",
        },
      ],
    },
  },
  connect: {
    label: "Connect and start",
    href: LABS_SIGNUP.href,
    analytics: "Hero-Job-Connect",
  },
  signup: LABS_HERO_SIGNUP,
  changeJobLabel: "Change job",
  analytics: {
    submit: "Hero-Job-Submit",
    example: "Hero-Job-Example",
    answer: "Hero-Job-Answer",
    skip: "Hero-Job-Skip",
    caseStudy: "Hero-Job-CaseStudy",
  },
};

/* ---------------------------------------------------------------------- */
/* Problem + contrast (LabsValueProps, no button)                          */
/* ---------------------------------------------------------------------- */

/** Why this isn't another coding agent or dashboard, before the stories. */
export const LABS_CONTRAST: ValuePropsSectionContent = {
  headline: "Not another coding agent. Not another dashboard.",
  items: [
    {
      index: "Coding agents",
      title: "See your repo",
      body: "They write good code, but they can't see the runs, traces, data and costs where AI actually breaks.",
    },
    {
      index: "Monitoring and MLOps tools",
      title: "Show you the problem",
      body: "They tell you something is wrong. A person still has to find the cause, fix it and prove the fix.",
    },
    {
      index: "ZenML Labs",
      title: "Does the work, you decide",
      body: "Works from the record of how your AI runs, makes the change, proves it on production data, and hands it to you to approve.",
    },
  ],
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
  headline: "Built on the record of how your AI runs",
  doors: [
    {
      name: "ZenML",
      tint: "sage",
      leadLine: "Where your pipelines and agents run",
      body: "Pipelines and agents in Python, on the orchestrator and cloud you already have, with every run, artifact and model version tracked. That record is what the work starts from: what actually happened, not a guess.",
      cta: {
        label: "Explore ZenML",
        href: "/product/zenml",
        analytics: "Door-Explore-ZenML",
      },
    },
    {
      name: "Kitaru",
      tint: "orange",
      leadLine: "Where every change gets proven",
      body: "The sessions your agents have actually run become the test set. A change is replayed against them first, so you see what improved, what regressed and what it costs before you approve it.",
      cta: {
        label: "Explore Kitaru",
        href: "/product/kitaru",
        analytics: "Door-Explore-Kitaru",
      },
    },
  ],
  caption:
    "ZenML and Kitaru are open source under Apache 2.0. Self-host them, read the code, and keep your data where it is.",
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
    title: "Find what's wrong",
    body: "Failed runs, regressions, drift and runaway costs, traced to the step that caused them, from your runs and traces.",
    icon: "pipeline",
    tone: "sage-tint",
  },
  {
    index: "02.",
    title: "Fix it",
    body: "A change and the evidence behind it, ready for review. Not another ticket waiting in someone's backlog.",
    icon: "code",
    tone: "sage-deep",
  },
  {
    index: "03.",
    title: "Prove it",
    body: "Every change is replayed on production data first: what improved, what regressed, and what it costs.",
    icon: "layers",
    tone: "canvas",
  },
  {
    index: "04.",
    title: "Stay in control",
    body: "You decide what runs on its own and what needs a person. Budgets, a record of every action, your infrastructure. SOC 2 Type II and ISO 27001.",
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
