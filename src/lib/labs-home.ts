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
  title: "ZenML Labs: An AI engineer for the AI you run in production",
  description:
    "An AI engineer for the agents and models you run in production. Unlike coding agents, it works from your real runs and traces: it finds what's wrong, fixes it and proves the change on production data, on your own infrastructure. You approve what ships. Built on ZenML and Kitaru, both open source.",
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

/**
 * What LabsHero's landing band takes: a product band whose deck may be
 * absent (it collapses). The homepage hero is the headline and the job box
 * only; every other consumer passes a full LabsProductBandContent.
 */
export type LabsHeroContent = Omit<LabsProductBandContent, "deck"> & {
  deck?: string;
};

export interface LabsInstallChip {
  cmd: string;
  /** Plausible event for the copy button. */
  analytics: string;
}

/** The headline, a one-line deck and the eval-plan chat (HeroJob). */
export const LABS_HERO: LabsHeroContent = {
  headlineLines: ["Meet your", "AI engineer"],
  deck: "It keeps your agents and models improving in production, on your own infrastructure. Your team approves what ships.",
  cta: LABS_HERO_SIGNUP,
};

/* ---------------------------------------------------------------------- */
/* Hero eval report — HeroJob island, homepage hero only                   */
/* ---------------------------------------------------------------------- */

/**
 * The two conversations: an agent or AI app, or a model being fine-tuned.
 * The failure modes, evals and advice each path's report is composed from
 * live in heroJobAdvice.ts; the case studies are matched at build time from
 * the LLMOps/MLOps databases (heroJobProof.ts).
 */
export type HeroJobPath = "agent" | "finetune";

/**
 * One tappable answer. `value` is the compact id carried to the signup and
 * the email capture in `answers=`. `keywords` let a typed description answer
 * the question before it is asked (matched at word starts, case-insensitive).
 */
export interface HeroJobOption {
  label: string;
  value: string;
  keywords?: readonly string[];
}

export interface HeroJobQuestion {
  /** Compact id carried in `answers=`. */
  id: string;
  prompt: string;
  /** How much this answer counts when ranking similar case studies. */
  weight: number;
  options: readonly [HeroJobOption, ...HeroJobOption[]];
}

export interface HeroJobPathContent {
  /** The start chip. */
  label: string;
  /** The engineer's reply once the path is known, before the first question. */
  intro: string;
  /** Words in a typed description that pick this path. */
  keywords?: readonly string[];
  questions: readonly [HeroJobQuestion, ...HeroJobQuestion[]];
  reportTitle: string;
  adviceHeading: string;
  /** Mentioned in the gate's body, so the visitor knows what's locked. */
  lockedSummary: string;
  /** The last card, once the report is unlocked. */
  next: {
    heading: string;
    body: string;
    label: string;
    analytics: string;
  };
}

export type HeroJobGrade = "code" | "judge" | "human";

export interface HeroJobContent {
  /** Accessible name of the composer input. */
  label: string;
  /** Composer placeholder before the first message. */
  placeholder: string;
  /** Composer placeholder once the conversation runs on quick replies. */
  replyPlaceholder: string;
  /** Accessible name of the arrow submit button. */
  submitLabel: string;
  sendKey: string;
  sendHint: string;
  /** The chat window's header. */
  window: {
    name: string;
    status: string;
    /** Accessible name of the chat window. */
    label: string;
  };
  /** Start chips, in display order. */
  pathOrder: readonly [HeroJobPath, HeroJobPath];
  paths: Record<HeroJobPath, HeroJobPathContent>;
  reply: {
    /** "{count}" is the number of published database entries, at build time. */
    greeting: string;
    /** "Got it: “<description>”." — the text sits in curly quotes after this. */
    acceptedPrefix: string;
    /** Quick reply that skips a question; also echoed as the visitor's bubble. */
    skipLabel: string;
    /** The engineer's line before the report. */
    reportLead: string;
    engineerPrefix: string;
    visitorPrefix: string;
    typingLabel: string;
  };
  report: {
    /** "{count}" as in the greeting. */
    basis: string;
    similarHeading: string;
    ranIntoLabel: string;
    sourceLabels: { llmops: string; mlops: string };
    failuresHeading: string;
    seenAtLabel: string;
    evalsHeading: string;
    checksLabel: string;
    exampleLabel: string;
    inputLabel: string;
    expectLabel: string;
    gradeLabel: string;
    grades: Record<HeroJobGrade, string>;
    /** Screen-reader text on a locked item. */
    lockedLabel: string;
  };
  /** The email gate; posts to the site's existing /api/forms route. */
  gate: {
    endpoint: string;
    heading: string;
    /** "{locked}" is the path's lockedSummary. */
    body: string;
    emailLabel: string;
    emailPlaceholder: string;
    privacyPrefix: string;
    privacyLink: { label: string; href: string };
    submitLabel: string;
    submittingLabel: string;
    invalidEmail: string;
    privacyRequired: string;
    /** "{email}" is the submitted address. */
    unlocked: string;
    /** Shown when the lead could not be saved; the report unlocks anyway. */
    unsaved: string;
    skipLabel: string;
  };
  /** The signup every CTA points at, with `path=` and `answers=`. */
  signupHref: string;
  startOverLabel: string;
  /** Plausible events the island fires itself (link clicks use data-analytics). */
  analytics: {
    path: string;
    submit: string;
    answer: string;
    skip: string;
    caseStudy: string;
    unlock: string;
    skipGate: string;
  };
}

export const LABS_HERO_JOB: HeroJobContent = {
  label: "Describe your AI system",
  placeholder:
    "Or describe it: a support agent that answers from our help center…",
  replyPlaceholder: "Tap an answer above…",
  submitLabel: "Send",
  sendKey: "↵",
  sendHint: "to send",
  window: {
    name: "Your AI engineer",
    status: "Free eval plan, no sign-up",
    label: "Chat with your AI engineer",
  },
  pathOrder: ["agent", "finetune"],
  paths: {
    agent: {
      label: "An agent or AI app",
      intro: "Four quick taps. Each answer changes the advice.",
      questions: [
        {
          id: "modality",
          prompt: "What does it work with?",
          weight: 2,
          options: [
            {
              label: "Text",
              value: "text",
              keywords: ["chat", "text", "email", "support", "assistant"],
            },
            {
              label: "Voice",
              value: "voice",
              keywords: ["voice", "call", "phone", "speech", "audio"],
            },
            {
              label: "Documents",
              value: "documents",
              keywords: [
                "document",
                "pdf",
                "contract",
                "invoice",
                "claim",
                "forms",
              ],
            },
            {
              label: "Code",
              value: "code",
              keywords: ["code", "coding", "repo", "pull request"],
            },
          ],
        },
        {
          id: "interaction",
          prompt: "How does it interact?",
          weight: 1.5,
          options: [
            {
              label: "One request, one answer",
              value: "single",
              keywords: ["classif", "extract", "summar", "tag"],
            },
            {
              label: "Back-and-forth conversation",
              value: "multi",
              keywords: ["chatbot", "conversation", "chat"],
            },
            {
              label: "Multi-step, with tools",
              value: "tools",
              keywords: ["agent", "tool", "workflow", "mcp"],
            },
          ],
        },
        {
          id: "output",
          prompt: "What does it produce?",
          weight: 1,
          options: [
            { label: "Text for people", value: "text" },
            {
              label: "Structured data",
              value: "structured",
              keywords: ["json", "structured", "extract"],
            },
            {
              label: "Actions in other systems",
              value: "actions",
              keywords: ["refund", "book", "update", "action"],
            },
          ],
        },
        {
          id: "risk",
          prompt: "What would hurt most if it went wrong?",
          weight: 1,
          options: [
            { label: "Confident wrong answers", value: "facts" },
            { label: "Unsafe or off-brand replies", value: "unsafe" },
            { label: "A wrong action", value: "act" },
            { label: "Leaking private data", value: "privacy" },
            { label: "Getting worse after a change", value: "regress" },
            { label: "Runaway cost or latency", value: "cost" },
          ],
        },
      ],
      reportTitle: "Your eval plan",
      adviceHeading: "How to write evals that hold up",
      lockedSummary:
        "the rest of the failure modes, every eval with a test case and how to grade it, and how to write evals that hold up",
      next: {
        heading: "Run these evals on your real traffic",
        body: "Connect your traces. Your AI engineer runs these evals on real sessions, finds what's failing and fixes it. Your team approves what ships.",
        label: "Connect your traces",
        analytics: "Hero-Job-Connect-Traces",
      },
    },
    finetune: {
      label: "A model we're fine-tuning",
      intro: "Three quick taps about the fine-tune.",
      keywords: [
        "fine-tun",
        "finetun",
        "fine tun",
        "lora",
        "distill",
        "sft",
        "dpo",
        "rlhf",
        "train",
        "adapter",
      ],
      questions: [
        {
          id: "goal",
          prompt: "Why are you fine-tuning?",
          weight: 2,
          options: [
            {
              label: "Cheaper or faster than a big model",
              value: "cost",
              keywords: [
                "cheap",
                "cost",
                "latency",
                "fast",
                "distill",
                "small",
              ],
            },
            {
              label: "Better quality on our domain",
              value: "quality",
              keywords: ["domain", "quality", "accura"],
            },
            {
              label: "A consistent format or style",
              value: "format",
              keywords: ["format", "style", "tone", "json"],
            },
            {
              label: "Keep data and weights in-house",
              value: "private",
              keywords: [
                "private",
                "privacy",
                "on-prem",
                "self-host",
                "open-weight",
                "open source",
              ],
            },
          ],
        },
        {
          id: "data",
          prompt: "Where does the training data come from?",
          weight: 1.5,
          options: [
            {
              label: "Production logs",
              value: "logs",
              keywords: ["log", "trace", "production"],
            },
            {
              label: "Human-labelled examples",
              value: "labels",
              keywords: ["label", "annotat"],
            },
            {
              label: "Generated by a bigger model",
              value: "synthetic",
              keywords: ["synthetic", "generated", "teacher", "distill"],
            },
            {
              label: "Our documents",
              value: "docs",
              keywords: ["document", "docs", "manual", "wiki"],
            },
          ],
        },
        {
          id: "training",
          prompt: "How are you training?",
          weight: 1,
          options: [
            {
              label: "LoRA or adapters",
              value: "lora",
              keywords: ["lora", "qlora", "adapter", "peft"],
            },
            {
              label: "Full fine-tune",
              value: "full",
              keywords: ["full fine", "pretrain", "pre-train"],
            },
            {
              label: "A provider's fine-tuning API",
              value: "api",
              keywords: ["api"],
            },
            {
              label: "Preference tuning (DPO, RL)",
              value: "pref",
              keywords: ["dpo", "rlhf", "preference", "reward"],
            },
          ],
        },
      ],
      reportTitle: "Your fine-tune eval plan",
      adviceHeading: "How to prove the fine-tune beats the base model",
      lockedSummary:
        "the rest of the failure modes, every eval with a test case and how to grade it, and how to prove the fine-tune beats the base model",
      next: {
        heading: "Prove it on your own data",
        body: "Connect your data. Your AI engineer builds the dataset, runs the fine-tune on your infrastructure and shows whether it beats the base model. Your team approves what ships.",
        label: "Connect your data",
        analytics: "Hero-Job-Connect-Data",
      },
    },
  },
  reply: {
    greeting:
      "I've read {count} production case studies of AI systems. Tell me what you're building, and I'll show you what tends to break and which evals to write first.",
    acceptedPrefix: "Got it:",
    skipLabel: "Skip",
    reportLead:
      "Here's your plan, drawn from the case studies closest to your system.",
    engineerPrefix: "AI engineer:",
    visitorPrefix: "You:",
    typingLabel: "Your AI engineer is typing",
  },
  report: {
    basis: "Matched against {count} production case studies",
    similarHeading: "Systems like yours",
    ranIntoLabel: "What they ran into",
    sourceLabels: { llmops: "LLMOps Database", mlops: "MLOps Database" },
    failuresHeading: "What breaks first",
    seenAtLabel: "Seen at",
    evalsHeading: "Evals to write first",
    checksLabel: "Checks",
    exampleLabel: "Example test case",
    inputLabel: "Input",
    expectLabel: "Pass if",
    gradeLabel: "How to grade",
    grades: { code: "Code check", judge: "LLM judge", human: "Human review" },
    lockedLabel: "Locked. Unlock the full report below.",
  },
  gate: {
    endpoint: "/api/forms/eval-report",
    heading: "Unlock the full report",
    body: "Get {locked}. It unlocks here right away.",
    emailLabel: "Work email",
    emailPlaceholder: "you@company.com",
    privacyPrefix: "I agree to the",
    privacyLink: { label: "privacy policy", href: "/privacy-policy" },
    submitLabel: "Unlock",
    submittingLabel: "Unlocking…",
    invalidEmail: "Enter a valid email address.",
    privacyRequired: "Please agree to the privacy policy.",
    unlocked: "Thanks, {email}. Here's the full report.",
    unsaved:
      "We couldn't save your email just now. Here's the full report anyway.",
    skipLabel: "Skip, start free",
  },
  signupHref: LABS_SIGNUP.href,
  startOverLabel: "Start over",
  analytics: {
    path: "Hero-Job-Path",
    submit: "Hero-Job-Submit",
    answer: "Hero-Job-Answer",
    skip: "Hero-Job-Skip",
    caseStudy: "Hero-Job-CaseStudy",
    unlock: "Hero-Job-Unlock",
    skipGate: "Hero-Job-Skip-Gate",
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
