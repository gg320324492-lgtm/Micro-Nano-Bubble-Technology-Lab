"use client";

// 首页第 01 章 · 导师介绍（方向 A · 仪器手册语言）
import { motion } from "framer-motion";
import PiCardNavy from "@/components/PiCardNavy";

export default function LabIntroSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      <PiCardNavy />
    </motion.div>
  );
}
