import { Composition } from 'remotion';
import { ZenMLHackathonDemo } from './compositions/ZenMLHackathonDemo';
import { FPS, HEIGHT, TOTAL_FRAMES, WIDTH } from './lib/timing';

export const Root: React.FC = () => (
  <>
    <Composition
      id="ZenMLHackathonDemo"
      component={ZenMLHackathonDemo}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  </>
);
