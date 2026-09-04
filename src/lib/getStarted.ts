/**
 * Get Started page data — centralized marketing copy.
 *
 * Used by src/pages/get-started.astro.
 *
 * ZenML open-source onboarding. Kitaru's onboarding lives on /product/kitaru;
 * this page only points there.
 *
 * ZenML copy was extracted from the original Webflow snapshot + SEO baseline.
 */
import type { CtaLink } from "./marketingPageTypes";

// ---------------------------------------------------------------------------
// SEO (one page, one URL)
// ---------------------------------------------------------------------------
export const GET_STARTED_SEO = {
  title: "Get Started with ZenML",
  description:
    "Install ZenML, run your first pipeline locally, and orchestrate AI workflows and agents on the infrastructure you already use.",
  ogTitle: "Get Started with ZenML",
  ogDescription:
    "Install ZenML, run your first pipeline locally, and orchestrate AI workflows and agents on the infrastructure you already use.",
  ogImage: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/3ae53e01/64b9920cd04b7c4c0340ce50_og-img-0625.jpg`,
} as const;

// ---------------------------------------------------------------------------
// Shared hero (cross-product framing)
// ---------------------------------------------------------------------------
export const GET_STARTED_HERO = {
  eyebrow: "Open Source",
  headline: "Get started.",
  deck: "Install ZenML, run a pipeline on your laptop, then point the same code at your own cloud. Open source, no lock-in.",
} as const;

// ---------------------------------------------------------------------------
// Shared types
// ---------------------------------------------------------------------------
export interface GetStartedStep {
  title: string;
  /** Body copy. May contain inline HTML (e.g. <code>...</code>). */
  body: string;
  code: string;
}

export interface GetStartedSteps {
  headline: string;
  items: readonly GetStartedStep[];
}

export interface GetStartedArchitecture {
  eyebrow: string;
  headline: string;
  body: string;
  image: { url: string; alt: string };
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
}

export interface GetStartedProjects {
  eyebrow: string;
  headline: string;
  deck: string;
  cta: CtaLink;
}

export type GetStartedResourceColor =
  | "teal"
  | "blue"
  | "purple"
  | "gray"
  | "orange";

export interface GetStartedResource {
  title: string;
  body: string;
  href: string;
  external: boolean;
  color: GetStartedResourceColor;
}

export interface GetStartedResources {
  eyebrow: string;
  headline: string;
  body: string;
  items: readonly GetStartedResource[];
}

// ---------------------------------------------------------------------------
// ZenML tab
// ---------------------------------------------------------------------------
export const GET_STARTED_ZENML = {
  steps: {
    headline: "Build your first pipeline",
    items: [
      {
        title: "Install ZenML",
        body: "Get ZenML up and running in minutes. You just need to install it",
        code: "pip install 'zenml[local]'",
      },
      {
        title: "Track inputs and outputs",
        body: "Wire two steps into a training pipeline. ZenML tracks every input and output as a versioned artifact:",
        code: `from sklearn.base import ClassifierMixin
from sklearn.datasets import load_iris
from sklearn.svm import SVC
from zenml import step, pipeline


@step
def load_data() -> tuple[list, list]:
    X, y = load_iris(return_X_y=True)
    return X, y


@step
def train_model(X: list, y: list) -> ClassifierMixin:
    # The returned model is versioned + tracked as an artifact automatically.
    return SVC().fit(X, y)


@pipeline
def training_pipeline():
    X, y = load_data()
    train_model(X, y)


if __name__ == "__main__":
    training_pipeline()`,
      },
      {
        title: "Run your pipeline locally",
        body: "Run it locally. The pipeline executes, artifacts are versioned, and the run shows up in your dashboard.",
        code: "python run.py",
      },
    ],
  },
  architecture: {
    eyebrow: "ZenML Architecture",
    headline: "Built on a Robust Client-Server Architecture",
    body: "ZenML is a metadata layer on top of your existing infrastructure, meaning all data and compute stays on your side.",
    image: {
      url: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/e19a8b4e/zenml-architecture.png`,
      alt: "ZenML system architecture diagram showing connections between five main components: ZenML Client (Development Environment), ZenML Server, Database, MLOps Infrastructure (Cloud, Kubernetes, on-prem), and MLOps Tools (Experiment tracker, model deployer)",
    },
    primaryCta: { label: "Learn More", href: "/deployments" },
    secondaryCta: { label: "Read Docs", href: "/docs" },
  },
  projects: {
    eyebrow: "Projects",
    headline: "Start with one of our ready-made projects",
    deck: "Everything you need to replicate a production-grade use case: demo, video, blog, and code.",
    cta: { label: "View All Projects", href: "/projects" },
  },
  resources: {
    eyebrow: "Resources",
    headline: "Your Complete ZenML Learning Toolkit",
    body: "Dive deeper into ZenML with comprehensive documentation, development tools, hands-on tutorials, and a thriving community of ML and AI engineers ready to help you succeed.",
    items: [
      {
        title: "Official Documentation",
        body: "Comprehensive guides, tutorials, and API reference to master ZenML",
        href: "https://docs.zenml.io",
        external: true,
        color: "teal",
      },
      {
        title: "VS Code Extension",
        body: "ZenML Studio enhances your ML workflow with support for pipelines, stacks, server management and DAG visualization.",
        href: "https://marketplace.visualstudio.com/items?itemName=ZenML.zenml-vscode",
        external: true,
        color: "blue",
      },
      {
        title: "Interactive Tutorial",
        body: "Master ZenML fundamentals through 10 guided pipeline examples with step-by-step tutorials and one-click execution!",
        href: "https://github.com/zenml-io/vscode-tutorial",
        external: true,
        color: "purple",
      },
      {
        title: "Slack Community",
        body: "Join thousands of ML and AI engineers sharing knowledge and best practices.",
        href: "/slack",
        external: false,
        color: "gray",
      },
    ],
  },
} as const satisfies {
  steps: GetStartedSteps;
  architecture: GetStartedArchitecture;
  projects: GetStartedProjects;
  resources: GetStartedResources;
};

// ---------------------------------------------------------------------------
// Shared final CTA (sits below the tab panels, applies to both products)
// ---------------------------------------------------------------------------
export const GET_STARTED_FINAL_CTA = {
  headline: "Ready for the next level?",
  body: "Run AI workflows or agent replays on a managed control plane. RBAC, audit logs, and dedicated support.",
  primaryCta: {
    label: "Compare OSS vs Pro",
    href: "/open-source-vs-pro",
  } as CtaLink,
  secondaryCta: {
    label: "Read Docs",
    href: "/docs",
  } as CtaLink,
} as const;
