// src/app/research/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";

import Container from "@/components/Container";
import LightboxGallery, { GalleryItem } from "@/components/LightboxGallery";
import Pill from "@/components/ui/Pill";
import Chip from "@/components/ui/Chip";
import LightboxViewer from "@/components/LightboxViewer";
import SectionScrollNav from "@/components/SectionScrollNav";
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

const WATER_EN_SUBTITLE = "Drinking Water Quality Enhancement & Safety Assurance";

const WATER_COPY = {
  heroIntro:
    "团队围绕微纳米气泡（MNBs）及其协同紫外（UV）在饮用水消毒中的应用开展了系统研究，重点聚焦饮用水生物稳定性提升、耐受性微生物灭活强化以及协同消毒机制解析，为饮用水水质提升与安全保障提供了新的技术路径。",
  sectionOverview:
    "研究以 O₃-MNBs 为核心平台，从“生物稳定性改善、耐受性微生物灭活、MNBs/UV 协同消毒及灭菌机理解析”等方面展开系统工作，既关注实验室机理证据，也面向水厂与管网的实际应用需求。",
  module1:
    "研究表明，微纳米气泡可显著提升饮用水的生物稳定性。经不同气源 MNBs 处理后，水中总菌平均去除率达到 66.53%，可生物降解有机碳（BDOC）和可同化有机碳（AOC）浓度分别降低 32% 和 28%，能够有效抑制大肠杆菌等致病菌的增殖与优势化。",
  module2:
    "在耐受性微生物控制方面，MNBs 对耐氯蜡样芽孢杆菌表现出优异的灭活能力。其中，臭氧微纳米气泡（O3-MNBs）处理 10 min 后，对蜡样芽孢杆菌的灭菌率可达 90% 以上，显示出其在饮用水安全保障与强化消毒中的良好应用潜力。",
  module3:
    "从显微形貌观察结果来看，不同气源 MNBs 处理后，细菌细胞出现明显拉伸、皱缩、凹陷、凸起、裂缝、鞭毛分离及内容物泄漏等现象。机制分析表明，MNBs 可通过界面冲击与自由基氧化共同作用，诱导细胞膜破裂、DNA 解旋、蛋白质二级结构改变以及胞内离子泄漏，最终实现高效灭菌。",
  module4:
    "在此基础上，团队进一步完成了微纳米气泡与紫外协同消毒的关键预实验验证。结果表明，自研 MNBs 体系可稳定生成浓度为 2.67×10^6 bubbles/mL、平均粒径为 397 nm、Zeta 电位为 -10.26 mV 的微纳米气泡体系，具有良好的分散性与停留特性，能够满足饮用水消毒过程需求。",
  module5:
    "在活性物种生成方面，UV 辐射可显著强化 MNBs 体系中活性氧的产生，其中 ·OH 平均产量提升 19.44%，反应速率常数提高 28.48%，9 min 时 ·OH 浓度达到 114.95 μmol/L，表明紫外作用能够有效增强微纳米气泡界面的自由基生成能力。",
  module6:
    "在消杀效能方面，针对初始浓度为 10^7-10^8 CFU/mL 的蜡样芽孢杆菌，MNBs/UV 联合体系平均杀菌率达到 78.37%，较单独 UV 提升 31.92%；在最优参数条件下，处理 1 min 的杀菌率即可达到 97.21%，展现出显著的协同增效优势。",
  conclusion:
    "总体来看，微纳米气泡及其协同紫外技术在提升饮用水生物稳定性、强化耐受性微生物灭活以及增强消毒效率等方面均表现出突出优势，具有良好的研究价值与应用前景。",
} as const;

const WATER_HIGHLIGHTS = [
  "生物稳定性改善",
  "耐受性微生物灭活",
  "MNBs/UV 协同消毒",
  "作用机制解析",
] as const;

type MetricItem = {
  label: string;
  value: string;
};

function ResearchHero({
  titleZh,
  titleEn,
  introPrimary,
  introSecondary,
  keywords,
  metrics,
  cover,
  coverFocusY,
}: {
  titleZh: string;
  titleEn: string;
  introPrimary: string;
  introSecondary: string;
  keywords: string[];
  metrics: MetricItem[];
  cover?: string;
  coverFocusY: number;
}) {
  return (
    <section className="relative overflow-hidden">
      {/* 背景机制图 + 轻遮罩与模糊 */}
      <div className="pointer-events-none absolute inset-0">
        {cover ? (
          <Image
            src={assetPath(cover)}
            alt={titleZh}
            fill
            priority
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="object-cover blur-[1.5px] brightness-[0.88]"
            style={{ objectPosition: `center ${coverFocusY}%` }}
          />
        ) : null}
        <div className="absolute inset-0 bg-white/45 backdrop-blur-[1.5px]" />
        <div className="absolute inset-0 [background-image:radial-gradient(circle_at_12%_0%,rgba(129,140,248,0.13),transparent_60%),radial-gradient(circle_at_84%_8%,rgba(56,189,248,0.12),transparent_55%),radial-gradient(circle_at_50%_100%,rgba(129,230,217,0.16),transparent_60%)] opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-deep)]/68 via-[var(--bg-deep)]/46 to-[var(--bg-default)]/96" />
      </div>

      <Container>
        <div className="relative mx-auto flex min-h-[70vh] max-w-[1280px] flex-col justify-start gap-10 pt-20 pb-16 md:pt-24 md:pb-18">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] md:items-start">
            {/* 左侧：标题与简介 */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1 text-[11px] font-medium text-[var(--accent)] ring-1 ring-[var(--accent-soft)]/60 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span className="tracking-[0.24em] uppercase text-[var(--accent)]">
                  Core Research Direction
                </span>
              </div>
              <div className="space-y-3">
                <h1 className="text-[26px] font-semibold leading-tight text-[var(--text-on-strong)] md:text-[30px]">
                  {titleZh}
                </h1>
                <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-[var(--accent-soft)] md:text-xs">
                  {titleEn}
                </div>
              </div>
              <div className="space-y-2 text-sm leading-7 text-[var(--text-secondary)] md:text-[15px] md:max-w-[42rem]">
                <p>{introPrimary}</p>
                <p className="text-[13px] leading-6 text-[var(--text-secondary)] md:text-sm">
                  {introSecondary}
                </p>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {keywords.map((kw) => (
                  <Chip
                    key={kw}
                    size="sm"
                    className="bg-white/92 text-[13px] !border-[var(--border)] !text-[var(--text)] shadow-sm"
                  >
                    {kw}
                  </Chip>
                ))}
              </div>
            </div>

            {/* 右侧：关键指标卡片 */}
            <div className="flex flex-col gap-4 md:items-end">
              <Link
                href="/research"
                className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--bg-card)]/90 px-4 py-2 text-xs font-semibold text-[var(--text)] shadow-sm backdrop-blur hover:bg-[var(--accent-soft)] md:text-sm"
              >
                ← 返回研究方向列表
              </Link>
              <div className="w-full rounded-3xl bg-[var(--bg-elevated)]/80 p-4 shadow-[0_18px_40px_-28px_rgba(15,45,92,0.9)] md:w-full md:max-w-sm">
                <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
                  Key Performance Metrics
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/96 px-3.5 py-3 text-[12px] leading-snug shadow-sm"
                    >
                      <div className="text-[11px] text-[var(--muted)]">{m.label}</div>
                      <div className="mt-1 text-[18px] font-semibold tracking-tight text-[var(--accent)]">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function SectionHeader({
  eyebrowEn,
  titleZh,
  summary,
}: {
  eyebrowEn: string;
  titleZh: string;
  summary?: string;
}) {
  return (
    <header className="space-y-2.5">
      <div className="text-[10px] font-medium uppercase tracking-[0.26em] text-[var(--accent)] md:text-[11px]">
        {eyebrowEn}
      </div>
      <h2 className="text-xl font-semibold text-[var(--text)] md:text-[22px]">
        {titleZh}
      </h2>
      {summary ? (
        <p className="max-w-3xl text-sm leading-7 text-[var(--text-secondary)] md:text-[15px]">
          {summary}
        </p>
      ) : null}
    </header>
  );
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
  const images = item.gallery ?? [];

  const cover = item.cover ?? "";
  const coverFocusY =
    typeof (item as any).coverFocusY === "number" ? (item as any).coverFocusY : 35;
  const video = item.video;

  const gallery: GalleryItem[] = images.map((g) => ({
    src: g.src,
    alt: g.alt,
    caption: g.captionZh,
    focusY: typeof (g as any).focusY === "number" ? (g as any).focusY : 40,
  }));

  const topBullets = bulletsZh.slice(0, 4);
  const coreParagraph = mergeSectionsToParagraph(sections);
  const coreLines = coreParagraph
    .split(/(?<=。)/)
    .map((s) => s.trim())
    .filter(Boolean);
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

  // ✅ 饮用水方向：使用科研叙事化布局与证据链结构
  if (item.slug === "water-quality-safety") {
    const fig1 = images[0];
    const fig2 = images[1];
    const fig3 = images[2];
    const fig4 = images[3];
    const fig5 = images[4];
    const fig6 = images[5];
    const fig7 = images[6];
    const fig8 = images[7];

    const sectionNavItems = [
      { id: "section-bio", label: "生物稳定性提升" },
      { id: "section-disinfection", label: "不同气源强化消毒" },
      { id: "section-mechanism", label: "微纳米气泡灭菌机制" },
      { id: "section-synergy", label: "MNBs/UV 协同预实验" },
      { id: "section-evidence", label: "细胞结构损伤证据" },
      { id: "section-cta", label: "总结与联系" },
    ] as const;

    const metrics: MetricItem[] = [
      { label: "总菌平均去除率", value: "66.53%" },
      { label: "BDOC 降低", value: "32%" },
      { label: "AOC 降低", value: "28%" },
      { label: "O3-MNBs 10 min 灭菌率", value: "> 90%" },
    ];

    return (
      <div className="min-h-screen bg-[var(--bg-default)]">
        {/* 轻度分层背景（更克制的冷色渐变） */}
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(129,140,248,0.10),transparent_60%),radial-gradient(circle_at_bottom,rgba(15,23,42,0.45),transparent_65%)]" />

        {/* Hero 首屏 */}
        <ResearchHero
          titleZh={titleZh}
          titleEn={WATER_EN_SUBTITLE}
          introPrimary={WATER_COPY.heroIntro}
          introSecondary={WATER_COPY.sectionOverview}
          keywords={Array.from(WATER_HIGHLIGHTS)}
          metrics={metrics}
          cover={cover}
          coverFocusY={coverFocusY}
        />

        {/* 正文区域 */}
        <Container>
          <div className="mx-auto max-w-[1280px] px-0 py-10 md:py-16">
            {/* 章节导视：移动端顶部导航 + 桌面端右侧悬浮导航（滚动联动高亮） */}
            <SectionScrollNav items={sectionNavItems} />

            <div className="space-y-12 md:space-y-16">
              {/* Section 1：饮用水生物稳定性提升 */}
              <section
                id="section-bio"
                className="scroll-mt-32 md:scroll-mt-40 rounded-[24px] border border-[var(--border)] bg-[var(--bg-card)]/96 px-5 py-8 shadow-[0_14px_32px_-24px_rgba(15,45,92,0.65)] md:px-8 md:py-10"
              >
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
                  <div className="space-y-5">
                    <SectionHeader
                      eyebrowEn="Biostability of Drinking Water"
                      titleZh="饮用水生物稳定性提升"
                      summary={WATER_COPY.module1}
                    />
                    <p className="text-sm leading-7 text-[var(--text-secondary)] md:text-[15px]">
                      {briefZh}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {[
                        "总菌平均去除率达到 66.53%",
                        "BDOC 降低 32%，AOC 降低 28%",
                        "削弱管网与二次供水再生长潜力",
                      ].map((tag) => (
                        <Pill
                          key={tag}
                          className={[
                            "min-w-0 items-center text-left text-[13px]",
                            theme.bulletPill,
                          ].join(" ")}
                        >
                          {tag}
                        </Pill>
                      ))}
                    </div>
                  </div>

                  <div>
                    {fig1 ? (
                      <LightboxViewer
                        item={{
                          src: fig1.src,
                          alt: fig1.alt,
                          caption: fig1.captionZh,
                          focusY: typeof fig1.focusY === "number" ? fig1.focusY : 50,
                        }}
                        aspect="4/3"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 600px"
                      />
                    ) : null}
                  </div>
                </div>
              </section>

              {/* Section 2：不同气源条件下的强化消毒表现 */}
              <section
                id="section-disinfection"
                className="scroll-mt-32 md:scroll-mt-40 rounded-[24px] border border-[var(--border)] bg-[var(--bg-card)]/94 px-5 py-8 shadow-[0_14px_32px_-24px_rgba(15,45,92,0.55)] md:px-8 md:py-10"
              >
                <div className="space-y-6">
                  <SectionHeader
                    eyebrowEn="Disinfection Performance under Different Gas Sources"
                    titleZh="不同气源条件下的强化消毒表现"
                    summary={`${WATER_COPY.module2} ${WATER_COPY.module3}`}
                  />
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {fig2 ? (
                      <LightboxViewer
                        item={{
                          src: fig2.src,
                          alt: fig2.alt,
                          caption: fig2.captionZh,
                          focusY: typeof fig2.focusY === "number" ? fig2.focusY : 50,
                        }}
                        aspect="4/3"
                      />
                    ) : null}
                    {fig3 ? (
                      <LightboxViewer
                        item={{
                          src: fig3.src,
                          alt: fig3.alt,
                          caption: fig3.captionZh,
                          focusY: typeof fig3.focusY === "number" ? fig3.focusY : 40,
                        }}
                        aspect="4/3"
                      />
                    ) : null}
                  </div>
                  <p className="text-[13px] leading-relaxed text-[var(--text-secondary)] md:text-sm">
                    图 2 侧重于宏观水质指标与杀菌性能，图 3 则通过 SEM / TEM 观察呈现细胞拉伸、皱缩与破裂等微观损伤特征，构成“性能结果 + 微观证据”的完整证据链。
                  </p>
                </div>
              </section>

              {/* Section 3：微纳米气泡的细胞损伤与灭菌机制 */}
              <section
                id="section-mechanism"
                className="scroll-mt-32 md:scroll-mt-40 rounded-[30px] border border-[var(--border-strong)] bg-gradient-to-b from-[var(--bg-elevated)]/80 via-[var(--bg-card)] to-[var(--bg-card)] px-5 py-9 shadow-[0_22px_60px_-34px_rgba(15,23,42,0.9)] md:px-9 md:py-11"
              >
                <div className="space-y-7">
                  <SectionHeader
                    eyebrowEn="Mechanistic Insights of Micro–Nano Bubbles"
                    titleZh="微纳米气泡的细胞损伤与灭菌机制"
                  />
                  <div className="flex flex-wrap gap-2">
                    {[
                      "界面自由基生成",
                      "细胞膜破裂与拉伸变形",
                      "DNA / 蛋白质损伤及胞内物质泄漏",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-[var(--accent-soft)]/70 px-3 py-1 text-xs font-medium text-[var(--accent)] md:text-[13px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4">
                    {fig4 ? (
                      <LightboxViewer
                        item={{
                          src: fig4.src,
                          alt: fig4.alt,
                          caption: fig4.captionZh,
                          focusY: typeof fig4.focusY === "number" ? fig4.focusY : 40,
                        }}
                        aspect="16/9"
                        sizes="(max-width: 768px) 100vw, 1100px"
                      />
                    ) : null}
                  </div>
                  <p className="text-sm leading-7 text-[var(--text-secondary)] md:text-[15px]">
                    研究表明，MNBs 通过界面自由基与物理冲击的协同作用，使细胞膜发生不可逆拉伸与破裂，并诱导 DNA 解旋和蛋白质二级结构改变；在离子泄漏与代谢失衡的共同作用下，细胞逐步失去修复能力，形成稳定而高效的灭菌路径。
                  </p>
                </div>
              </section>

              {/* Section 4：微纳米气泡/紫外协同消毒关键预实验 */}
              <section
                id="section-synergy"
                className="scroll-mt-32 md:scroll-mt-40 rounded-[24px] border border-[var(--border)] bg-[var(--bg-card)]/96 px-5 py-8 shadow-[0_14px_32px_-24px_rgba(15,45,92,0.6)] md:px-8 md:py-10"
              >
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1.1fr)]">
                  <div className="space-y-5">
                    <SectionHeader
                      eyebrowEn="Key Pre-experiments of MNBs/UV Synergistic Disinfection"
                      titleZh="微纳米气泡 / 紫外协同消毒关键预实验"
                      summary={`${WATER_COPY.module4} ${WATER_COPY.module5}`}
                    />
                    <div className="mt-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)]/80 p-4 text-[13px] leading-relaxed text-[var(--text-secondary)] md:text-sm">
                      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                        关键参数摘要（参数 — 性能）
                      </div>
                      <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <div>
                          <dt className="text-[var(--muted)]">气泡浓度</dt>
                          <dd className="text-[var(--text)]">
                            2.67×10^6 bubbles/mL
                          </dd>
                        </div>
                        <div>
                          <dt className="text-[var(--muted)]">平均粒径</dt>
                          <dd className="text-[var(--text)]">397 nm</dd>
                        </div>
                        <div>
                          <dt className="text-[var(--muted)]">Zeta 电位</dt>
                          <dd className="text-[var(--text)]">-10.26 mV</dd>
                        </div>
                        <div>
                          <dt className="text-[var(--muted)]">·OH 提升</dt>
                          <dd className="text-[var(--text)]">19.44%</dd>
                        </div>
                        <div>
                          <dt className="text-[var(--muted)]">反应速率常数提升</dt>
                          <dd className="text-[var(--text)]">28.48%</dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {fig5 ? (
                      <LightboxViewer
                        item={{
                          src: fig5.src,
                          alt: fig5.alt,
                          caption: fig5.captionZh,
                          focusY: typeof fig5.focusY === "number" ? fig5.focusY : 50,
                        }}
                        aspect="4/3"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 420px, 480px"
                      />
                    ) : null}
                    {fig6 ? (
                      <div className="lg:pl-8">
                        <LightboxViewer
                          item={{
                            src: fig6.src,
                            alt: fig6.alt,
                            caption: fig6.captionZh,
                            focusY: typeof fig6.focusY === "number" ? fig6.focusY : 50,
                          }}
                          aspect="4/3"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 360px, 420px"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </section>

              {/* Section 5：协同作用下的细胞结构损伤证据 */}
              <section
                id="section-evidence"
                className="scroll-mt-32 md:scroll-mt-40 rounded-[24px] border border-[var(--border)] bg-[var(--bg-card)]/96 px-5 py-8 shadow-[0_14px_32px_-24px_rgba(15,45,92,0.55)] md:px-8 md:py-10"
              >
                <div className="space-y-6">
                  <SectionHeader
                    eyebrowEn="Evidence of Cellular Structural Damage under Synergistic Action"
                    titleZh="协同作用下的细胞结构损伤证据"
                    summary={WATER_COPY.module6}
                  />
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {fig7 ? (
                      <LightboxViewer
                        item={{
                          src: fig7.src,
                          alt: fig7.alt,
                          caption: fig7.captionZh,
                          focusY: typeof fig7.focusY === "number" ? fig7.focusY : 40,
                        }}
                        aspect="4/3"
                      />
                    ) : null}
                    {fig8 ? (
                      <LightboxViewer
                        item={{
                          src: fig8.src,
                          alt: fig8.alt,
                          caption: fig8.captionZh,
                          focusY: typeof fig8.focusY === "number" ? fig8.focusY : 45,
                        }}
                        aspect="4/3"
                      />
                    ) : null}
                  </div>
                </div>
              </section>

              {/* 底部 CTA */}
              <section
                id="section-cta"
                className="scroll-mt-32 md:scroll-mt-40 rounded-[24px] border border-[var(--border)] bg-[var(--bg-elevated)]/85 px-5 py-9 md:px-9 md:py-10"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-3">
                    <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-[var(--accent)] md:text-xs">
                      Summary / 研究总结
                    </div>
                    <p className="max-w-3xl text-base leading-8 text-[var(--text)] md:text-xl md:leading-9">
                      微纳米气泡及其协同紫外体系在提升饮用水生物稳定性、强化耐受菌灭活与强化消毒效率等方面形成了从性能结果到显微形貌与机制示意的完整证据链，
                      <span className="font-semibold">
                        为饮用水厂提标改造、管网运行安全和再生水深度处理提供了可对接工程参数窗口的技术基础。
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/research"
                      className="inline-flex items-center justify-center rounded-[var(--radius-md)] border border-[var(--accent)] bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--bg-deep)] shadow-sm hover:bg-[var(--accent-hover)]"
                    >
                      返回研究方向列表
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-card)] px-5 py-2.5 text-sm font-medium text-[var(--text)] hover:bg-[var(--accent-soft)]"
                    >
                      联系我们 / 查看相关成果
                    </Link>
                  </div>
                </div>
              </section>

              {/* 页面底部简洁导航 */}
              <div className="flex items-center justify-between pt-2 text-[13px] text-[var(--text-secondary)] md:text-sm">
                <Link
                  href="/research"
                  className={["hover:text-[var(--accent)]", theme.footerLink].join(" ")}
                >
                  ← 返回研究
                </Link>
                <Link
                  href="/"
                  className={["hover:text-[var(--accent)]", theme.footerLink].join(" ")}
                >
                  回到首页 →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // ✅ 针对“饮用水水质提升与安全保障”做定制化科研详情页
  if (item.slug === "water-quality-safety") {
    const fig1 = images[0];
    const fig2 = images[1];
    const fig3 = images[2];
    const fig4 = images[3];
    const fig5 = images[4];
    const fig6 = images[5];
    const fig7 = images[6];
    const fig8 = images[7];

    const renderFigure = (fig: (typeof images)[number] | undefined, priority = false) => {
      if (!fig) return null;
      return (
        <figure className="flex flex-col gap-3">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-elevated)]">
            <Image
              src={assetPath(fig.src)}
              alt={fig.alt || titleZh}
              fill
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              className="object-contain"
            />
          </div>
          {(fig.captionZh || fig.alt) && (
            <figcaption className="px-1 text-xs leading-relaxed text-[var(--text-secondary)]">
              {fig.captionZh || fig.alt}
            </figcaption>
          )}
        </figure>
      );
    };

    return (
      <div className="min-h-screen bg-[var(--bg-default)]">
        {/* Hero 首屏 */}
        <div className="relative">
          <div className="relative h-[260px] w-full overflow-hidden border-b border-[var(--border)] bg-[var(--bg-elevated)] md:h-[320px]">
            {cover ? (
              <Image
                // 饮用水方向封面直接使用 PNG 原图，避免依赖 .main.webp 变体
                src={assetPath(cover)}
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
          {/* 轻量水处理科研感背景纹理 */}
          <div className="pointer-events-none absolute inset-0 opacity-80 [background-image:radial-gradient(circle_at_10%_0%,rgba(129,140,248,0.16),transparent_60%),radial-gradient(circle_at_85%_15%,rgba(56,189,248,0.18),transparent_55%),radial-gradient(circle_at_50%_100%,rgba(129,230,217,0.16),transparent_60%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)]/80 via-[var(--bg-deep)]/40 to-transparent" />
          </div>

          <Container>
            <div className="-mt-16 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg-card)]/95 p-6 shadow-[0_18px_40px_-28px_rgba(15,45,92,0.9)] backdrop-blur md:-mt-20 md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="space-y-3 md:max-w-2xl">
                  <h1 className="text-2xl font-semibold text-[var(--text)] md:text-3xl">
                    {titleZh}
                  </h1>
                  <div className="text-sm font-medium tracking-wide text-[var(--accent)] md:text-base">
                    {WATER_EN_SUBTITLE}
                  </div>
                  <p className="text-sm leading-7 text-[var(--text-secondary)] md:text-base">
                    {WATER_COPY.heroIntro}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-3 md:w-64">
                  <Link
                    href="/research"
                    className={[
                      "inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold shadow-sm whitespace-nowrap md:text-sm",
                      theme.backBtn,
                    ].join(" ")}
                  >
                    ← 返回研究列表
                  </Link>
                  <div className="grid w-full grid-cols-2 gap-2 rounded-2xl bg-[var(--bg-elevated)]/80 p-3 text-xs md:text-sm">
                    {[
                      { label: "总菌平均去除率", value: "66.53%" },
                      { label: "BDOC 降低", value: "32%" },
                      { label: "AOC 降低", value: "28%" },
                      { label: "O3-MNBs 10 min 灭菌率", value: "> 90%" },
                    ].map((m) => (
                      <div
                        key={m.label}
                        className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-3 py-2 text-[10px] leading-snug md:text-xs"
                      >
                        <div className="text-[var(--text-secondary)]">{m.label}</div>
                        <div className="mt-1 text-sm font-semibold text-[var(--accent)] md:text-base">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* 锚点导航 + 正文模块 */}
        <Container>
          <div className="py-10 md:py-14">
            {/* 锚点导航 */}
            <nav className="mb-10">
              <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3 rounded-full bg-[var(--bg-elevated)]/80 px-2 py-2 text-sm md:text-base">
                {[
                  { id: "overview", label: "研究概述" },
                  { id: "bio-stability", label: "生物稳定性" },
                  { id: "disinfection", label: "强化消毒" },
                  { id: "synergy", label: "协同消毒" },
                  { id: "mechanism", label: "作用机制" },
                  { id: "outlook", label: "应用前景" },
                ].map((itemNav, idx) => {
                  const isFirst = idx === 0;
                  const baseCls =
                    "rounded-full px-5 py-2.5 transition-colors whitespace-nowrap";
                  const inactiveCls =
                    "bg-white/40 text-[var(--text-secondary)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]";
                  const activeCls =
                    "bg-[var(--accent-soft)] text-[var(--accent)] shadow-sm";
                  return (
                    <a
                      key={itemNav.id}
                      href={`#${itemNav.id}`}
                      className={[baseCls, isFirst ? activeCls : inactiveCls].join(" ")}
                    >
                      {itemNav.label}
                    </a>
                  );
                })}
              </div>
            </nav>

            {/* Section B 研究概述 */}
            <section
              id="overview"
              className="scroll-mt-32 md:scroll-mt-40 grid grid-cols-1 items-start gap-8 border-b border-[var(--border)] pb-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:pb-14"
            >
              <div className="space-y-4">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                  Research Overview
                </div>
                <h2 className="text-xl font-semibold text-[var(--text)] md:text-2xl">
                  饮用水生物稳定性与安全保障的系统研究
                </h2>
                <p className="text-sm leading-7 text-[var(--text-secondary)] md:text-base">
                  {WATER_COPY.sectionOverview}
                </p>
                <p className="text-sm leading-7 text-[var(--text-secondary)] md:text-base">
                  {briefZh}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {WATER_HIGHLIGHTS.map((h) => (
                  <Pill
                    key={h}
                    className={[
                      "min-w-0 items-start text-left text-xs md:text-sm",
                      theme.bulletPill,
                    ].join(" ")}
                  >
                    {h}
                  </Pill>
                ))}
              </div>
            </section>

            {/* Section C 微纳米气泡改善饮用水生物稳定性 */}
            <section
              id="bio-stability"
              className="scroll-mt-32 md:scroll-mt-40 grid grid-cols-1 items-center gap-10 border-b border-[var(--border)] py-10 md:grid-cols-2 md:py-14"
            >
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[var(--text)] md:text-2xl">
                  微纳米气泡改善饮用水生物稳定性
                </h2>
                <p className="text-sm leading-7 text-[var(--text-secondary)] md:text-base">
                  {WATER_COPY.module1}
                </p>
              </div>
              <div>{renderFigure(fig1, true)}</div>
            </section>

            {/* Section D 不同气源条件下的强化消毒表现 */}
            <section
              id="disinfection"
              className="scroll-mt-32 md:scroll-mt-40 space-y-8 border-b border-[var(--border)] py-10 md:py-14"
            >
              <div className="max-w-3xl space-y-4">
                <h2 className="text-xl font-semibold text-[var(--text)] md:text-2xl">
                  不同气源条件下的强化消毒表现
                </h2>
                <p className="text-sm leading-7 text-[var(--text-secondary)] md:text-base">
                  {WATER_COPY.module2}
                </p>
                <p className="text-sm leading-7 text-[var(--text-secondary)] md:text-base">
                  {WATER_COPY.module3}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {renderFigure(fig2)}
                {renderFigure(fig3)}
              </div>
            </section>

            {/* Section E MNBs 灭菌机制示意 */}
            <section
              id="mechanism"
              className="scroll-mt-32 md:scroll-mt-40 space-y-6 border-b border-[var(--border)] py-10 md:py-14"
            >
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-[var(--text)] md:text-2xl">
                  微纳米气泡的细胞损伤与灭菌机制
                </h2>
                <p className="text-sm leading-7 text-[var(--text-secondary)] md:text-base">
                  MNBs 通过界面自由基生成与物理冲击共同作用于细胞膜与胞内大分子，引起拉伸变形、膜破裂以及 DNA 与蛋白质结构破坏，为后续协同消毒提供机理基础。
                </p>
              </div>

              <div className="rounded-3xl bg-[#F5FAFF] p-5 md:p-7">
                <div className="mb-4 flex flex-wrap gap-2">
                  {["界面自由基生成", "细胞膜破裂与拉伸变形", "DNA / 蛋白质损伤与胞内物质泄漏"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-[var(--accent-soft)]/60 px-3 py-1 text-xs font-medium text-[var(--accent)] md:text-sm"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
                {renderFigure(fig4)}
              </div>
            </section>

            {/* Section F MNBs/UV 协同预实验 + 活性物种与消毒表现 */}
            <section
              id="synergy"
              className="scroll-mt-32 md:scroll-mt-40 space-y-8 border-b border-[var(--border)] py-10 md:py-14"
            >
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-[var(--text)] md:text-2xl">
                  微纳米气泡 / 紫外协同消毒关键预实验
                </h2>
                <p className="text-sm leading-7 text-[var(--text-secondary)] md:text-base">
                  {WATER_COPY.module4}
                </p>
                <p className="text-sm leading-7 text-[var(--text-secondary)] md:text-base">
                  {WATER_COPY.module5}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {renderFigure(fig5)}
                {renderFigure(fig6)}
              </div>
            </section>

            {/* Section G 协同作用下的细胞结构损伤证据 + 机制总图 */}
            <section
              className="space-y-8 border-b border-[var(--border)] py-10 md:py-14"
            >
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-[var(--text)] md:text-2xl">
                  协同作用下的细胞结构损伤证据
                </h2>
                <p className="text-sm leading-7 text-[var(--text-secondary)] md:text-base">
                  {WATER_COPY.module6}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)]">
                <div>{renderFigure(fig7)}</div>
                <div className="rounded-3xl bg-[var(--bg-elevated)]/80 p-4 md:p-6">
                  {renderFigure(fig8)}
                </div>
              </div>
            </section>

            {/* Section H 结论与应用前景 */}
            <section
              id="outlook"
              className="scroll-mt-32 md:scroll-mt-40 space-y-6 pt-10 md:pt-14"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {[
                  "提升饮用水生物稳定性",
                  "强化耐受性微生物灭活",
                  "增强消毒效率并具备应用潜力",
                ].map((card) => (
                  <div
                    key={card}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/95 p-4 text-sm shadow-sm md:p-5 md:text-base"
                  >
                    <div className="mb-2 h-1 w-10 rounded-full bg-gradient-to-r from-[var(--accent)] to-sky-400" />
                    <div className="font-semibold text-[var(--text)]">{card}</div>
                  </div>
                ))}
              </div>
              <p className="max-w-3xl text-sm leading-7 text-[var(--text-secondary)] md:text-base">
                {WATER_COPY.conclusion}
              </p>
            </section>

            {/* 底部链接 */}
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

  // 其他研究方向保持原有的通用详情布局
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

              {coreLines.length ? (
                <div className={["mt-6 rounded-2xl border p-5", theme.overviewWrap].join(" ")}>
                  <div className={["mb-3 h-1.5 w-14 rounded-full", theme.overviewBar].join(" ")} />
                  <div className="text-base font-semibold text-[var(--text)]">核心概览</div>
                  <div className="mt-3 space-y-2 text-sm leading-7 text-[var(--text-secondary)]">
                    {coreLines.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* 视频展示（可选）：放在核心概览之后 */}
              {video?.src ? (
                <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
                  <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] px-5 py-4">
                    <div className="text-base font-semibold text-[var(--text)]">
                      {video.titleZh || "视频"}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-black/5">
                      <video
                        controls
                        playsInline
                        preload="metadata"
                        poster={video.poster ? assetPath(video.poster) : undefined}
                        className="h-auto w-full"
                      >
                        <source src={assetPath(video.src)} type="video/mp4" />
                      </video>
                    </div>

                    {video.captionZh ? (
                      <div className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                        {video.captionZh}
                      </div>
                    ) : null}
                  </div>
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
