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

/** Which logo and palette a card carries. */
export type OgBrand = "labs" | "zenml" | "kitaru";

export type OgLayout = "panel" | "hero";

export type OgCard = {
  /** Route slug; also the R2 filename. */
  key: string;
  /** Section name in the chip above the artwork; rendered upper-case. */
  eyebrow: string;
  /** Logo and palette; ZenML Labs unless the page belongs to one product. */
  brand?: OgBrand;
  /**
   * `hero`: full-bleed artwork, the logo where the chip would be, and a
   * title whose lines are authored with `\n`. Panel-bottom otherwise.
   */
  layout?: OgLayout;
  /** Headline, fitted from 80px down to 56px by the generator. */
  title: string;
  /** Up to two lines at 44px; `\n` forces the break. */
  subtitle: string;
};

/**
 * The title is the page's H1 as shipped, the subtitle its meta description
 * trimmed to two 44px lines (about 75 characters each).
 */
export const OG_CARDS: readonly OgCard[] = [
  // The card baked into public/images/og-default.jpg, for every route with
  // no card of its own.
  {
    key: "default",
    eyebrow: "ZenML Labs",
    title: "ZenML Labs",
    subtitle: DEFAULT_DESCRIPTION,
  },

  // Product and homepage
  {
    key: "home",
    eyebrow: "ZenML Labs",
    layout: "hero",
    title: "Ship AI to production,\non infrastructure you own",
    subtitle:
      "ZenML orchestrates your pipelines and agents.\nKitaru replays them on production data before a change ships.\nBoth open source, always.",
  },
  {
    key: "product-zenml",
    eyebrow: "Product",
    brand: "zenml",
    title: "AI orchestration, on the infra you choose",
    subtitle:
      "Open-source AI orchestration: run training, inference, evals, and agents as reproducible pipelines",
  },

  // Hubs and indexes
  {
    key: "blog",
    eyebrow: "Blog",
    title: "Blog",
    subtitle:
      "Insights on MLOps, LLMOps, and production machine learning from the ZenML team",
  },
  {
    key: "features",
    eyebrow: "Features",
    brand: "zenml",
    title: "ZenML Features: Your MLOps Framework Solution",
    subtitle:
      "Orchestrate AI workflows with ZenML: end manual deployments and non-reproducible experiments",
  },
  {
    key: "integrations",
    eyebrow: "Integrations",
    brand: "zenml",
    title: "Explore the MLOps Landscape with ZenML",
    subtitle:
      "Browse 60+ integrations for orchestrators, experiment trackers, artifact stores, and more",
  },
  {
    key: "integration-type",
    eyebrow: "Integrations",
    brand: "zenml",
    title: "Integration Types",
    subtitle: "Browse all integration categories in the ZenML MLOps landscape",
  },
  {
    key: "compare",
    eyebrow: "Compare",
    title: "Pick the right tool for the job.",
    subtitle:
      "Side-by-side comparisons of ZenML (AI orchestration) and Kitaru (agent replay) against other tools",
  },
  {
    key: "team",
    eyebrow: "Team",
    title: "Our team",
    subtitle: "Meet the people behind ZenML",
  },
  {
    key: "case-studies",
    eyebrow: "Case studies",
    brand: "zenml",
    title: "Real Teams. Real AI Workflows",
    subtitle:
      "See how teams are using ZenML to unify their AI platforms, from batch evaluations to real-time serving",
  },
  {
    key: "projects",
    eyebrow: "Projects",
    brand: "zenml",
    title:
      "A home for machine learning projects built using ZenML and various integrations",
    subtitle:
      "A home for machine learning projects built using ZenML and various integrations",
  },
  {
    key: "llmops-database",
    eyebrow: "LLMOps Database",
    brand: "zenml",
    title: "LLMOps Database",
    subtitle:
      "Explore real-world LLMOps use cases, tools, and implementations, filterable by technology and industry",
  },
  {
    key: "mlops-database",
    eyebrow: "MLOps Database",
    brand: "zenml",
    title: "MLOps Database",
    subtitle:
      "Explore real-world MLOps case studies, platforms, and production ML systems, filterable by topic and industry",
  },

  // Taxonomy hubs, one card per family
  {
    key: "tags",
    eyebrow: "Blog",
    title: "Tags",
    subtitle: "Browse all tags used on the ZenML blog",
  },
  {
    key: "llmops-tags",
    eyebrow: "LLMOps Database",
    brand: "zenml",
    title: "Technologies",
    subtitle: "Browse all LLMOps tags used in the ZenML LLMOps Database",
  },
  {
    key: "mlops-tags",
    eyebrow: "MLOps Database",
    brand: "zenml",
    title: "MLOps topics",
    subtitle: "Browse all MLOps topic tags used in the ZenML MLOps Database",
  },
  {
    key: "industry-tags",
    eyebrow: "Industries",
    brand: "zenml",
    title: "Industries",
    subtitle:
      "Browse all industries represented in the ZenML LLMOps and MLOps databases",
  },
  {
    key: "category",
    eyebrow: "Blog",
    title: "Categories",
    subtitle: "Browse all categories used on the ZenML blog",
  },
  {
    key: "author",
    eyebrow: "Blog",
    title: "Authors",
    subtitle: "Browse all authors who have written for the ZenML blog",
  },

  // Standalone pages that used to point at the migrated card
  {
    key: "pricing",
    eyebrow: "Pricing",
    title: "Orchestrate AI workflows and ship agents with confidence",
    subtitle: "Predictable, transparent pricing that scales with value",
  },
  {
    key: "pro",
    eyebrow: "ZenML Pro",
    title: "A managed control plane for AI workflows and agents",
    subtitle:
      "Run your AI workflows and agent replays on a fully-managed control plane",
  },
  {
    key: "careers",
    eyebrow: "Careers",
    title: "Join our team",
    subtitle:
      "We are quickly growing and looking for motivated team members to grow our open-source base",
  },
  {
    key: "company",
    eyebrow: "Company",
    title: "Nothing Beats an Unbeatable Team",
    subtitle:
      "Meet the team behind ZenML, the open-source AI orchestration framework trusted by engineers worldwide",
  },
  {
    key: "get-started",
    eyebrow: "Get started",
    title: "Get started.",
    subtitle:
      "Install ZenML, run your first pipeline locally, then orchestrate on infrastructure you already use",
  },
  {
    key: "open-source-vs-pro",
    eyebrow: "ZenML Pro",
    brand: "zenml",
    title: "ZenML Open Source vs Pro",
    subtitle:
      "Transform your AI workflows from single-player experiments to multiplayer production systems",
  },
  {
    key: "deployments",
    eyebrow: "Deployments",
    brand: "zenml",
    title: "Flexible Deployment for Your AI Workflows",
    subtitle: "Run ZenML on our SaaS, in your cloud, or fully self-hosted",
  },

  // Content entries with no card of their own
  {
    key: "case-study-brevo",
    eyebrow: "Case study",
    brand: "zenml",
    title: "How Brevo accelerated model development by 80% using ZenML",
    subtitle: "ZenML case study",
  },
  {
    key: "project-banksubscription-predictor",
    eyebrow: "Project",
    brand: "zenml",
    title: "BankSubscription Predictor",
    subtitle: "ZenML project",
  },
  {
    key: "project-sign-language-detection-with-yolov5",
    eyebrow: "Project",
    brand: "zenml",
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
