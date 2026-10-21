import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { KITARU_VIDEO } from "../../../lib/productKitaru";

/**
 * HeroVideo — the hero's code card and the launch-video dialog. The card is
 * an illustration of the model-choice flow, not a video poster: the caption
 * beneath it is the control that opens the launch video, so the card never
 * implies the video shows those commands. The hero copy, pills and install
 * chip render statically from Hero.astro; this island only owns the one
 * interaction on the band (open / close the video).
 */

/**
 * The simplified 4-step poster shown on the hero's video card: one comment
 * plus the command for each step of choosing a model. Rendered inside a
 * `<pre>`, so the multi-space run in the payoff line survives.
 */
export const HERO_CODE_LINES: Array<{
  text: string;
  kind?: "cmt" | "hl" | "out";
}> = [
  { text: "# 1 · the runs your agent already made", kind: "cmt" },
  { text: "kitaru session import ./traces.jsonl" },
  { text: "" },
  { text: "# 2 · resend them to the models you're weighing", kind: "cmt" },
  { text: "> use kitaru-model-swap on this agent", kind: "hl" },
  { text: "" },
  { text: "# 3 · read the report", kind: "cmt" },
  { text: "best mix · 3 models      −68% per call", kind: "out" },
  { text: "" },
  { text: "# 4 · prove the winner on whole sessions", kind: "cmt" },
  { text: "kitaru experiment run start best-mix" },
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
      <div
        className="relative mx-auto block w-full max-w-[680px] overflow-hidden rounded-[20px] border border-white/10 text-left sm:aspect-video"
        style={NIGHT_PANEL_BG}
      >
        {/* Below sm the card takes its intrinsic height (a 16:9 box is
            too short for the block on narrow phones, and justify-center
            would clip lines off both ends); from sm up the block fits and
            the card locks to 16:9. */}
        <pre className="flex flex-col justify-center gap-px overflow-hidden px-5 py-4 font-mono text-[10px] leading-[1.45] sm:absolute sm:inset-0 sm:px-10 sm:py-8 sm:text-[12.5px] sm:leading-[20px]">
          {HERO_CODE_LINES.map((line, i) => (
            <PosterLine key={i} text={line.text} kind={line.kind} />
          ))}
        </pre>
      </div>
      <p className="mt-[18px] text-center">
        <button
          type="button"
          ref={playRef}
          onClick={() => setVideoOpen(true)}
          aria-haspopup="dialog"
          data-analytics="Kitaru-Hero-Video-Play"
          className="inline-flex cursor-pointer items-center gap-2 text-[14px] text-ink-soft underline decoration-ink-soft/40 underline-offset-4 transition-colors duration-200 ease-out hover:text-ink hover:decoration-ink"
        >
          <svg
            viewBox="0 0 22 26"
            className="h-3 w-2.5 text-ember"
            aria-hidden="true"
          >
            <path d="M0 0 L22 13 L0 26 Z" fill="currentColor" />
          </svg>
          {KITARU_VIDEO.caption}
        </button>
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
