import {Easing, interpolate, useCurrentFrame} from 'remotion';

export const CL = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
} as const;

// Frames before a scene ends when its words begin to exit
export const EXIT_LEAD = 18;

export const polygonPoints = (r: number, n: number, rot: number): string =>
  Array.from({length: n}, (_, i) => {
    const a = rot + (i / n) * Math.PI * 2;
    return `${(Math.cos(a) * r).toFixed(2)},${(Math.sin(a) * r).toFixed(2)}`;
  }).join(' ');

// Fade-in at scene start, fade-out at scene end (use inside a <Sequence>)
export const useSceneAlpha = (duration: number, hasExit = true): number => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 18], [0, 1], {
    ...CL,
    easing: Easing.inOut(Easing.cubic),
  });
  const fadeOut = hasExit
    ? interpolate(frame, [duration - 21, duration - 3], [1, 0], {
        ...CL,
        easing: Easing.inOut(Easing.cubic),
      })
    : 1;
  return fadeIn * fadeOut;
};