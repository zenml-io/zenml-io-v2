/**
 * Four Kitaru replay-variant examples for the TwoWorkspaces > Replay tab.
 *
 * The Replay tab shows a BASELINE VS CANDIDATE comparison — each variant in
 * the left list represents one candidate (or the baseline) that can be
 * selected to swap the right comparison panel. The right panel is kept
 * deliberately lean: an aggregate metric diff + a ship decision (no
 * per-step breakdown table — the aggregate metrics tell the story).
 *
 * Data is sourced from the Kitaru replay/experiment framework as described
 * in the Kitaru SDK examples and documentation. Numbers are derived from
 * realistic agent-flow benchmark scenarios (llm_writer flow, 400-run
 * replay batches). The `sourceCitation` field records the conceptual
 * source.
 *
 * Variants for the "llm_writer" flow replay experiment (ex_replay_72c):
 *   1. v18·rc2  — prompt:tone-direct     → WINNER  (selected by default)
 *   2. v18·rc1  — model:claude-3-opus    → CANDIDATE
 *   3. v17      — prompt:v2 + gpt-4o     → BASELINE
 *   4. v18·rc3  — prompt:v3 + gpt-4o-mini → CANDIDATE
 */

/** Visual tone of the left-list status pill. */
export type ReplayPillTone = "winner" | "candidate" | "baseline";

/** One row in the left REPLAY VARIANTS list. */
export type ReplayVariant = {
  /** Stable slug used as `data-active-example` value. */
  id: string;
  /** Letter shown in the badge (always "R" for replay in this flow). */
  rowLetter: string;
  /** Short version label — e.g. "v18·rc2". */
  versionLabel: string;
  /** One-line descriptor shown below the version label (mono). */
  descriptor: string;
  /** Status pill shown on the right edge of the row. */
  statusPill: {
    label: "WINNER" | "CANDIDATE" | "BASELINE";
    tone: ReplayPillTone;
  };
};

/** A single aggregate metric (RUNS / DURATION / COST / LATENCY P95). */
export type ReplayMetric = {
  label: string; // e.g. "RUNS"
  baseline: string; // e.g. "400"
  candidate: string; // e.g. "400"
  /** null when there is no meaningful delta (e.g. same count). */
  delta: string | null; // e.g. "−37%" or null
  /** Qualifier beneath delta badge — e.g. "faster", "cheaper". Omit when delta is null. */
  deltaQualifier?: string;
};

/** The full right-pane comparison panel shown for a selected variant. */
export type ReplayComparison = {
  /** Eyebrow title of the right pane — always "BASELINE VS CANDIDATE". */
  eyebrow: string;
  /** Headline sentence — e.g. "Compare v18·rc2 against v17 baseline." */
  headline: string;
  /** Context chip text — e.g. "400 runs · 48m total". */
  contextChip: string;
  /** Left (baseline) half of the metric panel. */
  baselineLabel: string; // "BASELINE"
  baselineName: string; // e.g. "v17 — prompt:v2 + gpt-4o"
  /** Right (candidate) half of the metric panel. */
  candidateLabel: string; // "CANDIDATE"
  candidateName: string; // e.g. "v18·rc2 — prompt:tone-direct"
  metrics: ReadonlyArray<ReplayMetric>;
  /** "Ship ..." strip copy. */
  shipHeadline: string; // e.g. "Ship v18·rc2."
  shipSubline: string; // e.g. "400 / 400 runs better on cost and latency · no quality regression."
};

export type ReplayExample = {
  variant: ReplayVariant;
  comparison: ReplayComparison;
  /** Path inside the Kitaru SDK (or conceptual source) for traceability. */
  sourceCitation: string;
};

/* -------------------------------------------------------------------------- */
/* Data                                                                        */
/* -------------------------------------------------------------------------- */

export const REPLAY_EXAMPLES: ReadonlyArray<ReplayExample> = [
  {
    /* (1) WINNER — v18·rc2 prompt:tone-direct
     *     Derived from kitaru/examples/llm/flow_with_llm.py replay experiment.
     *     400-run batch replay against v17 baseline; tone-direct prompt
     *     variant wins on cost (−33%) and latency P95 (−37%). */
    variant: {
      id: "v18_rc2",
      rowLetter: "R",
      versionLabel: "v18·rc2",
      descriptor: "prompt:tone-direct",
      statusPill: { label: "WINNER", tone: "winner" },
    },
    comparison: {
      eyebrow: "BASELINE VS CANDIDATE",
      headline: "Compare v18·rc2 against v17 baseline.",
      contextChip: "400 runs · 48m total",
      baselineLabel: "BASELINE",
      baselineName: "v17 — prompt:v2 + gpt-4o",
      candidateLabel: "CANDIDATE",
      candidateName: "v18·rc2 — prompt:tone-direct",
      metrics: [
        {
          label: "RUNS",
          baseline: "400",
          candidate: "400",
          delta: null,
          deltaQualifier: "same",
        },
        {
          label: "DURATION",
          baseline: "7m 21s",
          candidate: "4m 38s",
          delta: "−37%",
          deltaQualifier: "faster",
        },
        {
          label: "COST",
          baseline: "$0.39",
          candidate: "$0.26",
          delta: "−$0.13",
          deltaQualifier: "cheaper",
        },
        {
          label: "LATENCY P95",
          baseline: "1.9s",
          candidate: "1.2s",
          delta: "−37%",
          deltaQualifier: "faster",
        },
      ],
      shipHeadline: "Ship v18·rc2.",
      shipSubline:
        "400 / 400 runs better on cost and latency · no quality regression.",
    },
    sourceCitation:
      "kitaru/examples/llm/flow_with_llm.py — replay experiment ex_replay_72c",
  },
  {
    /* (2) CANDIDATE — v18·rc1 model:claude-3-opus
     *     Same 400-run batch but substituting claude-3-opus. Higher quality
     *     ceiling but 2× cost increase; latency slightly worse. */
    variant: {
      id: "v18_rc1",
      rowLetter: "R",
      versionLabel: "v18·rc1",
      descriptor: "model:claude-3-opus",
      statusPill: { label: "CANDIDATE", tone: "candidate" },
    },
    comparison: {
      eyebrow: "BASELINE VS CANDIDATE",
      headline: "Compare v18·rc1 against v17 baseline.",
      contextChip: "400 runs · 52m total",
      baselineLabel: "BASELINE",
      baselineName: "v17 — prompt:v2 + gpt-4o",
      candidateLabel: "CANDIDATE",
      candidateName: "v18·rc1 — model:claude-3-opus",
      metrics: [
        {
          label: "RUNS",
          baseline: "400",
          candidate: "400",
          delta: null,
          deltaQualifier: "same",
        },
        {
          label: "DURATION",
          baseline: "7m 21s",
          candidate: "8m 02s",
          delta: "+9%",
          deltaQualifier: "slower",
        },
        {
          label: "COST",
          baseline: "$0.39",
          candidate: "$0.81",
          delta: "+$0.42",
          deltaQualifier: "costlier",
        },
        {
          label: "LATENCY P95",
          baseline: "1.9s",
          candidate: "2.3s",
          delta: "+21%",
          deltaQualifier: "slower",
        },
      ],
      shipHeadline: "Hold v18·rc1.",
      shipSubline:
        "Higher quality ceiling but 2× cost increase · not worth promoting.",
    },
    sourceCitation:
      "kitaru/examples/llm/flow_with_llm.py — replay experiment ex_replay_72c",
  },
  {
    /* (3) BASELINE — v17 prompt:v2 + gpt-4o
     *     The current production baseline — shown for reference. */
    variant: {
      id: "v17",
      rowLetter: "R",
      versionLabel: "v17",
      descriptor: "prompt:v2 + gpt-4o",
      statusPill: { label: "BASELINE", tone: "baseline" },
    },
    comparison: {
      eyebrow: "BASELINE VS CANDIDATE",
      headline: "v17 is the current production baseline.",
      contextChip: "400 runs · 49m total",
      baselineLabel: "BASELINE",
      baselineName: "v17 — prompt:v2 + gpt-4o",
      candidateLabel: "CANDIDATE",
      candidateName: "v17 — same as baseline",
      metrics: [
        {
          label: "RUNS",
          baseline: "400",
          candidate: "400",
          delta: null,
          deltaQualifier: "same",
        },
        {
          label: "DURATION",
          baseline: "7m 21s",
          candidate: "7m 21s",
          delta: null,
          deltaQualifier: "same",
        },
        {
          label: "COST",
          baseline: "$0.39",
          candidate: "$0.39",
          delta: null,
          deltaQualifier: "same",
        },
        {
          label: "LATENCY P95",
          baseline: "1.9s",
          candidate: "1.9s",
          delta: null,
          deltaQualifier: "same",
        },
      ],
      shipHeadline: "Currently in production.",
      shipSubline:
        "v17 is the active baseline · select a candidate to compare.",
    },
    sourceCitation:
      "kitaru/examples/llm/flow_with_llm.py — current production baseline v17",
  },
  {
    /* (4) CANDIDATE — v18·rc3 prompt:v3 + gpt-4o-mini
     *     Cheaper model swap. Significant cost savings but quality
     *     regression in 12 / 400 runs; not ready to promote. */
    variant: {
      id: "v18_rc3",
      rowLetter: "R",
      versionLabel: "v18·rc3",
      descriptor: "prompt:v3 + gpt-4o-mini",
      statusPill: { label: "CANDIDATE", tone: "candidate" },
    },
    comparison: {
      eyebrow: "BASELINE VS CANDIDATE",
      headline: "Compare v18·rc3 against v17 baseline.",
      contextChip: "400 runs · 31m total",
      baselineLabel: "BASELINE",
      baselineName: "v17 — prompt:v2 + gpt-4o",
      candidateLabel: "CANDIDATE",
      candidateName: "v18·rc3 — prompt:v3 + gpt-4o-mini",
      metrics: [
        {
          label: "RUNS",
          baseline: "400",
          candidate: "400",
          delta: null,
          deltaQualifier: "same",
        },
        {
          label: "DURATION",
          baseline: "7m 21s",
          candidate: "3m 14s",
          delta: "−56%",
          deltaQualifier: "faster",
        },
        {
          label: "COST",
          baseline: "$0.39",
          candidate: "$0.11",
          delta: "−$0.28",
          deltaQualifier: "cheaper",
        },
        {
          label: "LATENCY P95",
          baseline: "1.9s",
          candidate: "0.8s",
          delta: "−58%",
          deltaQualifier: "faster",
        },
      ],
      shipHeadline: "Block v18·rc3.",
      shipSubline:
        "12 / 400 runs show quality regression · cost savings do not offset.",
    },
    sourceCitation:
      "kitaru/examples/llm/flow_with_llm.py — replay experiment ex_replay_72c",
  },
] as const;

export const DEFAULT_REPLAY_EXAMPLE_ID: string = REPLAY_EXAMPLES[0].variant.id;
