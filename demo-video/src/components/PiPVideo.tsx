import React from 'react';
import { OffthreadVideo, staticFile, interpolate, useCurrentFrame } from 'remotion';

type Props = {
  src: string;
  /** Diameter of the PiP circle in pixels */
  size?: number;
  /** Position from left edge */
  left?: number;
  /** Position from bottom edge */
  bottom?: number;
  /** Border color */
  borderColor?: string;
  /** Fade in over this many frames (from scene start) */
  fadeInFrames?: number;
};

/**
 * Circular picture-in-picture video overlay.
 * Positioned absolutely — place inside an AbsoluteFill.
 */
export const PiPVideo: React.FC<Props> = ({
  src,
  size = 280,
  left = 48,
  bottom = 48,
  borderColor = 'rgba(167, 139, 250, 0.6)',
  fadeInFrames = 20,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, fadeInFrames], [0, 1], { extrapolateRight: 'clamp' });
  const scale = interpolate(frame, [0, fadeInFrames], [0.85, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        left,
        bottom,
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        border: `3px solid ${borderColor}`,
        boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
        opacity,
        transform: `scale(${scale})`,
        zIndex: 10,
      }}
    >
      <OffthreadVideo
        src={staticFile(src)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
};
