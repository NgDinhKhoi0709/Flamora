"use client";
import { motion, useInView } from "framer-motion";
import * as React from "react";

type RevealDirection = "up" | "down" | "left" | "right" | "zoom" | "none";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
  /** Use for staggering children */
  staggerChildren?: number;
  as?: keyof typeof motion;
}

const getInitial = (direction: RevealDirection, distance: number) => {
  switch (direction) {
    case "up":
      return { opacity: 0, y: distance };
    case "down":
      return { opacity: 0, y: -distance };
    case "left":
      return { opacity: 0, x: distance };
    case "right":
      return { opacity: 0, x: -distance };
    case "zoom":
      return { opacity: 0, scale: 0.92 };
    case "none":
      return { opacity: 0 };
  }
};

const getAnimate = (direction: RevealDirection) => {
  switch (direction) {
    case "up":
    case "down":
      return { opacity: 1, y: 0 };
    case "left":
    case "right":
      return { opacity: 1, x: 0 };
    case "zoom":
      return { opacity: 1, scale: 1 };
    case "none":
      return { opacity: 1 };
  }
};

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 40,
  className,
  once = true,
  staggerChildren,
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={getInitial(direction, distance)}
      animate={isInView ? getAnimate(direction) : getInitial(direction, distance)}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
        ...(staggerChildren
          ? { staggerChildren: staggerChildren / 1000 }
          : {}),
      }}
      className={className}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}

/** Individual child to be staggered inside a stagger parent */
interface ScrollRevealItemProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  distance?: number;
  duration?: number;
  className?: string;
}

export function ScrollRevealItem({
  children,
  direction = "up",
  distance = 30,
  duration = 0.5,
  className,
}: ScrollRevealItemProps) {
  return (
    <motion.div
      variants={{
        hidden: getInitial(direction, distance),
        visible: getAnimate(direction),
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px 0px" }}
      transition={{ duration, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}

/** Container that staggers its children */
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayStart?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.08,
  delayStart = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px 0px" }}
      transition={{
        staggerChildren: staggerDelay,
        delayChildren: delayStart,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** A single stagger item (used inside StaggerContainer) */
interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  direction?: RevealDirection;
  distance?: number;
}

export function StaggerItem({
  children,
  className,
  direction = "up",
  distance = 30,
}: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: getInitial(direction, distance),
        visible: {
          ...getAnimate(direction),
          transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
        },
      }}
      className={className}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}
