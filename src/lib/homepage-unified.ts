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

/**
 * Each subtab declares its `layout` (list-code | cards-grid | timeline) plus
 * the data fields that layout consumes. Three reusable layouts cover the
 * 10 subtab views so we get variety without writing 10 bespoke templates.
 *
 * - list-code  → Pipelines, Flows. The original "definition + recent runs"
 *                view. Selected row gets a play button (execution affordance).
 * - cards-grid → Artifacts, Models, Integrations × 2, Deployments. A 5-card
 *                grid showing items with type glyphs and small status tags.
 * - timeline   → Stacks, Checkpoints, Replay. Vertical step view — natural
 *                for "layered composition" (Stacks) and "execution trace"
 *                (Checkpoints, Replay).
 *
 * Real data sources:
 *   - ZenML rows/code: src/content/integrations/, src/content/case-studies/,
 *     src/content/blog/, official ZenML quickstart conventions
 *   - Kitaru rows/code: src/components/kitaru/CodeShowcase.astro (canonical),
 *     Architecture.astro, OneImport.astro, Deploy.astro, blog/kitaru-launch.md
 */
export const HOMEPAGE_UNIFIED_WIDGET = {
  tabs: [
    {
      id: "zenml" as const,
      label: "ML",
      sublabel: "ZenML",
      subtabs: [
        {
          id: "pipelines" as const,
          label: "Pipelines",
          layout: "list-code" as const,
          surfaceTitle: "Pipelines",
          surfaceSubtitle:
            "Reproducible ML from your laptop to production — runs anywhere",
          listFooter: "Explore 200+ pipelines",
          rows: [
            {
              name: "breast_cancer_classifier",
              meta: "v32 · 4 steps · 2m 51s · ✓ completed",
              badge: null,
              selected: true,
            },
            { name: "fraud_detection", meta: "v18 · 12 steps · 11m 04s", badge: "Kubeflow" },
            { name: "recommendation_system", meta: "v44 · 9 steps · 47m 21s", badge: "Vertex AI" },
            { name: "fashion_mnist_trainer", meta: "v07 · 6 steps · 4m 18s", badge: "SageMaker" },
            { name: "llm_fine_tuning", meta: "v03 · 14 steps · 3h 12m", badge: "Airflow" },
          ],
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
        },
        {
          id: "artifacts" as const,
          label: "Artifacts",
          layout: "cards-grid" as const,
          surfaceTitle: "Artifacts",
          surfaceSubtitle: "Versioned data, models, and metrics from every run",
          listFooter: "Browse all artifacts",
          cards: [
            { glyph: "M", glyphTone: "brand" as const, tag: "MODEL", name: "breast_cancer_model", meta: "v32 · 148 MB · 4h ago", selected: true },
            { glyph: "D", glyphTone: "neutral" as const, tag: "DATASET", name: "preprocessed_data", meta: "v31 · 892 MB · 8h ago" },
            { glyph: "📊", glyphTone: "neutral" as const, tag: "METRIC", name: "evaluation_metrics", meta: "v30 · 84 KB · 12h ago" },
            { glyph: "E", glyphTone: "neutral" as const, tag: "EMBED", name: "embedding_vectors", meta: "v29 · 3.2 GB · 1d ago" },
            { glyph: "D", glyphTone: "neutral" as const, tag: "DATASET", name: "training_dataset", meta: "v28 · 1.4 GB · 2d ago" },
          ],
          footerMeta: "Artifact store: s3://zenml-prod · 5.7 GB · 32 versions",
        },
        {
          id: "stacks" as const,
          label: "Stacks",
          layout: "timeline" as const,
          surfaceTitle: "Stacks",
          surfaceSubtitle: "Compose orchestrator, store, tracker, and registry — swap any layer",
          listFooter: "5 stacks registered",
          /** Steps = layers of the active stack, top-to-bottom. */
          steps: [
            { status: "done" as const, name: "Orchestrator", detail: "Kubeflow · kubernetes-prod cluster", meta: "active" },
            { status: "done" as const, name: "Artifact store", detail: "S3 · s3://zenml-prod/artifacts", meta: "5.7 GB" },
            { status: "done" as const, name: "Experiment tracker", detail: "MLflow · mlflow.internal.zenml.io", meta: "linked" },
            { status: "done" as const, name: "Model registry", detail: "MLflow · 5 registered models", meta: "linked" },
            { status: "pending" as const, name: "Alerter", detail: "Slack — not configured", meta: "optional" },
          ],
          footerMeta: "Active: kubernetes-prod · 4 of 5 components configured",
        },
        {
          id: "models" as const,
          label: "Models",
          layout: "cards-grid" as const,
          surfaceTitle: "Models",
          surfaceSubtitle: "Promote, version, and track every model through prod",
          listFooter: "Open model registry",
          cards: [
            { glyph: "●", glyphTone: "success" as const, tag: "PROD", name: "fraud_classifier", meta: "v07 · 2.1M params", selected: true },
            { glyph: "●", glyphTone: "success" as const, tag: "PROD", name: "sentiment_analyzer", meta: "v05 · 184M params" },
            { glyph: "◐", glyphTone: "warning" as const, tag: "STAGE", name: "image_classifier", meta: "v04 · 185M params" },
            { glyph: "○", glyphTone: "neutral" as const, tag: "DEV", name: "nlp_tokenizer", meta: "v01 · 847 KB" },
            { glyph: "□", glyphTone: "muted" as const, tag: "ARCH", name: "recommendation_engine", meta: "v03 · archived" },
          ],
          footerMeta: "Registry: 5 models · last promoted 3h ago",
        },
        {
          id: "integrations" as const,
          label: "Integrations",
          layout: "cards-grid" as const,
          surfaceTitle: "Integrations",
          surfaceSubtitle: "Plug in any orchestrator, store, tracker, or alerter — 40+ supported",
          listFooter: "Browse 40+ integrations",
          cards: [
            { glyph: "G", glyphTone: "brand" as const, tag: "INSTALLED", name: "gcp", meta: "Vertex orchestrator · GCS store", selected: true },
            { glyph: "A", glyphTone: "neutral" as const, tag: "INSTALLED", name: "aws", meta: "SageMaker · S3 · Bedrock" },
            { glyph: "M", glyphTone: "neutral" as const, tag: "INSTALLED", name: "mlflow", meta: "Experiment tracker · Model registry" },
            { glyph: "S", glyphTone: "neutral" as const, tag: "INSTALLED", name: "slack", meta: "Alerter · human-in-the-loop" },
            { glyph: "E", glyphTone: "neutral" as const, tag: "INSTALLED", name: "evidently", meta: "Data + model validator" },
          ],
          footerMeta: "5 of 40+ installed · last updated 1 week ago",
        },
      ],
    },
    {
      id: "kitaru" as const,
      label: "Agents",
      sublabel: "Kitaru",
      subtabs: [
        {
          id: "flows" as const,
          label: "Flows",
          layout: "list-code" as const,
          surfaceTitle: "Flows",
          surfaceSubtitle:
            "Durable execution for long-running Python agents — resumes anywhere",
          listFooter: "Explore 40+ flows",
          rows: [
            {
              name: "report_agent",
              meta: "v22 · 6 checkpoints · 38m 12s · ✓ resumed",
              badge: null,
              selected: true,
            },
            { name: "writing_agent", meta: "v07 · 4 checkpoints · 11m 19s", badge: "Kubernetes" },
            { name: "coding_agent", meta: "v45 · 9 checkpoints · 47m 02s", badge: "Vertex AI" },
            { name: "research_flow", meta: "v09 · 3 checkpoints · 6m 51s", badge: "SageMaker" },
            { name: "claims_triage", meta: "v03 · 5 checkpoints · 2m 18s", badge: "Azure ML" },
          ],
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
        },
        {
          id: "checkpoints" as const,
          label: "Checkpoints",
          layout: "timeline" as const,
          surfaceTitle: "Checkpoints",
          surfaceSubtitle: "Every checkpoint persists. Crash, resume, replay — no rework",
          listFooter: "View execution history",
          /** Steps = checkpoints inside one execution of report_agent (ex_8a2f). */
          steps: [
            { status: "done" as const, name: "research", detail: "sources: 12 articles · 4.2 KB", meta: "✓ 4h ago" },
            { status: "done" as const, name: "summarize", detail: "summary: 487 tokens · 1.2 KB", meta: "✓ 4h ago" },
            { status: "done" as const, name: "write_draft", detail: "draft: 1,847 tokens · 12 KB", meta: "✓ 4h ago" },
            { status: "active" as const, name: "approve_publish", detail: "kitaru.wait(schema=bool, question=\"Publish?\")", meta: "⏸ waiting" },
            { status: "pending" as const, name: "publish", detail: "post to Slack #digest", meta: "pending" },
          ],
          footerMeta: "ex_8a2f · 6 checkpoints · 38m 12s · resumed twice",
        },
        {
          id: "replay" as const,
          label: "Replay",
          layout: "timeline" as const,
          surfaceTitle: "Replay",
          surfaceSubtitle: "Resume any past run from the checkpoint it stopped at",
          listFooter: "View resumable runs",
          /** Steps = a failed flow being resumed checkpoint-by-checkpoint. */
          steps: [
            { status: "done" as const, name: "fetch_articles", detail: "loaded from cache · 47 articles", meta: "✓ replayed" },
            { status: "done" as const, name: "summarize", detail: "12 summaries · 4.8k tokens", meta: "✓ resumed" },
            { status: "done" as const, name: "write_draft", detail: "regenerated · 1,920 tokens", meta: "✓ resumed" },
            { status: "active" as const, name: "post_to_slack", detail: "rate-limited · backoff 30s", meta: "↻ retry 3 / 5" },
            { status: "pending" as const, name: "archive", detail: "persist final state to s3://kitaru-archive", meta: "pending" },
          ],
          footerMeta: "6 runs resumed this week · avg recovery 42s",
        },
        {
          id: "deployments" as const,
          label: "Deployments",
          layout: "cards-grid" as const,
          surfaceTitle: "Deployments",
          surfaceSubtitle: "Deploy your flows to any runtime — the same code, anywhere",
          listFooter: "Manage deployment targets",
          cards: [
            { glyph: "K", glyphTone: "brand" as const, tag: "ACTIVE", name: "kubernetes-prod", meta: "12 flows · 99.9% uptime", selected: true },
            { glyph: "V", glyphTone: "neutral" as const, tag: "ACTIVE", name: "vertex-ai", meta: "8 flows · autoscaling" },
            { glyph: "S", glyphTone: "neutral" as const, tag: "ACTIVE", name: "sagemaker", meta: "5 flows · p3.8xlarge" },
            { glyph: "A", glyphTone: "neutral" as const, tag: "ACTIVE", name: "azure-ml", meta: "3 flows · container-instances" },
            { glyph: "D", glyphTone: "muted" as const, tag: "LOCAL", name: "docker-local", meta: "2 flows · dev only" },
          ],
          footerMeta: "4 production targets · 28 flows deployed · last deploy 5m ago",
        },
        {
          id: "integrations" as const,
          label: "Integrations",
          layout: "cards-grid" as const,
          surfaceTitle: "Integrations",
          surfaceSubtitle: "Wire in LLMs, observability, alerts, code, and tickets — your stack",
          listFooter: "Configure integrations",
          cards: [
            { glyph: "A", glyphTone: "brand" as const, tag: "LLM", name: "anthropic", meta: "Claude Opus 4.7 · primary", selected: true },
            { glyph: "O", glyphTone: "neutral" as const, tag: "LLM", name: "openai", meta: "GPT-4o · fallback" },
            { glyph: "S", glyphTone: "neutral" as const, tag: "ALERT", name: "slack", meta: "#agent-alerts · approvals" },
            { glyph: "G", glyphTone: "neutral" as const, tag: "CODE", name: "github", meta: "zenml-io · 4 repos" },
            { glyph: "L", glyphTone: "neutral" as const, tag: "TICKETS", name: "linear", meta: "auto-triage bot · ENG team" },
          ],
          footerMeta: "5 services configured · anthropic active · last rotation 1d ago",
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
