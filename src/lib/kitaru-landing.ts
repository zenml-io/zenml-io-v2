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
