/**
 * Four Kitaru replay examples for the TwoWorkspaces > Replay tab.
 *
 * The Replay tab shows a RECORDED VS REPLAY comparison — the left list holds
 * one production recording plus three replays of it, each with one thing
 * changed. Selecting a row swaps the right comparison panel. The right panel
 * is kept deliberately lean: an aggregate metric diff + a verdict strip (no
 * per-step breakdown table — the aggregate metrics tell the story).
 *
 * The set tells the investigation arc from the Kitaru journey docs
 * (support-agent, refund tool 5xx) plus one everyday counterfactual:
 *   1. fix·v2.3   — the repaired code, verified on all 23 matching failures
 *                    → WINNER (selected by default)
 *   2. fork·tool  — the diagnostic fork: refund tool stubbed healthy → fault
 *                    isolated in the agent's 5xx handling
 *   3. swap·flash — the everyday counterfactual: same executions on a
 *                    cheaper model
 *   4. tr-8f3a    — the immutable production recording every replay runs
 *                    against → BASELINE
 */

/** Visual tone of the left-list status pill. */
export type ReplayPillTone = "winner" | "candidate" | "baseline";

/** One row in the left REPLAY list. */
export type ReplayVariant = {
  /** Stable slug used as `data-active-example` value. */
  id: string;
  /** Letter shown in the badge (always "R" for replay in this flow). */
  rowLetter: string;
  /** Short version label — e.g. "fix·v2.3". */
  versionLabel: string;
  /** One-line descriptor shown below the version label (mono). */
  descriptor: string;
  /** Status pill shown on the right edge of the row. */
  statusPill: {
    label: "WINNER" | "CANDIDATE" | "BASELINE";
    tone: ReplayPillTone;
  };
};

/** A single aggregate metric row in the comparison panel. */
export type ReplayMetric = {
  label: string; // e.g. "ESCALATED"
  baseline: string; // e.g. "0 / 23"
  candidate: string; // e.g. "21 / 23"
  /** null when there is no meaningful delta (e.g. same count). */
  delta: string | null; // e.g. "−37%" or null
  /** Qualifier beneath delta badge — e.g. "faster", "cheaper". Omit when delta is null. */
  deltaQualifier?: string;
};

/** The full right-pane comparison panel shown for a selected variant. */
export type ReplayComparison = {
  /** Eyebrow title of the right pane — always "RECORDED VS REPLAY". */
  eyebrow: string;
  /** Headline sentence — e.g. "Replay the fix against the 23 recorded failures." */
  headline: string;
  /** Context chip text — e.g. "23 executions · repeats ×3". */
  contextChip: string;
  /** Left (recorded) half of the metric panel. */
  baselineLabel: string; // "RECORDED"
  baselineName: string; // e.g. "v2.2 — production recordings"
  /** Right (replay) half of the metric panel. */
  candidateLabel: string; // "REPLAY"
  candidateName: string; // e.g. "v2.3 — fix: escalate on 5xx"
  metrics: ReadonlyArray<ReplayMetric>;
  /** Verdict strip copy. */
  shipHeadline: string; // e.g. "PASS — merge the fix."
  shipSubline: string; // e.g. "21 / 23 escalate correctly · guards every PR."
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
    /* (1) WINNER — the repaired code, ratified on every matching failure.
     *     The close of the investigation: 23 recorded executions carrying the
     *     same failure signature, replayed against the fixed handler. */
    variant: {
      id: "fix_v2_3",
      rowLetter: "R",
      versionLabel: "fix·v2.3",
      descriptor: "retry once, then escalate",
      statusPill: { label: "WINNER", tone: "winner" },
    },
    comparison: {
      eyebrow: "RECORDED VS REPLAY",
      headline: "Replay the fix against the 23 recorded failures.",
      contextChip: "23 executions · repeats ×3",
      baselineLabel: "RECORDED",
      baselineName: "v2.2 — production recordings",
      candidateLabel: "REPLAY",
      candidateName: "v2.3 — fix: escalate on 5xx",
      metrics: [
        {
          label: "EXECUTIONS",
          baseline: "23",
          candidate: "23",
          delta: null,
          deltaQualifier: "same",
        },
        {
          label: "ESCALATED CORRECTLY",
          baseline: "0 / 23",
          candidate: "21 / 23",
          delta: "+21",
          deltaQualifier: "fixed",
        },
        {
          label: "COST / RUN",
          baseline: "$0.14",
          candidate: "$0.12",
          delta: "−11%",
          deltaQualifier: "cheaper",
        },
        {
          label: "PROTECTIONS TRIPPED",
          baseline: "—",
          candidate: "0",
          delta: null,
          deltaQualifier: "held",
        },
      ],
      shipHeadline: "PASS — merge the fix.",
      shipSubline:
        "21 / 23 escalate correctly · 0 forbidden regressions · the experiment now guards every PR.",
    },
    sourceCitation:
      "kitaru journey docs — refund-error-handling experiment, batch ratification",
  },
  {
    /* (2) CANDIDATE — the diagnostic fork. Swap the failing tool for a
     *     healthy stub: if the agent recovers, the bug is the agent's
     *     error handling, not the tool. One fork isolates the fault. */
    variant: {
      id: "fork_tool",
      rowLetter: "R",
      versionLabel: "fork·tool",
      descriptor: "tools: refund → stub_ok",
      statusPill: { label: "CANDIDATE", tone: "candidate" },
    },
    comparison: {
      eyebrow: "RECORDED VS REPLAY",
      headline: "Fork at the failing tool call — is it the tool or the agent?",
      contextChip: "1 execution · repeats ×10",
      baselineLabel: "RECORDED",
      baselineName: "tr-8f3a91c2 — recorded failure",
      candidateLabel: "REPLAY",
      candidateName: "fork — refund tool stubbed healthy",
      metrics: [
        {
          label: "RESOLVED",
          baseline: "0 / 10",
          candidate: "10 / 10",
          delta: "+10",
          deltaQualifier: "recovers",
        },
        {
          label: "“TRY AGAIN LATER”",
          baseline: "10",
          candidate: "0",
          delta: "−10",
          deltaQualifier: "gone",
        },
        {
          label: "TOOL RETRIES",
          baseline: "6",
          candidate: "0",
          delta: "−6",
          deltaQualifier: "none",
        },
        {
          label: "DURATION",
          baseline: "78s",
          candidate: "12s",
          delta: "−85%",
          deltaQualifier: "faster",
        },
      ],
      shipHeadline: "Fault isolated.",
      shipSubline:
        "With a healthy tool the agent resolves every time · the bug is the 5xx handling, not the tool.",
    },
    sourceCitation:
      "kitaru journey docs — checkpoint fork with tool override, attempt 2",
  },
  {
    /* (3) CANDIDATE — the everyday counterfactual: same recorded executions,
     *     replayed on a cheaper model. The recording answers the tools, so
     *     the only variable is the model. */
    variant: {
      id: "swap_flash",
      rowLetter: "R",
      versionLabel: "swap·flash",
      descriptor: "model: gemini-flash",
      statusPill: { label: "CANDIDATE", tone: "candidate" },
    },
    comparison: {
      eyebrow: "RECORDED VS REPLAY",
      headline: "Same 200 executions, replayed on a cheaper model.",
      contextChip: "200 executions · 12m total",
      baselineLabel: "RECORDED",
      baselineName: "production — gpt-5.4",
      candidateLabel: "REPLAY",
      candidateName: "replay — gemini-flash",
      metrics: [
        {
          label: "EXECUTIONS",
          baseline: "200",
          candidate: "200",
          delta: null,
          deltaQualifier: "same",
        },
        {
          label: "OUTPUTS IDENTICAL",
          baseline: "—",
          candidate: "192 / 200",
          delta: "8",
          deltaQualifier: "to review",
        },
        {
          label: "COST",
          baseline: "$210",
          candidate: "$34",
          delta: "−84%",
          deltaQualifier: "cheaper",
        },
        {
          label: "LATENCY P95",
          baseline: "1.9s",
          candidate: "1.1s",
          delta: "−42%",
          deltaQualifier: "faster",
        },
      ],
      shipHeadline: "Ship the swap.",
      shipSubline:
        "192 / 200 identical answers at a sixth of the cost · review the 8 diverging runs first.",
    },
    sourceCitation:
      "kitaru/examples/llm/flow_with_llm.py — model-swap replay batch",
  },
  {
    /* (4) BASELINE — the immutable production recording itself. Every replay
     *     above runs against this frozen world. */
    variant: {
      id: "tr_8f3a",
      rowLetter: "R",
      versionLabel: "tr-8f3a",
      descriptor: "recorded · refund 502",
      statusPill: { label: "BASELINE", tone: "baseline" },
    },
    comparison: {
      eyebrow: "RECORDED VS REPLAY",
      headline: "The recorded execution — the world every replay runs against.",
      contextChip: "recorded Jul 13 · 8 checkpoints",
      baselineLabel: "RECORDED",
      baselineName: "tr-8f3a91c2 — production recording",
      candidateLabel: "REPLAY",
      candidateName: "select a replay to compare",
      metrics: [
        {
          label: "CHECKPOINTS",
          baseline: "8",
          candidate: "8",
          delta: null,
          deltaQualifier: "same",
        },
        {
          label: "TOOL CALLS",
          baseline: "4",
          candidate: "4",
          delta: null,
          deltaQualifier: "same",
        },
        {
          label: "COST",
          baseline: "$0.14",
          candidate: "$0.14",
          delta: null,
          deltaQualifier: "same",
        },
        {
          label: "STATUS",
          baseline: "failed",
          candidate: "failed",
          delta: null,
          deltaQualifier: "same",
        },
      ],
      shipHeadline: "Immutable recording.",
      shipSubline:
        "Every model and tool call captured · replay forks from any checkpoint · pick a replay above.",
    },
    sourceCitation:
      "kitaru journey docs — imported execution tr-8f3a91c2 (ticket 48211)",
  },
] as const;

export const DEFAULT_REPLAY_EXAMPLE_ID: string = REPLAY_EXAMPLES[0].variant.id;
