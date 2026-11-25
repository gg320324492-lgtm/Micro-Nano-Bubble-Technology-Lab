// src/components/motion/MotionEngine.tsx
// 全站动效引擎（round 10 选定 A · 滑入交错）
// Reveal 章节级入场（左/右/下方向滑入 + 弹性收尾）；RevealItem 卡片级自下交错
// slide variants：dirX 非零时水平滑入 72px，否则自下浮起 44px；弹性 ease [0.22, 1, 0.36, 1]
// prefers-reduced-motion 用户由全局 CSS 兜底禁用
"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export type RevealSide = "left" | "right" | "bottom" | "none";

export function buildVariants(
  _style: "slide",
  side: RevealSide,
  delay: number,
): Variants {
  const dirX = side === "left" ? -1 : side === "right" ? 1 : 0;
  return {
    hidden: { opacity: 0, x: dirX ? dirX * 72 : 0, y: dirX ? 0 : 44 },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
    },
  };
}

export function Reveal({
  children,
  side = "bottom",
  delay = 0,
  className,
  margin = "-80px",
}: {
  children: ReactNode;
  side?: RevealSide;
  delay?: number;
  className?: string;
  margin?: string;
}) {
  const variants = buildVariants("slide", side, delay);
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── 卡片级入场：区块内部子元素交错（自下浮起） ── */

export function RevealItem({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const variants = buildVariants("slide", "bottom", delay);
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
