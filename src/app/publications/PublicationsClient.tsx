"use client";

// 成果页客户端外壳：Hero D 居中 + 4 种内容版式 × 3 种文字大小切换器
import { useEffect, useMemo, useState } from "react";
import { useDeferredValue } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import Section from "@/components/ui/Section";
import ListItem from "@/components/ui/ListItem";
import Reveal from "@/components/motion/Reveal";
import PublicImage from "@/components/PublicImage";
import assetPath from "@/lib/assetPath";
import { toImageVariant } from "@/lib/imageVariant";

import * as pubsMod from "@/data/publications";
import * as patentsMod from "@/data/patents";
import * as honorsMod from "@/data/honors";
import * as projectsMod from "@/data/projects";

import type { PublicationView, PatentView, HonorView, ProjectSectionView } from "@/types";

type TabKey = "papers" | "patents" | "honors" | "projects";
type LayoutKey = "v1" | "v2" | "v3" | "v4";
type SizeKey = "s" | "m" | "l";

// ── 条目动效（与成员页卡片一致：滚动逐个浮起） ──
const EASE = [0.22, 1, 0.36, 1] as const;

function buildEnterVariants(delay: number): Variants {
  return {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay } },
  };
}

function toStr(v: unknown): string {
  return typeof v === "string" ? v : v == null ? "" : String(v);
}

function pickYear(item: Record<string, unknown>): string {
  const y = item?.year ?? item?.publishYear ?? item?.date ?? item?.time ?? "";
  const s = toStr(y);
  const m = s.match(/\b(19|20)\d{2}\b/);
  return m ? m[0] : "";
}

function pickTitle(item: Record<string, unknown>): string {
  return (
    toStr(item?.title) ||
    toStr(item?.titleEn) ||
    toStr(item?.titleZh) ||
    toStr(item?.name) ||
    "Untitled"
  );
}

function pickSubtitle(item: Record<string, unknown>): string {
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

function pickLink(item: Record<string, unknown>): string | undefined {
  if (item?.doi)
    return `https://doi.org/${toStr(item.doi).replace(
      /^https?:\/\/doi\.org\//,
      ""
    )}`;
  return (item?.link as string) ?? (item?.url as string) ?? (item?.href as string) ?? undefined;
}

function pickBadges(item: Record<string, unknown>): string[] {
  const out: string[] = [];
  if (item?.featured) out.push("Featured");
  if (item?.type) out.push(toStr(item.type));
  if (item?.status) out.push(toStr(item.status));
  const cat = item?.category;
  if (cat === "invention") out.push("发明专利");
  else if (cat === "utility") out.push("实用新型");
  else if (cat === "software") out.push("软件著作权");
  else if (cat === "application") out.push("申请中");
  else if (cat) out.push(toStr(cat));
  return out.slice(0, 3);
}

function normalize(s: string) {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

function pickProjectSections(mod: Record<string, unknown>): ProjectSectionView[] {
  const v =
    mod?.projectSections ??
    mod?.sections ??
    mod?.projects ??
    mod?.items ??
    mod?.default ??
    [];
  return Array.isArray(v) ? (v as ProjectSectionView[]) : [];
}

function formatPeriod(p: { start?: string; end?: string }) {
  if (!p.start && !p.end) return "无";
  if (p.start && p.end) return `${p.start} 至 ${p.end}`;
  return p.start ? `${p.start} 至` : `至 ${p.end}`;
}

function getList(mod: Record<string, unknown>): Record<string, unknown>[] {
  const v = mod?.default ?? mod?.publications ?? mod?.patents ?? mod?.honors ?? mod?.items ?? [];
  return Array.isArray(v) ? (v as Record<string, unknown>[]) : [];
}

export default function PublicationsClient() {
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<TabKey>("papers");
  const [q, setQ] = useState("");
  const [year, setYear] = useState("all");
  const [layout, setLayout] = useState<LayoutKey>("v3");
  const [size, setSize] = useState<SizeKey>("m");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const reduceMotion = useReducedMotion();
  const deferredQ = useDeferredValue(q);

  const publications = useMemo(() => getList(pubsMod), []);
  const patents = useMemo(() => getList(patentsMod), []);
  const honors = useMemo(() => getList(honorsMod), []);
  const projectSections = useMemo(() => pickProjectSections(projectsMod), []);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.replaceState(null, "", url.toString());

    setQ("");
    setYear("all");
  }, [tab, ready]);

  const activeList = useMemo(() => {
    if (tab === "projects") return [];
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
    if (tab === "projects") return [];
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

  // 按年份分组（V1 时间线 / V4 折叠）
  const groupedByYear = useMemo(() => {
    const groups = new Map<string, Record<string, unknown>[]>();
    filtered.forEach((it) => {
      const y = pickYear(it) || "未知";
      if (!groups.has(y)) groups.set(y, []);
      groups.get(y)!.push(it);
    });
    return Array.from(groups.entries()).sort(([a], [b]) => b.localeCompare(a));
  }, [filtered]);

  function toggleGroup(y: string) {
    setOpenGroups((prev) => ({ ...prev, [y]: !prev[y] }));
  }

  /* 荣誉证书图（可点击放大到新标签页看大图） */
  function HonorCertImage({ it, title }: { it: Record<string, unknown>; title: string }) {
    const src = toStr(it.imageSrc);
    if (!src) return null;
    return (
      <a
        href={assetPath(toImageVariant(src, "main"))}
        target="_blank"
        rel="noopener noreferrer"
        className="pub-cert"
        aria-label="打开证书大图"
      >
        <div className="pub-cert__frame">
          <PublicImage
            src={src}
            variant="main"
            alt={toStr(it.imageAlt) || title}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            style={{ objectFit: "contain" }}
          />
        </div>
        <span className="pub-cert__hint">点击查看大图</span>
      </a>
    );
  }

  function renderItems(items: Record<string, unknown>[], compact = false) {
    const accentClass =
      tab === "papers"
        ? "before:bg-sky-500"
        : tab === "patents"
        ? "before:bg-amber-500"
        : "before:bg-emerald-500";

    return items.map((it, idx) => {
      const y = pickYear(it);
      const title = pickTitle(it);
      const subtitle = pickSubtitle(it);
      const link = pickLink(it);
      const badges = pickBadges(it);
      const hasCert = tab === "honors" && !!toStr(it.imageSrc);

      return (
        <motion.div
          key={`${title}-${idx}`}
          variants={buildEnterVariants(Math.min(idx, 7) * 0.06)}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          <ListItem
            className={[
              "relative overflow-hidden",
              "before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:content-['']",
              accentClass,
            ].join(" ")}
            year={compact ? "" : y}
            title={title}
            subtitle={subtitle}
            description={
              hasCert ? <HonorCertImage it={it} title={title} /> : null
            }
            badges={badges}
            action={
              link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[var(--navy-accent-bright)] hover:underline"
                >
                  查看原文 ↗
                </a>
              ) : null
            }
          />
        </motion.div>
      );
    });
  }

  return (
    <div className="theme-navy">
      <Section container="wide">
        {/* Hero — 左对齐仪器手册风格（与 research / industrialization 一致） */}
        <header className="rsp-hero">
          <span className="rsp-kicker">PUBLICATIONS · 成果</span>
          <h1 className="rsp-h1">论文、专利、荣誉与项目</h1>
          <p className="rsp-lede">
            支持搜索、按年份筛选、Featured 置顶，以及 DOI/链接直达。
          </p>
          <div className="rsp-headrule" />
        </header>

        {/* TAB 导航 — D 通栏（已固化；A/B/C 与切换器已移除） */}
        <div className="pub-page" data-size={size}>
          <div className="ct-tabs ct-tabs--pub" data-style="d">
            {(
              [
                ["papers", "论文", "Papers"],
                ["patents", "专利", "Patents"],
                ["honors", "荣誉", "Honors"],
                ["projects", "项目", "Projects"],
              ] as const
            ).map(([k, zh, en]) => (
              <motion.button
                key={k}
                type="button"
                onClick={() => setTab(k as TabKey)}
                className={`ct-tabs__btn ${tab === k ? "is-on" : ""}`}
                aria-pressed={tab === k}
                data-index={k}
                whileTap={reduceMotion ? {} : { scale: 0.96 }}
              >
                <span className="block">{zh}</span>
                <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-widest opacity-70">
                  {en}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Filters（搜索 + 年份） */}
          {tab !== "projects" ? (
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <input
                id="publications-search"
                name="publications-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="搜索标题 / 作者 / 期刊 / 关键词…"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:ring-2 focus:ring-[var(--accent)]/30 sm:max-w-md"
              />

              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--muted)]">年份</span>
                <select
                  id="publications-year"
                  name="publications-year"
                  aria-label="按年份筛选"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-3 py-2 text-sm text-[var(--text)]"
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
          ) : null}

          {/* 内容区 */}
          <div className="pub-content">
            {tab === "projects" ? (
              <Reveal className="space-y-8">
                {projectSections.map((sec, sIdx) => {
                  const nq = normalize(deferredQ);
                  const items = (sec.items ?? []).filter((it) =>
                    nq ? normalize(it.name).includes(nq) : true
                  );

                  if (nq && items.length === 0) return null;

                  const accentClass =
                    sIdx % 2 === 0 ? "before:bg-emerald-500" : "before:bg-violet-500";

                  return (
                    <div key={sec.title} className="space-y-4">
                      <div className="flex items-end justify-between gap-3">
                        <div className="text-base font-semibold text-[var(--text)]">
                          {sec.title}
                        </div>
                        <div className="text-sm text-[var(--muted)]">
                          共 {items.length} 项
                        </div>
                      </div>

                      <div className="space-y-4">
                        {items.map((it, i) => {
                          const period = formatPeriod({ start: it.start, end: it.end });
                          const y =
                            (it.start ?? it.end ?? "").match(/\b(19|20)\d{2}\b/)?.[0] ?? "";

                          return (
                            <ListItem
                              key={`${sec.title}-${i}`}
                              className={[
                                "relative overflow-hidden",
                                "before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:content-['']",
                                accentClass,
                              ].join(" ")}
                              year={y}
                              title={it.name}
                              subtitle={period === "无" ? "" : period}
                              description={
                                period === "无" ? (
                                  <span className="text-sm text-[var(--muted)]">时间：无</span>
                                ) : null
                              }
                              badges={[]}
                              action={null}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </Reveal>
            ) : layout === "v1" ? (
              /* V1 · 时间线 */
              <div className="pub-v1">
                {groupedByYear.map(([y, items]) => (
                  <div key={y}>
                    <div className="pub-v1__year">{y}</div>
                    <div className="pub-v1__items">{renderItems(items)}</div>
                  </div>
                ))}
              </div>
            ) : layout === "v2" ? (
              /* V2 · 卡片网格 */
              <div className="pub-v2">{renderItems(filtered)}</div>
            ) : layout === "v3" ? (
              /* V3 · 紧凑列表 */
              <div className="pub-v3">{renderItems(filtered, true)}</div>
            ) : (
              /* V4 · 分组折叠 */
              <div className="pub-v4">
                {groupedByYear.map(([y, items]) => (
                  <div key={y} className="pub-v4__group">
                    <button
                      type="button"
                      className="pub-v4__head"
                      onClick={() => toggleGroup(y)}
                      aria-expanded={openGroups[y] ?? false}
                    >
                      <span>{y}</span>
                      <span className="pub-v4__count">
                        {items.length} 项 {openGroups[y] ? "▲" : "▼"}
                      </span>
                    </button>
                    {(openGroups[y] ?? false) ? (
                      <div className="pub-v4__body">{renderItems(items)}</div>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* 切换器浮层 */}
      <div className="pub-switcher">
        <div className="pub-switcher__row">
          <span className="pub-switcher__lab">版式</span>
          <div className="pub-switcher__btns">
            {(["v1", "v2", "v3", "v4"] as const).map((v) => (
              <button
                key={v}
                type="button"
                className={`pub-switcher__btn ${layout === v ? "is-on" : ""}`}
                onClick={() => setLayout(v)}
                title={
                  v === "v1"
                    ? "时间线"
                    : v === "v2"
                    ? "卡片网格"
                    : v === "v3"
                    ? "紧凑列表"
                    : "分组折叠"
                }
              >
                {v.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="pub-switcher__row">
          <span className="pub-switcher__lab">大小</span>
          <div className="pub-switcher__btns">
            {(["s", "m", "l"] as const).map((s) => (
              <button
                key={s}
                type="button"
                className={`pub-switcher__btn ${size === s ? "is-on" : ""}`}
                onClick={() => setSize(s)}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
