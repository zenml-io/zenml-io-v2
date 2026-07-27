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
    "The shape is a server you talk to and a worker you run. The server holds the data model — agents, sessions, scorers, cohorts, experiments — and the dashboard. The worker runs on your machine, next to your code, and executes the jobs the server hands it: import traces, replay agents, score sessions. Creation is local, memory is central, execution is local, viewing is central. The dashboard presses the button; your worker does the work.",
    "Skills running inside your own coding agent are the paved road for creating and registering things, but never the only road: every skill is a thin procedure over a CLI verb, so anything a skill does you can also do by hand with the CLI or the UI.",
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
  journey: [
    {
      name: "Install and log in",
      body: "`uv add kitaru` then `kitaru login` completes an OAuth flow against your Kitaru workspace and connects your client to your server. `kitaru login --local` covers the self-hosted case.",
    },
    {
      name: "Install the skills",
      body: "Kitaru skills run inside your own coding agent and turn setup into a conversation. They are optional: the CLI and the UI accept the same answers typed by hand.",
    },
    {
      name: "Get traces in",
      body: "Import them from Langfuse, LangSmith, or an OTel JSONL file; or record fresh ones by wrapping your agent with a Kitaru adapter; or clone the template repository, a small PydanticAI agent with a trace file next to it. Imported and recorded sessions are the same object downstream.",
    },
    {
      name: "Start the worker",
      body: "One general-purpose process on your machine polls the server and runs whatever job is waiting: imports, replays, scorers. Your code, keys, and data stay on your infrastructure.",
    },
    {
      name: "Triage into cohorts",
      body: "The triage skill reads your sessions, asks what bad looks like to you, and groups them into cohorts that show up in the dashboard. There is no separate triage service to deploy.",
    },
    {
      name: "Fix one session end to end",
      body: "Replay a single broken session, and while you look at what went wrong the skill interviews you about what good looks like. Your answers compile into a bespoke scorer registered to the server and loaded by your worker. Replay, score, fix, replay again.",
    },
    {
      name: "Scale it to the cohort",
      body: "Create an experiment over the cohort and trigger it from the dashboard. The server queues the job, your worker replays and scores every session, and the results land back in the UI.",
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
