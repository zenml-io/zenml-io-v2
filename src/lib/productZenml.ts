/**
 * Page copy for /product/zenml — the ZenML sub-product landing.
 *
 * Mirrors /product/kitaru in shape but pitches the ML workspace.
 * Baseline copy; iterate on tone/specifics before Phase 9's full
 * design pass (Zuri).
 */

export const PRODUCT_ZENML_SEO = {
  title: "ZenML — The MLOps layer for your existing stack",
  description:
    "Open-source MLOps orchestration. Reproducible pipelines from your laptop to Kubernetes, Vertex, SageMaker, and AzureML — without rewriting your code.",
} as const;

export const PRODUCT_ZENML_HERO = {
  badges: ["ZenML — ML workspace", "Open source · Apache 2.0"],
  headline: "The MLOps layer that fits ",
  headlineAccent: "your stack",
  subtitleLead: "Bring your own tools.",
  subtitle:
    "Orchestrate ML pipelines from your laptop to Kubernetes, Vertex, SageMaker, and AzureML. Reproducible artifacts, model registry, and a composable stack — without vendor lock-in.",
  installCmd: "pip install zenml",
  primaryCta: { label: "Book a demo", href: "/book-your-demo" },
  secondaryCta: {
    label: "Read Docs",
    href: "/docs",
  },
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
      body: "Every artifact is versioned and tracked. Every run is queryable. Re-execute any pipeline from any step — the artifact store handles the rest.",
    },
    {
      name: "Composable stack, not a monolith",
      body: "Pick your orchestrator, your artifact store, your experiment tracker, your model registry. Mix tools across clouds. Swap any component without rewriting your pipeline.",
    },
  ],
} as const;

export const PRODUCT_ZENML_FINAL_CTA = {
  headline: "Ship ML pipelines, not infrastructure plumbing.",
  body: "Start with the open-source SDK, scale to managed when you need governance and a hosted control plane.",
  primaryCta: { label: "Book a demo", href: "/book-your-demo" },
  secondaryCta: { label: "Read Docs", href: "/docs" },
  installCmd: "pip install zenml",
} as const;
