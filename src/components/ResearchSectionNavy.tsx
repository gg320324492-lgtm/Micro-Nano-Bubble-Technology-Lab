// src/components/ResearchSectionNavy.tsx
// 方向 A · 仪器手册语言 —— 研究方向区（首页第 02 章 · round 03 选定 C · 交错拼贴 + 1880 宽）
// 2×2 交错拼贴：图左文右 / 文左图右交替，大图展示
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { RevealItem } from "@/components/motion/MotionEngine";
import { toImageVariant } from "@/lib/imageVariant";
import type { ResearchDirection } from "@/data/research";

export default function ResearchSectionNavy({
  items,
}: {
  items: ResearchDirection[];
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="rs-wrap">
        <header className="section-head">
          <span className="section-head__no">02</span>
          <span className="section-head__zh">研究方向</span>
          <span className="section-head__line" aria-hidden="true" />
          <span className="section-head__en">RESEARCH AREAS</span>
        </header>

        <div className="rs-collage">
          {items.map((d, idx) => (
            <RevealItem
              key={d.slug}
              delay={0.08 * idx}
              className={`rs-cell ${idx % 2 === 1 ? "rs-cell--flip" : ""}`}
            >
              <Link href={`/research/${d.slug}`} className="rs-cell__link">
                <div className="rs-cover">
                  <Image
                    src={toImageVariant(d.cover ?? "", "main")}
                    alt={d.titleZh}
                    fill
                    sizes="(max-width: 48rem) 92vw, 44vw"
                    className="object-cover"
                  />
                </div>
                <div className="rs-cell__body">
                  <div className="rs-cell__no">
                    <span className="rs-no">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="rs-cell__inner">
                    <div className="rs-title">
                      <h3 className="rs-title__zh">{d.titleZh}</h3>
                      {d.titleEn ? (
                        <span className="rs-title__en">{d.titleEn}</span>
                      ) : null}
                    </div>
                    {d.briefZh ? <p className="rs-brief">{d.briefZh}</p> : null}
                    {d.keywords?.length ? (
                      <div className="rs-tags">
                        {d.keywords.slice(0, 3).map((k) => (
                          <span key={k} className="rs-tag">
                            {k}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <span className="rs-more">
                      查看详情
                      <span aria-hidden="true"> →</span>
                    </span>
                  </div>
                </div>
              </Link>
            </RevealItem>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
