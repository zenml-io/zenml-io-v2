import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { KITARU_LINKS, KITARU_TRIAL_NOTE } from "../../../lib/kitaru-landing";
import { KITARU_VIDEO } from "../../../lib/productKitaru";
import { ArrowRight } from "./icons";
import { KitaruGrain } from "./KitaruGrain";
import { Reveal } from "./Reveal";

/**
 * The simplified 4-step poster shown on the hero's video card: one comment
 * plus one line per step, ending on the payoff comparison. Rendered inside a
 * `<pre>`, so the multi-space run in the payoff line survives.
 */
export const HERO_CODE_LINES: Array<{
  text: string;
  kind?: "cmt" | "hl" | "out";
}> = [
  { text: "# 1 · wrap the agent you already have", kind: "cmt" },
  { text: "agent = KitaruAgent(intake_agent, agent_id=AGENT_ID)", kind: "hl" },
  { text: "" },
  { text: "# 2 · the runs it already made, imported", kind: "cmt" },
  { text: "kitaru session import ./traces.jsonl" },
  { text: "" },
  { text: "# 3 · get interviewed, in your coding agent", kind: "cmt" },
  { text: "walk me through 20 of these", kind: "hl" },
  { text: '→ cohort "dropped the hazmat flag" · 9', kind: "out" },
  { text: "" },
  { text: "# 4 · change the agent, compare the runs", kind: "cmt" },
  { text: "kitaru experiment run start fix-validation" },
  { text: "v1 → 90 / 90 fail      pr-311 → 4 / 90 fail", kind: "out" },
];

/* A readable ember tint for the highlighted poster lines — the token itself
 * (oklch 0.65) sits too dark on the near-black card, so lift it toward white
 * instead of hardcoding a new hex. */
const EMBER_TINT = { color: "color-mix(in oklab, var(--ember) 70%, white)" };

/* Near-black night panel with a faint ember bloom rising from the bottom
 * edge — shared by the hero poster card and the modal's loading backdrop. */
const NIGHT_PANEL_BG = {
  background:
    "radial-gradient(circle farthest-corner at 50% 108%, color-mix(in oklab, var(--ember) 30%, transparent) 0%, transparent 65%), linear-gradient(180deg, var(--night-surface) 0%, var(--night) 100%)",
};

function PosterLine({
  text,
  kind,
}: {
  text: string;
  kind?: "cmt" | "hl" | "out";
}) {
  if (!text) return <div className="h-1.5 sm:h-3" aria-hidden="true" />;
  if (kind === "hl") return <div style={EMBER_TINT}>{text}</div>;
  return (
    <div
      className={kind === "cmt" ? "text-night-text/50" : "text-night-text/75"}
    >
      {text}
    </div>
  );
}

export function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);
  const playRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const closeVideo = useCallback(() => {
    setVideoOpen(false);
    playRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!videoOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeVideo();
        return;
      }
      /* Minimal focus trap: aria-modal hides the background from assistive
       * tech but not from keyboard focus, so cycle Tab between the dialog's
       * two focusable elements (the iframe and the ✕ button). */
      if (event.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusables =
          dialog.querySelectorAll<HTMLElement>("iframe, button");
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        const outside = !(active instanceof Node) || !dialog.contains(active);
        if (event.shiftKey) {
          if (outside || active === first) {
            event.preventDefault();
            last.focus();
          }
        } else if (outside || active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [videoOpen, closeVideo]);

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <KitaruGrain variant="hero" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      {/* Subtracting the sticky navbar height centers the hero in the space
          actually visible on the first screen. */}
      <div className="relative mx-auto flex min-h-[calc(100svh-var(--nav-h))] w-full max-w-[1440px] flex-col items-center justify-center px-6 py-12 text-center md:py-14 lg:flex-row lg:items-center lg:gap-16 lg:px-12 lg:text-left">
        <div className="flex flex-col items-center lg:flex-1 lg:items-start">
          <Reveal className="flex flex-col items-center lg:items-start">
            <p className="font-mono text-[12px] font-semibold tracking-[0.14em] text-ember uppercase">
              Kitaru by ZenML · Replay-based evals for AI agents
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-7 max-w-[920px] text-balance text-[2.1rem] leading-[1.17] font-medium tracking-[-0.02em] md:text-[46px] md:leading-[54px]">
              Your best eval data is already in production
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-5 max-w-[600px] text-[17px] leading-[27px] text-ink-soft">
              Turn real traces into replayable evals and test changes against
              what your agent has actually seen.
            </p>
          </Reveal>

          <Reveal
            delay={240}
            className="mt-8 flex flex-col items-center gap-2 lg:items-start"
          >
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={KITARU_LINKS.signup.href}
                data-analytics="Kitaru-Hero-Signup"
                className="group inline-flex items-center gap-2 rounded-md bg-ember px-5 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-ember-deep cursor-pointer"
              >
                {KITARU_LINKS.signup.label}
                <ArrowRight class="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
            <p className="text-[12.5px] text-muted-foreground">
              {KITARU_TRIAL_NOTE}
            </p>
          </Reveal>
        </div>

        <Reveal delay={320} className="mt-8 w-full lg:mt-0 lg:flex-1">
          <button
            type="button"
            ref={playRef}
            onClick={() => setVideoOpen(true)}
            aria-haspopup="dialog"
            aria-label={`Play: ${KITARU_VIDEO.caption}`}
            data-analytics="Kitaru-Hero-Video-Play"
            className="group relative mx-auto block w-full max-w-[680px] cursor-pointer overflow-hidden rounded-md border border-white/10 text-left shadow-[0_30px_80px_-40px_oklch(0.13_0.015_60/0.6)] sm:aspect-video"
            style={NIGHT_PANEL_BG}
          >
            {/* Below sm the card takes its intrinsic height (a 16:9 box is
                too short for the 13-line block on narrow phones, and
                justify-center would clip the payoff line off both ends);
                from sm up the block fits and the card locks to 16:9. */}
            <pre className="flex flex-col justify-center gap-px overflow-hidden px-5 py-4 font-mono text-[10px] leading-[1.45] sm:absolute sm:inset-0 sm:px-10 sm:py-8 sm:text-[12.5px] sm:leading-[20px]">
              {HERO_CODE_LINES.map((line, i) => (
                <PosterLine key={i} text={line.text} kind={line.kind} />
              ))}
            </pre>
            {/* Soft vignette — just enough to seat the play button without
                dimming the readable code underneath. */}
            <span
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 55% at 50% 50%, color-mix(in oklab, var(--night) 40%, transparent) 0%, transparent 70%)",
              }}
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-ember transition-transform group-hover:scale-105 sm:size-[72px]">
                <svg
                  viewBox="0 0 22 26"
                  className="ml-0.5 h-5 w-4 sm:h-[26px] sm:w-[22px]"
                  aria-hidden="true"
                >
                  <path d="M0 0 L22 13 L0 26 Z" fill="#FFFFFF" />
                </svg>
              </span>
            </span>
          </button>
          <p className="mt-[18px] text-center font-heading text-[13px] font-medium text-ink-soft">
            {KITARU_VIDEO.caption}
          </p>
        </Reveal>
      </div>

      {videoOpen && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={KITARU_VIDEO.title}
        >
          <div
            className="absolute inset-0 cursor-pointer bg-night/60"
            onClick={closeVideo}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-[960px] overflow-hidden rounded-md bg-night-surface shadow-[0_40px_120px_-40px_oklch(0.13_0.015_60/0.8)]">
            <div className="relative aspect-video" style={NIGHT_PANEL_BG}>
              <iframe
                src={KITARU_VIDEO.embedUrl}
                title={KITARU_VIDEO.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            <button
              type="button"
              ref={closeRef}
              onClick={closeVideo}
              aria-label="Close video"
              data-analytics="Kitaru-Hero-Video-Close"
              className="absolute top-4 right-4 flex size-8 cursor-pointer items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <svg
                viewBox="0 0 14 14"
                className="size-3.5"
                fill="none"
                stroke="var(--night-text)"
                stroke-width="1.5"
                stroke-linecap="round"
                aria-hidden="true"
              >
                <path d="M1 1 L13 13 M13 1 L1 13" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
