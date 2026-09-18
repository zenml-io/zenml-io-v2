/**
 * Features hub page data — centralized marketing copy.
 * Used by src/pages/features/index.astro and src/pages/features/[slug].astro.
 * Follows the same pattern as src/lib/homepage.ts.
 */
import type { HighlightFigureId } from "../components/labs/highlights/ids";
import { FINAL_CTA } from "./homepage";
import type { LabsBandContent } from "./labs-home";

export const FEATURES_HUB_HERO = {
  headline: "ZenML Features: Your MLOps Framework Solution",
  body: "Tired of setting up new MLOps tools, doing manual deployments, or having non-reproducible experiments? Use ZenML MLOps Framework to transform your ML workflows into production-ready solutions.",
  primaryCta: {
    label: "Book a demo",
    href: "/book-your-demo",
  },
  secondaryCta: { label: "Read Docs", href: "/docs" },
};

export const FEATURES_HUB_CTA = {
  headline: "Start deploying reproducible AI workflows today",
  body: "Enterprise-grade MLOps platform trusted by thousands of companies in production.",
  primaryCta: {
    label: "Book a demo",
    href: "/book-your-demo",
  },
  secondaryCta: { label: "Read Docs", href: "/docs" },
};

/** Category display order for the hub grid */
export const CATEGORY_ORDER = [
  "Speed",
  "Scale",
  "Observability",
  "Flexibility",
  "Reusability",
  "Optimization",
  "Governance",
] as const;

export interface HubCard {
  category: string;
  title: string;
  summary: string;
  slug: string;
}

/** The 7 hub cards shown on /features — data from Webflow export */
export const HUB_CARDS: HubCard[] = [
  {
    category: "Speed",
    title: "Iterate at warp speed",
    summary:
      "Accelerate your ML workflow with seamless local-to-cloud transitions and smart caching.",
    slug: "iterate-at-warp-speed",
  },
  {
    category: "Scale",
    title: "Limitless scaling",
    summary:
      "Effortlessly deploy across clouds and infrastructures with unified resource management.",
    slug: "limitless-scaling",
  },
  {
    category: "Observability",
    title: "Auto-track everything",
    summary:
      "Automatic logging and versioning for truly reproducible ML workflows",
    slug: "auto-track-everything",
  },
  {
    category: "Flexibility",
    title: "Backend flexibility, zero lock-in",
    summary:
      "One framework for all your MLOps and LLMOps needs, with the flexibility to change as you grow.",
    slug: "backend-flexibility-zero-lock-in",
  },
  {
    category: "Reusability",
    title: "Shared ML building blocks",
    summary:
      "Boost team productivity with reusable components and standardized configurations.",
    slug: "shared-ml-building-blocks",
  },
  {
    category: "Optimization",
    title: "Streamline cloud expenses",
    summary:
      "Gain clarity on resource usage and costs across your entire ML infrastructure.",
    slug: "streamline-cloud-expenses",
  },
  {
    category: "Governance",
    title: "Security guardrails, always",
    summary:
      "Robust ML security with effortless implementation and management.",
    slug: "security-guardrails-always",
  },
];

/* ---------------------------------------------------------------------- */
/* Labs-shell additions (integrations + features cutover, #318)            */
/* ---------------------------------------------------------------------- */

/**
 * The features hub's closing band. The headline is FEATURES_HUB_CTA's own
 * sentence, split across the band's two lines; the deck and the pill are
 * that block's body and primary CTA unchanged.
 */
export const FEATURES_HUB_CLOSE: LabsBandContent = {
  headlineLines: ["Start deploying reproducible", "AI workflows today"],
  deck: FEATURES_HUB_CTA.body,
  cta: {
    ...FEATURES_HUB_CTA.primaryCta,
    analytics: "Features-Close-Book-Demo",
  },
};

/**
 * The feature detail's closing band: the homepage's FINAL_CTA headline split
 * across two lines, its bullets as the deck, its primary CTA as the pill.
 */
export const FEATURE_DETAIL_CLOSE: LabsBandContent = {
  headlineLines: ["Ship agents you can prove,", "and pipelines you can trust."],
  deck: FINAL_CTA.bullets.join(" · "),
  cta: { ...FINAL_CTA.primaryCta, analytics: "Feature-Close-Book-Demo" },
};

/**
 * Feature pages whose framed figure is a drawn highlight figure rather than
 * the page's `hero.image`. A slug with no entry keeps its image.
 */
export const FEATURE_HIGHLIGHT_FIGURES: Partial<
  Record<string, HighlightFigureId>
> = {
  "streamlined-pipeline-management": "zenml/orchestration",
  "auto-track-everything": "zenml/versioning",
  "backend-flexibility-zero-lock-in": "zenml/infrastructure",
  "iterate-at-warp-speed": "zenml/caching",
  "role-based-access-control-and-permissions": "zenml/governance",
};

/**
 * Fallbacks for a feature page's compliance block when it omits a field —
 * the strings the retired compliance banner carried as its own defaults.
 */
export const FEATURE_COMPLIANCE_DEFAULTS = {
  eyebrow: "ZenML is SOC2 and ISO 27001 Compliant",
  headline: "We Take Security Seriously",
  body: "ZenML is SOC2 and ISO 27001 compliant, validating our adherence to industry-leading standards for data security, availability, and confidentiality.",
};
