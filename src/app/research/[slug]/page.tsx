// src/app/research/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";

import Container from "@/components/Container";
import LightboxGallery, { GalleryItem } from "@/components/LightboxGallery";
import Pill from "@/components/ui/Pill";
import researchDirections, { ResearchDirection } from "@/data/research";
import { assetPath } from "@/lib/assetPath";
import { toImageVariant } from "@/lib/imageVariant";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return researchDirections.map((d) => ({ slug: d.slug }));
}

/** 删除括号内容（中文/英文括号都删） */
function stripParen(text: string) {
  return (text ?? "")
    .replace(/（[^）]*）/g, "")
    .replace(/\([^)]*\)/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function cleanText(text: string) {
  return stripParen(
    (text || "")
      .replace(/\s+/g, " ")
      .replace(/（参考[^）]*）/g, "")
      .replace(/…+/g, "")
      .trim()
  );
}

/** 把 sections 合并成一段连贯中文 */
function mergeSectionsToParagraph(sections: { titleZh: string; bodyZh: string }[]) {
  const bodies = sections.map((s) => cleanText(s.bodyZh)).filter(Boolean);
  if (!bodies.length) return "";

  const starters = ["首先", "其次", "同时", "进一步", "最后"];
  const parts = bodies.map((b, i) => {
    const st = starters[i] || "此外";
    const bb = b.replace(/^(首先|其次|同时|进一步|最后|此外)[，、]/, "");
    return `${st}，${bb}`;
  });

  return parts.join(" ").replace(/\s+/g, " ").trim();
}

export default async function ResearchDetailPage(props: PageProps) {
  const { slug } = await props.params;

  const all: ResearchDirection[] = researchDirections;
  const item = all.find((d) => d.slug === slug);

  if (!item) {
    return (
      <Container>
        <div className="py-12">
          <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-8">
            <h1 className="text-2xl font-semibold text-[var(--text)]">未找到该研究方向</h1>
            <p className="mt-2 text-[var(--text-secondary)]">
              当前 slug：<span className="font-mono">{slug}</span> 未匹配到数据。
            </p>

            <div className="mt-6">
              <div className="mb-2 text-sm font-semibold text-[var(--text)]">可用方向</div>
              <div className="flex flex-wrap gap-2">
                {all.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/research/${d.slug}`}
                    className="rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-3 py-1 text-sm hover:bg-[var(--accent-soft)]"
                  >
                    {d.titleZh}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <Link
                href="/research"
                className="rounded-xl bg-[var(--accent)] px-4 py-2 text-sm text-[var(--bg-deep)] hover:bg-[var(--accent-hover)]"
              >
                返回研究列表
              </Link>
              <Link
                href="/"
                className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2 text-sm hover:bg-[var(--accent-soft)]"
              >
                返回首页
              </Link>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  const titleZh = item.titleZh;
  const titleEn = item.titleEn ?? "";
  const briefZh = item.briefZh ?? "";
  const bulletsZh = item.bulletsZh ?? [];
  const sections = item.sections ?? [];

  const cover = item.cover ?? "";
  const coverFocusY =
    typeof (item as any).coverFocusY === "number" ? (item as any).coverFocusY : 35;

  const gallery: GalleryItem[] = (item.gallery ?? []).map((g) => ({
    src: g.src,
    alt: g.alt,
    caption: g.captionZh,
    focusY: typeof (g as any).focusY === "number" ? (g as any).focusY : 40,
  }));

  const topBullets = bulletsZh.slice(0, 4);
  const coreParagraph = mergeSectionsToParagraph(sections);
  const isApplications = item.group === "Applications";
  const theme = isApplications
    ? {
        tone: "applications" as const,
        coverOverlay: "from-[var(--bg-deep)]/80 via-[var(--bg-deep)]/40 to-transparent",
        cardBorder: "border-teal-500/30",
        groupBadge: "border-teal-500/40 bg-teal-500/15 text-teal-300",
        categoryBadge: "border-cyan-500/40 bg-cyan-500/15 text-cyan-300",
        backBtn:
          "border-[var(--border)] bg-[var(--bg-card)] text-[var(--text)] hover:bg-[var(--accent-soft)] hover:border-[var(--accent)]/40",
        bulletPill:
          "border-[var(--border)] bg-white/90 text-[var(--text)] shadow-sm",
        overviewWrap:
          "border-[var(--border)] bg-teal-500/10",
        overviewBar: "bg-gradient-to-r from-teal-500 to-cyan-500",
        galleryWrap: "border-[var(--border)] bg-[var(--bg-card)]",
        footerLink: "hover:text-teal-300",
      }
    : {
        tone: "core" as const,
        coverOverlay: "from-[var(--bg-deep)]/80 via-[var(--bg-deep)]/40 to-transparent",
        cardBorder: "border-[var(--border)]",
        groupBadge: "border-blue-500/40 bg-blue-500/15 text-blue-300",
        categoryBadge: "border-sky-500/40 bg-sky-500/15 text-sky-300",
        backBtn:
          "border-[var(--border)] bg-[var(--bg-card)] text-[var(--text)] hover:bg-[var(--accent-soft)] hover:border-[var(--accent)]/40",
        bulletPill:
          "border-[var(--border)] bg-white/90 text-[var(--text)] shadow-sm",
        overviewWrap:
          "border-[var(--border)] bg-blue-500/10",
        overviewBar: "bg-gradient-to-r from-blue-500 to-cyan-500",
        galleryWrap: "border-[var(--border)] bg-[var(--bg-card)]",
        footerLink: "hover:text-[var(--accent)]",
      };

  return (
    <div className="min-h-screen">
      {/* 顶部封面 */}
      <div className="relative">
        <div className="relative h-[240px] w-full overflow-hidden border-b border-[var(--border)] bg-[var(--bg-elevated)] md:h-[300px]">
          {cover ? (
            <Image
              src={assetPath(toImageVariant(cover, "main"))}
              alt={titleZh}
              fill
              priority
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: `center ${coverFocusY}%` }}
            />
          ) : null}
          <div className={["absolute inset-0 bg-gradient-to-t", theme.coverOverlay].join(" ")} />
        </div>

        <Container>
          <div
            className={[
              "-mt-14 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-6 backdrop-blur-sm md:-mt-16 md:p-7",
              theme.cardBorder,
            ].join(" ")}
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-[var(--text)] md:text-3xl">{titleZh}</h1>
                {titleEn ? <div className="mt-1 text-[var(--text-secondary)]">{titleEn}</div> : null}
              </div>

              <Link
                href="/research"
                className={[
                  "shrink-0 inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold shadow-sm whitespace-nowrap",
                  theme.backBtn,
                ].join(" ")}
              >
                ← 返回研究列表
              </Link>
            </div>

            <div className="mt-4">
              <p className="leading-7 text-[var(--text-secondary)]">{briefZh}</p>

              {topBullets.length ? (
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {topBullets.map((b) => (
                    <Pill key={b} className={["min-w-0", theme.bulletPill].join(" ")}>
                      {stripParen(b)}
                    </Pill>
                  ))}
                </div>
              ) : null}

              {coreParagraph ? (
                <div className={["mt-6 rounded-2xl border p-5", theme.overviewWrap].join(" ")}>
                  <div className={["mb-3 h-1.5 w-14 rounded-full", theme.overviewBar].join(" ")} />
                  <div className="text-base font-semibold text-[var(--text)]">核心概览</div>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{coreParagraph}</p>
                </div>
              ) : null}
            </div>
          </div>
        </Container>
      </div>

      {/* 图集 */}
      <Container>
        <div className="py-10">
          {gallery.length ? (
            <div
              className={[
                "rounded-3xl border p-4 shadow-[0_12px_28px_-22px_rgba(15,45,92,0.3)] md:p-6",
                theme.galleryWrap,
              ].join(" ")}
            >
              {/* ✅ 这里 gallery 的 src 不用提前 assetPath，
                  因为 LightboxGallery 我也给你做了整文件替换（见下） */}
              <LightboxGallery items={gallery} tone={theme.tone} />
            </div>
          ) : null}

          <div className="mt-10 flex items-center justify-between text-sm">
            <Link
              href="/research"
              className={["text-[var(--text-secondary)]", theme.footerLink].join(" ")}
            >
              ← 研究
            </Link>
            <Link
              href="/"
              className={["text-[var(--text-secondary)]", theme.footerLink].join(" ")}
            >
              首页 →
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
