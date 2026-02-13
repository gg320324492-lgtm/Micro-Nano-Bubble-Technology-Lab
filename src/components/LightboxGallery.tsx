// src/components/LightboxGallery.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { assetPath } from "@/lib/assetPath";

export type GalleryItem = {
  src: string;
  alt?: string;
  caption?: string;
  focusY?: number; // 0-100
};

export default function LightboxGallery({
  items,
  className = "",
  tone = "core",
}: {
  items: GalleryItem[];
  className?: string;
  tone?: "core" | "applications";
}) {
  const safe = useMemo(() => (items ?? []).filter(Boolean), [items]);
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const cur = safe[idx];

  const close = () => setOpen(false);
  const prev = () => setIdx((i) => (i - 1 + safe.length) % safe.length);
  const next = () => setIdx((i) => (i + 1) % safe.length);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, safe.length]);

  if (!safe.length) return null;

  const theme =
    tone === "applications"
      ? {
          countText: "text-teal-700",
          cardBorder: "border-teal-200/80",
          cardBg: "bg-teal-50/35",
          hoverOverlay:
            "bg-gradient-to-t from-teal-900/35 via-teal-700/10 to-transparent",
        }
      : {
          countText: "text-blue-700",
          cardBorder: "border-blue-200/80",
          cardBg: "bg-blue-50/35",
          hoverOverlay:
            "bg-gradient-to-t from-blue-900/35 via-blue-700/10 to-transparent",
        };

  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold">图集</h3>
        <div className={["text-sm font-medium", theme.countText].join(" ")}>{safe.length} 张</div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {safe.map((it, i) => (
          <button
            key={`${it.src}-${i}`}
            type="button"
            className={[
              "group relative aspect-[16/10] overflow-hidden rounded-3xl border",
              theme.cardBorder,
              theme.cardBg,
            ].join(" ")}
            onClick={() => {
              setIdx(i);
              setOpen(true);
            }}
            aria-label={`open-${i}`}
          >
            <Image
              src={assetPath(it.src)}
              alt={it.alt || `gallery-${i + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              style={{
                objectPosition: `center ${typeof it.focusY === "number" ? it.focusY : 40}%`,
              }}
            />
            <div
              className={[
                "pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100",
                theme.hoverOverlay,
              ].join(" ")}
            />
          </button>
        ))}
      </div>

      {open && cur && (
        <div className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm">
          <button className="absolute inset-0" onClick={close} aria-label="close" />
          <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-5xl -translate-x-1/2 -translate-y-1/2">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black shadow-xl">
              <div className="relative aspect-[16/10]">
                <Image
                  src={assetPath(cur.src)}
                  alt={cur.alt || "preview"}
                  fill
                  sizes="92vw"
                  className="object-contain"
                />
              </div>

              {(cur.caption || safe.length > 1) && (
                <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3 text-sm text-white/80">
                  <div className="truncate">{cur.caption || cur.alt || ""}</div>
                  <div className="shrink-0">
                    {idx + 1} / {safe.length}
                  </div>
                </div>
              )}

              {safe.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prev();
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/15"
                    aria-label="prev"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      next();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/15"
                    aria-label="next"
                  >
                    →
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  close();
                }}
                className="absolute right-3 top-3 rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/15"
                aria-label="close-x"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
