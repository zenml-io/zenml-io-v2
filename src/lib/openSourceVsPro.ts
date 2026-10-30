/**
 * Open Source vs Pro page data — centralized marketing copy.
 *
 * Used by src/pages/open-source-vs-pro.astro. One page for both products:
 * open source runs when you drive it (your coding agent, the CLI); Pro adds
 * an AI engineer that works on its own around the clock, the automations
 * around it, and a managed, team-ready platform. Prices and limits come
 * from productKitaru.ts so they match /pricing.
 */
import type { LabsBandContent } from "./labs-home";
import type { ValuePropsContent } from "./labs-product-zenml";
import {
  KITARU_CLOUD_PRICE,
  KITARU_LINKS,
  KITARU_TRIAL_DAYS,
} from "./productKitaru";
import { defaultOgUrl } from "./seo";

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------
export const OSS_VS_PRO_SEO = {
  title: "Open Source vs Pro: ZenML and Kitaru | ZenML",
  description:
    "Open source runs when you drive it. Pro adds an AI engineer that watches your agents and ML pipelines around the clock, plus automations, a hosted dashboard and team controls.",
  ogTitle: "ZenML Open Source vs Pro",
  ogDescription:
    "Open source runs when you drive it. Pro adds an AI engineer that works on its own, around the clock.",
  ogImage: defaultOgUrl("pages", "open-source-vs-pro"),
} as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
export const OSS_VS_PRO_HERO = {
  eyebrow: "Open source vs Pro",
  headline: "You drive it, or it runs on its own",
  deck: "ZenML and Kitaru are open source, and they do the work when you or your coding agent ask. Pro adds an AI engineer that watches your agents and ML pipelines around the clock, with the automations, dashboard and controls a team needs.",
} as const;

// ---------------------------------------------------------------------------
// What Pro adds
// ---------------------------------------------------------------------------
export const OSS_VS_PRO_VALUE_PROPS: ValuePropsContent = {
  headline: "What Pro adds on top of open source",
  deck: "Same code, same pipelines, same traces. Moving to Pro takes no rewrite.",
  items: [
    {
      index: "01.",
      title: "An AI engineer that never stops",
      body: "It reads every new trace and pipeline run, flags evals that are wrong or missing, failures and drift, and asks you only when something needs your call.",
    },
    {
      index: "02.",
      title: "Fixes drafted for you",
      body: "A new check, an eval or a pipeline change, written and tested before you look at it.",
    },
    {
      index: "03.",
      title: "Automations",
      body: "Scheduled eval runs, webhooks, event triggers and alerts, so nothing waits for someone to run a command.",
    },
    {
      index: "04.",
      title: "Managed for your team",
      body: "A hosted dashboard, backups and upgrades handled, and SSO, roles and audit logs when you need them.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Comparison table
// ---------------------------------------------------------------------------
export interface OssVsProRow {
  feature: string;
  description: string;
  columns: readonly [string, string];
}

export const OSS_VS_PRO_COMPARISON = {
  headline: "Side by side",
  subheadline: "Open source on the left, Pro on the right.",
  columnHeaders: ["Open source", "Pro"],
  rows: [
    {
      feature: "How it runs",
      description: "Who starts the work",
      columns: [
        "When you drive it, from Claude Code, Codex or the CLI",
        "On its own, around the clock",
      ],
    },
    {
      feature: "Agents",
      description: "Traces, evals and fixes",
      columns: [
        "Import traces, review sessions, write evals and replay a fix yourself",
        "Your AI engineer reads every trace and flags evals that are wrong or missing",
      ],
    },
    {
      feature: "ML pipelines",
      description: "Training, batch inference, fine-tuning",
      columns: [
        "Orchestrate on any stack, with versioned artifacts and lineage",
        "Your AI engineer watches every run and flags failures and drift",
      ],
    },
    {
      feature: "Fixes",
      description: "What happens after a finding",
      columns: [
        "You write the check or the change",
        "Drafted for you: a new check, eval or pipeline change",
      ],
    },
    {
      feature: "Automations",
      description: "Runs without someone at a terminal",
      columns: [
        "Runs start from the client",
        "Scheduled eval runs, webhooks, event triggers and alerts",
      ],
    },
    {
      feature: "Dashboard",
      description: "Where the team looks",
      columns: [
        "Local dashboard",
        "Hosted dashboard, start runs from the UI, reviews in Slack",
      ],
    },
    {
      feature: "Infrastructure",
      description: "The server behind it",
      columns: [
        "You run and upgrade it",
        "Managed, with backups and upgrades. On-prem on Enterprise.",
      ],
    },
    {
      feature: "Access",
      description: "Who can do what",
      columns: ["Basic users", "SSO, SCIM, custom roles and audit logs"],
    },
    {
      feature: "Support",
      description: "When you get stuck",
      columns: ["Community Slack", "Email, or a named engineer with an SLA"],
    },
    {
      feature: "Price",
      description: "What it costs",
      columns: [
        "Free, Apache 2.0",
        `From ${KITARU_CLOUD_PRICE} a month, ${KITARU_TRIAL_DAYS}-day free trial`,
      ],
    },
  ] satisfies OssVsProRow[],
} as const;

// ---------------------------------------------------------------------------
// Closing band
// ---------------------------------------------------------------------------
export const OSS_VS_PRO_CLOSE: LabsBandContent = {
  headlineLines: ["Let it run", "on its own"],
  deck: `Start with one AI agent and one ML project. ${KITARU_TRIAL_DAYS} days free, no credit card.`,
  cta: {
    label: KITARU_LINKS.signup.label,
    href: KITARU_LINKS.signup.href,
    analytics: "OSSvsPro-Close-Signup",
  },
};
