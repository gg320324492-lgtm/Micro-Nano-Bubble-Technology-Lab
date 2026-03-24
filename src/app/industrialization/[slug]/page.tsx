// src/app/industrialization/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";

import AquacultureTabs from "@/components/AquacultureTabs";
import AquacultureFigureStrip from "@/components/AquacultureFigureStrip";
import IndustrialSectionTabs from "@/components/industrialization/IndustrialSectionTabs";
import ReidDeviceShowcase from "@/components/industrialization/ReidDeviceShowcase";
import LightboxGallery, { GalleryItem } from "@/components/LightboxGallery";
import Container from "@/components/Container";
import { buttonClassName } from "@/components/ui/Button";
import {
  aquaculturePdfFullData,
} from "@/content/aquaculturePdfFullData";
import industrialBases from "@/data/industrialization";
import { assetPath } from "@/lib/assetPath";

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
        src={assetPath(src)}
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
  const isBlackOdorous = slug === "black-odorous-water";
  const isReidDevice = slug === "reid-device-tianjin";
  const aquacultureData = isAquaculture ? aquaculturePdfFullData : null;

  if (isReidDevice) {
    return (
      <main className="py-10">
        <Container>
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Link
              href="/industrialization/"
              className={buttonClassName("primary", "px-4 py-2 text-sm shadow-sm hover:shadow-md")}
            >
              ← 返回产业化列表
            </Link>
            {base.locationUrl ? (
              <a
                href={base.locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClassName("primary", "px-4 py-2 text-sm shadow-sm hover:shadow-md")}
              >
                高德地图导航
              </a>
            ) : null}
          </div>
          <ReidDeviceShowcase base={base} />
        </Container>
      </main>
    );
  }

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

  const sectionThemes = [
    {
      card: "border-sky-400/35 bg-[var(--bg-card)]/95",
      accent: "from-sky-500 to-blue-500",
      title: "text-[var(--text)]",
      body: "text-[var(--text-secondary)]",
      bullet: "bg-sky-500",
    },
    {
      card: "border-emerald-400/35 bg-[var(--bg-card)]/95",
      accent: "from-emerald-500 to-teal-500",
      title: "text-[var(--text)]",
      body: "text-[var(--text-secondary)]",
      bullet: "bg-emerald-500",
    },
    {
      card: "border-violet-400/35 bg-[var(--bg-card)]/95",
      accent: "from-violet-500 to-indigo-500",
      title: "text-[var(--text)]",
      body: "text-[var(--text-secondary)]",
      bullet: "bg-violet-500",
    },
  ] as const;

  const introPanel = (
    <div id="intro">
      {!isBlackOdorous && base.highlightsZh?.length ? (
        <div className="mt-5 overflow-hidden rounded-[var(--radius-lg)] border border-cyan-400/30 bg-[var(--bg-card)]/95 shadow-sm">
          <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500" />
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-600 shadow-sm">
                ✦
              </span>
              <div className="text-lg font-semibold text-[var(--text)]">基地亮点</div>
            </div>

            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {base.highlightsZh.map((x) => (
                <li
                  key={x}
                  className="flex items-start gap-2 rounded-xl border border-cyan-200/60 bg-[var(--bg-elevated)] p-3 text-sm text-[var(--text-secondary)] shadow-sm"
                >
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-500" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {base.sections?.length ? (
        isBlackOdorous ? (
          <IndustrialSectionTabs sections={base.sections} />
        ) : (
          <div className="mt-7 grid gap-4 md:grid-cols-2">
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
                    "group relative overflow-hidden rounded-2xl border p-5 sm:p-6 shadow-sm transition duration-300",
                    "hover:-translate-y-0.5 hover:shadow-md",
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
                      "text-[32px] font-semibold tracking-tight leading-[1.1]",
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
        )
      ) : null}

      {base.gallery?.length ? (
        <div className="mt-9">
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

      <section className="overflow-hidden rounded-[var(--radius-lg)] border border-amber-500/30 bg-amber-500/10">
        <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />
        <div className="p-5 sm:p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
            技术成果展示
          </h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            天津大学微纳米气泡技术在水产养殖场景的验证成果
          </p>

          <div className="mt-5 grid gap-4 rounded-2xl border border-amber-400/40 bg-[var(--bg-card)]/80 p-4 shadow-sm sm:grid-cols-2">
            <div className="group flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600">
                  ①
                </span>
                <h3 className="text-base font-semibold text-[var(--text)]">
                  纯氧纳米气泡 · 高密度养殖
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                鲈鱼高密度养殖 <strong className="text-amber-600">150 kg/m³</strong>，比现有工厂化养殖提高{' '}
                <strong className="text-amber-600">50%</strong>；基地外观、养殖池、智能平台一体化验证。
              </p>
              <a
                href={assetPath("/industrialization/aquaculture/slide-high-density-nanobubble.png")}
                target="_blank"
                rel="noopener noreferrer"
                className="relative mt-auto block aspect-video overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] transition-opacity hover:opacity-90"
              >
                <Image
                  src={assetPath("/industrialization/aquaculture/slide-high-density-nanobubble.png")}
                  alt="纯氧纳米气泡技术用于高密度水产养殖"
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-contain"
                />
              </a>
            </div>

            <div className="group flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600">
                  ②
                </span>
                <h3 className="text-base font-semibold text-[var(--text)]">
                  微纳米气泡发生器 · 水质与品质
                </h3>
              </div>
              <ul className="space-y-1.5 text-sm text-[var(--text-secondary)]">
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  <span>水质稳定：DO ~10 mg/L，氨氮 &lt;4 mg/L</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  <span>免疫与抗氧化：溶菌酶 +30.3%，T-SOD +41.0%</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  <span>营养与鲜味：蛋白质 +17.3%，谷氨酸 +74.5%</span>
                </li>
              </ul>
              <a
                href={assetPath("/industrialization/aquaculture/slide-water-quality-fish-quality.png")}
                target="_blank"
                rel="noopener noreferrer"
                className="relative mt-auto block aspect-video overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] transition-opacity hover:opacity-90"
              >
                <Image
                  src={assetPath("/industrialization/aquaculture/slide-water-quality-fish-quality.png")}
                  alt="微纳米气泡发生器：养殖水质稳定与水产品品质提升"
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-contain"
                />
              </a>
            </div>
          </div>

          <div className="mt-4">
            <AquacultureFigureStrip
              figures={aquacultureData.figures}
              chartMeta={aquacultureData.chartMeta}
              pages={aquacultureData.pages}
            />
          </div>
        </div>
      </section>

    </div>
  ) : null;

  return (
    <main className="py-10">
      <Container>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/industrialization/"
            className={buttonClassName("primary", "px-4 py-2 text-sm shadow-sm hover:shadow-md")}
          >
            ← 返回产业化列表
          </Link>

          {base.locationUrl ? (
            <a
              href={base.locationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClassName("primary", "px-4 py-2 text-sm shadow-sm hover:shadow-md")}
            >
              高德地图导航
            </a>
          ) : null}

          {base.monitorUrl ? (
            <a
              href={base.monitorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClassName("primary", "px-4 py-2 text-sm shadow-sm hover:shadow-md")}
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
