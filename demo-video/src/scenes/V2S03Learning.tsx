import React from 'react';
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { SceneShell } from '../components/SceneShell';
import { PiPVideo } from '../components/PiPVideo';
import { fadeIn, slideUp } from '../lib/anim';

type Props = {
  durationInFrames: number;
  /** Alex webcam clip path */
  alexClip: string;
  /** Frame offset where Alex clip starts within this scene */
  clipStart: number;
  /** Duration of the Alex clip in frames */
  clipDur: number;
  /** B-roll video path (demo site recording) */
  brollSrc: string;
  /** Frames to skip at start of B-roll (page load time) */
  brollSkip: number;
  /** Optional second B-roll clip — crossfades in at midpoint */
  brollSrc2?: string;
  /** Frames to skip at start of second B-roll */
  brollSkip2?: number;
  /** Small tag text (e.g. "Planning") */
  tag: string;
  /** Big headline text */
  headline: string;
  /** Tag accent color */
  tagColor?: string;
};

/** Duration of the crossfade between B-roll clips (frames) */
const CROSSFADE_DUR = 45;

/**
 * Reusable Learning section (3a, 3b, 3c).
 * Demo B-roll fills background, headline text overlaid at top,
 * PiP Alex bottom-left narrates.
 *
 * When brollSrc2 is provided, the two clips crossfade at the midpoint
 * of the scene, showing two different pages for visual variety.
 */
export const V2S03Learning: React.FC<Props> = ({
  durationInFrames,
  alexClip,
  clipStart,
  clipDur,
  brollSrc,
  brollSkip,
  brollSrc2,
  brollSkip2 = 0,
  tag,
  headline,
  tagColor = '#a78bfa',
}) => {
  const frame = useCurrentFrame();

  // Crossfade midpoint — slightly before halfway so clip 2 gets more airtime
  const crossfadeAt = Math.floor(durationInFrames * 0.45);
  const hasDualBroll = !!brollSrc2;

  // Clip 1 opacity: full → fades out at crossfade point
  const clip1Opacity = hasDualBroll
    ? interpolate(
        frame,
        [crossfadeAt, crossfadeAt + CROSSFADE_DUR],
        [1, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      )
    : 1;

  // Clip 2 opacity: invisible → fades in at crossfade point
  const clip2Opacity = hasDualBroll
    ? interpolate(
        frame,
        [crossfadeAt, crossfadeAt + CROSSFADE_DUR],
        [0, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      )
    : 0;

  const videoStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'top',
  };

  return (
    <SceneShell durationInFrames={durationInFrames} bg="#0f0a1e">
      <AbsoluteFill>
        {/* B-roll clip 1 — fades out at crossfade point (or stays if no clip 2) */}
        <div style={{ position: 'absolute', inset: 0, opacity: clip1Opacity }}>
          <OffthreadVideo
            src={staticFile(brollSrc)}
            startFrom={brollSkip}
            style={videoStyle}
          />
        </div>

        {/* B-roll clip 2 — delayed via Sequence so it starts playing at crossfade */}
        {hasDualBroll && (
          <Sequence from={crossfadeAt} durationInFrames={durationInFrames - crossfadeAt}>
            <div style={{ position: 'absolute', inset: 0, opacity: clip2Opacity }}>
              <OffthreadVideo
                src={staticFile(brollSrc2!)}
                startFrom={brollSkip2}
                style={videoStyle}
              />
            </div>
          </Sequence>
        )}

        {/* Dark overlay — lighter so the website is clearly visible */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(15, 10, 30, 0.35)',
          }}
        />

        {/* Gradient overlay — darker at top for text readability */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '35%',
            background: 'linear-gradient(rgba(15, 10, 30, 0.7), transparent)',
          }}
        />

        {/* Tag + Headline — top area */}
        <div
          style={{
            position: 'absolute',
            top: 60,
            left: 80,
            right: 80,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {/* Tag pill */}
          <div
            style={{
              alignSelf: 'flex-start',
              padding: '8px 20px',
              borderRadius: 20,
              backgroundColor: `${tagColor}22`,
              border: `1px solid ${tagColor}44`,
              fontSize: 24,
              fontWeight: 600,
              color: tagColor,
              fontFamily: 'system-ui, -apple-system, sans-serif',
              opacity: fadeIn(frame, 15),
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            {tag}
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: 'white',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              lineHeight: 1.2,
              opacity: fadeIn(frame - 8, 18),
              transform: `translateY(${slideUp(frame - 8, 18, 16)}px)`,
              textShadow: '0 4px 24px rgba(0,0,0,0.6)',
            }}
          >
            {headline}
          </div>
        </div>

        {/* PiP Alex — bottom-left */}
        <Sequence from={clipStart} durationInFrames={clipDur}>
          <PiPVideo src={alexClip} />
        </Sequence>
      </AbsoluteFill>
    </SceneShell>
  );
};
