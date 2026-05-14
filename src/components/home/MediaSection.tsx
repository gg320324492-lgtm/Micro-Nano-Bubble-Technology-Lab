"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Newspaper, Camera } from "lucide-react";
import { assetPath } from "@/lib/assetPath";
import type { MediaLinkView } from "@/types";
import type { ShowcasePhoto } from "@/data/showcase";

function getMediaDate(description?: string, date?: string): string | null {
  if (date) return date;
  if (!description) return null;
  const match = description.match(/\b\d{4}-\d{2}-\d{2}\b/);
  return match ? match[0] : null;
}

export default function MediaSection({
  mediaItems,
  photos,
}: {
  mediaItems: MediaLinkView[];
  photos: ShowcasePhoto[];
}) {
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
            Media & Showcase
          </span>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">媒体与风采</h2>
          <p className="text-base text-[var(--text-secondary)] max-w-2xl">
            媒体报道与团队活动瞬间，了解我们在外部平台上的更多故事与日常。
          </p>
        </div>
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-[var(--accent)] font-semibold hover:gap-4 transition-all group"
        >
          查看媒体与风采
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 媒体报道 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.0 }}
          whileHover={{ y: -10, scale: 1.01 }}
          className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-white/80 backdrop-blur-sm p-6 shadow-[var(--shadow-card)]"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text)]">
            <Newspaper className="h-4 w-4 text-[var(--accent)]" />
            媒体报道
          </div>
          <div className="mt-5 space-y-3">
            {mediaItems.map((x, idx) => (
              <motion.a
                key={x.id}
                href={x.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: Math.min(idx * 0.08, 0.24) }}
                className="group flex gap-3 rounded-[var(--radius-lg)] border border-[var(--border)] bg-white p-4 hover:bg-[var(--accent-soft)]/20 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01]"
              >
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-[var(--bg-elevated)] ring-1 ring-[var(--border)]">
                  {x.thumbnail ? (
                    <Image
                      src={assetPath(x.thumbnail)}
                      alt={x.title}
                      fill
                      sizes="48px"
                      className={x.thumbnailFit === "contain" ? "object-contain p-1" : "object-cover"}
                    />
                  ) : null}
                </div>
                <div className="min-w-0">
                  {getMediaDate(x.description, x.date) ? (
                    <div className="text-[11px] font-semibold text-[var(--accent)]">
                      {getMediaDate(x.description, x.date)}
                    </div>
                  ) : null}
                  <div className="text-sm font-semibold text-[var(--text)] line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
                    {x.title}
                  </div>
                  <div className="mt-1 text-xs text-[var(--muted)] line-clamp-1">
                    {x.source ?? x.tag ?? "外部链接"} · 打开 ↗
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* 团队风采 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          whileHover={{ y: -10, scale: 1.01 }}
          className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-white/80 backdrop-blur-sm p-6 shadow-[var(--shadow-card)]"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text)]">
            <Camera className="h-4 w-4 text-[var(--accent)]" />
            团队风采
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {photos.slice(0, 6).map((p, idx) => (
              <motion.div
                key={p.src}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.25) }}
                className="relative aspect-square overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-elevated)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01]"
              >
                <Image
                  src={assetPath(p.src)}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 1024px) 33vw, 200px"
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
          <div className="mt-4 text-xs text-[var(--muted)]">
            更多活动照片与内容请见"媒体与风采"页面。
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
