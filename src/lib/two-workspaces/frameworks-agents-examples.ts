/**
 * Five real harness-framework examples for the FrameworksAgents subtab
 * (TwoWorkspaces v2 · Kitaru side · artboard A3S-0).
 *
 * Each row represents one agent harness that Kitaru wraps via KitaruAgent.
 * The selected row drives the middle column (KITARU ADDS — durable run layer)
 * and the right column (AFTER A CRASH — mini-Gantt of a real resumed run).
 *
 * Real data sources:
 *   - PydanticAI:  https://github.com/pydantic/pydantic-ai  (Agent / RunContext)
 *   - OpenAI SDK:  https://github.com/openai/openai-python  (Runner.run / agents-sdk)
 *   - LangGraph:   https://github.com/langchain-ai/langgraph  (graph.invoke)
 *   - Claude SDK:  https://github.com/anthropic-ai/anthropic-sdk-python (sessions / tool use)
 *   - Your loop:   Bare Python function — the "bring your own loop" pattern
 *
 * The mini-Gantt in AFTER A CRASH shows one resumed run per harness. The
 * 6-span shape is constant — classify → checkpoint → crash → resume → tool
 * → artifact — but each framework crashes & resumes at a different point and
 * runs for a different total time, so the timeline is visibly distinct as you
 * switch rows. `widthPct` is a percentage of that framework's own run window
 * (labelled by `axisTicks`); `leftPct` is chained by `makeGantt` so spans abut
 * with no gaps, keeping the derived summary stripe faithful to the bars.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type GanttSpanKind =
  | "classify"
  | "checkpoint"
  | "crashed"
  | "resumed"
  | "tool"
  | "artifact";

export interface GanttSpan {
  /** Display name of the span. */
  name: string;
  kind: GanttSpanKind;
  /** Duration label shown in the LHS column. */
  durationLabel: string;
  /** Left offset as a percentage of the 60s axis (0–100). */
  leftPct: number;
  /** Width as a percentage of the 60s axis (0–100). */
  widthPct: number;
}

/** Middle-column capability tile (flow / checkpoint / wait / replay). */
export interface CapabilityTile {
  /** Short title, e.g. "flow". */
  title: string;
  /** One-line description, e.g. "one durable run". */
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
  /** Stable URL slug — matches the framework name. */
  id: string;
  /**
   * Letter shown inside the 32×32 badge.
   * Artboard uses real brand mark SVGs; we fall back to a single letter
   * for portability. Brand colors only live inside the badge — nowhere else.
   */
  rowLetter: string;
  /** Framework name — shown as the row label. */
  rowLabel: string;
  /** The framework's primary entry-point / invocation pattern. */
  rowSubtitle: string;
  /** Brand-color hex for the badge background (unselected state only). */
  badgeBg: string;
  /** Brand-color hex for the letter text (unselected state only). */
  badgeColor: string;

  // ── Middle column: KITARU ADDS ──────────────────────────────────────
  /** The `KitaruAgent(agent)` chip label — e.g. "KitaruAgent(agent)". */
  kitaruChip: string;
  /** Harness name shown inside the durable-run box (bottom row). */
  underlyingHarness: UnderlyingRow;
  /**
   * Per-framework capability tiles inside the Kitaru runtime dashed box.
   * Always 4: flow, checkpoint, wait, replay.
   */
  capabilityTiles: [
    CapabilityTile,
    CapabilityTile,
    CapabilityTile,
    CapabilityTile,
  ];

  // ── Right column: AFTER A CRASH ─────────────────────────────────────
  /** Run identifier shown in the column header — e.g. "run #4127 · resumed". */
  runLabel: string;
  /** Mini-Gantt rows — 6 spans, distinct per framework. */
  ganttSpans: GanttSpan[];
  /** Five axis tick labels for the run window, placed at 0/25/50/75/100%. */
  axisTicks: readonly [string, string, string, string, string];
  /** "with kitaru" comparison text. */
  withKitaruText: string;
  /** "without" comparison text (strikethrough). */
  withoutText: string;

  /** Honest "good fit" line — when this harness + Kitaru is the right call. */
  goodFit: string;
  /** Honest "trade-off" line — the real cost / caveat of the integration. */
  tradeOff: string;

  /** Path in the framework SDK repo that documents the invocation pattern.
   *  Used for verification only — not displayed. */
  sourceCitation: string;
}

// ─── Capability tile icons (14×14 SVG path data, drawn to scale) ─────────────

/** Diamond outline — used for "flow" (matches artboard icon shape). */
const ICON_FLOW_SVG = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M7 1.5L12.5 7L7 12.5L1.5 7L7 1.5Z" stroke="#FB923C" stroke-width="1.4" stroke-linejoin="round"/></svg>`;

/** Checkmark — used for "checkpoint". */
const ICON_CHECKPOINT_SVG = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2.5 7.5L5.5 10.5L11.5 4" stroke="#C2410C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/** Pause bars — used for "wait". */
const ICON_WAIT_SVG = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><rect x="3.5" y="3" width="2.5" height="8" rx="1" fill="#FB923C"/><rect x="8" y="3" width="2.5" height="8" rx="1" fill="#FB923C"/></svg>`;

/** Circular arrow — used for "replay". */
const ICON_REPLAY_SVG = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M11.5 2.5A6 6 0 1 0 12 7" stroke="#C2410C" stroke-width="1.4" stroke-linecap="round"/><polyline points="10,2 12.5,2.5 12,5" stroke="#C2410C" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/** The four shared capability tiles — same for all harnesses (Kitaru
 *  always adds these four regardless of which framework is wrapped). */
const SHARED_CAPABILITIES: [
  CapabilityTile,
  CapabilityTile,
  CapabilityTile,
  CapabilityTile,
] = [
  { title: "flow", desc: "one durable run", iconSvg: ICON_FLOW_SVG },
  {
    title: "checkpoint",
    desc: "saved between steps",
    iconSvg: ICON_CHECKPOINT_SVG,
  },
  { title: "wait", desc: "pause & resume", iconSvg: ICON_WAIT_SVG },
  { title: "replay", desc: "from a boundary", iconSvg: ICON_REPLAY_SVG },
];

// ─── Gantt builder ────────────────────────────────────────────────────────────
// Each framework gets its OWN crash-recovery timeline. The 6-span shape is
// constant (classify → checkpoint → crash → resume → tool → artifact) but the
// crash point, resume gap and tool duration all vary, so the mini-Gantt is
// visibly distinct as you switch harness rows.

/** The 6 fixed span kinds, in render order. */
const GANTT_KINDS: readonly GanttSpanKind[] = [
  "classify",
  "checkpoint",
  "crashed",
  "resumed",
  "tool",
  "artifact",
];

/** One framework-specific span input — `leftPct` is derived, not supplied. */
interface GanttSpanInput {
  name: string;
  durationLabel: string;
  /** Width as a percentage of the run's own axis window (0–100). */
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
    /* (1) PydanticAI — the artboard's default / selected row.
     *     KitaruAgent wraps a pydantic_ai.Agent via the PydanticAI adapter.
     *     Source: pydantic/pydantic-ai — agents with RunContext + tool use. */
    id: "pydantic_ai",
    rowLetter: "P",
    rowLabel: "PydanticAI",
    rowSubtitle: "Agent(...)",
    badgeBg: "#FFDBBD", // warm peach — matches artboard CGX-0
    badgeColor: "#9A3412",
    kitaruChip: "KitaruAgent(agent)",
    underlyingHarness: {
      label: "PydanticAI",
      chips: ["typed deps", "tools", "output"],
    },
    capabilityTiles: SHARED_CAPABILITIES,
    runLabel: "run #4127 · resumed",
    ganttSpans: makeGantt([
      { name: "classify", durationLabel: "13s", widthPct: 22.0 },
      { name: "checkpoint", durationLabel: "saved", widthPct: 1.5 },
      { name: "tool.lookup", durationLabel: "crashed", widthPct: 4.0 },
      { name: "resumed", durationLabel: "+8s", widthPct: 13.5 },
      { name: "tool.lookup", durationLabel: "35s", widthPct: 57.5 },
      { name: "artifact", durationLabel: "saved", widthPct: 1.5 },
    ]),
    axisTicks: ["0s", "15s", "30s", "45s", "60s"],
    withKitaruText: "resumed in 8s · classify & model call preserved",
    withoutText: "restart from zero · repeat the model call · ~2m lost",
    goodFit: "Typed agents where you want schema validation on every step.",
    tradeOff: "Adds a Pydantic dependency and some per-call overhead.",
    sourceCitation:
      "https://github.com/pydantic/pydantic-ai — src/pydantic_ai/agent.py",
  },
  {
    /* (2) OpenAI SDK — agents-sdk Runner.run pattern (openai-python >= 1.x).
     *     Source: openai/openai-python — openai.agents / Runner.run() */
    id: "openai_sdk",
    rowLetter: "O",
    rowLabel: "OpenAI SDK",
    rowSubtitle: "Runner.run",
    badgeBg: "#F7F7F7", // near-white — matches artboard CH7-0
    badgeColor: "#101828",
    kitaruChip: "KitaruAgent(runner)",
    underlyingHarness: {
      label: "OpenAI Agents",
      chips: ["tools", "handoffs", "output"],
    },
    capabilityTiles: SHARED_CAPABILITIES,
    runLabel: "run #7834 · resumed",
    ganttSpans: makeGantt([
      { name: "triage", durationLabel: "9s", widthPct: 18.0 },
      { name: "checkpoint", durationLabel: "saved", widthPct: 1.5 },
      { name: "web_search", durationLabel: "crashed", widthPct: 6.5 },
      { name: "resumed", durationLabel: "+6s", widthPct: 13.0 },
      { name: "web_search", durationLabel: "29s", widthPct: 59.5 },
      { name: "response", durationLabel: "saved", widthPct: 1.5 },
    ]),
    axisTicks: ["0s", "12s", "24s", "36s", "48s"],
    withKitaruText: "resumed in 6s · triage & first tool call preserved",
    withoutText: "restart from zero · repeat the model call · ~2m lost",
    goodFit: "Multi-agent runs with handoffs via the Agents SDK Runner.",
    tradeOff: "Tied to OpenAI-hosted models and their rate limits.",
    sourceCitation:
      "https://github.com/openai/openai-python — src/openai/agents/runner.py",
  },
  {
    /* (3) LangGraph — graph.invoke / StateGraph pattern.
     *     Source: langchain-ai/langgraph — examples/agent_executor */
    id: "langgraph",
    rowLetter: "L",
    rowLabel: "LangGraph",
    rowSubtitle: "graph.invoke",
    badgeBg: "#F7F7F7", // matches artboard CHA-0
    badgeColor: "#101828",
    kitaruChip: "KitaruAgent(graph)",
    underlyingHarness: {
      label: "LangGraph",
      chips: ["state", "tools", "edges"],
    },
    capabilityTiles: SHARED_CAPABILITIES,
    runLabel: "run #2291 · resumed",
    ganttSpans: makeGantt([
      { name: "route_intent", durationLabel: "17s", widthPct: 23.5 },
      { name: "checkpoint", durationLabel: "saved", widthPct: 1.2 },
      { name: "tool_node", durationLabel: "crashed", widthPct: 3.3 },
      { name: "resumed", durationLabel: "+11s", widthPct: 15.0 },
      { name: "tool_node", durationLabel: "40s", widthPct: 55.6 },
      { name: "state", durationLabel: "saved", widthPct: 1.4 },
    ]),
    axisTicks: ["0s", "18s", "36s", "54s", "72s"],
    withKitaruText: "resumed in 11s · graph state & routing preserved",
    withoutText: "restart from zero · re-invoke full graph · ~2m lost",
    goodFit: "Branching multi-step graphs that need explicit state.",
    tradeOff: "Graph state must stay JSON-serializable to checkpoint cleanly.",
    sourceCitation:
      "https://github.com/langchain-ai/langgraph — examples/agent_executor/agent.py",
  },
  {
    /* (4) Claude SDK — anthropic-sdk-python sessions / tool use.
     *     Source: anthropic-ai/anthropic-sdk-python — examples/tool_use/ */
    id: "claude_sdk",
    rowLetter: "C",
    rowLabel: "Claude SDK",
    rowSubtitle: "session",
    badgeBg: "#F7F7F7", // matches artboard CHD-0
    badgeColor: "#101828",
    kitaruChip: "KitaruAgent(session)",
    underlyingHarness: {
      label: "Anthropic",
      chips: ["messages", "tools", "stream"],
    },
    capabilityTiles: SHARED_CAPABILITIES,
    runLabel: "run #3019 · resumed",
    ganttSpans: makeGantt([
      { name: "classify_intent", durationLabel: "10s", widthPct: 20.0 },
      { name: "checkpoint", durationLabel: "saved", widthPct: 1.5 },
      { name: "tool_use_block", durationLabel: "crashed", widthPct: 5.0 },
      { name: "resumed", durationLabel: "+6s", widthPct: 12.0 },
      { name: "tool_use_block", durationLabel: "31s", widthPct: 60.0 },
      { name: "message", durationLabel: "saved", widthPct: 1.5 },
    ]),
    axisTicks: ["0s", "13s", "26s", "39s", "52s"],
    withKitaruText: "resumed in 6s · context window & tool call preserved",
    withoutText: "restart from zero · rebuild context · ~2m lost",
    goodFit: "Long Claude tool-use sessions with expensive context to rebuild.",
    tradeOff:
      "Checkpoints land between turns — mid-stream tokens aren't saved.",
    sourceCitation:
      "https://github.com/anthropics/anthropic-sdk-python — examples/tool_use/tool_use_helper.py",
  },
  {
    /* (5) Your loop — bare Python function / custom loop.
     *     The "bring your own loop" pattern — KitaruAgent accepts any callable
     *     that takes (input) and returns (output). */
    id: "your_loop",
    rowLetter: "+",
    rowLabel: "Your loop",
    rowSubtitle: "function",
    badgeBg: "#94A3B8", // slate-400 — matches artboard C2J-0
    badgeColor: "#FFFFFF",
    kitaruChip: "KitaruAgent(fn)",
    underlyingHarness: {
      label: "Custom loop",
      chips: ["any callable", "sync / async"],
    },
    capabilityTiles: SHARED_CAPABILITIES,
    runLabel: "run #1102 · resumed",
    ganttSpans: makeGantt([
      { name: "step_one", durationLabel: "16s", widthPct: 25.0 },
      { name: "checkpoint", durationLabel: "saved", widthPct: 1.4 },
      { name: "tool_call", durationLabel: "crashed", widthPct: 4.5 },
      { name: "resumed", durationLabel: "+9s", widthPct: 14.0 },
      { name: "tool_call", durationLabel: "34s", widthPct: 52.8 },
      { name: "output", durationLabel: "saved", widthPct: 2.3 },
    ]),
    axisTicks: ["0s", "16s", "32s", "48s", "64s"],
    withKitaruText: "resumed in 9s · step progress & tool call preserved",
    withoutText: "restart from zero · repeat all steps · ~2m lost",
    goodFit: "Any Python callable — no framework lock-in at all.",
    tradeOff: "You define the checkpoint boundaries; Kitaru can't infer them.",
    sourceCitation: "kitaru/examples/bring_your_own_loop/custom_loop.py",
  },
] as const;

export const DEFAULT_FRAMEWORK_AGENT_EXAMPLE_ID: string =
  FRAMEWORK_AGENT_EXAMPLES[0].id;
