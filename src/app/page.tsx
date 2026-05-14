// src/app/page.tsx
"use client";

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
import { pickArray, pickObject } from "@/lib/data";

import HeroSection from "@/components/home/HeroSection";
import LabIntroSection from "@/components/home/LabIntroSection";
import ResearchSection from "@/components/home/ResearchSection";
import IndustrialSection from "@/components/home/IndustrialSection";
import OutputsSection from "@/components/home/OutputsSection";
import PeopleSection from "@/components/home/PeopleSection";
import MediaSection from "@/components/home/MediaSection";
import ContactCTA from "@/components/home/ContactCTA";

import type {
  ResearchDirectionView,
  PublicationView,
  ContactView,
  OutputCard,
  OutputTab,
  PersonView,
  MediaLinkView,
} from "@/types";

// ==================== 数据准备工具函数 ====================

function getPubYear(p: PublicationView): number {
  return Number(p.year ?? p.date ?? 0) || 0;
}

function buildPeopleDigest(allPeople: PersonView[]) {
  const roleOrder: Record<string, number> = {
    PhD: 0, Master: 1, Undergrad: 2, Alumni: 3,
  };

  const all = allPeople.filter((p) =>
    ["PhD", "Master", "Undergrad", "Alumni"].includes(String(p.role))
  );

  const counts = {
    PhD: all.filter((p) => p.role === "PhD").length,
    Master: all.filter((p) => p.role === "Master").length,
    Undergrad: all.filter((p) => p.role === "Undergrad").length,
    Alumni: all.filter((p) => p.role === "Alumni").length,
    total: all.length,
  };

  const featured = all
    .filter((p) => p.role !== "Alumni")
    .slice()
    .sort((a, b) => {
      const ra = roleOrder[String(a.role)] ?? 99;
      const rb = roleOrder[String(b.role)] ?? 99;
      if (ra !== rb) return ra - rb;
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
}

function buildOutputCards(
  pubs: PublicationView[],
  pats: typeof patents,
  hons: typeof honors,
  projSecs: typeof projectSections
): Record<OutputTab, OutputCard[]> {
  const paperCards: OutputCard[] = pubs.map((p) => ({
    id: String(p.id),
    type: "paper",
    year: getPubYear(p),
    title: (p.titleZh as string) || (p.title as string) || "",
    subtitle: (p.titleEn as string) || undefined,
    meta: (p.venue as string) || undefined,
    href: "/publications?tab=papers",
  }));

  const patentCards: OutputCard[] = pats.map((p) => ({
    id: p.id,
    type: "patent",
    year: p.year,
    title: p.title,
    meta: p.number,
    href: "/publications?tab=patents",
  }));

  const honorCards: OutputCard[] = hons.map((h) => ({
    id: h.id,
    type: "honor",
    year: h.year,
    title: h.titleZh ?? h.title,
    href: "/publications?tab=honors",
  }));

  const projectCards: OutputCard[] = projSecs.flatMap((sec) =>
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

  const sortByYear = (cards: OutputCard[]) =>
    cards.slice().sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

  return {
    papers: sortByYear(paperCards),
    patents: sortByYear(patentCards),
    honors: sortByYear(honorCards),
    projects: sortByYear(projectCards),
  };
}

// ==================== 首页组件 ====================

export default function HomePage() {
  // 数据加载
  const researchAreas = pickArray<ResearchDirectionView>(researchModule, ["researchDirections", "researchAreas", "research"]);
  const publications = pickArray<PublicationView>(publicationsModule, ["publications"]);
  const contact = pickObject<ContactView>(contactModule, ["contact", "contacts"]);
  const industrialDigest = industrialBases.slice(0, 2);
  const mediaDigest = sortExternalLinksByDate(externalLinks as MediaLinkView[]).slice(0, 4);

  // 派生数据
  const peopleDigest = buildPeopleDigest(people as PersonView[]);
  const allCards = buildOutputCards(publications, patents, honors, projectSections);

  const outputStats = [
    { key: "papers" as OutputTab, label: "论文", value: publications.length },
    { key: "patents" as OutputTab, label: "专利", value: patents.length },
    { key: "projects" as OutputTab, label: "项目", value: projectSections.reduce((s, sec) => s + (sec.items?.length ?? 0), 0) },
    { key: "honors" as OutputTab, label: "荣誉", value: honors.length },
  ];

  return (
    <main className="relative">
      <HeroSection />
      <div className="relative z-40 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 md:space-y-24 pt-8 md:pt-10 pb-20">
            <LabIntroSection />
            {/* 装饰分隔线 */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]/30" />
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />
            </div>
            <ResearchSection items={researchAreas} />
            <IndustrialSection items={industrialDigest} />
            {/* 装饰分隔线 */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]/30" />
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />
            </div>
            <OutputsSection stats={outputStats} allCards={allCards} />
            <PeopleSection digest={peopleDigest} />
            <MediaSection mediaItems={mediaDigest} photos={showcasePhotos} />
            <ContactCTA contact={contact} />
          </div>
        </div>
      </div>
    </main>
  );
}
