// src/components/OutputsSectionNavy.tsx
// 方向 A · 仪器手册语言 —— 成果展示区（首页第 04 章 · round 05 选定 A · 网格 2×3 + 1880 宽）
// 顶部四张统计卡即 tab 按钮（点击切换分类），下方 2×3 卡片网格展示最新 6 条
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { RevealItem } from "@/components/motion/MotionEngine";
import type { OutputCard, OutputTab } from "@/types";

const TYPE_LABELS: Record<string, string> = {
  paper: "论文",
  patent: "专利",
  honor: "荣誉",
  project: "项目",
};

type StatItem = { key: OutputTab; label: string; value: number };

export default function OutputsSectionNavy({
  stats,
  allCards,
}: {
  stats: StatItem[];
  allCards: Record<OutputTab, OutputCard[]>;
}) {
  const [activeTab, setActiveTab] = useState<OutputTab>("papers");

  const currentCards = (allCards[activeTab] ?? [])
    .slice()
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
    .slice(0, 6);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="opt-wrap">
        <header className="section-head">
          <span className="section-head__no">04</span>
          <span className="section-head__zh">成果展示</span>
          <span className="section-head__line" aria-hidden="true" />
          <span className="section-head__en">FEATURED OUTPUTS</span>
        </header>

        {/* 数据统计行（tab 切换） */}
        <div className="opt-stats">
          {stats.map((s) => (
            <button
              key={s.key}
              type="button"
              className={`opt-stat ${activeTab === s.key ? "opt-stat--on" : ""}`}
              onClick={() => setActiveTab(s.key)}
            >
              <span className="opt-stat__n">{s.value}</span>
              <span className="opt-stat__t">{s.label}</span>
            </button>
          ))}
        </div>

        {/* 2×3 卡片网格 */}
        <div className="opt-grid">
          {currentCards.map((c, idx) => (
            <RevealItem
              key={`${c.type}-${c.id}`}
              delay={0.05 * idx}
              className="opt-card"
            >
              <Link href={c.href ?? "/publications"} className="opt-card__link">
                <div className="opt-card__head">
                  <span className="opt-type">{TYPE_LABELS[c.type] ?? c.type}</span>
                  <div className="opt-meta">
                    {c.year ? <span className="opt-meta__year">{c.year}</span> : null}
                    {c.meta ? <span className="opt-meta__venue">{c.meta}</span> : null}
                  </div>
                </div>
                <h3 className="opt-card__title">{c.title}</h3>
                {c.subtitle ? <p className="opt-card__sub">{c.subtitle}</p> : null}
                <span className="rs-more">
                  查看详情
                  <span aria-hidden="true"> →</span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </div>

        <div className="opt-foot">
          <Link href="/publications" className="rs-more">
            查看全部成果
            <span aria-hidden="true"> →</span>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
