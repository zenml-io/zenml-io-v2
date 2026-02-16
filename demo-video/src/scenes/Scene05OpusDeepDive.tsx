import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { SceneShell } from '../components/SceneShell';
import { fadeIn, slideUp } from '../lib/anim';
import { OPUS } from '../lib/copy';

type Props = { durationInFrames: number };

const MOMENT_DURATION = 360;
const MOMENT_START = 60;

export const Scene05OpusDeepDive: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const activeMoment = Math.min(
    2,
    Math.max(0, Math.floor((frame - MOMENT_START) / MOMENT_DURATION))
  );
  const momentFrame = frame - (MOMENT_START + activeMoment * MOMENT_DURATION);
  const showMoment = frame >= MOMENT_START;

  return (
    <SceneShell durationInFrames={durationInFrames} bg="#0f0a1e">
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 60px',
          gap: 28,
        }}
      >
        {/* Section headline */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: 'white',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textAlign: 'center',
            opacity: fadeIn(frame, 20),
          }}
        >
          {OPUS.headline}
        </div>

        {/* Active moment card — much bigger, less padding waste */}
        {showMoment && (
          <div
            style={{
              backgroundColor: 'rgba(124, 58, 237, 0.12)',
              border: '1px solid rgba(124, 58, 237, 0.3)',
              borderRadius: 24,
              padding: '56px 72px',
              maxWidth: 1200,
              width: '90%',
              opacity: fadeIn(Math.max(0, momentFrame), 20),
              transform: `translateY(${slideUp(Math.max(0, momentFrame), 20, 20)}px)`,
            }}
          >
            <div
              style={{
                fontSize: 22,
                color: '#a78bfa',
                fontFamily: 'ui-monospace, "SF Mono", monospace',
                marginBottom: 16,
                fontWeight: 600,
              }}
            >
              {`${activeMoment + 1}/3`} — commit {OPUS.moments[activeMoment].commit}
            </div>
            <div
              style={{
                fontSize: 46,
                fontWeight: 700,
                color: 'white',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                marginBottom: 24,
                lineHeight: 1.2,
              }}
            >
              {OPUS.moments[activeMoment].title}
            </div>
            <div
              style={{
                fontSize: 30,
                color: '#cbd5e1',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                lineHeight: 1.5,
              }}
            >
              {OPUS.moments[activeMoment].body}
            </div>
          </div>
        )}
      </AbsoluteFill>
    </SceneShell>
  );
};
