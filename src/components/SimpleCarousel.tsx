// src/components/SimpleCarousel.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import { assetPath } from "@/lib/assetPath";

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
  const count = images.length;

  const go = React.useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex((next + count) % count);
    },
    [count]
  );

  const prev = React.useCallback(() => go(index - 1), [go, index]);
  const next = React.useCallback(() => go(index + 1), [go, index]);

  React.useEffect(() => {
    if (!autoPlay || paused || count <= 1) return;
    const t = setInterval(() => next(), intervalMs);
    return () => clearInterval(t);
  }, [autoPlay, paused, count, intervalMs, next]);

  if (count === 0) return null;

  return (
    <div
      className={`w-full ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative w-full overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={assetPath(images[index].src)}
            alt={images[index].alt ?? `photo-${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1000px"
            priority={index === 0}
          />
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 px-3 py-2 text-sm shadow hover:bg-white"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 px-3 py-2 text-sm shadow hover:bg-white"
            >
              →
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => go(i)}
              className={[
                "h-2.5 w-2.5 rounded-full transition",
                i === index ? "bg-black" : "bg-black/20 hover:bg-black/40",
              ].join(" ")}
            />
          ))}
        </div>
      )}
    </div>
  );
}
