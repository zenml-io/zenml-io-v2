export const KITARU_INSTALL_CMD =
  "uv init --bare && uv add kitaru && uv run kitaru init";
export const KITARU_LICENSE = "Apache 2.0";

export const KITARU_LINKS = {
  demo: { label: "Book a demo", href: "/book-your-demo/kitaru" },
  github: {
    label: "Star on GitHub",
    href: "https://github.com/zenml-io/kitaru",
    external: true,
  },
} as const;

export const PRODUCT_KITARU_SEO = {
  title: "Kitaru: ask what-if about your agent's real runs | ZenML",
  description:
    "Open-source runtime that records model/tool calls and steps exposed through Kitaru primitives and adapters as replayable checkpoints. Replay a real execution with one scoped override: a flow input, a model, or a checkpoint result override. See what would have happened, with no production reruns. Durable checkpoints, wait/resume, and isolated execution on your own cloud. Built by the ZenML team.",
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
  title: "Kitaru: ask what-if about your agent's real runs",
  installCmd: KITARU_INSTALL_CMD,
  license: KITARU_LICENSE,
  summary: [
    "Kitaru is the open agent runtime from ZenML. The core pitch: ask what-if about your agent's real runs. Change one thing, replay the run, and see what would have happened. No production reruns.",
    "It records model/tool calls and steps exposed through Kitaru primitives and adapters as durable checkpoints, then replays from an execution ID with one scoped override: a flow input, checkpoint result override, invocation model, or test-mode flow input. The override is the only difference.",
    `It is open source under ${KITARU_LICENSE} and built for Python agents that need checkpoints, replay, wait/resume, isolated execution, artifacts, and versioned deployments on your own cloud.`,
    "You keep the agent harness you already chose: PydanticAI, OpenAI Agents SDK, Claude Agent SDK, LangGraph, or plain Python. Kitaru records and replays the run underneath it with a small set of Python primitives.",
    "Durable execution is the foundation, not the pitch. The same checkpoints that make replay faithful also resume a run from the boundary that broke, so a crash at hour 11 does not mean restarting from hour 1.",
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
