/**
 * Six agent SDKs for the FrameworksAgents subtab (TwoWorkspaces v2 · Kitaru).
 *
 * Each row is one agent SDK that Kitaru wraps with a single adapter import.
 * The harness stays exactly as you wrote it; the wrapper lands in a new
 * entrypoint file beside your code. The selected row drives the middle
 * column (KITARU ADDS — recorded session) and the right column (EVERY CALL
 * RECORDED — the session that run produced).
 *
 * The adapter set and the class names match the landing page's OneImport
 * section (`src/components/kitaru/OneImport.astro`), which is the source of
 * truth for what Kitaru actually ships:
 *   - PydanticAI:        kitaru.adapters.pydantic_ai      → KitaruAgent
 *   - OpenAI Agents SDK: kitaru.adapters.openai_agents    → KitaruRunner
 *   - Claude Agent SDK:  kitaru.adapters.claude_agent_sdk → KitaruClaudeRunner
 *   - Gemini:            kitaru.adapters.gemini           → KitaruGeminiInteractionsRunner
 *   - Google ADK:        kitaru.adapters.google_adk       → KitaruADKRunner
 *   - Your own loop:     any callable — the "bring your own loop" pattern
 *
 * The mini-Gantt shows one recorded session per SDK. The 6-span shape is
 * constant — run → model_request → tool call → checkpoint → model_request →
 * reply — but each SDK's calls take different time, so the timeline is
 * visibly distinct as you switch rows. `widthPct` is a percentage of that
 * session's own window (labelled by `axisTicks`); `leftPct` is chained by
 * `makeGantt` so spans abut with no gaps, keeping the derived summary
 * stripe faithful to the bars.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type GanttSpanKind =
  | "run"
  | "model_request"
  | "tool"
  | "checkpoint"
  | "reply";

export interface GanttSpan {
  /** Display name of the span. */
  name: string;
  kind: GanttSpanKind;
  /** Duration label shown in the LHS column. */
  durationLabel: string;
  /** Left offset as a percentage of the session window (0–100). */
  leftPct: number;
  /** Width as a percentage of the session window (0–100). */
  widthPct: number;
}

/** Middle-column capability tile (session / checkpoint / cohort / replay). */
export interface CapabilityTile {
  /** Short title, e.g. "session". */
  title: string;
  /** One-line description, e.g. "one recorded run". */
  desc: string;
  /** Inline SVG path(s) for the 14×14 icon. null = skip icon. */
  iconSvg: string | null;
}

/** Bottom chip row in the middle column. */
export interface UnderlyingRow {
  /** Row label — e.g. "PydanticAI" or "Model + tools". */
  label: string;
  /** Tag chips — e.g. ["typed deps", "tools", "output"]. */
  chips: string[];
}

export interface FrameworkAgentExample {
  /** Stable URL slug — matches the SDK name. */
  id: string;
  /**
   * Letter shown inside the 32×32 badge.
   * Artboard uses real brand mark SVGs; we fall back to a single letter
   * for portability. Brand colors only live inside the badge — nowhere else.
   */
  rowLetter: string;
  /** SDK name — shown as the row label. */
  rowLabel: string;
  /** The SDK's primary entry-point / invocation pattern. */
  rowSubtitle: string;
  /** Brand-color hex for the badge background (unselected state only). */
  badgeBg: string;
  /** Brand-color hex for the letter text (unselected state only). */
  badgeColor: string;

  // ── Middle column: KITARU ADDS ──────────────────────────────────────
  /** The adapter chip label — e.g. "KitaruAgent(agent)". */
  kitaruChip: string;
  /** Harness name shown inside the recorded-session box (bottom row). */
  underlyingHarness: UnderlyingRow;
  /**
   * Per-SDK capability tiles inside the Kitaru runtime dashed box.
   * Always 4: session, checkpoint, cohort, replay.
   */
  capabilityTiles: [
    CapabilityTile,
    CapabilityTile,
    CapabilityTile,
    CapabilityTile,
  ];

  // ── Right column: EVERY CALL RECORDED ───────────────────────────────
  /** Session identifier shown in the column header. */
  sessionLabel: string;
  /** Mini-Gantt rows — 6 spans, distinct per SDK. */
  ganttSpans: GanttSpan[];
  /** Five axis tick labels for the session window, placed at 0/25/50/75/100%. */
  axisTicks: readonly [string, string, string, string, string];
  /** "with kitaru" comparison text. */
  withKitaruText: string;
  /** "without" comparison text (strikethrough). */
  withoutText: string;

  /** Honest "good fit" line — when this SDK + Kitaru is the right call. */
  goodFit: string;
  /** Honest "trade-off" line — the real cost / caveat of the integration. */
  tradeOff: string;

  /** Where the adapter and its class name are documented. Used for
   *  verification only — not displayed. */
  sourceCitation: string;
}

// ─── Capability tile icons (14×14 SVG path data, drawn to scale) ─────────────

/** Horizontal spine with nodes — used for "session". */
const ICON_SESSION_SVG = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1.5 7H12.5" stroke="#FB923C" stroke-width="1.4" stroke-linecap="round"/><circle cx="3" cy="7" r="1.6" fill="#FB923C"/><circle cx="7" cy="7" r="1.6" fill="#FB923C"/><circle cx="11" cy="7" r="1.6" fill="#FB923C"/></svg>`;

/** Checkmark — used for "checkpoint". */
const ICON_CHECKPOINT_SVG = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2.5 7.5L5.5 10.5L11.5 4" stroke="#C2410C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/** Bracketed set — used for "cohort". */
const ICON_COHORT_SVG = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M4.5 2.5H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h1.5M9.5 2.5H11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H9.5" stroke="#FB923C" stroke-width="1.3" stroke-linecap="round"/><circle cx="7" cy="7" r="1.6" fill="#FB923C"/></svg>`;

/** Circular arrow — used for "replay". */
const ICON_REPLAY_SVG = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M11.5 2.5A6 6 0 1 0 12 7" stroke="#C2410C" stroke-width="1.4" stroke-linecap="round"/><polyline points="10,2 12.5,2.5 12,5" stroke="#C2410C" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/** The four shared capability tiles — same for every SDK (Kitaru always
 *  adds these four regardless of which harness is wrapped). */
const SHARED_CAPABILITIES: [
  CapabilityTile,
  CapabilityTile,
  CapabilityTile,
  CapabilityTile,
] = [
  { title: "session", desc: "one recorded run", iconSvg: ICON_SESSION_SVG },
  {
    title: "checkpoint",
    desc: "every call, a node",
    iconSvg: ICON_CHECKPOINT_SVG,
  },
  { title: "cohort", desc: "sessions, frozen", iconSvg: ICON_COHORT_SVG },
  { title: "replay", desc: "one thing changed", iconSvg: ICON_REPLAY_SVG },
];

// ─── Gantt builder ────────────────────────────────────────────────────────────
// Each SDK gets its OWN recorded session. The 6-span shape is constant
// (run → model_request → tool → checkpoint → model_request → reply) but the
// call durations vary, so the mini-Gantt is visibly distinct as you switch
// harness rows.

/** The 6 fixed span kinds, in render order. */
const GANTT_KINDS: readonly GanttSpanKind[] = [
  "run",
  "model_request",
  "tool",
  "checkpoint",
  "model_request",
  "reply",
];

/** One SDK-specific span input — `leftPct` is derived, not supplied. */
interface GanttSpanInput {
  name: string;
  durationLabel: string;
  /** Width as a percentage of the session's own axis window (0–100). */
  widthPct: number;
}

/** Build a 6-span gantt, chaining `leftPct` so spans abut with no gaps. */
const makeGantt = (inputs: readonly GanttSpanInput[]): GanttSpan[] => {
  let left = 0;
  return inputs.map((input, i) => {
    const span: GanttSpan = {
      name: input.name,
      kind: GANTT_KINDS[i],
      durationLabel: input.durationLabel,
      leftPct: Math.round(left * 10) / 10,
      widthPct: input.widthPct,
    };
    left += input.widthPct;
    return span;
  });
};

// ─── Examples ────────────────────────────────────────────────────────────────

export const FRAMEWORK_AGENT_EXAMPLES: ReadonlyArray<FrameworkAgentExample> = [
  {
    /* (1) PydanticAI — the default / selected row, and the landing Hero's
     *     example: `agent = KitaruAgent(intake_agent)`. */
    id: "pydantic_ai",
    rowLetter: "P",
    rowLabel: "PydanticAI",
    rowSubtitle: "Agent(...)",
    badgeBg: "#FFDBBD", // warm peach
    badgeColor: "#9A3412",
    kitaruChip: "KitaruAgent(agent)",
    underlyingHarness: {
      label: "PydanticAI",
      chips: ["typed deps", "tools", "output"],
    },
    capabilityTiles: SHARED_CAPABILITIES,
    sessionLabel: "ses_8f3a91c2 · recorded",
    ganttSpans: makeGantt([
      { name: "run", durationLabel: "start", widthPct: 1.5 },
      { name: "model_request", durationLabel: "13s", widthPct: 26.0 },
      { name: "lookup_order", durationLabel: "6s", widthPct: 12.0 },
      { name: "checkpoint", durationLabel: "recorded", widthPct: 1.5 },
      { name: "model_request", durationLabel: "24s", widthPct: 48.0 },
      { name: "reply", durationLabel: "recorded", widthPct: 11.0 },
    ]),
    axisTicks: ["0s", "12s", "24s", "36s", "48s"],
    withKitaruText:
      "2 model calls and 1 tool call recorded · this session replays",
    withoutText: "one log line per run · nothing to replay",
    goodFit: "Typed agents where you want schema validation on every step.",
    tradeOff: "Adds a Pydantic dependency and some per-call overhead.",
    sourceCitation: "kitaru.adapters.pydantic_ai — KitaruAgent",
  },
  {
    /* (2) OpenAI Agents SDK — the Runner pattern, wrapped by KitaruRunner. */
    id: "openai_agents",
    rowLetter: "O",
    rowLabel: "OpenAI Agents SDK",
    rowSubtitle: "Runner.run",
    badgeBg: "#F7F7F7", // near-white
    badgeColor: "#101828",
    kitaruChip: "KitaruRunner(agent)",
    underlyingHarness: {
      label: "OpenAI Agents",
      chips: ["tools", "handoffs", "output"],
    },
    capabilityTiles: SHARED_CAPABILITIES,
    sessionLabel: "ses_7834ab10 · recorded",
    ganttSpans: makeGantt([
      { name: "run", durationLabel: "start", widthPct: 1.5 },
      { name: "model_request", durationLabel: "9s", widthPct: 22.0 },
      { name: "web_search", durationLabel: "11s", widthPct: 27.0 },
      { name: "checkpoint", durationLabel: "recorded", widthPct: 1.5 },
      { name: "model_request", durationLabel: "16s", widthPct: 39.0 },
      { name: "reply", durationLabel: "recorded", widthPct: 9.0 },
    ]),
    axisTicks: ["0s", "10s", "20s", "30s", "40s"],
    withKitaruText:
      "every handoff and tool call recorded · this session replays",
    withoutText: "one log line per run · nothing to replay",
    goodFit: "Multi-agent runs with handoffs via the Agents SDK Runner.",
    tradeOff: "Tied to OpenAI-hosted models and their rate limits.",
    sourceCitation: "kitaru.adapters.openai_agents — KitaruRunner",
  },
  {
    /* (3) Claude Agent SDK — the query/options pattern, wrapped by
     *     KitaruClaudeRunner with an options_factory. */
    id: "claude_agent_sdk",
    rowLetter: "C",
    rowLabel: "Claude Agent SDK",
    rowSubtitle: "query(...)",
    badgeBg: "#F7F7F7",
    badgeColor: "#101828",
    kitaruChip: "KitaruClaudeRunner(...)",
    underlyingHarness: {
      label: "Claude Agent SDK",
      chips: ["messages", "tools", "stream"],
    },
    capabilityTiles: SHARED_CAPABILITIES,
    sessionLabel: "ses_3019c4de · recorded",
    ganttSpans: makeGantt([
      { name: "run", durationLabel: "start", widthPct: 1.5 },
      { name: "model_request", durationLabel: "10s", widthPct: 19.5 },
      { name: "tool_use", durationLabel: "14s", widthPct: 27.0 },
      { name: "checkpoint", durationLabel: "recorded", widthPct: 1.5 },
      { name: "model_request", durationLabel: "22s", widthPct: 42.5 },
      { name: "reply", durationLabel: "recorded", widthPct: 8.0 },
    ]),
    axisTicks: ["0s", "13s", "26s", "39s", "52s"],
    withKitaruText: "every turn and tool block recorded · this session replays",
    withoutText: "one log line per run · nothing to replay",
    goodFit: "Long tool-use sessions with expensive context to rebuild.",
    tradeOff: "Checkpoints land between turns — mid-stream tokens aren't kept.",
    sourceCitation: "kitaru.adapters.claude_agent_sdk — KitaruClaudeRunner",
  },
  {
    /* (4) Gemini — the interactions runner. */
    id: "gemini",
    rowLetter: "G",
    rowLabel: "Gemini",
    rowSubtitle: "generate_content",
    badgeBg: "#F7F7F7",
    badgeColor: "#101828",
    kitaruChip: "KitaruGeminiInteractionsRunner(...)",
    underlyingHarness: {
      label: "Gemini",
      chips: ["interactions", "tools", "output"],
    },
    capabilityTiles: SHARED_CAPABILITIES,
    sessionLabel: "ses_2291f70b · recorded",
    ganttSpans: makeGantt([
      { name: "run", durationLabel: "start", widthPct: 1.5 },
      { name: "model_request", durationLabel: "7s", widthPct: 20.0 },
      { name: "retrieve", durationLabel: "9s", widthPct: 25.5 },
      { name: "checkpoint", durationLabel: "recorded", widthPct: 1.5 },
      { name: "model_request", durationLabel: "15s", widthPct: 42.5 },
      { name: "reply", durationLabel: "recorded", widthPct: 9.0 },
    ]),
    axisTicks: ["0s", "9s", "18s", "27s", "36s"],
    withKitaruText: "every interaction recorded · this session replays",
    withoutText: "one log line per run · nothing to replay",
    goodFit: "Gemini agents where the tool results are the expensive part.",
    tradeOff: "Interaction-level recording, so sub-call detail stays coarse.",
    sourceCitation: "kitaru.adapters.gemini — KitaruGeminiInteractionsRunner",
  },
  {
    /* (5) Google ADK — the ADK Runner, wrapped by KitaruADKRunner. */
    id: "google_adk",
    rowLetter: "A",
    rowLabel: "Google ADK",
    rowSubtitle: "Runner.run_async",
    badgeBg: "#F7F7F7",
    badgeColor: "#101828",
    kitaruChip: "KitaruADKRunner(runner)",
    underlyingHarness: {
      label: "Google ADK",
      chips: ["sessions", "tools", "events"],
    },
    capabilityTiles: SHARED_CAPABILITIES,
    sessionLabel: "ses_1102de55 · recorded",
    ganttSpans: makeGantt([
      { name: "run", durationLabel: "start", widthPct: 1.5 },
      { name: "model_request", durationLabel: "12s", widthPct: 23.0 },
      { name: "lookup_order", durationLabel: "8s", widthPct: 15.5 },
      { name: "checkpoint", durationLabel: "recorded", widthPct: 1.5 },
      { name: "model_request", durationLabel: "27s", widthPct: 51.5 },
      { name: "reply", durationLabel: "recorded", widthPct: 7.0 },
    ]),
    axisTicks: ["0s", "13s", "26s", "39s", "52s"],
    withKitaruText: "every ADK event recorded · this session replays",
    withoutText: "one log line per run · nothing to replay",
    goodFit: "ADK apps that already model runs as sessions and events.",
    tradeOff: "ADK's own session store and Kitaru's both keep a copy.",
    sourceCitation: "kitaru.adapters.google_adk — KitaruADKRunner",
  },
  {
    /* (6) Your own loop — bare Python. The "bring your own loop" pattern:
     *     any callable that takes an input and returns an output. */
    id: "your_own_loop",
    rowLetter: "+",
    rowLabel: "Your own loop",
    rowSubtitle: "function",
    badgeBg: "#94A3B8", // slate-400
    badgeColor: "#FFFFFF",
    kitaruChip: "KitaruAgent(fn)",
    underlyingHarness: {
      label: "Custom loop",
      chips: ["any callable", "sync / async"],
    },
    capabilityTiles: SHARED_CAPABILITIES,
    sessionLabel: "ses_66df2e14 · recorded",
    ganttSpans: makeGantt([
      { name: "run", durationLabel: "start", widthPct: 1.5 },
      { name: "model_request", durationLabel: "11s", widthPct: 22.0 },
      { name: "tool_call", durationLabel: "13s", widthPct: 26.0 },
      { name: "checkpoint", durationLabel: "recorded", widthPct: 1.5 },
      { name: "model_request", durationLabel: "19s", widthPct: 38.0 },
      { name: "reply", durationLabel: "recorded", widthPct: 11.0 },
    ]),
    axisTicks: ["0s", "12s", "24s", "36s", "48s"],
    withKitaruText: "every call you wrap is recorded · this session replays",
    withoutText: "one log line per run · nothing to replay",
    goodFit: "Any Python callable — no framework lock-in at all.",
    tradeOff: "You mark the call boundaries; Kitaru can't infer them.",
    sourceCitation: "kitaru — bring your own loop (any callable)",
  },
] as const;

export const DEFAULT_FRAMEWORK_AGENT_EXAMPLE_ID: string =
  FRAMEWORK_AGENT_EXAMPLES[0].id;
