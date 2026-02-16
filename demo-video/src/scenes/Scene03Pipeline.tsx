import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { SceneShell } from '../components/SceneShell';
import { fadeIn, slideUp } from '../lib/anim';
import { PIPELINE } from '../lib/copy';

type Props = { durationInFrames: number };

const PHASE_INTERVAL = 120;
const PHASE_START = 90;

export const Scene03Pipeline: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  return (
    <SceneShell durationInFrames={durationInFrames} bg="#0f0a1e">
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 80px',
          gap: 24,
        }}
      >
        {/* Headline */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: 'white',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            opacity: fadeIn(frame, 20),
          }}
        >
          {PIPELINE.headline}
        </div>

        {/* Subtitle */}
        {frame >= 20 && (
          <div
            style={{
              fontSize: 26,
              color: '#94a3b8',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              opacity: fadeIn(frame - 20, 20),
              marginBottom: 16,
            }}
          >
            {PIPELINE.subtitle}
          </div>
        )}

        {/* Phase list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, width: '100%', maxWidth: 1000 }}>
          {PIPELINE.phases.map((phase, i) => {
            const appear = PHASE_START + i * PHASE_INTERVAL;
            const localFrame = frame - appear;
            const visible = localFrame >= 0;
            return (
              <div
                key={phase.num}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 28,
                  opacity: visible ? fadeIn(localFrame, 15) : 0,
                  transform: `translateX(${visible ? slideUp(localFrame, 15, 24) : 24}px)`,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    backgroundColor: '#7c3aed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 26,
                    fontWeight: 700,
                    color: 'white',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    flexShrink: 0,
                  }}
                >
                  {phase.num}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: 600,
                      color: 'white',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                    }}
                  >
                    {phase.name}
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      color: '#94a3b8',
                      fontFamily: 'ui-monospace, "SF Mono", monospace',
                    }}
                  >
                    {phase.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
