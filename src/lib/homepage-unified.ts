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
import { productSignupCtas } from "./productCtas";
import { KITARU_CLOUD_PRICE, KITARU_INSTALL_CMD } from "./productKitaru";
import { PRODUCT_ZENML_HERO } from "./productZenml";

export const HOMEPAGE_UNIFIED_SEO = {
  title: "ZenML: Ship AI you can trust",
  description:
    "ZenML orchestrates your pipelines and agents on your own infrastructure. Kitaru replays your agents so regressions never ship.",
  surface: "unified" satisfies Surface,
} as const;

/* ---------------------------------------------------------------------- */
/* Hero                                                                    */
/* ---------------------------------------------------------------------- */

/** One signup button per product, labelled by what you do there. */
const HERO_PRODUCT_CTAS = productSignupCtas(
  { zenml: "Orchestrate AI", kitaru: "Diagnose agents" },
  "Home-Hero-Signup",
);

/**
 * One install line per product, shown under the hero buttons. The command
 * is the lowest-friction door into each product; the buttons above it are
 * the hosted-signup door.
 */
export const HOMEPAGE_INSTALL_COMMANDS = [
  { brand: "zenml", label: "ZenML", cmd: PRODUCT_ZENML_HERO.installCmd },
  { brand: "kitaru", label: "Kitaru", cmd: KITARU_INSTALL_CMD },
] as const;

export const HOMEPAGE_UNIFIED_HERO = {
  headlinePrefix: "Ship AI you can ",
  headlineAccent: "trust",
  headlineSuffix: ".",
  /**
   * Lead phrase + body. Focus Lab's USP language transposed into hero
   * copy. Keep it specific to "your stack" so the message lands for
   * the buyer who's worried about vendor lock-in.
   *
   * Notion feedback (item 1): subtitle shortened to the single crisp sentence.
   */
  subtitleLead: "Built for engineers, ready for enterprise.",
  subtitle:
    "ZenML orchestrates your pipelines and agents on your own infrastructure. Kitaru replays your agents so regressions never ship.",
  productCtas: HERO_PRODUCT_CTAS,
} as const;

/* ---------------------------------------------------------------------- */
/* Announcement banner (Variant C — dark band above the nav)               */
/*   Thin ink band, Kitaru-amber NEW eyebrow, single line of body copy,    */
/*   underlined "Read the docs →" link. Lives only on the unified `/`      */
/*   surface; the site-wide AnnouncementBanner is unchanged.               */
/* ---------------------------------------------------------------------- */

export const HOMEPAGE_UNIFIED_ANNOUNCEMENT = {
  eyebrow: "NEW",
  body: "Kitaru: turn agent failures into regression tests. Replay real traces against your real code.",
  linkText: "Meet Kitaru",
  linkHref: "/product/kitaru",
} as const;

/* ---------------------------------------------------------------------- */
/* Workspace widget — TwoWorkspaces v2 tabbed product demo                 */
/*   ZenML tab shows AI workflow orchestration; Kitaru tab shows replay-   */
/*   based agent evals. The widget is the centerpiece of the unified `/`.  */
/* ---------------------------------------------------------------------- */

/**
 * `HOMEPAGE_UNIFIED_WIDGET` is the thin nav structure for the TwoWorkspaces
 * widget: two tabs (ZenML / Kitaru), five subtabs each. The shell
 * (`TwoWorkspaces.astro`) reads only `id`, `label`, `layout`, and
 * `surfaceSubtitle` (the quiet caption under the widget).
 *
 * Each subtab's `layout` selects a bespoke layout component:
 *   zenml  → pipelines · stacks · artifacts-models · frameworks-ml · resources
 *   kitaru → compare · sessions · cohorts · experiments · frameworks-agents
 *
 * Pipelines and Sessions are the two v2 reference ports — they still receive
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
  // Kitaru first — the first tab is the widget's default view.
  tabs: [
    {
      id: "kitaru" as const,
      label: "Kitaru",
      sublabel: "",
      subtabs: [
        {
          id: "compare" as const,
          label: "Compare",
          layout: "compare" as const,
          surfaceTitle: "Compare",
          surfaceSubtitle:
            "Same cohort, one model swapped. The answer is two runs, compared.",
        },
        {
          id: "sessions" as const,
          label: "Sessions",
          layout: "sessions" as const,
          surfaceTitle: "Sessions",
          surfaceSubtitle:
            "Each run records as a session, imported from your traces or captured live.",
          /** Left-pane (SESSIONS list) header copy. Rows + import transcripts
           *  + spines come from src/lib/two-workspaces/sessions-examples.ts. */
          title: "Sessions",
          subheader: "graded at import",
          countLabel: "1,824 total",
          rightEyebrow: "One wrap, every call recorded",
          rightSubhead:
            "Each run records as a session, and that recording is what replay reads back.",
        },
        {
          id: "cohorts" as const,
          label: "Cohorts",
          layout: "cohorts" as const,
          surfaceTitle: "Cohorts",
          surfaceSubtitle:
            "The sessions that matter, frozen as a named, immutable set, so results keep meaning what they meant.",
        },
        {
          id: "experiments" as const,
          label: "Experiments",
          layout: "experiments" as const,
          surfaceTitle: "Experiments",
          surfaceSubtitle:
            "Pure configuration: model, prompt, tool policy. Swap one and you have stated a new hypothesis.",
        },
        {
          id: "frameworks" as const,
          label: "Frameworks",
          layout: "frameworks-agents" as const,
          surfaceTitle: "Frameworks",
          surfaceSubtitle:
            "Keep your agent SDK. One wrapper makes its runs replayable.",
        },
      ],
    },
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
            "Orchestrate any AI workflow, from training and batch inference to evals, on your own stack.",
          /** Left pane header */
          title: "Recent runs",
          subheader: "Last 24h · 5 runs",
          countLabel: "200 total",
          /** Right-pane header strip — tab-level copy (not per-example) */
          rightEyebrow: "Orchestrate on your stack",
          rightSubhead: "For compute-heavy, distributed AI workloads.",
          /** Per-example payload lives in two-workspaces/pipelines-examples.ts */
          examplesRef: "pipelines-examples" as const,
        },
        {
          id: "stacks" as const,
          label: "Stacks",
          layout: "stacks" as const,
          surfaceTitle: "Stacks",
          surfaceSubtitle:
            "Swap orchestrator, store, tracker. Same pipeline code.",
        },
        {
          id: "artifacts" as const,
          label: "Artifacts & Models",
          layout: "artifacts-models" as const,
          surfaceTitle: "Artifacts & Models",
          surfaceSubtitle:
            "Every artifact and model from every run: versioned, typed, traceable.",
        },
        {
          id: "frameworks" as const,
          label: "Frameworks",
          layout: "frameworks-ml" as const,
          surfaceTitle: "Frameworks",
          surfaceSubtitle:
            "Bring your own ML framework. ZenML wraps it, so you don't change your training loop.",
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
  // Kitaru first.
  items: [
    {
      name: "Kitaru workspace",
      tagline: "Agent replay",
      body: "Your agent's real traces become frozen, replayable worlds. Evaluate what happened, replay your real code with one thing changed, and keep every fix as a regression test.",
      bullets: [
        "Import traces from anywhere, or record natively",
        "Replay them against your next change and see what would have broken",
        "Keep what caught the failure as a permanent regression test",
      ],
      cta: { label: "Explore Kitaru", href: "/product/kitaru" },
    },
    {
      name: "ZenML workspace",
      tagline: "AI orchestration",
      body: "Orchestrate training, evaluation, batch inference, and agent workflows as reproducible pipelines. Typed step interfaces, versioned artifacts, and a composable stack abstraction.",
      bullets: [
        "Runs on Kubernetes, Vertex, SageMaker, AzureML, Airflow",
        "Artifact store + model registry + experiment tracker",
        "Local-to-remote without code changes",
      ],
      cta: { label: "Explore ZenML", href: "/product/zenml" },
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
  headline:
    "Own your infrastructure. Build it the way you want. Keep pace as you evolve.",
  items: [
    {
      name: "Your stack, your data",
      body: "Run in your VPC, point at your object store, train on your clusters. Metadata is the only thing ZenML touches. Your artifacts, prompts, and code stay inside your infrastructure end-to-end.",
    },
    {
      name: "Modular, not monolithic",
      body: "Swap any component in your stack, from orchestrator and artifact store to experiment tracker and model registry, without rewriting your pipelines or flows. Build with the tools you already trust.",
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
  body: `One subscription, two workspaces. Kitaru launches as a single flat ${KITARU_CLOUD_PRICE}/month plan; ZenML's managed tiers scale with pipeline executions. Start on the open-source SDKs; upgrade when you need the control plane.`,
  primaryCta: { label: "See pricing", href: "/pricing" },
  secondaryCta: { label: "Compare OSS vs Pro", href: "/open-source-vs-pro" },
} as const;

/* ---------------------------------------------------------------------- */
/* Final CTA                                                               */
/* ---------------------------------------------------------------------- */

export const HOMEPAGE_UNIFIED_FINAL_CTA = {
  headline: "Pick your workspace and start shipping.",
  body: "Open source at the core, with a managed control plane when you need it.",
  primaryCta: { label: "Book a demo", href: "/book-your-demo" },
  secondaryCta: { label: "Read Docs", href: "/docs" },
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
