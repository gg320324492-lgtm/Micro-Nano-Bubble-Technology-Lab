// src/components/HomeHeroCarousel.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { assetPath } from "@/lib/assetPath";
import { toImageVariant } from "@/lib/imageVariant";

type Slide = {
  src: string;
  alt: string;
};

export default function HomeHeroCarousel() {
  const slides: Slide[] = useMemo(
    () => [
      { src: "/home/slide-1.png", alt: "Slide 1" },
      { src: "/home/slide-2.png", alt: "Slide 2" },
      { src: "/home/slide-3.png", alt: "Slide 3" },
      { src: "/home/slide-4.png", alt: "Slide 4" },
      { src: "/home/slide-5.png", alt: "Slide 5" },
      { src: "/home/slide-6.png", alt: "Slide 6" },
      { src: "/home/slide-7.png", alt: "Slide 7" },
    ],
    [],
  );

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const total = slides.length;
  const AUTO_INTERVAL = 4200;

  function circularDistance(a: number, b: number, len: number) {
    const d = Math.abs(a - b);
    return Math.min(d, len - d);
  }

  function shouldRender(i: number) {
    if (total <= 2) return true;
    return circularDistance(i, index, total) <= 1;
  }

  function go(next: number) {
    const n = (next + total) % total;
    setIndex(n);
  }

  function stopAuto() {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function startAuto() {
    if (isPaused || total <= 1) return;
    stopAuto();
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTO_INTERVAL);
  }

  useEffect(() => {
    startAuto();
    return stopAuto;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, isPaused]);

  // 点击图片区域：暂停/恢复切换
  function handleImageClick() {
    setIsPaused((prev) => !prev);
  }

  // 点击切换按钮：切换图片并暂停，阻止冒泡避免触发 handleImageClick
  function handleNavClick(e: React.MouseEvent, nextIndex: number) {
    e.stopPropagation();
    stopAuto();
    setIsPaused(true);
    go(nextIndex);
  }

  function handleTouchStart(e: React.TouchEvent<HTMLElement>) {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(e: React.TouchEvent<HTMLElement>) {
    if (touchStartXRef.current == null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const delta = endX - touchStartXRef.current;
    touchStartXRef.current = null;

    if (Math.abs(delta) < 36) return;
    stopAuto();
    setIsPaused(true);
    if (delta > 0) go(index - 1);
    else go(index + 1);
  }

  return (
    <section
      className="relative left-1/2 h-[calc(100vh-80px)] min-h-[520px] w-screen -translate-x-1/2 overflow-hidden bg-[var(--bg-surface)] cursor-pointer"
      aria-label="Home hero carousel"
      onClick={handleImageClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          {slides.map((s, i) => {
            if (!shouldRender(i)) return null;
            const active = i === index;
            if (!active) return null;

            return (
              <motion.div
                key={`${s.src}-${i}`}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={assetPath(toImageVariant(s.src, "main"))}
                  alt={s.alt}
                  fill
                  priority={i === 0}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={i === 0 ? "high" : "low"}
                  sizes="100vw"
                  className="object-contain"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/25 via-white/10 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_55%,rgba(124,58,237,0.04)_100%)]" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* 状态指示 */}
      <div className="absolute left-1/2 top-5 z-20 -translate-x-1/2 rounded-full border border-[var(--border)] bg-white/78 px-3 py-1 text-xs text-[var(--text-secondary)] backdrop-blur-xl select-none">
        {index + 1} / {total} · {isPaused ? "已暂停 (点击恢复)" : "自动播放"}
      </div>

      {/* 圆点切换按钮 */}
      {total > 1 ? (
        <div suppressHydrationWarning className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
          {slides.map((_, i) => (
            <motion.button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={(e) => handleNavClick(e, i)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`relative h-3 w-3 rounded-full border-2 transition-all ${
                i === index
                  ? "border-[var(--accent)] bg-[var(--accent)] shadow-[0_0_20px_rgba(138,43,226,0.6)]"
                  : "border-[var(--accent)]/40 bg-[var(--accent)]/20 hover:bg-[var(--accent)]/40"
              }`}
            >
              {i === index && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute inset-0 rounded-full bg-[var(--accent)]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      ) : null}

      {/* 左右箭头 */}
      {total > 1 ? (
        <>
          <motion.button
            type="button"
            aria-label="Previous slide"
            onClick={(e) => handleNavClick(e, index - 1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-6 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[var(--border)] bg-white/90 backdrop-blur-xl transition-all hover:bg-[var(--accent-soft)] hover:shadow-lg md:flex"
          >
            <span className="select-none text-2xl leading-none text-[var(--text)]">‹</span>
          </motion.button>
          <motion.button
            type="button"
            aria-label="Next slide"
            onClick={(e) => handleNavClick(e, index + 1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-6 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[var(--border)] bg-white/90 backdrop-blur-xl transition-all hover:bg-[var(--accent-soft)] hover:shadow-lg md:flex"
          >
            <span className="select-none text-2xl leading-none text-[var(--text)]">›</span>
          </motion.button>
        </>
      ) : null}

      {/* 进度条 */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-[3px] bg-black/10">
        <motion.div
          key={`${index}-${isPaused ? "pause" : "play"}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isPaused ? 0 : 1 }}
          transition={{ duration: isPaused ? 0 : AUTO_INTERVAL / 1000, ease: "linear" }}
          className="h-full origin-left bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]"
        />
      </div>
    </section>
  );
}
