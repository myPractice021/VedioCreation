import React from 'react';
import {AbsoluteFill, Easing, useCurrentFrame} from 'remotion';
import {COLORS, FPS, HEIGHT, SCENES, WIDTH} from '../theme';
import {EXIT_LEAD, useSceneAlpha} from '../utils';
import {GlowDefs} from '../components/GlowDefs';
import {TextLine} from '../components/TextLine';

const D = SCENES.s3.duration;
const STRIKES = [
  {at: 60, y: 800},
  {at: 102, y: 1060},
];

// 10-16s: NOT TOMORROW. NOT SOMEDAY.
export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const alpha = useSceneAlpha(D);
  const exitAt = D - EXIT_LEAD;

  return (
    <AbsoluteFill>
      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} style={{position: 'absolute', opacity: alpha}}>
        <GlowDefs />
        <g stroke="#fff" strokeWidth={3} opacity={0.07}>
          {Array.from({length: 15}, (_, i) => {
            const x = ((((i - 3) * 180 + t * 120) % 1500) + 1500) % 1500 - 200;
            return <line key={i} x1={x} y1={0} x2={x - 600} y2={HEIGHT} />;
          })}
        </g>
        <g transform={`translate(540 960) rotate(${(t * 0.25 * 180) / Math.PI})`}>
          <rect x={-350} y={-350} width={700} height={700} fill="none" stroke="#fff" strokeWidth={2} opacity={0.1} />
        </g>
        {STRIKES.map((s) => {
          const rr = (frame - s.at) / 27;
          if (rr <= 0 || rr >= 1) return null;
          return (
            <circle
              key={s.at}
              cx={540}
              cy={s.y}
              r={Easing.out(Easing.cubic)(rr) * 700}
              fill="none"
              stroke={COLORS.orange}
              strokeWidth={5}
              opacity={(1 - rr) * 0.55}
              filter="url(#glow)"
            />
          );
        })}
      </svg>
      <TextLine words={['NOT', 'TOMORROW.']} y={800} size={140} delay={6} strikeAt={60} exitAt={exitAt} />
      <TextLine words={['NOT', 'SOMEDAY.']} y={1060} size={140} delay={39} strikeAt={102} exitAt={exitAt} />
    </AbsoluteFill>
  );
};