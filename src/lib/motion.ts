// src/lib/motion.ts
// Shared motion tokens for Flamora (minimal, premium, soft-light inspired)

export const motion = {
  duration: {
    fast: 120,
    normal: 240,
    slow: 400,
  },
  easing: {
    soft: "easeInOut", // main, compatible with framer-motion
    linear: "linear", // for shimmer
  },
  distance: {
    xs: 4,
    sm: 8,
    md: 12,
  },
  opacity: {
    from: 0,
    to: 1,
  },
  stagger: {
    grid: 60, // ms
    list: 40, // ms
  },
};

// Usage: import { motion } from '@/lib/motion';
// Example: transition: `opacity ${motion.duration.normal}ms ${motion.easing.soft}`;
