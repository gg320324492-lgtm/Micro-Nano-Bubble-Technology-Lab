"use client";

// 产业化详情页 · 中下部（round 31 固化）：F1 图文一体卡 + 基地介绍/成果展示 两个大 TAB
// 此前的 F2 交替 / F3 侧目录 / F4 双列+TAB 与切换器已移除
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

import { assetPath } from "@/lib/assetPath";
import { toImageVariant } from "@/lib/imageVariant";

export type BodySection = { title: string; body: string; bullets: string[] };
export type BodyFigure = { src: string; alt: string; title?: string; caption?: string };
export type GalleryTopic = { title: string; body?: string; images: BodyFigure[] };

export type BodyProps = {
  sections: BodySection[];
  figures?: BodyFigure[];
  gallery?: BodyFigure[];
  galleryTopics?: GalleryTopic[];
  techRouteLabel?: string;
};

/* ── 进入动效：左右交替（偶数行从左、奇数行从右滑入） ── */
function animVariant(index: number) {
  const dir = index % 2 === 0 ? -1 : 1;
  return { initial: { opacity: 0, x: 56 * dir }, animate: { opacity: 1, x: 0 } };
}

const SPRING = { type: "spring" as const, stiffness: 320, damping: 24, mass: 0.9 };

/* ── 图片灯箱（portal 挂 body，避免父级 transform 把 fixed 拖走抖动） ── */
function Lightbox({ src, alt, caption, onClose }: { src: string; alt: string; caption?: string; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
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
        {caption ? <div className="idp2-lightbox__cap">{caption}</div> : null}
        <button type="button" className="idp2-lightbox__close" onClick={onClose} aria-label="关闭大图">
          ✕
        </button>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

/* ── 可点击放大的图片卡 ── */
function ZoomFigure({
  src,
  alt,
  caption,
  sizes,
  fit = "cover",
  wide = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  sizes: string;
  fit?: "cover" | "contain";
  wide?: boolean;
}) {
  const [open, setOpen] = useState(false);
  // wide 占满整行（>1000px）用 main，否则小尺寸用 thumb；Lightbox 一律 full
  const inline = assetPath(toImageVariant(src, wide ? "main" : "thumb"));
  const full = assetPath(toImageVariant(src, "full"));

  return (
    <>
      <figure className="idp2-fig">
        <button
          type="button"
          className={wide ? "idp2-fig__btn idp2-fig__btn--wide" : "idp2-fig__btn"}
          onClick={() => setOpen(true)}
          aria-label={`${alt}（点击放大）`}
        >
          <Image
            src={inline}
            alt={alt}
            fill
            sizes={sizes}
            className={fit === "contain" ? "idp2-fig__img idp2-fig__img--contain" : "idp2-fig__img"}
          />
          <span className="idp2-zoom__hint" aria-hidden="true">⤢ 放大</span>
        </button>
        {caption ? <figcaption className="idp2-fig__cap">{caption}</figcaption> : null}
      </figure>

      <AnimatePresence>
        {open ? <Lightbox src={full} alt={alt} caption={caption} onClose={() => setOpen(false)} /> : null}
      </AnimatePresence>
    </>
  );
}

/* ── 章节文字（编号 + 标题 + 正文 + 要点） ── */
function SectionText({ s, no }: { s: BodySection; no: string }) {
  return (
    <>
      <header className="idp2bT-card__head">
        <span className="idp2bT-no">{no}</span>
        <h2 className="idp2bT-title">{s.title}</h2>
      </header>
      <p className="idp2-sec__body">{s.body}</p>
      {s.bullets.length ? (
        <ul className="idp2-sec__bullets">
          {s.bullets.map((b) => (
            <li key={b} className="idp2-sec__bullet">
              {b}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

/* ── 成果展示横条 ── */
function FiguresInline({ d }: { d: BodyProps }) {
  if (!d.figures?.length) return null;
  const n = d.figures.length;
  return (
    <div className="idp2b-figures">
      <h2 className="idp2b-blocktitle">{d.techRouteLabel ?? "成果展示"}</h2>
      <div className="idp2bT-figcards">
        {d.figures.map((f, i) => {
          const v = animVariant(i);
          return (
            <motion.section
              key={f.src}
              className={`idp2bT-card idp2bT-card--fig ${n % 2 === 1 && i === n - 1 ? "idp2bT-card--full" : ""}`}
              initial={v.initial}
              whileInView={v.animate}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.9, delay: (i % 2) * 0.08 }}
            >
              <header className="idp2bT-card__head">
                <span className="idp2bT-no">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="idp2bT-title">{f.title ?? f.alt}</h3>
                  {f.caption ? <p className="idp2bT-body">{f.caption}</p> : null}
                </div>
              </header>
              <ZoomFigure src={f.src} alt={f.alt} sizes="(max-width: 768px) 100vw, 50vw" fit="contain" wide />
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}

/* ── 平铺图集（无主题时回退） ── */
function FlatGalleryBlock({ d }: { d: BodyProps }) {
  if (!d.gallery?.length) return null;
  return (
    <div className="idp2b-figures">
      <h2 className="idp2b-blocktitle">基地实拍</h2>
      <div className="idp2b-figgrid">
        {d.gallery.map((f) => (
          <ZoomFigure key={f.src} src={f.src} alt={f.alt} caption={f.caption} sizes="(max-width: 768px) 100vw, 33vw" />
        ))}
      </div>
    </div>
  );
}

/* ── F1 · 图文一体卡：每个章节下方直接嵌对应图组 ── */
function LayoutF1({ d }: { d: BodyProps }) {
  const topics = d.galleryTopics ?? [];
  const total = Math.max(d.sections.length, topics.length);
  return (
    <div className="idp2bFuse">
      {Array.from({ length: total }, (_, i) => {
        const s = d.sections[i];
        const t = topics[i];
        if (!s && !t) return null;
        const v = animVariant(i);
        const no = String(i + 1).padStart(2, "0");
        return (
          <motion.section
            key={s?.title ?? t!.title}
            className="idp2bFuse-row"
            initial={v.initial}
            whileInView={v.animate}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.9, delay: (i % 2) * 0.1 }}
          >
            <div className="idp2bFuse-grid">
              {s ? (
                <div className="idp2bFuse-text">
                  <SectionText s={s} no={no} />
                </div>
              ) : (
                <div className="idp2bFuse-text">
                  <header className="idp2bT-card__head">
                    <span className="idp2bT-no">{no}</span>
                    <h2 className="idp2bT-title">{t!.title}</h2>
                  </header>
                  {t!.body ? <p className="idp2-sec__body">{t!.body}</p> : null}
                </div>
              )}
              {t ? (
                <div className="idp2bFuse-media">
                  <div className="idp2bFuse-imgs">
                    {t.images.map((f) => (
                      <ZoomFigure key={f.src} src={f.src} alt={f.alt} caption={f.caption} sizes="(max-width: 768px) 50vw, 25vw" />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </motion.section>
        );
      })}
    </div>
  );
}

/* ── 导出：中下部区块（F1 固化 + 基地介绍/成果展示 TAB，左右交替进入动效） ── */
export default function BodyClient(props: BodyProps) {
  const hasTopics = Boolean(props.galleryTopics?.length);
  const hasFigures = Boolean(props.figures?.length);
  const [tab, setTab] = useState<"intro" | "figures">("intro");

  return (
    <div className="theme-navy idp2b-fs-xl">
      <div className="idp2b-page">
        {hasFigures ? (
          <div className="idp2b-tabs">
            <div className="idp2b-tabs__bar" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={tab === "intro"}
                className={`idp2b-tabs__btn ${tab === "intro" ? "is-on" : ""}`}
                onClick={() => setTab("intro")}
              >
                基地介绍
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "figures"}
                className={`idp2b-tabs__btn ${tab === "figures" ? "is-on" : ""}`}
                onClick={() => setTab("figures")}
              >
                {props.techRouteLabel ?? "成果展示"}
              </button>
            </div>
          </div>
        ) : null}

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            {tab === "intro" ? (
              hasTopics ? (
                <LayoutF1 d={props} />
              ) : (
                <FlatGalleryBlock d={props} />
              )
            ) : (
              <FiguresInline d={props} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
