// src/app/research/page.tsx
import Link from "next/link";
import Image from "next/image";
import researchDirections, { ResearchDirection } from "@/data/research";

function groupDirections(list: ResearchDirection[]) {
  const coreSlugs = new Set([
    "bubble-collapse-oh",
    "water-quality-safety",
    "equipment-development",
  ]);

  const core: ResearchDirection[] = [];
  const apps: ResearchDirection[] = [];

  for (const d of list) {
    if (coreSlugs.has(d.slug)) core.push(d);
    else apps.push(d);
  }

  const orderCore = [
    "bubble-collapse-oh",
    "water-quality-safety",
    "equipment-development",
  ];
  core.sort((a, b) => orderCore.indexOf(a.slug) - orderCore.indexOf(b.slug));

  return { core, apps };
}

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

  // 过滤技术缩写/符号
  if (/pH/i.test(s)) return true;
  if (/CT/i.test(s)) return true;
  if (/·?\s*OH/i.test(s)) return true;
  if (/O\s*3/i.test(s) || /O₃/i.test(s)) return true;

  // 过滤英文标签（Venturi/Swirl-Venturi 等）
  const hasCJK = /[\u4e00-\u9fff]/.test(s);
  if (!hasCJK) return true;

  // 太短的不要
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
    "bubble-collapse-oh": 38,
    "water-quality-safety": 45,
    "equipment-development": 55,
    "surface-cleaning-removal": 45,
    "agriculture-salt-alkali": 45,
  };
  return map[slug] ?? 45;
}

function ResearchCard({ d, kind }: { d: ResearchDirection; kind: "core" | "app" }) {
  const href = `/research/${d.slug}`;
  const cover = d.cover ?? "";
  const tags = pickCardTags(d);

  const focusY =
    typeof (d as any).coverFocusY === "number"
      ? (d as any).coverFocusY
      : coverFocusYBySlug(d.slug);

  return (
    <Link href={href} className="group block h-full" aria-label={`查看研究方向：${d.titleZh}`}>
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        {/* 封面 */}
        <div className="relative w-full bg-muted" style={{ aspectRatio: "16 / 10" }}>
          {cover ? (
            <Image
              src={cover}
              alt={d.titleZh}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              style={{ objectPosition: `center ${focusY}%` }}
              priority={kind === "core"}
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        {/* 内容 */}
        <div className="flex flex-1 flex-col p-4">
          <div className="min-h-[56px]">
            <div className="text-base font-semibold leading-6">{d.titleZh}</div>
            {d.titleEn ? (
              <div className="mt-1 text-xs text-muted-foreground">{d.titleEn}</div>
            ) : null}
          </div>

          {d.briefZh ? (
            <p className="mt-2 text-sm leading-6 text-muted-foreground" style={clamp2Style()}>
              {d.briefZh}
            </p>
          ) : (
            <div className="mt-2" />
          )}

          {/* 标签（最多2个，且只显示中文长标签） */}
          {tags.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border bg-background px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : (
            <div className="mt-3" />
          )}

          {/* CTA 固定右下角 */}
          <div className="mt-auto flex items-center justify-between pt-4">
            <span className="text-xs text-muted-foreground">
              {kind === "core" ? "机理 / 指标 / 装备" : "场景 / 风险边界 / SOP"}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border bg-white px-3 py-1.5 text-sm font-medium shadow-sm transition-colors group-hover:bg-muted">
              查看详情 <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ResearchPage() {
  const { core, apps } = groupDirections(researchDirections);

  return (
    // ✅ 关键：这里不用你原来的 Container（偏瘦），直接用 max-w-7xl“加宽版”
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="py-10 md:py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold md:text-3xl">研究方向</h1>
          <p className="mt-2 max-w-4xl text-sm leading-7 text-muted-foreground">
            我们以 O₃-MNBs 为核心平台，围绕“机理—指标—装备—场景”形成从基础到应用的研究矩阵。
          </p>
        </div>

        <section>
          <div className="mb-4">
            <div className="text-lg font-semibold">核心研究方向 Core Areas</div>
            <div className="mt-1 text-sm text-muted-foreground">
              面向关键机理与工程指标，支撑工艺放大与设备开发。
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {core.map((d) => (
              <ResearchCard key={d.slug} d={d} kind="core" />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-4">
            <div className="text-lg font-semibold">应用与拓展 Applications</div>
            <div className="mt-1 text-sm text-muted-foreground">
              面向具体场景验证效果、风险边界与可复制 SOP。
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((d) => (
              <ResearchCard key={d.slug} d={d} kind="app" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
