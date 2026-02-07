// src/components/HomeHeroCarousel.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

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

  function go(next: number) {
    const n = (next + total) % total;
    setIndex(n);
  }

  function startAuto() {
    stopAuto();
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 5500);
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
      className="
        relative w-screen left-1/2 -translate-x-1/2
        overflow-hidden bg-white
        h-[calc(100vh-80px)] min-h-[520px]
      "
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
      aria-label="Home hero carousel"
    >
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={s.src}
              className={[
                "absolute inset-0 transition-opacity duration-700 ease-out",
                active ? "opacity-100" : "opacity-0",
              ].join(" ")}
            >
              {/* ✅ 关键：object-contain，整张图完整显示（不会裁剪） */}
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-contain"
              />
            </div>
          );
        })}
      </div>

      {/* Dots */}
      {total > 1 ? (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => go(i)}
              className={[
                "h-2.5 w-2.5 rounded-full border border-black/30 transition",
                i === index ? "bg-black/70" : "bg-black/20 hover:bg-black/40",
              ].join(" ")}
            />
          ))}
        </div>
      ) : null}

      {/* Prev/Next（可选） */}
      {total > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(index - 1)}
            className="
              absolute left-4 top-1/2 -translate-y-1/2
              hidden md:flex items-center justify-center
              h-10 w-10 rounded-full bg-black/10 hover:bg-black/15
              border border-black/10 backdrop-blur
              transition
            "
          >
            <span className="text-black text-xl leading-none select-none">‹</span>
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(index + 1)}
            className="
              absolute right-4 top-1/2 -translate-y-1/2
              hidden md:flex items-center justify-center
              h-10 w-10 rounded-full bg-black/10 hover:bg-black/15
              border border-black/10 backdrop-blur
              transition
            "
          >
            <span className="text-black text-xl leading-none select-none">›</span>
          </button>
        </>
      ) : null}
    </section>
  );
}
