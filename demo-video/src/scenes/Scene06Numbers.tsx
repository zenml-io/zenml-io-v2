import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { SceneShell } from '../components/SceneShell';
import { countUp, fadeIn, slideUp } from '../lib/anim';
import { NUMBERS } from '../lib/copy';

type Props = { durationInFrames: number };

const COUNT_DURATION = 60;

export const Scene06Numbers: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  return (
    <SceneShell durationInFrames={durationInFrames} bg="#0f0a1e">
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 60px',
          gap: 40,
        }}
      >
        {/* Section title */}
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            color: 'white',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            opacity: fadeIn(frame, 20),
          }}
        >
          By The Numbers
        </div>

        {/* Stats grid — 4x2, bigger */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 36,
            maxWidth: 1500,
          }}
        >
          {NUMBERS.stats.map((stat, i) => {
            const stagger = 25 + i * 10;
            const localFrame = frame - stagger;
            const value = countUp(frame, stagger, COUNT_DURATION, stat.value);

            return (
              <div
                key={stat.label}
                style={{
                  width: 320,
                  textAlign: 'center',
                  opacity: localFrame >= 0 ? fadeIn(localFrame, 15) : 0,
                  transform:
                    localFrame >= 0
                      ? `translateY(${slideUp(localFrame, 15, 16)}px)`
                      : 'translateY(16px)',
                }}
              >
                <div
                  style={{
                    fontSize: 88,
                    fontWeight: 800,
                    color: '#a78bfa',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                >
                  {value.toLocaleString()}
                  {stat.suffix}
                </div>
                <div
                  style={{
                    fontSize: 32,
                    color: '#94a3b8',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    marginTop: 6,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
