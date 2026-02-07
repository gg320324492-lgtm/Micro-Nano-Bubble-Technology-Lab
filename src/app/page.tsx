// src/app/page.tsx
import Link from "next/link";

import * as publicationsModule from "@/data/publications";
import * as researchModule from "@/data/research";
import * as newsModule from "@/data/news";
import * as contactModule from "@/data/contact";

import PiCard from "@/components/PiCard";
import HomeHeroCarousel from "@/components/HomeHeroCarousel";

type AnyRecord = Record<string, any>;

function pickArray(mod: any, keys: string[]) {
  for (const k of ["default", ...keys]) {
    const v = mod?.[k];
    if (Array.isArray(v)) return v;
  }
  return [];
}

function pickObject(mod: any, keys: string[]) {
  for (const k of ["default", ...keys]) {
    const v = mod?.[k];
    if (v && typeof v === "object" && !Array.isArray(v)) return v;
  }
  return {};
}

function extractTitleFromCitation(citation?: string) {
  if (!citation) return "";
  const parts = citation
    .split(". ")
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length >= 2) return parts[1].replace(/\.$/, "");
  return citation.length > 160 ? citation.slice(0, 160) + "…" : citation;
}

function getResearchTitleZh(a: AnyRecord) {
  return a.titleZh ?? a.titleZH ?? a.title ?? a.nameZh ?? a.name ?? "";
}
function getResearchTitleEn(a: AnyRecord) {
  return a.titleEn ?? a.titleEN ?? a.subtitle ?? a.nameEn ?? a.en ?? "";
}
function getResearchDescZh(a: AnyRecord) {
  return a.descZh ?? a.descriptionZh ?? a.desc ?? a.description ?? "";
}

function getNewsDate(n: AnyRecord) {
  return n.date ?? n.time ?? n.createdAt ?? "";
}
function getNewsTitleZh(n: AnyRecord) {
  return n.titleZh ?? n.title ?? n.name ?? "";
}
function getNewsTitleEn(n: AnyRecord) {
  return n.titleEn ?? n.en ?? "";
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
  const researchAreas = pickArray(researchModule, ["researchAreas", "research"]);
  const publications = pickArray(publicationsModule, ["publications"]);
  const news = pickArray(newsModule, ["news"]);
  const contact = pickObject(contactModule, ["contact", "contacts"]);

  const featuredPubs = [...publications]
    .sort((a: AnyRecord, b: AnyRecord) => getPubYear(b) - getPubYear(a))
    .slice(0, 5);

  const latestNews = news.slice(0, 3);

  return (
    <main className="pb-16">
      {/* ✅ 全屏轮播（不进容器） */}
      <HomeHeroCarousel />

      {/* ✅ 下面内容整体变“大变宽”：7xl 容器 + 更大间距 */}
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="py-12 space-y-16">
          {/* Hero 文案（内容不变，只放大） */}
          <section className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Micro & Nano Bubble Technology Lab
            </h1>

            <p className="text-lg md:text-xl leading-relaxed text-gray-900">
              聚焦微纳米气泡技术的机理研究、装备开发与多场景应用，面向饮用水安全、环境治理与智能化工程系统。
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Mechanisms, devices, and applications of micro/nano bubbles for drinking water safety,
              environment remediation, and intelligent engineering systems.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/contact"
                className="rounded-2xl bg-black px-6 py-3 text-base font-medium text-white hover:bg-black/90 transition"
              >
                联系我们 / 加入我们 <span className="text-gray-200">Contact & Join Us</span>
              </Link>
              <Link
                href="/research"
                className="rounded-2xl border px-6 py-3 text-base font-medium hover:bg-gray-50 transition"
              >
                研究方向 <span className="text-gray-500">Research</span>
              </Link>
            </div>
          </section>

          {/* PI Intro */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold">
              导师介绍 <span className="text-gray-500">Principal Investigator</span>
            </h2>

            {/* ✅ PiCard 本体不改，但外层给更宽、更舒服的展示 */}
            <div className="scale-[1.02] origin-top-left">
              <PiCard />
            </div>
          </section>

          {/* Research Areas */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold">
              研究方向 <span className="text-gray-500">Research Areas</span>
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {researchAreas.map((a: AnyRecord, idx: number) => (
                <div
                  key={a.id ?? idx}
                  className="rounded-2xl border p-7 shadow-sm"
                >
                  <div className="text-lg font-semibold">
                    {getResearchTitleZh(a)}
                  </div>
                  {getResearchTitleEn(a) ? (
                    <div className="text-base text-gray-500 mt-1">
                      {getResearchTitleEn(a)}
                    </div>
                  ) : null}
                  {getResearchDescZh(a) ? (
                    <div className="mt-4 text-base leading-relaxed text-gray-700">
                      {getResearchDescZh(a)}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          {/* Featured Publications */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold">
              代表性成果 <span className="text-gray-500">Featured Publications</span>
            </h2>

            <div className="rounded-2xl border p-7 shadow-sm">
              <ol className="space-y-4">
                {featuredPubs.map((p: AnyRecord, idx: number) => (
                  <li key={p.id ?? idx} className="flex gap-6">
                    <div className="w-16 shrink-0 text-base text-gray-500">
                      {getPubYear(p) || ""}
                    </div>
                    <div className="text-base leading-relaxed text-gray-800">
                      {getPubText(p) || (p.citation ?? "")}
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-6">
                <Link href="/publications" className="text-base underline">
                  查看全部成果 / <span className="text-gray-500">View all</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Latest News */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold">
              最新动态 <span className="text-gray-500">Latest News</span>
            </h2>

            <div className="grid gap-6 lg:grid-cols-3">
              {latestNews.map((n: AnyRecord, idx: number) => (
                <div key={n.id ?? idx} className="rounded-2xl border p-7 shadow-sm">
                  <div className="text-sm text-gray-500">{getNewsDate(n)}</div>
                  <div className="mt-2 text-lg font-semibold">
                    {getNewsTitleZh(n)}
                  </div>
                  {getNewsTitleEn(n) ? (
                    <div className="mt-1 text-base text-gray-500">
                      {getNewsTitleEn(n)}
                    </div>
                  ) : null}
                </div>
              ))}

              <div className="lg:col-span-3">
                <Link href="/news" className="text-base underline">
                  查看更多动态 / <span className="text-gray-500">More</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Contact summary */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold">
              联系我们与加入我们 <span className="text-gray-500">Contact & Join Us</span>
            </h2>

            <div className="rounded-2xl border p-7 text-base text-gray-700 space-y-3 shadow-sm">
              <div>邮箱 Email: {contact.email ?? ""}</div>
              <div>地址 Address: {contact.addressZh ?? contact.address ?? ""}</div>
              <div>网站 Website: {contact.websiteZh ?? contact.website ?? ""}</div>
              {contact.joinZh ? (
                <div className="pt-2 text-gray-600">{contact.joinZh}</div>
              ) : null}
              {contact.coopZh ? <div className="text-gray-600">{contact.coopZh}</div> : null}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
