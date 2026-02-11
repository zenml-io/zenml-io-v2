/**
 * Case studies hub page copy.
 *
 * Centralizes marketing copy for the /case-studies hub page,
 * following the src/lib/homepage.ts and src/lib/features.ts pattern.
 */

export const CASE_STUDIES_HUB_HERO = {
  eyebrow: "Case Studies",
  headline: "Real Teams. Real AI Workflows",
  body: "See how teams are using ZenML to unify their AI platforms—from batch evaluations to real-time serving, traditional ML to GenAI workflows.",
  primaryCta: { label: "Book a Demo", href: "/book-your-demo" },
  secondaryCta: { label: "Use Open Source", href: "/get-started" },
} as const;

export const CASE_STUDIES_HUB_BANNER = {
  text: "ZenML tracks production AI deployments across the industry",
  supporting: "See the LLMOps database here",
  href: "/llmops-database",
} as const;

export const CASE_STUDIES_HUB_CTA = {
  headline: "Start deploying reproducible AI workflows today",
  body: "Enterprise-grade MLOps platform trusted by thousands of companies in production.",
  primaryCta: { label: "Book a Demo", href: "/book-your-demo" },
  secondaryCta: { label: "Use Open Source", href: "https://cloud.zenml.io" },
} as const;
