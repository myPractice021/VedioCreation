import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {COLORS, FPS, HEIGHT, SCENES, WIDTH} from '../theme';
import {CL, EXIT_LEAD, polygonPoints, useSceneAlpha} from '../utils';
import {GlowDefs} from '../components/GlowDefs';
import {TextLine} from '../components/TextLine';

const D = SCENES.s1.duration;
const SHAPES = [
  {n: 6, r: 260, orange: false},
  {n: 4, r: 410, orange: true},
  {n: 3, r: 560, orange: false},
  {n: 6, r: 710, orange: false},
];

// 0-4s: YOUR FUTURE IS CREATED...
export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const alpha = useSceneAlpha(D);
  const k = interpolate(frame, [0, 48], [0, 1], {...CL, easing: Easing.out(Easing.cubic)});
  const q = (t * 0.8) % 1;
  const exitAt = D - EXIT_LEAD;

  return (
    <AbsoluteFill>
      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} style={{position: 'absolute', opacity: alpha}}>
        <GlowDefs />
        <g transform="translate(540 960)">
          {SHAPES.map((s, i) => (
            <polygon
              key={i}
              points={polygonPoints(s.r * k, s.n, t * (0.3 + i * 0.12) * (i % 2 ? -1 : 1))}
              fill="none"
              stroke={s.orange ? COLORS.orange : 'rgba(255,255,255,0.16)'}
              strokeWidth={s.orange ? 4 : 2}
              opacity={s.orange ? 0.85 : 1}
              filter={s.orange ? 'url(#glow)' : undefined}
            />
          ))}
          <circle r={200 + q * 600} fill="none" stroke={COLORS.orange} strokeWidth={3} opacity={(1 - q) * 0.3} />
        </g>
      </svg>
      <TextLine words={['YOUR', 'FUTURE*']} y={820} size={160} delay={6} exitAt={exitAt} />
      <TextLine words={['IS', 'CREATED…']} y={1010} size={120} delay={33} exitAt={exitAt} />
    </AbsoluteFill>
  );
};