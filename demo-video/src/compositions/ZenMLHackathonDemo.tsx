import React from 'react';
import { Audio, Series, staticFile } from 'remotion';
import { SCENES } from '../lib/timing';
import { Scene01Hook } from '../scenes/Scene01Hook';
import { Scene02Problem } from '../scenes/Scene02Problem';
import { Scene03Pipeline } from '../scenes/Scene03Pipeline';
import { Scene04Walkthrough } from '../scenes/Scene04Walkthrough';
import { Scene05OpusDeepDive } from '../scenes/Scene05OpusDeepDive';
import { Scene06Numbers } from '../scenes/Scene06Numbers';
import { Scene07Outro } from '../scenes/Scene07Outro';

export const ZenMLHackathonDemo: React.FC = () => (
  <>
    {/* Background music — low volume so text stays readable */}
    <Audio src={staticFile('audio/bgm.mp3')} volume={0.18} />

    <Series>
      <Series.Sequence durationInFrames={SCENES.hook.duration}>
        <Scene01Hook durationInFrames={SCENES.hook.duration} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENES.problem.duration}>
        <Scene02Problem durationInFrames={SCENES.problem.duration} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENES.pipeline.duration}>
        <Scene03Pipeline durationInFrames={SCENES.pipeline.duration} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENES.walkthrough.duration}>
        <Scene04Walkthrough durationInFrames={SCENES.walkthrough.duration} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENES.opus.duration}>
        <Scene05OpusDeepDive durationInFrames={SCENES.opus.duration} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENES.numbers.duration}>
        <Scene06Numbers durationInFrames={SCENES.numbers.duration} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENES.outro.duration}>
        <Scene07Outro durationInFrames={SCENES.outro.duration} />
      </Series.Sequence>
    </Series>
  </>
);
