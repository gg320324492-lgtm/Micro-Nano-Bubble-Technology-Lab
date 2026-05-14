"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { assetPath } from "@/lib/assetPath";
import { toImageVariant } from "@/lib/imageVariant";
import type { IndustrialBaseView } from "@/types";

const hoverSpring = { type: "spring" as const, stiffness: 420, damping: 32, mass: 0.6 };

export default function IndustrialSection({ items }: { items: IndustrialBaseView[] }) {
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
            Industrialization
          </span>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">产业化</h2>
          <p className="text-base text-[var(--text-secondary)] max-w-2xl">
            应用验证基地与示范场景，展示监测平台入口与工程化落地内容。
          </p>
        </div>
        <Link
          href="/industrialization"
          className="inline-flex items-center gap-2 text-[var(--accent)] font-semibold hover:gap-4 transition-all group"
        >
          查看全部基地
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {items.map((b, idx) => (
          <motion.div
            key={b.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(idx * 0.08, 0.2) }}
            whileHover={{ y: -10, scale: 1.01, transition: hoverSpring }}
            className="group rounded-[var(--radius-xl)] border border-[var(--border)] bg-white/90 overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-300"
            style={{ willChange: "transform" }}
          >
            <div className="relative h-56 w-full bg-[var(--bg-elevated)]">
              {b.cover ? (
                <Image
                  src={assetPath(toImageVariant(b.cover, "thumb"))}
                  alt={b.titleZh}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <div className="text-lg font-semibold">{b.titleZh}</div>
                {b.titleEn ? <div className="text-xs opacity-90">{b.titleEn}</div> : null}
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm leading-relaxed text-[var(--text-secondary)] line-clamp-3">
                {b.briefZh}
              </p>
              {b.highlightsZh?.length ? (
                <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[var(--text-secondary)]">
                  {b.highlightsZh.slice(0, 2).map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              ) : null}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  href={`/industrialization/${encodeURIComponent(String(b.slug))}/`}
                  className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--accent-soft)] transition"
                >
                  查看详情
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
                {b.monitorUrl ? (
                  <a
                    href={b.monitorUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] px-4 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg transition"
                  >
                    打开监测大屏
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : null}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
