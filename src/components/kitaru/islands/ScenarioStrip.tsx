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
  // either side highlights both via shared hover state. "run" (index 0)
  // has no card.
  const [hot, setHot] = useState<number | null>(null);

  return (
    <Section id="scenario-strip" tone="surface">
      <Reveal className="max-w-3xl">
        <Eyebrow>Stop guessing</Eyebrow>
        <h2 className="mt-space-sm font-display text-[32px] leading-[36px] text-balance text-(--color-cream-900) md:text-[44px] md:leading-[48px]">
          You already suspect what's wrong.
          <br />
          <span className="text-ember">Now you can check.</span>
        </h2>
        <p className="mt-space-sm max-w-2xl font-sans text-[17px] leading-[26px] text-foreground md:text-[18px] md:leading-[27px]">
          Every trace you import becomes a session, a replayable record of one
          real agent run. Take the ones that went sideways, change the one thing
          you suspect, and run them again. Two runs, side by side, and you know.
        </p>
      </Reveal>

      {/* recorded session spine */}
      <Reveal delay={100} className="mt-16">
        <div className="mb-3 font-label text-[13px] tracking-[0.05em] text-muted-foreground uppercase">
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

      <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[20px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
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
                <span className="font-label text-[13px] tracking-[0.05em] text-ember uppercase">
                  {s.tag}
                </span>
                <p className="mt-5 font-display text-[22px] leading-[28px] text-(--color-cream-900)">
                  {s.q}
                </p>
                <p className="mt-3 text-[14px] leading-[1.45] text-ink-soft">
                  {s.outcome}
                </p>
              </div>
              <div className="relative z-10 mt-10 border-t border-border pt-4">
                <div className="font-display text-[28px] leading-[32px] text-(--color-cream-900)">
                  {s.stat}
                </div>
                <div className="mt-1 font-label text-[12px] uppercase tracking-[0.05em] text-muted-foreground">
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
