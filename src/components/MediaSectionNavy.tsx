// src/components/MediaSectionNavy.tsx
// 方向 A · 仪器手册语言 —— 媒体区（首页第 06 章 · round 07 选定 B · 报道规格行 + 风采横滚 + 1720 宽）
// 报道为规格行式（日期/标题来源/缩略图/箭头），风采为横向滚动图条
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { toImageVariant } from "@/lib/imageVariant";
import type { MediaLinkView } from "@/types";
import type { ShowcasePhoto } from "@/data/showcase";

function formatDate(d?: string): string {
  if (!d) return "";
  return d.replaceAll("-", ".");
}

export default function MediaSectionNavy({
  mediaItems,
  photos,
}: {
  mediaItems: MediaLinkView[];
  photos: ShowcasePhoto[];
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="med-wrap">
        <header className="section-head">
          <span className="section-head__no">06</span>
          <span className="section-head__zh">媒体与风采</span>
          <span className="section-head__line" aria-hidden="true" />
          <span className="section-head__en">MEDIA &amp; SHOWCASE</span>
        </header>

        {/* 报道规格行 */}
        <div className="med-rows">
          {mediaItems.map((m, idx) => (
            <motion.a
              key={m.id}
              href={m.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.05 * idx, duration: 0.35 }}
              className="med-row"
            >
              <span className="med-row__date">{formatDate(m.date)}</span>
              <div className="med-row__main">
                <div className="med-row__title">{m.title}</div>
                {m.source ? <div className="med-row__src">{m.source}</div> : null}
              </div>
              {m.thumbnail ? (
                <div className="med-thumb">
                  <Image
                    src={m.thumbnail}
                    alt={m.title}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
              ) : null}
              <span className="med-row__go" aria-hidden="true">
                ↗
              </span>
            </motion.a>
          ))}
        </div>

        {/* 风采横滚 */}
        <div className="med-scroll">
          <div className="med-scroll__head">
            <span className="med-col__k">SHOWCASE</span>
            <span className="med-col__t">团队风采</span>
            <Link href="/news" className="rs-more">
              更多
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
          <div className="med-scroll__track">
            {photos.slice(0, 8).map((ph) => (
              <div key={ph.src} className="med-scroll__item">
                <Image
                  src={toImageVariant(ph.src, "thumb")}
                  alt={ph.alt}
                  fill
                  sizes="260px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
