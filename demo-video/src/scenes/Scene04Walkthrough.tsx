import React from 'react';
import { AbsoluteFill, Img, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { SceneShell } from '../components/SceneShell';
import { fadeIn, kenBurns } from '../lib/anim';
import { WALKTHROUGH } from '../lib/copy';

type Props = { durationInFrames: number };

const SHOT_DURATION = 200;

export const Scene04Walkthrough: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  return (
    <SceneShell durationInFrames={durationInFrames} bg="#0f0a1e">
      <AbsoluteFill>
        {WALKTHROUGH.shots.map((shot, i) => {
          const shotStart = i * SHOT_DURATION;
          const shotFrame = frame - shotStart;

          return (
            <Sequence
              key={shot.src}
              from={shotStart}
              durationInFrames={SHOT_DURATION}
            >
              <AbsoluteFill
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#0f0a1e',
                }}
              >
                {/* Screenshot — show from TOP so nav bar is visible */}
                <div
                  style={{
                    width: '92%',
                    height: '85%',
                    borderRadius: 12,
                    overflow: 'hidden',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                    opacity: fadeIn(shotFrame, 15),
                  }}
                >
                  <Img
                    src={staticFile(shot.src)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top',
                      transform: `scale(${kenBurns(shotFrame, SHOT_DURATION, 1.0, 1.04)})`,
                      transformOrigin: 'top center',
                    }}
                  />
                </div>

                {/* Caption pill */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 36,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'rgba(124, 58, 237, 0.92)',
                    color: 'white',
                    padding: '14px 32px',
                    borderRadius: 40,
                    fontSize: 26,
                    fontWeight: 600,
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    opacity: fadeIn(shotFrame - 10, 15),
                    whiteSpace: 'nowrap',
                  }}
                >
                  {shot.caption}
                </div>
              </AbsoluteFill>
            </Sequence>
          );
        })}
      </AbsoluteFill>
    </SceneShell>
  );
};
