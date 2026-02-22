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
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  const total = slides.length;

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

  // 自动轮播间隔（毫秒），原来是 5500ms，这里调快一些
  const AUTO_INTERVAL = 3500;

  function startAuto() {
    stopAuto();
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTO_INTERVAL);
  }

  function stopAuto() {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  useEffect(() => {
    if (total <= 1) return;
    startAuto();
    return stopAuto;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  return (
    <section
      className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden bg-[var(--bg-surface)] h-[calc(100vh-80px)] min-h-[520px]"
      aria-label="Home hero carousel"
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
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
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
                {/* 仅在底部轻微提亮，避免整张图发白 */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/35 via-white/10 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_55%,rgba(124,58,237,0.04)_100%)] pointer-events-none" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {total > 1 ? (
        <div suppressHydrationWarning className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          {slides.map((_, i) => (
            <motion.button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => { stopAuto(); go(i); }}
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

      {total > 1 ? (
        <>
          <motion.button
            type="button"
            aria-label="Previous slide"
            onClick={() => { stopAuto(); go(index - 1); }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
              className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center h-12 w-12 rounded-full bg-white/90 backdrop-blur-xl border-2 border-[var(--border)] transition-all hover:bg-[var(--accent-soft)] hover:shadow-lg z-20"
          >
            <span className="text-[var(--text)] text-2xl leading-none select-none">‹</span>
          </motion.button>
          <motion.button
            type="button"
            aria-label="Next slide"
            onClick={() => { stopAuto(); go(index + 1); }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
              className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center h-12 w-12 rounded-full bg-white/90 backdrop-blur-xl border-2 border-[var(--border)] transition-all hover:bg-[var(--accent-soft)] hover:shadow-lg z-20"
          >
            <span className="text-[var(--text)] text-2xl leading-none select-none">›</span>
          </motion.button>
        </>
      ) : null}
    </section>
  );
}
