// CodeShowcase — "see the code" for the experiment / run model: an
// experiment is pure configuration (model, prompt, tool policy); a run is
// that config plus a cohort plus an agent version. Python/TypeScript toggle
// and annotation hover state are local; the code lines are tokenized to
// keep the site's existing `.code-syntax` highlighting instead of the
// redesign's flat single-color code lines.
import { useState } from "preact/hooks";
import { ANNOTATIONS } from "../../../lib/kitaru-landing";
import { cn } from "../../../lib/utils";
import { type CodeLine, renderCodeLines } from "./code-tokens";
import { KitaruGrain } from "./KitaruGrain";
import { Eyebrow } from "./primitives";
import { Reveal } from "./Reveal";

type Line = { tokens: CodeLine; key?: string; dim?: boolean };

const python: Line[] = [
  { tokens: [{ kw: "import" }, " kitaru"], dim: true },
  { tokens: [] },
  {
    tokens: ["client ", { op: "=" }, " kitaru.", { fn: "KitaruClient" }, "()"],
  },
  { tokens: [] },
  {
    tokens: [{ cmt: "# the sessions that matter, frozen as a named set" }],
    dim: true,
  },
  {
    tokens: ["cohort ", { op: "=" }, " client.cohorts.", { fn: "create" }, "("],
    key: "cohort",
  },
  {
    tokens: [
      "    ",
      { str: '"checkout-flow"' },
      ", sessions",
      { op: "=" },
      "session_ids,",
    ],
    key: "cohort",
  },
  { tokens: [")"], key: "cohort" },
  { tokens: [] },
  {
    tokens: [{ cmt: "# configuration only — no cohort, no version" }],
    dim: true,
  },
  {
    tokens: [
      "experiment ",
      { op: "=" },
      " client.experiments.",
      { fn: "create" },
      "(",
    ],
    key: "experiment",
  },
  { tokens: ["    ", { str: '"cheap-model"' }, ","], key: "experiment" },
  {
    tokens: ["    model", { op: "=" }, { str: '"glm-5.4"' }, ","],
    key: "model",
  },
  {
    tokens: [
      "    tool_policy",
      { op: "=" },
      { fn: "History" },
      "(scope",
      { op: "=" },
      { str: '"cohort"' },
      ", on_miss",
      { op: "=" },
      { str: '"fail"' },
      "),",
    ],
    key: "policy",
  },
  { tokens: [")"], key: "experiment" },
  { tokens: [] },
  { tokens: [{ cmt: "# a run is config + cohort + version." }], dim: true },
  {
    tokens: [
      "before ",
      { op: "=" },
      " experiment.",
      { fn: "run" },
      "(cohort",
      { op: "=" },
      "cohort, version",
      { op: "=" },
      { str: '"v1"' },
      ")",
    ],
    key: "run",
  },
  {
    tokens: [
      "after ",
      { op: "=" },
      " experiment.",
      { fn: "run" },
      "(cohort",
      { op: "=" },
      "cohort, version",
      { op: "=" },
      { str: '"pr-311"' },
      ")",
    ],
    key: "run",
  },
  { tokens: [] },
  { tokens: ["client.", { fn: "compare" }, "(before, after)"], key: "compare" },
];

const typescript: Line[] = [
  {
    tokens: [
      { kw: "import" },
      " { KitaruClient, History } ",
      { kw: "from" },
      " ",
      { str: '"@zenml-io/kitaru"' },
      ";",
    ],
    dim: true,
  },
  { tokens: [] },
  {
    tokens: [
      { kw: "const" },
      " client ",
      { op: "=" },
      " ",
      { kw: "new" },
      " ",
      { fn: "KitaruClient" },
      "();",
    ],
  },
  { tokens: [] },
  {
    tokens: [{ cmt: "// the sessions that matter, frozen as a named set" }],
    dim: true,
  },
  {
    tokens: [
      { kw: "const" },
      " cohort ",
      { op: "=" },
      " ",
      { kw: "await" },
      " client.cohorts.",
      { fn: "create" },
      "(",
    ],
    key: "cohort",
  },
  {
    tokens: ["    ", { str: '"checkout-flow"' }, ", { sessions: sessionIds },"],
    key: "cohort",
  },
  { tokens: [");"], key: "cohort" },
  { tokens: [] },
  {
    tokens: [{ cmt: "// configuration only — no cohort, no version" }],
    dim: true,
  },
  {
    tokens: [
      { kw: "const" },
      " experiment ",
      { op: "=" },
      " ",
      { kw: "await" },
      " client.experiments.",
      { fn: "create" },
      "(",
      { str: '"cheap-model"' },
      ", {",
    ],
    key: "experiment",
  },
  { tokens: ["    model: ", { str: '"glm-5.4"' }, ","], key: "model" },
  {
    tokens: [
      "    toolPolicy: ",
      { fn: "History" },
      "({ scope: ",
      { str: '"cohort"' },
      ", onMiss: ",
      { str: '"fail"' },
      " }),",
    ],
    key: "policy",
  },
  { tokens: ["});"], key: "experiment" },
  { tokens: [] },
  { tokens: [{ cmt: "// a run is config + cohort + version." }], dim: true },
  {
    tokens: [
      { kw: "const" },
      " before ",
      { op: "=" },
      " ",
      { kw: "await" },
      " experiment.",
      { fn: "run" },
      "({ cohort, version: ",
      { str: '"v1"' },
      " });",
    ],
    key: "run",
  },
  {
    tokens: [
      { kw: "const" },
      " after ",
      { op: "=" },
      " ",
      { kw: "await" },
      " experiment.",
      { fn: "run" },
      "({ cohort, version: ",
      { str: '"pr-311"' },
      " });",
    ],
    key: "run",
  },
  { tokens: [] },
  {
    tokens: [
      { kw: "await" },
      " client.",
      { fn: "compare" },
      "(before, after);",
    ],
    key: "compare",
  },
];

export function CodeShowcase() {
  const [lang, setLang] = useState<"python" | "typescript">("python");
  const [hot, setHot] = useState<string | null>(null);
  const lines = lang === "python" ? python : typescript;

  return (
    <section
      id="code-showcase"
      className="relative w-full bg-night text-night-text"
    >
      <div className="mx-auto w-full max-w-[1180px] px-6 py-24 md:py-36">
        <Reveal className="max-w-3xl">
          <Eyebrow>See the code</Eyebrow>
          <h2 className="mt-5 text-balance text-3xl leading-[1.1] font-medium tracking-[-0.025em] md:text-[2.75rem]">
            One cohort, one changed variable, two runs.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-night-text/60 md:text-lg">
            An experiment holds the configuration; a run pins it to a cohort and
            a version. Same model in Python and TypeScript. Hover any line.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1.25fr_1fr]">
          <Reveal variant="left" delay={80}>
            <div className="overflow-hidden rounded-xl border border-white/10 bg-night-surface">
              <div className="flex items-center gap-4 border-b border-white/10 px-4 py-3">
                <span className="flex gap-1.5">
                  <span className="size-2 rounded-full bg-white/15" />
                  <span className="size-2 rounded-full bg-white/15" />
                  <span className="size-2 rounded-full bg-white/15" />
                </span>
                <div className="flex gap-1">
                  {(["python", "typescript"] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setLang(l)}
                      className={cn(
                        "rounded px-2.5 py-1 font-mono text-[11px] transition-colors cursor-pointer",
                        lang === l
                          ? "bg-white/10 text-night-text"
                          : "text-night-text/45 hover:text-night-text/80",
                      )}
                    >
                      {l === "python" ? "Python" : "TypeScript"}
                    </button>
                  ))}
                </div>
                <span className="ml-auto font-mono text-[11px] text-night-text/35">
                  {lang === "python" ? "migration.py" : "migration.ts"}
                </span>
              </div>

              <pre className="overflow-x-auto px-5 py-5 font-mono text-[12.5px] leading-[1.85] code-syntax">
                <code>
                  {lines.map((l, i) => (
                    // biome-ignore lint/a11y/noStaticElementInteractions: decorative hover highlight, not a keyboard control
                    <div
                      key={i}
                      onMouseEnter={() => setHot(l.key ?? null)}
                      onMouseLeave={() => setHot(null)}
                      className={cn(
                        "-mx-2 rounded px-2 transition-colors",
                        l.dim ? "text-night-text/35" : "text-night-text/85",
                        l.key && hot === l.key && "bg-ember/15 text-night-text",
                      )}
                    >
                      {l.tokens.length ? renderCodeLines([l.tokens]) : " "}
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </Reveal>

          <Reveal
            variant="right"
            delay={140}
            className="flex flex-col gap-px bg-white/10"
          >
            {ANNOTATIONS.map((a) => (
              // biome-ignore lint/a11y/noStaticElementInteractions: decorative hover highlight, not a keyboard control
              <div
                key={a.key}
                onMouseEnter={() => setHot(a.key)}
                onMouseLeave={() => setHot(null)}
                className="relative isolate overflow-hidden bg-night px-5 py-4"
              >
                {/* blend={false}: text renders above this grain, and Safari
                    mis-stacks mix-blend layers over z-indexed siblings. */}
                <KitaruGrain
                  variant="dark"
                  blend={false}
                  active={hot === a.key}
                  className="z-0"
                />
                <code
                  className={cn(
                    "relative z-10 font-mono text-[12px] transition-colors",
                    hot === a.key ? "text-ember" : "text-night-text/70",
                  )}
                >
                  {a.label}
                </code>
                <p className="relative z-10 mt-2 text-[13px] leading-relaxed text-night-text/55">
                  {a.body}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
