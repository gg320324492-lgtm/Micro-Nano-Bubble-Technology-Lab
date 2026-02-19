// src/app/industrialization/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";

import AquacultureTabs from "@/components/AquacultureTabs";
import AquacultureFigureStrip from "@/components/AquacultureFigureStrip";
import LightboxGallery, { GalleryItem } from "@/components/LightboxGallery";
import Container from "@/components/Container";
import {
  aquaculturePdfFullData,
  resolveAquacultureAssetPath,
} from "@/content/aquaculturePdfFullData";
import industrialBases from "@/data/industrialization";
import { assetPath } from "@/lib/assetPath";
import { toImageVariant } from "@/lib/imageVariant";

export const dynamicParams = false;
export function generateStaticParams() {
  return industrialBases.map((b) => ({ slug: String(b.slug) }));
}

function CoverHero({ src, alt }: { src?: string; alt: string }) {
  if (!src) {
    return (
      <div className="h-56 w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-elevated)]" />
    );
  }
  return (
    <div className="relative h-56 w-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-elevated)]">
      <Image
        src={assetPath(toImageVariant(src, "main"))}
        alt={alt}
        fill
        loading="eager"
        fetchPriority="high"
        className="object-cover"
        sizes="100vw"
      />
    </div>
  );
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function IndustrialBaseDetailPage(props: Props) {
  const { slug } = await props.params;
  const base = industrialBases.find((b) => String(b.slug) === slug);

  if (!base) {
    return (
      <main className="py-10">
        <Container>
          <h1 className="text-2xl font-semibold text-[var(--text)]">未找到该基地</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            当前 slug：{slug || "(空)"}
          </p>

          <div className="mt-6 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-card)] p-5">
            <div className="font-semibold text-[var(--text)]">可用 slug（点击直达）</div>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--text-secondary)]">
              {industrialBases.map((b) => (
                <li key={b.slug}>
                  <Link
                    className="underline"
                    href={`/industrialization/${String(b.slug)}/`}
                  >
                    {String(b.slug)}
                  </Link>{" "}
                  —— {b.titleZh}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <Link
              href="/industrialization/"
              className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--accent-soft)]"
            >
              ← 返回产业化列表
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  const isAquaculture = slug === "aquaculture";
  const aquacultureData = isAquaculture ? aquaculturePdfFullData : null;

  const findKeyNumber = (page: number, name: string) => {
    const pageData = aquacultureData?.pages.find((p) => p.page === page);
    return pageData?.keyNumbers.find((k) => k.name === name);
  };

  const kpiCards = aquacultureData
    ? [
        {
          title: "鲈鱼品质提升",
          value: findKeyNumber(1, "谷氨酸提升")?.valueText ?? "约74.5%",
          detail: "鲜味核心指标对比市场鱼显著提升",
        },
        {
          title: "免疫与抗氧化",
          value: findKeyNumber(1, "T-SOD提升")?.valueText ?? "约41.0%",
          detail: "溶菌酶、T-SOD同步提升",
        },
        {
          title: "辣椒产量提升",
          value:
            findKeyNumber(2, "产量提升（养殖肥水）")?.valueText ?? "约112.2%",
          detail: "相较清水组，增产效果明显",
        },
        {
          title: "养殖成本",
          value: findKeyNumber(3, "折算成本")?.valueText ?? "5.51元/斤鱼",
          detail: "较传统鲈鱼养殖成本降低45%~54%",
        },
      ]
    : [];

  const totalCostYuan = aquacultureData
    ? aquacultureData.costTable.reduce((acc, row) => acc + row.costYuan, 0)
    : 0;

  const pdfPath = aquacultureData
    ? assetPath(resolveAquacultureAssetPath(aquacultureData.meta.pdfPublicPath))
    : "";

  const sectionThemes = [
    {
      card: "border-sky-500/30 bg-sky-500/10",
      accent: "from-sky-400 to-blue-500",
      title: "text-sky-200",
      body: "text-[var(--text-secondary)]",
      bullet: "bg-sky-400",
    },
    {
      card: "border-emerald-500/30 bg-emerald-500/10",
      accent: "from-emerald-400 to-teal-500",
      title: "text-emerald-200",
      body: "text-[var(--text-secondary)]",
      bullet: "bg-emerald-400",
    },
    {
      card: "border-violet-500/30 bg-violet-500/10",
      accent: "from-violet-400 to-indigo-500",
      title: "text-violet-200",
      body: "text-[var(--text-secondary)]",
      bullet: "bg-violet-400",
    },
  ] as const;

  const introPanel = (
    <div id="intro">
      {base.highlightsZh?.length ? (
        <div className="mt-5 overflow-hidden rounded-[var(--radius-lg)] border border-cyan-500/30 bg-cyan-500/10">
          <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500" />
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--bg-card)]/90 text-cyan-300 shadow-sm">
                ✦
              </span>
              <div className="text-lg font-semibold text-[var(--text)]">基地亮点</div>
            </div>

            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {base.highlightsZh.map((x) => (
                <li
                  key={x}
                  className="flex items-start gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]/90 p-3 text-sm text-[var(--text-secondary)] shadow-sm"
                >
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {base.sections?.length ? (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {base.sections.map((s, idx) => {
            const theme = sectionThemes[idx % sectionThemes.length];
            const lastOddSpan =
              base.sections && base.sections.length % 2 === 1
                ? idx === base.sections.length - 1
                : false;

            return (
              <section
                key={s.titleZh}
                className={[
                  "group relative overflow-hidden rounded-2xl border p-6 shadow-sm transition duration-300",
                  "hover:-translate-y-1 hover:shadow-lg",
                  theme.card,
                  lastOddSpan ? "md:col-span-2" : "",
                ].join(" ")}
              >
                <div
                  className={[
                    "absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
                    theme.accent,
                  ].join(" ")}
                />

                <h2
                  className={[
                    "text-2xl font-semibold tracking-tight",
                    theme.title,
                  ].join(" ")}
                >
                  {s.titleZh}
                </h2>
                <p className={["mt-2 text-sm leading-relaxed", theme.body].join(" ")}>
                  {s.bodyZh}
                </p>

                {s.bulletsZh?.length ? (
                  <ul className="mt-4 space-y-2">
                    {s.bulletsZh.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                      >
                        <span
                          className={[
                            "mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full",
                            theme.bullet,
                          ].join(" ")}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            );
          })}
        </div>
      ) : null}

      {base.gallery?.length ? (
        <div className="mt-10">
          <LightboxGallery
            layout="grid-3"
            items={
              base.gallery.map(
                (img) =>
                  ({
                    src: img.src,
                    alt: img.alt ?? base.titleZh,
                    caption: img.captionZh,
                  } satisfies GalleryItem),
              ) ?? []
            }
          />
        </div>
      ) : null}
    </div>
  );

  const resultsPanel = aquacultureData ? (
    <div id="results" className="mt-8 space-y-6">
      <section className="overflow-hidden rounded-[var(--radius-lg)] border border-indigo-500/30 bg-indigo-500/10">
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-500" />
        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
                成果总览
              </h2>
            </div>
            <span className="rounded-full border border-indigo-200 bg-indigo-100/80 px-3 py-1 text-xs font-medium text-indigo-700">
              数据来源：{aquacultureData.meta.fileName}
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {kpiCards.map((kpi) => (
              <article
                key={kpi.title}
                className="rounded-2xl border border-[var(--border)]/80 bg-[var(--bg-card)] p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--accent)]/60"
              >
                <p className="text-sm font-medium text-[var(--text-secondary)]">{kpi.title}</p>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]">
                  {kpi.value}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
                  {kpi.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[var(--radius-lg)] border border-sky-500/30 bg-sky-500/10">
        <div className="h-1 w-full bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500" />
        <div className="p-5 sm:p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
            数据分析与展示
          </h2>

          <AquacultureFigureStrip
            figures={aquacultureData.figures}
            chartMeta={aquacultureData.chartMeta}
            pages={aquacultureData.pages}
          />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <article className="overflow-hidden rounded-[var(--radius-lg)] border border-emerald-500/30 bg-emerald-500/10">
          <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
          <div className="p-5 sm:p-6">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
              成本结构与收益测算
            </h2>

            <div className="mt-4 overflow-x-auto rounded-xl border border-emerald-500/30 bg-[var(--bg-card)]">
              <table className="min-w-full text-sm">
                <thead className="bg-emerald-500/15 text-[var(--text-secondary)]">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium">项目</th>
                    <th className="px-3 py-2 text-left font-medium">用量</th>
                    <th className="px-3 py-2 text-left font-medium">单价</th>
                    <th className="px-3 py-2 text-right font-medium">成本（元）</th>
                  </tr>
                </thead>
                <tbody>
                  {aquacultureData.costTable.map((row) => (
                    <tr key={row.item} className="border-t border-[var(--border)]">
                      <td className="px-3 py-2 text-[var(--text)]">{row.item}</td>
                      <td className="px-3 py-2 text-[var(--text-secondary)]">{row.usage}</td>
                      <td className="px-3 py-2 text-[var(--text-secondary)]">{row.unitPrice}</td>
                      <td className="px-3 py-2 text-right font-medium text-[var(--text)]">
                        {row.costYuan}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-emerald-500/30 bg-emerald-500/20">
                    <td
                      className="px-3 py-2 font-semibold text-[var(--text)]"
                      colSpan={3}
                    >
                      合计
                    </td>
                    <td className="px-3 py-2 text-right text-base font-semibold text-emerald-300">
                      {totalCostYuan} 元
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mt-3 rounded-xl border border-emerald-500/40 bg-white/90 p-3 text-sm text-[var(--text)] shadow-sm">
              <span className="font-semibold text-emerald-700">
                折算成本：
                {findKeyNumber(3, "折算成本")?.valueText ?? "5.51元/斤鱼"}
              </span>
              <span className="ml-1 text-[var(--text-secondary)]">
                ，较传统鲈鱼养殖成本（10-12元/斤鱼）降低45%~54%。
              </span>
            </div>
          </div>
        </article>

        <article className="overflow-hidden rounded-[var(--radius-lg)] border border-violet-500/30 bg-violet-500/10">
          <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500" />
          <div className="p-5 sm:p-6">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
              结论与资料下载
            </h2>

            <ul className="mt-4 space-y-2">
              {aquacultureData.conclusions.map((conclusion) => (
                <li
                  key={conclusion.text}
                  className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-violet-500" />
                  <span>
                    {conclusion.text}
                    <span className="ml-1 text-xs text-[var(--muted)]">
                      （第{conclusion.source.page}页）
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              <a
                href={pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
              >
                在线查看 PDF
              </a>
              <a
                href={pdfPath}
                download={aquacultureData.meta.fileName}
                className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]"
              >
                下载 PDF 原文
              </a>
            </div>
          </div>
        </article>
      </section>
    </div>
  ) : null;

  return (
    <main className="py-10">
      <Container>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/industrialization/"
            className="rounded-xl border px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--accent-soft)]"
          >
            ← 返回产业化列表
          </Link>

          {base.locationUrl ? (
            <a
              href={base.locationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--accent-soft)]"
            >
              高德地图导航
            </a>
          ) : null}

          {base.monitorUrl ? (
            <a
              href={base.monitorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-black px-4 py-2 text-sm text-white hover:opacity-90"
            >
              打开监测大屏
            </a>
          ) : null}
        </div>

        <div className="mt-6">
          <CoverHero src={base.cover} alt={base.titleZh} />

          <div className="mt-5">
            <h1 className="text-3xl font-semibold tracking-tight">{base.titleZh}</h1>
            {base.titleEn ? (
              <div className="mt-1 text-sm text-[var(--muted)]">{base.titleEn}</div>
            ) : null}

            <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
              {base.briefZh}
            </p>

            {base.locationZh ? (
              <div className="mt-3 text-sm text-[var(--text-secondary)]">
                <span className="font-medium text-[var(--text)]">位置/说明：</span>
                {base.locationUrl ? (
                  <a
                    href={base.locationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-[var(--text)]"
                  >
                    {base.locationZh}
                  </a>
                ) : (
                  base.locationZh
                )}
              </div>
            ) : null}
          </div>
        </div>

        {isAquaculture && resultsPanel ? (
          <AquacultureTabs introPanel={introPanel} resultsPanel={resultsPanel} />
        ) : (
          introPanel
        )}
      </Container>
    </main>
  );
}
