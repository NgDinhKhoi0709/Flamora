"use client";
import { motion } from "framer-motion";
import { motion as motionTokens } from "@/lib/motion";
import * as React from "react";

export function AccordionContentMotion({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use a ref to access the parent AccordionContent's data-state
  const ref = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const node = ref.current?.parentElement;
    if (!node) return;
    function update() {
      setOpen(node.getAttribute("data-state") === "open");
    }
    update();
    const observer = new MutationObserver(update);
    observer.observe(node, {
      attributes: true,
      attributeFilter: ["data-state"],
    });
    return () => observer.disconnect();
  }, []);
  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
      transition={{
        duration: motionTokens.duration.fast / 1000,
        ease: motionTokens.easing.soft,
      }}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}
