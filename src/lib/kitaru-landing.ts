import type { FaqItem } from "./marketingPageTypes";
import { KITARU_VS_OBSERVABILITY_ANSWER } from "./productKitaru";

// Re-export shared constants from productKitaru to avoid duplication
export {
  KITARU_LICENSE,
  KITARU_LINKS,
  KITARU_TRIAL_DAYS,
  KITARU_TRIAL_NOTE,
} from "./productKitaru";

/** Install the CLI and worker exercised by this landing page. */
export const KITARU_INSTALL_CMD =
  'uv add "kitaru[cli,worker]" kitaru-pydantic-ai';

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
    label: "cohort_version_id=...",
    body: "An immutable set of sessions — a run depends on its cohort, so a mutable one would make old results meaningless.",
  },
  {
    key: "experiment",
    label: "experiments.create(...)",
    body: "Pure configuration. Change the code and you get a new run; change the prompt and you get a new experiment.",
  },
  {
    key: "model",
    label: 'ReplayOverride(model="claude-haiku-4.5")',
    body: "The variable under test. A run that moved two things cannot tell you which one did it.",
  },
  {
    key: "policy",
    label: 'HistoryConfig(scope="cohort_version")',
    body: "One of four policies — history, passthrough, static, llm. Every intercepted node is stamped with the one that answered it.",
  },
  {
    key: "run",
    label: "experiments.start_run(...)",
    body: "Each replay creates a new session instead of overwriting the original, so the baseline survives intact.",
  },
  {
    key: "inspect",
    label: "wait_for_run(...) / experimentRuns.wait(...)",
    body: "Wait for both exact runs to settle, then inspect their comparison in Kitaru. It does not invent a verdict or a blended score.",
  },
] as const;

export const AGENTS = ["Claude Code", "Codex", "Cursor", "Gemini CLI"] as const;

export const ARTICLES = [
  {
    kind: "Origin story",
    title: "From ZenML to Kitaru",
    summary:
      "Why agent runtime needed a new interface, and what we kept from production ML infrastructure.",
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
      "Traces explain what happened. Runtime artifacts, replay, and approval gates let you do something about it.",
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
      "No. It sits beside your observability stack, not in place of it. Traces tell you what happened; Kitaru re-runs them against your actual code. Think a debugger with a memory, not a dashboard of spans.",
  },
  {
    question: "My agent writes to real systems. Isn't replay dangerous?",
    answer:
      "Replay answers the agent's tool calls from the recording — nothing touches real systems. Per-tool policies control the rest: recorded, blocked, live in a sandbox, or simulated, where an LLM answers the tool call in-distribution so the session keeps going realistically past the recorded data. We don't test in prod — we make prod's past your test bench.",
  },
  {
    question: "The model isn't deterministic. How is replay trustworthy?",
    answer:
      "The recorded world is held constant — same inputs, same tool responses — so the diff you see comes from your change, not from ambient noise. Comparison is done by evaluators plus side-by-side diff, not by pretending LLMs are deterministic. And no, temperature=0 is not determinism — we have the divergence data.",
  },
  {
    question: "Where do the eval criteria come from? We never wrote any down.",
    answer:
      "From the people who already judge the agent every day. Kitaru interviews your domain expert, compiles their criteria into evaluators, then calibrates them against human pairwise judgments before they gate anything.",
  },
  {
    question: "What frameworks does it work with?",
    answer:
      "Recording adapters wrap your existing agent — one wrapper, no rewrite — for PydanticAI, the OpenAI Agents SDK, LangGraph and Mastra. Or skip recording entirely and import the trace history you already have from Langfuse, Braintrust, LangSmith or plain files.",
  },
  {
    question: "My agent is TypeScript. Can I use Kitaru?",
    answer:
      "Today: import your traces — file-based or a Langfuse export — and you get triage, evaluators and experiments over them. Recording adapters are Python-first; an OTel-shaped ingestion path for any-language stacks is on the roadmap.",
  },
  {
    question: "Is it open source? Can I self-host?",
    answer:
      "Yes — Apache 2.0, self-hosted by default. The server and workers run in your infrastructure and replay executes in your environment, so your traces never have to leave your systems. A managed offering is available through ZenML Pro.",
  },
  {
    question: "Does this replace human review?",
    answer:
      "No. Evals change the review ratio, not the review requirement. The goal is that humans review the sessions worth reviewing, with evidence attached — not that nobody reviews.",
  },
  {
    question: "Who is this for — and who isn't it for?",
    answer:
      "Teams shipping agents to customers whose regression process is honestly a few samples and a vibe check — Kitaru installs the rigor loop. Not for single-dev prototypes, and not for teams buying a fully managed agent platform: if you're buying an agent platform, Kitaru will feel low-level. If you're building one, that's the point.",
  },
] as const;
