/**
 * Copy for the *future* unified zenml.io homepage (Phase 9).
 *
 * This file is NOT WIRED into a route yet. The current homepage lives at
 * `/` and reads from `src/lib/homepage.ts`. This file is a copy doc you
 * can iterate on without breaking live traffic; once the copy lands,
 * the plan is to:
 *
 *   1. Move the current `/` content to `/product/zenml` (already exists
 *      as a baseline; can absorb the old hero + sections here).
 *   2. Rebuild `/` to consume this file.
 *
 * Hooks back to MERGE_PLAN.md Phase 9, D14, and Appendix A (Focus Lab
 * brand strategy — USP, value prop, elevator pitch).
 *
 * Style notes (intentional choices, push back if wrong):
 *   - Headline uses "unified layer" — matches the Variant C Paper
 *     artboard and reads cleaner against the "one platform, two
 *     workspaces" framing than Focus Lab's "single layer" draft.
 *   - Two-workspace explainer sits high (between hero and trust bar)
 *     because it's the structural thing that's new vs the old homepage.
 *     If a visitor leaves after seeing only Hero + this, they should
 *     understand that ZenML and Kitaru are sub-products under one
 *     product family.
 *   - "Open source, always" is its own promise card — Focus Lab framed
 *     this almost as a manifesto, so it deserves its own panel rather
 *     than being a single bullet under value props.
 */

import type { Surface } from "./analytics";

export const HOMEPAGE_UNIFIED_SEO = {
  title: "ZenML — The unified layer for ML and AI",
  description:
    "Open-source infrastructure for teams shipping ML pipelines and AI agents on their own stack. Modular, vendor-neutral, runs anywhere — always.",
  surface: "unified" satisfies Surface,
} as const;

/* ---------------------------------------------------------------------- */
/* Hero                                                                    */
/* ---------------------------------------------------------------------- */

export const HOMEPAGE_UNIFIED_HERO = {
  headlinePrefix: "The unified layer for ",
  headlineAccent: "ML and AI",
  headlineSuffix: "",
  /**
   * Lead phrase + body. Focus Lab's USP language transposed into hero
   * copy. Keep it specific to "your stack" so the message lands for
   * the buyer who's worried about vendor lock-in.
   */
  subtitleLead: "Built for engineers, ready for enterprise.",
  subtitle:
    "ZenML is open source infrastructure for production ML/AI. Orchestrate training pipelines and durable AI agents on the tools, clouds, and environments you already use — without rewriting your stack.",
  primaryCta: { label: "Get started", href: "/get-started" },
  secondaryCta: { label: "Book a demo", href: "/book-your-demo" },
} as const;

/* ---------------------------------------------------------------------- */
/* Announcement banner (Variant C — dark band above the nav)               */
/*   Thin ink band, Kitaru-amber NEW eyebrow, single line of body copy,    */
/*   underlined "Read the docs →" link. Lives only on the unified `/`      */
/*   surface; the site-wide AnnouncementBanner is unchanged.               */
/* ---------------------------------------------------------------------- */

export const HOMEPAGE_UNIFIED_ANNOUNCEMENT = {
  eyebrow: "NEW",
  body: "Build an agent factory with Kitaru — our durable runtime for production AI agents.",
  linkText: "Read the docs",
  linkHref: "https://kitaru.ai/docs",
} as const;

/* ---------------------------------------------------------------------- */
/* Workspace widget — TwoWorkspaces v2 tabbed product demo                 */
/*   ZenML tab shows reproducible ML pipelines; Kitaru tab shows durable   */
/*   agent flows. The widget is the centerpiece of the unified `/`.        */
/* ---------------------------------------------------------------------- */

/**
 * `HOMEPAGE_UNIFIED_WIDGET` is the thin nav structure for the TwoWorkspaces
 * widget: two tabs (ZenML / Kitaru), five subtabs each. The shell
 * (`TwoWorkspaces.astro`) reads only `id`, `label`, `layout`, and
 * `surfaceSubtitle` (the quiet caption under the widget).
 *
 * Each subtab's `layout` selects a bespoke layout component:
 *   zenml  → pipelines · stacks · artifacts-models · frameworks-ml · resources
 *   kitaru → flows · checkpoints · replay · deployments · frameworks-agents
 *
 * Pipelines and Flows are the two v2 reference ports — they still receive
 * header copy as props (the extra fields kept on those two entries). Every
 * other layout is self-contained: it imports its own data file from
 * `src/lib/two-workspaces/` (copy + data), so this file stays a thin nav
 * map and parallel per-tab work never collides here.
 *
 * Real data sources (each per-tab data file cites exact paths):
 *   - ZenML examples:  ../ZenML/zenml/examples/
 *   - Kitaru examples: ../kitaru/examples/
 */
export const HOMEPAGE_UNIFIED_WIDGET = {
  tabs: [
    {
      id: "zenml" as const,
      label: "ZenML",
      sublabel: "",
      subtabs: [
        {
          id: "pipelines" as const,
          label: "Pipelines",
          layout: "pipelines" as const,
          surfaceTitle: "Pipelines",
          surfaceSubtitle:
            "Integrate your MLOps stack — for compute-intense, distributed ML pipelines.",
          /** Left pane header */
          title: "Recent runs",
          subheader: "Last 24h · 5 runs",
          countLabel: "200 total",
          /** Right-pane header strip — tab-level copy (not per-example) */
          rightEyebrow: "Integrate your MLOps stack",
          rightSubhead: "For compute-intense, distributed ML pipelines.",
          /** Per-example payload lives in two-workspaces/pipelines-examples.ts */
          examplesRef: "pipelines-examples" as const,
        },
        {
          id: "stacks" as const,
          label: "Stacks",
          layout: "stacks" as const,
          surfaceTitle: "Stacks",
          surfaceSubtitle: "Swap orchestrator, store, tracker — same pipeline code.",
        },
        {
          id: "artifacts" as const,
          label: "Artifacts & Models",
          layout: "artifacts-models" as const,
          surfaceTitle: "Artifacts & Models",
          surfaceSubtitle:
            "Every artifact and model from every run — versioned, typed, traceable.",
        },
        {
          id: "frameworks" as const,
          label: "Frameworks",
          layout: "frameworks-ml" as const,
          surfaceTitle: "Frameworks",
          surfaceSubtitle:
            "Bring your own ML framework. ZenML wraps it — you don't change your training loop.",
        },
        {
          id: "resources" as const,
          label: "Resources",
          layout: "resources" as const,
          surfaceTitle: "Resources",
          surfaceSubtitle: "Share GPU and compute pools across every pipeline.",
        },
      ],
    },
    {
      id: "kitaru" as const,
      label: "Kitaru",
      sublabel: "",
      subtabs: [
        {
          id: "flows" as const,
          label: "Flows",
          layout: "flows" as const,
          surfaceTitle: "Flows",
          surfaceSubtitle:
            "Wrap your harness with one line — for deploying agents at scale.",
          /** Left-pane (AGENT FLOWS list) header copy. Rows + code + timelines
           *  come from src/lib/two-workspaces/flows-examples.ts. */
          title: "Agent flows",
          subheader: "5 examples · all from the Kitaru SDK",
          countLabel: "examples/",
          rightEyebrow: "Wrap your harness with one line",
          rightSubhead: "For deploying agents at scale.",
        },
        {
          id: "checkpoints" as const,
          label: "Checkpoints",
          layout: "checkpoints" as const,
          surfaceTitle: "Checkpoints",
          surfaceSubtitle:
            "Resume from any checkpoint after a crash, rate-limit, or eviction.",
        },
        {
          id: "replay" as const,
          label: "Replay",
          layout: "replay" as const,
          surfaceTitle: "Replay",
          surfaceSubtitle:
            "Compare a candidate against the baseline on real frozen traffic.",
        },
        {
          id: "deployments" as const,
          label: "Deployments",
          layout: "deployments" as const,
          surfaceTitle: "Deployments",
          surfaceSubtitle: "Versioned deployments — promote, shadow, or roll back.",
        },
        {
          id: "frameworks" as const,
          label: "Frameworks",
          layout: "frameworks-agents" as const,
          surfaceTitle: "Frameworks",
          surfaceSubtitle:
            "Wrap any agent harness. Kitaru owns durable execution around it.",
        },
      ],
    },
  ],
} as const;

/* ---------------------------------------------------------------------- */
/* Two-workspace explainer                                                 */
/*   The load-bearing structural element of this rewrite. ZenML and        */
/*   Kitaru both surface at the top so visitors immediately understand     */
/*   the two-sub-product framing.                                          */
/* ---------------------------------------------------------------------- */

export const HOMEPAGE_UNIFIED_WORKSPACES = {
  eyebrow: "Two workspaces, one platform",
  headline: "Pick your workload. Same infrastructure underneath.",
  items: [
    {
      name: "ZenML workspace",
      tagline: "ML pipelines",
      body: "Reproducible training, evaluation, batch inference, and deployment. Pipeline DAGs with typed step interfaces, versioned artifacts, and a composable stack abstraction.",
      bullets: [
        "Runs on Kubernetes, Vertex, SageMaker, AzureML, Airflow",
        "Artifact store + model registry + experiment tracker",
        "Local-to-remote without code changes",
      ],
      cta: { label: "Explore ZenML", href: "/product/zenml" },
    },
    {
      name: "Kitaru workspace",
      tagline: "AI agents",
      body: "Durable execution for long-running Python agents. Checkpoints, replay, and wait/resume — without rewriting your control flow.",
      bullets: [
        "Two decorators: @flow and @checkpoint",
        "Resume from any checkpoint after a crash or rate-limit",
        "MCP, CLI, and typed-client ops surfaces",
      ],
      cta: { label: "Explore Kitaru", href: "/product/kitaru" },
    },
  ],
  /** Subtle note under the cards — clarifies the commercial framing. */
  note: "Same plans, same control plane. Pro covers both workspaces.",
} as const;

/* ---------------------------------------------------------------------- */
/* Why this approach (Focus Lab value prop, broken into three cards)       */
/* ---------------------------------------------------------------------- */

export const HOMEPAGE_UNIFIED_VALUES = {
  eyebrow: "What stays true across both workspaces",
  headline: "Own your infrastructure. Build it the way you want. Keep pace as you evolve.",
  items: [
    {
      name: "Your stack, your data",
      body: "Run in your VPC, point at your object store, train on your clusters. Metadata is the only thing ZenML touches — your artifacts, prompts, and code stay inside your infrastructure end-to-end.",
    },
    {
      name: "Modular, not monolithic",
      body: "Swap any component in your stack — orchestrator, artifact store, experiment tracker, model registry — without rewriting your pipelines or flows. Build with the tools you already trust.",
    },
    {
      name: "Open source, always",
      body: "Apache 2.0 from day one, with thousands of teams running it in production. Self-host forever. Adopt the managed control plane only when you need governance, SSO, and an SLA.",
    },
  ],
} as const;

/* ---------------------------------------------------------------------- */
/* Pricing teaser                                                          */
/*   Replaces the homepage's old "what we cost is what we cost" implicit   */
/*   signal with an explicit, unified message.                             */
/* ---------------------------------------------------------------------- */

export const HOMEPAGE_UNIFIED_PRICING_TEASER = {
  headline: "Unified pricing. Pick ML, Agent, or both.",
  body: "Same tiers across both workspaces, billed on executions (ZenML pipeline runs and Kitaru flow executions share one quota). Start on the open-source SDK; upgrade when you need the control plane.",
  primaryCta: { label: "See pricing", href: "/pricing" },
  secondaryCta: { label: "Compare OSS vs Pro", href: "/open-source-vs-pro" },
} as const;

/* ---------------------------------------------------------------------- */
/* Final CTA                                                               */
/* ---------------------------------------------------------------------- */

export const HOMEPAGE_UNIFIED_FINAL_CTA = {
  headline: "Pick your workspace and start shipping.",
  body: "Open source for as long as you want. Managed when you're ready.",
  primaryCta: { label: "Get started", href: "/get-started" },
  secondaryCta: { label: "Book a demo", href: "/book-your-demo" },
} as const;

/* ---------------------------------------------------------------------- */
/* Section order — proposed layout                                         */
/*                                                                         */
/*   1. Hero                                                               */
/*   2. Two-workspace explainer  (NEW — Phase 9 differentiator)            */
/*   3. LogoCloud                (reused from current homepage)            */
/*   4. Why this approach        (3 value cards, Focus Lab USP)            */
/*   5. CustomerStories          (reused from current homepage)            */
/*   6. FeatureTabs OR a new     (reused; pivots tabs to ML + Agent        */
/*      "what you can build"      examples instead of pure ML examples)     */
/*   7. Pricing teaser           (NEW)                                     */
/*   8. ComplianceSection        (reused — SOC2/etc, enterprise signal)    */
/*   9. NewsletterSignup         (reused — Brevo)                          */
/*  10. FAQAccordion             (reused; some items need Kitaru variants) */
/*  11. Final CTA                                                          */
/*                                                                         */
/* Removed vs current homepage:                                            */
/*   - NewsSection (low-signal; ships in /blog)                            */
/*   - WhitepaperCTA (replaced by pricing teaser)                          */
/*   - IntegrationsMarquee (moved to /product/zenml where it belongs)      */
/*                                                                         */
/* The current homepage Hero + ValueProps copy gets archived into          */
/* /product/zenml (or its components do, replacing the current             */
/* baseline). Nothing breaks during the swap because /product/zenml        */
/* already exists.                                                         */
/* ---------------------------------------------------------------------- */
