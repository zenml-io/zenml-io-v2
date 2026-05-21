/**
 * checkpoints-data.ts — static data for CheckpointsLayout (artboard A3P-0).
 *
 * The Checkpoints tab shows a single selected run (report_agent) and its
 * EXECUTION TIMELINE with 8 circular nodes, a dashed rate-limit arc between
 * the failure node and the resume node, plus a paired failure card and
 * resume card. All data transcribed verbatim from the Paper artboard.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type RunStatus = "RESUMED" | "IDLE" | "ACTIVE" | "PAUSED";

export type RunRow = {
  /** Single uppercase letter badge */
  letter: string;
  /** Agent/flow name shown in the row */
  name: string;
  /** Mono subtitle: ex_XXXX · N ckpt · Xm Xs */
  subtitle: string;
  /** Status pill */
  status: RunStatus;
  /** Whether this row is the pre-selected one */
  selected: boolean;
};

export type TimelineNode = {
  /** Label below the node */
  label: string;
  /** Duration or count label below the label */
  duration: string;
  /**
   * Visual type of the node:
   *   "done"    — filled orange-400 circle with orange-700 border
   *   "failure" — red-50 bg, red border, red ✕ icon (larger, 18px)
   *   "resume"  — orange-400 bg, orange-700 border, white play icon (larger, 18px)
   *   "hollow"  — white bg, orange-700 border (standard 14px)
   *   "pending" — white bg, orange-700 border, reduced opacity (14px)
   */
  kind: "done" | "failure" | "resume" | "hollow" | "pending";
  /**
   * Whether the dashed arc starts here (failure node) or ends here (resume node).
   */
  arcStart?: boolean;
  arcEnd?: boolean;
};

export type FailureCard = {
  title: string;
  timestamp: string;
  body: string;
};

export type ResumeCard = {
  title: string;
  timestamp: string;
  cliCommand: string;
  savings: {
    /** Highlighted token — e.g. "47s" */
    savedTime: string;
    /** Highlighted token — e.g. "2 LLM calls" */
    callsSkipped: string;
  };
};

export type CheckpointsFooter = {
  runId: string;
  checkpointsLabel: string;
  duration: string;
  statusDot: "resumed" | "running" | "completed";
  statusLabel: string;
};

export type CheckpointsData = {
  /** Left pane header */
  leftHeader: {
    title: string;
    subtitle: string;
    countLabel: string;
  };
  /** Left pane run rows */
  runs: ReadonlyArray<RunRow>;
  /** Right pane header */
  rightEyebrow: string;
  rightTitle: string;
  contextChip: string;
  /** Timeline section heading */
  timelineLabel: string;
  /** Legend items */
  legend: ReadonlyArray<{ label: string; kind: "dot-orange" | "dot-red-sq" | "arrow-orange" }>;
  /** Circular-node track */
  nodes: ReadonlyArray<TimelineNode>;
  /** arc label */
  arcLabel: string;
  /** Below-timeline cards */
  failureCard: FailureCard;
  resumeCard: ResumeCard;
  /** Footer meta strip */
  footer: CheckpointsFooter;
};

// ─── Data ────────────────────────────────────────────────────────────────────

export const CHECKPOINTS_DATA: CheckpointsData = {
  leftHeader: {
    title: "RECENT RUNS",
    subtitle: "5 active · 12 paused",
    countLabel: "17 total",
  },

  runs: [
    {
      letter: "R",
      name: "report_agent",
      subtitle: "ex_8a2f · 6 ckpt · 38m 12s",
      status: "RESUMED",
      selected: true,
    },
    {
      letter: "L",
      name: "lead_qualifier",
      subtitle: "ex_4c1d · 4 ckpt · 12m 04s",
      status: "IDLE",
      selected: false,
    },
    {
      letter: "D",
      name: "doc_summarizer",
      subtitle: "ex_9b3e · 9 ckpt · 1h 02m",
      status: "ACTIVE",
      selected: false,
    },
    {
      letter: "I",
      name: "invoice_router",
      subtitle: "ex_2d5a · 5 ckpt · 24m 47s",
      status: "PAUSED",
      selected: false,
    },
    {
      letter: "O",
      name: "onboarding_bot",
      subtitle: "ex_7e6b · 7 ckpt · 03m 28s",
      status: "ACTIVE",
      selected: false,
    },
  ],

  rightEyebrow: "EXECUTION CHECKPOINTS",
  rightTitle: "Resume from any checkpoint after a crash, rate-limit, or eviction.",
  contextChip: "report_agent · ex_8a2f",

  timelineLabel: "EXECUTION TIMELINE",

  legend: [
    { label: "checkpoint", kind: "dot-orange" },
    { label: "failure",    kind: "dot-red-sq" },
    { label: "resume",     kind: "arrow-orange" },
  ],

  /**
   * 8 nodes left-to-right matching the artboard track.
   * Positions are evenly distributed across the track width (justify-between).
   *
   * Node order (verbatim from artboard labels):
   *   gather 12s | llm.outline 33s | chkpt.notes 0.4s | llm.write 1m 14s |
   *   resumed +11s | draft 42s | chkpt.draft 0.3s | persist queued
   */
  nodes: [
    { label: "gather",      duration: "12s",    kind: "hollow" },
    { label: "llm.outline", duration: "33s",    kind: "hollow" },
    { label: "chkpt.notes", duration: "0.4s",   kind: "done",    arcStart: false },
    { label: "llm.write",   duration: "1m 14s", kind: "failure", arcStart: true },
    { label: "resumed",     duration: "+11s",   kind: "resume",  arcEnd: true },
    { label: "draft",       duration: "42s",    kind: "hollow" },
    { label: "chkpt.draft", duration: "0.3s",   kind: "hollow" },
    { label: "persist",     duration: "queued", kind: "pending" },
  ],

  arcLabel: "rate-limit",

  failureCard: {
    title: "429 RATE-LIMIT",
    timestamp: "↗ at 1m 14s",
    body: "openai api · llm.write",
  },

  resumeCard: {
    title: "RESUMED FROM CHECKPOINT 3",
    timestamp: "14:02:59",
    cliCommand: "kitaru flow resume ex_8a2f --from chkpt.notes",
    savings: {
      savedTime:    "47s",
      callsSkipped: "2 LLM calls",
    },
  },

  footer: {
    runId:             "ex_8a2f",
    checkpointsLabel:  "6 checkpoints",
    duration:          "38m 12s",
    statusDot:         "resumed",
    statusLabel:       "resumed",
  },
} as const;
