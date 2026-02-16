import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { SceneShell } from '../components/SceneShell';
import { fadeIn, slideUp, popSpring } from '../lib/anim';
import { OPUS } from '../lib/copy';

type Props = { durationInFrames: number };

const MOMENT_COUNT = OPUS.moments.length;
const MOMENT_DURATION = 160; // ~5.3s per moment
const MOMENT_START = 45;

/** Accent colors per moment — creates visual identity */
const MOMENT_ACCENTS = [
  '#a78bfa', // Planning — violet
  '#f97316', // Self-Correction — orange
  '#60a5fa', // Architecture — blue
  '#34d399', // Going Beyond — emerald
  '#facc15', // SEO — yellow
];

/** SVG icons per moment — inline for animation control */
const MomentIcons: React.FC<{ size?: number; color?: string }>[] = [
  // Planning — clipboard/doc
  ({ size = 28, color = '#a78bfa' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="13" y2="16" />
    </svg>
  ),
  // Self-Correction — refresh/cycle arrows
  ({ size = 28, color = '#f97316' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  ),
  // Architecture — layers/stack
  ({ size = 28, color = '#60a5fa' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  // Going Beyond — rocket
  ({ size = 28, color = '#34d399' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  // SEO — search/chart up
  ({ size = 28, color = '#facc15' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
];

/** Step dots — frame-driven, not CSS transitions */
const StepDots: React.FC<{ active: number; count: number }> = ({ active, count }) => (
  <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        style={{
          width: i === active ? 40 : 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: i === active ? MOMENT_ACCENTS[active] : 'rgba(167, 139, 250, 0.25)',
        }}
      />
    ))}
  </div>
);

export const Scene05OpusDeepDive: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const activeMoment = Math.min(
    MOMENT_COUNT - 1,
    Math.max(0, Math.floor((frame - MOMENT_START) / MOMENT_DURATION))
  );
  const momentFrame = frame - (MOMENT_START + activeMoment * MOMENT_DURATION);
  const showMoment = frame >= MOMENT_START;
  const accent = MOMENT_ACCENTS[activeMoment];
  const Icon = MomentIcons[activeMoment];
  const p = showMoment ? popSpring(Math.max(0, momentFrame), fps) : 0;

  // Fade in and out within each moment window
  const momentOpacity = showMoment
    ? Math.min(
        fadeIn(Math.max(0, momentFrame), 14),
        momentFrame < MOMENT_DURATION - 14 ? 1 : fadeIn(MOMENT_DURATION - momentFrame, 14)
      )
    : 0;

  return (
    <SceneShell durationInFrames={durationInFrames} bg="#0f0a1e">
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 60px',
          gap: 24,
        }}
      >
        {/* Background glow — shifts color with active moment */}
        <AbsoluteFill
          style={{
            background: `radial-gradient(ellipse 50% 45% at 50% 55%, ${accent}14 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Section headline */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: 'white',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textAlign: 'center',
            opacity: fadeIn(frame, 20),
          }}
        >
          {OPUS.headline}
        </div>

        {/* Active moment card */}
        {showMoment && (
          <div
            style={{
              backgroundColor: 'rgba(124, 58, 237, 0.10)',
              borderLeft: `3px solid ${accent}`,
              borderTop: '1px solid rgba(167, 139, 250, 0.20)',
              borderRight: '1px solid rgba(167, 139, 250, 0.10)',
              borderBottom: '1px solid rgba(167, 139, 250, 0.10)',
              borderRadius: 20,
              padding: '40px 64px',
              maxWidth: 1400,
              width: '92%',
              opacity: momentOpacity,
              transform: `translateY(${slideUp(Math.max(0, momentFrame), 16, 16)}px) scale(${0.96 + 0.04 * p})`,
              boxShadow: `0 30px 80px rgba(0,0,0,0.4), 0 0 60px ${accent}08`,
            }}
          >
            {/* Step dots + icon + tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <StepDots active={activeMoment} count={MOMENT_COUNT} />
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: `${accent}18`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {Icon && <Icon size={24} color={accent} />}
              </div>
              <div
                style={{
                  fontSize: 22,
                  color: accent,
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                {OPUS.moments[activeMoment].tag}
              </div>
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: 58,
                fontWeight: 700,
                color: 'white',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                marginBottom: 20,
                lineHeight: 1.2,
              }}
            >
              {OPUS.moments[activeMoment].title}
            </div>

            {/* Body */}
            <div
              style={{
                fontSize: 38,
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
