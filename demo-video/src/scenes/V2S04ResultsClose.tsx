import React from 'react';
import { AbsoluteFill, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { SceneShell } from '../components/SceneShell';
import { PiPVideo } from '../components/PiPVideo';
import { fadeIn, slideUp } from '../lib/anim';
import { V2_RESULTS, V2_CLOSE } from '../lib/copy';
import { SECTIONS } from '../lib/timing';

type Props = { durationInFrames: number };

/** Accent colors for the 3 metrics */
const METRIC_COLORS = ['#22c55e', '#a78bfa', '#3b82f6'];

/**
 * Section 4+5 — Results & Close.
 *
 * Phase 1 (frames 0–~750): 3 big metric cards + PiP Alex narrating
 * Phase 2 (frames ~750–end): Alex goes full-screen + links fade in
 *
 * The transition point is roughly when Alex says "This isn't just a ZenML story"
 * which is about 25 seconds into the 41-second clip.
 */
export const V2S04ResultsClose: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { clipStart, clipDur } = SECTIONS.close;

  /** Frame within this scene where PiP → fullscreen transition happens */
  const TRANSITION_FRAME = 720;
  /** Duration of the crossfade */
  const CROSSFADE_DUR = 30;
  /** When links start appearing */
  const LINKS_START = 1050;

  // PiP opacity: full until transition, then fades out
  const pipOpacity = interpolate(
    frame,
    [TRANSITION_FRAME, TRANSITION_FRAME + CROSSFADE_DUR],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Full-screen opacity: fades in during transition
  const fullOpacity = interpolate(
    frame,
    [TRANSITION_FRAME, TRANSITION_FRAME + CROSSFADE_DUR],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Metrics fade out during transition
  const metricsOpacity = interpolate(
    frame,
    [TRANSITION_FRAME - 15, TRANSITION_FRAME + 10],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <SceneShell durationInFrames={durationInFrames} bg="#0f0a1e">
      <AbsoluteFill>
        {/* ── Phase 1: Metrics + PiP ────────────────────────────── */}
        <div style={{ position: 'absolute', inset: 0, opacity: metricsOpacity }}>
          <AbsoluteFill
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 40,
              padding: '60px 80px',
            }}
          >
            {/* Section label */}
            <div
              style={{
                fontSize: 28,
                fontWeight: 600,
                color: '#94a3b8',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                opacity: fadeIn(frame, 20),
              }}
            >
              The Results
            </div>

            {/* 3 metric cards */}
            <div style={{ display: 'flex', gap: 36, maxWidth: 1400 }}>
              {V2_RESULTS.metrics.map((m, i) => {
                const appear = 30 + i * 40;
                const localFrame = frame - appear;
                const visible = localFrame >= 0;
                const color = METRIC_COLORS[i];

                return (
                  <div
                    key={m.label}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 12,
                      padding: '36px 32px',
                      borderRadius: 16,
                      backgroundColor: `${color}0c`,
                      border: `1px solid ${color}33`,
                      opacity: visible ? fadeIn(localFrame, 18) : 0,
                      transform: `translateY(${visible ? slideUp(localFrame, 18, 20) : 20}px)`,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 22,
                        color: `${color}cc`,
                        fontWeight: 600,
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                      }}
                    >
                      {m.label}
                    </div>
                    <div
                      style={{
                        fontSize: 72,
                        fontWeight: 800,
                        color,
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                      }}
                    >
                      {m.value}
                    </div>
                    <div
                      style={{
                        fontSize: 26,
                        color: '#94a3b8',
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        textAlign: 'center',
                      }}
                    >
                      {m.detail}
                    </div>
                  </div>
                );
              })}
            </div>
          </AbsoluteFill>
        </div>

        {/* ── Phase 2: Full-screen Alex ──────────────────────────── */}
        <div style={{ position: 'absolute', inset: 0, opacity: fullOpacity }}>
          <Sequence from={clipStart} durationInFrames={clipDur}>
            <OffthreadVideo
              src={staticFile(SECTIONS.close.clip)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              // Muted because PiP already has audio
              volume={0}
            />
          </Sequence>

          {/* Dark gradient at bottom for links */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '40%',
              background: 'linear-gradient(transparent, rgba(15, 10, 30, 0.85))',
            }}
          />

          {/* Links — appear near the end */}
          <div
            style={{
              position: 'absolute',
              bottom: 48,
              left: 0,
              right: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
            }}
          >
            {/* ZenML logo */}
            {frame >= LINKS_START && (
              <div style={{ opacity: fadeIn(frame - LINKS_START, 20), marginBottom: 8 }}>
                <Img
                  src={staticFile('images/zenml-logo.svg')}
                  style={{ height: 44, filter: 'brightness(0) invert(1)', opacity: 0.8 }}
                />
              </div>
            )}

            {V2_CLOSE.lines.map((line, i) => {
              const appear = LINKS_START + 20 + i * 25;
              const localFrame = frame - appear;
              const visible = localFrame >= 0;
              return (
                <div
                  key={line}
                  style={{
                    fontSize: i === 2 ? 28 : 36,
                    fontWeight: i === 2 ? 400 : 600,
                    color: i === 2 ? '#94a3b8' : 'white',
                    fontFamily: i < 2
                      ? 'ui-monospace, "SF Mono", monospace'
                      : 'system-ui, -apple-system, sans-serif',
                    opacity: visible ? fadeIn(localFrame, 18) : 0,
                    transform: `translateY(${visible ? slideUp(localFrame, 18, 10) : 10}px)`,
                    textShadow: '0 2px 16px rgba(0,0,0,0.8)',
                  }}
                >
                  {line}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── PiP Alex (phase 1 — fades out at transition) ──── */}
        <div style={{ opacity: pipOpacity }}>
          <Sequence from={clipStart} durationInFrames={clipDur}>
            <PiPVideo src={SECTIONS.close.clip} size={300} />
          </Sequence>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};

