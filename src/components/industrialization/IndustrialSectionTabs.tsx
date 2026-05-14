"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { assetPath } from "@/lib/assetPath";

type SectionItem = {
  titleZh: string;
  bodyZh: string;
  bulletsZh?: string[];
};

const SECTION_THEMES = [
  {
    gradient: "from-cyan-500 via-sky-500 to-blue-600",
    activeBorder: "border-cyan-500/50",
    activeBg: "bg-gradient-to-br from-cyan-500/8 to-sky-500/5",
    dot: "bg-cyan-500",
    icon: "🌊",
    tabAccent: "text-cyan-600",
    cardBorder: "border-cyan-400/25",
    cardBg: "bg-cyan-500/5",
    numColor: "from-cyan-400 to-sky-500",
    bulletBg: "bg-cyan-500",
  },
  {
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    activeBorder: "border-emerald-500/50",
    activeBg: "bg-gradient-to-br from-emerald-500/8 to-teal-500/5",
    dot: "bg-emerald-500",
    icon: "📊",
    tabAccent: "text-emerald-600",
    cardBorder: "border-emerald-400/25",
    cardBg: "bg-emerald-500/5",
    numColor: "from-emerald-400 to-teal-500",
    bulletBg: "bg-emerald-500",
  },
  {
    gradient: "from-violet-500 via-purple-500 to-indigo-600",
    activeBorder: "border-violet-500/50",
    activeBg: "bg-gradient-to-br from-violet-500/8 to-indigo-500/5",
    dot: "bg-violet-500",
    icon: "🔬",
    tabAccent: "text-violet-600",
    cardBorder: "border-violet-400/25",
    cardBg: "bg-violet-500/5",
    numColor: "from-violet-400 to-indigo-500",
    bulletBg: "bg-violet-500",
  },
] as const;

const KEY_METRICS = [
  { label: "COD 削减",   value: "21–28%", sub: "5处不同类型水体",   color: "text-cyan-600" },
  { label: "氨氮削减",   value: "28–93%", sub: "典型场景最优值",    color: "text-sky-600" },
  { label: "叶绿素去除", value: "71.5%",  sub: "典型案例 10 min",  color: "text-violet-600" },
  { label: "浊度下降",   value: ">25%",   sub: "整体均值",         color: "text-teal-600" },
  { label: "总磷削减",   value: "17–37%", sub: "多点位测试",       color: "text-emerald-600" },
  { label: "处理时长",   value: "10 min", sub: "快速见效时间",      color: "text-amber-600" },
];

const GALLERY_IMGS = [
  { src: "/industrialization/black-odorous-water/gallery01.png", caption: "监利项目点位 A" },
  { src: "/industrialization/black-odorous-water/gallery04.png", caption: "曝气运行过程" },
  { src: "/industrialization/black-odorous-water/gallery05.png", caption: "治理后水体状态" },
  { src: "/industrialization/black-odorous-water/gallery08.png", caption: "典型点位对比（样点1）" },
  { src: "/industrialization/black-odorous-water/gallery09.png", caption: "典型点位对比（样点2）" },
  { src: "/industrialization/black-odorous-water/gallery06.png", caption: "静海独流镇现场" },
  { src: "/industrialization/black-odorous-water/gallery03.png", caption: "治理前黑臭状态" },
  { src: "/industrialization/black-odorous-water/gallery07.png", caption: "藻类富集阶段" },
  { src: "/industrialization/black-odorous-water/gallery10.png", caption: "典型点位对比（样点3）" },
];

export default function IndustrialSectionTabs({ sections }: { sections: SectionItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = sections[activeIndex] ?? sections[0];
  const theme = SECTION_THEMES[activeIndex % SECTION_THEMES.length];

  if (!sections.length || !active) return null;

  const paragraphs = active.bodyZh.split(/\n+/).map((p) => p.trim()).filter(Boolean);

  // Pick 3 images for the active tab (2 small + 1 wide)
  const imgOffset = activeIndex * 3;
  const tabImgs = GALLERY_IMGS.slice(imgOffset, imgOffset + 3);

  return (
    <div className="mt-8 space-y-5">

      {/* ── KPI 指标带 ── */}
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-sm">
        <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600" />
        <div className="px-4 py-4 sm:px-6">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[var(--muted)]">Key Performance Metrics · 治理效果指标</p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {KEY_METRICS.map((m) => (
              <div
                key={m.label}
                className="group rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-2.5 py-2.5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]/30 hover:shadow-md"
              >
                <div className="text-[10px] leading-tight text-[var(--muted)]">{m.label}</div>
                <div className={`mt-1 text-lg font-black tabular-nums ${m.color}`}>{m.value}</div>
                <div className="mt-0.5 text-[9px] leading-tight text-[var(--muted)]">{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab 导航 ── */}
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-2">
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">
          {sections.map((s, idx) => {
            const t = SECTION_THEMES[idx % SECTION_THEMES.length];
            const isActive = idx === activeIndex;
            return (
              <button
                key={s.titleZh}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={[
                  "relative overflow-hidden rounded-xl border px-4 py-3.5 text-left transition-all duration-200",
                  isActive
                    ? `${t.activeBorder} ${t.activeBg} shadow-sm`
                    : "border-transparent hover:border-[var(--border)] hover:bg-[var(--bg-elevated)]",
                ].join(" ")}
              >
                {isActive && (
                  <motion.span
                    layoutId="section-tab-pill"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: "transparent" }}
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2.5">
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-base ${
                    isActive ? "bg-white/60 shadow-sm" : "bg-[var(--bg-elevated)]"
                  }`}>
                    {t.icon}
                  </span>
                  <span className="flex flex-col">
                    <span className={`text-sm font-bold leading-tight ${
                      isActive ? "text-[var(--text)]" : "text-[var(--text-secondary)]"
                    }`}>
                      {s.titleZh}
                    </span>
                    <span className={`text-[10px] font-semibold uppercase tracking-wider mt-0.5 ${
                      isActive ? t.tabAccent : "text-[var(--muted)]"
                    }`}>
                      Section {String(idx + 1).padStart(2, "0")}
                    </span>
                  </span>
                </span>
                {isActive && (
                  <div className={`absolute bottom-0 inset-x-0 h-0.5 rounded-full bg-gradient-to-r ${t.gradient}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 内容区域 ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.titleZh}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="grid gap-4 lg:grid-cols-[1fr_380px]"
        >
          {/* 左：文字内容 */}
          <div
            className={[
              "relative overflow-hidden rounded-2xl border p-6 shadow-sm",
              theme.cardBorder,
              theme.cardBg,
            ].join(" ")}
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${theme.gradient}`} />

            {/* 标题行 */}
            <div className="mb-5 flex items-start gap-3">
              <span className={`mt-0.5 shrink-0 text-2xl font-black tabular-nums bg-gradient-to-br ${theme.numColor} bg-clip-text text-transparent`}>
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-xl font-extrabold leading-tight tracking-tight text-[var(--text)]">
                  {active.titleZh}
                </h2>
                <div className={`mt-1 text-[11px] font-bold uppercase tracking-widest ${theme.tabAccent}`}>
                  {["核心概览", "成果数据", "适用场景"][activeIndex] ?? "详细内容"}
                </div>
              </div>
            </div>

            {/* 段落文本 */}
            <div className="space-y-3.5">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-[14px] leading-[1.8] text-[var(--text-secondary)]">{p}</p>
              ))}
            </div>

            {/* 要点列表 */}
            {active.bulletsZh?.length ? (
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {active.bulletsZh.map((b) => (
                  <li
                    key={b}
                    className={[
                      "flex items-start gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm",
                      "text-[var(--text-secondary)] bg-[var(--bg-card)]/80 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm",
                      theme.cardBorder,
                    ].join(" ")}
                  >
                    <span className={`mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full ${theme.bulletBg}`} />
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* 右：图片列 */}
          <div className="flex flex-col gap-3">
            {/* 上方两小图并排 */}
            <div className="grid grid-cols-2 gap-3">
              {tabImgs.slice(0, 2).map((img, i) => (
                <motion.div
                  key={img.src}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.07, duration: 0.2 }}
                  className="group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] shadow-sm"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={assetPath(img.src)}
                      alt={img.caption}
                      fill
                      sizes="(max-width: 1024px) 50vw, 200px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <div className="px-2.5 py-2 text-[10px] font-medium text-[var(--muted)] leading-snug">
                    {img.caption}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 下方宽图 */}
            {tabImgs[2] ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.14, duration: 0.2 }}
                className="group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] shadow-sm"
              >
                <div className="relative aspect-[16/8] w-full">
                  <Image
                    src={assetPath(tabImgs[2].src)}
                    alt={tabImgs[2].caption}
                    fill
                    sizes="(max-width: 1024px) 100vw, 380px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3">
                    <span className="text-xs font-semibold text-white/90 drop-shadow">
                      {tabImgs[2].caption}
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
