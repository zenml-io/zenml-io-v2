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
  },
  {
    n: "02",
    tag: "Experiment",
    title: "State one hypothesis",
    body: "Just configuration: model, system prompt, tool policy. Swap the model and you have stated a different hypothesis.",
  },
  {
    n: "03",
    tag: "Two runs",
    title: "Compare like with like",
    body: "Twice over the same cohort, one version apart. One variable moved, so the numbers mean what they look like.",
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
    label: "cohorts.create()",
    body: "An immutable set of sessions — a run depends on its cohort, so a mutable one would make old results meaningless.",
  },
  {
    key: "experiment",
    label: "experiments.create()",
    body: "Pure configuration. Change the code and you get a new run; change the prompt and you get a new experiment.",
  },
  {
    key: "model",
    label: 'model="glm-5.4"',
    body: "The variable under test. A run that moved two things cannot tell you which one did it.",
  },
  {
    key: "policy",
    label: 'History(scope="cohort")',
    body: "One of four policies — history, passthrough, static, llm. Every intercepted node is stamped with the one that answered it.",
  },
  {
    key: "run",
    label: "experiment.run()",
    body: "Each replay creates a new session instead of overwriting the original, so the baseline survives intact.",
  },
  {
    key: "compare",
    label: "compare(before, after)",
    body: "No verdict, no blended score. Two runs, side by side, read by you.",
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
    question: "Is it open source? Can I self-host?",
    answer:
      "Yes — Apache 2.0, self-hosted by default. The server and workers run in your infrastructure and replay executes in your environment, so your traces never have to leave your systems. A managed offering is available through ZenML Pro.",
  },
  {
    question: "Does this replace human review?",
    answer:
      "No. Evals change the review ratio, not the review requirement. The goal is that humans review the sessions worth reviewing, with evidence attached — not that nobody reviews.",
  },
] as const;
