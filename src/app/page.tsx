// src/app/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

import * as publicationsModule from "@/data/publications";
import * as researchModule from "@/data/research";
import * as contactModule from "@/data/contact";
import { externalLinks, sortExternalLinksByDate } from "@/data/externalLinks";
import industrialBases from "@/data/industrialization";
import people from "@/data/people";
import honors from "@/data/honors";
import patents from "@/data/patents";
import { projectSections } from "@/data/projects";
import { showcasePhotos } from "@/data/showcase";

import PiCard from "@/components/PiCard";
import HomeHeroCarousel from "@/components/HomeHeroCarousel";
import PublicImage from "@/components/PublicImage";
import { site } from "@/data/site";
import { assetPath } from "@/lib/assetPath";
import { toImageVariant } from "@/lib/imageVariant";
import { pickArray, pickObject } from "@/lib/data";

type AnyRecord = Record<string, unknown>;

function extractTitleFromCitation(citation?: string) {
  if (!citation) return "";
  const parts = citation.split(". ").map((s) => (s as string).trim()).filter(Boolean);
  if (parts.length >= 2) return (parts[1] as string).replace(/\.$/, "");
  return citation.length > 160 ? citation.slice(0, 160) + "…" : citation;
}

function getResearchTitleZh(a: AnyRecord) {
  return (a.titleZh ?? a.titleZH ?? a.title ?? a.nameZh ?? a.name ?? "") as string;
}
function getResearchTitleEn(a: AnyRecord) {
  return (a.titleEn ?? a.titleEN ?? a.subtitle ?? a.nameEn ?? a.en ?? "") as string;
}
function getResearchDescZh(a: AnyRecord) {
  return (a.descZh ?? a.descriptionZh ?? a.desc ?? a.description ?? "") as string;
}

function getPubYear(p: AnyRecord) {
  return Number(p.year ?? p.date ?? 0) || 0;
}
function getPubText(p: AnyRecord) {
  const title = (p.title ?? "").toString().trim();
  if (title) return title;
  const citation = (p.citation ?? "").toString().trim();
  if (citation) return extractTitleFromCitation(citation);
  return "";
}

function pickPersonPhoto(p: Record<string, unknown>) {
  return (
    (p.photo as string) ||
    (p.avatar as string) ||
    (p.image as string) ||
    (p.img as string) ||
    (p.photoUrl as string) ||
    (p.avatarUrl as string) ||
    (p.headshot as string) ||
    ""
  );
}

function getHomeAvatarVariant(personId: string) {
  // 赵航佳：首页固定显示证件照（原图）
  if (personId === "zhaohangjia") return undefined;
  return "thumb" as const;
}

export default function HomePage() {
  const hoverSpring = { type: "spring" as const, stiffness: 420, damping: 32, mass: 0.6 };

  const researchAreas = pickArray<AnyRecord>(researchModule, ["researchDirections", "researchAreas", "research"]);
  const publications = pickArray<AnyRecord>(publicationsModule, ["publications"]);
  const contact = pickObject<{
    email?: string;
    addressZh?: string;
    address?: string;
    websiteZh?: string;
    website?: string;
    joinZh?: string;
    coopZh?: string;
  }>(contactModule, ["contact", "contacts"]);

  const featuredPubs = [...publications]
    .sort((a, b) => getPubYear(b) - getPubYear(a))
    .slice(0, 3);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const industrialDigest = industrialBases.slice(0, 2);

  const peopleDigest = (() => {
    const roleOrder: Record<string, number> = {
      PhD: 0,
      Master: 1,
      Undergrad: 2,
      Alumni: 3,
    };

    const all = people.filter((p) =>
      ["PhD", "Master", "Undergrad", "Alumni"].includes(String(p.role))
    );

    const counts = {
      PhD: all.filter((p) => p.role === "PhD").length,
      Master: all.filter((p) => p.role === "Master").length,
      Undergrad: all.filter((p) => p.role === "Undergrad").length,
      Alumni: all.filter((p) => p.role === "Alumni").length,
      total: all.length,
    };

    // 代表成员：不展示已毕业，优先展示博士，其次年级更高的硕士，本科生最后
    const featured = all
      .filter((p) => p.role !== "Alumni")
      .slice()
      .sort((a, b) => {
        const ra = roleOrder[String(a.role)] ?? 99;
        const rb = roleOrder[String(b.role)] ?? 99;
        if (ra !== rb) return ra - rb;
        // 年级：数字越小（如 2023）优先展示
        const ca = Number(a.cohort ?? 0);
        const cb = Number(b.cohort ?? 0);
        if (ca && cb && ca !== cb) return ca - cb;
        return String(a.nameZh).localeCompare(String(b.nameZh), "zh");
      })
      .slice(0, 6);

    const tagCounts = new Map<string, number>();
    for (const p of all) {
      for (const t of p.tags ?? []) {
        tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);
      }
    }
    const topTags = Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([t]) => t);

    return { counts, featured, topTags };
  })();

  const mediaDigest = sortExternalLinksByDate(externalLinks).slice(0, 4);
  const getMediaDate = (description?: string, date?: string) => {
    if (date) return date;
    if (!description) return null;
    const match = description.match(/\b\d{4}-\d{2}-\d{2}\b/);
    return match ? match[0] : null;
  };

  const honorsDigest = honors
    .slice()
    .sort((a, b) => Number(b.year ?? 0) - Number(a.year ?? 0))
    .slice(0, 6);

  const patentsDigest = patents
    .slice()
    .sort((a, b) => Number((b as AnyRecord).year ?? 0) - Number((a as AnyRecord).year ?? 0))
    .slice(0, 4);

  const projectsDigest = (() => {
    const items: { name: string; start?: string; end?: string }[] = [];
    for (const sec of projectSections) {
      for (const it of sec.items ?? []) {
        items.push(it);
      }
    }
    return items
      .slice()
      .sort((a, b) => {
        const ya = (a.start ?? a.end ?? "").match(/\b(19|20)\d{2}\b/)?.[0] ?? "";
        const yb = (b.start ?? b.end ?? "").match(/\b(19|20)\d{2}\b/)?.[0] ?? "";
        return Number(yb || 0) - Number(ya || 0);
      })
      .slice(0, 4);
  })();

  // === 成果展示模块：统计与卡片数据整理 ===
  const totalPaperCount = publications.length;
  const totalPatentCount = patents.length;
  const totalHonorCount = honors.length;
  const totalProjectCount = projectSections.reduce(
    (sum, sec) => sum + (sec.items?.length ?? 0),
    0
  );

  type OutputKind = "paper" | "patent" | "honor" | "project";

  type OutputCard = {
    id: string;
    type: OutputKind;
    year?: number;
    title: string;
    subtitle?: string;
    meta?: string;
    status?: string;
    href: string;
  };

  const paperCards: OutputCard[] = publications.map((p) => ({
    id: String(p.id),
    type: "paper",
    year: getPubYear(p),
    title: (p.titleZh as string) || (p.title as string) || "",
    subtitle: (p.titleEn as string) || undefined,
    meta: (p.venue as string) || undefined,
    href: "/publications?tab=papers",
  }));

  const patentCards: OutputCard[] = patents.map((p) => ({
    id: p.id,
    type: "patent",
    year: p.year,
    title: p.title,
    meta: p.number,
    href: "/publications?tab=patents",
  }));

  const honorCards: OutputCard[] = honors.map((h) => ({
    id: h.id,
    type: "honor",
    year: h.year,
    title: h.titleZh ?? h.title,
    href: "/publications?tab=honors",
  }));

  const projectCards: OutputCard[] = projectSections.flatMap((sec) =>
    sec.items.map((it, idx) => {
      const matchYear =
        it.start?.match(/\b(19|20)\d{2}\b/)?.[0] ??
        it.end?.match(/\b(19|20)\d{2}\b/)?.[0];
      return {
        id: `${sec.title}-${idx}`,
        type: "project" as const,
        year: matchYear ? Number(matchYear) : undefined,
        title: it.name,
        meta: [it.start, it.end].filter(Boolean).join(" — "),
        href: "/publications?tab=projects",
      };
    })
  );

  type OutputTab = "papers" | "patents" | "honors" | "projects";
  const [activeOutputTab, setActiveOutputTab] = useState<OutputTab>("papers");
  const [avatarLoadFailed, setAvatarLoadFailed] = useState<Record<string, boolean>>({});

  const currentOutputs: OutputCard[] = (() => {
    switch (activeOutputTab) {
      case "papers":
        return paperCards.slice().sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
      case "patents":
        return patentCards.slice().sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
      case "honors":
        return honorCards.slice().sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
      case "projects":
      default:
        return projectCards.slice().sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
    }
  })();

  const maxShownOutputs = currentOutputs.slice(0, 6);

  return (
    <main ref={containerRef} className="relative">
      {/* Hero Section with Parallax - z-30 确保轮播圆点不被下方 Main Content 遮挡 */}
      <motion.section
        style={{ y, opacity }}
        className="relative z-30 w-screen left-1/2 -translate-x-1/2 overflow-hidden -mt-[80px] md:mt-0"
      >
        <HomeHeroCarousel />
        {/* 降低白色蒙层强度：仅在底部做轻微过渡 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 pointer-events-none" />
      </motion.section>

      {/* Main Content - 全新布局设计 */}
      {/* 去掉纯白背景，改为轻微渐变，避免遮挡顶部背景图 */}
      <div className="relative z-20 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-20 md:space-y-32 pt-10 md:pt-12 pb-20">
            {/* 课题组标题 + PI 介绍 - 重设计排版 */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-10 md:mb-16"
            >
              {/* 课题组简介 + 导师介绍 - 融合为一块 */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg-card)]/95 px-6 py-6 md:px-10 md:py-7"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent)] via-[var(--accent-secondary)] to-[var(--accent)]" />
                <div className="relative">
                  <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 }}
                    className="text-center text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-2 tracking-tight"
                  >
                    {site.nameZh}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-center text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-[1.8]"
                  >
                    {site.taglineZh}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="mt-2 text-center text-sm md:text-base text-[var(--muted)] max-w-2xl mx-auto leading-relaxed"
                  >
                    {site.taglineEn}
                  </motion.p>
                </div>
              </motion.div>
              <div className="-mt-2">
                <PiCard />
              </div>
            </motion.section>

            {/* 研究方向 - 统一尺寸卡片网格 */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
                    Research Areas
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold gradient-text">
                    研究方向
                  </h2>
                  <p className="text-base text-[var(--text-secondary)] max-w-2xl">
                    聚焦微纳米气泡在水环境、供水安全与农业场景中的多尺度应用。
                  </p>
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {(researchAreas as AnyRecord[]).map((a, idx) => (
                  <motion.div
                    key={(a.id as string) ?? idx}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    whileHover={{ y: -10, scale: 1.01, transition: hoverSpring }}
                    className="group h-full"
                    style={{ willChange: "transform" }}
                  >
                    <Link
                      href={`/research/${(a.slug as string) ?? ""}`}
                      className="block relative h-full overflow-hidden rounded-[var(--radius-xl)] border-2 border-[var(--border)] bg-white p-6 md:p-7 transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[var(--shadow-hover)]"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--accent-soft)] to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="relative z-10 flex h-full flex-col">
                        <h3 className="mb-2 text-xl md:text-2xl font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                          {getResearchTitleZh(a)}
                        </h3>
                        {getResearchTitleEn(a) ? (
                          <p className="mb-2 text-xs md:text-sm text-[var(--text-secondary)]">
                            {getResearchTitleEn(a)}
                          </p>
                        ) : null}
                        {getResearchDescZh(a) ? (
                          <p className="mb-4 text-xs md:text-sm leading-relaxed text-[var(--muted)] line-clamp-3">
                            {getResearchDescZh(a)}
                          </p>
                        ) : null}
                        <div className="mt-auto flex items-center text-[var(--accent)] text-sm font-semibold group-hover:gap-2 transition-all">
                          <span>了解更多</span>
                          <span className="ml-2 transition-transform group-hover:translate-x-2">→</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* 产业化缩影 */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
                    Industrialization
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold gradient-text">
                    产业化
                  </h2>
                  <p className="text-base text-[var(--text-secondary)] max-w-2xl">
                    应用验证基地与示范场景，展示监测平台入口与工程化落地内容。
                  </p>
                </div>
                <Link
                  href="/industrialization"
                  className="inline-flex items-center gap-2 text-[var(--accent)] font-semibold hover:gap-4 transition-all group"
                >
                  查看全部基地
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </Link>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {industrialDigest.map((b, idx) => (
                  <motion.div
                    key={b.slug}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(idx * 0.08, 0.2) }}
                    whileHover={{ y: -10, scale: 1.01, transition: hoverSpring }}
                    className="group rounded-[var(--radius-xl)] border border-[var(--border)] bg-white/90 overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-300"
                    style={{ willChange: "transform" }}
                  >
                    <div className="relative h-56 w-full bg-[var(--bg-elevated)]">
                      {b.cover ? (
                        <Image
                          src={assetPath(toImageVariant(b.cover, "thumb"))}
                          alt={b.titleZh}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 left-5 right-5 text-white">
                        <div className="text-lg font-semibold">{b.titleZh}</div>
                        {b.titleEn ? (
                          <div className="text-xs opacity-90">{b.titleEn}</div>
                        ) : null}
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-sm leading-relaxed text-[var(--text-secondary)] line-clamp-3">
                        {b.briefZh}
                      </p>

                      {b.highlightsZh?.length ? (
                        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[var(--text-secondary)]">
                          {b.highlightsZh.slice(0, 2).map((x) => (
                            <li key={x}>{x}</li>
                          ))}
                        </ul>
                      ) : null}

                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        <Link
                          href={`/industrialization/${encodeURIComponent(String(b.slug))}/`}
                          className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--accent-soft)] transition"
                        >
                          查看详情
                          <span className="transition-transform group-hover:translate-x-0.5">→</span>
                        </Link>
                        {b.monitorUrl ? (
                          <a
                            href={b.monitorUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] px-4 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg transition"
                          >
                            打开监测大屏
                            <span>↗</span>
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* 成果展示 */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                {/* 标题区域 + 说明 + 查看全部 */}
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div className="space-y-2 max-w-2xl">
                    <span className="text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
                      Featured Outputs
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold gradient-text">
                      各类成果展示
                    </h2>
                    <p className="text-sm md:text-base text-[var(--text-secondary)]">
                      汇集课题组近年来的代表性论文、专利、项目与荣誉成果，展示研究产出与学术转化能力。
                    </p>
                  </div>
                  <Link
                    href="/publications"
                    className="inline-flex items-center gap-2 text-[var(--accent)] font-semibold hover:gap-4 transition-all group"
                  >
                    查看全部成果
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </Link>
                </div>

                {/* 概览统计条 */}
                <div className="flex justify-center">
                  <div className="grid w-full max-w-3xl gap-3 sm:grid-cols-4">
                    {[
                      { key: "papers", label: "论文", value: totalPaperCount },
                      { key: "patents", label: "专利", value: totalPatentCount },
                      { key: "projects", label: "项目", value: totalProjectCount },
                      { key: "honors", label: "荣誉", value: totalHonorCount },
                    ].map((x) => {
                      const isActive = activeOutputTab === x.key;
                      return (
                        <button
                          key={x.key}
                          type="button"
                          onClick={() => setActiveOutputTab(x.key as OutputTab)}
                          className={`group flex items-center justify-between rounded-full px-5 py-2.5 text-sm md:text-base border transition-all ${
                            isActive
                              ? "bg-white border-[var(--accent)]/40 shadow-[var(--shadow-card)]"
                              : "bg-[var(--bg-card)]/80 border-[var(--border)]/60 hover:bg-white/80 hover:border-[var(--accent)]/30"
                          }`}
                        >
                          <span
                            className={`font-semibold transition-colors ${
                              isActive ? "text-[var(--accent)]" : "text-[var(--muted)] group-hover:text-[var(--text)]"
                            }`}
                          >
                            {x.label}
                          </span>
                          <span className="text-lg md:text-xl font-semibold text-[var(--text)] tabular-nums">
                            {x.value}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 主体内容：统一尺寸成果卡片列表 */}
                {maxShownOutputs.length ? (
                  <div className="grid gap-4 lg:grid-cols-1">
                    {maxShownOutputs.map((o, idx) => (
                      <motion.div
                        key={o.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: Math.min(idx * 0.05, 0.2) }}
                        whileHover={{ y: -10, scale: 1.01, transition: hoverSpring }}
                        className="group h-full"
                        style={{ willChange: "transform" }}
                      >
                        <Link
                          href={o.href}
                          className="flex h-full flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-[var(--radius-xl)] border border-[var(--border)] bg-white/90 px-5 py-4 shadow-[var(--shadow-card)] hover:bg-[var(--accent-soft)]/10 hover:border-[var(--accent)]/70 transition-all"
                        >
                          <div className="flex items-center gap-3 shrink-0">
                            <span
                              className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ${
                                o.type === "paper"
                                  ? "bg-violet-50 text-violet-700"
                                  : o.type === "patent"
                                  ? "bg-indigo-50 text-indigo-700"
                                  : o.type === "honor"
                                  ? "bg-pink-50 text-pink-700"
                                  : "bg-sky-50 text-sky-700"
                              }`}
                            >
                              {o.type === "paper"
                                ? "论文"
                                : o.type === "patent"
                                ? "专利"
                                : o.type === "honor"
                                ? "荣誉"
                                : "项目"}
                            </span>
                            {o.year ? (
                              <span className="text-sm text-[var(--muted)] tabular-nums">
                                {o.year}
                              </span>
                            ) : null}
                          </div>

                          <div className="min-w-0 flex-1 space-y-1">
                            <div className="text-sm md:text-base font-semibold text-[var(--text)] leading-snug line-clamp-2">
                              {o.title}
                            </div>
                            {o.subtitle ? (
                              <div className="text-xs md:text-sm text-[var(--text-secondary)] line-clamp-1">
                                {o.subtitle}
                              </div>
                            ) : null}
                            {o.meta ? (
                              <div className="text-xs text-[var(--muted)] line-clamp-1">
                                {o.meta}
                              </div>
                            ) : null}
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span className="hidden sm:inline text-xs text-[var(--muted)]">
                              点击查看
                            </span>
                            <span className="text-lg text-[var(--accent)] group-hover:translate-x-1 transition-transform">
                              →
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-[var(--radius-xl)] border border-dashed border-[var(--border)] bg-white/50 px-6 py-10 text-center text-sm text-[var(--muted)]">
                    暂无可展示的成果数据。
                  </div>
                )}
              </motion.div>
            </motion.section>

            {/* 成员缩影 */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
                    People
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold gradient-text">
                    成员
                  </h2>
                  <p className="text-base text-[var(--text-secondary)] max-w-2xl">
                    研究团队与方向分布一览，快速找到你关心的研究主题与成员。
                  </p>
                </div>
                <Link
                  href="/people"
                  className="inline-flex items-center gap-2 text-[var(--accent)] font-semibold hover:gap-4 transition-all group"
                >
                  了解成员
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </Link>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.0 }}
                  whileHover={{ y: -10, scale: 1.01 }}
                  className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-white/80 backdrop-blur-sm p-6 shadow-[var(--shadow-card)] flex flex-col gap-4"
                >
                  <div>
                    <div className="text-sm font-semibold text-[var(--text)]">团队概览</div>
                    <p className="mt-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                      团队围绕微纳米气泡在水环境、供水安全与农业场景中的交叉应用，汇聚多学科背景的博士、
                      硕士与本科生共同推进研究与工程化实践。
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-[var(--radius-md)] bg-[var(--accent-soft)]/30 p-3">
                      <div className="text-xs text-[var(--muted)]">博士生</div>
                      <div className="text-2xl font-bold text-[var(--text)]">
                        {peopleDigest.counts.PhD}
                      </div>
                    </div>
                    <div className="rounded-[var(--radius-md)] bg-[var(--accent-soft)]/30 p-3">
                      <div className="text-xs text-[var(--muted)]">硕士生</div>
                      <div className="text-2xl font-bold text-[var(--text)]">
                        {peopleDigest.counts.Master}
                      </div>
                    </div>
                    <div className="rounded-[var(--radius-md)] bg-[var(--accent-soft)]/30 p-3">
                      <div className="text-xs text-[var(--muted)]">本科生</div>
                      <div className="text-2xl font-bold text-[var(--text)]">
                        {peopleDigest.counts.Undergrad}
                      </div>
                    </div>
                    <div className="rounded-[var(--radius-md)] bg-[var(--accent-soft)]/30 p-3">
                      <div className="text-xs text-[var(--muted)]">已毕业</div>
                      <div className="text-2xl font-bold text-[var(--text)]">
                        {peopleDigest.counts.Alumni}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-[var(--muted)]">
                    总计 {peopleDigest.counts.total} 人（包含在读与已毕业成员）。
                  </div>
                  {peopleDigest.topTags.length ? (
                    <div className="mt-2">
                      <div className="text-[11px] font-medium text-[var(--muted)] mb-1.5">
                        核心研究方向标签：
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {peopleDigest.topTags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-[var(--accent-soft)]/40 px-2.5 py-1 text-[11px] text-[var(--accent)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.08 }}
                  whileHover={{ y: -10, scale: 1.01 }}
                  className="lg:col-span-2 rounded-[var(--radius-xl)] border border-[var(--border)] bg-white/80 backdrop-blur-sm p-6 md:p-7 shadow-[var(--shadow-card)]"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <div className="text-sm font-semibold text-[var(--text)]">
                        代表成员
                      </div>
                    </div>
                    <Link
                      href="/people"
                      className="text-sm font-semibold text-[var(--accent)] hover:underline underline-offset-2"
                    >
                      查看全部 →
                    </Link>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-3">
                    {peopleDigest.featured.map((p, idx) => {
                      const avatarSrc = pickPersonPhoto(p as unknown as Record<string, unknown>);

                      return (
                        <motion.div
                          key={p.id}
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: Math.min(idx * 0.08, 0.24) }}
                          style={{ willChange: "transform" }}
                        >
                          <Link
                            href="/people"
                            className="group flex flex-col items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-white px-3 py-3 text-center hover:bg-[var(--accent-soft)]/20 transition-all duration-300 sm:flex-row sm:text-left sm:px-3.5 sm:gap-3"
                          >
                            {avatarSrc && !avatarLoadFailed[p.id] ? (
                              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[var(--bg-elevated)] ring-1 ring-[var(--border)] sm:h-12 sm:w-12">
                                <PublicImage
                                  src={avatarSrc}
                                  variant={getHomeAvatarVariant(String(p.id))}
                                  alt={p.nameZh || p.nameEn || "person"}
                                  fill
                                  sizes="48px"
                                  className="object-cover"
                                  onError={() =>
                                    setAvatarLoadFailed((prev) => ({ ...prev, [p.id]: true }))
                                  }
                                />
                              </div>
                            ) : (
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bg-elevated)] text-sm font-semibold text-[var(--muted)] ring-1 ring-[var(--border)] sm:h-12 sm:w-12">
                                {(p.nameZh || p.nameEn || "?").slice(0, 1)}
                              </div>
                            )}
                            <div className="min-w-0 w-full">
                              <div className="flex flex-wrap items-center justify-center gap-1 sm:justify-start sm:gap-2">
                                <div className="font-semibold text-sm text-[var(--text)] truncate">
                                  {p.nameZh}
                                </div>
                                {p.cohort ? (
                                  <span className="text-[11px] font-semibold text-[var(--muted)] shrink-0">
                                    {p.cohort}级
                                  </span>
                                ) : null}
                              </div>
                              <div className="hidden text-xs text-[var(--text-secondary)] truncate sm:block">
                                {p.introZh}
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>

                  {peopleDigest.topTags.length ? (
                    <div className="mt-6">
                      <div className="text-xs font-medium text-[var(--muted)] mb-2">
                        热门方向标签：
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {peopleDigest.topTags.map((t) => (
                          <Link
                            key={t}
                            href="/people"
                            className="rounded-full bg-[var(--accent-soft)]/40 px-3 py-1 text-[12px] font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)]/60 transition"
                            title="进入成员页按标签筛选"
                          >
                            {t}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </motion.div>
              </div>
            </motion.section>

            {/* 媒体与风采缩影 */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
                    Media & Showcase
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold gradient-text">
                    媒体与风采
                  </h2>
                  <p className="text-base text-[var(--text-secondary)] max-w-2xl">
                    媒体报道与团队活动瞬间，了解我们在外部平台上的更多故事与日常。
                  </p>
                </div>
                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 text-[var(--accent)] font-semibold hover:gap-4 transition-all group"
                >
                  查看媒体与风采
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </Link>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.0 }}
                  whileHover={{ y: -10, scale: 1.01 }}
                  className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-white/80 backdrop-blur-sm p-6 shadow-[var(--shadow-card)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-[var(--text)]">媒体报道</div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {mediaDigest.map((x, idx) => (
                      <motion.a
                        key={x.id}
                        href={x.url}
                        target="_blank"
                        rel="noreferrer"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: Math.min(idx * 0.08, 0.24) }}
                        className="group flex gap-3 rounded-[var(--radius-lg)] border border-[var(--border)] bg-white p-4 hover:bg-[var(--accent-soft)]/20 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01]"
                      >
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-[var(--bg-elevated)] ring-1 ring-[var(--border)]">
                          {x.thumbnail ? (
                            <Image
                              src={assetPath(x.thumbnail)}
                              alt={x.title}
                              fill
                              sizes="48px"
                              className={
                                x.thumbnailFit === "contain" ? "object-contain p-1" : "object-cover"
                              }
                            />
                          ) : null}
                        </div>
                        <div className="min-w-0">
                          {getMediaDate(x.description, x.date) ? (
                            <div className="text-[11px] font-semibold text-[var(--accent)]">
                              {getMediaDate(x.description, x.date)}
                            </div>
                          ) : null}
                          <div className="text-sm font-semibold text-[var(--text)] line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
                            {x.title}
                          </div>
                          <div className="mt-1 text-xs text-[var(--muted)] line-clamp-1">
                            {x.source ?? x.tag ?? "外部链接"} · 打开 ↗
                          </div>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.08 }}
                  whileHover={{ y: -10, scale: 1.01 }}
                  className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-white/80 backdrop-blur-sm p-6 shadow-[var(--shadow-card)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-[var(--text)]">团队风采</div>
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {showcasePhotos.slice(0, 6).map((p, idx) => (
                      <motion.div
                        key={p.src}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.25) }}
                        className="relative aspect-square overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-elevated)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01]"
                      >
                        <Image
                          src={assetPath(p.src)}
                          alt={p.alt}
                          fill
                          sizes="(max-width: 1024px) 33vw, 200px"
                          className="object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-4 text-xs text-[var(--muted)]">
                    更多活动照片与内容请见“媒体与风采”页面。
                  </div>
                </motion.div>
              </div>
            </motion.section>

            {/* 联系我们 - CTA 卡片 */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-[var(--radius-xl)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 via-[var(--accent-secondary)]/5 to-transparent" />
              <div className="relative z-10 p-12 md:p-16 text-center border-2 border-[var(--border)] rounded-[var(--radius-xl)] bg-white/80 backdrop-blur-xl">
                <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">加入我们</h2>
                <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto leading-relaxed">
                  我们正在寻找对微纳米气泡技术充满热情的研究人员。欢迎加入我们的团队！
                </p>
                <div className="grid gap-6 sm:grid-cols-3 mb-8 text-sm">
                  <div>
                    <div className="text-xs text-[var(--muted)] mb-2 uppercase tracking-wider">Email</div>
                    <a href={`mailto:${contact.email ?? ""}`} className="text-[var(--accent)] font-semibold hover:underline">
                      {contact.email ?? ""}
                    </a>
                  </div>
                  <div>
                    <div className="text-xs text-[var(--muted)] mb-2 uppercase tracking-wider">Address</div>
                    <div className="text-[var(--text-secondary)]">{contact.addressZh ?? contact.address ?? ""}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[var(--muted)] mb-2 uppercase tracking-wider">Website</div>
                    <a
                      href={contact.websiteZh ?? contact.website ?? "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--accent)] font-semibold hover:underline"
                    >
                      教师主页
                    </a>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/contact"
                    className="inline-flex rounded-[var(--radius-lg)] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] px-10 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl hover:shadow-[var(--accent)]/30 transition-all"
                  >
                    立即联系
                  </Link>
                </motion.div>
              </div>
            </motion.section>

          </div>
        </div>
      </div>
    </main>
  );
}
