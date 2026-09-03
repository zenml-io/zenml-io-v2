/**
 * cohorts-data.ts — static data for CohortsLayout.
 *
 * A cohort is the sessions that matter, frozen as a named set. It is
 * immutable, so a run's result keeps meaning what it meant. The tab shows
 * one selected cohort (`checkout-flow`) and where it came from: you read
 * twenty sessions, your coding agent turned your notes into cohorts and an
 * evaluator, and the set was frozen.
 *
 * Numbers are frozen against the landing page — Hero ("your notes, 20 read
 * → 1 evaluator, 3 cohorts"), ScenarioStrip ("20 read · not 1,824") and
 * Features (`kitaru cohort create "checkout-flow"`). The 90-session count
 * matches the Compare tab, which replays this same cohort.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type CohortRow = {
  /** Single uppercase letter badge. */
  letter: string;
  /** Cohort name, as passed to `kitaru cohort create`. */
  name: string;
  /** Mono subtitle: session count. */
  subtitle: string;
  /** Status pill — IMMUTABLE once frozen, DRAFT while still being cut. */
  status: "IMMUTABLE" | "DRAFT";
  /** Whether this row is the pre-selected one. */
  selected: boolean;
};

/**
 * One node on the derivation track — how 1,824 imported sessions became a
 * named, frozen set.
 *
 *   "done"    — filled orange-400 circle with orange-700 border
 *   "hollow"  — white bg, orange-700 border
 */
export type DerivationNode = {
  /** Label below the node — e.g. "20 read". */
  label: string;
  /** Second line below the label — e.g. "not 1,824". */
  detail: string;
  kind: "done" | "hollow";
};

export type MemberChip = {
  /** Session id, or the "+85 more" overflow chip. */
  label: string;
  /** Overflow chips render muted and carry no readiness dot. */
  overflow?: boolean;
};

export type ImmutableCard = {
  title: string;
  timestamp: string;
  body: string;
};

export type CreatedFromCard = {
  title: string;
  timestamp: string;
  cliCommand: string;
  /** Two highlighted tokens in the summary line under the command. */
  summary: {
    evaluator: string;
    sessionCount: string;
  };
};

export type CohortsFooter = {
  cohortName: string;
  sessionsLabel: string;
  frozenLabel: string;
  statusLabel: string;
};

export type CohortsData = {
  /** Left pane header. */
  leftHeader: {
    title: string;
    subtitle: string;
    countLabel: string;
  };
  /** Left pane cohort rows. */
  cohorts: ReadonlyArray<CohortRow>;
  /** Right pane header. */
  rightEyebrow: string;
  rightTitle: string;
  contextChip: string;
  /** Derivation section heading. */
  derivationLabel: string;
  /** Legend items. */
  legend: ReadonlyArray<{
    label: string;
    kind: "dot-orange" | "dot-hollow";
  }>;
  /** The derivation track. */
  nodes: ReadonlyArray<DerivationNode>;
  /** Heading above the member-session chips. */
  membersLabel: string;
  members: ReadonlyArray<MemberChip>;
  /** Below-derivation cards. */
  immutableCard: ImmutableCard;
  createdFromCard: CreatedFromCard;
  /** Footer meta strip. */
  footer: CohortsFooter;
};

// ─── Data ────────────────────────────────────────────────────────────────────

export const COHORTS_DATA: CohortsData = {
  leftHeader: {
    title: "COHORTS",
    subtitle: "3 cut from 20 read",
    countLabel: "3 total",
  },

  cohorts: [
    {
      letter: "D",
      name: "dropped-the-hazmat-flag",
      subtitle: "9 sessions",
      status: "IMMUTABLE",
      selected: false,
    },
    {
      letter: "C",
      name: "checkout-flow",
      subtitle: "90 sessions",
      status: "IMMUTABLE",
      selected: true,
    },
    {
      letter: "E",
      name: "escalations-q3",
      subtitle: "41 sessions",
      status: "IMMUTABLE",
      selected: false,
    },
  ],

  rightEyebrow: "COHORT COMPOSITION",
  rightTitle:
    "The sessions that matter, frozen as a named set, so results keep meaning what they meant.",
  contextChip: "checkout-flow · immutable",

  derivationLabel: "FROM YOUR NOTES",

  legend: [
    { label: "your judgment", kind: "dot-orange" },
    { label: "the agent's work", kind: "dot-hollow" },
  ],

  /**
   * Four nodes left to right, matching the landing's arc: everything the
   * import found, the twenty you actually read, the cohorts your notes cut,
   * and the evaluator that came out of the same reading.
   */
  nodes: [
    { label: "1,824 imported", detail: "sessions", kind: "hollow" },
    { label: "20 read", detail: "by you", kind: "done" },
    { label: "3 cohorts", detail: "from your notes", kind: "hollow" },
    { label: "1 evaluator", detail: "hazmat-flag-preserved", kind: "hollow" },
  ],

  membersLabel: "MEMBER SESSIONS",

  members: [
    { label: "ses_8f3a91c2" },
    { label: "ses_4c1d77e0" },
    { label: "ses_2d5a08c4" },
    { label: "ses_1a90cc7b" },
    { label: "ses_66df2e14" },
    { label: "+85 more", overflow: true },
  ],

  immutableCard: {
    title: "IMMUTABLE",
    timestamp: "frozen 12 Jul",
    body: "90 sessions, fixed. Add sessions and you have made a new cohort, not edited this one.",
  },

  createdFromCard: {
    title: "CREATED FROM YOUR READING",
    timestamp: "12 Jul",
    cliCommand: 'kitaru cohort create "checkout-flow"',
    summary: {
      evaluator: "hazmat-flag-preserved",
      sessionCount: "90 sessions",
    },
  },

  footer: {
    cohortName: "checkout-flow",
    sessionsLabel: "90 sessions",
    frozenLabel: "frozen 12 Jul",
    statusLabel: "immutable",
  },
} as const;
