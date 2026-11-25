// src/app/research/ResearchPageClient.tsx
// 研究索引页客户端部分（版式 A · 编号清单已固化，宽度 108rem —— 之前的三版式切换器已移除）
"use client";

import Image from "next/image";
import Link from "next/link";
import researchDirections, { type ResearchDirection } from "@/data/research";
import { toImageVariant } from "@/lib/imageVariant";
import { RevealItem } from "@/components/motion/MotionEngine";

/* ── 数据准备（与旧页一致的排序 / 标签过滤 / 封面取景） ── */

const directionOrder = [
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

/** 列表页标签：只保留“中文且不太短”的，过滤 Venturi/CT/pH/·OH/O3 等 */
function isNoisyTag(raw: string) {
  const s = (raw ?? "").trim();
  if (!s) return true;
  if (/pH/i.test(s)) return true;
  if (/CT/i.test(s)) return true;
  if (/·?\s*OH/i.test(s)) return true;
  if (/O\s*3/i.test(s) || /O₃/i.test(s)) return true;
  const hasCJK = /[一-鿿]/.test(s);
  if (!hasCJK) return true;
  const core = s.replace(/[^\p{L}\p{N}]+/gu, "");
  if (core.length <= 2) return true;
  return false;
}

function pickCardTags(d: ResearchDirection) {
  const uniq = Array.from(
    new Set((d.keywords ?? []).map((x) => (x ?? "").trim()))
  ).filter((t) => t && !isNoisyTag(t));
  return uniq.slice(0, 3);
}

function coverFocusYBySlug(slug: string) {
  const map: Record<string, number> = {
    "bubble-nucleation-equipment": 38,
    "water-quality-safety": 30,
    "black-odorous-water-remediation": 32,
    "aquaculture-high-density": 34,
  };
  return map[slug] ?? 45;
}

const sortedDirections = sortDirections(researchDirections);

/* ── 版式 A · 编号清单（仪器手册目录式） ── */

export default function ResearchPageClient() {
  return (
    <div className="theme-navy">
      <div className="rsp-page">
        <header className="rsp-hero">
          <span className="rsp-kicker">RESEARCH · 研究方向</span>
          <h1 className="rsp-h1">四个方向，一条从机理到装备的路径</h1>
          <p className="rsp-lede">
            我们以 O₃-MNBs
            为核心平台，围绕气泡成核与设备研发、饮用水水质提升与安全保障、黑臭水体无药剂低能耗治理、水产高密度无抗养殖四个方向，构建从机理研究到工程应用的一体化研究矩阵。
          </p>
          <div className="rsp-headrule" />
        </header>

        <div className="rspA-list">
          {sortedDirections.map((d, idx) => {
            const cover = d.cover ?? "";
            const focusY =
              typeof d.coverFocusY === "number"
                ? d.coverFocusY
                : coverFocusYBySlug(d.slug);
            const tags = pickCardTags(d);
            return (
              <RevealItem key={d.slug} delay={0.05 * idx}>
                <Link
                  href={`/research/${d.slug}`}
                  className="rspA-row"
                  aria-label={`查看研究方向：${d.titleZh}`}
                >
                  <span className="rspA-no">{String(idx + 1).padStart(2, "0")}</span>
                  <span className="rspA-body">
                    <span className="rspA-cat">
                      {d.group === "Core" ? "CORE · 机理与装备" : "APPLICATION · 场景应用"}
                    </span>
                    <span className="rspA-title">{d.titleZh}</span>
                    {d.titleEn ? <span className="rspA-en">{d.titleEn}</span> : null}
                    {d.briefZh ? <span className="rspA-brief">{d.briefZh}</span> : null}
                    {tags.length > 0 ? (
                      <span className="rspA-tags">
                        {tags.map((t) => (
                          <span key={t} className="rspA-tag">
                            {t}
                          </span>
                        ))}
                      </span>
                    ) : null}
                  </span>
                  <span className="rspA-media">
                    {cover ? (
                      <Image
                        src={toImageVariant(cover, "thumb")}
                        alt={d.titleZh}
                        fill
                        sizes="24rem"
                        style={{ objectPosition: `50% ${focusY}%` }}
                      />
                    ) : null}
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </div>
      </div>
    </div>
  );
}
