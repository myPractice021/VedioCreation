import {loadFont} from '@remotion/google-fonts/Anton';

const {fontFamily} = loadFont();

export const WIDTH = 1080;
export const HEIGHT = 1920;
export const FPS = 30;
export const DURATION = 900;

export const FONT_FAMILY = `${fontFamily}, Impact, 'Arial Black', sans-serif`;

export const COLORS = {
  bg: '#07070a',
  orange: '#ff6a00',
  orangeSoft: '#ff9a3c',
  white: '#ffffff',
} as const;

// Instagram Reels safe area (px)
export const SAFE = {top: 250, bottom: 340, side: 60} as const;

// Scene timings in frames (30 fps): 0-4s, 4-10s, 10-16s, 16-24s, 24-30s
export const SCENES = {
  s1: {from: 0, duration: 120},
  s2: {from: 120, duration: 180},
  s3: {from: 300, duration: 180},
  s4: {from: 480, duration: 240},
  s5: {from: 720, duration: 180},
} as const;