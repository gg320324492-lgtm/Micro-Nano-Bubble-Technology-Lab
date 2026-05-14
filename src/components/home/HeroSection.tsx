"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import HomeHeroCarousel from "@/components/HomeHeroCarousel";
import { site } from "@/data/site";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [textDismissed, setTextDismissed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.45], [1, 1, 0]);

  const handleOverlayClick = useCallback(() => {
    if (!textDismissed) setTextDismissed(true);
  }, [textDismissed]);

  return (
    <section ref={containerRef}>
      <motion.section
        style={{ y, opacity }}
        className="relative z-30 w-screen left-1/2 -translate-x-1/2 overflow-hidden -mt-[80px] md:mt-0"
      >
        <HomeHeroCarousel />

        {/* 文字叠加层 */}
        <AnimatePresence>
          {!textDismissed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center cursor-pointer"
              onClick={handleOverlayClick}
              onTouchEnd={handleOverlayClick}
            >
              {/* 渐变遮罩 */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50 pointer-events-none" />

              {/* 文字内容 */}
              <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <h1
                    className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4"
                    style={{
                      color: "#fff",
                      WebkitTextFillColor: "#fff",
                      textShadow: "0 2px 8px rgba(0,0,0,0.6), 0 4px 20px rgba(0,0,0,0.5), 0 0 40px rgba(0,0,0,0.3)",
                    }}
                  >
                    {site.nameZh}
                  </h1>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-sm md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-8"
                  style={{
                    color: "rgba(255,255,255,0.95)",
                    textShadow: "0 2px 8px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.4)",
                  }}
                >
                  {site.taglineZh}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="flex flex-wrap items-center justify-center gap-4"
                >
                  <Link
                    href="/research"
                    className="inline-flex items-center gap-2 rounded-full bg-white/95 px-7 py-3 text-sm md:text-base font-bold text-[var(--accent)] shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:bg-white hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 transition-all backdrop-blur-sm"
                  >
                    探索研究方向
                    <span className="text-lg">→</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-7 py-3 text-sm md:text-base font-bold text-white backdrop-blur-sm hover:bg-white/15 hover:border-white transition-all"
                  >
                    加入我们
                  </Link>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                  className="mt-6 text-xs text-white/40"
                >
                  点击任意位置查看完整图片
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </section>
  );
}



