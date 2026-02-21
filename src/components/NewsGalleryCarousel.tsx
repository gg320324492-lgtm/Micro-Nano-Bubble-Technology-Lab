"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  images: { src: string; alt?: string }[];
};

export default function NewsGalleryCarousel({ images }: Props) {
  const total = images.length;
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  const AUTO_INTERVAL = 4000;

  function go(next: number) {
    if (!total) return;
    const n = (next + total) % total;
    setIndex(n);
  }

  function startAuto() {
    stopAuto();
    if (total <= 1) return;
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
    startAuto();
    return stopAuto;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  if (!total) {
    return (
      <div className="flex h-full w-full items-center justify-center text-[var(--muted)]">
        暂无图片
      </div>
    );
  }

  const hasMultiple = total > 1;

  return (
    <section className="relative h-full w-full overflow-hidden rounded-[var(--radius-2xl)] bg-[var(--bg-elevated)] shadow-[0_18px_45px_rgba(15,23,42,0.18)]">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          {images.map((img, i) =>
            i === index ? (
              <motion.div
                key={`${img.src}-${i}`}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_30%,rgba(148,163,184,0.26)_0,transparent_55%)]"
              >
                <div className="relative h-full w-full flex items-center justify-center bg-[var(--bg-elevated)]">
                  <img
                    src={img.src}
                    alt={img.alt ?? ""}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {hasMultiple ? (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
          {images.map((_, i) => (
            <motion.button
              key={i}
              type="button"
              aria-label={`查看第 ${i + 1} 张照片`}
              onClick={() => {
                stopAuto();
                go(i);
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`relative h-2.5 w-2.5 rounded-full border-2 transition-all ${
                i === index
                  ? "border-[var(--accent)] bg-[var(--accent)] shadow-[0_0_12px_rgba(138,43,226,0.6)]"
                  : "border-[var(--accent)]/40 bg-[var(--accent)]/20 hover:bg-[var(--accent)]/40"
              }`}
            />
          ))}
        </div>
      ) : null}

      {hasMultiple ? (
        <>
          <motion.button
            type="button"
            aria-label="上一张照片"
            onClick={() => {
              stopAuto();
              go(index - 1);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center h-10 w-10 rounded-full bg-white/90 backdrop-blur-xl border border-[var(--border)] text-[var(--text)] text-xl shadow-sm hover:bg-[var(--accent-soft)] hover:shadow-lg z-20"
          >
            <span className="leading-none select-none">‹</span>
          </motion.button>
          <motion.button
            type="button"
            aria-label="下一张照片"
            onClick={() => {
              stopAuto();
              go(index + 1);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center h-10 w-10 rounded-full bg-white/90 backdrop-blur-xl border border-[var(--border)] text-[var(--text)] text-xl shadow-sm hover:bg-[var(--accent-soft)] hover:shadow-lg z-20"
          >
            <span className="leading-none select-none">›</span>
          </motion.button>
        </>
      ) : null}
    </section>
  );
}

