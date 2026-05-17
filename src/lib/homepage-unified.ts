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
 *   - Headline leans on Focus Lab's load-bearing differentiator:
 *     "single layer". That's the one phrase we can't drop.
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
  title: "ZenML — The single layer for ML and AI",
  description:
    "Open-source infrastructure for teams shipping ML pipelines and AI agents on their own stack. Modular, vendor-neutral, runs anywhere — always.",
  surface: "unified" satisfies Surface,
} as const;

/* ---------------------------------------------------------------------- */
/* Hero                                                                    */
/* ---------------------------------------------------------------------- */

export const HOMEPAGE_UNIFIED_HERO = {
  /** Two badges next to the hero — sub-product framing. */
  badges: [
    "One platform, two workspaces",
    "Open source · Apache 2.0",
  ],
  headlinePrefix: "The single layer for ",
  headlineAccent: "ML and AI",
  headlineSuffix: ".",
  /**
   * Lead phrase + body. Focus Lab's USP language transposed into hero
   * copy. Keep it specific to "your stack" so the message lands for
   * the buyer who's worried about vendor lock-in.
   */
  subtitleLead: "Built for engineers, ready for enterprise.",
  subtitle:
    "ZenML is open source infrastructure for production ML/AI. Orchestrate training pipelines and durable AI agents on the tools, clouds, and environments you already use — without rewriting your stack.",
  primaryCta: { label: "Start free trial", href: "https://cloud.zenml.io/signup" },
  secondaryCta: { label: "View on GitHub", href: "https://github.com/zenml-io/zenml", external: true },
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
  note: "Same plans, same control plane, different SDKs and UI. Pro plans include both.",
} as const;

/* ---------------------------------------------------------------------- */
/* Why this approach (Focus Lab value prop, broken into three cards)       */
/* ---------------------------------------------------------------------- */

export const HOMEPAGE_UNIFIED_VALUES = {
  eyebrow: "Why teams pick ZenML",
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
