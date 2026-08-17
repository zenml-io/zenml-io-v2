/**
 * Three Kitaru runs for the TwoWorkspaces > Compare tab.
 *
 * The Compare tab shows a RUN VS RUN diff — the left list holds the runs
 * made over one immutable cohort (`checkout-flow`, 90 recorded sessions),
 * and selecting a row swaps the right comparison panel. A run is
 * config + cohort + version, so every row names the experiment it came
 * from and the version it ran.
 *
 * The set tells the landing page's arc (Hero + Features + AgentDriven):
 *   run 3 · fix-validation · pr-311 — the fix, replayed against the same 90
 *                                     recorded sessions → CANDIDATE (default)
 *   run 2 · fix-validation · v1     — the run every candidate is read
 *                                     against → BASELINE
 *   run 1 · cheap-model · glm-5.4   — the model swap: same cohort, same
 *                                     version, one config line moved
 *
 * No verdicts. Kitaru never says PASS, never blends a score — every panel
 * closes on a count of sessions opened for a human to read.
 */

/** Visual tone of the left-list status pill. */
export type RunPillTone = "candidate" | "baseline";

/** One row in the left RUNS list. */
export type CompareRun = {
  /** Stable slug used as `data-active-example` value. */
  id: string;
  /** Run number shown in the badge — e.g. "3". */
  rowLetter: string;
  /** Short run label — e.g. "run 3". */
  versionLabel: string;
  /** Version, or the experiment when that is what changed (mono). */
  descriptor: string;
  /** Status pill shown on the right edge of the row. */
  statusPill: {
    label: "CANDIDATE" | "BASELINE";
    tone: RunPillTone;
  };
};

/**
 * How a delta badge reads.
 *
 *   "gain"  — the candidate moved in the direction you were hoping for.
 *   "watch" — the candidate diverged; the number is what you go and read,
 *             not a failure Kitaru is calling.
 *
 * There is deliberately no "regression" tone: a red badge would be a
 * verdict, and Kitaru does not issue those.
 */
export type DeltaTone = "gain" | "watch";

/** A single aggregate metric row in the comparison panel. */
export type CompareMetric = {
  label: string; // e.g. "FAILING"
  baseline: string; // e.g. "90 / 90"
  candidate: string; // e.g. "4 / 90"
  /** null when there is no meaningful delta (e.g. same count). */
  delta: string | null; // e.g. "−11%" or null
  /** Badge tone. Required whenever `delta` is set. */
  deltaTone?: DeltaTone;
  /** Qualifier beneath the delta badge — e.g. "cheaper". Shown when `delta` is null. */
  deltaQualifier?: string;
};

/** The full right-pane comparison panel shown for a selected run. */
export type RunComparison = {
  /** Eyebrow title of the right pane — always "RUN VS RUN". */
  eyebrow: string;
  /** Headline sentence — e.g. "Replay the fix against the 90 recorded sessions." */
  headline: string;
  /** Context chip text — the evaluator this comparison is read through. */
  contextChip: string;
  /** Left (baseline run) half of the metric panel. */
  baselineLabel: string; // "BASELINE"
  baselineName: string; // e.g. "run 2 · version v1"
  /** Right (candidate run) half of the metric panel. */
  candidateLabel: string; // "CANDIDATE"
  candidateName: string; // e.g. "run 3 · version pr-311"
  metrics: ReadonlyArray<CompareMetric>;
  /**
   * Human-judgment strip. Replaces the old verdict band — Kitaru opens the
   * remaining sessions, it does not rule on them.
   */
  readHeadline: string; // e.g. "4 still failing — opened for you to read."
  readSubline: string;
  readButtonLabel: string; // e.g. "Read the 4"
};

export type CompareExample = {
  run: CompareRun;
  comparison: RunComparison;
  /** Landing-page surface this run's numbers are frozen against. */
  sourceCitation: string;
};

/* -------------------------------------------------------------------------- */
/* Data                                                                        */
/* -------------------------------------------------------------------------- */

/** The one cohort every run below was made over — pinned to the left pane. */
export const COMPARE_COHORT = {
  name: "checkout-flow",
  detail: "90 sessions · immutable",
} as const;

/** The evaluator every panel is read through. */
const EVALUATOR_CHIP = "evaluator hazmat-flag-preserved";

/** The frozen line under every human-judgment strip. */
const NO_VERDICT_LINE =
  "No verdict, no blended score. Two runs, side by side, read by you.";

export const COMPARE_EXAMPLES: ReadonlyArray<CompareExample> = [
  {
    /* (1) The fix, replayed. Same cohort, same evaluator, one version apart —
     *     so the numbers mean what they look like. Default selection. */
    run: {
      id: "run_3_pr_311",
      rowLetter: "3",
      versionLabel: "run 3",
      descriptor: "pr-311",
      statusPill: { label: "CANDIDATE", tone: "candidate" },
    },
    comparison: {
      eyebrow: "RUN VS RUN",
      headline: "Replay the fix against the 90 recorded sessions.",
      contextChip: EVALUATOR_CHIP,
      baselineLabel: "BASELINE",
      baselineName: "run 2 · version v1",
      candidateLabel: "CANDIDATE",
      candidateName: "run 3 · version pr-311",
      metrics: [
        {
          label: "SESSIONS",
          baseline: "90",
          candidate: "90",
          delta: null,
          deltaQualifier: "same cohort",
        },
        {
          label: "FAILING",
          baseline: "90 / 90",
          candidate: "4 / 90",
          delta: "+86",
          deltaTone: "gain",
        },
        {
          label: "COST / RUN",
          baseline: "$0.14",
          candidate: "$0.12",
          delta: "−11%",
          deltaTone: "gain",
        },
      ],
      readHeadline: "4 still failing — opened for you to read.",
      readSubline: NO_VERDICT_LINE,
      readButtonLabel: "Read the 4",
    },
    sourceCitation: "kitaru landing — Hero replay panel (90 / 90 → 4 / 90)",
  },
  {
    /* (2) The baseline. Nothing to diff against yet — this run is the world
     *     the candidates are read against. */
    run: {
      id: "run_2_v1",
      rowLetter: "2",
      versionLabel: "run 2",
      descriptor: "v1",
      statusPill: { label: "BASELINE", tone: "baseline" },
    },
    comparison: {
      eyebrow: "RUN VS RUN",
      headline: "The run every candidate is read against.",
      contextChip: EVALUATOR_CHIP,
      baselineLabel: "BASELINE",
      baselineName: "run 2 · version v1",
      candidateLabel: "CANDIDATE",
      candidateName: "pick a run above to compare",
      metrics: [
        {
          label: "SESSIONS",
          baseline: "90",
          candidate: "90",
          delta: null,
          deltaQualifier: "same cohort",
        },
        {
          label: "FAILING",
          baseline: "90 / 90",
          candidate: "90 / 90",
          delta: null,
          deltaQualifier: "unchanged",
        },
        {
          label: "COST / RUN",
          baseline: "$0.14",
          candidate: "$0.14",
          delta: null,
          deltaQualifier: "unchanged",
        },
      ],
      readHeadline: "90 failing — opened for you to read.",
      readSubline:
        "The cohort is immutable, so this run keeps meaning what it meant.",
      readButtonLabel: "Read the 90",
    },
    sourceCitation:
      "kitaru landing — AgentDriven transcript (cohort checkout-flow · v1)",
  },
  {
    /* (3) The model swap. Same cohort, same version — the only thing that
     *     moved is one config line, so the diff is the model. */
    run: {
      id: "run_1_cheap_model",
      rowLetter: "1",
      versionLabel: "run 1",
      descriptor: "cheap-model",
      statusPill: { label: "CANDIDATE", tone: "candidate" },
    },
    comparison: {
      eyebrow: "RUN VS RUN",
      headline: "Same 90 sessions, one model swapped.",
      contextChip: EVALUATOR_CHIP,
      baselineLabel: "BASELINE",
      baselineName: "run 2 · version v1",
      candidateLabel: "CANDIDATE",
      candidateName: "run 1 · model glm-5.4",
      metrics: [
        {
          label: "SESSIONS",
          baseline: "90",
          candidate: "90",
          delta: null,
          deltaQualifier: "same cohort",
        },
        {
          label: "OUTPUTS IDENTICAL",
          baseline: "—",
          candidate: "84 / 90",
          delta: "6 to read",
          deltaTone: "watch",
        },
        {
          label: "COST / RUN",
          baseline: "$0.14",
          candidate: "$0.05",
          delta: "−64%",
          deltaTone: "gain",
        },
      ],
      readHeadline: "6 diverged — opened for you to read.",
      readSubline: NO_VERDICT_LINE,
      readButtonLabel: "Read the 6",
    },
    sourceCitation:
      "kitaru landing — Features payoff (one model swapped, outputs to review)",
  },
] as const;

export const DEFAULT_COMPARE_EXAMPLE_ID: string = COMPARE_EXAMPLES[0].run.id;
