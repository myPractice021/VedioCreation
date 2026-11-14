import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {COLORS} from '../theme';
import {CL} from '../utils';

type Props = {
  children: string;
  delay: number; // scene-local frame when the entrance starts
  exitAt?: number; // scene-local frame when the exit starts
  accent?: boolean;
  dir?: 1 | -1; // rotation direction
  dim?: number; // 0-1 opacity multiplier (used by strike-through)
};

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

export const AnimatedWord: React.FC<Props> = ({
  children,
  delay,
  exitAt,
  accent = false,
  dir = 1,
  dim = 1,
}) => {
  const frame = useCurrentFrame();

  const p = interpolate(frame, [delay, delay + 26], [0, 1], {...CL, easing: easeOut});
  const x =
    exitAt === undefined
      ? 0
      : interpolate(frame, [exitAt, exitAt + 15], [0, 1], {
          ...CL,
          easing: Easing.in(Easing.cubic),
        });

  const translateY = (1 - p) * 100 - x * 80;
  const scale = (1 + (1 - p) * 0.4) * (1 - 0.12 * x);
  const blur = (1 - p) * 26 + x * 20;
  const opacity = Math.min(1, p * 3) * (1 - x) * dim;
  const rotate = (1 - p) * 8 * dir;

  return (
    <span
      style={{
        display: 'inline-block',
        color: accent ? COLORS.orange : COLORS.white,
        textShadow: accent
          ? '0 0 0.22em rgba(255,106,0,0.65), 0 0 0.6em rgba(255,106,0,0.3)'
          : 'none',
        opacity,
        transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
        filter: blur > 0.2 ? `blur(${blur}px)` : 'none',
        willChange: 'transform, filter, opacity',
      }}
    >
      {children}
    </span>
  );
};