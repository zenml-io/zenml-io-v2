/**
 * V2 Scene durations in frames (30fps).
 * Total: 5445 frames = 3:01.5 (extra 1.5s buffer for gentle ending fade).
 *
 * Each section's duration = Alex's clip length + padding for transitions.
 * Alex clips drive the timing; padding provides fade-in/out breathing room.
 *
 * Clip durations: 22s + 25s + 27s + 27s + 25s + 41s = 167s narration
 * Remaining 13s distributed as transition padding.
 */
export const SECTIONS = {
  hook:         { start: 0,    duration: 750,  label: 'Hook',           clip: 'clips/alex-01-hook.mp4',          clipStart: 0,   clipDur: 660,  mode: 'fullscreen' as const },
  why:          { start: 750,  duration: 810,  label: 'Why It Matters', clip: 'clips/alex-02-why.mp4',           clipStart: 15,  clipDur: 750,  mode: 'pip' as const },
  planning:     { start: 1560, duration: 870,  label: 'Planning',       clip: 'clips/alex-03-planning.mp4',      clipStart: 15,  clipDur: 810,  mode: 'pip' as const },
  multimodal:   { start: 2430, duration: 870,  label: 'Multi-Modal',    clip: 'clips/alex-04-multimodal.mp4',    clipStart: 15,  clipDur: 810,  mode: 'pip' as const },
  verification: { start: 3300, duration: 810,  label: 'Verification',   clip: 'clips/alex-05-verification.mp4',  clipStart: 15,  clipDur: 750,  mode: 'pip' as const },
  close:        { start: 4110, duration: 1335, label: 'Results & Close', clip: 'clips/alex-06-results-close.mp4', clipStart: 15,  clipDur: 1275, mode: 'mixed' as const },
} as const;
// Sum: 750+810+870+870+810+1335 = 5445 (3:01.5 — extra 1.5s for gentle fade-out)

export const FPS = 30;
export const TOTAL_FRAMES = 5445;
export const WIDTH = 1920;
export const HEIGHT = 1080;

/** Transition duration (frames) for enter/exit fades within each scene */
export const TRANSITION_FRAMES = 15;
