export const KITARU_INSTALL_CMD = "uv add kitaru";
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
  title: "Kitaru: traces you can run, not just read | ZenML",
  description:
    "Open-source platform for agent experiments on real traces. Score a recorded execution without rerunning the agent, or replay your real code against the recorded world with one thing changed: a model, a tool's output, a failed call. Name a run to keep it, re-run it in CI as a regression test. Self-hosted on your own cloud. Built by the ZenML team.",
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
  title: "Kitaru: traces you can run, not just read",
  installCmd: KITARU_INSTALL_CMD,
  license: KITARU_LICENSE,
  summary: [
    "Kitaru is the open agent experimentation platform from ZenML. Traces you can run, not just read: the artifact is the execution, a recording of your agent doing something real, and everything else is what you do with it.",
    "There are two verbs. Score reads an execution and grades it — the agent never runs, so it is nearly free. Replay runs your agent's real code against the recorded world, with tool and model calls answered from the recording, so a what-if is faithful rather than a guess.",
    "One rule ties it together: doing the thing is the declaration. Run a verb and an experiment exists; name it and it is durable; re-run it in CI and it is a regression test. Kitaru is a debugger with a memory, never in the hot path of production.",
    "You keep the agent harness you already chose: PydanticAI, OpenAI Agents SDK, Claude Agent SDK, LangGraph, Gemini, Google ADK, or plain Python. Adapters record and replay the execution underneath it with a small set of Python primitives.",
    `It is open source under ${KITARU_LICENSE} and self-hosted on your own cloud. Scoring and experiments are the direction the platform is heading; the recording, replay, and durable substrate below ship today.`,
  ],
  primitives: [
    {
      name: "record",
      body: "Imports a trace or wraps a live run through an adapter so one execution — every model and tool call — is captured as a replayable artifact.",
    },
    {
      name: "replay with overrides",
      body: "Re-runs the agent's real code against the recorded world with one thing changed: a model, a tool's output, or a prompt. The override is the only difference.",
    },
    {
      name: "repeats and diff",
      body: "Runs a replay many times and reads the answer off a diff against the original execution, so you see what your change actually moved.",
    },
    {
      name: "@flow and @checkpoint",
      body: "The recording substrate: mark the durable boundary of a run and persist each call, which is what a later replay reads back.",
    },
    {
      name: "wait/resume",
      body: "Lets a run pause for human review, webhook input, or a scheduled event without keeping compute idle, and mints a recording as it goes.",
    },
    {
      name: "isolated execution and deployments",
      body: "Runs selected steps in isolated environments and operates flows from production systems through an API, schedules, and webhooks.",
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
