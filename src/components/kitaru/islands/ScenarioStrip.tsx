import { useState } from "preact/hooks";
import { SCENARIOS } from "../../../lib/kitaru-landing";
import { cn } from "../../../lib/utils";
import { KitaruGrain } from "./KitaruGrain";
import { Eyebrow, Section } from "./primitives";
import { Reveal } from "./Reveal";

const checkpoints = [
  "run",
  "lookup_order",
  "retrieve",
  "model_request",
  "reply",
];

export function ScenarioStrip() {
  // Links checkpoint i+1 on the session spine to card i below — hovering
  // either side highlights both, same shared-state pattern as CodeShowcase's
  // code-line ↔ annotation link. "run" (index 0) has no card.
  const [hot, setHot] = useState<number | null>(null);

  return (
    <Section id="scenario-strip" tone="surface">
      <Reveal className="max-w-3xl">
        <Eyebrow>The same move, every time</Eyebrow>
        <h2 className="mt-5 text-balance text-3xl leading-[1.1] font-medium tracking-[-0.025em] md:text-[2.75rem]">
          One cohort of real sessions.
          <br />
          <span className="text-ember">A different question each time.</span>
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
          You read a few. The agent groups the rest. One change per experiment,
          and the answer is two runs side by side.
        </p>
      </Reveal>

      {/* recorded session spine */}
      <Reveal delay={100} className="mt-16">
        <div className="mb-3 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
          session ses_8f3a91c2 · recorded
        </div>
        <div className="relative flex items-center justify-between border-t border-dashed border-border pt-0">
          {checkpoints.map((c, i) => {
            const linked = i > 0 ? i - 1 : null;
            return (
              // biome-ignore lint/a11y/noStaticElementInteractions: decorative hover link, not a keyboard control
              <div
                key={c}
                onMouseEnter={
                  linked === null ? undefined : () => setHot(linked)
                }
                onMouseLeave={linked === null ? undefined : () => setHot(null)}
                className="relative -mt-[5px] flex flex-col items-center gap-2"
              >
                <span
                  className={cn(
                    "size-2.5 rounded-full border border-ember transition-colors",
                    linked !== null && hot === linked
                      ? "bg-ember"
                      : "bg-background",
                  )}
                />
                <span
                  className={cn(
                    "hidden font-mono text-[10.5px] transition-colors sm:block",
                    linked !== null && hot === linked
                      ? "text-ember"
                      : "text-muted-foreground",
                  )}
                >
                  {c}
                </span>
              </div>
            );
          })}
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {SCENARIOS.map((s, i) => (
          <Reveal key={s.tag} delay={120 + i * 90} className="flex">
            {/* biome-ignore lint/a11y/noStaticElementInteractions: decorative hover link, not a keyboard control */}
            <div
              onMouseEnter={() => setHot(i)}
              onMouseLeave={() => setHot(null)}
              className={cn(
                "group relative isolate flex flex-1 flex-col justify-between overflow-hidden bg-background p-7 transition-colors",
                hot === i && "bg-ember-light/50",
              )}
            >
              <KitaruGrain variant="card" active={hot === i} className="z-0" />
              <div className="relative z-10">
                <span className="font-mono text-[11px] tracking-[0.16em] text-ember uppercase">
                  {s.tag}
                </span>
                <p className="mt-5 text-[17px] leading-snug font-medium tracking-[-0.01em]">
                  {s.q}
                </p>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">
                  {s.outcome}
                </p>
              </div>
              <div className="relative z-10 mt-10 border-t border-border pt-4">
                <div className="font-mono text-2xl tracking-[-0.02em]">
                  {s.stat}
                </div>
                <div className="mt-1 text-[11.5px] text-muted-foreground">
                  {s.statLabel}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
