import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Background} from './components/Background';
import {Scene1} from './scenes/Scene1';
import {Scene2} from './scenes/Scene2';
import {Scene3} from './scenes/Scene3';
import {Scene4} from './scenes/Scene4';
import {Scene5} from './scenes/Scene5';
import {COLORS, SCENES} from './theme';

export const ConsistencyReel: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: COLORS.bg}}>
      <Background />
      <Sequence from={SCENES.s1.from} durationInFrames={SCENES.s1.duration}>
        <Scene1 />
      </Sequence>
      <Sequence from={SCENES.s2.from} durationInFrames={SCENES.s2.duration}>
        <Scene2 />
      </Sequence>
      <Sequence from={SCENES.s3.from} durationInFrames={SCENES.s3.duration}>
        <Scene3 />
      </Sequence>
      <Sequence from={SCENES.s4.from} durationInFrames={SCENES.s4.duration}>
        <Scene4 />
      </Sequence>
      <Sequence from={SCENES.s5.from} durationInFrames={SCENES.s5.duration}>
        <Scene5 />
      </Sequence>
    </AbsoluteFill>
  );
};