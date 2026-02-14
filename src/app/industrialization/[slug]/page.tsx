// src/app/industrialization/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";

import {
  aquaculturePdfFullData,
  resolveAquacultureAssetPath,
} from "@/content/aquaculturePdfFullData";
import industrialBases from "@/data/industrialization";
import { assetPath } from "@/lib/assetPath";
import { toImageVariant } from "@/lib/imageVariant";

// ✅ 静态导出必须：告诉 Next 这类动态路由有哪些 slug
export const dynamicParams = false;
export function generateStaticParams() {
  return industrialBases.map((b) => ({ slug: String(b.slug) }));
}

function CoverHero({ src, alt }: { src?: string; alt: string }) {
  if (!src) {
    return (
      <div className="h-56 w-full rounded-2xl border bg-gradient-to-br from-gray-50 to-gray-100" />
    );
  }
  return (
    <div className="relative h-56 w-full overflow-hidden rounded-2xl border bg-gray-50">
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
  searchParams?: Promise<{ view?: string | string[] }>;
};

export default async function IndustrialBaseDetailPage(props: Props) {
  const { slug } = await props.params;
  const searchParams = props.searchParams ? await props.searchParams : undefined;

  const base = industrialBases.find((b) => String(b.slug) === slug);
  const isAquaculture = slug === "aquaculture";
  const aquacultureData = isAquaculture ? aquaculturePdfFullData : null;

  const viewParam = Array.isArray(searchParams?.view)
    ? searchParams.view[0]
    : searchParams?.view;
  const activeAquacultureView =
    isAquaculture && viewParam === "results" ? "results" : "intro";

  const showIntro = !isAquaculture || activeAquacultureView === "intro";
  const showResults = isAquaculture && activeAquacultureView === "results";

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

  const introViewHref = `/industrialization/${encodeURIComponent(
    slug,
  )}/?view=intro`;
  const resultsViewHref = `/industrialization/${encodeURIComponent(
    slug,
  )}/?view=results`;

  const sectionThemes = [
    {
      card: "border-sky-200/80 bg-gradient-to-br from-sky-50 via-white to-blue-50/80",
      accent: "from-sky-400 to-blue-500",
      title: "text-sky-950",
      body: "text-slate-700",
      bullet: "bg-sky-500",
    },
    {
      card: "border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-teal-50/80",
      accent: "from-emerald-400 to-teal-500",
      title: "text-emerald-950",
      body: "text-slate-700",
      bullet: "bg-emerald-500",
    },
    {
      card: "border-violet-200/80 bg-gradient-to-br from-violet-50 via-white to-indigo-50/80",
      accent: "from-violet-400 to-indigo-500",
      title: "text-violet-950",
      body: "text-slate-700",
      bullet: "bg-violet-500",
    },
  ] as const;

  if (!base) {
    return (
      <main className="py-10">
        <h1 className="text-2xl font-semibold">未找到该基地</h1>
        <p className="mt-2 text-sm text-gray-600">当前 slug：{slug || "(空)"}</p>

        <div className="mt-6 rounded-2xl border p-5">
          <div className="font-semibold">可用 slug（点击直达）</div>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-700">
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
            className="rounded-xl border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            ← 返回产业化列表
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="py-10">
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href="/industrialization/"
          className="rounded-xl border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          ← 返回产业化列表
        </Link>

        {base.locationUrl ? (
          <a
            href={base.locationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
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
            <div className="mt-1 text-sm text-gray-500">{base.titleEn}</div>
          ) : null}

          <p className="mt-3 text-sm leading-relaxed text-gray-700">{base.briefZh}</p>

          {base.locationZh ? (
            <div className="mt-3 text-sm text-gray-600">
              <span className="font-medium text-gray-900">位置/说明：</span>
              {base.locationUrl ? (
                <a
                  href={base.locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-gray-900"
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

      {isAquaculture ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white/90 p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={introViewHref}
              className={[
                "inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition",
                activeAquacultureView === "intro"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200",
              ].join(" ")}
            >
              基地介绍
            </Link>
            <Link
              href={resultsViewHref}
              className={[
                "inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition",
                activeAquacultureView === "results"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200",
              ].join(" ")}
            >
              成果展示
            </Link>
          </div>
        </div>
      ) : null}

      {showIntro ? (
        <>
          {base.highlightsZh?.length ? (
            <div className="mt-5 overflow-hidden rounded-2xl border border-cyan-200/80 bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 shadow-sm">
              <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500" />
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/85 text-cyan-600 shadow-sm">
                    ✦
                  </span>
                  <div className="text-lg font-semibold text-slate-900">基地亮点</div>
                </div>

                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {base.highlightsZh.map((x) => (
                    <li
                      key={x}
                      className="flex items-start gap-2 rounded-xl border border-sky-200/70 bg-white/85 p-3 text-sm text-slate-700 shadow-sm"
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
                  base.sections.length % 2 === 1 &&
                  idx === base.sections.length - 1;

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
                            className="flex items-start gap-2 text-sm text-slate-700"
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
              <div className="mb-3 text-lg font-semibold">图片 / 图集</div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {base.gallery.map((img) => (
                  <figure key={img.src} className="rounded-2xl border p-3">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-50">
                      <Image
                        src={assetPath(toImageVariant(img.src, "thumb"))}
                        alt={img.alt ?? base.titleZh}
                        fill
                        loading="lazy"
                        fetchPriority="low"
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                    </div>
                    {img.captionZh ? (
                      <figcaption className="mt-2 text-xs text-gray-600">
                        {img.captionZh}
                      </figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            </div>
          ) : null}
        </>
      ) : null}

      {showResults && aquacultureData ? (
        <div className="mt-8 space-y-6">
          <section className="overflow-hidden rounded-2xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50 via-white to-sky-50 shadow-sm">
            <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-500" />
            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                    成果总览
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    结合基地运行与《{aquacultureData.meta.docTitle}》数据，展示“品质提升—增产提质—降本增效”结果。
                  </p>
                </div>
                <span className="rounded-full border border-indigo-200 bg-indigo-100/80 px-3 py-1 text-xs font-medium text-indigo-700">
                  数据来源：{aquacultureData.meta.fileName}
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {kpiCards.map((kpi) => (
                  <article
                    key={kpi.title}
                    className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm"
                  >
                    <p className="text-sm font-medium text-slate-700">{kpi.title}</p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                      {kpi.value}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">
                      {kpi.detail}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-sky-200/80 bg-gradient-to-br from-sky-50 via-white to-cyan-50 shadow-sm">
            <div className="h-1 w-full bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500" />
            <div className="p-5 sm:p-6">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                图表与证据
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                将新增三张数据图与现场资料融合展示，支持按来源页定位与交叉核对。
              </p>

              <div className="mt-5 grid gap-4 lg:grid-cols-3">
                {aquacultureData.figures.map((fig) => {
                  const relatedCharts = aquacultureData.chartMeta.filter(
                    (chart) => chart.source.page === fig.source.page,
                  );
                  const relatedPage = aquacultureData.pages.find(
                    (p) => p.page === fig.source.page,
                  );

                  return (
                    <article
                      key={fig.id}
                      className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm"
                    >
                      <a
                        href={assetPath(resolveAquacultureAssetPath(fig.src))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                        aria-label={`查看大图-${fig.id}`}
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
                          <Image
                            src={assetPath(resolveAquacultureAssetPath(fig.src))}
                            alt={fig.caption}
                            fill
                            loading="lazy"
                            fetchPriority="low"
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            sizes="(max-width: 1024px) 100vw, 33vw"
                          />
                        </div>
                      </a>

                      <div className="space-y-3 p-4">
                        <div>
                          <div className="text-sm font-semibold text-slate-900">
                            {fig.caption}
                          </div>
                          <div className="mt-1 text-xs text-slate-500">
                            来源：{fig.source.file} 第 {fig.source.page} 页
                          </div>
                        </div>

                        {relatedPage?.textBlocks?.length ? (
                          <ul className="space-y-1 text-xs leading-relaxed text-slate-600">
                            {relatedPage.textBlocks.slice(0, 2).map((txt) => (
                              <li key={`${fig.id}-${txt}`} className="flex gap-2">
                                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                                <span>{txt}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}

                        {relatedCharts.length ? (
                          <div className="flex flex-wrap gap-1.5">
                            {relatedCharts.map((chart) => (
                              <span
                                key={chart.id}
                                className="rounded-full border border-sky-200 bg-sky-50 px-2 py-1 text-[11px] text-sky-700"
                                title={`${chart.title}（${chart.unit}）`}
                              >
                                {chart.title}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
            <article className="overflow-hidden rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-teal-50 shadow-sm">
              <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
              <div className="p-5 sm:p-6">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                  成本结构与收益测算
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  按 PDF 第3页成本明细逐项拆解并保留原始口径。
                </p>

                <div className="mt-4 overflow-x-auto rounded-xl border border-emerald-200/70 bg-white">
                  <table className="min-w-full text-sm">
                    <thead className="bg-emerald-50 text-slate-700">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium">项目</th>
                        <th className="px-3 py-2 text-left font-medium">用量</th>
                        <th className="px-3 py-2 text-left font-medium">单价</th>
                        <th className="px-3 py-2 text-right font-medium">成本（元）</th>
                      </tr>
                    </thead>
                    <tbody>
                      {aquacultureData.costTable.map((row) => (
                        <tr key={row.item} className="border-t border-slate-100">
                          <td className="px-3 py-2 text-slate-800">{row.item}</td>
                          <td className="px-3 py-2 text-slate-600">{row.usage}</td>
                          <td className="px-3 py-2 text-slate-600">{row.unitPrice}</td>
                          <td className="px-3 py-2 text-right font-medium text-slate-900">
                            {row.costYuan}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-emerald-200 bg-emerald-50/60">
                        <td
                          className="px-3 py-2 font-semibold text-slate-900"
                          colSpan={3}
                        >
                          合计
                        </td>
                        <td className="px-3 py-2 text-right text-base font-semibold text-emerald-700">
                          {totalCostYuan} 元
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 text-sm text-emerald-800">
                  折算成本：
                  {findKeyNumber(3, "折算成本")?.valueText ?? "5.51元/斤鱼"}；
                  较传统鲈鱼养殖成本（10-12元/斤鱼）降低45%~54%。
                </div>
              </div>
            </article>

            <article className="overflow-hidden rounded-2xl border border-violet-200/80 bg-gradient-to-br from-violet-50 via-white to-indigo-50 shadow-sm">
              <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500" />
              <div className="p-5 sm:p-6">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                  结论与资料下载
                </h2>

                <ul className="mt-4 space-y-2">
                  {aquacultureData.conclusions.map((conclusion) => (
                    <li
                      key={conclusion.text}
                      className="flex items-start gap-2 text-sm text-slate-700"
                    >
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-violet-500" />
                      <span>
                        {conclusion.text}
                        <span className="ml-1 text-xs text-slate-500">
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
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    下载 PDF 原文
                  </a>
                </div>
              </div>
            </article>
          </section>
        </div>
      ) : null}
    </main>
  );
}
