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

/**
 * FAQ help rail — one home for these destinations so the help links, the FAQ
 * answers that mention them, and any derived surfaces can't drift apart.
 * "Kitaru Docs" uses the site chrome's canonical docs URL (see
 * src/lib/navigation.ts), not the kitaru.ai/docs legacy host.
 */
export const FAQ_HELP_LINKS = [
  {
    label: "Slack Community",
    href: "https://kitaru.ai/slack",
    analytics: "Kitaru-FAQ-Help-Slack",
  },
  {
    label: "Kitaru Docs",
    href: "https://docs.zenml.io/kitaru",
    analytics: "Kitaru-FAQ-Help-Docs",
  },
  {
    label: "Support",
    href: "https://kitaru.ai/help",
    analytics: "Kitaru-FAQ-Help-Support",
  },
] as const;

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
    stat: "−61%",
    statLabel: "cost · 196/200 unchanged",
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
    title: "Pick the production cases that matter",
    body: "Start with a cohort you found during investigation, or hand-pick your own. Versioning the set means you compare every change against the same cases.",
  },
  {
    n: "02",
    tag: "Experiment",
    title: "Change one thing",
    body: "Keep the agent setup fixed and swap the model. Now any difference in the replay comes from the change you are testing.",
  },
  {
    n: "03",
    tag: "Compare",
    title: "See what actually changed",
    body: "Replay the same cohort with both setups and compare cost, latency, evaluator results, and behavior side by side.",
  },
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
    question:
      "We don't have agents, just LLM calls inside a workflow. Is Kitaru for us?",
    answer:
      "Yes. A one-shot call with a prompt, a model and a structured output, say an address pulled out of a PDF, is a session like any other. Import it from Langfuse or wrap the call, group the ones that matter into a cohort, and replay them against a cheaper model or a new prompt before the change ships. Most teams start exactly here. Tool calls and multi-step agents add replay policies on top; they are not a requirement.",
  },
  {
    question: "My agent writes to real systems. Isn't replay dangerous?",
    answer:
      "Replay answers the agent's tool calls from the recording, so nothing touches real systems. Per-tool policies control the rest: answer from history and stop the run when a call has no recorded answer, pin a static result, or deliberately pass a specific tool through live. We don't test in prod. We make prod's past your test bench.",
  },
  {
    question: "The model isn't deterministic. How is replay trustworthy?",
    answer:
      "The recorded world is held constant, same inputs and same tool responses, so replay removes every source of variation except the model itself. For the variation that remains, you create multiple experiment runs over the same cohort and compare the distributions, so you can tell a real regression from run-to-run noise instead of judging from a single sample.",
  },
  {
    question: "Where do the eval criteria come from? We never wrote any down.",
    answer:
      "From the people who already judge the agent every day. Your coding assistant, using Kitaru's investigation skill, interviews you over real sessions, pins your judgments to the exact evidence in the trace, and drafts evaluators from them. Each evaluator is checked against your verdicts before it gates anything.",
  },
  {
    question: "What frameworks does it work with?",
    answer:
      "Recording adapters wrap your existing agent in one line, with no rewrite. Python: PydanticAI, the OpenAI Agents SDK, and LangGraph (including LangChain agents and Deep Agents). TypeScript: the Vercel AI SDK and Mastra. For a custom harness or a framework we don't support yet, Kitaru ships a skill that walks your coding assistant through generating a new adapter for it.",
  },
  {
    question: "Can I use traces I already have?",
    answer:
      "Yes. Importers bring in trace files exported from Langfuse, LangSmith, Braintrust, Pydantic Logfire or Arize Phoenix, or you can write a one-page custom importer for your own store. The Phoenix importer reads JSONL downloaded from the Phoenix UI or JSON retrieved with the Phoenix CLI; it does not connect to the Phoenix API or use Phoenix credentials. Traces in raw OpenTelemetry format convert to Kitaru's JSONL import format.",
  },
  {
    question: "My agent is TypeScript. Can I use Kitaru?",
    answer:
      "Yes, natively. TypeScript agents record and replay through the Vercel AI SDK and Mastra adapters, with a framework-neutral TypeScript SDK alongside — and the adapter-generation skill covers custom TypeScript harnesses too. The CLI, workers and evaluators run on Python today, so there's Python in the loop even when the agent itself is TypeScript.",
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
      "Teams shipping agents, or LLM steps inside a product workflow, to customers whose regression process is honestly a few samples and a vibe check. Kitaru installs the rigor loop. It fits badly for single-dev prototypes and for teams buying a fully managed agent platform: if you're buying an agent platform, Kitaru will feel low-level. If you're building one, that's the point.",
  },
  {
    question: "Something's broken. How do I reach you?",
    answer:
      'Three routes, all reaching a human: the <a href="https://kitaru.ai/slack">Slack community</a>, <a href="https://kitaru.ai/help">kitaru.ai/help</a> (goes straight to GitHub issues), or <a href="mailto:support@kitaru.ai">support@kitaru.ai</a>.',
  },
] as const;
