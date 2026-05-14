"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import CountUp from "@/components/ui/CountUp";
import { ArrowRight } from "lucide-react";
import type { OutputCard, OutputTab } from "@/types";

const hoverSpring = { type: "spring" as const, stiffness: 420, damping: 32, mass: 0.6 };

const TYPE_STYLES: Record<OutputKind, string> = {
  paper: "bg-violet-50 text-violet-700",
  patent: "bg-indigo-50 text-indigo-700",
  honor: "bg-pink-50 text-pink-700",
  project: "bg-sky-50 text-sky-700",
};

const TYPE_LABELS: Record<OutputKind, string> = {
  paper: "论文",
  patent: "专利",
  honor: "荣誉",
  project: "项目",
};

type OutputKind = "paper" | "patent" | "honor" | "project";

type StatItem = { key: OutputTab; label: string; value: number };

export default function OutputsSection({
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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
              Featured Outputs
            </span>
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">各类成果展示</h2>
            <p className="text-sm md:text-base text-[var(--text-secondary)]">
              汇集课题组近年来的代表性论文、专利、项目与荣誉成果，展示研究产出与学术转化能力。
            </p>
          </div>
          <Link
            href="/publications"
            className="inline-flex items-center gap-2 text-[var(--accent)] font-semibold hover:gap-4 transition-all group"
          >
            查看全部成果
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 统计切换条 */}
        <div className="flex justify-center">
          <div className="grid w-full max-w-3xl gap-3 sm:grid-cols-4">
            {stats.map((x) => {
              const isActive = activeTab === x.key;
              return (
                <button
                  key={x.key}
                  type="button"
                  onClick={() => setActiveTab(x.key)}
                  className={`group flex items-center justify-between rounded-full px-5 py-2.5 text-sm md:text-base border transition-all ${
                    isActive
                      ? "bg-white border-[var(--accent)]/40 shadow-[var(--shadow-card)]"
                      : "bg-[var(--bg-card)]/80 border-[var(--border)]/60 hover:bg-white/80 hover:border-[var(--accent)]/30"
                  }`}
                >
                  <span
                    className={`font-semibold transition-colors ${
                      isActive ? "text-[var(--accent)]" : "text-[var(--muted)] group-hover:text-[var(--text)]"
                    }`}
                  >
                    {x.label}
                  </span>
                  <CountUp
                    end={x.value}
                    className="text-lg md:text-xl font-semibold text-[var(--text)]"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* 成果卡片列表 */}
        {currentCards.length ? (
          <div className="grid gap-4 lg:grid-cols-1">
            {currentCards.map((o, idx) => (
              <motion.div
                key={o.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(idx * 0.05, 0.2) }}
                whileHover={{ y: -10, scale: 1.01, transition: hoverSpring }}
                className="group h-full"
                style={{ willChange: "transform" }}
              >
                <Link
                  href={o.href}
                  className="flex h-full flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-[var(--radius-xl)] border border-[var(--border)] bg-white/90 px-5 py-4 shadow-[var(--shadow-card)] hover:bg-[var(--accent-soft)]/10 hover:border-[var(--accent)]/70 transition-all"
                >
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ${
                        TYPE_STYLES[o.type as OutputKind] ?? TYPE_STYLES.paper
                      }`}
                    >
                      {TYPE_LABELS[o.type as OutputKind] ?? o.type}
                    </span>
                    {o.year ? (
                      <span className="text-sm text-[var(--muted)] tabular-nums">{o.year}</span>
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="text-sm md:text-base font-semibold text-[var(--text)] leading-snug line-clamp-2">
                      {o.title}
                    </div>
                    {o.subtitle ? (
                      <div className="text-xs md:text-sm text-[var(--text-secondary)] line-clamp-1">
                        {o.subtitle}
                      </div>
                    ) : null}
                    {o.meta ? (
                      <div className="text-xs text-[var(--muted)] line-clamp-1">{o.meta}</div>
                    ) : null}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline text-xs text-[var(--muted)]">点击查看</span>
                    <ArrowRight className="h-5 w-5 text-[var(--accent)] group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-[var(--radius-xl)] border border-dashed border-[var(--border)] bg-white/50 px-6 py-10 text-center text-sm text-[var(--muted)]">
            暂无可展示的成果数据。
          </div>
        )}
      </motion.div>
    </motion.section>
  );
}
