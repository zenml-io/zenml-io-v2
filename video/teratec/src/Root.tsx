import React from 'react';
import { Composition } from 'remotion';
import { Film } from './Film';
import { EventFilm } from './EventFilm';
import { EVENT_FRAMES } from './eventTimeline';
import { script } from './script';
export const Root = () => <>
  <Composition id="TeratecExperimentalV9" component={EventFilm} durationInFrames={EVENT_FRAMES} fps={30} width={1920} height={1080}/>
  <Composition id="TeratecInstitutional" component={Film} durationInFrames={script.meta.totalFrames} fps={30} width={1920} height={1080}/>
</>;
