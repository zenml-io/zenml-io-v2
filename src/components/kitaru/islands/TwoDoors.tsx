// TwoDoors — two equal-weight ways into Kitaru: wrap an agent to record new
// runs, or import the traces you already have. Both doors are WAI-ARIA
// tabbed panels (horizontal orientation, roving tabIndex), replacing the old
// separate OneImport (record) and Importers (import) sections.
//
// The tab set mirrors the shipped adapters on kitaru `develop`
// (docs/book/adapters): Python — PydanticAI (`kitaru_pydantic_ai`),
// OpenAI Agents SDK (`kitaru_openai_agents`), LangGraph
// (`kitaru_langgraph`); TypeScript — Mastra (`@zenml-io/kitaru-mastra`),
// Vercel AI SDK (`@zenml-io/kitaru-vercel-ai`). Import paths and entry
// points here must match those docs — don't invent adapter APIs.
//
// Commands in the import door must match the shipped `kitaru session
// import` CLI exactly — don't invent flags. The six built-in importers
// (kitaru/langfuse, kitaru/langsmith, kitaru/braintrust, kitaru/logfire,
// kitaru/phoenix, kitaru/kitaru-jsonl) and the `kitaru importer
// scaffold/test/register`
// custom-importer flow are verified against current CLI docs ("Import your
// traces" overview: "Importers for Langfuse, LangSmith, Braintrust,
// Logfire, Arize Phoenix, and a native JSONL format are built in, registered
// ... under the kitaru/ namespace").
import type { SVGAttributes } from "preact";
import { useState } from "preact/hooks";
import { cn } from "../../../lib/utils";
import { copyToClipboard } from "../../../scripts/kitaru/clipboard";
import SectionIntro from "../../system/SectionIntro";
import {
  BraintrustIcon,
  KitaruIcon,
  LangChainIcon,
  LangfuseIcon,
  LogfireIcon,
  MastraIcon,
  OpenAIIcon,
  PhoenixIcon,
  PydanticIcon,
  VercelIcon,
} from "./brand-icons";
import { type CodeLine, renderCodeLines } from "./code-tokens";
import { Section } from "./primitives";
import { Reveal } from "./Reveal";

/** Plus-in-a-circle — "bring your own format" is the only tab without a
 *  vendor mark, so it gets a generic add glyph instead of a brand icon. */
function CustomFormatIcon(props: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}

/** Compact copy-on-click chip for an install command. Lives in a flex row,
 *  so `min-w-0` + `truncate` let it give way with an ellipsis instead of
 *  pushing the row wider on narrow screens. */
function InstallCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    copyToClipboard(command).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      },
      () => {},
    );
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      title={command}
      aria-label={copied ? "Copied" : `Copy install command: ${command}`}
      className="flex min-w-0 cursor-pointer items-center gap-1.5 rounded-md border border-border bg-warm-taupe-track py-1 pr-2 pl-2.5 font-mono text-[11px] text-ink-soft transition-colors hover:text-ink"
    >
      <span className="text-ember select-none" aria-hidden="true">
        $
      </span>
      <span className="truncate">{command}</span>
      {copied ? (
        <svg
          className="size-3 shrink-0 text-success"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg
          className="size-3 shrink-0 opacity-60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  );
}

type Framework = {
  id: string;
  Icon: typeof PydanticIcon;
  label: string;
  /** Filename shown in the code block chrome — carries the language. */
  file: string;
  install: string;
  before: CodeLine[];
  after: CodeLine[];
};

export const FRAMEWORKS: Framework[] = [
  {
    id: "pydanticai",
    Icon: PydanticIcon,
    label: "PydanticAI",
    file: "agent.py",
    install: 'uv add "kitaru-pydantic-ai[openai]"',
    before: [
      [{ kw: "from" }, " pydantic_ai ", { kw: "import" }, " Agent"],
      [],
      ["agent ", { op: "=" }, " ", { fn: "Agent" }, "("],
      ["    ", { str: '"openai:gpt-5-mini"' }, ","],
      [
        "    system_prompt",
        { op: "=" },
        { str: '"You are a compliance reviewer."' },
        ",",
      ],
      ["    tools", { op: "=" }, "[search_docs, fetch_policy],"],
      [")"],
      [],
      [
        "result ",
        { op: "=" },
        " ",
        { kw: "await" },
        " agent.",
        { fn: "run" },
        "(task)",
      ],
    ],
    after: [
      [
        { kw: "from" },
        " kitaru_pydantic_ai ",
        { kw: "import" },
        " KitaruAgent",
      ],
      [{ kw: "from" }, " pydantic_ai ", { kw: "import" }, " Agent"],
      [],
      [
        "agent ",
        { op: "=" },
        " ",
        { fn: "KitaruAgent" },
        "(",
        { fn: "Agent" },
        "(",
      ],
      ["    ", { str: '"openai:gpt-5-mini"' }, ","],
      [
        "    system_prompt",
        { op: "=" },
        { str: '"You are a compliance reviewer."' },
        ",",
      ],
      ["    tools", { op: "=" }, "[search_docs, fetch_policy],"],
      ["), agent_id", { op: "=" }, "AGENT_ID)"],
      [],
      [
        "result ",
        { op: "=" },
        " ",
        { kw: "await" },
        " agent.",
        { fn: "run" },
        "(task)",
      ],
    ],
  },
  {
    id: "openai",
    Icon: OpenAIIcon,
    label: "OpenAI Agents SDK",
    file: "agent.py",
    install: "uv add kitaru-openai-agents",
    before: [
      [{ kw: "from" }, " agents ", { kw: "import" }, " Agent, Runner"],
      [],
      ["agent ", { op: "=" }, " ", { fn: "Agent" }, "("],
      ["    name", { op: "=" }, { str: '"Compliance Reviewer"' }, ","],
      [
        "    instructions",
        { op: "=" },
        { str: '"Answer briefly and accurately."' },
        ",",
      ],
      ["    model", { op: "=" }, { str: '"gpt-5-mini"' }, ","],
      [")"],
      [],
      [
        "result ",
        { op: "=" },
        " ",
        { kw: "await" },
        " Runner.",
        { fn: "run" },
        "(agent, task)",
      ],
    ],
    after: [
      [{ kw: "from" }, " agents ", { kw: "import" }, " Agent"],
      [
        { kw: "from" },
        " kitaru_openai_agents ",
        { kw: "import" },
        " KitaruRunner",
      ],
      [],
      ["agent ", { op: "=" }, " ", { fn: "Agent" }, "("],
      ["    name", { op: "=" }, { str: '"Compliance Reviewer"' }, ","],
      [
        "    instructions",
        { op: "=" },
        { str: '"Answer briefly and accurately."' },
        ",",
      ],
      ["    model", { op: "=" }, { str: '"gpt-5-mini"' }, ","],
      [")"],
      [
        "runner ",
        { op: "=" },
        " ",
        { fn: "KitaruRunner" },
        "(agent_id",
        { op: "=" },
        "AGENT_ID)",
      ],
      [],
      [
        "result ",
        { op: "=" },
        " ",
        { kw: "await" },
        " runner.",
        { fn: "run" },
        "(agent, task)",
      ],
    ],
  },
  {
    id: "langgraph",
    Icon: LangChainIcon,
    label: "LangGraph",
    file: "agent.py",
    install: "uv add kitaru-langgraph",
    before: [
      [
        { kw: "from" },
        " langgraph.graph ",
        { kw: "import" },
        " END, START, StateGraph",
      ],
      [],
      ["builder ", { op: "=" }, " ", { fn: "StateGraph" }, "(SupportState)"],
      [
        "builder.",
        { fn: "add_node" },
        "(",
        { str: '"normalize"' },
        ", normalize)",
      ],
      ["builder.", { fn: "add_edge" }, "(START, ", { str: '"normalize"' }, ")"],
      ["builder.", { fn: "add_edge" }, "(", { str: '"normalize"' }, ", END)"],
      [],
      ["graph ", { op: "=" }, " builder.", { fn: "compile" }, "()"],
      [
        "result ",
        { op: "=" },
        " graph.",
        { fn: "invoke" },
        "({",
        { str: '"request"' },
        ": task})",
      ],
    ],
    after: [
      [
        { kw: "from" },
        " kitaru_langgraph ",
        { kw: "import" },
        " KitaruGraphRunner",
      ],
      [
        { kw: "from" },
        " langgraph.graph ",
        { kw: "import" },
        " END, START, StateGraph",
      ],
      [],
      ["builder ", { op: "=" }, " ", { fn: "StateGraph" }, "(SupportState)"],
      [
        "builder.",
        { fn: "add_node" },
        "(",
        { str: '"normalize"' },
        ", normalize)",
      ],
      ["builder.", { fn: "add_edge" }, "(START, ", { str: '"normalize"' }, ")"],
      ["builder.", { fn: "add_edge" }, "(", { str: '"normalize"' }, ", END)"],
      [],
      [
        "runner ",
        { op: "=" },
        " ",
        { fn: "KitaruGraphRunner" },
        "(builder.",
        { fn: "compile" },
        "(), agent_id",
        { op: "=" },
        "AGENT_ID)",
      ],
      [
        "result ",
        { op: "=" },
        " runner.",
        { fn: "invoke" },
        "({",
        { str: '"request"' },
        ": task})",
      ],
    ],
  },
  {
    id: "mastra",
    Icon: MastraIcon,
    label: "Mastra",
    file: "agent.ts",
    install: "pnpm add @zenml-io/kitaru-mastra @mastra/core@1.51.0",
    before: [
      [
        { kw: "import" },
        " { Agent } ",
        { kw: "from" },
        " ",
        { str: '"@mastra/core/agent"' },
        ";",
      ],
      [],
      [
        { kw: "const" },
        " agent ",
        { op: "=" },
        " ",
        { kw: "new" },
        " ",
        { fn: "Agent" },
        "({",
      ],
      ["  id: ", { str: '"support-agent"' }, ","],
      ["  name: ", { str: '"Support agent"' }, ","],
      ["  instructions: ", { str: '"Answer support requests."' }, ","],
      ["  model: ", { str: '"openai/gpt-5-mini"' }, ","],
      ["  tools,"],
      ["});"],
      [],
      [
        { kw: "const" },
        " result ",
        { op: "=" },
        " ",
        { kw: "await" },
        " agent.",
        { fn: "generate" },
        "(messages);",
      ],
    ],
    after: [
      [
        { kw: "import" },
        " { Agent } ",
        { kw: "from" },
        " ",
        { str: '"@mastra/core/agent"' },
        ";",
      ],
      [
        { kw: "import" },
        " { KitaruAgent } ",
        { kw: "from" },
        " ",
        { str: '"@zenml-io/kitaru-mastra"' },
        ";",
      ],
      [],
      [
        { kw: "const" },
        " agent ",
        { op: "=" },
        " ",
        { kw: "new" },
        " ",
        { fn: "KitaruAgent" },
        "(",
        { kw: "new" },
        " ",
        { fn: "Agent" },
        "({",
      ],
      ["  id: ", { str: '"support-agent"' }, ","],
      ["  name: ", { str: '"Support agent"' }, ","],
      ["  instructions: ", { str: '"Answer support requests."' }, ","],
      ["  model: ", { str: '"openai/gpt-5-mini"' }, ","],
      ["  tools,"],
      ["}), { agentId: AGENT_ID });"],
      [],
      [
        { kw: "const" },
        " result ",
        { op: "=" },
        " ",
        { kw: "await" },
        " agent.",
        { fn: "generate" },
        "(messages);",
      ],
    ],
  },
  {
    id: "vercel",
    Icon: VercelIcon,
    label: "Vercel AI SDK",
    file: "agent.ts",
    install:
      "pnpm add @zenml-io/kitaru-vercel-ai ai@7.0.65 @ai-sdk/openai@4.0.20 zod@4.4.3",
    before: [
      [
        { kw: "import" },
        " { openai } ",
        { kw: "from" },
        " ",
        { str: '"@ai-sdk/openai"' },
        ";",
      ],
      [
        { kw: "import" },
        " { generateText } ",
        { kw: "from" },
        " ",
        { str: '"ai"' },
        ";",
      ],
      [],
      [
        { kw: "const" },
        " result ",
        { op: "=" },
        " ",
        { kw: "await" },
        " ",
        { fn: "generateText" },
        "({",
      ],
      ["  model: ", { fn: "openai" }, "(", { str: '"gpt-5-nano"' }, "),"],
      ["  prompt: task,"],
      ["});"],
      [],
      ["console.", { fn: "log" }, "(result.text);"],
    ],
    after: [
      [
        { kw: "import" },
        " { openai } ",
        { kw: "from" },
        " ",
        { str: '"@ai-sdk/openai"' },
        ";",
      ],
      [
        { kw: "import" },
        " { createKitaruGenerateText } ",
        { kw: "from" },
        " ",
        { str: '"@zenml-io/kitaru-vercel-ai"' },
        ";",
      ],
      [],
      [
        { kw: "const" },
        " generateText ",
        { op: "=" },
        " ",
        { fn: "createKitaruGenerateText" },
        "({ agentId: AGENT_ID });",
      ],
      [],
      [
        { kw: "const" },
        " result ",
        { op: "=" },
        " ",
        { kw: "await" },
        " ",
        { fn: "generateText" },
        "({",
      ],
      ["  model: ", { fn: "openai" }, "(", { str: '"gpt-5-nano"' }, "),"],
      ["  prompt: task,"],
      ["});"],
      [],
      ["console.", { fn: "log" }, "(result.text);"],
    ],
  },
];

type ImporterTab = {
  id: string;
  Icon: typeof LangfuseIcon;
  label: string;
  lines: CodeLine[];
};

/** The one tab that is not a built-in importer: dashed border, scaffold
 *  walkthrough instead of an import command, no result readout. */
const CUSTOM_TAB_ID = "custom";

function flagLine(flag: string, value: string, continued = true): CodeLine {
  const line: CodeLine = ["    ", { op: flag }, " ", { var: value }];
  if (continued) line.push(" ", { op: "\\" });
  return line;
}

/** The six built-in importers share every flag except the source file and
 *  the `--importer` reference, so the command is built once and varied
 *  per-tab instead of retyping the same lines six times. */
function importCommandLines(file: string, importer: string): CodeLine[] {
  return [
    [
      { op: "$ " },
      { kw: "kitaru" },
      " ",
      { var: "session import" },
      " ",
      { str: file },
      " ",
      { op: "\\" },
    ],
    flagLine("--importer", importer),
    flagLine("--agent", "support-agent@latest"),
    flagLine("--tag", "imported-baseline"),
    flagLine("--media-type", "application/x-ndjson"),
    ["    ", { op: "--wait" }],
  ];
}

const CUSTOM_IMPORTER_LINES: CodeLine[] = [
  [{ cmt: "# one entrypoint function — about a page of Python" }],
  [],
  [
    { op: "$ " },
    { kw: "kitaru" },
    " ",
    { var: "importer scaffold" },
    " ",
    { str: "my-format" },
  ],
  [],
  [
    { op: "$ " },
    { kw: "kitaru" },
    " ",
    { var: "importer test" },
    " ",
    { str: "my_format_importer.py" },
    " ",
    { op: "\\" },
  ],
  ["    ", { op: "--entrypoint" }, " ", { var: "parse" }, " ", { op: "\\" }],
  ["    ", { op: "--payload" }, " ", { str: "sample-export.jsonl" }],
  [],
  [
    { op: "$ " },
    { kw: "kitaru" },
    " ",
    { var: "importer register" },
    " ",
    { str: "my-format" },
    " ",
    { op: "\\" },
  ],
  [
    "    ",
    { op: "--script" },
    " ",
    { str: "my_format_importer.py" },
    " ",
    { op: "\\" },
  ],
  ["    ", { op: "--entrypoint" }, " ", { var: "parse" }, " ", { op: "\\" }],
  ["    ", { op: "--provider" }, " ", { str: "my-format" }],
];

export const IMPORTERS: ImporterTab[] = [
  {
    id: "langfuse",
    Icon: LangfuseIcon,
    label: "Langfuse",
    lines: importCommandLines(
      "langfuse-export.jsonl",
      "kitaru/langfuse@latest",
    ),
  },
  {
    id: "langsmith",
    Icon: LangChainIcon,
    label: "LangSmith",
    lines: importCommandLines(
      "langsmith-export.jsonl",
      "kitaru/langsmith@latest",
    ),
  },
  {
    id: "braintrust",
    Icon: BraintrustIcon,
    label: "Braintrust",
    lines: importCommandLines(
      "braintrust-export.jsonl",
      "kitaru/braintrust@latest",
    ),
  },
  {
    id: "logfire",
    Icon: LogfireIcon,
    label: "Logfire",
    lines: importCommandLines("logfire-export.ndjson", "kitaru/logfire@latest"),
  },
  {
    id: "phoenix",
    Icon: PhoenixIcon,
    label: "Arize Phoenix",
    lines: importCommandLines("phoenix-traces.jsonl", "kitaru/phoenix@latest"),
  },
  {
    id: "kitaru-jsonl",
    Icon: KitaruIcon,
    label: "Kitaru JSONL",
    lines: importCommandLines("sessions.jsonl", "kitaru/kitaru-jsonl@latest"),
  },
  {
    id: CUSTOM_TAB_ID,
    Icon: CustomFormatIcon,
    label: "Your format",
    lines: CUSTOM_IMPORTER_LINES,
  },
];

/** The six built-in importer tabs each open their command with
 *  `$ kitaru session import <file> \` — the export filename is the `str`
 *  token that follows `session import`. Deriving it from the tab's own
 *  command data (instead of a parallel id → file lookup) keeps the
 *  terminal chrome and the CLI-truth command in `lines` from drifting.
 *  The custom tab's first line is a comment with no such token, so this
 *  returns `null` for it — which is also how callers gate the
 *  import-progress footer to built-in tabs only. */
function importedFile(tab: ImporterTab): string | null {
  const firstLine = tab.lines[0];
  for (const token of firstLine ?? []) {
    if (typeof token === "object" && "str" in token) return token.str;
  }
  return null;
}

/** Shorter chip labels for the record door — the full SDK name still shows
 *  as the tab panel's accessible name via aria-labelledby. */
const RECORD_CHIP_LABEL: Record<string, string> = {
  openai: "OpenAI Agents",
};

/* Both panes share one reserved height — the tallest snippet across BOTH
   doors — so switching any tab never resizes the cards, and the dark and
   light panes always end level with each other. Non-custom import tabs
   render three extra body lines (a blank plus the two progress lines).
   Expressed in em so it tracks the pane's own 12.5px font at its 1.85 line
   height; the added 2rem is the pre's vertical padding. */
const PANE_MIN_LINES = Math.max(
  ...IMPORTERS.map((t) => t.lines.length + (t.id === CUSTOM_TAB_ID ? 0 : 3)),
  ...FRAMEWORKS.map((f) => f.after.length),
  ...FRAMEWORKS.map((f) => f.before.length),
);
const PANE_MIN_HEIGHT = `calc(${PANE_MIN_LINES * 1.85}em + 2rem)`;

/* Chips break deliberately into balanced rows on desktop (4+2 import,
   3+2 record); each row still wraps on its own below that. */
const IMPORTER_ROWS = [IMPORTERS.slice(0, 4), IMPORTERS.slice(4)];
const FRAMEWORK_ROWS = [FRAMEWORKS.slice(0, 3), FRAMEWORKS.slice(3)];

/* Shared WAI-ARIA horizontal tablist keydown handling: ArrowLeft/ArrowRight
   move selection with roving focus, Home/End jump to the ends — the same
   pattern the other Kitaru islands use. */
function tablistKeyDown(
  items: readonly { id: string }[],
  activeId: string,
  setActive: (id: string) => void,
  idPrefix: string,
) {
  return (event: KeyboardEvent) => {
    const index = items.findIndex((t) => t.id === activeId);
    let next = -1;
    if (event.key === "ArrowRight") next = (index + 1) % items.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    if (next === -1) return;
    event.preventDefault();
    const id = items[next].id;
    setActive(id);
    document.getElementById(`${idPrefix}${id}`)?.focus();
  };
}

type TabLike = { id: string; label: string; Icon: ImporterTab["Icon"] };

/* One chip tablist shared by both doors; only the row split, ids, and the
   per-door quirks (dashed custom chip, shortened labels) vary. */
function DoorTabs({
  rows,
  ariaLabel,
  idPrefix,
  panelId,
  activeId,
  onSelect,
  onKeyDown,
  chipLabel,
  dashedId,
}: {
  rows: readonly TabLike[][];
  ariaLabel: string;
  idPrefix: string;
  panelId: string;
  activeId: string;
  onSelect: (id: string) => void;
  onKeyDown: (event: KeyboardEvent) => void;
  chipLabel?: (t: TabLike) => string;
  dashedId?: string;
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="flex flex-col gap-2 pt-5"
      onKeyDown={onKeyDown}
    >
      {rows.map((row) => (
        <div key={row[0].id} className="flex flex-wrap gap-2">
          {row.map((t) => (
            <button
              key={t.id}
              id={`${idPrefix}${t.id}`}
              type="button"
              role="tab"
              aria-selected={t.id === activeId}
              aria-controls={panelId}
              tabIndex={t.id === activeId ? 0 : -1}
              onClick={() => onSelect(t.id)}
              className={cn(
                "flex items-center gap-2 rounded-[9px] border px-3 py-2 font-mono text-[12px] cursor-pointer",
                t.id === activeId
                  ? "border-ink bg-ink text-background"
                  : "border-border bg-surface text-ink-soft hover:border-ember/50 hover:text-ink",
                t.id === dashedId && t.id !== activeId && "border-dashed",
              )}
            >
              <span className="flex w-[18px] shrink-0 items-center justify-center">
                <t.Icon className="size-[18px]" />
              </span>
              {chipLabel ? chipLabel(t) : t.label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export function TwoDoors() {
  const [importActive, setImportActive] = useState<string>(IMPORTERS[0].id);
  const [recordActive, setRecordActive] = useState<string>(FRAMEWORKS[0].id);
  // The record pane shows the wrapped code first; the toggle reveals what the
  // same file looked like before the one-line adapter.
  const [recordView, setRecordView] = useState<"before" | "after">("after");
  const importTab =
    IMPORTERS.find((t) => t.id === importActive) ?? IMPORTERS[0];
  const framework =
    FRAMEWORKS.find((f) => f.id === recordActive) ?? FRAMEWORKS[0];
  const activeImportFile = importedFile(importTab);

  const onImportTablistKeyDown = tablistKeyDown(
    IMPORTERS,
    importActive,
    setImportActive,
    "two-doors-import-tab-",
  );
  const onRecordTablistKeyDown = tablistKeyDown(
    FRAMEWORKS,
    recordActive,
    setRecordActive,
    "two-doors-record-tab-",
  );

  return (
    <Section id="two-doors">
      <Reveal className="max-w-3xl">
        <SectionIntro
          eyebrow="Start where you are"
          heading="Already have traces? Good. Starting fresh? Also good."
          emphasis="Starting fresh? Also good."
          description="Import what your current tools already collected, or wrap your agent in one line and record new runs. Both roads end at the same thing: sessions you can replay."
          classOverrides={{
            eyebrow:
              "inline-block font-mono text-[11px] tracking-[0.22em] text-ember uppercase",
            heading:
              "text-balance text-3xl leading-[1.1] font-medium tracking-[-0.02em] md:text-[2.75rem]",
            headingSpacing: "mt-5",
            emphasis: "text-ember",
            description:
              "max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg",
            descriptionSpacing: "mt-5",
          }}
        />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-7 lg:grid-cols-2">
        {/* Door 01 — import */}
        <Reveal delay={80} variant="left" className="h-full">
          <div className="flex h-full flex-col rounded-[14px] border border-border bg-surface p-7">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-mono text-[11px] tracking-[0.14em] text-ember uppercase">
                01 · import
              </span>
              <span className="font-mono text-[11.5px] text-ink-soft">
                no code changes
              </span>
            </div>
            <SectionIntro
              heading="Have traces? Import them."
              headingLevel={3}
              classOverrides={{
                heading: "font-heading text-[21px] font-semibold text-ink",
                headingSpacing: "mt-2",
              }}
            />

            <DoorTabs
              rows={IMPORTER_ROWS}
              ariaLabel="Trace source"
              idPrefix="two-doors-import-tab-"
              panelId="two-doors-import-panel"
              activeId={importActive}
              onSelect={setImportActive}
              onKeyDown={onImportTablistKeyDown}
              dashedId={CUSTOM_TAB_ID}
            />

            <div
              role="tabpanel"
              id="two-doors-import-panel"
              aria-labelledby={`two-doors-import-tab-${importTab.id}`}
              className="mt-5 flex flex-1 flex-col overflow-hidden rounded-[10px] bg-night"
            >
              <div className="flex items-center gap-3 border-b border-white/10 px-5 py-3">
                <span className="size-2 rounded-full bg-white/15" />
                <span className="size-2 rounded-full bg-white/15" />
                <span className="size-2 rounded-full bg-white/15" />
                <span className="font-mono text-[11px] tracking-[0.08em] text-night-text/45">
                  session import
                </span>
                <span className="ml-auto truncate font-mono text-[11px] text-ember">
                  {activeImportFile ?? importTab.label}
                </span>
              </div>

              <Reveal key={importTab.id} className="flex flex-1 flex-col">
                <pre
                  className="flex-1 overflow-x-auto px-5 py-4 font-mono text-[12.5px] leading-[1.85] code-syntax"
                  style={{ minHeight: PANE_MIN_HEIGHT }}
                >
                  <code>
                    {renderCodeLines(importTab.lines)}
                    {activeImportFile ? (
                      <>
                        {"\n\n"}
                        <span className="text-night-text/45">
                          reading {activeImportFile} … 452 traces
                        </span>
                        {"\n"}
                        <span className="text-night-text/45">
                          converting to sessions … done
                        </span>
                      </>
                    ) : null}
                  </code>
                </pre>
              </Reveal>

              <div className="border-t border-white/10 px-5 py-4 font-mono text-[11.5px] leading-relaxed">
                {activeImportFile ? (
                  <>
                    <p>
                      <span className="text-night-text/85">
                        412 sessions created
                      </span>
                      <span className="text-night-text/45">
                        {" "}
                        · 38 skipped · 2 failed
                      </span>
                    </p>
                    <p className="mt-2">
                      <span className="text-night-text/45">
                        replay readiness{" "}
                      </span>
                      <span className="text-success">ready 361</span>
                      <span className="text-night-text/35"> · </span>
                      <span className="text-warn">partial 44</span>
                      <span className="text-night-text/35"> · </span>
                      <span className="text-night-text/45">unavailable 7</span>
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <span className="text-night-text/85">
                        importer registered · my-format@latest
                      </span>
                    </p>
                    <p className="mt-2">
                      <span className="text-night-text/45">
                        then import with{" "}
                      </span>
                      <span className="text-night-text/85">
                        --importer my-format@latest
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Door 02 — record */}
        <Reveal delay={140} variant="right" className="h-full">
          <div className="flex h-full flex-col rounded-[14px] border border-border bg-surface p-7">
            <div className="flex items-center justify-between gap-4">
              <span className="shrink-0 font-mono text-[11px] tracking-[0.14em] text-ink-soft uppercase">
                02 · record
              </span>
              {/* key resets the "copied" check when the tab (and command) changes */}
              <InstallCommand key={framework.id} command={framework.install} />
            </div>
            <SectionIntro
              heading="Have an agent? Wrap it."
              headingLevel={3}
              classOverrides={{
                heading: "font-heading text-[21px] font-semibold text-ink",
                headingSpacing: "mt-2",
              }}
            />

            <DoorTabs
              rows={FRAMEWORK_ROWS}
              ariaLabel="Agent SDK"
              idPrefix="two-doors-record-tab-"
              panelId="two-doors-record-panel"
              activeId={recordActive}
              onSelect={setRecordActive}
              onKeyDown={onRecordTablistKeyDown}
              chipLabel={(t) => RECORD_CHIP_LABEL[t.id] ?? t.label}
            />

            <div
              role="tabpanel"
              id="two-doors-record-panel"
              aria-labelledby={`two-doors-record-tab-${framework.id}`}
              className="mt-5 flex flex-1 flex-col overflow-hidden rounded-[10px] border border-border bg-warm-taupe-track"
            >
              <div className="flex items-center gap-3 border-b border-border bg-black/[0.04] px-5 py-3">
                <span className="size-2 rounded-full bg-ink/15" />
                <span className="size-2 rounded-full bg-ink/15" />
                <span className="size-2 rounded-full bg-ink/15" />
                <span className="font-mono text-[11px] tracking-[0.08em] text-ink-soft">
                  recording adapter
                </span>
                <div className="ml-auto flex items-center gap-3">
                  <div className="flex items-center rounded-full border border-border bg-surface p-0.5">
                    {(["before", "after"] as const).map((v) => (
                      <button
                        key={v}
                        type="button"
                        aria-pressed={recordView === v}
                        onClick={() => setRecordView(v)}
                        className={cn(
                          "rounded-full px-2 py-0.5 font-mono text-[10.5px] whitespace-nowrap cursor-pointer transition-colors",
                          recordView === v
                            ? "bg-ink text-background"
                            : "text-ink-soft hover:text-ink",
                        )}
                      >
                        {v === "after" ? "with Kitaru" : v}
                      </button>
                    ))}
                  </div>
                  <span className="truncate font-mono text-[11px] text-ember-deep">
                    {framework.file}
                  </span>
                </div>
              </div>

              <Reveal
                key={`${framework.id}-${recordView}`}
                className="flex flex-1 flex-col"
              >
                <pre
                  className="code-syntax-light flex-1 overflow-x-auto px-5 py-4 font-mono text-[12.5px] leading-[1.85] text-ink/85"
                  style={{ minHeight: PANE_MIN_HEIGHT }}
                >
                  <code>{renderCodeLines(framework[recordView])}</code>
                </pre>
              </Reveal>

              <div className="border-t border-border px-5 py-4 font-mono text-[11px]">
                {recordView === "after" ? (
                  <>
                    <span className="text-ink">
                      session ses_8f3a91c2 recorded
                    </span>
                    <span className="text-ink-soft"> · </span>
                    <span className="text-success">replay ready</span>
                  </>
                ) : (
                  <>
                    <span className="text-ink-soft">no recording yet</span>
                    <span className="text-ink-soft"> · </span>
                    <span className="text-warn">nothing to replay</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
