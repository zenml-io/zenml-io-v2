/**
 * Category-level defaults for /compare/ pages.
 *
 * These values are used when a compare page's frontmatter doesn't specify
 * its own valueSections, strategyCtaHeadline, or finalCta. Content is sourced
 * from the /vs/ category pages (orchestrators, e2e-platforms, experiment-trackers)
 * which define the canonical marketing copy per category.
 *
 * Categories without a /vs/ page get generic defaults that work for any tool.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CompareValueSection {
  title: string;
  bullets: string[];
  image?: { url: string; alt?: string };
  imageSide: 'left' | 'right';
}

export interface CompareCategoryDefaults {
  /** 3 value proposition sections (layout08 two-column blocks) */
  valueSections: CompareValueSection[];
  /** Strategy CTA headline (mid-page purple band) */
  strategyCtaHeadline: string;
  /** Showdown section eyebrow */
  showdownEyebrow: string;
  /** Showdown section headline */
  showdownHeadline: string;
  /** Final CTA defaults */
  finalCta: {
    headline: string;
    bullets: string[];
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    image: { url: string; alt: string };
  };
}

// ---------------------------------------------------------------------------
// Shared assets
// ---------------------------------------------------------------------------

import { R2_WEBFLOW_BASE } from "./constants";
const R2 = R2_WEBFLOW_BASE;

const DASHBOARD_IMAGES = {
  localToProduction: {
    url: `${R2}/514b3df0/6526abf3a9418f8674b15b23_01_Local_to_production.webp`,
    alt: 'Dashboard mockup showing local-to-production workflow',
  },
  collaborationShowcase: {
    url: `${R2}/dc3f971a/65256919ea2f6ed1dc5661a7_03_Collaboration_Showcase.webp`,
    alt: 'Dashboard mockup showing collaboration features',
  },
  productionalizationShowcase: {
    url: `${R2}/8c0fce5c/6526ad04f45d52aff741b914_13_Productionalization_Showcase.webp`,
    alt: 'Dashboard mockup showing productionalization workflow',
  },
  vendorLockIn: {
    url: `${R2}/660dfe37/6526b353e6aebd4bab3f07f4_14_Vendor_Lock_in_Showcase.webp`,
    alt: 'Dashboard mockup showing vendor-neutral architecture',
  },
  integrationsShowcase: {
    url: `${R2}/b7d6eb47/6526ae31bf639b6c8874a597_05_Integrations_showcase.webp`,
    alt: 'Dashboard mockup showing integrations',
  },
  portabilityShowcase: {
    url: `${R2}/e46619e4/6526aaa2897996e16fe7dd9c_12_Portability_Showcase.webp`,
    alt: 'Dashboard mockup showing portability features',
  },
  dataVersioningShowcase: {
    url: `${R2}/e6f711a9/6526aff7c4fdd6c0d6c1ea26_10_Data_Versioning_and_Lineage_Showcase.webp`,
    alt: 'Dashboard mockup showing data versioning and lineage',
  },
  modelControlPlane: {
    url: `${R2}/339bb62b/66e9556fd34d2791885b0c5f_model_control_plane_01.png`,
    alt: 'Dashboard displaying ML models with versions, authors, and tags',
  },
} as const;

/** Shared final CTA used across all categories */
const SHARED_FINAL_CTA = {
  headline: 'Experience the ZenML Difference: Book Your Customized Demo',
  bullets: [
    "See ZenML's superior model orchestration in action",
    'Discover how ZenML offers more with your existing ML tools',
    'Find out why data security with ZenML outshines the rest',
  ],
  primaryCta: { label: 'Book a Demo', href: '/book-your-demo' },
  secondaryCta: { label: 'Use Open Source', href: '/get-started' },
  image: DASHBOARD_IMAGES.modelControlPlane,
};

// ---------------------------------------------------------------------------
// Per-category defaults (from /vs/ pages)
// ---------------------------------------------------------------------------

const ORCHESTRATORS: CompareCategoryDefaults = {
  valueSections: [
    {
      title: 'Start locally without complicated setup hassle',
      bullets: [
        'ZenML is available as a simple pip package that lets you run and track pipelines locally.',
        'ZenML integrates with your orchestration layer of choice, avoiding having to learn different paradigms for dev, staging, and prod.',
        'ZenML integrates with your orchestration layer of choice or can be extended with your own orchestration service.',
      ],
      image: DASHBOARD_IMAGES.localToProduction,
      imageSide: 'right',
    },
    {
      title: 'Abstract away infrastructure complexity',
      bullets: [
        'Most orchestrators assume some form of infrastructure knowledge to use them maximally — ZenML abstracts that complexity away.',
        'ZenML separates infrastructure setup like Docker building from the application logic, and automates the tedious parts.',
        'ZenML focuses on the handovers between MLOps Engineers, ML Engineers, and Data Scientists.',
      ],
      image: DASHBOARD_IMAGES.collaborationShowcase,
      imageSide: 'left',
    },
    {
      title: 'Switch between orchestrators depending on your context',
      bullets: [
        'You can switch between different orchestration services with a single click — from dev to staging to production.',
        'The more engineering-minded in the team still retain control over their productionalization because the framework is extensible.',
        'ZenML handles the pain of packaging your code into Docker to be deployed to your orchestration service of choice.',
      ],
      image: DASHBOARD_IMAGES.productionalizationShowcase,
      imageSide: 'right',
    },
  ],
  strategyCtaHeadline: 'Outperform Orchestrators: Book Your Free ZenML Strategy Talk',
  showdownEyebrow: 'Orchestrator Showdown',
  showdownHeadline: 'Explore the Advantages of ZenML Over Other Orchestrator Tools',
  finalCta: SHARED_FINAL_CTA,
};

const E2E_PLATFORMS: CompareCategoryDefaults = {
  valueSections: [
    {
      title: 'Run the same workloads on any cloud to gain strategic flexibility',
      bullets: [
        'ZenML does not tie your work to one cloud.',
        'Define infrastructure as stack components independent of your code.',
        'Run any code on any stack with minimum fuss.',
      ],
      image: DASHBOARD_IMAGES.vendorLockIn,
      imageSide: 'right',
    },
    {
      title: '50+ integrations with the most popular cloud and open-source tools',
      bullets: [
        'From experiment trackers like MLflow and Weights & Biases to model deployers like Seldon and BentoML, ZenML has integrations for tools across the lifecycle.',
        'Flexibly run workflows across all clouds or orchestration tools such as Airflow or Kubeflow.',
        'AWS, GCP, and Azure integrations all supported out of the box.',
      ],
      image: DASHBOARD_IMAGES.integrationsShowcase,
      imageSide: 'left',
    },
    {
      title: 'Avoid getting locked in to a vendor',
      bullets: [
        'Avoid tangling up code with tooling libraries that make it hard to transition.',
        'Easily set up multiple MLOps stacks for different teams with different requirements.',
        'Switch between tools and platforms seamlessly.',
      ],
      image: DASHBOARD_IMAGES.productionalizationShowcase,
      imageSide: 'right',
    },
  ],
  strategyCtaHeadline: 'Outperform E2E Platforms: Book Your Free ZenML Strategy Talk',
  showdownEyebrow: 'E2E Platform Showdown',
  showdownHeadline: 'Explore the Advantages of ZenML Over Other E2E Platform Tools',
  finalCta: SHARED_FINAL_CTA,
};

const EXPERIMENT_TRACKERS: CompareCategoryDefaults = {
  valueSections: [
    {
      title: 'Pipelines as experiments',
      bullets: [
        'ZenML is built on top of the idea of steps and pipelines, which play together nicely with experiment tracking tools.',
        'Experiment tracking tools like MLflow are good to track your training runs and hyperparameters while pipelines automate runs.',
        'ZenML is a management layer on top of your ML experiments, and manages their lifecycle within the context of a pipeline.',
      ],
      image: DASHBOARD_IMAGES.localToProduction,
      imageSide: 'right',
    },
    {
      title: 'Connect your experiment trackers with your infrastructure securely',
      bullets: [
        'ZenML connectors can be used to establish a secure connection to your production infrastructure with your experiment tracker.',
        'Keeps the complexity of authentication and authorization away from your code.',
        'ZenML establishes a link between your experiment trackers and your entire MLOps process.',
      ],
      image: DASHBOARD_IMAGES.portabilityShowcase,
      imageSide: 'left',
    },
    {
      title: 'Provide lineage and provenance for your experiments',
      bullets: [
        'Experiment trackers focus mostly on training — while MLOps stretches beyond that.',
        'ZenML provides an overview of the entire process from feature engineering, to training, to deployment, inference and beyond.',
        'ZenML can be paired nicely with experiment trackers to provide full reproducibility and auditability over multiple tracking tools.',
      ],
      image: DASHBOARD_IMAGES.dataVersioningShowcase,
      imageSide: 'right',
    },
  ],
  strategyCtaHeadline: 'Outperform Experiment Trackers: Book Your Free ZenML Strategy Talk',
  showdownEyebrow: 'Experiment Tracker Showdown',
  showdownHeadline: 'Explore the Advantages of ZenML Over Other Experiment Tracker Tools',
  finalCta: SHARED_FINAL_CTA,
};

/** Generic defaults for categories without a /vs/ page */
const GENERIC: CompareCategoryDefaults = {
  valueSections: [
    {
      title: 'Open-source and vendor-neutral',
      bullets: [
        'ZenML is fully open-source, giving you complete control over your ML infrastructure.',
        'Avoid platform lock-in — run the same pipelines across any cloud or on-prem environment.',
        'Benefit from a transparent, community-driven development process.',
      ],
      image: DASHBOARD_IMAGES.localToProduction,
      imageSide: 'right',
    },
    {
      title: 'Composable stack architecture',
      bullets: [
        'Choose your own orchestrator, experiment tracker, artifact store, and model deployer.',
        'Swap infrastructure components without rewriting pipeline code.',
        'Integrate new tools instantly as they emerge without waiting for vendor support.',
      ],
      image: DASHBOARD_IMAGES.integrationsShowcase,
      imageSide: 'left',
    },
    {
      title: 'Code-first, Python-native workflows',
      bullets: [
        'Define pipelines in pure Python with simple decorators — no YAML or DSL to learn.',
        'Start locally with pip install and scale to production on any cloud.',
        'Version control your entire ML workflow alongside your application code.',
      ],
      image: DASHBOARD_IMAGES.productionalizationShowcase,
      imageSide: 'right',
    },
  ],
  strategyCtaHeadline: 'Book Your Free ZenML Strategy Talk',
  showdownEyebrow: 'Tool Showdown',
  showdownHeadline: 'Explore the Advantages of ZenML Over Other Tools',
  finalCta: SHARED_FINAL_CTA,
};

// ---------------------------------------------------------------------------
// Category mapping
// ---------------------------------------------------------------------------

const CATEGORY_DEFAULTS: Record<string, CompareCategoryDefaults> = {
  orchestrators: ORCHESTRATORS,
  'e2e-platforms': E2E_PLATFORMS,
  'experiment-trackers': EXPERIMENT_TRACKERS,
};

/**
 * Get category defaults for a compare page.
 * Falls back to generic defaults for unknown categories.
 */
export function getCategoryDefaults(category: string | undefined): CompareCategoryDefaults {
  if (!category) return GENERIC;
  return CATEGORY_DEFAULTS[category] ?? GENERIC;
}

/**
 * Format a category slug as a human-readable label.
 * e.g. "e2e-platforms" → "E2E Platform", "orchestrators" → "Orchestrator"
 */
export function formatCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    orchestrators: 'Orchestrator',
    'e2e-platforms': 'E2E Platform',
    'experiment-trackers': 'Experiment Tracker',
    'llm-observability': 'LLM Observability',
    'genai-frameworks': 'GenAI Framework',
    'data-model-versioning': 'Data/Model Versioning',
    'model-serving': 'Model Serving',
    'data-annotators': 'Data Annotation',
    modeling: 'Modeling',
  };
  return labels[category] ?? category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/** ZenML icon URL on R2 (used in hero lockup and comparison headers) */
export const ZENML_ICON_URL = `${R2}/e2bdf58e/667037da03e4569db6e31135_zenml_icon.webp`;

/** ZenML icon (local, for code comparison white variant) */
export const ZENML_ICON_LOCAL = '/images/zenml-icon.webp';
