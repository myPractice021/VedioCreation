import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {COLORS, FONT_FAMILY, WIDTH} from '../theme';
import {CL} from '../utils';
import {AnimatedWord} from './AnimatedWord';

type Props = {
  words: string[]; // a trailing * marks an orange accent word
  y: number; // vertical centre in px
  size: number; // font size in px
  delay: number; // scene-local frame of first word
  stagger?: number; // frames between words
  exitAt?: number; // scene-local frame where exit begins
  strikeAt?: number; // scene-local frame where a strike-through draws
};

export const TextLine: React.FC<Props> = ({
  words,
  y,
  size,
  delay,
  stagger = 6,
  exitAt,
  strikeAt,
}) => {
  const frame = useCurrentFrame();
  const strike =
    strikeAt === undefined
      ? 0
      : interpolate(frame, [strikeAt, strikeAt + 15], [0, 1], {
          ...CL,
          easing: Easing.inOut(Easing.cubic),
        });

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        width: WIDTH,
        top: y,
        transform: 'translateY(-50%)',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          gap: '0.24em',
          fontFamily: FONT_FAMILY,
          fontSize: size,
          lineHeight: 1,
          whiteSpace: 'nowrap',
          letterSpacing: '0.01em',
          textTransform: 'uppercase',
        }}
      >
        {words.map((w, i) => {
          const accent = w.endsWith('*');
          return (
            <AnimatedWord
              key={i}
              delay={delay + i * stagger}
              exitAt={exitAt === undefined ? undefined : exitAt + i}
              accent={accent}
              dir={i % 2 ? 1 : -1}
              dim={1 - 0.6 * strike}
            >
              {accent ? w.slice(0, -1) : w}
            </AnimatedWord>
          );
        })}
        {strikeAt !== undefined && (
          <div
            style={{
              position: 'absolute',
              left: '-3%',
              top: '55%',
              width: '106%',
              height: '0.075em',
              background: COLORS.orange,
              boxShadow: `0 0 30px ${COLORS.orange}`,
              transformOrigin: 'left center',
              transform: `scaleX(${strike})`,
            }}
          />
        )}
      </div>
    </div>
  );
};