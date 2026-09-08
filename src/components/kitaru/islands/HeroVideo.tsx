import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { KITARU_VIDEO } from "../../../lib/productKitaru";

/**
 * HeroVideo — the hero's poster card and the video dialog it opens. The
 * hero copy, pills and install chip render statically from Hero.astro; this
 * island only owns the one interaction on the band (open / close the video).
 */

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

/* A readable ember tint for the highlighted poster lines — the accent itself
 * sits too dark on the near-black card, so lift it toward white instead of
 * hardcoding a new hex. */
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

export function HeroVideo() {
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
    <>
      <button
        type="button"
        ref={playRef}
        onClick={() => setVideoOpen(true)}
        aria-haspopup="dialog"
        aria-label={`Play: ${KITARU_VIDEO.caption}`}
        data-analytics="Kitaru-Hero-Video-Play"
        className="group relative mx-auto block w-full max-w-[680px] cursor-pointer overflow-hidden rounded-[20px] border border-white/10 text-left sm:aspect-video"
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
      <p className="mt-[18px] text-center text-[14px] text-ink-soft">
        {KITARU_VIDEO.caption}
      </p>

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
          <div className="relative w-full max-w-[960px] overflow-hidden rounded-[20px] bg-night-surface">
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
    </>
  );
}
