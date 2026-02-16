import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { SceneShell } from '../components/SceneShell';
import { fadeIn, slideUp, popSpring } from '../lib/anim';
import { PIPELINE } from '../lib/copy';
import { PIPELINE_PHASE_ICONS } from '../components/icons/PipelinePhaseIcons';

type Props = { durationInFrames: number };

const PHASE_INTERVAL = 80;
const PHASE_START = 70;

/** Accent colors per phase for the left border gradient */
const PHASE_ACCENTS = [
  '#a78bfa', // Export — purple
  '#60a5fa', // Transform — blue
  '#34d399', // Schema — emerald
  '#f97316', // Build — orange
  '#facc15', // Verify — yellow
  '#f472b6', // Go Beyond — pink
];

export const Scene03Pipeline: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneShell durationInFrames={durationInFrames} bg="#0f0a1e">
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 60px',
          gap: 20,
        }}
      >
        {/* Subtle background glow */}
        <AbsoluteFill
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 55%, rgba(124, 58, 237, 0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Headline */}
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            color: 'white',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            opacity: fadeIn(frame, 20),
            textAlign: 'center',
          }}
        >
          {PIPELINE.headline}
        </div>

        {/* Subtitle */}
        {frame >= 20 && (
          <div
            style={{
              fontSize: 36,
              color: '#94a3b8',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              opacity: fadeIn(frame - 20, 20),
              marginBottom: 8,
              textAlign: 'center',
            }}
          >
            {PIPELINE.subtitle}
          </div>
        )}

        {/* Phase grid — 3×2 cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
            width: '100%',
            maxWidth: 1600,
          }}
        >
          {PIPELINE.phases.map((phase, i) => {
            const appear = PHASE_START + i * PHASE_INTERVAL;
            const localFrame = frame - appear;
            const visible = localFrame >= 0;
            const Icon = PIPELINE_PHASE_ICONS[phase.num];
            const accent = PHASE_ACCENTS[i];
            const p = visible ? popSpring(localFrame, fps) : 0;

            return (
              <div
                key={phase.num}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  padding: '28px 28px',
                  borderRadius: 16,
                  backgroundColor: 'rgba(124, 58, 237, 0.08)',
                  borderLeft: `3px solid ${accent}`,
                  borderTop: '1px solid rgba(167, 139, 250, 0.15)',
                  borderRight: '1px solid rgba(167, 139, 250, 0.08)',
                  borderBottom: '1px solid rgba(167, 139, 250, 0.08)',
                  opacity: visible ? fadeIn(localFrame, 14) : 0,
                  transform: `translateY(${visible ? slideUp(localFrame, 18, 16) : 16}px) scale(${0.92 + 0.08 * p})`,
                }}
              >
                {/* Icon + phase number badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      backgroundColor: 'rgba(124, 58, 237, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {Icon && <Icon size={30} color={accent} />}
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      color: accent,
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Phase {phase.num}
                  </div>
                </div>

                {/* Phase name */}
                <div
                  style={{
                    fontSize: 38,
                    fontWeight: 700,
                    color: 'white',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    lineHeight: 1.1,
                  }}
                >
                  {phase.name}
                </div>

                {/* Detail */}
                <div
                  style={{
                    fontSize: 24,
                    color: '#94a3b8',
                    fontFamily: 'ui-monospace, "SF Mono", monospace',
                    lineHeight: 1.4,
                  }}
                >
                  {phase.detail}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
