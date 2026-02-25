// src/lib/motion.ts
// Shared motion tokens for Flamora (minimal, premium, soft-light inspired)

export const motion = {
  duration: {
    fast: 120,
    normal: 240,
    slow: 400,
    entrance: 600,
    hero: 800,
  },
  easing: {
    soft: "easeInOut", // main, compatible with framer-motion
    linear: "linear", // for shimmer
    entrance: [0.25, 0.1, 0.25, 1] as const, // smooth cubic bezier for scroll reveals
    bouncy: [0.68, -0.55, 0.265, 1.55] as const,
  },
  distance: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 30,
    xl: 50,
  },
  opacity: {
    from: 0,
    to: 1,
  },
  stagger: {
    grid: 60, // ms
    list: 40, // ms
    section: 100, // ms between sections
  },
  parallax: {
    heroSpeed: 0.3, // ratio for hero background
    imageSpeed: 0.15,
  },
};

// Usage: import { motion } from '@/lib/motion';
// Example: transition: `opacity ${motion.duration.normal}ms ${motion.easing.soft}`;
