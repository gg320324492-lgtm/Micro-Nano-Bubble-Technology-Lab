"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PublicImage from "@/components/PublicImage";

export default function PiCard() {
  const [open, setOpen] = useState(false);

  const pi = useMemo(
    () => ({
      nameZh: "王天志",
      nameEn: "Tianzhi Wang",
      title: "副教授（博导）",
      org: "天津大学 环境科学与工程学院",
      addr: "天津市南开区卫津路92号（天津大学），邮编：300072",
      bio:
        "聚焦微纳米气泡机理与工程应用，涵盖气泡溃灭与·OH原位形成、协同消毒与饮用水生物稳定性提升、表面清洗与水环境治理装备开发等方向。",
      avatar: "/people/pi.jpg",
      homepage: "https://faculty.tju.edu.cn/226066/zh_CN/index.htm",
      email: "wangtianzhi@tju.edu.cn",
      tags: [
        "微纳米气泡溃灭与·OH原位形成",
        "协同氯消毒与杀菌机制",
        "饮用水生物稳定性（AOC/BDOC）",
        "臭氧/纳米气泡水处理强化",
        "微纳米气泡装备与在线监测",
        "表面清洗与农业应用",
      ],
      education: [
        { time: "2009.9 - 2013.6", text: "中国农业大学 - 农业水利工程 - 学士" },
        { time: "2013.9 - 2018.6", text: "中国农业大学 - 农业水土工程 - 博士" },
        { time: "2016.11 - 2017.11", text: "美国伊利诺伊香槟分校 - 农业与生物工程学院 - 联合培养博士" },
        { time: "2017.8 - 2017.10", text: "美国哥伦比亚大学 - Earth Engineering Center - 交流生" },
        { time: "2018.8 - 2020.9", text: "清华大学 - 环境科学 - 博士后" },
      ],
      work: [
        { time: "2020.9 - 2022.3", text: "环境科学与工程学院 → 天津大学 → 助理研究员" },
        { time: "2022.3 - 2024.10", text: "环境科学与工程学院 → 天津大学 → 环工支部青年委员 → 副研究员" },
      ],
      service: [
        { time: "2024.3 - 2027.2", text: "《Processes》期刊客座编辑" },
        { time: "2024.4 - 2029.4", text: "全国研究生教育评估监测专家库专家" },
        { time: "2025.4 - 2029.3", text: "《净水技术》期刊青年编委" },
        { time: "2025.2 - 2030.1", text: "天津市宁河区产业高质量发展「领衔专家」" },
      ],
      recruit:
        "团队常年招收硕士研究生3–4名、博士生1–2名及本科生若干，欢迎环境/市政/自动化/农业工程/化工/工业设计等背景同学加入。",
    }),
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative rounded-[var(--radius-xl)] border-2 border-[var(--border)] bg-white p-8 md:p-10 shadow-lg overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-[var(--accent-secondary)]/5 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="flex gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[var(--radius-lg)] bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] p-0.5 md:h-28 md:w-28"
          >
            <div className="relative h-full w-full rounded-[var(--radius-md)] bg-white overflow-hidden">
              <PublicImage
                src={pi.avatar}
                variant="thumb"
                alt={pi.nameEn}
                fill
                sizes="112px"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
          <div className="space-y-2">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <div className="text-2xl md:text-3xl font-bold text-[var(--text)] gradient-text">{pi.nameZh}</div>
              <div className="text-base md:text-lg text-[var(--text-secondary)]">{pi.nameEn}</div>
            </div>
            <div className="text-base md:text-lg text-[var(--accent)] font-semibold">{pi.title}</div>
            <div className="pt-2 text-sm md:text-base text-[var(--text-secondary)]">{pi.org}</div>
            <div className="text-sm md:text-base text-[var(--muted)]">{pi.addr}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 md:justify-end">
          {pi.email ? (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`mailto:${pi.email}`}
              className="rounded-[var(--radius-md)] border border-[var(--border-glow)] px-5 py-2.5 text-sm font-medium text-[var(--accent)] hover:bg-[var(--accent-soft)] transition-all hover:shadow-[0_0_20px_rgba(138,43,226,0.3)]"
              title={pi.email}
              aria-label={`Email: ${pi.email}`}
            >
              Email
            </motion.a>
          ) : (
            <button
              type="button"
              className="rounded-[var(--radius-md)] border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--muted)] cursor-not-allowed"
              title="暂无邮箱信息"
            >
              Email
            </button>
          )}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={pi.homepage}
            target="_blank"
            rel="noreferrer"
            className="rounded-[var(--radius-md)] border border-[var(--border-glow)] px-5 py-2.5 text-sm font-medium text-[var(--accent)] hover:bg-[var(--accent-soft)] transition-all hover:shadow-[0_0_20px_rgba(138,43,226,0.3)]"
          >
            主页
          </motion.a>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/contact"
              className="rounded-[var(--radius-md)] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] px-5 py-2.5 text-sm font-semibold text-white transition-all shadow-lg hover:shadow-xl"
            >
              加入我们
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 mt-6 text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
        {pi.bio}
      </div>

      <div className="relative z-10 mt-6 flex flex-wrap gap-3">
        {pi.tags.map((t, idx) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="rounded-full border border-[var(--border-glow)] bg-[var(--accent-soft)] px-4 py-2 text-xs text-[var(--accent)] md:text-sm font-medium backdrop-blur-sm hover:bg-[var(--accent)]/20 transition-colors"
          >
            {t}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 mt-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 text-base font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors group"
        >
          <motion.span
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-[var(--accent)]"
          >
            ▶
          </motion.span>
          更多信息（教育经历 / 工作经历 / 学术兼职）
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 grid gap-6 md:grid-cols-3 overflow-hidden"
            >
              <InfoBlock title="教育经历" items={pi.education} />
              <InfoBlock title="工作经历" items={pi.work} />
              <InfoBlock title="社会兼职" items={pi.service} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 mt-8 rounded-[var(--radius-lg)] border-2 border-[var(--border)] bg-gradient-to-br from-[var(--accent-soft)] to-[var(--accent-secondary)]/10 p-6 md:p-8"
      >
        <div className="font-bold text-lg text-[var(--text)] mb-3 gradient-text">招生信息</div>
        <div className="text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
          {pi.recruit}
        </div>
      </motion.div>
    </motion.div>
  );
}

function InfoBlock({
  title,
  items,
}: {
  title: string;
  items: { time: string; text: string }[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-6 backdrop-blur-xl"
    >
      <div className="font-bold text-base text-[var(--text)] mb-4 gradient-text">{title}</div>
      <div className="space-y-4">
        {items.map((it, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="text-sm md:text-base"
          >
            <div className="text-xs text-[var(--accent)] md:text-sm font-medium mb-1">{it.time}</div>
            <div className="text-[var(--text-secondary)] leading-relaxed">{it.text}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
