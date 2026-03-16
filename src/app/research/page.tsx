// src/app/research/page.tsx
import type React from "react";
import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import researchDirections, { ResearchDirection } from "@/data/research";
import { assetPath } from "@/lib/assetPath";
import { toImageVariant } from "@/lib/imageVariant";
import LazyMount from "@/components/LazyMount";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { buttonClassName } from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";

/** 不依赖 line-clamp 插件，简介两行夹断 */
function clamp2Style(): React.CSSProperties {
  return {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };
}

/** 列表页标签：只保留“中文且不太短”的，过滤 Venturi/CT/pH/·OH/O3 等 */
function isNoisyTag(raw: string) {
  const s = (raw ?? "").trim();
  if (!s) return true;

  if (/pH/i.test(s)) return true;
  if (/CT/i.test(s)) return true;
  if (/·?\s*OH/i.test(s)) return true;
  if (/O\s*3/i.test(s) || /O₃/i.test(s)) return true;

  const hasCJK = /[\u4e00-\u9fff]/.test(s);
  if (!hasCJK) return true;

  const core = s.replace(/[^\p{L}\p{N}]+/gu, "");
  if (core.length <= 2) return true;

  return false;
}

function pickCardTags(d: ResearchDirection) {
  const uniq = Array.from(
    new Set((d.keywords ?? []).map((x) => (x ?? "").trim()))
  ).filter((t) => t && !isNoisyTag(t));

  return uniq.slice(0, 2);
}

/** 封面统一取景稍微偏下（尽量避开图片自带标题） */
function coverFocusYBySlug(slug: string) {
  const map: Record<string, number> = {
    "bubble-nucleation-equipment": 38,
    "water-quality-safety": 30,
    "black-odorous-water-remediation": 32,
    "aquaculture-high-density": 34,
  };
  return map[slug] ?? 45;
}

const directionOrder: string[] = [
  "bubble-nucleation-equipment",
  "water-quality-safety",
  "black-odorous-water-remediation",
  "aquaculture-high-density",
];

function sortDirections(list: ResearchDirection[]): ResearchDirection[] {
  const bySlug = new Map(list.map((d) => [d.slug, d] as const));
  return directionOrder
    .map((slug) => bySlug.get(slug))
    .filter((d): d is ResearchDirection => Boolean(d));
}

const sortedDirections = sortDirections(researchDirections);

function toResearchCardThumb(src: string) {
  if (!src) return src;
  return toImageVariant(src, "thumb");
}

const ResearchCard = memo(function ResearchCard({
  d,
  delay = 0,
}: {
  d: ResearchDirection;
  delay?: number;
}) {
  const href = `/research/${d.slug}`;
  const cover = d.cover ?? "";
  const coverThumb = toResearchCardThumb(cover);
  const tags = pickCardTags(d);

  const focusY =
    typeof (d as any).coverFocusY === "number"
      ? (d as any).coverFocusY
      : coverFocusYBySlug(d.slug);

  return (
    <Reveal delay={delay} className="h-full">
      <Link
        href={href}
        className="group block h-full"
        aria-label={`查看研究方向：${d.titleZh}`}
      >
        <LazyMount
          fallback={
            <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-sm">
              <div
                className="mb-4 h-56 w-full rounded-[var(--radius-md)] bg-[var(--bg-elevated)]"
              />
              <div className="text-lg font-semibold leading-7 text-[var(--text)]">
                {d.titleZh}
              </div>
              {d.titleEn ? (
                <div className="mt-1 text-sm text-[var(--muted)]">{d.titleEn}</div>
              ) : null}
              <div className="mt-4 h-4 w-2/3 rounded bg-[var(--bg-elevated)]" />
              <div className="mt-2 h-4 w-5/6 rounded bg-[var(--bg-elevated)]" />
              <div className="mt-auto pt-5">
                <div className="h-9 w-24 rounded-xl bg-[var(--bg-elevated)]" />
              </div>
            </div>
          }
        >
          <Card className="flex h-full flex-col rounded-3xl border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-sm transition-shadow group-hover:shadow-md">
            {/* 封面 + 分组徽标：与产业化卡片高度一致 */}
            <div className="relative mb-4 h-56 w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--bg-elevated)]">
              {cover ? (
                <Image
                  src={assetPath(coverThumb)}
                  alt={d.titleZh}
                  fill
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  className="object-cover"
                  style={{ objectPosition: `center ${focusY}%` }}
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-black/22 via-black/0 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              {d.category ? (
                <div className="pointer-events-none absolute inset-x-4 top-4 flex justify-end text-[11px] font-medium text-white">
                  <span className="inline-flex items-center rounded-full bg-black/35 px-2.5 py-1 backdrop-blur">
                    {d.category}
                  </span>
                </div>
              ) : null}
            </div>

            {/* 内容 */}
            <div className="flex flex-1 flex-col pt-1">
              <div className="min-h-[64px]">
                <div className="text-lg font-semibold leading-7 text-[var(--text)]">
                  {d.titleZh}
                </div>
                {d.titleEn ? (
                  <div className="mt-1 text-sm leading-6 text-[var(--muted)]">
                    {d.titleEn}
                  </div>
                ) : null}
              </div>

              {d.briefZh ? (
                <p
                  className="mt-3 text-sm leading-7 text-[var(--text-secondary)]"
                  style={clamp2Style()}
                >
                  {d.briefZh}
                </p>
              ) : (
                <div className="mt-3" />
              )}

              {/* 标签 */}
              {tags.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              ) : (
                <div className="mt-4" />
              )}

              {/* CTA */}
              <div className="mt-auto flex items-center justify-end pt-5">
                <span className={buttonClassName("secondary", "gap-1 px-4 py-2")}>
                  查看详情{" "}
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </div>
          </Card>
        </LazyMount>
      </Link>
    </Reveal>
  );
});

export default function ResearchPage() {
  return (
    <Section container="wide" spacing="compact">
      <div className="space-y-6 lg:space-y-8">
        <Reveal className="mx-auto max-w-6xl">
          <Heading
            as="h1"
            title="研究 Research"
            subtitle={
              <>
                <span className="block text-sm text-[var(--muted)] mb-1">
                  Research Directions
                </span>
                <span>
                  我们以 O₃-MNBs 为核心平台，围绕“气泡成核与设备研发、饮用水水质提升与安全保障、黑臭水体无药剂低能耗治理、水产高密度无抗养殖与品质改善”四个方向，构建从机理到应用的一体化研究矩阵。
                </span>
              </>
            }
            className="[&_h1]:text-[var(--text)]"
            subtitleClassName="text-[var(--text-secondary)]"
          />
        </Reveal>
        <div className="mx-auto max-w-6xl mt-8 grid gap-6 sm:grid-cols-2 items-stretch">
          {sortedDirections.map((d, index) => (
            <ResearchCard key={d.slug} d={d} delay={index * 0.05} />
          ))}
        </div>
      </div>
    </Section>
  );
}
