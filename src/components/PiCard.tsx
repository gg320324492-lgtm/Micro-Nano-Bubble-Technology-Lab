"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PublicImage from "@/components/PublicImage";
import { pi } from "@/data/pi";

export default function PiCard() {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative rounded-[var(--radius-xl)] border-2 border-[var(--border)] bg-white p-8 md:p-10 shadow-lg overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-[var(--accent-secondary)]/5 pointer-events-none" />
      
      <div className="relative z-10 mb-6 text-center">
        <h2 className="text-xl md:text-2xl font-bold gradient-text">导师介绍</h2>
      </div>
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
            天大主页
          </motion.a>
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

      <div className="relative z-10 mt-8 pt-8 border-t border-[var(--border)]">
        <div className="font-bold text-lg text-[var(--text)] mb-3 gradient-text">招生信息</div>
        <div className="text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
          {pi.recruit}
        </div>
      </div>
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
