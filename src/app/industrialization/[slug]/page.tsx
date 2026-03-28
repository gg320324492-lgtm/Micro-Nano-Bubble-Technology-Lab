// src/app/industrialization/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const AquacultureTabs = dynamic(() => import("@/components/AquacultureTabs"));
const AquacultureFigureStrip = dynamic(() => import("@/components/AquacultureFigureStrip"));
const IndustrialSectionTabs = dynamic(() => import("@/components/industrialization/IndustrialSectionTabs"));
const ReidDeviceShowcase = dynamic(() => import("@/components/industrialization/ReidDeviceShowcase"));
const LightboxGallery = dynamic(() => import("@/components/LightboxGallery"));

import type { GalleryItem } from "@/components/LightboxGallery";
import Container from "@/components/Container";
import { buttonClassName } from "@/components/ui/Button";
import industrialBases, { IndustrialBase } from "@/data/industrialization";
import { assetPath } from "@/lib/assetPath";
import { industrialSectionThemes } from "@/lib/themePresets";

export const dynamicParams = false;
export function generateStaticParams() {
  return industrialBases.map((b) => ({ slug: String(b.slug) }));
}

// ── 黑臭水体专属 Hero ──────────────────────────────────────────────
function BlackOdorousHero({ base }: { base: IndustrialBase }) {
  const stats = [
    { label: "COD 削减", value: "21�?8%", color: "from-cyan-400 to-sky-500" },
    { label: "氨氮削减", value: "�?3%", color: "from-emerald-400 to-teal-500" },
    { label: "叶绿素去�?, value: "71.5%", color: "from-violet-400 to-purple-500" },
    { label: "处理时长", value: "10 min", color: "from-amber-400 to-orange-500" },
  ];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50 shadow-lg">
      <div className="absolute inset-x-0 top-0 z-20 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500" />

      <div className="relative h-[440px] w-full md:h-[520px]">
        {base.cover ? (
          <Image
            src={assetPath(base.cover)}
            alt={base.titleZh}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="object-cover brightness-[0.6]"
          />
        ) : null}

        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/70 to-white/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/85 via-transparent to-transparent" />

        <div className="relative z-10 flex h-full flex-col justify-end gap-6 p-5 md:p-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl rounded-2xl border border-blue-200 bg-white/95 shadow-md p-4 backdrop-blur-sm md:p-6">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-300 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700">
              Industrialization · Black-Odorous Water Remediation
            </div>

            <h1 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-slate-900 md:text-5xl">
              {base.titleZh}
            </h1>

            {base.titleEn ? (
              <div className="mt-2 text-sm tracking-wide text-slate-600 md:text-base">{base.titleEn}</div>
            ) : null}

            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-[15px]">{base.briefZh}</p>

            {base.highlightsZh?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {base.highlightsZh.map((h) => (
                  <span
                    key={h}
                    className="rounded-full border border-blue-300 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                  >
                    {h}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="grid w-full gap-2 sm:grid-cols-2 lg:w-[280px] lg:grid-cols-1">
            {stats.map((item) => (
              <article
                key={item.label}
                className="rounded-xl border border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`text-2xl font-black tabular-nums bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                  {item.value}
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">{item.label}</div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 黑臭水体：移动端指标条（Hero 外，仅小屏显示）─────────────────
function BlackOdorousMetricsBar() {
  const stats = [
    { label: "COD 削减",  value: "21�?8%", color: "text-cyan-600" },
    { label: "氨氮削减",  value: "�?3%",   color: "text-emerald-600" },
    { label: "叶绿素去�?, value: "71.5%", color: "text-violet-600" },
    { label: "处理时长",  value: "10 min", color: "text-amber-600" },
    { label: "总磷削减",  value: "17�?7%", color: "text-sky-600" },
    { label: "浊度下降",  value: ">25%",   color: "text-teal-600" },
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-sm lg:hidden">
      <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500" />
      <div className="grid grid-cols-3 divide-x divide-[var(--border)] sm:grid-cols-6">
        {stats.map((s) => (
          <div key={s.label} className="px-3 py-3 text-center">
            <div className={`text-xl font-black tabular-nums ${s.color}`}>{s.value}</div>
            <div className="mt-0.5 text-[10px] font-medium text-[var(--muted)] leading-tight">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 黑臭水体：技术路线卡�?────────────────────────────────────────
function BlackOdorousTechCards() {
  const cards = [
    {
      step: "01",
      icon: "�?,
      title: "臭氧微纳米气�?,
      subtitle: "前端快速降�?,
      color: "from-cyan-500 to-sky-500",
      border: "border-cyan-400/30",
      bg: "bg-cyan-500/6",
      points: [
        "强化传质与氧化反�?,
        "快速削�?COD、氨�?,
        "有效控藻除臭",
        "10 min 内显著见�?,
      ],
    },
    {
      step: "02",
      icon: "🌬�?,
      title: "长距离低能耗曝�?,
      subtitle: "后端持续稳水",
      color: "from-emerald-500 to-teal-500",
      border: "border-emerald-400/30",
      bg: "bg-emerald-500/6",
      points: [
        "维持底层溶解�?,
        "恢复好氧微生物活�?,
        "抑制底泥内源释放",
        "降低返黑返臭风险",
      ],
    },
    {
      step: "03",
      icon: "🔄",
      title: "闭环协同治理",
      subtitle: "快治 + 稳水体系",
      color: "from-violet-500 to-indigo-500",
      border: "border-violet-400/30",
      bg: "bg-violet-500/6",
      points: [
        "上覆水净�?+ 底层稳氧",
        "内源控制闭环机制",
        "巡航 / 定点 / 常态化可组�?,
        "兼顾考核效果与长期生�?,
      ],
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map((c) => (
        <div
          key={c.step}
          className={`relative overflow-hidden rounded-2xl border ${c.border} ${c.bg} p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
        >
          <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${c.color}`} />
          <div className="flex items-start justify-between">
            <div>
              <div className={`text-[11px] font-black uppercase tracking-widest bg-gradient-to-r ${c.color} bg-clip-text text-transparent`}>
                Step {c.step}
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-2xl">{c.icon}</span>
                <div>
                  <div className="text-[15px] font-bold text-[var(--text)] leading-tight">{c.title}</div>
                  <div className="text-xs text-[var(--muted)]">{c.subtitle}</div>
                </div>
              </div>
            </div>
          </div>
          <ul className="mt-4 space-y-2">
            {c.points.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                <span className={`mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br ${c.color}`} />
                {p}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ── 通用封面 Hero ──────────────────────────────────────────────────
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
            当前 slug：{slug || "(�?"}
          </p>
          <div className="mt-6 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-card)] p-5">
            <div className="font-semibold text-[var(--text)]">可用 slug（点击直达）</div>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--text-secondary)]">
              {industrialBases.map((b) => (
                <li key={b.slug}>
                  <Link className="underline" href={`/industrialization/${String(b.slug)}/`}>
                    {String(b.slug)}
                  </Link>{" "}
                  —�?{b.titleZh}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <Link
              href="/industrialization/"
              className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--accent-soft)]"
            >
              �?返回产业化列�?
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  const isAquaculture = slug === "aquaculture";
  const isBlackOdorous = slug === "black-odorous-water";
  const isReidDevice = slug === "reid-device-tianjin";
  const aquacultureData = isAquaculture
    ? (await import("@/content/aquaculturePdfFullData")).aquaculturePdfFullData
    : null;

  if (isReidDevice) {
    return (
      <main className="py-10">
        <Container>
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Link
              href="/industrialization/"
              className={buttonClassName("primary", "px-4 py-2 text-sm shadow-sm hover:shadow-md")}
            >
              �?返回产业化列�?
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
          value: findKeyNumber(1, "谷氨酸提�?)?.valueText ?? "�?4.5%",
          detail: "鲜味核心指标对比市场鱼显著提�?,
        },
        {
          title: "免疫与抗氧化",
          value: findKeyNumber(1, "T-SOD提升")?.valueText ?? "�?1.0%",
          detail: "溶菌酶、T-SOD同步提升",
        },
        {
          title: "辣椒产量提升",
          value: findKeyNumber(2, "产量提升（养殖肥水）")?.valueText ?? "�?12.2%",
          detail: "相较清水组，增产效果明显",
        },
        {
          title: "养殖成本",
          value: findKeyNumber(3, "折算成本")?.valueText ?? "5.51�?斤鱼",
          detail: "较传统鲈鱼养殖成本降�?5%~54%",
        },
      ]
    : [];

  const sectionThemes = industrialSectionThemes;
  const baseSections = base.sections ?? [];

  const introPanel = (
    <div id="intro">
      {isBlackOdorous ? (
        base.sections?.length ? <IndustrialSectionTabs sections={base.sections} /> : null
      ) : isAquaculture ? (
        <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50 shadow-lg">
          <div className="h-1 w-full bg-gradient-to-r from-[var(--accent)] via-[var(--accent-secondary)] to-[#22c55e]" />
          <div className="space-y-6 p-5 sm:p-6">
            {base.highlightsZh?.length ? (
              <div className="rounded-2xl border border-[var(--border)] bg-white/80 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">�?/span>
                  <h2 className="text-lg font-semibold text-[var(--text)]">基地亮点</h2>
                </div>
                <ul className="grid gap-2 md:grid-cols-2">
                  {base.highlightsZh.map((x) => (
                    <li key={x} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent-secondary)]" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {baseSections.length ? (
              <div className="grid gap-4 md:grid-cols-2">
                {baseSections.map((s, idx) => {
                  const theme = sectionThemes[idx % sectionThemes.length];
                  const lastOddSpan = baseSections.length % 2 === 1 && idx === baseSections.length - 1;
                  return (
                    <section
                      key={s.titleZh}
                      className={[
                        "rounded-2xl border bg-white/85 p-5",
                        theme.card,
                        lastOddSpan ? "md:col-span-2" : "",
                      ].join(" ")}
                    >
                      <div className={["mb-3 h-1 w-full rounded-full bg-gradient-to-r", theme.accent].join(" ")} />
                      <h3 className={["text-[1.95rem] leading-none font-semibold tracking-tight", theme.title].join(" ")}>{s.titleZh}</h3>
                      <p className={["mt-3 text-sm leading-relaxed", theme.body].join(" ")}>{s.bodyZh}</p>
                      {s.bulletsZh?.length ? (
                        <ul className="mt-4 space-y-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)]/70 p-3">
                          {s.bulletsZh.map((b) => (
                            <li key={b} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                              <span className={["mt-1.5 h-2 w-2 shrink-0 rounded-full", theme.bullet].join(" ")} />
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
          </div>
        </section>
      ) : (
        <>
          {base.highlightsZh?.length ? (
            <div className="mt-5 overflow-hidden rounded-[var(--radius-lg)] border border-cyan-400/30 bg-[var(--bg-card)]/95 shadow-sm">
              <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500" />
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-600 shadow-sm">�?/span>
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

          {baseSections.length ? (
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {baseSections.map((s, idx) => {
                const theme = sectionThemes[idx % sectionThemes.length];
                const lastOddSpan = baseSections.length % 2 === 1 && idx === baseSections.length - 1;
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
                    <div className={["absolute inset-x-0 top-0 h-1 bg-gradient-to-r", theme.accent].join(" ")} />
                    <h2 className={["text-[20px] font-semibold tracking-tight leading-[1.2]", theme.title].join(" ")}>
                      {s.titleZh}
                    </h2>
                    <p className={["mt-2 text-sm leading-relaxed", theme.body].join(" ")}>
                      {s.bodyZh}
                    </p>
                    {s.bulletsZh?.length ? (
                      <ul className="mt-4 space-y-2">
                        {s.bulletsZh.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                            <span className={["mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full", theme.bullet].join(" ")} />
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
        </>
      )}

      {!isBlackOdorous && base.gallery?.length ? (
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
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
            成果总览
          </h2>
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
                <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">{kpi.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[var(--radius-lg)] border border-amber-500/30 bg-amber-500/10">
        <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />
        <div className="p-5 sm:p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">技术成果展�?/h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            天津大学微纳米气泡技术在水产养殖场景的验证成�?
          </p>
          <div className="mt-5 grid gap-4 rounded-2xl border border-amber-400/40 bg-[var(--bg-card)]/80 p-4 shadow-sm sm:grid-cols-2">
            <div className="group flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600">�?/span>
                <h3 className="text-base font-semibold text-[var(--text)]">纯氧纳米气泡 · 高密度养�?/h3>
              </div>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                鲈鱼高密度养�?<strong className="text-amber-600">150 kg/m³</strong>，比现有工厂化养殖提高{' '}
                <strong className="text-amber-600">50%</strong>；基地外观、养殖池、智能平台一体化验证�?
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
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600">�?/span>
                <h3 className="text-base font-semibold text-[var(--text)]">微纳米气泡发生器 · 水质与品�?/h3>
              </div>
              <ul className="space-y-1.5 text-sm text-[var(--text-secondary)]">
                <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" /><span>水质稳定：DO ~10 mg/L，氨�?&lt;4 mg/L</span></li>
                <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" /><span>免疫与抗氧化：溶菌酶 +30.3%，T-SOD +41.0%</span></li>
                <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" /><span>营养与鲜味：蛋白�?+17.3%，谷氨酸 +74.5%</span></li>
              </ul>
              <a
                href={assetPath("/industrialization/aquaculture/slide-water-quality-fish-quality.png")}
                target="_blank"
                rel="noopener noreferrer"
                className="relative mt-auto block aspect-video overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] transition-opacity hover:opacity-90"
              >
                <Image
                  src={assetPath("/industrialization/aquaculture/slide-water-quality-fish-quality.png")}
                  alt="微纳米气泡发生器：养殖水质稳定与水产品品质提�?
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

  // ── 黑臭水体专属布局 ──────────────────────────────────────────────
  if (isBlackOdorous) {
    return (
      <main className="py-10 pb-20">
        <Container>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/industrialization/"
              className={buttonClassName("primary", "px-4 py-2 text-sm shadow-sm hover:shadow-md")}
            >
              �?返回产业化列�?
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

          <div className="mt-6">
            <BlackOdorousHero base={base} />
          </div>

          <div className="mt-6">
            <BlackOdorousMetricsBar />
          </div>

          <div className="mt-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">技术路�?/span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
            </div>
            <BlackOdorousTechCards />
          </div>

          <div className="mt-4">
            {introPanel}
          </div>

          {base.gallery?.length ? (
            <div className="mt-10">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">现场图集</span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
              </div>
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
                  )
                }
              />
            </div>
          ) : null}
        </Container>
      </main>
    );
  }

  // ── 通用布局 ─────────────────────────────────────────────────────
  return (
    <main className="py-10">
      <Container>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/industrialization/"
            className={buttonClassName("primary", "px-4 py-2 text-sm shadow-sm hover:shadow-md")}
          >
            �?返回产业化列�?
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

        {isAquaculture ? (
          <section className="relative mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50 shadow-lg">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--accent)] via-[var(--accent-secondary)] to-[#f59e0b]" />
            <div className="absolute -right-12 top-8 h-36 w-36 rounded-full bg-[var(--accent)]/15 blur-3xl" />
            <div className="absolute -left-12 bottom-8 h-36 w-36 rounded-full bg-[var(--accent-secondary)]/15 blur-3xl" />

            <div className="relative p-4 md:p-6">
              <div className="relative h-52 w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] md:h-64">
                {base.cover ? (
                  <Image
                    src={assetPath(base.cover)}
                    alt={base.titleZh}
                    fill
                    loading="eager"
                    fetchPriority="high"
                    sizes="100vw"
                    className="object-cover"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  水产养殖 · 微纳米气泡应�?
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <h1 className="text-4xl font-semibold tracking-tight text-[var(--text)] md:text-5xl">{base.titleZh}</h1>
                  {base.titleEn ? (
                    <div className="mt-1 text-sm text-[var(--muted)] md:text-base">{base.titleEn}</div>
                  ) : null}
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">{base.briefZh}</p>
                  {base.locationZh ? (
                    <div className="mt-3 text-sm text-[var(--text-secondary)]">
                      <span className="font-medium text-[var(--text)]">位置/说明�?/span>
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

                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  <article className="rounded-2xl border border-[var(--border)] bg-white/80 p-3 shadow-sm">
                    <div className="text-xs text-[var(--muted)]">养殖密度</div>
                    <div className="mt-1 text-2xl font-bold text-[var(--accent)]">150 kg/m³</div>
                  </article>
                  <article className="rounded-2xl border border-[var(--border)] bg-white/80 p-3 shadow-sm">
                    <div className="text-xs text-[var(--muted)]">谷氨酸提�?/div>
                    <div className="mt-1 text-2xl font-bold text-[var(--accent-secondary)]">74.5%</div>
                  </article>
                  <article className="rounded-2xl border border-[var(--border)] bg-white/80 p-3 shadow-sm">
                    <div className="text-xs text-[var(--muted)]">成本折算</div>
                    <div className="mt-1 text-2xl font-bold text-[#f59e0b]">5.51�?斤鱼</div>
                  </article>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="mt-6">
            <CoverHero src={base.cover} alt={base.titleZh} />
            <div className="mt-5">
              <h1 className="text-3xl font-semibold tracking-tight">{base.titleZh}</h1>
              {base.titleEn ? (
                <div className="mt-1 text-sm text-[var(--muted)]">{base.titleEn}</div>
              ) : null}
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{base.briefZh}</p>
              {base.locationZh ? (
                <div className="mt-3 text-sm text-[var(--text-secondary)]">
                  <span className="font-medium text-[var(--text)]">位置/说明�?/span>
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
        )}

        {isAquaculture && resultsPanel ? (
          <AquacultureTabs introPanel={introPanel} resultsPanel={resultsPanel} />
        ) : (
          introPanel
        )}
      </Container>
    </main>
  );
}  
