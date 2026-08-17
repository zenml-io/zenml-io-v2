// Importers — vertical tab list of trace sources on the left, one terminal
// pane on the right. Same WAI-ARIA tabs pattern as OneImport, but oriented
// vertically (ArrowUp/ArrowDown instead of ArrowLeft/ArrowRight) since the
// tab list is a stacked column, not a row.
//
// Commands must match the shipped `kitaru session import` CLI exactly —
// don't invent flags. The five built-in importers (kitaru/langfuse,
// kitaru/langsmith, kitaru/braintrust, kitaru/logfire, kitaru/kitaru-jsonl)
// and the `kitaru importer scaffold/test/register` custom-importer flow are
// verified against current CLI docs ("Import your traces" overview:
// "Importers for Langfuse, LangSmith, Braintrust, Logfire, and a native
// JSONL format are built in, registered ... under the kitaru/ namespace").
import type { SVGAttributes } from "preact";
import { useState } from "preact/hooks";
import { cn } from "../../../lib/utils";
import {
  BraintrustIcon,
  KitaruIcon,
  LangChainIcon,
  LangfuseIcon,
  LogfireIcon,
} from "./brand-icons";
import { type CodeLine, renderCodeLines } from "./code-tokens";
import { Eyebrow, Lede, Section, SectionTitle } from "./primitives";
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

/** The five built-in importers share every flag except the source file and
 *  the `--importer` reference, so the command is built once and varied
 *  per-tab instead of retyping the same lines five times. */
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
    { op: "--entrypoint" },
    " ",
    { var: "parse" },
    " ",
    { op: "--payload" },
    " ",
    { str: "sample-export.jsonl" },
  ],
  [],
  [
    { op: "$ " },
    { kw: "kitaru" },
    " ",
    { var: "importer register" },
    " ",
    { str: "my-format" },
    " ",
    { op: "--script" },
    " ",
    { str: "my_format_importer.py" },
    " ",
    { op: "--entrypoint" },
    " ",
    { var: "parse" },
    " ",
    { op: "--provider" },
    " ",
    { str: "my-format" },
  ],
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

export function Importers() {
  const [active, setActive] = useState<string>(IMPORTERS[0].id);
  const tab = IMPORTERS.find((t) => t.id === active) ?? IMPORTERS[0];

  // WAI-ARIA tabs pattern, vertical orientation: ArrowUp/ArrowDown move
  // selection with roving focus instead of ArrowLeft/ArrowRight.
  const onTablistKeyDown = (event: KeyboardEvent) => {
    const index = IMPORTERS.findIndex((t) => t.id === active);
    let next = -1;
    if (event.key === "ArrowDown") next = (index + 1) % IMPORTERS.length;
    else if (event.key === "ArrowUp")
      next = (index - 1 + IMPORTERS.length) % IMPORTERS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = IMPORTERS.length - 1;
    if (next === -1) return;
    event.preventDefault();
    const id = IMPORTERS[next].id;
    setActive(id);
    document.getElementById(`importers-tab-${id}`)?.focus();
  };

  return (
    <Section id="importers" tone="surface">
      <Reveal className="max-w-3xl">
        <Eyebrow>The runs you already have</Eyebrow>
        <SectionTitle className="mt-5">
          Your agents already ran.
          <br />
          <span className="text-ember">Import the traces and replay.</span>
        </SectionTitle>
        <Lede className="mt-5">
          Export from the tool you already run, then one command turns each
          trace into a replayable Kitaru session. Your observability stack stays
          the system of record — Kitaru keeps a runnable copy.
        </Lede>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-7 lg:grid-cols-[400px_1fr] items-start">
        <div
          role="tablist"
          aria-label="Trace source"
          aria-orientation="vertical"
          className="flex flex-col gap-2"
          onKeyDown={onTablistKeyDown}
        >
          {IMPORTERS.map((t) => (
            <button
              key={t.id}
              id={`importers-tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={t.id === active}
              aria-controls="importers-panel"
              tabIndex={t.id === active ? 0 : -1}
              onClick={() => setActive(t.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-[10px] border px-4 py-3 font-mono text-[13px] transition-all cursor-pointer text-left",
                t.id === active
                  ? "border-ink bg-ink text-background"
                  : "border-border bg-surface text-ink-soft hover:border-ember/50 hover:text-ink",
                t.id === CUSTOM_TAB_ID && "border-dashed",
              )}
            >
              <span className="flex w-7 shrink-0 items-center justify-center">
                <t.Icon className="size-[18px]" />
              </span>
              {t.label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id="importers-panel"
          aria-labelledby={`importers-tab-${tab.id}`}
          className="min-w-0 overflow-hidden rounded-xl bg-night"
        >
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-3">
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/15" />
            <span className="font-mono text-[11px] tracking-[0.08em] text-night-text/45">
              kitaru · session import
            </span>
          </div>

          <Reveal key={active}>
            <pre className="overflow-x-auto px-5 py-5 font-mono text-[12.5px] leading-[1.8] code-syntax">
              <code>{renderCodeLines(tab.lines)}</code>
            </pre>
          </Reveal>

          {tab.id !== CUSTOM_TAB_ID && (
            <div className="border-t border-white/10 px-5 py-4 font-mono text-[11.5px] leading-relaxed">
              <p>
                <span className="text-night-text/85">412 sessions created</span>
                <span className="text-night-text/45">
                  {" "}
                  · 38 skipped · 2 failed
                </span>
              </p>
              <p className="mt-2">
                <span className="text-night-text/45">replay readiness </span>
                <span className="text-success">ready 361</span>
                <span className="text-night-text/35"> · </span>
                <span className="text-warn">partial 44</span>
                <span className="text-night-text/35"> · </span>
                <span className="text-night-text/45">unavailable 7</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
