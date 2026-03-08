"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { GalleryItem } from "./LightboxGallery";
import { assetPath } from "@/lib/assetPath";
import { toImageVariant } from "@/lib/imageVariant";

type LightboxViewerProps = {
  item: GalleryItem;
  /**
   * 图像纵横比，形如 "4/3"、"16/9"
   */
  aspect?: string;
  /**
   * 是否在视口内优先加载
   */
  priority?: boolean;
  /**
   * 针对研究详情页的卡片包裹样式
   */
  figureClassName?: string;
  /**
   * 自定义图片尺寸断点
   */
  sizes?: string;
};

/**
 * 轻量单图 Lightbox 组件：
 * - 悬停微缩放，点击放大预览
 * - 统一圆角、大卡片包裹与图注样式
 */
export default function LightboxViewer({
  item,
  aspect = "4/3",
  priority = false,
  figureClassName = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw",
}: LightboxViewerProps) {
  const [open, setOpen] = useState(false);

  const src = /\.png$/i.test(item.src)
    ? assetPath(item.src)
    : assetPath(toImageVariant(item.src, "thumb"));

  const fullSrc = /\.png$/i.test(item.src)
    ? assetPath(item.src)
    : assetPath(toImageVariant(item.src, "full"));

  const alt = item.alt || "research-figure";
  const rawCaption = item.caption || item.alt || "";

  // 统一图注格式：优先识别“图X + 说明”结构
  let captionLabel: string | null = null;
  let captionBody: string = rawCaption;
  const match = rawCaption.match(/^图\s*([0-9０-９]+)[：:、\s｜|]+(.+)$/);
  if (match) {
    captionLabel = `图${match[1]}`;
    captionBody = match[2].trim();
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <figure
        className={[
          "group flex flex-col gap-3",
          figureClassName,
        ].join(" ")}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative w-full overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--bg-elevated)] shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-deep)]"
          style={{ aspectRatio: aspect }}
          aria-label={alt}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            decoding={priority ? "sync" : "async"}
            sizes={sizes}
            className="object-contain bg-black/5 transition-transform duration-300 group-hover:scale-[1.01]"
            style={{
              objectPosition: `center ${
                typeof item.focusY === "number" ? item.focusY : 40
              }%`,
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)]/12 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </button>
        {rawCaption ? (
          <figcaption className="px-1 text-[13px] leading-relaxed text-[var(--text-secondary)]">
            {captionLabel ? (
              <span className="mr-1 font-medium text-[var(--text)]">
                {captionLabel}
                <span className="mx-[2px] align-middle text-[10px] text-[var(--muted)]">｜</span>
              </span>
            ) : null}
            <span>{captionBody}</span>
          </figcaption>
        ) : null}
      </figure>

      {open && (
        <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm">
          <button
            type="button"
            className="absolute inset-0"
            onClick={() => setOpen(false)}
            aria-label="close-lightbox"
          />
          <div className="absolute left-1/2 top-1/2 w-[94vw] max-w-5xl -translate-x-1/2 -translate-y-1/2">
            <div className="relative overflow-hidden rounded-[28px] border border-white/12 bg-black shadow-2xl">
              <div className="relative aspect-[16/10] bg-black">
                <Image
                  src={fullSrc}
                  alt={alt}
                  fill
                  loading="eager"
                  fetchPriority="high"
                  sizes="94vw"
                  className="object-contain"
                />
              </div>
              {rawCaption ? (
                <div className="border-t border-white/12 px-4 py-3 text-[13px] leading-relaxed text-white/85">
                  {captionLabel ? (
                    <span className="mr-1 font-medium text-white">
                      {captionLabel}
                      <span className="mx-[2px] align-middle text-[10px] text-white/60">｜</span>
                    </span>
                  ) : null}
                  <span>{captionBody}</span>
                </div>
              ) : null}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                }}
                className="absolute right-4 top-4 rounded-full bg-white/12 px-3 py-2 text-sm text-white hover:bg-white/18"
                aria-label="close-lightbox-x"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

