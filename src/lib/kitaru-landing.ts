import type { FaqItem } from "./marketingPageTypes";
import { KITARU_VS_OBSERVABILITY_ANSWER } from "./productKitaru";

// Re-export shared constants from productKitaru to avoid duplication
export {
  KITARU_INSTALL_CMD,
  KITARU_LICENSE,
  KITARU_LINKS,
  KITARU_TRIAL_DAYS,
  KITARU_TRIAL_NOTE,
} from "./productKitaru";

// Note: PRODUCT_KITARU_SEO is retained in productKitaru.ts as it serves the page's meta tags

export const SCENARIOS = [
  {
    tag: "understand",
    q: "What does good even mean here?",
    outcome:
      "Read twenty of them and write what you notice. Your notes become the cohorts.",
    stat: "20",
    statLabel: "read · not 1,824",
  },
  {
    tag: "trust",
    q: "Can I believe my own check?",
    outcome:
      "Apply it blind to sessions you never read, then reveal the labels.",
    stat: "held-out",
    statLabel: "predictions locked first",
  },
  {
    tag: "decide",
    q: "Can we ship the cheaper model?",
    outcome:
      "Same cohort, one model swapped — the answer is two runs, compared.",
    stat: "−84%",
    statLabel: "cost · 192/200 outputs identical",
  },
  {
    tag: "guard",
    q: "Will it stay fixed?",
    outcome:
      "The same experiment runs on every commit, on the cases that caught it.",
    stat: "0",
    statLabel: "regressions reach production",
  },
] as const;

export const STEPS = [
  {
    n: "01",
    tag: "Cohort",
    title: "Freeze the sessions that matter",
    body: "The sessions you care about, frozen as a named set. Immutable, so a run's result keeps meaning what it meant.",
    command:
      "COHORT_VERSION_ID=$(kitaru cohort create checkout-flow --agent checkout-agent --sessions-file session-ids.txt --output json --machine --non-interactive --no-browser | jq -r '.item.version.id')",
  },
  {
    n: "02",
    tag: "Experiment",
    title: "State the two hypotheses",
    body: "Each experiment is just configuration. Keep the baseline fixed, then change only the model in the candidate.",
    command: `kitaru experiment create baseline --agent checkout-agent --tool-policy '{"default":{"type":"history","scope":"cohort_version","on_miss":"fail"}}' --evaluator response-quality@latest\nkitaru experiment create cheap-model --agent checkout-agent --override '{"model":"claude-haiku-4.5"}' --tool-policy '{"default":{"type":"history","scope":"cohort_version","on_miss":"fail"}}' --evaluator response-quality@latest`,
  },
  {
    n: "03",
    tag: "Two runs",
    title: "Compare like with like",
    body: "Run the baseline and candidate over the same cohort and agent version. One model moved, so the numbers mean what they look like.",
    command:
      'kitaru experiment run start baseline --cohort-version "$COHORT_VERSION_ID" --agent checkout-agent@v1 --wait\nkitaru experiment run start cheap-model --cohort-version "$COHORT_VERSION_ID" --agent checkout-agent@v1 --wait',
  },
] as const;

export const GROUND_TRUTH_POINTS = [
  {
    kind: "Field by field",
    body: "A structured write diffs against production, one field at a time. No judge, no calibration set.",
  },
  {
    kind: "The residue",
    body: "Keep a model-graded check only for tone, and for whether escalating was right.",
  },
  {
    kind: "Per tenant",
    body: "Every customer brings its own corrections. Same loop, new cohort.",
  },
] as const;

export const ANNOTATIONS = [
  {
    key: "cohort",
    label: {
      python: "cohort_version_id=...",
      typescript: "cohort_version_id: ...",
    },
    body: "An immutable set of sessions — a run depends on its cohort, so a mutable one would make old results meaningless.",
  },
  {
    key: "experiment",
    label: {
      python: "experiments.create(...)",
      typescript: "experiments.create(...)",
    },
    body: "Pure configuration. Change the code and you get a new run; change the prompt and you get a new experiment.",
  },
  {
    key: "model",
    label: {
      python: 'ReplayOverride(model="claude-haiku-4.5")',
      typescript: 'override: { model: "claude-haiku-4.5" }',
    },
    body: "The variable under test. A run that moved two things cannot tell you which one did it.",
  },
  {
    key: "policy",
    label: {
      python: 'HistoryConfig(scope="cohort_version")',
      typescript: '{ type: "history", scope: "cohort_version" }',
    },
    body: "One of four policies — history, passthrough, static, llm. Every intercepted node is stamped with the one that answered it.",
  },
  {
    key: "run",
    label: {
      python: "experiments.start_run(...)",
      typescript: "experiments.startRun(...)",
    },
    body: "Each replay creates a new session instead of overwriting the original, so the baseline survives intact.",
  },
  {
    key: "inspect",
    label: {
      python: "wait_for_run(...)",
      typescript: "experimentRuns.wait(...)",
    },
    body: "Wait for both exact runs to settle, then inspect their comparison in Kitaru. It does not invent a verdict or a blended score.",
  },
] as const;

export const AGENTS = ["Claude Code", "Codex", "Cursor", "Gemini CLI"] as const;

export const ARTICLES = [
  {
    kind: "Origin story",
    title: "From ZenML to Kitaru",
    summary:
      "Why we built a second product, and what we kept from production ML infrastructure.",
    href: "/blog/from-zenml-to-kitaru",
  },
  {
    kind: "Foundations",
    title: "The Anatomy of a Production Coding Agent",
    summary:
      "Not a prompt and a while loop — eight stages, each with different failure modes, costs, and human touchpoints.",
    href: "/blog/anatomy-of-a-production-agent",
  },
  {
    kind: "Perspective",
    title: "Agents need more than traces",
    summary:
      "Traces show you what happened. The case for infrastructure that lets you act on it.",
    href: "/blog/agents-need-more-than-traces",
  },
] as const;

export const LINEAGE = [
  { name: "JetBrains", href: "https://www.zenml.io/case-study/jetbrains" },
  { name: "Adeo", href: "https://www.zenml.io/case-study/adeo-leroy-merlin" },
  { name: "Brevo", href: "https://www.zenml.io/case-study/brevo" },
] as const;

/**
 * FAQ — the objections and questions that come up in every demo, answered
 * in the same register the rest of the page uses. Pricing questions live
 * on /pricing; these are product questions.
 */
export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: "How is this different from Langfuse, Braintrust or LangSmith?",
    answer: KITARU_VS_OBSERVABILITY_ANSWER,
  },
  {
    question: "So is this an observability tool?",
    answer:
      "No. It sits beside your observability stack. Traces tell you what happened; Kitaru re-runs them against your actual code: a debugger with a memory rather than another dashboard of spans.",
  },
  {
    question: "Do I have to change my agent's code?",
    answer:
      "Not to get started. Import your traces and you already get the session views, investigations, cohorts and evaluators; your code stays untouched. An adapter enters only when you want to replay sessions against a change: one line for the supported frameworks, or a small custom one for CLI-harness agents like Claude Code or Gemini CLI.",
  },
  {
    question: "My agent writes to real systems. Isn't replay dangerous?",
    answer:
      "Replay answers the agent's tool calls from the recording, so nothing touches real systems. Per-tool policies control the rest: answer from history and stop the run when a call has no recorded answer, pin a static result, or deliberately pass a specific tool through live. We don't test in prod. We make prod's past your test bench.",
  },
  {
    question: "The model isn't deterministic. How is replay trustworthy?",
    answer:
      "The recorded world is held constant, same inputs and same tool responses, so the diff you see comes from your change rather than ambient noise. Evaluators and a side-by-side diff do the comparison; nobody has to pretend LLMs are deterministic. (And no, temperature=0 is not determinism. We have the divergence data.)",
  },
  {
    question: "Where do the eval criteria come from? We never wrote any down.",
    answer:
      "From the people who already judge the agent every day. Your coding assistant, using Kitaru's investigation skill, interviews you over real sessions, pins your judgments to the exact evidence in the trace, and drafts evaluators from them. Each evaluator is checked against your verdicts before it gates anything.",
  },
  {
    question: "What frameworks does it work with?",
    answer:
      "Recording adapters wrap your existing agent in one line, with no rewrite. Python: PydanticAI, the OpenAI Agents SDK, and LangGraph (including LangChain agents and Deep Agents). TypeScript: the Vercel AI SDK and Mastra. Anything else: import the trace history you already have from Langfuse, LangSmith, Braintrust or Pydantic Logfire, or write a one-page custom importer. Traces in raw OpenTelemetry format convert to Kitaru's JSONL import format.",
  },
  {
    question: "My agent is TypeScript. Can I use Kitaru?",
    answer:
      "Yes, natively. TypeScript agents record and replay through the Vercel AI SDK and Mastra adapters, with a framework-neutral TypeScript SDK alongside. The CLI, workers and evaluators run on Python today, so there's Python in the loop even when the agent itself is TypeScript.",
  },
  {
    question: "Is it open source? Can I self-host?",
    answer:
      "Yes: Apache 2.0, self-hosted by default. The server and workers run in your infrastructure and replay executes in your environment, so your traces never have to leave your systems. ZenML Pro offers a managed version if you want one.",
  },
  {
    question: "Does this replace human review?",
    answer:
      "No. Evals change how much humans review, not whether they do. The goal is that people spend their review time on the sessions that deserve it, with evidence attached.",
  },
  {
    question: "Who is this for, and who isn't it for?",
    answer:
      "Teams shipping agents to customers whose regression process is honestly a few samples and a vibe check. Kitaru installs the rigor loop. It fits badly for single-dev prototypes and for teams buying a fully managed agent platform: if you're buying an agent platform, Kitaru will feel low-level. If you're building one, that's the point.",
  },
  {
    question: "Something's broken. How do I reach you?",
    answer:
      'Three routes, all reaching a human: the <a href="https://kitaru.ai/slack">Slack community</a>, <a href="https://kitaru.ai/help">kitaru.ai/help</a> (goes straight to GitHub issues), or <a href="mailto:support@kitaru.ai">support@kitaru.ai</a>. An issue with a session ID attached gets fixed fastest.',
  },
] as const;
