import type { ComponentChildren } from "preact";
import {
  KITARU_INSTALL_CMD,
  KITARU_LICENSE,
  KITARU_LINKS,
  KITARU_TRIAL_NOTE,
} from "../../../lib/kitaru-landing";
import { ArrowRight } from "./icons";
import { KitaruGrain } from "./KitaruGrain";
import { CopyCommand } from "./primitives";
import { Reveal } from "./Reveal";

const codeLines: Array<{ text: string; kind?: "cmt" | "hl" | "out" | "cont" }> =
  [
    { text: "# 1 · wrap the agent you already have", kind: "cmt" },
    { text: "agent = KitaruAgent(intake_agent)", kind: "hl" },
    { text: "" },
    { text: "# 2 · the runs it already made, imported", kind: "cmt" },
    { text: "kitaru session import ./traces.jsonl \\" },
    { text: "  --agent intake-agent", kind: "cont" },
    { text: "" },
    { text: "# 3 · get interviewed, in your coding agent", kind: "cmt" },
    { text: "walk me through 20 of these", kind: "hl" },
    { text: '→ cohort "dropped the hazmat flag" · 9', kind: "out" },
    { text: "→ evaluator hazmat-flag-preserved", kind: "out" },
    { text: "" },
    { text: "# 4 · change the agent, compare the runs", kind: "cmt" },
    { text: "kitaru experiment run fix-validation \\", kind: "hl" },
    { text: "  --cohort hazmat-all --version pr-311", kind: "cont" },
  ];

const diffRows = [
  { label: "Your notes, 20 read", value: "1 evaluator, 3 cohorts" },
  { label: "Held-out, blind", value: "the check holds up" },
  { label: "run 2 · version v1", value: "90 / 90 fail" },
  { label: "run 3 · version pr-311", value: "4 / 90 fail", win: true },
];

/**
 * Token rules for the hero panel's mixed shell/Python lines, so the block
 * carries the same `.code-syntax` token markup as the rest of the site's code
 * blocks instead of flat single-colour lines. Alternatives, in order:
 *
 *   1. a double-quoted string      → `.str`
 *   2. the `import` subcommand     → `.fn`
 *   3. an identifier before a `(`  → `.fn`  (a call)
 *   4. `=` or a trailing `\`       → `.op`
 *
 * Comment lines are handled separately — the whole line becomes one `.cmt`.
 */
const CODE_TOKEN_RE =
  /("[^"]*")|(\bimport\b)|([A-Za-z_][A-Za-z0-9_]*)(?=\()|([=\\])/g;

function tokenizeLine(text: string): ComponentChildren[] {
  const out: ComponentChildren[] = [];
  let cursor = 0;
  CODE_TOKEN_RE.lastIndex = 0;

  for (
    let match = CODE_TOKEN_RE.exec(text);
    match !== null;
    match = CODE_TOKEN_RE.exec(text)
  ) {
    if (match.index > cursor) out.push(text.slice(cursor, match.index));
    const token = match[1] ? "str" : match[4] ? "op" : "fn";
    out.push(<span class={token}>{match[0]}</span>);
    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) out.push(text.slice(cursor));
  return out;
}

function CodeLine({
  text,
  kind,
}: {
  text: string;
  kind?: "cmt" | "hl" | "out" | "cont";
}) {
  if (!text) return <div className="text-night-text/70">{"\u00a0"}</div>;

  return (
    <div
      className={
        kind === "cmt"
          ? "text-night-text/35"
          : kind === "out"
            ? "text-ember/90"
            : kind === "hl"
              ? "text-night-text"
              : "text-night-text/70"
      }
    >
      {kind === "cmt" ? <span class="cmt">{text}</span> : tokenizeLine(text)}
    </div>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <KitaruGrain variant="hero" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      {/* Subtracting the sticky navbar height centers the hero in the space
          actually visible on the first screen. */}
      <div className="relative mx-auto grid min-h-[calc(100svh-var(--nav-h))] w-full max-w-[1180px] grid-cols-1 content-center items-center gap-16 px-6 py-20 md:py-24 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <Reveal className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-ember/30 bg-ember-light/70 px-3 py-1 text-[12px] text-ember-deep">
              <span className="pulse-dot size-1.5" />
              Kitaru by ZenML
            </span>
            <span className="rounded-full border border-border bg-surface/70 px-3 py-1 text-[12px] text-ink-soft">
              Open source · {KITARU_LICENSE}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-8 text-balance text-[2.6rem] leading-[1.04] font-medium tracking-[-0.032em] md:text-[3.9rem]">
              Your agent writes to real systems.
              <br />
              <span className="text-ember">You can't test it there.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 font-mono text-[13px] tracking-tight text-ink-soft">
              You already knew that. Your architecture told you.
            </p>
            <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-ink-soft">
              So test it against what it already did. Kitaru replays your real
              runs against your next change, and shows you what would have
              broken.
            </p>
          </Reveal>

          <Reveal delay={240} className="mt-10">
            <p className="mb-3 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              One wrapper, no rewrite
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <CopyCommand cmd={KITARU_INSTALL_CMD} />
              <a
                href={KITARU_LINKS.signup.href}
                className="group inline-flex items-center gap-2 rounded-md bg-ember px-5 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-ember-deep cursor-pointer"
              >
                {KITARU_LINKS.signup.label}
                <ArrowRight class="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
            <p className="mt-3 text-[12.5px] text-muted-foreground">
              {KITARU_TRIAL_NOTE}
            </p>
          </Reveal>
        </div>

        <Reveal delay={200} variant="right">
          <div className="overflow-hidden rounded-xl border border-border bg-night shadow-[0_30px_80px_-40px_oklch(0.13_0.015_60/0.6)]">
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <span className="flex gap-1.5">
                <span className="size-2 rounded-full bg-white/20" />
                <span className="size-2 rounded-full bg-white/20" />
                <span className="size-2 rounded-full bg-white/20" />
              </span>
              <span className="font-mono text-[11px] text-night-text/50">
                replay · intake-agent
              </span>
              <span className="ml-auto rounded border border-ember/40 px-2 py-0.5 font-mono text-[10px] text-ember">
                case
              </span>
            </div>

            <pre className="code-syntax overflow-x-auto px-5 py-5 font-mono text-[12px] leading-[1.75]">
              <code>
                {codeLines.map((l, i) => (
                  <CodeLine key={i} text={l.text} kind={l.kind} />
                ))}
              </code>
            </pre>

            <div className="border-t border-white/10">
              {diffRows.map((r) => (
                <div
                  key={r.label}
                  className="flex items-center justify-between border-b border-white/5 px-5 py-2.5 last:border-b-0"
                >
                  <span className="text-[12.5px] text-night-text/55">
                    {r.label}
                  </span>
                  <span
                    className={`font-mono text-[12px] ${r.win ? "text-success" : "text-night-text/80"}`}
                  >
                    {r.value}
                  </span>
                </div>
              ))}
            </div>

            <p className="border-t border-white/10 px-5 py-3.5 text-[12px] text-night-text/45">
              What ops caught by hand is now a check that runs on every commit.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
