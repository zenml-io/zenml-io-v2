import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import { SceneShell } from '../components/SceneShell';
import { PiPVideo } from '../components/PiPVideo';
import { fadeIn, slideUp, popSpring } from '../lib/anim';
import { V2_WHY } from '../lib/copy';
import { SECTIONS } from '../lib/timing';

type Props = { durationInFrames: number };

/** Red accent for pain-point cards */
const ACCENT = '#ef4444';

/** Inline SVG icons — dollar, lock, git-branch, clock (matched to bullet order) */
const BulletIcons: React.FC<{ size?: number; color?: string }>[] = [
  // Dollar — $800/yr rent
  ({ size = 36, color = ACCENT }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  // Lock — 1 editor at a time
  ({ size = 36, color = ACCENT }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  // Git branch — no version control
  ({ size = 36, color = ACCENT }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  ),
  // Clock — months to migrate
  ({ size = 36, color = ACCENT }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
];

/**
 * Section 2 — Why It Matters.
 * Headline + 4 icon cards (existing Scene02 design) + PiP Alex narrating.
 */
export const V2S02Why: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { clipStart, clipDur } = SECTIONS.why;

  /** Cards appear staggered to match Alex's narration pace (~4s apart, adjusted for 1.10×) */
  const CARD_START = 181;
  const CARD_INTERVAL = 109;

  return (
    <SceneShell durationInFrames={durationInFrames} bg="#0f0a1e">
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 80px',
          gap: 28,
        }}
      >
        {/* Headline */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: 'white',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textAlign: 'center',
            opacity: fadeIn(frame, 20),
            transform: `translateY(${slideUp(frame, 20)}px)`,
          }}
        >
          {V2_WHY.headline}
        </div>

        {/* 2×2 icon card grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 18,
            width: '100%',
            maxWidth: 1350,
          }}
        >
          {V2_WHY.bullets.map((bullet, i) => {
            const appear = CARD_START + i * CARD_INTERVAL;
            const localFrame = frame - appear;
            const visible = localFrame >= 0;
            const Icon = BulletIcons[i];
            const p = visible ? popSpring(localFrame, fps) : 0;

            return (
              <div
                key={bullet}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 18,
                  padding: '22px 26px',
                  borderRadius: 12,
                  backgroundColor: `${ACCENT}0f`,
                  borderLeft: `3px solid ${ACCENT}`,
                  borderTop: `1px solid ${ACCENT}22`,
                  borderRight: `1px solid ${ACCENT}11`,
                  borderBottom: `1px solid ${ACCENT}11`,
                  opacity: visible ? fadeIn(localFrame, 14) : 0,
                  transform: `translateY(${visible ? slideUp(localFrame, 18, 14) : 14}px) scale(${0.92 + 0.08 * p})`,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 10,
                    backgroundColor: `${ACCENT}18`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {Icon && <Icon size={36} color={ACCENT} />}
                </div>
                <div
                  style={{
                    fontSize: 34,
                    color: '#e2e8f0',
                    fontWeight: 500,
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    lineHeight: 1.3,
                  }}
                >
                  {bullet}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* PiP Alex — bottom-left */}
      <Sequence from={clipStart} durationInFrames={clipDur}>
        <PiPVideo src={SECTIONS.why.clip} />
      </Sequence>
    </SceneShell>
  );
};
