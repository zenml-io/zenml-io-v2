/**
 * Scene durations in frames (30fps) — beat-aligned to bgm.mp3 (~129 BPM).
 * Must sum to 5400 (3 minutes).
 *
 * Beat alignment offsets (from analysis):
 *   Hook→Problem:    454f  (+4)
 *   Problem→Pipeline: 1045f (-5)
 *   Pipeline→Walk:   2105f (+5)
 *   Walk→Opus:       3305f (+5)
 *   Opus→Numbers:    4504f (+4)
 *   Numbers→Outro:   4954f (+4)
 *   END:             5395f (-5)
 */
export const SCENES = {
  hook:       { start: 0,    duration: 454,  label: 'Hook' },
  problem:    { start: 454,  duration: 591,  label: 'The Problem' },
  pipeline:   { start: 1045, duration: 1060, label: 'The Pipeline' },
  walkthrough:{ start: 2105, duration: 1200, label: 'Live Site' },
  opus:       { start: 3305, duration: 1199, label: 'Opus 4.6' },
  numbers:    { start: 4504, duration: 450,  label: 'By The Numbers' },
  outro:      { start: 4954, duration: 446,  label: 'Outro' },
} as const;
// Sum: 454+591+1060+1200+1199+450+446 = 5400 ✓

export const FPS = 30;
export const TOTAL_FRAMES = 5400;
export const WIDTH = 1920;
export const HEIGHT = 1080;

/** Transition duration (frames) for enter/exit fades within each scene */
export const TRANSITION_FRAMES = 15;
