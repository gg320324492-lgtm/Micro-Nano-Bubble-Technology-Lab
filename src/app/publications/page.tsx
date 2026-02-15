// src/app/publications/page.tsx
"use client";

import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import ListItem from "@/components/ui/ListItem";
import { buttonClassName } from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";

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
  if (item?.doi)
    return `https://doi.org/${toStr(item.doi).replace(
      /^https?:\/\/doi\.org\//,
      ""
    )}`;
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

export default function PublicationsPage() {
  const [tab, setTab] = useState<TabKey>("papers");
  const [q, setQ] = useState("");
  const deferredQ = useDeferredValue(q);
  const [year, setYear] = useState<string>("all");
  const [ready, setReady] = useState(false);

  const publications = useMemo(() => pickList(pubsMod) as any[], []);
  const patents = useMemo(() => pickList(patentsMod) as any[], []);
  const honors = useMemo(() => pickList(honorsMod) as any[], []);

  // ✅ 首次挂载：从 URL 读 tab（不用 useSearchParams，避免构建报错）
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const t = sp.get("tab") as TabKey | null;
    if (t === "papers" || t === "patents" || t === "honors") setTab(t);
    setReady(true);
  }, []);

  // ✅ tab 变化时同步 URL（便于分享 /publications?tab=honors）
  useEffect(() => {
    if (!ready) return;
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.replaceState(null, "", url.toString());

    setQ("");
    setYear("all");
  }, [tab, ready]);

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
    const nq = normalize(deferredQ);
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
  }, [activeList, deferredQ, year]);

  return (
    <Section container="wide">
      <Reveal className="flex flex-col gap-2 rounded-3xl border border-[color:var(--border)] bg-gradient-to-r from-[#eef4ff] via-[#f7faff] to-[#eefbff] p-6 sm:p-8">
        <Heading
          as="h1"
          title={
            <>
              成果{" "}
              <span className="bg-gradient-to-r from-[#1d4ed8] to-[#0ea5e9] bg-clip-text text-transparent">
                Publications & Patents & Honors
              </span>
            </>
          }
          subtitle="支持搜索、按年份筛选、Featured 置顶，以及 DOI/链接直达。"
        />
      </Reveal>

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
                "rounded-full border px-5 py-2 text-sm font-medium transition-all",
                active
                  ? "border-[#0f2d5c] bg-[#0f2d5c] text-white shadow-[0_6px_16px_rgba(15,45,92,0.22)]"
                  : "border-[#cbd9ee] bg-white text-[#1f3b66] hover:bg-[#eff6ff]",
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
            className="w-full rounded-xl border border-[#cad9ef] bg-white px-4 py-2 text-sm text-[#1f2f4a] outline-none placeholder:text-[#8aa0bf] focus:ring-2 focus:ring-[#1d4ed8]/25"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-[#516684]">年份</span>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="rounded-xl border border-[#cad9ef] bg-[#f7faff] px-3 py-2 text-sm text-[#1f3b66]"
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
          const accentClass =
            tab === "papers"
              ? "before:bg-[#1d4ed8]"
              : tab === "patents"
                ? "before:bg-[#06b6d4]"
                : "before:bg-[#f59e0b]";
          const featuredClass = it?.featured ? "bg-gradient-to-r from-[#eff6ff] to-white" : "";

          return (
            <Reveal key={`${title}-${idx}`} delay={Math.min(idx * 0.02, 0.2)}>
              <ListItem
                className={[
                  "relative overflow-hidden border-[#dbe7f7] shadow-[0_8px_24px_rgba(15,37,71,0.06)]",
                  "before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:content-['']",
                  accentClass,
                  featuredClass,
                ].join(" ")}
                year={y}
                title={
                  link ? (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0f2d5c] hover:text-[#1d4ed8] hover:underline"
                    >
                      {title}
                    </a>
                  ) : (
                    title
                  )
                }
                subtitle={subtitle}
                description={
                  <>
                    {it?.briefZh || it?.note ? <>{toStr(it?.briefZh || it?.note)}</> : null}
                    {it?.doi ? (
                      <div className="mt-3 text-sm text-[#4f6280]">
                        DOI：
                        <a
                          className="ml-1 text-[#1d4ed8] underline underline-offset-2 hover:text-[#0f2d5c]"
                          href={`https://doi.org/${toStr(it.doi).replace(/^https?:\/\/doi\.org\//, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {toStr(it.doi).replace(/^https?:\/\/doi\.org\//, "")}
                        </a>
                      </div>
                    ) : null}
                  </>
                }
                badges={badges}
                action={
                  link ? (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonClassName(
                        "secondary",
                        "rounded-xl border-[#c9daf3] bg-[#f3f8ff] px-3 py-2 text-sm text-[#1d4ed8] hover:bg-[#e8f1ff] hover:text-[#0f2d5c]"
                      )}
                    >
                      打开
                    </a>
                  ) : null
                }
              />
            </Reveal>
          );
        })}

        {filtered.length === 0 ? (
          <div className="rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--surface)]/95 p-8 text-sm text-[color:var(--muted)] shadow-[var(--shadow)]">
            未找到匹配内容。你可以更换关键词或切换年份/类别。
          </div>
        ) : null}
      </div>

      <div className="mt-10 flex gap-2">
        <Link
          href="/contact"
          className={buttonClassName(
            "primary",
            "rounded-xl border-0 bg-gradient-to-r from-[#0f2d5c] to-[#1d4ed8] px-4 py-2 text-sm text-white hover:opacity-95"
          )}
        >
          合作 / 加入我们
        </Link>
      </div>
    </Section>
  );
}
