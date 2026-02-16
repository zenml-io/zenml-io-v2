import React from 'react';
import { AbsoluteFill, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { SceneShell } from '../components/SceneShell';
import { fadeIn, slideUp } from '../lib/anim';
import { V2_HOOK } from '../lib/copy';
import { SECTIONS } from '../lib/timing';

type Props = { durationInFrames: number };

/**
 * Section 1 — Hook.
 * Full-screen Alex talking, with numbers flashing on screen as he says them.
 * ZenML logo in top-left corner.
 */
export const V2S01Hook: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { clipStart } = SECTIONS.hook;

  // Numbers appear staggered as Alex says them: ~3s, ~6s, ~9s into clip
  const numberTimings = [clipStart + 60, clipStart + 150, clipStart + 270];

  return (
    <SceneShell durationInFrames={durationInFrames} bg="#0f0a1e">
      <AbsoluteFill>
        {/* Full-screen Alex video */}
        <Sequence from={clipStart} durationInFrames={SECTIONS.hook.clipDur}>
          <OffthreadVideo
            src={staticFile(SECTIONS.hook.clip)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Sequence>

        {/* Dark gradient overlay on bottom for text readability */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '45%',
            background: 'linear-gradient(transparent, rgba(15, 10, 30, 0.85))',
            pointerEvents: 'none',
          }}
        />

        {/* ZenML logo — top left */}
        <div
          style={{
            position: 'absolute',
            top: 36,
            left: 40,
            opacity: fadeIn(frame, 20),
          }}
        >
          <Img
            src={staticFile('images/zenml-logo.svg')}
            style={{ height: 48, filter: 'brightness(0) invert(1)', opacity: 0.7 }}
          />
        </div>

        {/* Number flashes — bottom of screen */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 48,
          }}
        >
          {V2_HOOK.numbers.map((text, i) => {
            const appear = numberTimings[i];
            const localFrame = frame - appear;
            const visible = localFrame >= 0;
            return (
              <div
                key={text}
                style={{
                  fontSize: 64,
                  fontWeight: 800,
                  color: 'white',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  opacity: visible ? fadeIn(localFrame, 15) : 0,
                  transform: `translateY(${visible ? slideUp(localFrame, 15, 16) : 16}px)`,
                  textShadow: '0 4px 20px rgba(0,0,0,0.8)',
                }}
              >
                {text}
              </div>
            );
          })}
        </div>

        {/* Subtitle badge — bottom center, appears after numbers */}
        {frame >= clipStart + 360 && (
          <div
            style={{
              position: 'absolute',
              bottom: 140,
              left: '50%',
              transform: `translateX(-50%) translateY(${slideUp(frame - (clipStart + 360), 15, 10)}px)`,
              fontSize: 32,
              fontWeight: 600,
              color: '#a78bfa',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              opacity: fadeIn(frame - (clipStart + 360), 15),
              textShadow: '0 2px 12px rgba(0,0,0,0.8)',
            }}
          >
            {V2_HOOK.subtitle}
          </div>
        )}
      </AbsoluteFill>
    </SceneShell>
  );
};
