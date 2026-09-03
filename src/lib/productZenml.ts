/**
 * Page copy for /product/zenml — the ZenML sub-product landing.
 *
 * Mirrors /product/kitaru in shape but pitches the AI orchestration workspace.
 * Baseline copy; iterate on tone/specifics before Phase 9's full
 * design pass (Zuri).
 */

export const ZENML_INSTALL_CMD = "pip install zenml";

/** Canonical ZenML-side links — counterpart to KITARU_LINKS in productKitaru.ts (separate cloud apps, Aug 2026). */
export const ZENML_LINKS = {
  signup: {
    label: "Sign up free",
    href: "https://cloud.zenml.io",
  },
  demo: { label: "Book a demo", href: "/book-your-demo" },
  github: {
    label: "Star on GitHub",
    href: "https://github.com/zenml-io/zenml",
    external: true,
  },
} as const;

export const PRODUCT_ZENML_SEO = {
  title: "ZenML: AI orchestration on your existing stack",
  description:
    "Open-source AI orchestration. Run training, batch inference, evals, and agent workflows as reproducible pipelines on Kubernetes, Vertex, SageMaker, and AzureML, without rewriting your code.",
} as const;

export const PRODUCT_ZENML_HERO = {
  badges: ["ZenML: AI orchestration", "Open source · Apache 2.0"],
  headline: "The AI orchestration layer that fits ",
  headlineAccent: "your stack",
  subtitleLead: "Bring your own tools.",
  subtitle:
    "Orchestrate any AI workflow, from training and batch inference to evals and agents, from your laptop to Kubernetes, Vertex, SageMaker, and AzureML. Reproducible artifacts, model registry, and a composable stack, without vendor lock-in.",
  installCmd: ZENML_INSTALL_CMD,
  // Signup-first for parity with the Kitaru landing.
  primaryCta: ZENML_LINKS.signup,
  secondaryCta: ZENML_LINKS.demo,
} as const;

export const PRODUCT_ZENML_BENEFITS = {
  eyebrow: "What ZenML gives you",
  items: [
    {
      name: "One pipeline, every orchestrator",
      body: "Write your pipeline once. Run it on Kubernetes, Vertex AI, SageMaker, AzureML, Airflow, or your laptop. The same DAG, with no code changes.",
    },
    {
      name: "Reproducibility, by default",
      body: "Every artifact is versioned and tracked. Every run is queryable. Re-execute any pipeline from any step. The artifact store handles the rest.",
    },
    {
      name: "Composable stack, not a monolith",
      body: "Pick your orchestrator, your artifact store, your experiment tracker, your model registry. Mix tools across clouds. Swap any component without rewriting your pipeline.",
    },
  ],
} as const;

export const PRODUCT_ZENML_FINAL_CTA = {
  headline: "Ship AI workflows, not infrastructure plumbing.",
  body: "Start with the open-source SDK, scale to managed when you need governance and a hosted control plane.",
  primaryCta: ZENML_LINKS.signup,
  secondaryCta: ZENML_LINKS.demo,
  installCmd: ZENML_INSTALL_CMD,
} as const;
