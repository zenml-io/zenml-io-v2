/**
 * Get Started page data — centralized marketing copy.
 *
 * Used by src/pages/get-started.astro.
 *
 * The page has two tabs (ZenML / Kitaru) under one /get-started URL with
 * surface="unified". GET_STARTED_HERO + GET_STARTED_FINAL_CTA + GET_STARTED_SEO
 * are shared across both tabs. GET_STARTED_ZENML and GET_STARTED_KITARU
 * hold the per-tab content.
 *
 * ZenML copy was extracted from the original Webflow snapshot + SEO baseline.
 * Kitaru code snippets follow the public docs at https://docs.zenml.io/kitaru
 * (decorators: @flow + @checkpoint; flows are invoked via `.run()`).
 */
import type { CtaLink } from "./marketingPageTypes";
import { KITARU_INSTALL_CMD } from "./productKitaru";

// ---------------------------------------------------------------------------
// SEO (one page, one URL)
// ---------------------------------------------------------------------------
export const GET_STARTED_SEO = {
  title: "Get Started with ZenML or Kitaru | ZenML",
  description:
    "Set up ZenML for ML and data pipelines, Kitaru for production agents — install, run locally, and bring both into the same workflow.",
  ogTitle: "Get Started with ZenML or Kitaru",
  ogDescription:
    "Set up ZenML for ML and data pipelines, Kitaru for production agents — install, run locally, and bring both into the same workflow.",
  ogImage: `https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/3ae53e01/64b9920cd04b7c4c0340ce50_og-img-0625.jpg`,
} as const;

// ---------------------------------------------------------------------------
// Shared hero (cross-product framing)
// ---------------------------------------------------------------------------
export const GET_STARTED_HERO = {
  eyebrow: "Open Source",
  headline: "Get started.",
  deck: "ZenML runs your ML and data pipelines. Kitaru keeps agents alive across crashes, waits, and retries. Plenty of teams run both.",
} as const;

// ---------------------------------------------------------------------------
// Tab definitions (id, label, subtitle, brand dot)
// ---------------------------------------------------------------------------
export interface GetStartedTab {
  id: "zenml" | "kitaru";
  label: string;
  subtitle: string;
  /** Tailwind background utility for the 8px brand dot inside the tab pill. */
  dotClass: string;
}

export const GET_STARTED_TABS: readonly GetStartedTab[] = [
  {
    id: "zenml",
    label: "ZenML",
    subtitle: "ML pipelines",
    dotClass: "bg-zenml-500",
  },
  {
    id: "kitaru",
    label: "Kitaru",
    subtitle: "Agent runtime",
    dotClass: "bg-orange-500",
  },
] as const;

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
        body: "Wire two steps into a training pipeline — ZenML tracks every input and output as a versioned artifact:",
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
    deck: "Everything you need to replicate a production-grade use case — demo, video, blog, and code.",
    cta: { label: "View All Projects", href: "/projects" },
  },
  resources: {
    eyebrow: "Resources",
    headline: "Your Complete ZenML Learning Toolkit",
    body: "Dive deeper into ZenML with comprehensive documentation, development tools, hands-on tutorials, and a thriving community of ML engineers ready to help you succeed.",
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
        body: "Join thousands of ML engineers sharing knowledge and best practices.",
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
// Kitaru tab
// ---------------------------------------------------------------------------
export const GET_STARTED_KITARU = {
  steps: {
    headline: "Pause for a human, survive a crash",
    items: [
      {
        title: "Install Kitaru",
        body: "Get Kitaru up and running in minutes. You just need to install it.",
        code: KITARU_INSTALL_CMD,
      },
      {
        title: "Add a human-in-the-loop gate",
        body: "Wrap an agent you already have, checkpoint the expensive calls, and <code>wait</code> for a human before anything ships:",
        code: `from kitaru import flow, wait
from kitaru_pydantic_ai import KitaruAgent
from pydantic_ai import Agent

# KitaruAgent turns PydanticAI model + tool calls into replayable checkpoints.
agent = KitaruAgent(Agent("openai:gpt-5-mini", system_prompt="You draft customer replies."))

@flow
def support_flow(ticket: str) -> str:
    reply = agent.run_sync(f"Draft a reply to: {ticket}").output
    approved = wait(schema=bool, question=f"Send this?\n\n{reply}")
    return reply if approved else "escalated to a human"

if __name__ == "__main__":
    print(support_flow.run("my invoice is wrong").wait())`,
      },
      {
        title: "Run it, walk away, resume it",
        body: "Run it. It pauses at the approval gate and releases compute. Answer hours later and it resumes from where it stopped — no idle container, no lost work.",
        code: "python flow.py",
      },
    ],
  },
  resources: {
    eyebrow: "Resources",
    headline: "Your Complete Kitaru Learning Toolkit",
    body: "Docs, examples, and a community building production agents — start where you are.",
    items: [
      {
        title: "Kitaru Docs",
        body: "Primitives, APIs, and recipes for building production agents.",
        href: "https://docs.zenml.io/kitaru",
        external: true,
        color: "orange",
      },
      {
        title: "GitHub Repo",
        body: "Star, file issues, and read the source on github.com/zenml-io/kitaru.",
        href: "https://github.com/zenml-io/kitaru",
        external: true,
        color: "gray",
      },
      {
        title: "From ZenML to Kitaru",
        body: "Why we built a separate runtime for agents — and what it does for you.",
        href: "/blog/from-zenml-to-kitaru",
        external: false,
        color: "purple",
      },
      {
        title: "Slack Community",
        body: "Join engineers shipping production agents — get help, share patterns.",
        href: "/slack",
        external: false,
        color: "blue",
      },
    ],
  },
} as const satisfies {
  steps: GetStartedSteps;
  resources: GetStartedResources;
};

// ---------------------------------------------------------------------------
// Shared final CTA (sits below the tab panels, applies to both products)
// ---------------------------------------------------------------------------
export const GET_STARTED_FINAL_CTA = {
  headline: "Ready for the next level?",
  body: "Run ML pipelines or agent flows on a managed control plane. RBAC, audit logs, and dedicated support.",
  primaryCta: {
    label: "Compare OSS vs Pro",
    href: "/open-source-vs-pro",
  } as CtaLink,
  secondaryCta: {
    label: "Read Docs",
    href: "/docs",
  } as CtaLink,
} as const;
