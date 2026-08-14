/**
 * Five recorded Kitaru sessions for the TwoWorkspaces > Sessions tab.
 *
 * Each run of a wrapped agent records as a session, and that recording is
 * what replay reads back. Sessions arrive two ways — imported from traces
 * you already have (`kitaru session import`) or captured live by the
 * adapter — and Kitaru grades each one READY, PARTIAL or UNAVAILABLE at
 * import so you know before you rely on it.
 *
 * The five were chosen to show all three readiness grades and both import
 * paths:
 *   1. ses_8f3a91c2 — intake-agent, fully recorded (the landing's session)
 *   2. ses_4c1d77e0 — intake-agent, captured live by the adapter
 *   3. ses_9b3e21af — checkout-agent, PARTIAL: one tool result never logged
 *   4. ses_2d5a08c4 — support-agent, imported and complete
 *   5. ses_7e6b33d1 — checkout-agent, UNAVAILABLE: only the reply survived
 *
 * Each session owns its own checkpoint spine so the right pane swaps fully
 * when a row is clicked. The spine's nodes match the landing ScenarioStrip
 * (run → lookup_order → retrieve → model_request → reply); `leftPct` /
 * `widthPct` place each span on the session's own 0% → 100% axis, labelled
 * by `axisTicks`.
 */

/** What a span on the checkpoint spine represents. */
export type SpanType = "session" | "model" | "tool" | "checkpoint";

/** Whether the recording carries enough to replay this span. */
export type SpanState = "recorded" | "partial" | "unavailable";

export type TimelineSpan = {
  name: string;
  type: SpanType;
  durationLabel: string;
  state: SpanState;
  leftPct: number;
  widthPct: number;
  parent?: boolean;
};

export type Timeline = {
  spans: ReadonlyArray<TimelineSpan>;
  axisTicks: ReadonlyArray<string>;
  /** Bottom-right readiness chip — e.g. "READY · 5 checkpoints". The status
   *  dot is rendered by the layout, so the label carries no bullet. */
  readinessLabel: string;
};

/** The grade Kitaru assigns a session at import. */
export type ReadinessGrade = "READY" | "PARTIAL" | "UNAVAILABLE";

export type SessionExample = {
  /** Stable slug used as `data-active-example` value — the session id. */
  id: string;
  /** Uppercase letter shown in the row badge. */
  rowLetter: string;
  /** Session id, shown as the row label (mono). */
  rowLabel: string;
  rowSubtitle: string;
  /** Readiness grade — drives the row pill and the footer chip. */
  readiness: ReadinessGrade;
  /** Top-right chip in the right pane — e.g. "intake-agent · 12 Jul". */
  contextChip: string;
  /** Title shown in the import-card titlebar. */
  importFilename: string;
  /**
   * How this session entered Kitaru, as a terminal transcript. First line is
   * the command (or the adapter call); the arrow lines are what came back.
   */
  importLines: ReadonlyArray<{ kind: "cmd" | "out"; text: string }>;
  timeline: Timeline;
  /** Bottom-of-right-pane meta strip. */
  footerMeta: string;
};

/* ---------------------------------------------------------------------- */
/* Examples                                                                */
/*                                                                         */
/*   Node names come from the landing ScenarioStrip's recorded session;    */
/*   agents that do different work get their own tool names. Nothing is    */
/*   invented beyond what the adapter would actually record.               */
/* ---------------------------------------------------------------------- */

export const SESSION_EXAMPLES: ReadonlyArray<SessionExample> = [
  {
    /* (1) The landing's session — every model and tool call recorded, so
     *     replay can read the whole run back. Default selection. */
    id: "ses_8f3a91c2",
    rowLetter: "I",
    rowLabel: "ses_8f3a91c2",
    rowSubtitle: "intake-agent · imported",
    readiness: "READY",
    contextChip: "intake-agent · 12 Jul",
    importFilename: "import · intake-agent",
    importLines: [
      {
        kind: "cmd",
        text: "kitaru session import ./traces.jsonl --agent intake-agent",
      },
      { kind: "out", text: "→ 1,824 sessions read" },
      { kind: "out", text: "→ 1,712 READY · 94 PARTIAL · 18 UNAVAILABLE" },
      { kind: "out", text: "→ ses_8f3a91c2 · 5 checkpoints · READY" },
    ],
    timeline: {
      spans: [
        {
          name: "ses_8f3a91c2",
          type: "session",
          durationLabel: "48s",
          state: "recorded",
          leftPct: 0,
          widthPct: 100,
          parent: true,
        },
        {
          name: "run",
          type: "checkpoint",
          durationLabel: "start",
          state: "recorded",
          leftPct: 0,
          widthPct: 0.5,
        },
        {
          name: "lookup_order",
          type: "tool",
          durationLabel: "6s",
          state: "recorded",
          leftPct: 0.5,
          widthPct: 12.5,
        },
        {
          name: "retrieve",
          type: "tool",
          durationLabel: "11s",
          state: "recorded",
          leftPct: 13,
          widthPct: 23,
        },
        {
          name: "model_request",
          type: "model",
          durationLabel: "28s",
          state: "recorded",
          leftPct: 36,
          widthPct: 58.5,
        },
        {
          name: "reply",
          type: "checkpoint",
          durationLabel: "3s",
          state: "recorded",
          leftPct: 94.5,
          widthPct: 5.5,
        },
      ],
      axisTicks: ["0s", "12s", "24s", "36s", "48s"],
      readinessLabel: "READY · 5 checkpoints",
    },
    footerMeta:
      "imported from ./traces.jsonl · every call recorded · replayable",
  },
  {
    /* (2) Captured live — same agent, no import step. The adapter wrote the
     *     session as the run happened. */
    id: "ses_4c1d77e0",
    rowLetter: "I",
    rowLabel: "ses_4c1d77e0",
    rowSubtitle: "intake-agent · live",
    readiness: "READY",
    contextChip: "intake-agent · 12 Jul",
    importFilename: "capture · intake-agent",
    importLines: [
      { kind: "cmd", text: "agent = KitaruAgent(intake_agent)" },
      { kind: "out", text: "→ recording ses_4c1d77e0" },
      { kind: "out", text: "→ 2 tool calls · 1 model call captured" },
      { kind: "out", text: "→ ses_4c1d77e0 · 5 checkpoints · READY" },
    ],
    timeline: {
      spans: [
        {
          name: "ses_4c1d77e0",
          type: "session",
          durationLabel: "36s",
          state: "recorded",
          leftPct: 0,
          widthPct: 100,
          parent: true,
        },
        {
          name: "run",
          type: "checkpoint",
          durationLabel: "start",
          state: "recorded",
          leftPct: 0,
          widthPct: 0.5,
        },
        {
          name: "lookup_order",
          type: "tool",
          durationLabel: "4s",
          state: "recorded",
          leftPct: 0.5,
          widthPct: 11,
        },
        {
          name: "retrieve",
          type: "tool",
          durationLabel: "8s",
          state: "recorded",
          leftPct: 11.5,
          widthPct: 22,
        },
        {
          name: "model_request",
          type: "model",
          durationLabel: "21s",
          state: "recorded",
          leftPct: 33.5,
          widthPct: 58,
        },
        {
          name: "reply",
          type: "checkpoint",
          durationLabel: "3s",
          state: "recorded",
          leftPct: 91.5,
          widthPct: 8.5,
        },
      ],
      axisTicks: ["0s", "9s", "18s", "27s", "36s"],
      readinessLabel: "READY · 5 checkpoints",
    },
    footerMeta:
      "captured live by the adapter · every call recorded · replayable",
  },
  {
    /* (3) PARTIAL — the trace carries the call but not the tool's result, so
     *     replay can reach that node and no further. Graded at import. */
    id: "ses_9b3e21af",
    rowLetter: "C",
    rowLabel: "ses_9b3e21af",
    rowSubtitle: "checkout-agent · 4 of 5",
    readiness: "PARTIAL",
    contextChip: "checkout-agent · 11 Jul",
    importFilename: "import · checkout-agent",
    importLines: [
      {
        kind: "cmd",
        text: "kitaru session import ./traces.jsonl --agent checkout-agent",
      },
      { kind: "out", text: "→ 612 sessions read" },
      { kind: "out", text: "→ ses_9b3e21af · price_quote result missing" },
      { kind: "out", text: "→ ses_9b3e21af · 4 of 5 recorded · PARTIAL" },
    ],
    timeline: {
      spans: [
        {
          name: "ses_9b3e21af",
          type: "session",
          durationLabel: "41s",
          state: "partial",
          leftPct: 0,
          widthPct: 100,
          parent: true,
        },
        {
          name: "run",
          type: "checkpoint",
          durationLabel: "start",
          state: "recorded",
          leftPct: 0,
          widthPct: 0.5,
        },
        {
          name: "lookup_cart",
          type: "tool",
          durationLabel: "5s",
          state: "recorded",
          leftPct: 0.5,
          widthPct: 12,
        },
        {
          name: "price_quote",
          type: "tool",
          durationLabel: "no result",
          state: "partial",
          leftPct: 12.5,
          widthPct: 19,
        },
        {
          name: "model_request",
          type: "model",
          durationLabel: "30s",
          state: "recorded",
          leftPct: 31.5,
          widthPct: 62,
        },
        {
          name: "reply",
          type: "checkpoint",
          durationLabel: "2s",
          state: "recorded",
          leftPct: 93.5,
          widthPct: 6.5,
        },
      ],
      axisTicks: ["0s", "10s", "20s", "30s", "41s"],
      readinessLabel: "PARTIAL · 4 of 5 recorded",
    },
    footerMeta:
      "imported from ./traces.jsonl · price_quote result missing · replays to that node",
  },
  {
    /* (4) A second complete import, different agent — shows the spine is the
     *     agent's own tools, not a fixed shape. */
    id: "ses_2d5a08c4",
    rowLetter: "S",
    rowLabel: "ses_2d5a08c4",
    rowSubtitle: "support-agent · imported",
    readiness: "READY",
    contextChip: "support-agent · 11 Jul",
    importFilename: "import · support-agent",
    importLines: [
      {
        kind: "cmd",
        text: "kitaru session import ./traces.jsonl --agent support-agent",
      },
      { kind: "out", text: "→ 438 sessions read" },
      { kind: "out", text: "→ 431 READY · 7 PARTIAL" },
      { kind: "out", text: "→ ses_2d5a08c4 · 5 checkpoints · READY" },
    ],
    timeline: {
      spans: [
        {
          name: "ses_2d5a08c4",
          type: "session",
          durationLabel: "1m 04s",
          state: "recorded",
          leftPct: 0,
          widthPct: 100,
          parent: true,
        },
        {
          name: "run",
          type: "checkpoint",
          durationLabel: "start",
          state: "recorded",
          leftPct: 0,
          widthPct: 0.5,
        },
        {
          name: "lookup_order",
          type: "tool",
          durationLabel: "9s",
          state: "recorded",
          leftPct: 0.5,
          widthPct: 14,
        },
        {
          name: "search_docs",
          type: "tool",
          durationLabel: "17s",
          state: "recorded",
          leftPct: 14.5,
          widthPct: 26.5,
        },
        {
          name: "model_request",
          type: "model",
          durationLabel: "34s",
          state: "recorded",
          leftPct: 41,
          widthPct: 53,
        },
        {
          name: "reply",
          type: "checkpoint",
          durationLabel: "4s",
          state: "recorded",
          leftPct: 94,
          widthPct: 6,
        },
      ],
      axisTicks: ["0s", "16s", "32s", "48s", "1m 04s"],
      readinessLabel: "READY · 5 checkpoints",
    },
    footerMeta:
      "imported from ./traces.jsonl · every call recorded · replayable",
  },
  {
    /* (5) UNAVAILABLE — the trace kept the final answer and nothing else.
     *     Kitaru says so at import rather than replaying a fiction. */
    id: "ses_7e6b33d1",
    rowLetter: "C",
    rowLabel: "ses_7e6b33d1",
    rowSubtitle: "checkout-agent · 1 of 5",
    readiness: "UNAVAILABLE",
    contextChip: "checkout-agent · 10 Jul",
    importFilename: "import · checkout-agent",
    importLines: [
      {
        kind: "cmd",
        text: "kitaru session import ./traces.jsonl --agent checkout-agent",
      },
      { kind: "out", text: "→ 612 sessions read" },
      { kind: "out", text: "→ ses_7e6b33d1 · no tool or model calls in trace" },
      { kind: "out", text: "→ ses_7e6b33d1 · reply only · UNAVAILABLE" },
    ],
    timeline: {
      spans: [
        {
          name: "ses_7e6b33d1",
          type: "session",
          durationLabel: "unknown",
          state: "unavailable",
          leftPct: 0,
          widthPct: 100,
          parent: true,
        },
        {
          name: "run",
          type: "checkpoint",
          durationLabel: "start",
          state: "recorded",
          leftPct: 0,
          widthPct: 0.5,
        },
        {
          name: "lookup_cart",
          type: "tool",
          durationLabel: "not recorded",
          state: "unavailable",
          leftPct: 0.5,
          widthPct: 22,
        },
        {
          name: "price_quote",
          type: "tool",
          durationLabel: "not recorded",
          state: "unavailable",
          leftPct: 22.5,
          widthPct: 22,
        },
        {
          name: "model_request",
          type: "model",
          durationLabel: "not recorded",
          state: "unavailable",
          leftPct: 44.5,
          widthPct: 44,
        },
        {
          name: "reply",
          type: "checkpoint",
          durationLabel: "text only",
          state: "partial",
          leftPct: 88.5,
          widthPct: 11.5,
        },
      ],
      axisTicks: ["run", "tool", "tool", "model", "reply"],
      readinessLabel: "UNAVAILABLE · reply only",
    },
    footerMeta:
      "imported from ./traces.jsonl · no calls in the trace · cannot be replayed",
  },
] as const;

export const DEFAULT_SESSION_EXAMPLE_ID: string = SESSION_EXAMPLES[0].id;
