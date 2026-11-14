import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {COLORS, FPS, HEIGHT, SCENES, WIDTH} from '../theme';
import {CL, EXIT_LEAD, useSceneAlpha} from '../utils';
import {GlowDefs} from '../components/GlowDefs';
import {TextLine} from '../components/TextLine';

const D = SCENES.s2.duration;

// 4-10s: ...BY WHAT YOU DO TODAY.
export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const alpha = useSceneAlpha(D);
  const exitAt = D - EXIT_LEAD;

  const ringIn = interpolate(frame, [0, 24], [0, 1], CL);
  const k = interpolate(frame, [66, 102], [0, 1], {...CL, easing: Easing.out(Easing.cubic)});
  const rr = interpolate(frame, [78, 120], [0, 1], CL);
  const shock = frame > 78 && rr < 1;

  return (
    <AbsoluteFill>
      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} style={{position: 'absolute', opacity: alpha}}>
        <GlowDefs />
        <g transform="translate(540 1150)">
          <circle
            r={300 + Math.sin(t * 2) * 10}
            fill="none"
            stroke={COLORS.orange}
            strokeWidth={5}
            opacity={0.7 * ringIn}
            filter="url(#glow)"
          />
          {Array.from({length: 36}, (_, i) => {
            const a = (i / 36) * Math.PI * 2 + t * 0.3;
            const r0 = 340;
            const r1 = 340 + (i % 3 ? 22 : 50) * k;
            return (
              <line
                key={i}
                x1={Math.cos(a) * r0}
                y1={Math.sin(a) * r0}
                x2={Math.cos(a) * r1}
                y2={Math.sin(a) * r1}
                stroke="#fff"
                strokeWidth={4}
                opacity={0.28 * k}
              />
            );
          })}
          {shock && (
            <circle
              r={100 + Easing.out(Easing.cubic)(rr) * 900}
              fill="none"
              stroke={COLORS.orange}
              strokeWidth={6}
              opacity={(1 - rr) * 0.6}
            />
          )}
        </g>
      </svg>
      <TextLine words={['…BY', 'WHAT']} y={690} size={140} delay={6} exitAt={exitAt} />
      <TextLine words={['YOU', 'DO']} y={880} size={200} delay={36} exitAt={exitAt} />
      <TextLine words={['TODAY.*']} y={1150} size={300} delay={78} exitAt={exitAt} />
    </AbsoluteFill>
  );
};