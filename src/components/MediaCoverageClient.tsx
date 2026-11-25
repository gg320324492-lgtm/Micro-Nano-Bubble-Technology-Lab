"use client";

// 媒体报道区块：D · 焦点大图 + 左右翻页（已固化；A 网格 / B 时间线 / C 紧凑与切换器已移除）
// 每页首条占满宽大图，其余 N-1 条小卡；底部左右箭头翻页，保持页面高度固定
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import type { ExternalLink } from "@/data/externalLinks";

type Props = {
  links: ExternalLink[];
  perPage?: number;
};

function getDisplayDate(item: ExternalLink): string | null {
  if (item.date) return item.date;
  if (!item.description) return null;
  const match = item.description.match(/\b\d{4}-\d{2}-\d{2}\b/);
  return match ? match[0] : null;
}

export default function MediaCoverageClient({ links, perPage = 7 }: Props) {
  const [page, setPage] = useState(0);

  if (!links?.length) return null;

  const totalPages = Math.ceil(links.length / perPage);
  const start = page * perPage;
  const items = links.slice(start, start + perPage);

  return (
    <div className="space-y-6">
      {/* 焦点内容 */}
      {renderFocus(items)}

      {/* 左右翻页器（保持页面高度固定，不向下拉长） */}
      {totalPages > 1 ? (
        <div className="news-pager">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="news-pager__btn"
            aria-label="上一页"
          >
            ← 上一页
          </button>
          <span className="news-pager__info">
            {page + 1} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="news-pager__btn"
            aria-label="下一页"
          >
            下一页 →
          </button>
        </div>
      ) : null}
    </div>
  );
}

/* ── 焦点大图（首条占满宽大图，其余 N-1 列小卡） ── */
function renderFocus(items: ExternalLink[]) {
  const [first, ...rest] = items;
  if (!first) return null;

  return (
    <div className="news-focus">
      {/* 首条大图 */}
      <motion.div
        key={first.id}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="news-focus__hero group"
      >
        <Link
          href={first.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] transition-all hover:border-[var(--accent)] hover:shadow-[var(--shadow-hover)]"
        >
          <div className="relative h-64 w-full overflow-hidden bg-[var(--bg-elevated)] md:h-80">
            {first.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={first.thumbnail}
                alt={first.title}
                className={`h-full w-full ${
                  first.thumbnailFit === "contain" ? "object-contain" : "object-cover"
                } transition-transform duration-500 group-hover:scale-105`}
              />
            ) : null}
            {/* 遮罩：底部加深并向上过渡，保证白字在亮色图片上仍有足够深衬底（避免白压白看不清） */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              {getDisplayDate(first) ? (
                <p className="text-[11px] font-semibold tracking-wide text-[var(--accent)] [text-shadow:0_1px_4px_rgba(0,0,0,0.9)]">
                  {getDisplayDate(first)}
                </p>
              ) : null}
              <h3 className="mt-1 line-clamp-2 text-xl font-bold text-white md:text-2xl [text-shadow:0_2px_8px_rgba(0,0,0,0.9)]">
                {first.title}
              </h3>
              {first.description ? (
                <p className="mt-2 line-clamp-2 text-sm text-white/80 [text-shadow:0_1px_5px_rgba(0,0,0,0.9)]">
                  {first.description}
                </p>
              ) : null}
              {first.source ? (
                <p className="mt-2 text-[11px] uppercase tracking-wide text-white/70 [text-shadow:0_1px_4px_rgba(0,0,0,0.9)]">
                  {first.source}
                </p>
              ) : null}
            </div>
          </div>
        </Link>
      </motion.div>

      {/* 其余小卡 */}
      {rest.length ? (
        <div className="news-focus__rest">
          {rest.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              className="group h-full"
            >
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] transition-all hover:border-[var(--accent)] hover:shadow-[var(--shadow-hover)]"
              >
                <div className="relative h-28 w-full overflow-hidden bg-[var(--bg-elevated)]">
                  {item.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className={`h-full w-full ${
                        item.thumbnailFit === "contain" ? "object-contain" : "object-cover"
                      } transition-transform duration-300 group-hover:scale-105`}
                    />
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col space-y-1.5 px-4 py-3">
                  {getDisplayDate(item) ? (
                    <p className="text-[11px] font-semibold tracking-wide text-[var(--accent)]">
                      {getDisplayDate(item)}
                    </p>
                  ) : null}
                  <h3 className="line-clamp-3 text-sm font-semibold leading-relaxed text-[var(--text)] group-hover:text-[var(--accent)]">
                    {item.title}
                  </h3>
                  {item.source ? (
                    <p className="mt-auto pt-1 text-[11px] uppercase tracking-wide text-[var(--muted)]">
                      {item.source}
                    </p>
                  ) : null}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
