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
/* Workspace widget — ElevenLabs-pattern tabbed demo                       */
/*   ZenML tab shows reproducible ML pipelines; Kitaru tab shows durable   */
/*   agent flows. The widget is the centerpiece of the unified `/`.        */
/* ---------------------------------------------------------------------- */

export const HOMEPAGE_UNIFIED_WIDGET = {
  tabs: [
    {
      id: "zenml" as const,
      /** Workload-first label so newcomers grok the tab in one glance. */
      label: "ML",
      /** Quiet brand chip rendered next to the label inside the same pill. */
      sublabel: "ZenML",
      /** Big right-aligned title above the panes. */
      surfaceTitle: "Pipelines",
      surfaceSubtitle:
        "Reproducible ML from your laptop to production — runs anywhere",
      /**
       * Left pane — list of pipelines. First row is the selected one.
       * Names sourced from real ZenML content in this repo:
       *   - breast_cancer_classifier → canonical ZenML quickstart
       *   - fraud_detection         → src/content/case-studies/adeo-leroy-merlin.md
       *   - recommendation_system   → src/content/case-studies/brevo.md
       *   - fashion_mnist_trainer   → SageMaker + BentoML blog
       *   - llm_fine_tuning         → ZenML fine-tuning blog series
       * Badges = real ZenML orchestrator integrations (src/content/integrations/).
       */
      rows: [
        {
          name: "breast_cancer_classifier",
          meta: "v32 · 4 steps · 2m 51s · ✓ completed",
          badge: null,
          selected: true,
        },
        {
          name: "fraud_detection",
          meta: "v18 · 12 steps · 11m 04s",
          badge: "Kubeflow",
        },
        {
          name: "recommendation_system",
          meta: "v44 · 9 steps · 47m 21s",
          badge: "Vertex AI",
        },
        {
          name: "fashion_mnist_trainer",
          meta: "v07 · 6 steps · 4m 18s",
          badge: "SageMaker",
        },
        {
          name: "llm_fine_tuning",
          meta: "v03 · 14 steps · 3h 12m",
          badge: "Airflow",
        },
      ],
      listFooter: "Explore 200+ pipelines",
      /** Right pane — the selected definition. Modelled on ZenML integration docs. */
      codeTitle: "Pipeline definition",
      codeFile: "breast_cancer_classifier.py",
      code: [
        "import pandas as pd",
        "from zenml import pipeline, step",
        "from sklearn.ensemble import RandomForestClassifier",
        "",
        "@step",
        "def load_data() -> pd.DataFrame:",
        "    return pd.read_csv(\"data/breast_cancer.csv\")",
        "",
        "@step(enable_cache=True)",
        "def train(df: pd.DataFrame) -> RandomForestClassifier:",
        "    return RandomForestClassifier().fit(df.drop(\"y\", axis=1), df.y)",
        "",
        "@pipeline",
        "def breast_cancer_classifier():",
        "    train(load_data())",
      ].join("\n"),
      footerMeta: "Stack: kubernetes-prod · 4 steps · 1 cached · 2m 51s",
      /** Bottom row — context-specific feature subtabs. */
      subtabs: ["Pipelines", "Artifacts", "Stacks", "Models", "Integrations"],
    },
    {
      id: "kitaru" as const,
      label: "Agents",
      sublabel: "Kitaru",
      surfaceTitle: "Flows",
      surfaceSubtitle:
        "Durable execution for long-running Python agents — resumes anywhere",
      /**
       * Flow names + code sample sourced from canonical Kitaru content:
       *   - report_agent     → src/components/kitaru/CodeShowcase.astro (blessed)
       *   - writing_agent    → src/content/blog/kitaru-launch.md
       *   - coding_agent     → src/components/kitaru/Architecture.astro
       *   - research_flow    → src/components/kitaru/OneImport.astro
       *   - claims_triage    → durability-realistic
       * Badges = deployment targets from src/components/kitaru/Deploy.astro.
       */
      rows: [
        {
          name: "report_agent",
          meta: "v22 · 6 checkpoints · 38m 12s · ✓ resumed",
          badge: null,
          selected: true,
        },
        {
          name: "writing_agent",
          meta: "v07 · 4 checkpoints · 11m 19s",
          badge: "Kubernetes",
        },
        {
          name: "coding_agent",
          meta: "v45 · 9 checkpoints · 47m 02s",
          badge: "Vertex AI",
        },
        {
          name: "research_flow",
          meta: "v09 · 3 checkpoints · 6m 51s",
          badge: "SageMaker",
        },
        {
          name: "claims_triage",
          meta: "v03 · 5 checkpoints · 2m 18s",
          badge: "Azure ML",
        },
      ],
      listFooter: "Explore 40+ flows",
      codeTitle: "Flow definition",
      codeFile: "report_agent.py",
      code: [
        "import kitaru",
        "from kitaru import flow, checkpoint",
        "",
        "@checkpoint",
        "def research(topic: str) -> dict:",
        "    return run_agent_search(topic)",
        "",
        "@checkpoint(runtime=\"isolated\")",
        "def write_draft(context: str) -> str:",
        "    return kitaru.llm(\"Draft a report on: \" + context, model=\"gpt-4o\")",
        "",
        "@flow",
        "def report_agent(topic: str) -> str:",
        "    data = research(topic)",
        "    draft = write_draft(str(data))",
        "    if kitaru.wait(schema=bool, question=\"Publish?\"):",
        "        publish(draft)",
        "    return draft",
      ].join("\n"),
      footerMeta: "Runtime: kubernetes · 6 checkpoints · 38m 12s · resumed twice",
      subtabs: ["Flows", "Checkpoints", "Replay", "Deployments", "Integrations"],
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
