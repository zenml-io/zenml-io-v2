import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { sceneOpacity, slideUp } from '../lib/anim';
import { TRANSITION_FRAMES } from '../lib/timing';

type Props = {
  durationInFrames: number;
  children: React.ReactNode;
  bg?: string;
};

/** Wraps each scene with consistent enter/exit fade + slide */
export const SceneShell: React.FC<Props> = ({
  durationInFrames,
  children,
  bg = '#0f0a1e',
}) => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, durationInFrames, TRANSITION_FRAMES);
  const y = frame < TRANSITION_FRAMES ? slideUp(frame, TRANSITION_FRAMES, 20) : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bg,
        opacity,
        transform: `translateY(${y}px)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
