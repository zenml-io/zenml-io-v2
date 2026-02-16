import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion';
import { SceneShell } from '../components/SceneShell';
import { fadeIn, slideUp } from '../lib/anim';
import { OUTRO } from '../lib/copy';

type Props = { durationInFrames: number };

export const Scene07Outro: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  return (
    <SceneShell durationInFrames={durationInFrames} bg="#0f0a1e">
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 40,
          gap: 40,
        }}
      >
        {/* Logo */}
        <div style={{ opacity: fadeIn(frame, 20) }}>
          <Img
            src={staticFile('images/zenml-logo.svg')}
            style={{ height: 80, filter: 'brightness(0) invert(1)' }}
          />
        </div>

        {/* Links — staggered */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
          {OUTRO.lines.map((line, i) => {
            const appear = 30 + i * 40;
            const localFrame = frame - appear;
            const visible = localFrame >= 0;
            return (
              <div
                key={line}
                style={{
                  fontSize: i === 2 ? 36 : 44,
                  fontWeight: i === 2 ? 400 : 600,
                  color: i === 2 ? '#94a3b8' : 'white',
                  fontFamily:
                    i < 2
                      ? 'ui-monospace, "SF Mono", monospace'
                      : 'system-ui, -apple-system, sans-serif',
                  opacity: visible ? fadeIn(localFrame, 20) : 0,
                  transform: `translateY(${visible ? slideUp(localFrame, 20, 12) : 12}px)`,
                }}
              >
                {line}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
