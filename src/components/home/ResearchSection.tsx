"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ResearchDirectionView } from "@/types";

const hoverSpring = { type: "spring" as const, stiffness: 420, damping: 32, mass: 0.6 };

function getTitleZh(a: ResearchDirectionView): string {
  return (a.titleZh ?? a.titleZH ?? a.title ?? a.nameZh ?? a.name ?? "") as string;
}
function getTitleEn(a: ResearchDirectionView): string {
  return (a.titleEn ?? a.titleEN ?? a.subtitle ?? a.nameEn ?? a.en ?? "") as string;
}
function getDescZh(a: ResearchDirectionView): string {
  return (a.descZh ?? a.descriptionZh ?? a.desc ?? a.description ?? "") as string;
}

export default function ResearchSection({ items }: { items: ResearchDirectionView[] }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
            Research Areas
          </span>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">研究方向</h2>
          <p className="text-base text-[var(--text-secondary)] max-w-2xl">
            聚焦微纳米气泡在水环境、供水安全与农业场景中的多尺度应用。
          </p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((a, idx) => (
          <motion.div
            key={(a.id as string) ?? idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            whileHover={{ y: -10, scale: 1.01, transition: hoverSpring }}
            className="group h-full"
            style={{ willChange: "transform" }}
          >
            <Link
              href={`/research/${(a.slug as string) ?? ""}`}
              className="block relative h-full overflow-hidden rounded-[var(--radius-xl)] border-2 border-[var(--border)] bg-white p-6 md:p-7 transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[var(--shadow-hover)]"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--accent-soft)] to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex h-full flex-col">
                <h3 className="mb-2 text-xl md:text-2xl font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                  {getTitleZh(a)}
                </h3>
                {getTitleEn(a) ? (
                  <p className="mb-2 text-xs md:text-sm text-[var(--text-secondary)]">
                    {getTitleEn(a)}
                  </p>
                ) : null}
                {getDescZh(a) ? (
                  <p className="mb-4 text-xs md:text-sm leading-relaxed text-[var(--muted)] line-clamp-3">
                    {getDescZh(a)}
                  </p>
                ) : null}
                <div className="mt-auto flex items-center gap-2 text-[var(--accent)] text-sm font-semibold group-hover:gap-3 transition-all">
                  <span>了解更多</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
