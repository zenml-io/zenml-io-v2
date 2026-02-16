import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion';
import { SceneShell } from '../components/SceneShell';
import { fadeIn, slideUp } from '../lib/anim';
import { HOOK } from '../lib/copy';

type Props = { durationInFrames: number };

export const Scene01Hook: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  return (
    <SceneShell durationInFrames={durationInFrames} bg="#0f0a1e">
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          padding: 40,
        }}
      >
        {/* Logo */}
        <div style={{ opacity: fadeIn(frame, 20) }}>
          <Img
            src={staticFile('images/zenml-logo.svg')}
            style={{ height: 90, filter: 'brightness(0) invert(1)' }}
          />
        </div>

        {/* Context — what we did */}
        {frame >= 15 && (
          <div
            style={{
              fontSize: 48,
              color: '#94a3b8',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: 400,
              textAlign: 'center',
              opacity: fadeIn(frame - 15, 20),
              transform: `translateY(${slideUp(frame - 15, 20, 12)}px)`,
            }}
          >
            {HOOK.context}
          </div>
        )}

        {/* Project name */}
        {frame >= 35 && (
          <div
            style={{
              fontSize: 40,
              color: '#a78bfa',
              fontFamily: 'ui-monospace, "SF Mono", monospace',
              fontWeight: 500,
              opacity: fadeIn(frame - 35, 20),
              transform: `translateY(${slideUp(frame - 35, 20, 12)}px)`,
              marginBottom: 16,
            }}
          >
            {HOOK.project}
          </div>
        )}

        {/* Big numbers — staggered reveal */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          {HOOK.numbers.map((text, i) => {
            const appear = 70 + i * 35;
            const localFrame = frame - appear;
            const visible = localFrame >= 0;
            return (
              <div
                key={text}
                style={{
                  fontSize: 120,
                  fontWeight: 800,
                  color: 'white',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  opacity: visible ? fadeIn(localFrame, 20) : 0,
                  transform: `translateY(${visible ? slideUp(localFrame, 20, 24) : 24}px)`,
                }}
              >
                {text}
              </div>
            );
          })}
        </div>

        {/* Subtitle */}
        {frame >= 210 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              marginTop: 8,
              opacity: fadeIn(frame - 210, 25),
              transform: `translateY(${slideUp(frame - 210, 25, 16)}px)`,
            }}
          >
            <div
              style={{
                fontSize: 44,
                color: '#a78bfa',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: 500,
              }}
            >
              {HOOK.subtitle}
            </div>
            {/* Whimsical asterisk — pops in slightly later */}
            {frame >= 260 && (
              <div
                style={{
                  fontSize: 26,
                  color: '#64748b',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontStyle: 'italic',
                  opacity: fadeIn(frame - 260, 20),
                }}
              >
                {HOOK.asterisk}
              </div>
            )}
          </div>
        )}
      </AbsoluteFill>
    </SceneShell>
  );
};
