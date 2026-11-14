import React from 'react';
import {Composition} from 'remotion';
import {ConsistencyReel} from './ConsistencyReel';
import {DURATION, FPS, HEIGHT, WIDTH} from './theme';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ConsistencyReel"
      component={ConsistencyReel}
      durationInFrames={DURATION}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};