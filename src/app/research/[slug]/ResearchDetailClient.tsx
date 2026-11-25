"use client";

// 研究方向详情页 · 版式 E（左栏叙事：大水印章节号 + 窄图文流）已固化，宽度 96rem
// 此前的 A/B/C/D/F/G 版式与切换器已移除（round 14 选定 E × 96）
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { assetPath } from "@/lib/assetPath";
import { toImageVariant } from "@/lib/imageVariant";
import Reveal from "@/components/motion/Reveal";

export type RdpSection = { id: string; label: string; content?: string };
export type RdpImage = { src: string; alt?: string; caption?: string; focusY?: number };
export type RdpStack = {
  title: string;
  summary?: string;
  sections: RdpSection[];
  images: RdpImage[];
};
export type RdpModule = { id: string; title: string; stacks: RdpStack[] };

type Metric = { label: string; value: string };

export type ResearchDetailProps = {
  index: number;
  titleZh: string;
  titleEn: string;
  introPrimary: string;
  introSecondary: string;
  keywords: string[];
  metrics: Metric[];
  cover?: string;
  coverFocusY: number;
  modules: RdpModule[];
  video?: { src: string; poster?: string; titleZh?: string; captionZh?: string };
  gallery?: RdpImage[];
};

/* ── navy 图片卡：点击放大预览 ── */
function NavyFigure({ img }: { img: RdpImage }) {
  const [open, setOpen] = useState(false);
  const thumb = assetPath(toImageVariant(img.src, "thumb"));
  const full = assetPath(toImageVariant(img.src, "full"));
  const focusY = typeof img.focusY === "number" ? img.focusY : 45;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <figure className="rdp-fig">
        <button
          type="button"
          className="rdp-fig__btn"
          style={{ aspectRatio: "4 / 3" }}
          onClick={() => setOpen(true)}
          aria-label={img.alt || "查看大图"}
        >
          <Image
            src={thumb}
            alt={img.alt || ""}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="rdp-fig__img"
            style={{ objectPosition: `50% ${focusY}%` }}
          />
        </button>
        {img.caption ? <figcaption className="rdp-fig__cap">{img.caption}</figcaption> : null}
      </figure>

      {open ? (
        <div className="rdp-lightbox" onClick={() => setOpen(false)}>
          <div className="rdp-lightbox__panel" onClick={(e) => e.stopPropagation()}>
            <div className="rdp-lightbox__imgwrap">
              <Image src={full} alt={img.alt || ""} fill sizes="94vw" className="object-contain" />
            </div>
            {img.caption ? <div className="rdp-lightbox__cap">{img.caption}</div> : null}
            <button
              type="button"
              className="rdp-lightbox__close"
              onClick={() => setOpen(false)}
              aria-label="关闭大图"
            >
              ✕
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

function ImageGrid({ images }: { images: RdpImage[] }) {
  if (!images.length) return null;
  const odd = images.length % 2 === 1;
  return (
    <div className="rdp-figgrid">
      {images.map((img, i) => (
        <div
          key={`${img.src}-${i}`}
          className={odd && i === images.length - 1 ? "rdp-figgrid__item rdp-figgrid__item--full" : "rdp-figgrid__item"}
        >
          <NavyFigure img={img} />
        </div>
      ))}
    </div>
  );
}

function SectionList({ sections }: { sections: RdpSection[] }) {
  if (!sections.length) return null;
  return (
    <div className="rdp-sections">
      {sections.map((s, i) => (
        <Reveal key={s.id} className="rdp-section" delay={Math.min(i, 5) * 0.06}>
          <article>
            <header>
              <span className="rdp-section__no">{String(i + 1).padStart(2, "0")}</span>
              <h4 className="rdp-section__label">{s.label}</h4>
            </header>
            {s.content ? <p className="rdp-section__body">{s.content}</p> : null}
          </article>
        </Reveal>
      ))}
    </div>
  );
}

/* ── 共用 hero ── */
function Hero({
  index,
  titleZh,
  titleEn,
  introPrimary,
  introSecondary,
  keywords,
  metrics,
  cover,
  coverFocusY,
}: ResearchDetailProps) {
  return (
    <header className="rdp-hero">
      <div className="rdp-hero__top">
        <span className="rdp-kicker">RESEARCH · 研究方向 {String(index).padStart(2, "0")}</span>
        <Link href="/research" className="rdp-back">
          ← 返回研究方向
        </Link>
      </div>

      <div className="rdp-hero__grid">
        <div className="rdp-hero__text">
          <h1 className="rdp-h1">{titleZh}</h1>
          {titleEn ? <p className="rdp-hero__en">{titleEn}</p> : null}
          <p className="rdp-hero__intro">{introPrimary}</p>
          {introSecondary ? <p className="rdp-hero__intro2">{introSecondary}</p> : null}
          {keywords.length ? (
            <div className="rdp-keywords">
              {keywords.map((k) => (
                <span key={k} className="rdp-keyword">
                  {k}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {cover ? (
          <div className="rdp-hero__media">
            <div className="rdp-hero__frame">
              <Image
                src={assetPath(toImageVariant(cover, "main"))}
                alt={titleZh}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="rdp-hero__img"
                style={{ objectPosition: `50% ${coverFocusY}%` }}
              />
            </div>
          </div>
        ) : null}
      </div>

      <div className="rdp-metrics">
        {metrics.map((m, i) => (
          <Reveal key={m.label} className="rdp-metric" delay={i * 0.08}>
            <span className="rdp-metric__label">{m.label}</span>
            <span className="rdp-metric__value">{m.value}</span>
          </Reveal>
        ))}
      </div>

      <div className="rdp-headrule" />
    </header>
  );
}

/* ── 版式 E · 左侧栏叙事（大水印章节号 + 窄图文流，已固化） ── */
function LayoutE({ modules }: { modules: RdpModule[] }) {
  return (
    <div className="rdpE-list">
      {modules.map((m, i) => (
        <Reveal key={m.id} className="rdpE-module" delay={0}>
        <section>
          <aside className="rdpE-module__aside" aria-hidden="true">
            <span className="rdpE-module__bignum">{String(i + 1).padStart(2, "0")}</span>
            <span className="rdpE-module__aside-rule" />
          </aside>

          <div className="rdpE-module__main">
            <h2 className="rdpE-module__title">{m.title}</h2>

            {m.stacks.map((st, j) => {
              const hasMedia = st.images.length > 0;
              return (
                <Reveal
                  key={`${m.id}-stack-${j}`}
                  className={hasMedia ? "rdpE-stack" : "rdpE-stack rdpE-stack--textonly"}
                  delay={Math.min(j, 3) * 0.06}
                >
                  {hasMedia ? (
                    <div className="rdpE-stack__media">
                      <ImageGrid images={st.images} />
                    </div>
                  ) : null}
                  <div className="rdpE-stack__text">
                    {m.stacks.length > 1 || st.title !== m.title ? (
                      <h3 className="rdp-stack__title">{st.title}</h3>
                    ) : null}
                    {st.summary ? <p className="rdp-stack__summary">{st.summary}</p> : null}
                    <SectionList sections={st.sections} />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>
        </Reveal>
      ))}
    </div>
  );
}

/* ── 共用：视频块 ── */
function VideoBlock({
  video,
}: {
  video?: { src: string; poster?: string; titleZh?: string; captionZh?: string };
}) {
  if (!video?.src) return null;
  return (
    <figure className="rdp-video">
      <div className="rdp-video__head">{video.titleZh || "实验视频展示"}</div>
      <div className="rdp-video__body">
        <video
          controls
          playsInline
          preload="metadata"
          poster={video.poster ? assetPath(toImageVariant(video.poster, "main")) : undefined}
          className="rdp-video__el"
        >
          <source src={assetPath(video.src)} type="video/mp4" />
        </video>
      </div>
      {video.captionZh ? <figcaption className="rdp-video__cap">{video.captionZh}</figcaption> : null}
    </figure>
  );
}

/* ── 页面 ── */
export default function ResearchDetailClient(props: ResearchDetailProps) {
  return (
    <div className="theme-navy">
      <div className="rdp-page">
        <Hero {...props} />
        <LayoutE modules={props.modules} />

        {props.video?.src ? (
          <div className="rdp-extra">
            <Reveal>
              <VideoBlock video={props.video} />
            </Reveal>
          </div>
        ) : null}

        {props.gallery?.length ? (
          <Reveal>
            <section className="rdp-gallery">
              <h2 className="rdp-gallery__title">GALLERY · 研究图集</h2>
              <ImageGrid images={props.gallery} />
            </section>
          </Reveal>
        ) : null}

        <footer className="rdp-footer">
          <Link href="/research" className="rdp-footer__link">
            ← 研究方向
          </Link>
          <Link href="/" className="rdp-footer__link">
            首页 →
          </Link>
        </footer>
      </div>
    </div>
  );
}
