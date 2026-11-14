import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {COLORS, FPS, HEIGHT, SCENES, WIDTH} from '../theme';
import {CL, useSceneAlpha} from '../utils';
import {GlowDefs} from '../components/GlowDefs';
import {TextLine} from '../components/TextLine';

const D = SCENES.s5.duration;

// 24-30s: BE CONSISTENT. BECOME UNSTOPPABLE.
export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const alpha = useSceneAlpha(D, false); // holds on the final frame

  const k = interpolate(frame, [6, 51], [0, 1], {...CL, easing: Easing.out(Easing.cubic)});
  const rayLen = 1400 * k;
  const flash = interpolate(frame, [69, 84], [0.35, 0], CL) * (frame >= 69 ? 1 : 0);
  const glowIn = interpolate(frame, [69, 84], [0, 1], CL);
  const pulse = (0.22 + 0.08 * Math.sin(t * 3)) * glowIn;

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          opacity: alpha,
          background: `radial-gradient(600px circle at 540px 1190px, rgba(255,106,0,${pulse}), rgba(255,106,0,0) 100%)`,
        }}
      />
      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} style={{position: 'absolute', opacity: alpha}}>
        <GlowDefs />
        <g transform="translate(540 1000)">
          {Array.from({length: 48}, (_, i) => {
            const a = (i / 48) * Math.PI * 2 + t * 0.15;
            return (
              <line
                key={i}
                x1={Math.cos(a) * 140}
                y1={Math.sin(a) * 140}
                x2={Math.cos(a) * rayLen}
                y2={Math.sin(a) * rayLen}
                stroke={i % 2 ? COLORS.orange : '#fff'}
                strokeWidth={3}
                opacity={i % 2 ? 0.14 : 0.07}
              />
            );
          })}
        </g>
        {[0, 1, 2].map((j) => {
          const rr = (frame - 69 - j * 7) / 42;
          if (rr <= 0 || rr >= 1) return null;
          return (
            <circle
              key={j}
              cx={540}
              cy={1190}
              r={Easing.out(Easing.cubic)(rr) * 1100}
              fill="none"
              stroke={COLORS.orange}
              strokeWidth={7}
              opacity={(1 - rr) * 0.8}
              filter="url(#glow)"
            />
          );
        })}
      </svg>
      {flash > 0 && <AbsoluteFill style={{backgroundColor: COLORS.orange, opacity: flash}} />}
      <TextLine words={['BE', 'CONSISTENT.']} y={700} size={130} delay={6} />
      <TextLine words={['BECOME']} y={960} size={180} delay={42} />
      <TextLine words={['UNSTOPPABLE.*']} y={1190} size={150} delay={69} />
    </AbsoluteFill>
  );
};