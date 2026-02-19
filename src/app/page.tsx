// src/app/page.tsx
"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import * as publicationsModule from "@/data/publications";
import * as researchModule from "@/data/research";
import * as newsModule from "@/data/news";
import * as contactModule from "@/data/contact";

import PiCard from "@/components/PiCard";
import HomeHeroCarousel from "@/components/HomeHeroCarousel";
import { site } from "@/data/site";

type AnyRecord = Record<string, unknown>;

function pickArray(mod: unknown, keys: string[]) {
  for (const k of ["default", ...keys]) {
    const v = (mod as Record<string, unknown>)?.[k];
    if (Array.isArray(v)) return v;
  }
  return [];
}

function pickObject(mod: unknown, keys: string[]) {
  for (const k of ["default", ...keys]) {
    const v = (mod as Record<string, unknown>)?.[k];
    if (v && typeof v === "object" && !Array.isArray(v)) return v as Record<string, unknown>;
  }
  return {};
}

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

function getNewsDate(n: AnyRecord) {
  return (n.date ?? n.time ?? n.createdAt ?? "") as string;
}
function getNewsTitleZh(n: AnyRecord) {
  return (n.titleZh ?? n.title ?? n.name ?? "") as string;
}
function getNewsTitleEn(n: AnyRecord) {
  return (n.titleEn ?? n.en ?? "") as string;
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

export default function HomePage() {
  const researchAreas = pickArray(researchModule, ["researchDirections", "researchAreas", "research"]);
  const publications = pickArray(publicationsModule, ["publications"]);
  const news = pickArray(newsModule, ["news"]);
  const contact = pickObject(contactModule, ["contact", "contacts"]) as {
    email?: string;
    addressZh?: string;
    address?: string;
    websiteZh?: string;
    website?: string;
    joinZh?: string;
    coopZh?: string;
  };

  const featuredPubs = [...(publications as AnyRecord[])]
    .sort((a, b) => getPubYear(b) - getPubYear(a))
    .slice(0, 3);

  const latestNews = (news as AnyRecord[]).slice(0, 3);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <main ref={containerRef} className="relative">
      {/* Hero Section with Parallax */}
      <motion.section
        style={{ y, opacity }}
        className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden"
      >
        <HomeHeroCarousel />
        {/* 降低白色蒙层强度：仅在底部做轻微过渡 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 pointer-events-none" />
      </motion.section>

      {/* Floating Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-[35%] left-1/2 -translate-x-1/2 z-10 text-center px-4 w-full max-w-5xl"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="inline-block mb-6 px-5 py-2 rounded-full bg-white/90 backdrop-blur-xl border border-[var(--border)] text-[var(--accent)] text-sm font-semibold shadow-lg"
        >
          Tianjin University
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text drop-shadow-lg"
        >
          {site.nameZh}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xl md:text-2xl text-[var(--text-secondary)] mb-4 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          {site.taglineZh}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-base md:text-lg text-[var(--muted)] mb-10 max-w-2xl mx-auto"
        >
          {site.taglineEn}
        </motion.p>
        
      </motion.div>

      {/* Main Content - 全新布局设计 */}
      {/* 去掉纯白背景，改为轻微渐变，避免遮挡顶部背景图 */}
      <div className="relative z-20 mt-[-120px] md:mt-[-180px] bg-gradient-to-b from-white/0 via-white/70 to-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-20 md:space-y-32 pt-32 pb-20">
            {/* PI 介绍 - 大卡片设计 */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="pt-10 md:pt-14 mb-10 md:mb-16"
            >
              <div className="text-center mb-12">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-block text-xs font-bold text-[var(--accent)] tracking-widest uppercase px-4 py-2 rounded-full bg-[var(--accent-soft)] mb-4"
                >
                  Principal Investigator
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl font-bold gradient-text"
                >
                  导师介绍
                </motion.h2>
              </div>
              <PiCard />
            </motion.section>

            {/* 研究方向 - 瀑布流卡片布局 */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-block text-xs font-bold text-[var(--accent)] tracking-widest uppercase px-4 py-2 rounded-full bg-[var(--accent-soft)] mb-4"
                >
                  Research Areas
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl font-bold gradient-text mb-4"
                >
                  研究方向
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto"
                >
                  探索微纳米气泡技术的无限可能
                </motion.p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {(researchAreas as AnyRecord[]).map((a, idx) => (
                  <motion.div
                    key={(a.id as string) ?? idx}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -12, scale: 1.02 }}
                    className="group h-full"
                  >
                    <Link
                      href={`/research/${(a.slug as string) ?? ""}`}
                      className="block relative h-full rounded-[var(--radius-xl)] border-2 border-[var(--border)] bg-white p-8 transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[var(--shadow-hover)] overflow-hidden"
                    >
                      {/* 装饰性渐变背景 */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--accent-soft)] to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="relative z-10 flex h-full flex-col">
                        <h3 className="text-2xl font-bold text-[var(--text)] mb-3 group-hover:text-[var(--accent)] transition-colors">
                          {getResearchTitleZh(a)}
                        </h3>
                        {getResearchTitleEn(a) ? (
                          <p className="text-sm text-[var(--text-secondary)] mb-4">{getResearchTitleEn(a)}</p>
                        ) : null}
                        {getResearchDescZh(a) ? (
                          <p className="text-sm leading-relaxed text-[var(--muted)] line-clamp-3 mb-6">
                            {getResearchDescZh(a)}
                          </p>
                        ) : null}
                        <div className="mt-auto flex items-center text-[var(--accent)] font-semibold text-sm group-hover:gap-2 transition-all">
                          <span>了解更多</span>
                          <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* 成果展示 - 左右分栏设计 */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 gap-8 items-start"
            >
              {/* 左侧：最新成果 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs font-bold text-[var(--accent)] tracking-widest uppercase">Featured Publications</span>
                  <h2 className="text-3xl md:text-4xl font-bold gradient-text mt-2 mb-6">代表性成果</h2>
                </div>
                <div className="space-y-4">
                  {featuredPubs.map((p, idx) => (
                    <motion.div
                      key={(p.id as string) ?? idx}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative pl-8 border-l-4 border-[var(--accent-soft)] hover:border-[var(--accent)] transition-colors"
                    >
                      <div className="absolute left-[-10px] top-0 w-6 h-6 rounded-full bg-white border-4 border-[var(--accent)]" />
                      <div className="text-2xl font-bold text-[var(--accent)] mb-2">{getPubYear(p) || ""}</div>
                      <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                        {getPubText(p) || ((p.citation as string) ?? "")}
                      </p>
                    </motion.div>
                  ))}
                </div>
                <Link
                  href="/publications"
                  className="inline-flex items-center gap-2 text-[var(--accent)] font-semibold hover:gap-4 transition-all group"
                >
                  查看全部成果
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </Link>
              </motion.div>

              {/* 右侧：最新动态 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs font-bold text-[var(--accent-secondary)] tracking-widest uppercase">Latest News</span>
                  <h2 className="text-3xl md:text-4xl font-bold gradient-text mt-2 mb-6">最新动态</h2>
                </div>
                <div className="space-y-4">
                  {latestNews.map((n, idx) => (
                    <motion.div
                      key={(n.id as string) ?? idx}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ x: 8 }}
                    >
                      <Link
                        href="/news"
                        className="block rounded-[var(--radius-lg)] border-2 border-[var(--border)] bg-white p-6 hover:border-[var(--accent-secondary)] hover:shadow-lg transition-all group"
                      >
                        <div className="text-xs font-bold text-[var(--accent-secondary)] mb-3">{getNewsDate(n)}</div>
                        <h3 className="text-lg font-bold text-[var(--text)] mb-2 group-hover:text-[var(--accent-secondary)] transition-colors">
                          {getNewsTitleZh(n)}
                        </h3>
                        {getNewsTitleEn(n) ? (
                          <p className="text-sm text-[var(--muted)]">{getNewsTitleEn(n)}</p>
                        ) : null}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 text-[var(--accent-secondary)] font-semibold hover:gap-4 transition-all group"
                >
                  查看更多动态
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </Link>
              </motion.div>
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
