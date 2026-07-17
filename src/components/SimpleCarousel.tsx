// src/components/SimpleCarousel.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import { assetPath } from "@/lib/assetPath";
import { toImageVariant } from "@/lib/imageVariant";

type CarouselImage = {
  src: string;
  alt?: string;
};

export default function SimpleCarousel({
  images,
  autoPlay = true,
  intervalMs = 3500,
  className = "",
}: {
  images: CarouselImage[];
  autoPlay?: boolean;
  intervalMs?: number;
  className?: string;
}) {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [progress, setProgress] = React.useState(0); // 0-100 当前帧进度
  const count = images.length;

  // 用 ref 缓存 index，避免 useEffect 因 index 变化反复重启 interval
  const indexRef = React.useRef(index);
  React.useEffect(() => {
    indexRef.current = index;
    setProgress(0);
  }, [index]);

  // 切到下一张
  const goNext = React.useCallback(() => {
    if (count === 0) return;
    setIndex((cur) => (cur + 1) % count);
  }, [count]);
  const goPrev = React.useCallback(() => {
    if (count === 0) return;
    setIndex((cur) => (cur - 1 + count) % count);
  }, [count]);
  const goTo = React.useCallback(
    (i: number) => {
      if (count === 0) return;
      setIndex(((i % count) + count) % count);
    },
    [count]
  );

  // 自动播放：独立 interval，不依赖 index（避免重建）
  React.useEffect(() => {
    if (!autoPlay || paused || count <= 1) {
      setProgress(0);
      return;
    }

    // 进度条更新：每 50ms 增加 50/intervalMs * 100%
    const progressStep = (50 / intervalMs) * 100;
    const progressTimer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        return Math.min(100, p + progressStep);
      });
    }, 50);

    // 切换 interval：到点切下一张
    const switchTimer = setInterval(() => {
      setIndex((cur) => (cur + 1) % count);
    }, intervalMs);

    return () => {
      clearInterval(progressTimer);
      clearInterval(switchTimer);
    };
  }, [autoPlay, paused, count, intervalMs]);

  // 切换时清空进度
  React.useEffect(() => {
    setProgress(0);
  }, [index]);

  if (count === 0) return null;

  return (
    <div
      className={`w-full ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-deep)]">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={assetPath(toImageVariant(images[index].src, "main"))}
            alt={images[index].alt ?? `photo-${index + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 1000px"
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "low"}
          />
        </div>

        {/* 顶部进度条（仅 autoPlay 启用时显示） */}
        {autoPlay && count > 1 ? (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-1 gap-0.5 bg-white/10">
            {images.map((_, i) => {
              const isActive = i === index;
              const isPast = i < index;
              return (
                <div
                  key={i}
                  className="relative h-full flex-1 overflow-hidden bg-transparent"
                >
                  <div
                    className={`absolute inset-0 transition-colors ${
                      isActive
                        ? "bg-[var(--accent)]/30"
                        : isPast
                          ? "bg-[var(--accent)]/70"
                          : "bg-transparent"
                    }`}
                  />
                  {isActive && !paused ? (
                    <div
                      className="absolute inset-y-0 left-0 bg-[var(--accent)] transition-[width] duration-100 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  ) : null}
                  {isActive && paused ? (
                    <div className="absolute inset-0 bg-[var(--accent)]/40" />
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : null}

        {count > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous"
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-[var(--bg-deep)]/70 px-3 py-2 text-sm text-[var(--text)] backdrop-blur transition hover:bg-[var(--bg-deep)]/90 hover:scale-110"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-[var(--bg-deep)]/70 px-3 py-2 text-sm text-[var(--text)] backdrop-blur transition hover:bg-[var(--bg-deep)]/90 hover:scale-110"
            >
              →
            </button>
          </>
        ) : null}
      </div>

      {count > 1 ? (
        <div className="mt-3 flex items-center justify-center gap-2">
          {images.map((_, i) => {
            const active = i === index;
            return (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2.5 rounded-full transition-all ${
                  active
                    ? "w-8 bg-[var(--accent)]"
                    : "w-2.5 bg-[var(--accent)]/30 hover:bg-[var(--accent)]/50"
                }`}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}