/**
 * Features hub page data — centralized marketing copy.
 * Used by src/pages/features/index.astro.
 * Follows the same pattern as src/lib/homepage.ts.
 */

export const FEATURES_HUB_HERO = {
  headline: "ZenML Features: Your MLOps Framework Solution",
  body: "Tired of setting up new MLOps tools, doing manual deployments, or having non-reproducible experiments? Use ZenML MLOps Framework to transform your ML workflows into production-ready solutions.",
  primaryCta: { label: "Book a demo", href: "/book-your-demo" },
  secondaryCta: { label: "Use Open Source", href: "/get-started" },
};

export const FEATURES_HUB_CTA = {
  headline: "Start deploying reproducible AI workflows today",
  body: "Enterprise-grade MLOps platform trusted by thousands of companies in production.",
  primaryCta: { label: "Book a Demo", href: "/book-your-demo" },
  secondaryCta: { label: "Use Open Source", href: "https://cloud.zenml.io" },
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
