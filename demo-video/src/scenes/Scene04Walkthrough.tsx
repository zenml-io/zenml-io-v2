import React from 'react';
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { SceneShell } from '../components/SceneShell';
import { fadeIn } from '../lib/anim';
import { WALKTHROUGH } from '../lib/copy';

type Props = { durationInFrames: number };

const CLIP_DURATION = 216; // frames per clip (7.2s at 30fps) — 5 clips × 216 = 1080

export const Scene04Walkthrough: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  return (
    <SceneShell durationInFrames={durationInFrames} bg="#0f0a1e">
      <AbsoluteFill>
        {WALKTHROUGH.clips.map((clip, i) => {
          const clipStart = i * CLIP_DURATION;
          const clipFrame = frame - clipStart;

          return (
            <Sequence
              key={clip.src}
              from={clipStart}
              durationInFrames={CLIP_DURATION}
            >
              <AbsoluteFill
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#0f0a1e',
                }}
              >
                {/* Video clip — show from top so nav bar is visible */}
                <div
                  style={{
                    width: '92%',
                    height: '85%',
                    borderRadius: 12,
                    overflow: 'hidden',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                    opacity: fadeIn(clipFrame, 15),
                  }}
                >
                  <OffthreadVideo
                    src={staticFile(clip.src)}
                    startFrom={clip.skipFrames} // skip page load time
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top',
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
                    padding: '18px 40px',
                    borderRadius: 40,
                    fontSize: 36,
                    fontWeight: 600,
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    opacity: fadeIn(clipFrame - 10, 15),
                    whiteSpace: 'nowrap',
                  }}
                >
                  {clip.caption}
                </div>
              </AbsoluteFill>
            </Sequence>
          );
        })}
      </AbsoluteFill>
    </SceneShell>
  );
};
