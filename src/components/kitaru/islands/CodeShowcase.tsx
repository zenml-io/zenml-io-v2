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

export const PYTHON_SHOWCASE: Line[] = [
  {
    tokens: [{ cmt: "# Inside an async function; only the model changes." }],
    dim: true,
  },
  {
    tokens: ["common ", { op: "=" }, " ", { fn: "dict" }, "("],
    key: "experiment",
  },
  {
    tokens: ["    agent_id", { op: "=" }, "AGENT_ID,"],
    key: "experiment",
  },
  {
    tokens: [
      "    tool_policy",
      { op: "=" },
      { fn: "ToolPolicy" },
      "(default",
      { op: "=" },
      { fn: "HistoryConfig" },
      "(",
    ],
    key: "policy",
  },
  {
    tokens: [
      "        scope",
      { op: "=" },
      { str: '"cohort_version"' },
      ", on_miss",
      { op: "=" },
      { str: '"fail"' },
      ")),",
    ],
    key: "policy",
  },
  {
    tokens: [
      "    evaluators",
      { op: "=" },
      "[",
      { fn: "EvaluatorConfig" },
      "(evaluator",
      { op: "=" },
      { str: '"response-quality"' },
      ", version",
      { op: "=" },
      "1)],",
    ],
    key: "experiment",
  },
  { tokens: [")"], key: "experiment" },
  { tokens: [] },
  {
    tokens: [
      "baseline ",
      { op: "=" },
      " ",
      { kw: "await" },
      " client.experiments.",
      { fn: "create" },
      "(",
    ],
    key: "experiment",
  },
  {
    tokens: [
      "    ",
      { fn: "ExperimentCreateRequest" },
      "(name",
      { op: "=" },
      { str: '"baseline"' },
      ", ",
      { op: "**" },
      "common))",
    ],
    key: "experiment",
  },
  {
    tokens: [
      "candidate ",
      { op: "=" },
      " ",
      { kw: "await" },
      " client.experiments.",
      { fn: "create" },
      "(",
    ],
    key: "experiment",
  },
  {
    tokens: [
      "    ",
      { fn: "ExperimentCreateRequest" },
      "(name",
      { op: "=" },
      { str: '"cheap-model"' },
      ",",
    ],
    key: "experiment",
  },
  {
    tokens: [
      "        override",
      { op: "=" },
      { fn: "ReplayOverride" },
      "(model",
      { op: "=" },
      { str: '"claude-haiku-4.5"' },
      "), ",
      { op: "**" },
      "common))",
    ],
    key: "model",
  },
  { tokens: [] },
  {
    tokens: [
      "run_spec ",
      { op: "=" },
      " ",
      { fn: "ExperimentRunCreateRequest" },
      "(",
    ],
    key: "cohort",
  },
  {
    tokens: ["    cohort_version_id", { op: "=" }, "COHORT_VERSION_ID,"],
    key: "cohort",
  },
  {
    tokens: [
      "    agent_version_id",
      { op: "=" },
      "AGENT_VERSION_ID, evaluate_baselines",
      { op: "=" },
      { kw: "True" },
      ")",
    ],
    key: "cohort",
  },
  {
    tokens: [{ kw: "await" }, " ", { fn: "asyncio.gather" }, "("],
    key: "run",
  },
  {
    tokens: [
      "    client.experiments.",
      { fn: "start_run" },
      "(baseline.id, run_spec),",
    ],
    key: "run",
  },
  {
    tokens: [
      "    client.experiments.",
      { fn: "start_run" },
      "(candidate.id, run_spec),",
    ],
    key: "run",
  },
  { tokens: [")"], key: "run" },
];

export const TYPESCRIPT_SHOWCASE: Line[] = [
  {
    tokens: [{ cmt: "// One shared setup; only the model changes." }],
    dim: true,
  },
  {
    tokens: [{ kw: "const" }, " common ", { op: "=" }, " { agent_id: agentId,"],
    key: "experiment",
  },
  {
    tokens: ["  tool_policy: { default: { type: ", { str: '"history"' }, ","],
    key: "policy",
  },
  {
    tokens: [
      "    scope: ",
      { str: '"cohort_version"' },
      ", on_miss: ",
      { str: '"fail"' },
      " } },",
    ],
    key: "policy",
  },
  {
    tokens: [
      "  evaluators: [{ evaluator: ",
      { str: '"response-quality"' },
      ", version: 1 }],",
    ],
    key: "experiment",
  },
  { tokens: ["};"], key: "experiment" },
  { tokens: [] },
  {
    tokens: [
      { kw: "const" },
      " baseline ",
      { op: "=" },
      " ",
      { kw: "await" },
      " client.experiments.",
      { fn: "create" },
      "({",
    ],
    key: "experiment",
  },
  {
    tokens: ["  name: ", { str: '"baseline"' }, ", ...common });"],
    key: "experiment",
  },
  {
    tokens: [
      { kw: "const" },
      " candidate ",
      { op: "=" },
      " ",
      { kw: "await" },
      " client.experiments.",
      { fn: "create" },
      "({",
    ],
    key: "experiment",
  },
  {
    tokens: ["  name: ", { str: '"cheap-model"' }, ", ...common,"],
    key: "experiment",
  },
  {
    tokens: ["  override: { model: ", { str: '"claude-haiku-4.5"' }, " },"],
    key: "model",
  },
  { tokens: ["});"], key: "experiment" },
  { tokens: [] },
  {
    tokens: [
      { kw: "const" },
      " runSpec ",
      { op: "=" },
      " { cohort_version_id: cohortVersionId,",
    ],
    key: "cohort",
  },
  {
    tokens: [
      "  agent_version_id: agentVersionId, evaluate_baselines: ",
      { kw: "true" },
      " };",
    ],
    key: "cohort",
  },
  {
    tokens: [{ kw: "await" }, " ", { fn: "Promise.all" }, "(["],
    key: "run",
  },
  {
    tokens: [
      "  client.experiments.",
      { fn: "startRun" },
      "(baseline.id, runSpec),",
    ],
    key: "run",
  },
  {
    tokens: [
      "  client.experiments.",
      { fn: "startRun" },
      "(candidate.id, runSpec),",
    ],
    key: "run",
  },
  { tokens: ["]);"], key: "run" },
];

export function CodeShowcase() {
  const [lang, setLang] = useState<"python" | "typescript">("python");
  const [hot, setHot] = useState<string | null>(null);
  const lines = lang === "python" ? PYTHON_SHOWCASE : TYPESCRIPT_SHOWCASE;

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
            Each experiment holds one configuration; each run pins it to the
            same cohort and agent version. The same SDK excerpt is shown in
            Python and TypeScript. Hover any line.
          </p>
        </Reveal>

        <div
          data-kitaru-showcase-grid
          className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1.25fr_1fr]"
        >
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
                      aria-pressed={lang === l}
                      onClick={() => {
                        setLang(l);
                        setHot(null);
                      }}
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

          <Reveal variant="right" delay={140} className="self-start">
            <div
              data-kitaru-annotations
              className="flex flex-col gap-px bg-white/10"
            >
              {ANNOTATIONS.map((a) => (
                // biome-ignore lint/a11y/noStaticElementInteractions: decorative hover highlight, not a keyboard control
                <div
                  key={a.key}
                  data-kitaru-annotation
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
                    {a.label[lang]}
                  </code>
                  <p className="relative z-10 mt-2 text-[13px] leading-relaxed text-night-text/55">
                    {a.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
