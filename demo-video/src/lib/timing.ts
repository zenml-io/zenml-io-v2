/**
 * V2 Scene durations in frames (30fps).
 * Total: 5468 frames = 182.3s = 3:02.3.
 *
 * Alex clips are pre-trimmed via ffmpeg, then played at 1.10× speed
 * to fit near the 3-minute hackathon limit. The speedup is barely noticeable.
 *
 * v12b: fine-tuned trim windows based on preview (original trims clipped words).
 * Raw clip durations: 20s + 32.5s + 36s + 38s + 27.5s + 37s = 191s narration
 * At 1.10×: 173.6s narration. Plus ~9s transition padding = ~182.3s ≈ 3:02.
 * Remotion frame budget: clipDur = Math.ceil(rawDuration / 1.10 * 30)
 */
export const PLAYBACK_RATE = 1.10;

export const SECTIONS = {
  hook:         { start: 0,    duration: 588,  label: 'Hook',            clip: 'clips/alex-01-hook.mp4',          clipStart: 0,   clipDur: 546,  mode: 'fullscreen' as const },
  why:          { start: 588,  duration: 930,  label: 'Why It Matters',  clip: 'clips/alex-02-why.mp4',           clipStart: 15,  clipDur: 887,  mode: 'pip' as const },
  planning:     { start: 1518, duration: 1030, label: 'Planning',        clip: 'clips/alex-03-planning.mp4',      clipStart: 15,  clipDur: 982,  mode: 'pip' as const },
  multimodal:   { start: 2548, duration: 1080, label: 'Multi-Modal',     clip: 'clips/alex-04-multimodal.mp4',    clipStart: 15,  clipDur: 1037, mode: 'pip' as const },
  verification: { start: 3628, duration: 790,  label: 'Verification',    clip: 'clips/alex-05-verification.mp4',  clipStart: 15,  clipDur: 750,  mode: 'pip' as const },
  close:        { start: 4418, duration: 1050, label: 'Results & Close',  clip: 'clips/alex-06-results-close.mp4', clipStart: 15,  clipDur: 1010, mode: 'mixed' as const },
} as const;
// Sum: 588+930+1030+1080+790+1050 = 5468 frames = 182.3s = 3:02.3

export const FPS = 30;
export const TOTAL_FRAMES = 5468;
export const WIDTH = 1920;
export const HEIGHT = 1080;

/** Transition duration (frames) for enter/exit fades within each scene */
export const TRANSITION_FRAMES = 15;
