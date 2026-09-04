/**
 * The one-line installer: CLI + MCP server in an isolated uv environment,
 * the coding-agent skills, MCP registration for Claude Code / Codex, and
 * then prints the two ways to get a server. Served by the kitaru.ai
 * worker from install.sh in the Kitaru repo.
 */
export const KITARU_INSTALL_CMD = "curl -fsSL https://kitaru.ai/install | bash";
/** Adding the SDK to a project's own environment (the embedded, in-process form). */
export const KITARU_SDK_ADD_CMD =
  'uv add "kitaru[cli,worker]" kitaru-pydantic-ai';
export const KITARU_LICENSE = "Apache 2.0";

/**
 * Pricing facts. Every surface that quotes the price, trial terms, or
 * Cloud-plan limits interpolates these constants, so a change is one line
 * here.
 */
export const KITARU_CLOUD_PRICE = "$39";
export const KITARU_TRIAL_DAYS = 14;
export const KITARU_CLOUD_LIMITS = {
  agents: 3,
  seats: 2,
  retentionDays: 90,
} as const;

/** Trial terms shown next to every signup CTA. */
export const KITARU_TRIAL_NOTE = `${KITARU_TRIAL_DAYS}-day free trial · Full access · No credit card`;

/**
 * Canonical answer to "how is this different from Langfuse / Braintrust /
 * LangSmith?" — say the sentence the same way every time. Used verbatim by
 * the /pricing Kitaru FAQ and the /product/kitaru FAQ.
 */
export const KITARU_VS_OBSERVABILITY_ANSWER =
  "They tell you what happened: traces you read, dashboards you check. Kitaru re-runs what happened. Your agent's real code executes again against the recorded world, so you can test your next change against your last thousand sessions before it ships. Kitaru also imports trace files exported from Langfuse, LangSmith, Braintrust, Logfire or Arize Phoenix, so your observability tool stays your system of record.";

/**
 * The 90-second launch video behind the hero's poster card. The iframe is
 * only injected while the modal is open, and the nocookie host must stay in
 * sync with the `frame-src` allowlist in public/_headers.
 */
export const KITARU_VIDEO = {
  id: "jQ1HZVCFJZM",
  embedUrl:
    "https://www.youtube-nocookie.com/embed/jQ1HZVCFJZM?autoplay=1&rel=0",
  title: "Kitaru launch video",
  caption: "Watch the launch video — 90 seconds",
} as const;

export const KITARU_LINKS = {
  signup: {
    // Kitaru signup lives on its own cloud app (Aug 2026 decision),
    // superseding the earlier cloud.zenml.io?product=kitaru placeholder.
    label: "Sign up free",
    href: "https://cloud.kitaru.ai",
  },
  demo: { label: "Book a demo", href: "/book-your-demo/kitaru" },
  github: {
    label: "Star on GitHub",
    href: "https://github.com/zenml-io/kitaru",
    external: true,
  },
} as const;

export const PRODUCT_KITARU_SEO = {
  title: "Kitaru: replay-based evals for AI agents | ZenML",
  description:
    "Replay-based evals for AI agents and LLM workflows: your production traces, re-run against your next change, whether the agent is a tool-using loop or one LLM call inside a product flow. Built for agents that write into a system of record, where testing in production would create phantom bookings and duplicate claims. Import the runs your agent already made, turn what your team notices into an evaluator, then compare two experiment runs to see what a new model or prompt would have done. Open source, self-hosted, built by the ZenML team.",
  // OG cards need JPEG, not AVIF — social platforms don't render AVIF (PR #73).
  ogImage: "https://assets.zenml.io/content/og/439a52c0/kitaru-product-og.jpg",
} as const;

/**
 * Hand-maintained Markdown mirror copy.
 *
 * This prose is NOT derived from src/components/kitaru/*. The install command,
 * license string, and canonical demo/GitHub links ARE shared through constants
 * above (and the .md route also appends FAQ_ITEMS from kitaru-landing.ts);
 * the rest of this summary should be updated when the Kitaru landing
 * page's load-bearing pitch changes.
 */
export const PRODUCT_KITARU_MARKDOWN = {
  title: "Kitaru: replay-based evals for AI agents",
  installCmd: KITARU_INSTALL_CMD,
  license: KITARU_LICENSE,
  summary: [
    "Kitaru turns your agent's production history into its test suite. Import the traces you already have, and each execution becomes a session: the top-level replayable object, with its tool calls, model calls and subagent calls as nodes underneath. A single LLM call inside a workflow, say an address extracted from a PDF, is a session too; tools and multi-step agents are not a requirement.",
    "It is built first for agents that turn unstructured inbound into structured writes in a system of record — emails and PDFs into a freight booking, documents into filings, claims into claim records. Those teams cannot test in production, because a live re-run would create a phantom booking or a duplicate claim. They are also the teams for whom evaluation is cheapest: a structured write can be compared field by field against what production actually did, so most of the surface needs no model-graded judge at all.",
    "And the labels already exist. When an ops person corrects the agent's write by hand, that corrected record is ground truth stated by a domain expert in the team's own schema. It accumulates daily in the system of record and no eval tool has ever asked for it. Import the traces, join them against the corrected records, and the eval set comes out of work somebody did anyway.",
    "The centre of the product is an interview, not a form. You read roughly twenty sessions out of thousands and write plain observations — no labels, no dropdowns, no schema. The agent organizes what you noticed into cohorts and drafts a criterion; you confirm the exact wording, and that confirmation is what makes it real. An agent cannot agree with itself on your behalf.",
    "Then you check your own check. Apply the accepted rubric blind to a held-out set of sessions you never read, lock the predictions, and only then reveal the labels. Disagreements put the rubric on trial before they put the human on trial.",
    "An experiment is pure configuration — model, system prompt, tool policy. An experiment run is that configuration plus a cohort plus an agent version, and runs are the unit of comparison. Change the code and you get a new run; change the prompt and you have stated a different hypothesis, so you get a new experiment.",
    "Replay executes your real code with tool calls intercepted by one of four policies: answered from recorded history, passed through to the real tool, returned from a static value, or invented by a model. Every intercepted node is stamped with the policy that answered it. A replay creates a new session rather than overwriting the original, so the baseline's evaluations stay intact, and a replay carries no verdict of its own — you compare two runs and decide.",
    "Nothing stays fixed by accident: point the same experiment at your agent on every commit and the cohort that caught the failure becomes the gate that keeps it caught.",
    `It is open source under ${KITARU_LICENSE}. Self-hosting is one command — \`kitaru login --local\` brings up Postgres, the API and the dashboard in Docker, so you can look at your traces before uploading anything anywhere.`,
  ],
  primitives: [
    {
      name: "session",
      body: "One execution of your agent, imported or recorded, and the top-level replayable object. Nodes underneath are tool calls, model calls or subagent calls; several source traces sharing a session id merge into one session.",
    },
    {
      name: "cohort",
      body: "An immutable, named set of sessions — a failure mode is a cohort, not a separate concept. Immutable because an experiment run depends on its cohort, so a mutable one would make past results meaningless.",
    },
    {
      name: "evaluator",
      body: "One observable criterion with explicit pass and fail definitions. Starts as a rubric a model applies directly and may never become Python at all. Evaluators live at workspace level and are versioned; the accepted rubric hash is the identity of the run.",
    },
    {
      name: "evaluation",
      body: "One flat row per session per evaluator: a score, a value label, or both, plus an explanation. The data type is derived rather than declared. Numbers average, labels count as most-common, comments get read.",
    },
    {
      name: "experiment and experiment run",
      body: "The experiment is pure configuration — tool policy, model, system prompt — tied to neither a cohort nor a version. The run is that configuration plus a cohort plus an agent version, and runs are what you compare.",
    },
    {
      name: "tool policy",
      body: "How an intercepted call gets answered during replay: from recorded history (scoped to the baseline, the cohort, or the agent's whole history), passed through to the real tool, returned from a static value, or invented by a model.",
    },
  ],
  journey: [
    {
      name: "Act 1 — Get in",
      body: `\`${KITARU_INSTALL_CMD}\` run inside your agent's repo adds Kitaru to that project's environment, installs the coding-agent skills and the MCP server, then prints the two ways to get a server: \`kitaru login --local\` in Docker, or the managed cloud. Two questions decide your path: do you have a repo with an agent, and do you have traces? No repo, or an unrecognised framework, and you start from the template repo — a small PydanticAI agent already wrapped, with a trace file beside it. Registering the agent stores an entrypoint module path server-side; nothing is written into your repo. Then \`kitaru worker start\` runs a plain Python process in your virtualenv, which polls — the server never connects inbound.`,
    },
    {
      name: "Act 2 — Traces in",
      body: "Import an export from whatever tracing you already run, or record fresh runs through the adapter; downstream they are the same object. Every session is graded at import for replay readiness — ready, partial or unavailable — from whether root inputs survived, whether the node graph is complete, and whether tool calls kept both a name and a payload. Built-in importers cover Langfuse, LangSmith, Braintrust, Logfire, Arize Phoenix and native JSONL; anything else is a custom importer, about a page of Python.",
    },
    {
      name: "Act 3 — Get interviewed (the centre)",
      body: "You have thousands of sessions and no idea what good means, and everything downstream is cheap once you know. A cheap deterministic pass over 25–30 sessions proposes draft cohorts — these looped, these took sixteen hours — but those are candidates, not conclusions. Then the interview: read each session backward from its final response to the first upstream decision that made the outcome wrong, and write free-text observations. Sampling favours diversity over frequency. The server enforces a minimum of four observations across three scenarios before it will let anything be synthesised. Your notes become named cohorts and one criterion, which you confirm word for word.",
    },
    {
      name: "Act 3b — Prove the evaluator",
      body: "A fresh evaluator is a hypothesis about your own judgment, built while looking at part of your data. Apply it blind to the held-out sessions, record the whole run at once against the rubric hash, and only then reveal the human labels. Read disagreements in order — is the rubric ambiguous, are the examples unrepresentative, did the check ignore the evidence, is the label itself wrong — so the rubric goes on trial before the human does. Be honest about what ten traces buy you: enough to expose a broken rubric, nothing about production accuracy.",
    },
    {
      name: "Act 4 — Fix it, and prove the fix",
      body: "You are not reproducing anything — the interview already told you it fails. Combine discovery and held-out into one new cohort, make the change, and run the experiment twice, one agent version apart. Same cases, same evaluator version, one variable moved. The comparison is two runs side by side, and every number can be traced back through evaluator version to the interview that produced it.",
    },
    {
      name: "Act 5 — Keep it fixed",
      body: "There is nothing new to build. The experiment holds the configuration, the cohort holds the cases, the evaluator holds the judgment: point it at your agent on every commit with `--fail-on`. Ten interviews later you have ten cohorts guarding ten real failure modes, and nobody scheduled a sprint for any of it.",
    },
  ],
  deploymentTargets: [
    "A Kitaru workspace on ZenML Pro — the default, and the path that gets optimised",
    "Fully local via `kitaru login --local`, which brings up Postgres, the API and the dashboard in Docker; there is no SQLite path, and local data does not migrate to cloud",
    "A local worker: a plain Python process in your own virtualenv, where your agent's dependencies and credentials already are",
    "Remote workers: deploy the same image with credentials in the environment and it registers itself — no autoscaling, and your agent's code has to already be in the image",
  ],
  limits: [
    {
      name: "Not every imported trace can be replayed",
      body: "Replay needs root inputs, a complete node graph, and tool calls that kept both a name and a payload. Many observability exports keep only messages and responses, not tool calls and their results. Kitaru grades each session ready, partial or unavailable at import and tells you why, rather than failing later. Teams whose traces are message-only can still read, annotate and build evaluators — replay arrives once they instrument.",
    },
    {
      name: "Replay is sound for single-execution agents",
      body: "Replay re-runs your real code against recorded tool results. For a multi-turn conversation, once the agent's first reply differs from the recorded one the rest of the transcript is no longer a comparison. Faithful multi-turn evaluation needs synthetic user turns, which is not in this version.",
    },
    {
      name: "A replay has no verdict",
      body: "There is no pass/fail on a replay and no blended cross-evaluator score. Its output is a new session and that session's evaluation rows, compared by whoever is reading. Nothing is stored that could later go stale.",
    },
  ],
  ctas: [KITARU_LINKS.signup, KITARU_LINKS.github],
} as const;
