/**
 * Five real Kitaru flow examples — sourced from the canonical Kitaru SDK
 * repo (https://github.com/zenml-io/kitaru) under `examples/`. Every code
 * snippet here is a trimmed-but-faithful excerpt of a real example file
 * that ships in the SDK; full paths recorded in `sourceCitation` so we
 * can keep them in sync if Kitaru rewrites an example.
 *
 * The five examples were chosen to span the breadth of Kitaru use cases:
 *   1. research_agent       — canonical @flow + @checkpoint pair
 *   2. llm_writer           — kitaru.llm() tracked model calls
 *   3. audit_company        — long-running, multi-checkpoint Claude audit
 *   4. wait_for_approval    — human-in-the-loop with kitaru.wait()
 *   5. news_scout           — PydanticAI agent w/ granular checkpoints
 *
 * Each example owns its own execution-timeline span list so the right
 * pane in TwoWorkspaces > Flows can swap data fully when a row is
 * clicked. Timeline percentages map onto the 0% → 100% horizontal axis
 * shown above the span rows; the example's `axisTicks` provide the
 * labels for that axis (because total runtime varies per example).
 */

export type SpanType = "flow" | "llm" | "tool" | "checkpoint";
export type SpanState = "completed" | "running" | "queued";

export type TimelineSpan = {
  name: string;
  type: SpanType;
  durationLabel: string;
  /** null when queued (no real duration). */
  durationSeconds: number | null;
  indent: 0 | 1;
  state: SpanState;
  leftPct: number;
  widthPct: number;
  parent?: boolean;
};

export type Timeline = {
  spans: ReadonlyArray<TimelineSpan>;
  axisTicks: ReadonlyArray<string>;
  totalRuntimeLabel: string;
  /** Bottom-right "LIVE · 2m 12s" chip when a span is running; omit
   *  on completed timelines. The status dot is rendered by the layout —
   *  the label must not include a leading bullet character. */
  liveLabel?: string;
};

export type StatusPillTone = "running" | "idle";
export type StatusPillLabel = "RUNNING" | "IDLE" | "PAUSED" | "ACTIVE";

export type FlowExample = {
  /** Stable URL/data slug — e.g. "research_agent". Matches the Python
   *  flow def name in the source file. */
  id: string;
  /** Uppercase first letter of the flow name (matches what shows in the
   *  letter-badge in the AGENT FLOWS list). */
  rowLetter: string;
  /** Snake-case flow name (matches the @flow def). */
  rowLabel: string;
  rowSubtitle: string;
  rowStatusPill: { label: StatusPillLabel; tone: StatusPillTone };
  /** Top-right chip in the right pane — e.g. "report_agent · run #4127". */
  contextChip: string;
  /** Filename shown in the code-card titlebar. */
  codeFilename: string;
  /** ~12-line trimmed Python excerpt of the real example file. */
  codeSource: string;
  timeline: Timeline;
  /** Bottom-of-right-pane meta strip. */
  footerMeta: string;
  /** Path inside the Kitaru SDK repo (or this site's content/) that this
   *  example was trimmed from. Used for verification, not displayed. */
  sourceCitation: string;
};

/* ---------------------------------------------------------------------- */
/* Examples                                                                */
/*                                                                         */
/*   Code excerpts trim only structural lines (imports kept minimal,       */
/*   helper plumbing removed) so the on-screen Python still parses and     */
/*   the @flow + @checkpoint shapes match the real file. No new code is    */
/*   invented — comments may be shortened.                                  */
/* ---------------------------------------------------------------------- */

export const FLOW_EXAMPLES: ReadonlyArray<FlowExample> = [
  {
    /* (1) Canonical agent flow.
     *     Real source: kitaru/examples/basic_flow/first_working_flow.py
     *     "Smallest end-to-end @flow + @checkpoint example."  */
    id: "research_agent",
    rowLetter: "R",
    rowLabel: "research_agent",
    rowSubtitle: "2 checkpoints · 1m 47s",
    rowStatusPill: { label: "RUNNING", tone: "running" },
    contextChip: "research_agent · run #4127",
    codeFilename: "first_working_flow.py",
    codeSource: [
      "from kitaru import checkpoint, flow",
      "",
      "@checkpoint",
      "def gather_sources(topic: str) -> str:",
      '    return f"Source notes on {topic}."',
      "",
      "@checkpoint",
      "def summarize(notes: str) -> str:",
      "    return f\"Summary: {notes.split(':')[0].lower()}.\"",
      "",
      "@flow",
      "def research_agent(topic: str) -> str:",
      "    notes = gather_sources(topic)",
      "    return summarize(notes)",
    ].join("\n"),
    timeline: {
      spans: [
        {
          name: "research_agent",
          type: "flow",
          durationLabel: "1m 47s · live",
          durationSeconds: 107,
          state: "running",
          indent: 0,
          leftPct: 0,
          widthPct: 100,
          parent: true,
        },
        {
          name: "gather_sources",
          type: "tool",
          durationLabel: "42s",
          durationSeconds: 42,
          state: "completed",
          indent: 1,
          leftPct: 0,
          widthPct: 39,
        },
        {
          name: "chkpt.notes",
          type: "checkpoint",
          durationLabel: "0.3s",
          durationSeconds: 0.3,
          state: "completed",
          indent: 1,
          leftPct: 39,
          widthPct: 0.5,
        },
        {
          name: "summarize",
          type: "llm",
          durationLabel: "65s · live",
          durationSeconds: 65,
          state: "running",
          indent: 1,
          leftPct: 39.5,
          widthPct: 60.5,
        },
      ],
      axisTicks: ["0s", "30s", "1m", "1m30s", "2m"],
      totalRuntimeLabel: "1m 47s",
      liveLabel: "LIVE · 1m 47s",
    },
    footerMeta: "runtime: kubernetes · 1 checkpoint persisted · resumable",
    sourceCitation: "kitaru/examples/basic_flow/first_working_flow.py",
  },
  {
    /* (2) Tracked LLM calls.
     *     Real source: kitaru/examples/llm/flow_with_llm.py
     *     Uses `kitaru.llm()` to log model usage as a checkpoint. */
    id: "llm_writer",
    rowLetter: "L",
    rowLabel: "llm_writer",
    rowSubtitle: "2 llm calls · 11s",
    rowStatusPill: { label: "IDLE", tone: "idle" },
    contextChip: "llm_writer · run #8341",
    codeFilename: "flow_with_llm.py",
    codeSource: [
      "import kitaru",
      "from kitaru import checkpoint, flow",
      "",
      "@checkpoint",
      "def write_draft(topic, outline):",
      "    return kitaru.llm(",
      '        f"Write a paragraph about {topic} from {outline}.",',
      '        model="fast", name="draft_call",',
      "    )",
      "",
      "@flow",
      "def llm_writer(topic: str) -> str:",
      "    outline = kitaru.llm(",
      '        f"Create a 3-bullet outline about {topic}.",',
      '        model="fast", name="outline_call",',
      "    )",
      "    return write_draft(topic, outline)",
    ].join("\n"),
    timeline: {
      spans: [
        {
          name: "llm_writer",
          type: "flow",
          durationLabel: "11s",
          durationSeconds: 11,
          state: "completed",
          indent: 0,
          leftPct: 0,
          widthPct: 100,
          parent: true,
        },
        {
          name: "outline_call",
          type: "llm",
          durationLabel: "4.1s",
          durationSeconds: 4.1,
          state: "completed",
          indent: 1,
          leftPct: 0,
          widthPct: 37,
        },
        {
          name: "chkpt.outline",
          type: "checkpoint",
          durationLabel: "0.2s",
          durationSeconds: 0.2,
          state: "completed",
          indent: 1,
          leftPct: 37,
          widthPct: 0.5,
        },
        {
          name: "draft_call",
          type: "llm",
          durationLabel: "6.5s",
          durationSeconds: 6.5,
          state: "completed",
          indent: 1,
          leftPct: 37.5,
          widthPct: 59,
        },
        {
          name: "chkpt.draft",
          type: "checkpoint",
          durationLabel: "0.2s",
          durationSeconds: 0.2,
          state: "completed",
          indent: 1,
          leftPct: 96.5,
          widthPct: 0.5,
        },
      ],
      axisTicks: ["0s", "3s", "6s", "9s", "12s"],
      totalRuntimeLabel: "11s",
      liveLabel: "COMPLETED · 11s",
    },
    footerMeta: "runtime: kubernetes · 2 checkpoints persisted · resumable",
    sourceCitation: "kitaru/examples/llm/flow_with_llm.py",
  },
  {
    /* (3) Long-running, multi-checkpoint Claude audit.
     *     Real source: kitaru/examples/compliance_review/stage_2_multi_domain.py
     *     Five sequential @checkpoints, one @flow. Heavy run — minutes. */
    id: "audit_company",
    rowLetter: "A",
    rowLabel: "audit_company",
    rowSubtitle: "5 checkpoints · 6m 18s",
    rowStatusPill: { label: "ACTIVE", tone: "idle" },
    contextChip: "audit_company · run #2014",
    codeFilename: "stage_2_multi_domain.py",
    codeSource: [
      "from kitaru import checkpoint, flow",
      "",
      "@checkpoint",
      "def check_hr_compliance(prompt=HR_PROMPT):",
      '    return _run_domain_turn(prompt, domain="hr")',
      "",
      "@checkpoint",
      "def check_it_security(prompt=IT_PROMPT):",
      '    return _run_domain_turn(prompt, domain="it_security")',
      "",
      "@checkpoint",
      "def synthesize_report(hr, it, vendors, ins):",
      "    return _run_agent(SYNTHESIS_PROMPT.format(...))",
      "",
      "@flow",
      "def audit_company():",
      "    hr, it, v, ins = run_domain_checks()",
      "    return synthesize_report(hr, it, v, ins)",
    ].join("\n"),
    timeline: {
      spans: [
        {
          name: "audit_company",
          type: "flow",
          durationLabel: "6m 18s",
          durationSeconds: 378,
          state: "running",
          indent: 0,
          leftPct: 0,
          widthPct: 100,
          parent: true,
        },
        {
          name: "check_hr_compliance",
          type: "llm",
          durationLabel: "58s",
          durationSeconds: 58,
          state: "completed",
          indent: 1,
          leftPct: 0,
          widthPct: 15.3,
        },
        {
          name: "check_it_security",
          type: "llm",
          durationLabel: "1m 12s",
          durationSeconds: 72,
          state: "completed",
          indent: 1,
          leftPct: 15.3,
          widthPct: 19,
        },
        {
          name: "check_vendor_contracts",
          type: "llm",
          durationLabel: "1m 36s",
          durationSeconds: 96,
          state: "completed",
          indent: 1,
          leftPct: 34.3,
          widthPct: 25.4,
        },
        {
          name: "check_insurance",
          type: "llm",
          durationLabel: "47s",
          durationSeconds: 47,
          state: "completed",
          indent: 1,
          leftPct: 59.7,
          widthPct: 12.4,
        },
        {
          name: "chkpt.findings",
          type: "checkpoint",
          durationLabel: "0.5s",
          durationSeconds: 0.5,
          state: "completed",
          indent: 1,
          leftPct: 72.1,
          widthPct: 0.5,
        },
        {
          name: "synthesize_report",
          type: "llm",
          durationLabel: "1m 45s · live",
          durationSeconds: 105,
          state: "running",
          indent: 1,
          leftPct: 72.6,
          widthPct: 27.4,
        },
      ],
      axisTicks: ["0s", "2m", "4m", "6m", "8m"],
      totalRuntimeLabel: "6m 18s",
      liveLabel: "LIVE · 6m 18s",
    },
    footerMeta: "runtime: kubernetes · 4 checkpoints persisted · resumable",
    sourceCitation: "kitaru/examples/compliance_review/stage_2_multi_domain.py",
  },
  {
    /* (4) Human-in-the-loop / approval gate.
     *     Real source: kitaru/examples/execution_management/wait_and_resume.py
     *     Uses kitaru.wait() with schema=bool to release compute and
     *     resume from CLI/dashboard. */
    id: "wait_for_approval_flow",
    rowLetter: "W",
    rowLabel: "wait_for_approval_flow",
    rowSubtitle: "3 checkpoints · awaiting input",
    rowStatusPill: { label: "PAUSED", tone: "idle" },
    contextChip: "wait_for_approval · run #1198",
    codeFilename: "wait_and_resume.py",
    codeSource: [
      "import kitaru",
      "from kitaru import checkpoint, flow",
      "",
      "@checkpoint",
      "def draft_release_note(topic: str) -> str:",
      '    return f"Draft about {topic}."',
      "",
      "@flow",
      "def wait_for_approval_flow(topic: str) -> str:",
      "    draft = draft_release_note(topic)",
      "    approved = kitaru.wait(",
      '        name="approve_release",',
      "        schema=bool,",
      '        question=f"Approve {topic}?",',
      "        timeout=3600,",
      "    )",
      "    if approved is False:",
      '        return f"REJECTED: {topic}"',
      "    return publish_release_note(draft, details)",
    ].join("\n"),
    timeline: {
      spans: [
        {
          name: "wait_for_approval_flow",
          type: "flow",
          durationLabel: "2m 04s + paused",
          durationSeconds: 124,
          state: "running",
          indent: 0,
          leftPct: 0,
          widthPct: 100,
          parent: true,
        },
        {
          name: "draft_release_note",
          type: "tool",
          durationLabel: "8s",
          durationSeconds: 8,
          state: "completed",
          indent: 1,
          leftPct: 0,
          widthPct: 6,
        },
        {
          name: "chkpt.draft",
          type: "checkpoint",
          durationLabel: "0.2s",
          durationSeconds: 0.2,
          state: "completed",
          indent: 1,
          leftPct: 6,
          widthPct: 0.5,
        },
        {
          name: "wait.approve_release",
          type: "llm",
          durationLabel: "awaiting input",
          durationSeconds: null,
          state: "running",
          indent: 1,
          leftPct: 6.5,
          widthPct: 78,
        },
        {
          name: "publish_release_note",
          type: "tool",
          durationLabel: "queued",
          durationSeconds: null,
          state: "queued",
          indent: 1,
          leftPct: 84.5,
          widthPct: 15.5,
        },
      ],
      axisTicks: ["0s", "30s", "1m", "1m30s", "2m"],
      totalRuntimeLabel: "2m 04s",
      liveLabel: "PAUSED · awaiting input",
    },
    footerMeta: "runtime: kubernetes · compute released · resumable via CLI",
    sourceCitation: "kitaru/examples/execution_management/wait_and_resume.py",
  },
  {
    /* (5) PydanticAI agent — fan-out / parallel tool calls.
     *     Real source: kitaru/examples/news_scout/scout.py
     *     KitaruAgent in granular_checkpoints=True mode wraps a PydanticAI
     *     Agent with 4 tools; every model + tool call becomes its own
     *     checkpoint. */
    id: "news_scout",
    rowLetter: "N",
    rowLabel: "news_scout",
    rowSubtitle: "12 checkpoints · 3m 22s",
    rowStatusPill: { label: "IDLE", tone: "idle" },
    contextChip: "news_scout · run #6720",
    codeFilename: "scout.py",
    codeSource: [
      "from kitaru import checkpoint, flow",
      "from kitaru.adapters.pydantic_ai import KitaruAgent",
      "from pydantic_ai import Agent",
      "",
      "scout_agent = KitaruAgent(",
      '    Agent(MODEL, name="news_scout",',
      "          tools=[search_news, search_twitter,",
      "                 investigate, fetch_url]),",
      "    granular_checkpoints=True,",
      ")",
      "",
      "@checkpoint",
      "def publish_report(text: str) -> str:",
      "    return text",
      "",
      "@flow",
      "def news_scout(interests: list[str]) -> str:",
      "    result = scout_agent.run_sync(",
      "        build_user_prompt(interests),",
      "    )",
      "    return publish_report(result.output)",
    ].join("\n"),
    timeline: {
      spans: [
        {
          name: "news_scout",
          type: "flow",
          durationLabel: "3m 22s",
          durationSeconds: 202,
          state: "completed",
          indent: 0,
          leftPct: 0,
          widthPct: 100,
          parent: true,
        },
        {
          name: "agent.plan",
          type: "llm",
          durationLabel: "8s",
          durationSeconds: 8,
          state: "completed",
          indent: 1,
          leftPct: 0,
          widthPct: 4,
        },
        {
          name: "search_news",
          type: "tool",
          durationLabel: "21s",
          durationSeconds: 21,
          state: "completed",
          indent: 1,
          leftPct: 4,
          widthPct: 10.4,
        },
        {
          name: "search_twitter",
          type: "tool",
          durationLabel: "18s",
          durationSeconds: 18,
          state: "completed",
          indent: 1,
          leftPct: 4,
          widthPct: 9,
        },
        {
          name: "investigate",
          type: "tool",
          durationLabel: "1m 02s",
          durationSeconds: 62,
          state: "completed",
          indent: 1,
          leftPct: 14.4,
          widthPct: 30.7,
        },
        {
          name: "fetch_url",
          type: "tool",
          durationLabel: "11s",
          durationSeconds: 11,
          state: "completed",
          indent: 1,
          leftPct: 45.1,
          widthPct: 5.4,
        },
        {
          name: "agent.summarize",
          type: "llm",
          durationLabel: "1m 18s",
          durationSeconds: 78,
          state: "completed",
          indent: 1,
          leftPct: 50.5,
          widthPct: 38.6,
        },
        {
          name: "publish_report",
          type: "checkpoint",
          durationLabel: "0.4s",
          durationSeconds: 0.4,
          state: "completed",
          indent: 1,
          leftPct: 99,
          widthPct: 0.5,
        },
      ],
      axisTicks: ["0s", "1m", "2m", "3m", "3m30s"],
      totalRuntimeLabel: "3m 22s",
      liveLabel: "COMPLETED · 3m 22s",
    },
    footerMeta: "runtime: kubernetes · 12 checkpoints persisted · replayable",
    sourceCitation: "kitaru/examples/news_scout/scout.py",
  },
] as const;

export const DEFAULT_FLOW_EXAMPLE_ID: string = FLOW_EXAMPLES[0].id;
