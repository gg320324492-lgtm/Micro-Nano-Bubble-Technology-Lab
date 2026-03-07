"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type RevealCardProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  /** 参考主页研究卡片的弹出感：y: 50 上滑 + 透明度 */
  y?: number;
};

/**
 * 滚动进入视口时，整张卡片从下方弹出（参考主页研究方向卡片）
 */
export default function RevealCard({
  children,
  className = "",
  id,
  delay = 0,
  y = 50,
}: RevealCardProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.section>
  );
}
