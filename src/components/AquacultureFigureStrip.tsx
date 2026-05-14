"use client";

import Image from "next/image";
import { useState } from "react";

import { assetPath } from "@/lib/assetPath";
import { resolveAquacultureAssetPath } from "@/content/aquaculturePdfFullData";

type Figure = {
  id: string;
  src: string;
  caption: string;
  source: { file: string; page: number };
};

type ChartMeta = {
  id: string;
  title: string;
  unit: string;
  source: { page: number };
};

type PageInfo = {
  page: number;
  textBlocks?: readonly string[];
};

export default function AquacultureFigureStrip({
  figures,
  chartMeta,
  pages,
}: {
  figures: Figure[];
  chartMeta: ChartMeta[];
  pages: readonly PageInfo[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const stripListPrefix = (text: string) =>
    text.replace(/^\s*[（(]\d+[）)]\s*/, "");

  const highlightKeyData = (text: string) => {
    const normalized = stripListPrefix(text);
    const parts = normalized.split(
      /(\d+(?:\.\d+)?%|\d+(?:\.\d+)?\s*(?:mg\/L|kg\/m³|kg\/m3|元\/斤鱼|元))/g,
    );

    return parts.map((part, idx) => {
      const isMetric =
        /^(\d+(?:\.\d+)?%|\d+(?:\.\d+)?\s*(?:mg\/L|kg\/m³|kg\/m3|元\/斤鱼|元))$/.test(
          part,
        );
      return isMetric ? (
        <strong key={`${part}-${idx}`} className="text-amber-600">
          {part}
        </strong>
      ) : (
        <span key={`${part}-${idx}`}>{part}</span>
      );
    });
  };

  const total = figures.length;
  const current =
    openIndex === null || openIndex < 0 || openIndex >= total
      ? null
      : figures[openIndex];

  const go = (next: number) => {
    if (!total) return;
    const n = ((next % total) + total) % total;
    setOpenIndex(n);
  };

  return (
    <>
      <div className="mt-2 grid gap-4 sm:grid-cols-2">
        {figures.map((fig, idx) => {
          const relatedPage = pages.find((p) => p.page === fig.source.page);
          const displayTitle =
            fig.source.page === 1
              ? "鲈鱼品质提升"
              : fig.source.page === 2
                ? "农作物增产提质"
                : "成本计算";
          const introLine = relatedPage?.textBlocks?.find(
            (txt) => txt && !txt.includes("："),
          );
          const metricLine = relatedPage?.textBlocks?.find((txt) =>
            txt.includes("提升"),
          );

          return (
            <article
              key={fig.id}
              className={[
                "group flex h-full flex-col gap-3 rounded-xl border border-amber-300/40 bg-[var(--bg-card)] p-3 shadow-sm",
                figures.length % 2 === 1 && idx === figures.length - 1 ? "sm:col-span-2" : "",
              ].join(" ")}
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600">
                  {fig.source.page + 2}
                </span>
                <h3 className="text-base font-semibold text-[var(--text)]">{displayTitle}</h3>
              </div>

              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {highlightKeyData(
                  introLine ?? metricLine ?? "点击查看完整图示与详细数据。",
                )}
              </p>

              <button
                type="button"
                className="group block w-full"
                onClick={() =>
                  setOpenIndex(figures.findIndex((f) => f.id === fig.id))
                }
                aria-label={`查看大图-${fig.id}`}
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-[var(--bg-elevated)]">
                  <Image
                    src={assetPath(resolveAquacultureAssetPath(fig.src))}
                    alt={fig.caption}
                    fill
                    loading="lazy"
                    fetchPriority="low"
                    className="object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              </button>
            </article>
          );
        })}
      </div>

      {current && (
        <div className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm">
          <button
            className="absolute inset-0"
            onClick={() => setOpenIndex(null)}
            aria-label="close"
          />
          <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-5xl -translate-x-1/2 -translate-y-1/2">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black shadow-xl">
              <div className="relative aspect-[16/9]">
                <Image
                  src={assetPath(resolveAquacultureAssetPath(current.src))}
                  alt={current.caption}
                  fill
                  loading="eager"
                  fetchPriority="high"
                  sizes="92vw"
                  className="object-contain"
                />
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3 text-sm text-white/80">
                <div className="truncate">{current.caption}</div>
                <div className="shrink-0">
                  {openIndex !== null ? openIndex + 1 : 0} / {total}
                </div>
              </div>

              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (openIndex !== null) go(openIndex - 1);
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
                      if (openIndex !== null) go(openIndex + 1);
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
                  setOpenIndex(null);
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
    </>
  );
}

