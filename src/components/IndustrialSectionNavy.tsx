// src/components/IndustrialSectionNavy.tsx
// 方向 A · 仪器手册语言 —— 产业化区（首页第 03 章 · round 04 选定 A · 双幅横陈 + 1880 宽）
// 两张基地大卡左右并排：16:9 实拍大图 + 编号徽章 + 标题 + 简介 + 编号要点 + 高德位置 + 查看详情
// 链接规范：<a> 不嵌套——封面图与「查看详情」各自独立为 Link，位置链接独立 <a>
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { RevealItem } from "@/components/motion/MotionEngine";
import { toImageVariant } from "@/lib/imageVariant";
import type { IndustrialBase } from "@/data/industrialization";

export default function IndustrialSectionNavy({
  items,
}: {
  items: IndustrialBase[];
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="idz-wrap">
        <header className="section-head">
          <span className="section-head__no">03</span>
          <span className="section-head__zh">产业化</span>
          <span className="section-head__line" aria-hidden="true" />
          <span className="section-head__en">INDUSTRIALIZATION</span>
        </header>

        <div className="idz-halves">
          {items.map((d, idx) => (
            <RevealItem
              key={d.slug}
              delay={0.08 * idx}
              className="idz-card"
            >
              <Link
                href={`/industrialization/${d.slug}`}
                className="idz-card__coverlink"
                aria-label={d.titleZh}
              >
                <div className="idz-card__cover">
                  <span className="rs-no idz-no">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <Image
                    src={toImageVariant(d.cover ?? "", "main")}
                    alt={d.titleZh}
                    fill
                    sizes="(max-width: 48rem) 92vw, 44vw"
                    className="object-cover"
                  />
                </div>
              </Link>
              <div className="idz-card__body">
                <h3 className="idz-title__zh">{d.titleZh}</h3>
                {d.titleEn ? (
                  <span className="idz-title__en">{d.titleEn}</span>
                ) : null}
                {d.briefZh ? <p className="idz-brief">{d.briefZh}</p> : null}
                {d.highlightsZh?.length ? (
                  <Highlights items={d.highlightsZh} />
                ) : null}
                <div className="idz-card__foot">
                  <LocationLink d={d} />
                  <MoreLink href={`/industrialization/${d.slug}`} />
                </div>
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

/* ── 要点列表（编号式） ── */

function Highlights({ items }: { items: string[] }) {
  return (
    <ul className="idz-hl">
      {items.map((h, i) => (
        <li key={i} className="idz-hl__item">
          <b className="idz-hl__no">{String(i + 1).padStart(2, "0")}</b>
          <span className="idz-hl__text">{h}</span>
        </li>
      ))}
    </ul>
  );
}

/* ── 位置链接（独立 <a>，不嵌套） ── */

function LocationLink({ d }: { d: IndustrialBase }) {
  if (!d.locationUrl) return null;
  return (
    <a
      className="idz-loc"
      href={d.locationUrl}
      target="_blank"
      rel="noreferrer"
      title={d.locationZh}
    >
      📍 {d.locationZh ?? "地图导航"}
    </a>
  );
}

/* ── 详情链接 ── */

function MoreLink({ href }: { href: string }) {
  return (
    <Link className="rs-more" href={href}>
      查看详情
      <span aria-hidden="true"> →</span>
    </Link>
  );
}
