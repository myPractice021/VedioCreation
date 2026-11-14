import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {COLORS, FONT_FAMILY, FPS, HEIGHT, SCENES, WIDTH} from '../theme';
import {CL, EXIT_LEAD, useSceneAlpha} from '../utils';
import {GlowDefs} from '../components/GlowDefs';
import {TextLine} from '../components/TextLine';

const D = SCENES.s4.duration;
const BASE = 1560; // stays above the bottom safe area (1580)
const X0 = 127;
const STEP_W = 110;
const STEP_PITCH = 118;
const STEP_H = 72;

// 16-24s: SMALL STEPS. EVERY SINGLE DAY.
export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const alpha = useSceneAlpha(D);
  const exitAt = D - EXIT_LEAD;

  const f = interpolate(frame, [30, 126], [0, 6.4], CL);
  const dotX = X0 + f * STEP_PITCH + 55;
  const dotY = BASE - (f + 1) * STEP_H - 30;
  const q = (t * 1.2) % 1;

  return (
    <AbsoluteFill>
      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} style={{position: 'absolute', opacity: alpha}}>
        <GlowDefs />
        {Array.from({length: 7}, (_, i) => {
          const k = interpolate(frame, [30 + i * 14, 45 + i * 14], [0, 1], {
            ...CL,
            easing: Easing.out(Easing.back(1.7)),
          });
          const h = (i + 1) * STEP_H * Math.max(0, k);
          const x = X0 + i * STEP_PITCH;
          const last = i === 6;
          return (
            <g key={i}>
              <rect
                x={x}
                y={BASE - h}
                width={STEP_W}
                height={h}
                fill={last ? 'url(#stairLast)' : 'url(#stair)'}
                filter={last ? 'url(#glow)' : undefined}
              />
              <rect x={x} y={BASE - h} width={STEP_W} height={4} fill="#fff" opacity={0.9} />
              {k > 0.5 && (
                <text
                  x={x + STEP_W / 2}
                  y={BASE - 18}
                  textAnchor="middle"
                  fontFamily={FONT_FAMILY}
                  fontSize={34}
                  fill="#fff"
                  opacity={0.6}
                >
                  {String(i + 1).padStart(2, '0')}
                </text>
              )}
            </g>
          );
        })}
        {frame > 30 && (
          <g>
            <circle cx={dotX} cy={dotY} r={16} fill="#fff" filter="url(#glow)" />
            <circle cx={dotX} cy={dotY} r={16 + q * 50} fill="none" stroke={COLORS.orange} strokeWidth={4} opacity={(1 - q) * 0.7} />
          </g>
        )}
      </svg>
      <TextLine words={['SMALL', 'STEPS.*']} y={470} size={150} delay={6} exitAt={exitAt} />
      <TextLine words={['EVERY', 'SINGLE', 'DAY.*']} y={710} size={100} delay={48} exitAt={exitAt} />
    </AbsoluteFill>
  );
};