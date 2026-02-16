import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { SceneShell } from '../components/SceneShell';
import { fadeIn, slideUp } from '../lib/anim';
import { PROBLEM } from '../lib/copy';

type Props = { durationInFrames: number };

export const Scene02Problem: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  return (
    <SceneShell durationInFrames={durationInFrames} bg="#0f0a1e">
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 120,
          gap: 48,
        }}
      >
        {/* Headline */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: 'white',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textAlign: 'center',
            opacity: fadeIn(frame, 20),
            transform: `translateY(${slideUp(frame, 20)}px)`,
          }}
        >
          {PROBLEM.headline}
        </div>

        {/* Bullet list — staggered */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {PROBLEM.bullets.map((bullet, i) => {
            const appear = 60 + i * 50;
            const localFrame = frame - appear;
            const visible = localFrame >= 0;
            return (
              <div
                key={bullet}
                style={{
                  fontSize: 32,
                  color: '#e2e8f0',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  opacity: visible ? fadeIn(localFrame, 18) : 0,
                  transform: `translateX(${visible ? slideUp(localFrame, 18, 20) : 20}px)`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <span style={{ color: '#ef4444', fontSize: 24 }}>✕</span>
                {bullet}
              </div>
            );
          })}
        </div>

        {/* Punchline */}
        {frame >= 320 && (
          <div
            style={{
              fontSize: 28,
              color: '#a78bfa',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: 600,
              textAlign: 'center',
              opacity: fadeIn(frame - 320, 20),
              borderTop: '1px solid rgba(167, 139, 250, 0.3)',
              paddingTop: 24,
            }}
          >
            {PROBLEM.punchline}
          </div>
        )}
      </AbsoluteFill>
    </SceneShell>
  );
};
