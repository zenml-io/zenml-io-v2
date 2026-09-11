/**
 * Copy for the generated page cards — the Open Graph cards that are not a
 * database entry and not a VS comparison.
 *
 * One entry per route family. `scripts/og/generate-default-og.ts --family=pages`
 * renders each one to `og/pages/<key>.jpg` on R2, and the page templates read
 * the URL back through `defaultOgUrl("pages", key)`.
 *
 * Keys are kebab-case route slugs and are part of the R2 key, so renaming one
 * orphans an uploaded card: add and re-upload rather than rename.
 */

import { DEFAULT_DESCRIPTION } from "./constants";

export type OgCard = {
  /** Route slug; also the R2 filename. */
  key: string;
  /** Headline, fitted from 114px down to 64px by the generator. */
  title: string;
  /** Up to two lines at 58px; `\n` forces the break. */
  subtitle: string;
};

/**
 * TODO-1B marks copy that still needs writing: the title is the page's H1 as
 * shipped, the subtitle its meta description trimmed to two 58px lines
 * (about 55 characters each).
 */
export const OG_CARDS: readonly OgCard[] = [
  // The card baked into public/images/og-default.jpg, for every route with
  // no card of its own.
  { key: "default", title: "ZenML Labs", subtitle: DEFAULT_DESCRIPTION },

  // Product and homepage
  {
    key: "home",
    title: "Ship AI to production, on infrastructure you own",
    subtitle:
      "ZenML Labs is the unified infrastructure layer for AI in production",
  },
  {
    key: "product-zenml",
    title: "AI orchestration, on the infra you choose",
    subtitle:
      "Open-source AI orchestration: run training, inference, evals, and agents as reproducible pipelines",
  },

  // Hubs and indexes
  {
    key: "blog",
    title: "Blog",
    subtitle:
      "Insights on MLOps, LLMOps, and production machine learning from the ZenML team",
  },
  {
    key: "features",
    title: "ZenML Features: Your MLOps Framework Solution",
    subtitle:
      "Orchestrate AI workflows with ZenML: end manual deployments and non-reproducible experiments",
  },
  {
    key: "integrations",
    title: "Explore the MLOps Landscape with ZenML",
    subtitle:
      "Browse 60+ integrations for orchestrators, experiment trackers, artifact stores, and more",
  },
  {
    key: "integration-type",
    title: "Integration Types",
    subtitle: "Browse all integration categories in the ZenML MLOps landscape",
  },
  {
    key: "compare",
    title: "Pick the right tool for the job.",
    subtitle:
      "Side-by-side comparisons of ZenML (AI orchestration) and Kitaru (agent replay) against other tools",
  },
  {
    key: "team",
    title: "Our team",
    subtitle: "Meet the people behind ZenML",
  },
  {
    key: "case-studies",
    title: "Real Teams. Real AI Workflows",
    subtitle:
      "See how teams are using ZenML to unify their AI platforms, from batch evaluations to real-time serving",
  },
  {
    key: "projects",
    title:
      "A home for machine learning projects built using ZenML and various integrations",
    subtitle:
      "A home for machine learning projects built using ZenML and various integrations",
  },
  {
    key: "llmops-database",
    title: "LLMOps Database",
    subtitle:
      "Explore real-world LLMOps use cases, tools, and implementations, filterable by technology and industry",
  },
  {
    key: "mlops-database",
    title: "MLOps Database",
    subtitle:
      "Explore real-world MLOps case studies, platforms, and production ML systems, filterable by topic and industry",
  },

  // Taxonomy hubs, one card per family
  {
    key: "tags",
    title: "Tags",
    subtitle: "Browse all tags used on the ZenML blog",
  },
  {
    key: "llmops-tags",
    title: "Technologies",
    subtitle: "Browse all LLMOps tags used in the ZenML LLMOps Database",
  },
  {
    key: "mlops-tags",
    title: "MLOps topics",
    subtitle: "Browse all MLOps topic tags used in the ZenML MLOps Database",
  },
  {
    key: "industry-tags",
    title: "Industries",
    subtitle:
      "Browse all industries represented in the ZenML LLMOps and MLOps databases",
  },
  {
    key: "category",
    title: "Categories",
    subtitle: "Browse all categories used on the ZenML blog",
  },
  {
    key: "author",
    title: "Authors",
    subtitle: "Browse all authors who have written for the ZenML blog",
  },

  // Standalone pages that used to point at the migrated card
  {
    key: "pricing",
    title: "Orchestrate AI workflows and ship agents with confidence",
    subtitle: "Predictable, transparent pricing that scales with value",
  },
  {
    key: "pro",
    title: "A managed control plane for AI workflows and agents",
    subtitle:
      "Run your AI workflows and agent replays on a fully-managed control plane",
  },
  {
    key: "careers",
    title: "Join our team",
    subtitle:
      "We are quickly growing and looking for motivated team members to grow our open-source base",
  },
  {
    key: "company",
    title: "Nothing Beats an Unbeatable Team",
    subtitle:
      "Meet the team behind ZenML, the open-source AI orchestration framework trusted by engineers worldwide",
  },
  {
    key: "get-started",
    title: "Get started.",
    subtitle:
      "Install ZenML, run your first pipeline locally, then orchestrate on infrastructure you already use",
  },
  {
    key: "open-source-vs-pro",
    title: "ZenML Open Source vs Pro",
    subtitle:
      "Transform your AI workflows from single-player experiments to multiplayer production systems",
  },
  {
    key: "deployments",
    title: "Flexible Deployment for Your AI Workflows",
    subtitle: "Run ZenML on our SaaS, in your cloud, or fully self-hosted",
  },

  // Content entries with no card of their own
  {
    key: "case-study-brevo",
    title: "How Brevo accelerated model development by 80% using ZenML",
    subtitle: "ZenML case study",
  },
  {
    key: "project-banksubscription-predictor",
    title: "BankSubscription Predictor",
    subtitle: "ZenML project",
  },
  {
    key: "project-sign-language-detection-with-yolov5",
    title: "Sign Language Detection with YOLOv5",
    subtitle: "ZenML project",
  },
];

const byKey = new Map(OG_CARDS.map((card) => [card.key, card]));

/** Look up a page card. Throws rather than shipping a page with no card. */
export function ogCard(key: string): OgCard {
  const card = byKey.get(key);
  if (!card)
    throw new Error(
      `Unknown OG card key: ${key}. Add it to OG_CARDS in src/lib/ogCards.ts.`,
    );
  return card;
}
