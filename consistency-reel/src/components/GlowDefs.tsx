import React from 'react';
import {COLORS} from '../theme';

// Shared SVG filter + gradients. Place inside any <svg> that uses them.
export const GlowDefs: React.FC = () => (
  <defs>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="8" result="b" />
      <feMerge>
        <feMergeNode in="b" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <linearGradient id="stair" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={COLORS.orange} stopOpacity="0.9" />
      <stop offset="1" stopColor={COLORS.orange} stopOpacity="0.12" />
    </linearGradient>
    <linearGradient id="stairLast" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={COLORS.orangeSoft} stopOpacity="1" />
      <stop offset="1" stopColor={COLORS.orange} stopOpacity="0.3" />
    </linearGradient>
  </defs>
);