// src/app/research/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";

import Container from "@/components/Container";
import LightboxGallery, { GalleryItem } from "@/components/LightboxGallery";
import researchDirections, { ResearchDirection } from "@/data/research";

type PageProps =
  | { params: { slug: string } }
  | { params: Promise<{ slug: string }> };

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border bg-background px-2.5 py-1 text-xs text-muted-foreground">
      {children}
    </span>
  );
}

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
  const { slug } = await Promise.resolve((props as any).params);

  const all: ResearchDirection[] = researchDirections;
  const item = all.find((d) => d.slug === slug);

  if (!item) {
    return (
      <Container>
        <div className="py-12">
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-semibold">未找到该研究方向</h1>
            <p className="mt-2 text-muted-foreground">
              当前 slug：<span className="font-mono">{slug}</span> 未匹配到数据。
            </p>

            <div className="mt-6">
              <div className="mb-2 text-sm font-semibold">可用方向</div>
              <div className="flex flex-wrap gap-2">
                {all.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/research/${d.slug}`}
                    className="rounded-full border bg-background px-3 py-1 text-sm hover:bg-muted"
                  >
                    {d.titleZh}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <Link
                href="/research"
                className="rounded-xl bg-foreground px-4 py-2 text-sm text-background hover:opacity-90"
              >
                返回研究列表
              </Link>
              <Link
                href="/"
                className="rounded-xl border bg-background px-4 py-2 text-sm hover:bg-muted"
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

  // ✅ 只保留四个“大卡片”
  const topBullets = bulletsZh.slice(0, 4);

  // ✅ 核心概览：sections 合并成一段
  const coreParagraph = mergeSectionsToParagraph(sections);

  return (
    <div className="bg-background">
      {/* 顶部封面 */}
      <div className="relative">
        <div className="relative h-[240px] w-full overflow-hidden border-b bg-muted md:h-[300px]">
          {cover ? (
            <Image
              src={cover}
              alt={titleZh}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: `center ${coverFocusY}%` }}
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
        </div>

        <Container>
          <div className="-mt-14 rounded-3xl border bg-white p-6 shadow-sm md:-mt-16 md:p-7">
            {/* 顶部：分组徽标 */}
            <div className="flex flex-wrap gap-2">
              {item.group ? <Badge>{item.group}</Badge> : null}
              {item.category ? <Badge>{item.category}</Badge> : null}
            </div>

            {/* ✅ 黑色标题右侧按钮（你红圈位置） */}
            <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <h1 className="text-2xl font-semibold md:text-3xl">{titleZh}</h1>
                {titleEn ? <div className="mt-1 text-muted-foreground">{titleEn}</div> : null}
              </div>

              <Link
                href="/research"
                className="shrink-0 inline-flex items-center rounded-full border bg-white px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-muted whitespace-nowrap"
              >
                ← 返回研究列表
              </Link>
            </div>

            <div className="mt-4">
              <p className="leading-7 text-muted-foreground">{briefZh}</p>

              {/* ✅ 关键词标签这一行已完全删除（CT值/pH窗口/·OH等都不会出现） */}

              {/* ✅ 只保留四个“大圆角卡片” */}
              {topBullets.length ? (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {topBullets.map((b) => (
                    <div key={b} className="rounded-2xl border bg-muted px-4 py-3 text-sm">
                      {stripParen(b)}
                    </div>
                  ))}
                </div>
              ) : null}

              {/* ✅ 四段合并成一段话 */}
              {coreParagraph ? (
                <div className="mt-6 rounded-2xl border bg-background p-5">
                  <div className="text-base font-semibold">核心概览</div>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{coreParagraph}</p>
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
            <div className="rounded-3xl border bg-white p-4 shadow-sm md:p-6">
              <LightboxGallery items={gallery} />
            </div>
          ) : null}

          <div className="mt-10 flex items-center justify-between text-sm">
            <Link href="/research" className="text-muted-foreground hover:text-foreground">
              ← 研究
            </Link>
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              首页 →
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
