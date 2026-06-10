export const KITARU_INSTALL_CMD = "pip install kitaru";
export const KITARU_LICENSE = "Apache 2.0";

export const KITARU_LINKS = {
  demo: { label: "Book a demo", href: "/book-your-demo" },
  github: {
    label: "Star on GitHub",
    href: "https://github.com/zenml-io/kitaru",
    external: true,
  },
} as const;

export const PRODUCT_KITARU_SEO = {
  title: "Kitaru — Record, replay, and improve Python agents | ZenML",
  description:
    "Open-source runtime that records every step of your agents' runs as replayable checkpoints. Replay with overrides, compare cost and quality, and ship updates with confidence — with wait/resume, isolated execution, and versioned deployments on your own cloud. Built by the ZenML team.",
} as const;

/**
 * Hand-maintained Markdown mirror copy.
 *
 * This prose is NOT derived from src/components/kitaru/*. The install command,
 * license string, and canonical demo/GitHub links ARE shared through constants
 * above; the rest of this summary should be updated when the Kitaru landing
 * page's load-bearing pitch changes.
 */
export const PRODUCT_KITARU_MARKDOWN = {
  title: "Kitaru — the open agent runtime",
  installCmd: KITARU_INSTALL_CMD,
  license: KITARU_LICENSE,
  summary: [
    "Kitaru is the open agent runtime from ZenML. The live page's core pitch is: replay, don't guess — rerun production runs against new models, prompts, or skills; compare evidence; ship the variant that wins.",
    `It is open source under ${KITARU_LICENSE} and built for Python agents that need checkpoints, replay, wait/resume, isolated execution, artifacts, and versioned deployments on your own cloud.`,
    "You keep the agent harness you already chose — CrewAI, PydanticAI, OpenAI Agents SDK, Claude Agent SDK, or plain Python. Kitaru records and replays the run underneath it with a small set of Python primitives.",
    "The concrete failure story is simple: if your agent dies at hour 11, Kitaru should not make you restart from hour 1. It resumes from persisted checkpoints instead.",
  ],
  primitives: [
    {
      name: "@flow",
      body: "Marks the top-level durable boundary for an agent run.",
    },
    {
      name: "@checkpoint",
      body: "Persists the output of an expensive or important step so completed work does not re-run after a crash.",
    },
    {
      name: "wait/resume",
      body: "Lets an agent pause for human review, webhook input, or a scheduled event without keeping compute idle for hours or days.",
    },
    {
      name: "isolated execution",
      body: "Runs selected steps in isolated environments when they need stronger boundaries or different runtime settings.",
    },
    {
      name: "artifacts and lineage",
      body: "Stores outputs and metadata so teams can inspect what the agent produced and replay from known states.",
    },
    {
      name: "API, schedules, and webhooks",
      body: "Triggers and operates durable agent flows from production systems instead of a local-only script loop.",
    },
  ],
  deploymentTargets: [
    "Local development",
    "Kubernetes",
    "SageMaker",
    "Vertex AI",
    "AzureML",
    "Object storage such as S3, GCS, or Azure Blob for artifacts",
  ],
  ctas: [KITARU_LINKS.demo, KITARU_LINKS.github],
} as const;
