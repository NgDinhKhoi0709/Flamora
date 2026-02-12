"use client";
import { AnimatePresence, motion as fmMotion } from "framer-motion";
import { motion as motionTokens } from "@/lib/motion";
import * as React from "react";

export function AnimatedAccordionContent({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <fmMotion.div
          key="content"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{
            duration: motionTokens.duration.fast / 1000,
            ease: motionTokens.easing.soft,
          }}
          style={{ willChange: "opacity, transform" }}
        >
          {children}
        </fmMotion.div>
      )}
    </AnimatePresence>
  );
}
