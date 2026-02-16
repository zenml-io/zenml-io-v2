import React from 'react';
import { Audio, Series, staticFile } from 'remotion';
import { SECTIONS } from '../lib/timing';
import { V2_LEARNINGS } from '../lib/copy';
import { V2S01Hook } from '../scenes/V2S01Hook';
import { V2S02Why } from '../scenes/V2S02Why';
import { V2S03Learning } from '../scenes/V2S03Learning';
import { V2S04ResultsClose } from '../scenes/V2S04ResultsClose';

export const ZenMLHackathonDemo: React.FC = () => (
  <>
    {/* Background music — low volume so Alex's voice stays clear */}
    <Audio src={staticFile('audio/bgm.mp3')} volume={0.06} />

    <Series>
      {/* Section 1 — Hook (full-screen Alex + number flashes) */}
      <Series.Sequence durationInFrames={SECTIONS.hook.duration}>
        <V2S01Hook durationInFrames={SECTIONS.hook.duration} />
      </Series.Sequence>

      {/* Section 2 — Why It Matters (problem cards + PiP) */}
      <Series.Sequence durationInFrames={SECTIONS.why.duration}>
        <V2S02Why durationInFrames={SECTIONS.why.duration} />
      </Series.Sequence>

      {/* Section 3a — Learning: Planning */}
      <Series.Sequence durationInFrames={SECTIONS.planning.duration}>
        <V2S03Learning
          durationInFrames={SECTIONS.planning.duration}
          alexClip={SECTIONS.planning.clip}
          clipStart={SECTIONS.planning.clipStart}
          clipDur={SECTIONS.planning.clipDur}
          brollSrc={V2_LEARNINGS.planning.broll}
          brollSkip={V2_LEARNINGS.planning.brollSkip}
          brollSrc2={V2_LEARNINGS.planning.broll2}
          brollSkip2={V2_LEARNINGS.planning.brollSkip2}
          tag={V2_LEARNINGS.planning.tag}
          headline={V2_LEARNINGS.planning.headline}
        />
      </Series.Sequence>

      {/* Section 3b — Learning: Multi-Modal */}
      <Series.Sequence durationInFrames={SECTIONS.multimodal.duration}>
        <V2S03Learning
          durationInFrames={SECTIONS.multimodal.duration}
          alexClip={SECTIONS.multimodal.clip}
          clipStart={SECTIONS.multimodal.clipStart}
          clipDur={SECTIONS.multimodal.clipDur}
          brollSrc={V2_LEARNINGS.multimodal.broll}
          brollSkip={V2_LEARNINGS.multimodal.brollSkip}
          brollSrc2={V2_LEARNINGS.multimodal.broll2}
          brollSkip2={V2_LEARNINGS.multimodal.brollSkip2}
          tag={V2_LEARNINGS.multimodal.tag}
          headline={V2_LEARNINGS.multimodal.headline}
        />
      </Series.Sequence>

      {/* Section 3c — Learning: Verification */}
      <Series.Sequence durationInFrames={SECTIONS.verification.duration}>
        <V2S03Learning
          durationInFrames={SECTIONS.verification.duration}
          alexClip={SECTIONS.verification.clip}
          clipStart={SECTIONS.verification.clipStart}
          clipDur={SECTIONS.verification.clipDur}
          brollSrc={V2_LEARNINGS.verification.broll}
          brollSkip={V2_LEARNINGS.verification.brollSkip}
          brollSrc2={V2_LEARNINGS.verification.broll2}
          brollSkip2={V2_LEARNINGS.verification.brollSkip2}
          tag={V2_LEARNINGS.verification.tag}
          headline={V2_LEARNINGS.verification.headline}
        />
      </Series.Sequence>

      {/* Section 4+5 — Results + Close (PiP → full-screen transition) */}
      <Series.Sequence durationInFrames={SECTIONS.close.duration}>
        <V2S04ResultsClose durationInFrames={SECTIONS.close.duration} />
      </Series.Sequence>
    </Series>
  </>
);
