import React from 'react';
import {AbsoluteFill, random, useCurrentFrame} from 'remotion';
import {COLORS, FPS, HEIGHT, WIDTH} from '../theme';

// Seeded, so identical on every render
const PARTICLES = Array.from({length: 90}, (_, i) => ({
  x: random(`x${i}`) * WIDTH,
  y: random(`y${i}`) * HEIGHT,
  v: 20 + random(`v${i}`) * 70,
  s: 1 + random(`s${i}`) * 3,
  ph: random(`p${i}`) * Math.PI * 2,
  orange: random(`o${i}`) < 0.35,
}));

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;

  const gx = 540 + Math.sin(t * 0.4) * 140;
  const gy = 960 + Math.cos(t * 0.3) * 260;
  const gridX = (t * 10) % 90;
  const gridY = (t * 36) % 120;

  const dots = PARTICLES.map((p, i) => {
    const y = (((p.y - p.v * t) % HEIGHT) + HEIGHT) % HEIGHT;
    const x = p.x + Math.sin(t * 0.6 + p.ph) * 25;
    const a = 0.2 + 0.4 * Math.pow(Math.sin(t * 2 + p.ph), 2);
    return {i, x, y, r: p.s, a, orange: p.orange};
  });

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `radial-gradient(900px circle at ${gx}px ${gy}px, rgba(255,106,0,0.22), rgba(255,106,0,0) 70%), linear-gradient(180deg, #0b0b10 0%, ${COLORS.bg} 100%)`,
        }}
      />
      <svg
        width={WIDTH}
        height={HEIGHT}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        style={{position: 'absolute'}}
      >
        <defs>
          <filter id="pblur" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <g stroke="rgba(255,255,255,0.045)" strokeWidth={2}>
          {Array.from({length: 13}, (_, i) => (
            <line key={`v${i}`} x1={i * 90 - gridX} y1={0} x2={i * 90 - gridX} y2={HEIGHT} />
          ))}
          {Array.from({length: 17}, (_, j) => (
            <line key={`h${j}`} x1={0} y1={j * 120 + gridY - 120} x2={WIDTH} y2={j * 120 + gridY - 120} />
          ))}
        </g>
        <g filter="url(#pblur)">
          {dots.map((d) => (
            <circle key={d.i} cx={d.x} cy={d.y} r={d.r * 2.2} fill={d.orange ? COLORS.orange : '#fff'} opacity={d.a} />
          ))}
        </g>
        <g>
          {dots.map((d) => (
            <circle key={d.i} cx={d.x} cy={d.y} r={d.r} fill={d.orange ? COLORS.orange : '#fff'} opacity={d.a} />
          ))}
        </g>
      </svg>
      <AbsoluteFill
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.75) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};