import { ARTICLES, LINEAGE } from "../../../lib/kitaru-landing";
import { ArrowUpRight } from "./icons";
import { KitaruGrain } from "./KitaruGrain";
import { Eyebrow, Section } from "./primitives";
import { Reveal } from "./Reveal";

export function SocialProof() {
  return (
    <Section id="social-proof" tone="surface">
      <h2 className="sr-only">Foundations and proof for Kitaru</h2>

      <Reveal className="flex flex-wrap items-center gap-x-8 gap-y-4 border-b border-border pb-10">
        <Eyebrow>Foundations</Eyebrow>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
            ZenML lineage
          </span>
          {LINEAGE.map((c) => (
            <a
              key={c.name}
              href={c.href}
              target="_blank"
              rel="noopener"
              className="text-[15px] text-ink-soft underline-offset-4 transition-colors hover:text-ember hover:underline"
            >
              {c.name}
            </a>
          ))}
        </div>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2">
        <Reveal delay={80}>
          <div className="mb-3 h-px w-10 bg-ember" />
          <div className="font-mono text-4xl tracking-[-0.03em] md:text-5xl">
            5+
          </div>
          <p className="mt-3 max-w-xs text-[14px] text-ink-soft">
            years building production workflow infrastructure
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="mb-3 h-px w-10 bg-ember" />
          <div className="font-mono text-4xl tracking-[-0.03em] md:text-5xl">
            Built
          </div>
          <p className="mt-3 max-w-xs text-[14px] text-ink-soft">
            in Kitaru today
          </p>
        </Reveal>
      </div>

      <Reveal delay={200} className="mt-20">
        <span className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
          From the blog
        </span>
      </Reveal>

      <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
        {ARTICLES.map((a, i) => (
          <Reveal key={a.href} delay={240 + i * 90}>
            <a
              href={a.href}
              className="group relative isolate flex h-full flex-col overflow-hidden bg-background p-7 transition-colors"
            >
              <KitaruGrain variant="card" className="z-0" />
              <div className="relative z-10 flex h-full flex-col">
                <span className="font-mono text-[11px] tracking-[0.14em] text-ember uppercase">
                  {a.kind}
                </span>
                <h3 className="mt-4 text-[17px] leading-snug font-medium tracking-[-0.01em]">
                  {a.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">
                  {a.summary}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[13px] text-ink-soft transition-colors group-hover:text-ember">
                  Read post
                  <ArrowUpRight class="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
