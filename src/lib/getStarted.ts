/**
 * Get Started page data — centralized marketing copy.
 *
 * Used by src/pages/get-started.astro: the open-source quickstart for both
 * products, Kitaru first (traces and evals for an AI agent), then ZenML
 * (a first ML pipeline). The commands follow the docs quickstarts
 * (docs.zenml.io/kitaru/getting-started/quickstart and
 * docs.zenml.io/getting-started/installation); keep them in step with those.
 */
import { cloudSignupUrl } from "./constants";
import type { LabsBandContent } from "./labs-home";
import {
  KITARU_DOCS_URL,
  KITARU_INSTALL_CMD,
  KITARU_TRIAL_DAYS,
} from "./productKitaru";
import { defaultOgUrl } from "./seo";

// ---------------------------------------------------------------------------
// SEO (one page, one URL)
// ---------------------------------------------------------------------------
export const GET_STARTED_SEO = {
  title: "Get Started with Kitaru and ZenML Open Source",
  description:
    "Install Kitaru and import your agent's traces, or install ZenML and run your first ML pipeline. Both are open source, Apache 2.0, and run on your laptop.",
  ogTitle: "Get Started with Kitaru and ZenML",
  ogDescription:
    "Install Kitaru and import your agent's traces, or install ZenML and run your first ML pipeline. Open source, on your laptop.",
  ogImage: defaultOgUrl("pages", "get-started"),
} as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
export const GET_STARTED_HERO = {
  eyebrow: "Open source",
  headline: "Start open source",
  deck: "Kitaru and ZenML are free and Apache 2.0. Install them on your laptop and drive them from your coding agent. Move to Pro when you want them to run on their own.",
  jump: [
    {
      label: "Kitaru quickstart",
      href: "#kitaru",
      analytics: "GetStarted-Hero-Kitaru",
    },
    {
      label: "ZenML quickstart",
      href: "#zenml",
      analytics: "GetStarted-Hero-ZenML",
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Steps
// ---------------------------------------------------------------------------
export interface GetStartedStep {
  title: string;
  /** Body copy. May contain inline HTML (e.g. <code>...</code>). */
  body: string;
  code: string;
  lang: "bash" | "python";
}

export interface GetStartedTrack {
  id: "kitaru" | "zenml";
  eyebrow: string;
  headline: string;
  deck: string;
  steps: readonly GetStartedStep[];
  docs: { label: string; href: string; analytics: string };
}

export const GET_STARTED_KITARU: GetStartedTrack = {
  id: "kitaru",
  eyebrow: "Kitaru · AI agents",
  headline: "See what your agent's evals miss",
  deck: "Import the traces you already have, then ask your coding agent what it finds.",
  steps: [
    {
      title: "Install Kitaru",
      body: "One command installs Kitaru, logs you in locally and sets up your coding agent.",
      code: KITARU_INSTALL_CMD,
      lang: "bash",
    },
    {
      title: "Register your agent",
      body: "Tell Kitaru how to run your agent, so it can replay a fix later.",
      code: 'kitaru agent register support-agent --command "python support.py"',
      lang: "bash",
    },
    {
      title: "Import your traces",
      body: "Bring in an export from Langfuse, LangSmith, Braintrust and others. Then ask your coding agent what your evals miss.",
      code: `kitaru session import langfuse-export.jsonl \\
  --importer kitaru/langfuse@latest \\
  --agent support-agent@latest --wait`,
      lang: "bash",
    },
  ],
  docs: {
    label: "Kitaru quickstart",
    href: `${KITARU_DOCS_URL}/getting-started/quickstart`,
    analytics: "GetStarted-Kitaru-Docs",
  },
};

export const GET_STARTED_ZENML: GetStartedTrack = {
  id: "zenml",
  eyebrow: "ZenML · ML pipelines",
  headline: "Run your first ML pipeline",
  deck: "Write steps in plain Python. ZenML versions every input and output, then runs the same code on your cloud.",
  steps: [
    {
      title: "Install ZenML",
      body: "Python 3.10 to 3.14. The <code>server</code> extra adds the local dashboard.",
      code: "pip install 'zenml[server]'",
      lang: "bash",
    },
    {
      title: "Write a pipeline",
      body: "Two steps in a training pipeline. Every output is stored as a versioned artifact. Save it as <code>run.py</code>.",
      code: `from sklearn.base import ClassifierMixin
from sklearn.datasets import load_iris
from sklearn.svm import SVC
from zenml import pipeline, step


@step
def load_data() -> tuple[list, list]:
    X, y = load_iris(return_X_y=True)
    return X, y


@step
def train_model(X: list, y: list) -> ClassifierMixin:
    return SVC().fit(X, y)


@pipeline
def training_pipeline():
    X, y = load_data()
    train_model(X, y)


if __name__ == "__main__":
    training_pipeline()`,
      lang: "python",
    },
    {
      title: "Run it and open the dashboard",
      body: "The run, its steps and its artifacts show up in your local dashboard.",
      code: "python run.py && zenml login --local",
      lang: "bash",
    },
  ],
  docs: {
    label: "ZenML docs",
    href: "https://docs.zenml.io/getting-started/installation",
    analytics: "GetStarted-ZenML-Docs",
  },
};

// ---------------------------------------------------------------------------
// Resources
// ---------------------------------------------------------------------------
export interface GetStartedResource {
  title: string;
  body: string;
  href: string;
  external: boolean;
}

export const GET_STARTED_RESOURCES: {
  headline: string;
  items: readonly GetStartedResource[];
} = {
  headline: "Keep going",
  items: [
    {
      title: "Kitaru docs",
      body: "Importers, evaluators, cohorts and replay.",
      href: KITARU_DOCS_URL,
      external: true,
    },
    {
      title: "ZenML docs",
      body: "Pipelines, stacks, orchestrators and integrations.",
      href: "https://docs.zenml.io",
      external: true,
    },
    {
      title: "Example projects",
      body: "End-to-end ML projects with code you can run.",
      href: "/projects",
      external: false,
    },
    {
      title: "Slack community",
      body: "Ask the team and thousands of AI engineers.",
      href: "/slack",
      external: false,
    },
  ],
};

// ---------------------------------------------------------------------------
// Close
// ---------------------------------------------------------------------------
export const GET_STARTED_CLOSE: LabsBandContent = {
  headlineLines: ["Want it to run", "on its own?"],
  deck: `Pro adds an AI engineer that watches your agents and ML pipelines around the clock. ${KITARU_TRIAL_DAYS} days free, no credit card.`,
  cta: {
    label: "Start free",
    href: cloudSignupUrl("get-started"),
    analytics: "GetStarted-Close-Signup",
  },
};
