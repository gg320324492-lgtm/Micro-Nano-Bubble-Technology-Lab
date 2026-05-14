"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import PublicImage from "@/components/PublicImage";
import CountUp from "@/components/ui/CountUp";
import { ArrowRight, Users } from "lucide-react";
import type { PersonView } from "@/types";

type PeopleDigest = {
  counts: { PhD: number; Master: number; Undergrad: number; Alumni: number; total: number };
  featured: PersonView[];
  topTags: string[];
};

function pickPersonPhoto(p: PersonView): string {
  return (p.photo ?? p.avatar ?? p.image ?? p.img ?? p.photoUrl ?? p.avatarUrl ?? p.headshot ?? "") as string;
}

export default function PeopleSection({ digest }: { digest: PeopleDigest }) {
  const [avatarLoadFailed, setAvatarLoadFailed] = useState<Record<string, boolean>>({});

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[var(--accent)] tracking-widest uppercase">People</span>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">成员</h2>
          <p className="text-base text-[var(--text-secondary)] max-w-2xl">
            研究团队与方向分布一览，快速找到你关心的研究主题与成员。
          </p>
        </div>
        <Link
          href="/people"
          className="inline-flex items-center gap-2 text-[var(--accent)] font-semibold hover:gap-4 transition-all group"
        >
          了解成员
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* 团队概览 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.0 }}
          whileHover={{ y: -10, scale: 1.01 }}
          className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-white/80 backdrop-blur-sm p-6 shadow-[var(--shadow-card)] flex flex-col gap-4"
        >
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text)]">
              <Users className="h-4 w-4 text-[var(--accent)]" />
              团队概览
            </div>
            <p className="mt-2 text-xs text-[var(--text-secondary)] leading-relaxed">
              团队围绕微纳米气泡在水环境、供水安全与农业场景中的交叉应用，汇聚多学科背景的博士、
              硕士与本科生共同推进研究与工程化实践。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              { label: "博士生", value: digest.counts.PhD },
              { label: "硕士生", value: digest.counts.Master },
              { label: "本科生", value: digest.counts.Undergrad },
              { label: "已毕业", value: digest.counts.Alumni },
            ].map((item) => (
              <div key={item.label} className="rounded-[var(--radius-md)] bg-[var(--accent-soft)]/30 p-3">
                <div className="text-xs text-[var(--muted)]">{item.label}</div>
                <CountUp end={item.value} className="text-2xl font-bold text-[var(--text)]" />
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-[var(--muted)]">
            总计 {digest.counts.total} 人（包含在读与已毕业成员）。
          </div>
        </motion.div>

        {/* 代表成员 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          whileHover={{ y: -10, scale: 1.01 }}
          className="lg:col-span-2 rounded-[var(--radius-xl)] border border-[var(--border)] bg-white/80 backdrop-blur-sm p-6 md:p-7 shadow-[var(--shadow-card)]"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="text-sm font-semibold text-[var(--text)]">代表成员</div>
            <Link
              href="/people"
              className="text-sm font-semibold text-[var(--accent)] hover:underline underline-offset-2"
            >
              查看全部 →
            </Link>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-3">
            {digest.featured.map((p, idx) => {
              const avatarSrc = pickPersonPhoto(p);
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: Math.min(idx * 0.08, 0.24) }}
                  style={{ willChange: "transform" }}
                >
                  <Link
                    href="/people"
                    className="group flex flex-col items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-white px-3 py-3 text-center hover:bg-[var(--accent-soft)]/20 transition-all duration-300 sm:flex-row sm:text-left sm:px-3.5 sm:gap-3"
                  >
                    {avatarSrc && !avatarLoadFailed[p.id] ? (
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[var(--bg-elevated)] ring-1 ring-[var(--border)] sm:h-12 sm:w-12">
                        <PublicImage
                          src={avatarSrc}
                          variant={p.id === "zhaohangjia" ? undefined : "thumb"}
                          alt={p.nameZh || p.nameEn || "成员头像"}
                          fill
                          sizes="48px"
                          className="object-cover"
                          onError={() => setAvatarLoadFailed((prev) => ({ ...prev, [p.id]: true }))}
                        />
                      </div>
                    ) : (
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bg-elevated)] text-sm font-semibold text-[var(--muted)] ring-1 ring-[var(--border)] sm:h-12 sm:w-12">
                        {(p.nameZh || p.nameEn || "?").slice(0, 1)}
                      </div>
                    )}
                    <div className="min-w-0 w-full">
                      <div className="flex flex-wrap items-center justify-center gap-1 sm:justify-start sm:gap-2">
                        <div className="font-semibold text-sm text-[var(--text)] truncate">{p.nameZh}</div>
                        {p.cohort ? (
                          <span className="text-[11px] font-semibold text-[var(--muted)] shrink-0">
                            {p.cohort}级
                          </span>
                        ) : null}
                      </div>
                      <div className="hidden text-xs text-[var(--text-secondary)] truncate sm:block">
                        {p.introZh}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {digest.topTags.length ? (
            <div className="mt-6">
              <div className="text-xs font-medium text-[var(--muted)] mb-2">热门方向标签：</div>
              <div className="flex flex-wrap gap-2">
                {digest.topTags.map((t) => (
                  <Link
                    key={t}
                    href="/people"
                    className="rounded-full bg-[var(--accent-soft)]/40 px-3 py-1 text-[12px] font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)]/60 transition"
                    title="进入成员页按标签筛选"
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </motion.div>
      </div>
    </motion.section>
  );
}
