// src/app/publications/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

// ✅ 兼容导入：不要求 data 文件必须 default export
import * as pubsMod from "@/data/publications";
import * as patentsMod from "@/data/patents";
import * as honorsMod from "@/data/honors";

type TabKey = "papers" | "patents" | "honors";

function pickList(mod: any) {
  return (
    mod?.publications ??
    mod?.papers ??
    mod?.patents ??
    mod?.honors ??
    mod?.items ??
    mod?.default ??
    []
  );
}

function toStr(v: any) {
  return typeof v === "string" ? v : v == null ? "" : String(v);
}

function pickYear(item: any): string {
  const y = item?.year ?? item?.publishYear ?? item?.date ?? item?.time ?? "";
  const s = toStr(y);
  const m = s.match(/\b(19|20)\d{2}\b/);
  return m ? m[0] : "";
}

function pickTitle(item: any): string {
  return (
    toStr(item?.title) ||
    toStr(item?.titleEn) ||
    toStr(item?.titleZh) ||
    toStr(item?.name) ||
    "Untitled"
  );
}

function pickSubtitle(item: any): string {
  return (
    toStr(item?.venue) ||
    toStr(item?.journal) ||
    toStr(item?.conference) ||
    toStr(item?.publisher) ||
    toStr(item?.organization) ||
    toStr(item?.issuer) ||
    toStr(item?.source) ||
    ""
  );
}

function pickLink(item: any): string | undefined {
  if (item?.doi) {
    return `https://doi.org/${toStr(item.doi).replace(
      /^https?:\/\/doi\.org\//,
      ""
    )}`;
  }
  return item?.link ?? item?.url ?? item?.href ?? undefined;
}

function pickBadges(item: any): string[] {
  const out: string[] = [];
  if (item?.featured) out.push("Featured");
  if (item?.type) out.push(toStr(item.type));
  if (item?.category) out.push(toStr(item.category));
  if (item?.status) out.push(toStr(item.status));
  return out.slice(0, 3);
}

function normalize(s: string) {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

// ✅ 只在浏览器里读 URL 参数（不再用 useSearchParams，静态导出更稳）
function getTabFromUrl(): TabKey | null {
  if (typeof window === "undefined") return null;
  const t = new URLSearchParams(window.location.search).get("tab");
  if (t === "papers" || t === "patents" || t === "honors") return t;
  return null;
}

// ✅ tab 变化时，把 tab 写回 URL（不依赖 next/router）
function writeTabToUrl(tab: TabKey) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  url.searchParams.set("tab", tab);
  window.history.replaceState({}, "", url.toString());
}

export default function PublicationsPage() {
  const [tab, setTab] = useState<TabKey>("papers");
  const [q, setQ] = useState("");
  const [year, setYear] = useState<string>("all");

  const publications = useMemo(() => pickList(pubsMod) as any[], []);
  const patents = useMemo(() => pickList(patentsMod) as any[], []);
  const honors = useMemo(() => pickList(honorsMod) as any[], []);

  // ✅ 首次进入页面：如果 URL 带了 ?tab=patents / honors，就切过去
  useEffect(() => {
    const t = getTabFromUrl();
    if (t && t !== tab) setTab(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ tab 变化：同步 URL + 重置筛选（和你原逻辑一致）
  useEffect(() => {
    writeTabToUrl(tab);
    setQ("");
    setYear("all");
  }, [tab]);

  const activeList = useMemo(() => {
    if (tab === "patents") return patents;
    if (tab === "honors") return honors;
    return publications;
  }, [tab, publications, patents, honors]);

  const yearOptions = useMemo(() => {
    const ys = Array.from(new Set(activeList.map(pickYear).filter(Boolean)));
    ys.sort((a, b) => Number(b) - Number(a));
    return ys;
  }, [activeList]);

  const filtered = useMemo(() => {
    const nq = normalize(q);
    return activeList
      .filter((it) => {
        const y = pickYear(it);
        if (year !== "all" && y !== year) return false;
        if (!nq) return true;
        const hay = normalize(
          [
            pickTitle(it),
            pickSubtitle(it),
            toStr(it?.authors),
            toStr(it?.inventors),
            toStr(it?.keywords),
            toStr(it?.note),
            toStr(it?.abstract),
          ].join(" ")
        );
        return hay.includes(nq);
      })
      .sort((a, b) => {
        const fa = a?.featured ? 1 : 0;
        const fb = b?.featured ? 1 : 0;
        if (fa !== fb) return fb - fa;
        const ya = Number(pickYear(a) || 0);
        const yb = Number(pickYear(b) || 0);
        if (ya !== yb) return yb - ya;
        return pickTitle(a).localeCompare(pickTitle(b));
      });
  }, [activeList, q, year]);

  return (
    <main className="py-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          成果{" "}
          <span className="text-gray-400">
            Publications & Patents & Honors
          </span>
        </h1>
        <p className="text-sm text-gray-500">
          支持搜索、按年份筛选、Featured 置顶，以及 DOI/链接直达。
        </p>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        {[
          { key: "papers", label: "论文 Papers" },
          { key: "patents", label: "专利 Patents" },
          { key: "honors", label: "荣誉 Honors" },
        ].map((t) => {
          const active = tab === (t.key as TabKey);
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key as TabKey)}
              className={[
                "rounded-full px-5 py-2 text-sm border transition",
                active
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 hover:bg-gray-50",
              ].join(" ")}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索标题 / 作者 / 期刊 / 关键词…"
            className="w-full rounded-xl border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">年份</span>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="rounded-xl border px-3 py-2 text-sm bg-white"
          >
            <option value="all">全部</option>
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* List */}
      <div className="mt-8 space-y-4">
        {filtered.map((it, idx) => {
          const y = pickYear(it);
          const title = pickTitle(it);
          const subtitle = pickSubtitle(it);
          const link = pickLink(it);
          const badges = pickBadges(it);

          return (
            <article key={`${title}-${idx}`} className="rounded-2xl border p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  {y ? <div className="text-sm text-gray-500">{y}</div> : null}

                  <div className="mt-2 text-lg font-semibold leading-snug">
                    {link ? (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {title}
                      </a>
                    ) : (
                      title
                    )}
                  </div>

                  {subtitle ? (
                    <div className="mt-1 text-sm text-gray-600">{subtitle}</div>
                  ) : null}

                  {it?.briefZh || it?.note ? (
                    <div className="mt-2 text-sm text-gray-700">
                      {toStr(it?.briefZh || it?.note)}
                    </div>
                  ) : null}

                  {badges.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {badges.map((b) => (
                        <span
                          key={b}
                          className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {it?.doi ? (
                    <div className="mt-3 text-sm text-gray-600">
                      DOI：
                      <a
                        className="ml-1 underline underline-offset-2"
                        href={`https://doi.org/${toStr(it.doi).replace(
                          /^https?:\/\/doi\.org\//,
                          ""
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {toStr(it.doi).replace(/^https?:\/\/doi\.org\//, "")}
                      </a>
                    </div>
                  ) : null}
                </div>

                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-xl border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    打开
                  </a>
                ) : null}
              </div>
            </article>
          );
        })}

        {filtered.length === 0 ? (
          <div className="rounded-2xl border p-8 text-sm text-gray-600">
            未找到匹配内容。你可以更换关键词或切换年份/类别。
          </div>
        ) : null}
      </div>

      <div className="mt-10 flex gap-2">
        <Link
          href="/contact"
          className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white"
        >
          合作 / 加入我们
        </Link>
      </div>
    </main>
  );
}
