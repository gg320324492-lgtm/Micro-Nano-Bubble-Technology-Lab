"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type SectionItem = {
  titleZh: string;
  bodyZh: string;
  bulletsZh?: string[];
};

export default function IndustrialSectionTabs({ sections }: { sections: SectionItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = sections[activeIndex] ?? sections[0];

  if (!sections.length || !active) return null;

  return (
    <div className="mt-8 space-y-4">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-3">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {sections.map((s, idx) => (
            <button
              key={s.titleZh}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={[
                "relative overflow-hidden rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition",
                idx === activeIndex
                  ? "border-[var(--accent)] text-[var(--accent)]"
                  : "border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--accent-soft)]/70",
              ].join(" ")}
            >
              {idx === activeIndex ? (
                <motion.span
                  layoutId="industrial-tab-active-bg"
                  className="absolute inset-0 rounded-xl bg-[var(--accent-soft)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              ) : null}
              <span className="relative z-10">{s.titleZh}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.section
          key={active.titleZh}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-sm"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-500" />
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">{active.titleZh}</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-8 text-[var(--text-secondary)]">
            {active.bodyZh}
          </p>
          {active.bulletsZh?.length ? (
            <ul className="mt-4 space-y-2">
              {active.bulletsZh.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-sky-500" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </motion.section>
      </AnimatePresence>
    </div>
  );
}

