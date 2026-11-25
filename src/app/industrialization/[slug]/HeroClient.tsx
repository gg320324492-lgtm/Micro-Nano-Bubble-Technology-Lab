"use client";

// 产业化详情页 · 顶部区块（round 25 固化）：V2 · 左右分栏 × 文字 XL，navy 主题
// 此前的 L/T/C/M/V3/V4 版式与切换器已移除
// 三张 hero 图（主封面 + 两张场景图）均可点击放大，灯箱带弹性开/关动效
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

import { assetPath } from "@/lib/assetPath";
import { toImageVariant } from "@/lib/imageVariant";

export type HeroStat = { label: string; value: string };
export type HeroScene = { src: string; alt: string };

export type HeroProps = {
  index: number;
  titleZh: string;
  titleEn: string;
  brief: string;
  cover?: string;
  locationZh?: string;
  locationUrl?: string;
  highlights: string[];
  stats: HeroStat[];
  scenes?: HeroScene[];
};

/* ── 弹性动效参数（开：overshoot 弹出；关：回弹收起） ── */
const SPRING = { type: "spring" as const, stiffness: 320, damping: 24, mass: 0.9 };

/* ── 灯箱（弹动开/关；portal 挂 body，避免父级 transform 把 fixed 拖走抖动） ── */
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    // 锁定背景滚动：hover 到遮罩外时不会触发页面滚动条出现/消失
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      setMounted(false);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <motion.div
      className="idp2-lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      onWheel={(e) => e.preventDefault()}
    >
      <motion.div
        className="idp2-lightbox__panel"
        initial={{ scale: 0.82, y: 26, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 14, opacity: 0 }}
        transition={SPRING}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="idp2-lightbox__imgwrap">
          <Image src={src} alt={alt} fill sizes="94vw" className="object-contain" />
        </div>
        <button
          type="button"
          className="idp2-lightbox__close"
          onClick={onClose}
          aria-label="关闭大图"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

/* ── 可点击放大的图片卡 ── */
function ZoomFigure({ src, alt, sizes, priority = false, variant = "thumb" }: { src: string; alt: string; sizes: string; priority?: boolean; variant?: "thumb" | "main" }) {
  const [open, setOpen] = useState(false);
  const inline = assetPath(toImageVariant(src, variant));
  const full = assetPath(toImageVariant(src, "full"));

  return (
    <>
      <button
        type="button"
        className="idp2-zoom"
        onClick={() => setOpen(true)}
        aria-label={`${alt}（点击放大）`}
      >
        <Image
          src={inline}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="idp2-zoom__img"
        />
        <span className="idp2-zoom__hint" aria-hidden="true">
          ⤢ 放大
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <Lightbox src={full} alt={alt} onClose={() => setOpen(false)} />
        ) : null}
      </AnimatePresence>
    </>
  );
}

/* ── 封面图（可点击放大） ── */
function Cover({ src, alt, sizes }: { src?: string; alt: string; sizes: string }) {
  if (!src) {
    return <div className="idp2-cover idp2-cover--empty" aria-hidden="true" />;
  }
  return (
    <div className="idp2-cover">
      <ZoomFigure src={src} alt={alt} sizes={sizes} priority variant="main" />
    </div>
  );
}

/* ── 文字块（标题/英文/简介/位置/要点） ── */
function TextBlock({ d }: { d: HeroProps }) {
  return (
    <>
      <span className="idp2-kicker">
        INDUSTRIALIZATION · 基地 {String(d.index).padStart(2, "0")}
      </span>
      <h1 className="idp2-h1">{d.titleZh}</h1>
      {d.titleEn ? <p className="idp2-en">{d.titleEn}</p> : null}
      <p className="idp2-brief">{d.brief}</p>
      {d.locationZh ? (
        <p className="idp2-loc">
          <span className="idp2-loc__label">位置</span>
          {d.locationUrl ? (
            <a href={d.locationUrl} target="_blank" rel="noopener noreferrer" className="idp2-loc__link">
              {d.locationZh} ↗
            </a>
          ) : (
            d.locationZh
          )}
        </p>
      ) : null}
      {d.highlights.length ? (
        <div className="idp2-keywords">
          {d.highlights.map((h) => (
            <span key={h} className="idp2-keyword">
              {h}
            </span>
          ))}
        </div>
      ) : null}
    </>
  );
}

/* ── KPI 指标卡（跟随文字列 2×2 排布） ── */
function StatCards({ stats }: { stats: HeroStat[] }) {
  if (!stats.length) return null;
  return (
    <div className="idp2-stats idp2-stats--stacked">
      {stats.map((s) => (
        <div key={s.label} className="idp2-stat">
          <span className="idp2-stat__label">{s.label}</span>
          <span className="idp2-stat__value">{s.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ── 顶部操作按钮（返回 + 地图；返回按钮用 E 版式：大描边卡 + 箭头圆圈） ── */
function Actions({ d }: { d: HeroProps }) {
  return (
    <div className="idp2-actions">
      <Link href="/industrialization" className="idp2-back" data-style="e">
        返回产业化
      </Link>
      {d.locationUrl ? (
        <a href={d.locationUrl} target="_blank" rel="noopener noreferrer" className="idp2-map">
          高德地图导航 ↗
        </a>
      ) : null}
    </div>
  );
}

/* ── V2 · 两行布局（round 26：上行文字与大图对齐，下行 4 张展示图；已固化） ── */
export default function HeroClient({ d, scenes }: { d: HeroProps; scenes?: HeroScene[] }) {
  return (
    <div className="theme-navy">
      <div className="idp2-page">
        <div className="idp2V2">
          <Actions d={d} />
          {/* 上行：左文字 ↔ 右大图，等高对齐 */}
          <div className="idp2V2-grid">
            <div className="idp2V2-text">
              <TextBlock d={d} />
              <StatCards stats={d.stats} />
            </div>
            <div className="idp2V2-media">
              {d.cover ? (
                <div className="idp2V2-media__main">
                  <Cover src={d.cover} alt={d.titleZh} sizes="(max-width: 768px) 100vw, 40vw" />
                </div>
              ) : null}
            </div>
          </div>
          {/* 下行：展示图（场景图，不与封面重复）并排 */}
          <div className="idp2V2-strip">
            {scenes?.map((s) => (
              <div key={s.src} className="idp2V2-strip__item">
                <ZoomFigure src={s.src} alt={s.alt} sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
            ))}
          </div>
          <div className="idp2-headrule" />
        </div>
      </div>
    </div>
  );
}
