import { interpolate, spring } from 'remotion';

/** Fade in over N frames from start */
export const fadeIn = (frame: number, duration: number = 15) =>
  interpolate(frame, [0, duration], [0, 1], { extrapolateRight: 'clamp' });

/** Fade out over last N frames of a scene */
export const fadeOut = (frame: number, sceneDuration: number, duration: number = 15) =>
  interpolate(frame, [sceneDuration - duration, sceneDuration], [1, 0], { extrapolateLeft: 'clamp' });

/** Combined enter/exit opacity for a scene */
export const sceneOpacity = (frame: number, sceneDuration: number, dur: number = 15) =>
  Math.min(fadeIn(frame, dur), fadeOut(frame, sceneDuration, dur));

/** Slide up from offset */
export const slideUp = (frame: number, duration: number = 20, fromY: number = 30) =>
  interpolate(frame, [0, duration], [fromY, 0], { extrapolateRight: 'clamp' });

/** Ken Burns slow zoom */
export const kenBurns = (frame: number, duration: number, from: number = 1.0, to: number = 1.06) =>
  interpolate(frame, [0, duration], [from, to], { extrapolateRight: 'clamp' });

/** Spring pop */
export const popSpring = (frame: number, fps: number) =>
  spring({ frame, fps, config: { damping: 200 } });

/** Count up from 0 to target */
export const countUp = (frame: number, startFrame: number, duration: number, target: number) => {
  const progress = interpolate(frame - startFrame, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return Math.floor(progress * target);
};
