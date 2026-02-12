"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
};

export default function ImageReveal({ children, className = "" }: ImageRevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 1.02 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
