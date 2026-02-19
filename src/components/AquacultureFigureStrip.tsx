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
  textBlocks?: string[];
};

export default function AquacultureFigureStrip({
  figures,
  chartMeta,
  pages,
}: {
  figures: Figure[];
  chartMeta: ChartMeta[];
  pages: PageInfo[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {figures.map((fig) => {
          const relatedCharts = chartMeta.filter(
            (chart) => chart.source.page === fig.source.page,
          );
          const relatedPage = pages.find((p) => p.page === fig.source.page);

          return (
            <article
              key={fig.id}
              className="overflow-hidden rounded-2xl border border-[var(--border)]/80 bg-[var(--bg-card)] shadow-sm"
            >
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
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              </button>

              <div className="space-y-3 p-4">
                <div className="text-sm font-semibold text-[var(--text)]">
                  {fig.caption}
                </div>

                {relatedPage?.textBlocks?.length ? (
                  <ul className="space-y-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                    {relatedPage.textBlocks.slice(0, 2).map((txt) => (
                      <li key={`${fig.id}-${txt}`} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                        <span>{txt}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {relatedCharts.length ? (
                  <div className="flex flex-wrap gap-1.5">
                    {relatedCharts.map((chart) => (
                      <span
                        key={chart.id}
                        className="rounded-full border border-sky-200 bg-sky-50 px-2 py-1 text-[11px] text-sky-700"
                        title={`${chart.title}（${chart.unit}）`}
                      >
                        {chart.title}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
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

