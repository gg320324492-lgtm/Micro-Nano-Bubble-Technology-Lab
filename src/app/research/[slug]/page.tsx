// src/app/research/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";

import Container from "@/components/Container";
import LightboxGallery, { GalleryItem } from "@/components/LightboxGallery";
import Pill from "@/components/ui/Pill";
import Chip from "@/components/ui/Chip";
import ResearchModuleSwitcher from "@/components/research/ResearchModuleSwitcher";
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
    <section className="relative overflow-x-clip overflow-y-visible">
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
        <div className="relative mx-auto flex min-h-[70vh] max-w-[1280px] flex-col justify-start gap-8 pt-20 pb-16 md:gap-10 md:pt-24 md:pb-18">
          {/* 主标题独占整行宽度，便于中文标题单行水平展开，避免被右栏挤压换行 */}
          <div className="min-w-0 space-y-5">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1 text-[11px] font-medium text-[var(--accent)] ring-1 ring-[var(--accent-soft)]/60 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span className="tracking-[0.24em] uppercase text-[var(--accent)]">
                  Core Research Direction
                </span>
              </div>
              <Link
                href="/research"
                className="ml-auto inline-flex w-fit shrink-0 items-center rounded-full border border-[var(--border)] bg-[var(--bg-card)]/90 px-4 py-2 text-xs font-semibold text-[var(--text)] shadow-sm backdrop-blur hover:bg-[var(--accent-soft)] md:text-sm"
              >
                ← 返回研究方向列表
              </Link>
            </div>
            <div className="space-y-3">
              <h1 className="max-w-full text-[26px] font-semibold leading-tight text-[var(--text-on-strong)] md:text-[28px] md:whitespace-nowrap lg:text-[30px]">
                {titleZh}
              </h1>
              <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-[var(--accent-soft)] md:text-xs">
                {titleEn}
              </div>
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-[minmax(0,1.6fr)_minmax(0,0.95fr)] md:items-stretch">
            {/* 左侧：简介与关键词 */}
            <div className="min-w-0 space-y-5">
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
                    className="bg-white/92 text-[13px] !border-[var(--border)] !text-[var(--text)] shadow-sm transition-all duration-200 hover:bg-[var(--accent-soft)]/90 hover:!text-[var(--accent)] hover:-translate-y-0.5 hover:shadow-md"
                  >
                    {kw}
                  </Chip>
                ))}
              </div>
            </div>

            {/* 右侧：关键指标卡片顶部与左侧简介首行平齐 */}
            <div className="flex min-w-0 flex-col md:h-full md:justify-start md:items-end">
              <div className="w-full shrink-0 rounded-3xl bg-[var(--bg-elevated)]/80 p-4 shadow-[0_18px_40px_-28px_rgba(15,45,92,0.9)] md:w-full md:max-w-sm">
                <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
                  Key Performance Metrics
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/96 px-3.5 py-3 text-[12px] leading-snug shadow-sm transition-all duration-200 hover:border-[var(--accent-soft)] hover:bg-[var(--accent-soft)]/10 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="text-[11px] text-[var(--muted)]">{m.label}</div>
                      <div className="mt-1 text-[18px] font-semibold tracking-tight text-[var(--accent)] transition-transform duration-200">
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
    const metrics: MetricItem[] = [
      { label: "研究板块", value: "5 个" },
      { label: "技术路线", value: "MNBs—协同消毒" },
      { label: "研究对象", value: "生物稳定性—耐受菌" },
      { label: "应用场景", value: "水厂—管网—二供" },
    ];

    return (
      <div className="min-h-screen bg-[var(--bg-default)]">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(129,140,248,0.10),transparent_60%),radial-gradient(circle_at_bottom,rgba(15,23,42,0.45),transparent_65%)]" />

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

        <Container>
          <div className="mx-auto max-w-[1280px] px-0 py-10 md:py-16">
            <ResearchModuleSwitcher
              modules={[
                {
                  moduleId: "water-module-1",
                  moduleTitle: "二次供水系统中微纳米气泡对水质生物稳定性的影响机制",
                  summary: "",
                  sections: [],
                  contentStacks: [
                    {
                      id: "water-module-1-stack-1",
                      cardTitle: "不同气源微纳米气泡对二次供水水箱生物稳定性的提升",
                      sections: [
                        {
                          id: "water-module-1-section-1",
                          label: "处理效果与关键指标",
                          content:
                            "不同气源（N2、空气、O2、O3）微纳米气泡均可提升二次供水生物稳定性。对 BDOC、AOC 和总菌的平均降解率分别达到 42.74%、49.49% 和 51.32%，其中空气气源在有机物去除与杀菌效率方面表现更优。研究同时观察到总菌变化相对营养物质变化存在约 3 周滞后，且处理后浊度、TDS 下降、DO 上升，整体水质明显改善。",
                        },
                        {
                          id: "water-module-1-section-2",
                          label: "微生物群落机制解析",
                          content:
                            "群落分析表明，微纳米气泡可同时作用于“菌群结构-功能代谢-营养基质”三条路径：一方面对 Proteobacteria、Planctomycetota 等关键类群具有显著抑制作用，其中 Acinetobacter 去除率可达 100%；另一方面通过提升氧化胁迫水平（尤其在 O2-MNBs 下），促进 ·OH 对脂质、蛋白质与核酸的氧化损伤，抑制转录与代谢功能。与此同时，气泡溃灭生成的 ·OH 可降解有机质，进一步削弱微生物营养来源与再生能力。",
                        },
                      ],
                      images: [
                        {
                          src: "/research/water-quality-safety/module1-card-3.png",
                          alt: "BDOC、AOC与总菌变化及动力学分析图",
                          caption: "图1 不同气源和超声波条件下微纳米气泡对水中生物稳定性指标的影响",
                          focusY: 50,
                        },
                        {
                          src: "/research/water-quality-safety/module1-card-2.png",
                          alt: "微生物群落与共现网络分析图",
                          caption: "图2 微生物群落结构差异分析：（a）PCA；（b）门水平组成；（c）样本间物种分布差异。",
                          focusY: 50,
                        },
                        {
                          src: "/research/water-quality-safety/module1-card-1.png",
                          alt: "微纳米气泡作用机制示意图",
                          caption: "图3 不同气源微纳米气泡处理后藻密度及抑藻率的变化",
                          focusY: 50,
                        },
                      ],
                    },
                    {
                      id: "water-module-1-stack-2",
                      cardTitle: "不同气源微纳米气泡对饮用水中大肠杆菌入侵风险控制机制",
                      sections: [
                        {
                          id: "water-module-1-card2-section-1",
                          label: "入侵对水质与微生物群落的影响",
                          content:
                            "大肠杆菌入侵会显著破坏供水系统稳定性：浊度上升 5.19%、DO 下降 2.66%、总菌数增加 6.25%。群落层面，优势菌由 Alphaproteobacteria 转向 Gammaproteobacteria。微纳米气泡可通过增强 ·OH 氧化胁迫干预该演替过程，抑制蛋白转录（-7.89%）与能量代谢（-6.68%），并削弱 DNA 修复能力，最终使 Gammaproteobacteria 相对丰度下降 47.6%，Caldisericia 消失。",
                        },
                        {
                          id: "water-module-1-card2-section-2",
                          label: "微纳米气泡处理下的水质恢复与灭活效应",
                          content:
                            "入侵后采用微纳米气泡处理可快速恢复水质：浊度与 TDS 分别下降 53.95% 和 8.46%，DO 提升 11.12%。其中 O3-MNBs 对浊度恢复最优（0.42 NTU），O2-MNBs 对 DO 提升最优（11.84 mg/L）。同时总菌数下降 66.53%，并通过降低异常富集、重塑群落多样性来抑制大肠杆菌优势化，实现水质与生态双重恢复。",
                        },
                      ],
                      images: [
                        {
                          src: "/research/water-quality-safety/module1-card2-bacteria-ecoli.png",
                          alt: "大肠杆菌入侵后细菌数量、降解率及回归分析",
                          caption: "图1 不同气源条件下微纳米气泡处理对总菌和大肠杆菌的影响",
                          focusY: 50,
                        },
                        {
                          src: "/research/water-quality-safety/module1-card2-cog-abundance.png",
                          alt: "微生物群落功能基因相对丰度",
                          caption: "图2 微生物群落COG功能统计",
                          focusY: 50,
                        },
                        {
                          src: "/research/water-quality-safety/module1-card2-mnb-mechanism.png",
                          alt: "微纳米气泡对大肠杆菌入侵的调控机制示意",
                          caption: "图3 微纳米气泡对大肠杆菌入侵的调控机制示意图",
                          focusY: 48,
                        },
                      ],
                    },
                    {
                      id: "water-module-1-stack-3",
                      cardTitle: "微纳米气泡对二次供水管道生物膜与水质的影响机制",
                      sections: [
                        {
                          id: "water-module-1-card3-section-1",
                          label: "实验体系与生物膜生长三阶段调控",
                          content:
                            "研究在末端管道水力条件下构建生物膜形成模型，并划分为缓慢生长（0-27 d）、快速生长（27-42 d）和动态稳定（42-66 d）三个阶段。结果显示，MNBs 在前两阶段抑膜作用最显著，O2-MNBs 条件下生物膜干重最高可降低 77.87%。机理上，SP 阶段以物理阻隔与化学氧化为主，RP 阶段以氧化失活为主，DP 阶段则由吸附-冲刷过程主导。",
                        },
                        {
                          id: "water-module-1-card3-section-2",
                          label: "物理—化学协同机制与水质效应",
                          content:
                            "MNBs 通过“物理冲击 + 化学氧化”协同抑制生物膜：可降低 EPS 含量、改变膜层形貌并重塑优势菌结构，关键菌 Planctomycetes 灭活率达到 54.22%-61.66%。在 O2-MNBs 条件下，早中期抑膜最明显。水质层面，处理后浊度下降 24.53%、DO 提升 18.8%、TOC 降解率达 87.93%。总体上，MNBs 可同时削弱附着生长与营养支撑，降低不可逆粘附风险，具备管网生物膜控制与水质保障的应用潜力。",
                        },
                      ],
                      images: [
                        {
                          src: "/research/water-quality-safety/module1-card3-water-quality-lines.png",
                          alt: "羟基自由基、粒径、Zeta 电位、浊度与 TOC 随时间变化",
                          caption:
                            "图1 微纳米气泡特性及水质指标变化：（a）·OH浓度；（b）MNBs粒径；（c）MNBs zeta电位（d）浊度；（e）TOC",
                          focusY: 50,
                        },
                        {
                          src: "/research/water-quality-safety/module1-card3-microbiome-panels.png",
                          alt: "生物膜微生物群落组成与多样性分析",
                          caption:
                            "图2 不同气源 MNBs 条件下生物膜微生物群落分析：（a）门水平组成；（b）PCA；（c）统计比较；（d）多样性指数。",
                          focusY: 50,
                        },
                        {
                          src: "/research/water-quality-safety/module1-card3-biofilm-mechanism.png",
                          alt: "生物膜生长三阶段与微纳米气泡作用机制示意",
                          caption:
                            "图3 SEM结构方程分析:（a）MNB发展对水质和生物膜调节的SEM结构方程;（b）MNB在不同阶段调节生物膜生长的机制示意图",
                          focusY: 45,
                        },
                      ],
                    },
                  ],
                },
                {
                  moduleId: "water-module-2",
                  moduleTitle: "不同气源微纳米气泡对饮用水中典型耐氯菌蜡样芽孢杆菌的消杀机制",
                  summary: "",
                  sections: [],
                  contentStacks: [
                    {
                      id: "water-module-2-stack-1",
                      cardTitle: "不同气源微纳米气泡对饮用水中典型耐氯菌蜡样芽孢杆菌的消杀机制",
                      sections: [
                        {
                          id: "water-module-2-section-1",
                          label: "处理效果与形貌证据",
                          content:
                            "研究表明，空气、氮气和臭氧微纳米气泡均可有效灭活蜡样芽孢杆菌。在处理 1 min 后，细菌的平均灭活率为 60.09%，且灭活效率随处理时间延长逐渐提高。经过 9 min 处理，空气 MNBs 对蜡样芽孢杆菌的灭活效率达到 84.77%；而 O3 与 N2 MNBs 的灭活效率均超过 99%，表现出更显著的强化消毒效果。显微形貌观察显示，不同气源 MNBs 处理后，细菌细胞出现明显拉伸、皱缩、凹陷、凸起、裂缝、鞭毛分离及内容物泄漏等现象。",
                        },
                        {
                          id: "water-module-2-section-2",
                          label: "作用机制解析",
                          content:
                            "机制分析表明，MNBs 溃灭过程中产生的冲击波和微射流可有效分散细菌群体并抑制细菌间协同作用。与此同时，气泡溃灭产生的 ·OH 一方面降解溶液中的 TOC、抑制细菌活性；另一方面与细菌细胞表面、膜结构及胞内成分发生反应，进而诱导细胞膜破裂、DNA 解旋、蛋白质二级结构改变以及胞内离子泄漏，最终实现高效灭菌。",
                        },
                      ],
                      images: [
                        {
                          src: "/research/water-quality-safety/module2-fig1.png",
                          alt: "不同气源微纳米气泡处理蜡样芽孢杆菌菌液的效果",
                          caption:
                            "图1 不同气源微纳米气泡处理蜡样芽孢杆菌菌液的效果：（a）杀菌效率；（b）总有机碳含量；（c）氧化还原电位；（d）pH 变化。",
                          focusY: 50,
                        },
                        {
                          src: "/research/water-quality-safety/module2-fig2.png",
                          alt: "不同气源微纳米气泡处理前后细菌形貌变化的电镜图像",
                          caption:
                            "图2 不同气源微纳米气泡处理前后细菌形貌变化的电镜图像，对比对照组与各气源处理组的细胞变形与破裂特征。",
                          focusY: 45,
                        },
                        {
                          src: "/research/water-quality-safety/module2-fig3.png",
                          alt: "微纳米气泡作用下细胞损伤与分子变化机理示意图",
                          caption:
                            "图3 微纳米气泡作用下细胞膜破裂、DNA 解旋及蛋白质结构改变等过程的机理示意图。",
                          focusY: 45,
                        },
                      ],
                    },
                    {
                      id: "water-module-2-stack-2",
                      cardTitle: "微纳米气泡/紫外协同对蜡样芽孢杆菌的消杀机制",
                      stackSummary:
                        "研究发现，UV 照射通过界面电荷重组与粒径动态重构显著优化了 MNBs 的物理化学特性：气泡平均浓度降低 15.26%，Zeta 电位绝对值下降 33.44%，并促进亚 200 nm 小气泡与超 800 nm 大气泡生成，进而增强空化效应与 ROS 生成。MNBs 水中 ·OH 浓度呈较好的零级动力学增加趋势，反应速率常数为 1.51 μmol·L-1·min-1，最高浓度为 90.99 μmol·L-1；UV 照射后该速率常数提高 28.48%，最高浓度提高 18.31%，说明 UV 可将能量通过“界面改性-粒径调控-空化增强”转化为自由基化学能。",
                      sections: [
                        {
                          id: "water-module-2-stack-2-section-1",
                          label: "协同增效表现与机理链条",
                          content:
                            "MNBs 对细菌的平均灭活率为 11.70%，UV 照射将其提升至 78.37%，增幅达 569.83%。该提升源于 MNBs/UV 触发“物理损伤-化学氧化-代谢抑制”的级联反应：协同处理导致细胞膜严重破裂并引发 Ca²⁺、Na⁺ 泄漏；ROS 氧化与 UV 辐射共同造成蛋白质变性与 DNA 链断裂，阻断遗传信息传递；同时 MNBs/UV 可降解水体 TOC，减少细菌可利用有机质并抑制其代谢活性。",
                        },
                      ],
                      images: [
                        {
                          src: "/research/water-quality-safety/module2-uv-fig1.png",
                          alt: "不同条件下水中微纳米气泡特性随时间变化",
                          caption:
                            "图1 不同条件下水中微纳米气泡特性随时间变化：（a）气泡浓度；（b）气泡粒径；（c）Zeta 电位绝对值；（d）·OH 产量。",
                          focusY: 50,
                        },
                        {
                          src: "/research/water-quality-safety/module2-uv-fig2.png",
                          alt: "不同条件下蜡样芽孢杆菌处理效果及水质指标变化",
                          caption:
                            "图2 不同条件下对蜡样芽孢杆菌的处理效果及水质指标变化：杀菌效率、总有机碳、氧化还原电位、pH、电导率与溶解氧。",
                          focusY: 50,
                        },
                        {
                          src: "/research/water-quality-safety/module2-uv-fig3.png",
                          alt: "不同处理条件下细菌透射电镜图像对比",
                          caption:
                            "图3 不同处理条件下细菌透射电镜图像，对比对照组、单独 UV、单独 MNBs 与 MNBs/UV 协同体系的细胞损伤程度。",
                          focusY: 45,
                        },
                        {
                          src: "/research/water-quality-safety/module2-uv-fig4.png",
                          alt: "微纳米气泡与紫外协同灭菌机理示意",
                          caption:
                            "图4 微纳米气泡/紫外协同灭菌的界面与光化学耦合机理示意图。",
                          focusY: 45,
                        },
                      ],
                    },
                  ],
                },
                {
                  moduleId: "water-module-3",
                  moduleTitle: "微纳气泡对饮用水氯化消毒的增强机制：以大肠杆菌为例",
                  summary: "",
                  sections: [],
                  contentStacks: [
                    {
                      id: "water-module-3-stack-1",
                      cardTitle: "微纳气泡对饮用水氯化消毒的增强机制：以大肠杆菌为例",
                      sections: [
                        {
                          id: "water-module-3-section-1",
                          label: "体系构建与反应物种转化机制",
                          content:
                            "研究开发了 MNBs 与次氯酸钠（NaClO）组合体系，并以大肠杆菌为指示菌评估消毒性能与增强机制。结果显示，NaClO 的加入使水中 MNBs 平均浓度降低 24.56%，平均粒径在 400~800 nm 范围内发生重构；Zeta 电位绝对值由 21.97 mV 降至 11.58 mV（下降 47.29%），说明气泡间静电排斥减弱并促进破裂释能。MNBs 中 ·OH 峰值浓度可达 873.37 μmol/L；加入 NaClO 后，·OH 平均浓度下降 71.53%，但反应物种转化为 Cl· 与 Cl2·− 等反应性氯自由基（RCS），实现氧自由基向氯自由基的动态转化。在 0.6~0.9 mg/L 氯浓度下，反应物种产生保持稳定，体系呈现连续氧化通量。",
                        },
                        {
                          id: "water-module-3-section-2",
                          label: "灭活效能、副产物控制与综合结论",
                          content:
                            "单独 NaClO 的对数杀菌率为 0.39-log~2.22-log；引入 MNB 后提升至 3.44-log（提升 129%），且将 MNBs 曝气时间由 5 min 延长至 10 min 可进一步提高失活水平。MNB/NaClO 体系显著增强离子渗漏（K+、Ca2+、Na+、Mg2+），总渗漏体积较单独 NaClO 提高 134%，并促进蛋白质与 DNA 泄漏。自由基清除实验表明贡献顺序为 ·OH > H2O2 > ·NO > ·O2−；去除 ·OH 后杀菌率下降 47.08%，说明 ·OH 为主导反应物种。与此同时，MNBs 还能有效抑制 DBP 形成，三氯甲烷（TCM）由 2.97 mg/L 降至 1.79 mg/L（降低 40%），在高氯条件（0.9~1.2 mg/L）下降幅最高可达 68%。总体上，MNBs/NaClO 通过“物理干扰 + 界面活化 + 化学氧化”协同，实现高效消毒与副产物风险控制。",
                        },
                      ],
                      images: [
                        {
                          src: "/research/water-quality-safety/module3-fig1.png",
                          alt: "MNBs与NaClO体系下的灭活与副产物指标变化",
                          caption:
                            "图1 （a）对数灭菌率；（b）NPOC 浓度；（c）TCM 浓度；（d）不同处理条件下 TCM 与 NPOC 对大肠杆菌的相关性。",
                          focusY: 50,
                        },
                        {
                          src: "/research/water-quality-safety/module3-fig2.png",
                          alt: "不同处理条件下大肠杆菌TEM图像与胞内成分泄漏",
                          caption: "图2 不同处理条件下大肠杆菌 TEM 图像及胞内成分泄漏。",
                          focusY: 45,
                        },
                        {
                          src: "/research/water-quality-safety/module3-fig3.png",
                          alt: "MNBs与NaClO协同灭菌及相互作用机理示意图",
                          caption: "图3 MNBs/NaClO 灭菌和相互作用的机理图示意图。",
                          focusY: 45,
                        },
                      ],
                    },
                  ],
                },
                {
                  moduleId: "water-module-4",
                  moduleTitle: "氢微纳米气泡对聚苯乙烯微塑料毒性的减轻机制",
                  summary: "",
                  sections: [],
                  contentStacks: [
                    {
                      id: "water-module-4-stack-1",
                      cardTitle: "氢微纳米气泡对聚苯乙烯微塑料毒性的减轻机制",
                      sections: [
                        {
                          id: "water-module-4-section-1",
                          label: "体系构建与稳定性基础",
                          content:
                            "研究构建了氢微纳米气泡水（H2-MNBW）发生系统，并在体外 Caco-2 细胞模型与体内小鼠口服暴露模型中评估其缓解 PS-MPs 毒性的能力。稳定性测试显示，H2-MNBW 中平均粒径约 1.1 μm、ζ 电位约 -13.0 mV，可检测到稳定微纳气泡；在 480 min 内溶解氢浓度仅下降约 11.3%，明显优于传统富氢水。上述结果表明，微纳气泡可显著延长氢在水中的有效存在时间，为后续生物学干预提供更稳定的作用基础。",
                        },
                        {
                          id: "water-module-4-section-2",
                          label: "体内外缓解效应与潜在机制",
                          content:
                            "在多层次模型中，20 nm PS-MPs 暴露使细胞活力下降 31.3%，诱导细胞毒性与凋亡，并抑制小鼠生长，导致肝脏和脾脏早期轻度异常及肠道菌群失调。引入 H2-MNBW 后，细胞活力较 PS 组提升 25.8%，凋亡率下降 21.9%；17 天口服暴露实验中，PS+H2 组净体重增长较 PS 组提高 38.6%，肝脏窦状隙扩张与脾脏红髓充血等改变得到缓解。16S rRNA 与 LEfSe 分析显示，H2-MNBW 可部分恢复菌群平衡、促进产丁酸菌富集；PICRUSt2 预测进一步提示其可推动肠道代谢功能向健康状态回归。",
                        },
                      ],
                      images: [
                        {
                          src: "/research/water-quality-safety/module4-fig1.png",
                          alt: "氢微纳米气泡水的稳定性与界面特征",
                          caption:
                            "图1 氢气在水中的稳定性及微纳米气泡性质：（a）不同发生方式的氢气浓度衰减曲线；（b）不同发生方式的平均气泡粒径；（c）不同发生方式的ζ电位。",
                          focusY: 50,
                        },
                        {
                          src: "/research/water-quality-safety/module4-fig2.png",
                          alt: "体外Caco-2细胞模型下PS-MPs毒性与H2-MNBW缓解效果",
                          caption:
                            "图2 H₂-MNBW对PS-MPs处理Caco-2细胞的影响：（a）不同处理组Caco-2细胞活力；（b）不同处理组早期与晚期凋亡细胞凋亡率；（c）不同处理组Caco-2细胞毒性。",
                          focusY: 50,
                        },
                        {
                          src: "/research/water-quality-safety/module4-fig3.png",
                          alt: "小鼠口服暴露模型下组织学与生长指标变化",
                          caption:
                            "图3 不同处理组小鼠生长及器官状态：（a）不同处理组小鼠在17天内体重动态变化；（b）不同组小鼠心脏、肝脏、脾脏、肺、肾脏HE染色；（c）不同组小鼠小肠HE染色。",
                          focusY: 45,
                        },
                        {
                          src: "/research/water-quality-safety/module4-fig4.png",
                          alt: "H2-MNBW缓解PS-MPs毒性的机制示意图",
                          caption:
                            "图4 H₂-MNBW缓解PS-MPs中毒的协同解毒机制示意图。",
                          focusY: 45,
                        },
                      ],
                    },
                  ],
                },
                {
                  moduleId: "water-module-5",
                  moduleTitle: "臭氧微纳米气泡穿透效应的饮用水膜过滤工艺优化",
                  summary: "",
                  sections: [],
                  contentStacks: [
                    {
                      id: "water-module-5-stack-1",
                      cardTitle: "臭氧微纳米气泡穿透效应的饮用水膜过滤工艺优化",
                      sections: [
                        {
                          id: "water-module-5-section-1",
                          label: "工艺路径与增效机理",
                          content:
                            "臭氧微纳米气泡耦合膜过滤是饮用水处理中一种高效的高级氧化与膜分离联用技术。该工艺利用微纳米气泡的独特物化性质，显著强化臭氧氧化效率并有效控制膜污染。工程上通常将臭氧微纳米气泡发生器布置在膜组件（如微滤膜、超滤膜）之前或循环侧，使臭氧水携带气泡在过滤过程中持续冲刷膜表面，实现“过滤 + 氧化清洗”同步进行，部分工艺还可叠加紫外消毒以进一步保障出水水质。",
                        },
                        {
                          id: "water-module-5-section-2",
                          label: "运行效果与应用价值",
                          content:
                            "该技术可在较短时间内实现 100% 膜通量恢复，并显著减少对传统化学清洗药剂的依赖，从而降低二次污染风险。总体上，臭氧微纳米气泡耦合膜过滤兼具高效氧化、膜面污染抑制与运行维护友好等优势，为饮用水膜过滤工艺提标与长期稳定运行提供了可行的优化方向。",
                        },
                      ],
                      images: [
                        {
                          src: "/research/water-quality-safety/module5-fig1.png",
                          alt: "臭氧微纳米气泡在膜过滤中的污染层穿透与清洗机制示意",
                          caption:
                            "图1 臭氧微纳米气泡在膜过滤中的穿透与污染控制机制示意：通过气桥效应与界面冲刷强化膜面清洗并缓解膜污染。",
                          focusY: 50,
                        },
                      ],
                    },
                  ],
                },
              ]}
            />
          </div>
        </Container>
      </div>
    );
  }

  const redesignedSlugs = new Set([
    "bubble-nucleation-equipment",
    "black-odorous-water-remediation",
    "aquaculture-high-density",
  ]);

  if (redesignedSlugs.has(item.slug)) {
    /** 板块级内容覆盖：按模块标题匹配，提供自定义 summary、sections、image */
    const moduleContentOverrides: Record<
      string,
      {
        summary: string;
        sections: { id: string; label: string; content?: string }[];
        image?: { src: string; alt?: string; caption?: string; focusY?: number };
        images?: { src: string; alt?: string; caption?: string; focusY?: number }[];
      }
    > = {
      "气液混合流道结构对水中微纳米气泡的形成与粒径分布特性影响": {
        summary:
          "针对微纳米气泡生成过程中气液混合流道结构影响机制不清、导致粒径调控能耗高且连续性差的难题，本研究构建了 CFD‑VOF 与 Euler‑Euler 群体平衡模型耦合的多相流方法，实现了混合流道结构、流场特征与气泡粒径分布的协同表征与精准优化。研究揭示了气相高效剪切破碎在收缩段下游的窄带区域内集中发生，并明确了关键结构参数对切向速度与湍流耗散的主导作用，据此筛选出剪切强度、能量累积与高耗散区域匹配最优的流道构型。在此基础上，进一步建立了初始压力与粒径分布的响应关系，发现提升初始压力可有效增加水中气泡浓度，并显著驱动微米气泡向纳米尺度转化。研究成果为微纳米气泡发生器低能耗、高连续性的原位调控与工程化结构设计提供了系统的理论支撑。",
        sections: [
          {
            id: "bne-module-1-section-1",
            label: "研究目标与方法",
            content:
              "围绕流道结构对成泡过程与粒径分布的耦合影响，建立 CFD-VOF 与 Euler-Euler 群体平衡耦合模型，系统解析“结构参数-流场特征-粒径分布”之间的定量关系。",
          },
          {
            id: "bne-module-1-section-2",
            label: "关键发现与工程意义",
            content:
              "研究识别了高效剪切破碎主发生区与关键结构控制因子，明确提升初始压力可同步提高气泡浓度并促进微米向纳米尺度转化，为发生器低能耗、高连续运行与工程化设计提供依据。",
          },
        ],
        image: { src: "/research/bubble-nucleation-equipment/flow-channel-infographic.png", alt: "气液混合流道结构及气泡形成机理示意", caption: "图1 气液混合流道结构对水中微纳米气泡的形成与粒径分布特性影响机制示意图", focusY: 45 },
      },
      "纳米气泡稳定性机制研究": {
        summary:
          "水中纳米气泡气-液界面处在表面张力与微观电荷约束力共同作用下形成了指向气泡内部的不对称力场，驱动水分子定向排列并形成致密的氢键网络，其对应的 U-T 耦合能峰值构成抑制气体扩散的“动态能垒”，可阻滞气泡内部压力驱动气体向外扩散过程。这种气体扩散与界面阻滞作用的博弈成为气泡稳定的关键。",
        sections: [
          {
            id: "bne-module-2-section-1",
            label: "界面作用机制",
            content:
              "纳米气泡界面在表面张力与电荷约束共同作用下形成不对称力场，促使水分子定向排列并构建致密氢键网络，改变界面层微观能量分布。",
          },
          {
            id: "bne-module-2-section-2",
            label: "稳定性理论解释",
            content:
              "U-T 耦合能峰对应的动态能垒可抑制气体外扩散，削弱内压驱动下的失稳趋势，揭示“扩散驱动-界面阻滞”动态平衡是纳米气泡长时稳定存在的关键。",
          },
        ],
        image: {
          src: "/research/bubble-nucleation-equipment/nanobubble-stability-mechanism.png",
          alt: "纳米气泡稳定性机制示意图",
          caption: "图1 纳米气泡稳定性机理示意图",
          focusY: 50,
        },
      },
      "氧气/臭氧微纳米气泡一体机远程控制系统设计": {
        summary:
          "围绕氧气/臭氧微纳米气泡一体机的工程运行需求，系统设计“远程/自动启停 + 多档位流量控制”双核心控制策略。其一，通过远程控制或依据水中溶解氧（DO）浓度自动启停，实现设备从人工值守向无人值守、按需供氧转变，降低人工巡检负担与误操作风险，并在保障供氧效果的同时提升运行效率；面向工业级高功耗场景，按需运行通常可实现 30% 以上电费节省。其二，构建强/中/弱等多档位流量控制能力，以适配浅水池塘与深水河道等差异化工况，避免浅水区底泥扰动与深水区供氧不足，提升系统在不同工艺条件下的稳定性、可控性与产品化竞争力。",
        sections: [
          {
            id: "bne-module-3-section-1",
            label: "控制策略设计",
            content:
              "构建“远程/自动启停 + 多档位流量调节”双核心架构，实现依据 DO 等运行状态的按需供氧，支撑无人值守与精细化过程控制。",
          },
          {
            id: "bne-module-3-section-2",
            label: "应用适配与效益",
            content:
              "针对浅水与深水等差异化工况提供分级供气能力，降低底泥扰动与供氧不足风险；在高功耗场景下具备显著节能潜力，并提升装备稳定性与产品化竞争力。",
          },
        ],
      },
      "新型高效臭氧发生器研发与优化": {
        summary:
          "臭氧作为高效绿色氧化剂，在水处理、烟气治理、食品加工、半导体制造等领域应用广泛。随着我国生态环保标准持续提升与“双碳”战略推进，高效、低能耗、高浓度臭氧制备技术已成为环境工程与等离子体应用领域的研究重点。目前工业臭氧制备以介质阻挡放电（DBD）技术为主，但传统臭氧发生器存在能效偏低、热损耗大、放电稳定性不足、材料与电源匹配性差等问题，制约了装备性能提升。近年来，国内外围绕高频脉冲电源、新型介电材料、高效热管理结构及放电工况优化等方向取得重要进展，相关研究为臭氧发生器性能提升提供了理论依据。然而，现有装备仍难以实现高浓度、高能效与长寿命的协同优化，国产设备与国际先进水平存在差距。因此，开展新型高效臭氧发生器的结构设计、电源优化与系统参数调控研究，对突破关键技术瓶颈、提升臭氧装备国产化水平、满足高端工业与环保治理需求具有重要意义。",
        sections: [
          {
            id: "bne-module-4-section-1",
            label: "技术瓶颈与研究重点",
            content:
              "针对传统 DBD 臭氧发生器能效低、热损耗大和放电稳定性不足等问题，聚焦电源-介质-结构协同优化，提升高浓度臭氧稳定制备能力。",
          },
          {
            id: "bne-module-4-section-2",
            label: "预期突破与产业价值",
            content:
              "通过高频脉冲电源匹配、新型介电材料与热管理结构优化，实现能效、寿命与浓度协同提升，支撑高端环保与工业场景的国产装备升级。",
          },
        ],
      },
      "不同气源微纳米气泡对水中小球藻的抑制效果及作用机理": {
        summary:
          "研究表明，空气、氮气和臭氧微纳米气泡对水中小球藻进行短暂原位处理（5-40 min）后均能显著抑制藻类生长。处理后 120 h，平均藻密度为 8.12-17.63×10^6 cells/mL，较对照组平均抑制率为 24.17%-63.09%，且抑制作用随处理时间延长逐步增强。O3 MNBs 抑藻效果最优，40 min 处理并静置 24 h 后除藻率最高可达 81.10%，分别较 air 与 N2 气源高 21.49% 和 22.79%。",
        sections: [
          {
            id: "bo-module-1-section-1",
            label: "处理效果与关键指标",
            content:
              "研究表明，不同气源（空气、氮气、臭氧）微纳米气泡短时原位处理（5-40 min）均可显著抑制小球藻生长。处理后 120 h，平均藻密度为 8.12-17.63×10^6 cells/mL，较对照组平均抑制率为 24.17%-63.09%，并随处理时间增加而持续增强。O3 MNBs 表现最优，40 min 处理并静置 24 h 后除藻率达到 81.10%，较 air 与 N2 分别提高 21.49% 与 22.79%。",
          },
          {
            id: "bo-module-1-section-2",
            label: "作用机制解析",
            content:
              "基于加压溶气释气法生成的高密度 MNBs 进入水体后可增强细胞-气泡接触，气泡溃灭产生微流、压力波、微射流与 ROS，对藻细胞形成物理-化学协同作用。SEM 结果显示细胞表面发生明显收缩、破裂及碎片化；同时 ·OH、H2O2、·O2− 诱导氧化胁迫，导致 SOD、CAT、类胡萝卜素、MDA 分别增加 88%、113%、11%、67%，并使叶绿素 a、b 分别下降 19% 与 45%，最终抑制藻细胞持续生长。",
          },
        ],
        images: [
          {
            src: "/research/black-odorous-water-remediation/module1-fig1.png",
            alt: "不同气源处理后藻密度与抑制率变化",
            caption: "图1 不同气源微纳米气泡处理后藻密度及抑藻率的变化",
            focusY: 50,
          },
          {
            src: "/research/black-odorous-water-remediation/module1-fig2.png",
            alt: "不同处理前后藻细胞形态变化SEM图像",
            caption: "图2 不同气源微纳米气泡处理前后藻细胞形态变化的SEM图像",
            focusY: 50,
          },
          {
            src: "/research/black-odorous-water-remediation/module1-fig3.png",
            alt: "微纳米气泡抑藻作用机理示意图",
            caption: "图3 微纳米气泡对藻细胞的抑制作用机理示意图",
            focusY: 50,
          },
        ],
      },
      "水介质中臭氧微纳米气泡对含油污泥的破乳作用": {
        summary:
          "油泥是石油工业中产生的复杂乳化态废弃物，含有大量有毒有害物质。研究表明，O3 MNBs 具有优异理化特性：气泡直径 831 nm，水中 ·OH 浓度 250.4 μmol/L；与常规曝气（5.6 mg/L）相比，O3 MNBs 水中臭氧浓度提升至 16.4 mg/L（增加 192%）。不同气源 MNBs 均可有效破乳含油污泥，其中 O3 MNBs 除油率最高达 41.5%，并显著削弱烷烃 C-H 吸收峰，降低固相碳元素、提高氧元素占比，体现出更强的氧化重构能力。",
        sections: [
          {
            id: "bo-module-2-section-1",
            label: "处理效果与关键指标",
            content:
              "O3 MNBs 可显著强化水-油-固三相分离过程，提高除油率并改善水质指标。实验显示，不同气源 MNBs 均能实现破乳，其中 O3 MNBs 效果最佳（除油率 41.5%），在油分配优化、COD/TOC 控制及 ORP、pH 调整方面均表现出优势。",
          },
          {
            id: "bo-module-2-section-2",
            label: "作用机制解析",
            content:
              "O3 MNBs 通过“物理冲击 + 化学氧化”协同破乳：气泡破裂产生冲击波与微射流促进油滴脱附和界面破裂；同时 O3 与 ·OH 强氧化作用诱导石油烃断链与亲水化，增强油相与固相分离并促进污染物降解。谱学与热分析结果进一步表明，处理后烷烃特征峰减弱、轻重组分热失重行为改变，验证了油泥有机组分的结构重构与氧化转化。",
          },
        ],
        images: [
          {
            src: "/research/black-odorous-water-remediation/module2-fig1.png",
            alt: "破乳后油分布特征与水质指标变化",
            caption:
              "图1 微纳米气泡破乳后油分布与水质指标变化：（a）除油率；（b）油分配；（c）COD；（d）TOC；（e）ORP；（f）pH。",
            focusY: 50,
          },
          {
            src: "/research/black-odorous-water-remediation/module2-fig2.png",
            alt: "不同气源处理前后油泥SEM图像",
            caption: "图2 不同气源微纳米气泡处理前后油泥的SEM图像",
            focusY: 50,
          },
          {
            src: "/research/black-odorous-water-remediation/module2-fig3.png",
            alt: "固相组成与热分析谱图",
            caption:
              "图3 不同气源微纳米气泡处理后含油污泥固相表征：（a）XRD；（b）FTIR；（c）原始样本；（d）CK；（e）O3-MNBs；（f）N2-MNBs 的 TG/DTG。",
            focusY: 50,
          },
          {
            src: "/research/black-odorous-water-remediation/module2-fig4.png",
            alt: "臭氧微纳米气泡破乳机理示意图",
            caption: "图4 臭氧微纳米气泡对油泥的破乳作用机理示意图",
            focusY: 50,
          },
        ],
      },
      "微纳米气泡灌溉促进盐碱土壤种植肥力提升机制研究": {
        summary:
          "本研究基于中度盐碱土番茄盆栽体系，系统评估微纳米气泡灌溉对土壤理化性质、酶活性与微生物生态的协同修复作用。结果表明，处理 91 天后土壤 pH 由 9.19 降至 8.11（-11.75%），EC 由 3480 降至 1621 μS/cm（-53.41%）；CEC、有机质、速效氮、速效磷、速效钾分别提升 17.47%、62.66%、25.97%、10.18%、23.29%。与此同时，总酶活性提升 68.54%，Shannon 指数提升 23.85%，网络节点与连边分别由 161/921 提升至 194/1537，显示土壤肥力与生态功能进入持续修复通道。",
        sections: [
          {
            id: "bo-module-3-section-1",
            label: "处理效果与关键指标",
            content:
              "微纳米气泡灌溉显著缓解盐碱胁迫并恢复供肥能力：在盐分与碱性环境持续下降的同时，CEC、 有机质及速效养分指标整体改善，其中 CEC 与速效氮已接近或达到正常土水平；有机质与速效钾显著恢复，速效磷仍有进一步优化空间，体现“先理化修复、后肥力提升”的阶段性规律。",
          },
          {
            id: "bo-module-3-section-2",
            label: "机制与应用价值",
            content:
              "其作用路径表现为“理化条件改善-酶系统激活-微生物协同重构”连续联动：蛋白酶、脲酶、磷酸酶等关键酶活性上升，促进氮磷转化；微生物多样性与群落均匀度恢复，耐盐胁迫主导类群下降，功能类群增强，生态网络连通性显著提高。该技术具备绿色、原位、可调控特征，为中度盐碱地设施农业与高价值作物种植提供可持续改良路径。",
          },
        ],
        images: [
          {
            src: "/research/black-odorous-water-remediation/module3-fig1.png",
            alt: "不同加气频率下土壤理化与养分指标变化",
            caption:
              "图1 不同加气频率下正常土和盐碱土中pH、电导率、CEC、有机质、速效氮、速效磷和速效钾的含量",
            focusY: 50,
          },
          {
            src: "/research/black-odorous-water-remediation/module3-fig2.png",
            alt: "不同加气频率下土壤酶活性变化",
            caption:
              "图2 不同加气频率下正常土和盐碱土中酶活性的含量:（a）酶活性总量;（b）土壤中的蛋白酶、蔗糖酶、过氧化氢酶、脲酶以及磷酸酶含量",
            focusY: 50,
          },
          {
            src: "/research/black-odorous-water-remediation/module3-fig3.png",
            alt: "相关热图与微生物机制示意",
            caption:
              "图3 （a）Pearson相关热图评估了91天后不同MNBs通气频率下土壤理化性质与酶活性之间的关系;（b）MNBs提高盐碱土壤肥力的微生物机制示意图",
            focusY: 50,
          },
        ],
      },
      "微纳米气泡活化氧化剂促进VOCs高效治理": {
        summary:
          "在低浓度 VOCs 治理场景中，微纳米气泡与氧化剂构建的无催化剂水相氧化体系表现出良好的甲苯去除与深度氧化潜力。该体系可通过强化气液传质并促进 ·OH 与 O2·⁻ 等活性氧生成，提升 VOCs 的转化与矿化水平；在持续运行中保持较好的反应稳定性，并对 pH 波动、水基质变化及部分共存离子具有较强适应性，体现出复杂工况下工程应用潜力。",
        sections: [
          {
            id: "bo-module-4-section-1",
            label: "处理效果与体系特征",
            content:
              "微纳米气泡-氧化剂体系在低浓度 VOCs 条件下可实现稳定去除与持续运行，能够在不依赖额外催化剂的前提下提升甲苯等典型污染物的去除效率，并表现出一定的深度氧化能力，为低浓度尾气水相治理提供了可行路线。",
          },
          {
            id: "bo-module-4-section-2",
            label: "作用机制与工况适应性",
            content:
              "其核心机制在于微纳米气泡提高气液界面面积与传质效率，同时活化氧化过程，促进 ·OH 与 O2·⁻ 生成并驱动有机物氧化矿化。体系对 pH 变化、水体基质扰动及部分共存离子具备较强耐受性，说明该技术在实际复杂工况中具有进一步放大的应用基础。",
          },
        ],
        images: [
          {
            src: "/research/black-odorous-water-remediation/module4-fig1.png",
            alt: "微纳米气泡活化氧化剂促进VOCs治理示意图",
            caption: "图1 微纳米气泡活化氧化剂促进VOCs高效治理示意图",
            focusY: 50,
          },
        ],
      },
      "循环水养殖系统水质净化与脱氮效果提升": {
        summary:
          "本方向围绕“循环水养殖-水培种植”耦合系统，利用微纳米气泡的高效溶氧传质与稳氧能力，协同提升硝化反应与植物根系硝酸盐吸收效率，实现循环养殖水经济脱氮。针对传统水培脱氮受根际缺氧与高流速补偿导致能耗上升的痛点，研究从 DO、氨氮、亚硝酸盐、硝酸盐等关键指标出发，在不同曝气方式、植物配置与水力停留时间条件下评估脱氮效率与运行稳定性，并结合植物生理与微生物生态证据，解析“植物-气泡协同脱氮”机理与工程适配边界。",
        sections: [
          {
            id: "aq-module-1-section-1",
            label: "处理目标与系统效能",
            content:
              "研究以抑制硝酸盐累积、提高循环水再利用率为核心目标，构建养殖单元与水培单元协同脱氮路径。微纳米气泡在不显著增加能耗的前提下提升系统溶氧水平，缓解高停留时间下的缺氧风险，为硝化与植物氮同化提供稳定反应条件。",
          },
          {
            id: "aq-module-1-section-2",
            label: "机制解析与运行优化",
            content:
              "通过并行监测水质指标、植物生理参数与微生物群落变化，识别微纳米气泡对根系吸收效率、功能菌丰度及协同代谢网络的调控作用；进一步结合水力停留时间梯度与植物生长表现，评估在保障脱氮效率同时维持处理水量与经济产出的优化策略。",
          },
        ],
        images: [
          {
            src: "/research/aquaculture-high-density/module1-fig1.png",
            alt: "基于微纳米气泡的循环水养殖-水培协同脱氮系统概念图",
            caption: "图1 基于微纳米气泡的循环水养殖系统概念图（Marcelino et al., 2023）",
            focusY: 50,
          },
        ],
      },
      "微纳米气泡对鲈鱼循环养殖系统水质稳定与鱼类生长性能的提升": {
        summary:
          "围绕鲈鱼集约化养殖中环境压力增大、鱼苗病害风险上升及抗生素依赖带来的残留与耐药问题，本研究以循环水养殖系统（RAS）为平台，评估微纳米气泡在增氧稳态、水质净化、减病增效与养殖密度提升中的综合作用。依托其高比表面积、高传质效率及活性氧生成潜力，构建“源头稳水质-过程降病害-末端提效率”的绿色曝气模式，为高价值鱼类健康养殖与系统化增效提供可验证路径。",
        sections: [
          {
            id: "aq-module-2-section-1",
            label: "系统目标与效能提升",
            content:
              "研究聚焦鲈鱼养殖场景下的稳态增氧与水质维持，通过优化微纳米气泡供氧过程，提升系统在高密度养殖条件下的水环境承载力，降低鱼苗阶段环境应激与发病风险，减少传统药物干预依赖。",
          },
          {
            id: "aq-module-2-section-2",
            label: "机制路径与应用价值",
            content:
              "微纳米气泡通过强化氧传质、改善关键水质参数并协同活性氧反应过程，促进“生长性能提升-病害风险控制-尾水净化”联动增效。该路径兼顾生产效益与生态安全，可为 RAS 条件下鲈鱼等高价值鱼类提供绿色、可持续的曝气管理方案。",
          },
        ],
      },
      "臭氧微纳米气泡对水中四环素的高效降解": {
        summary:
          "本研究围绕臭氧微纳米气泡（O3-MNBs）强化四环素氧化过程，系统解析传质强化、活性氧生成、动力学行为与产物转化机制。相较传统臭氧曝气，O3-MNBs 可形成 5.25-7.17×10^7 bubbles/mL 的高密度气泡群（95% 分布于 50-1200 nm，Zeta 电位为 -4.71~-13.65 mV），使稳态溶解臭氧浓度提高 2.57-4.33 倍、峰值浓度提高 85.50%，并显著延缓停曝后臭氧衰减；同时 ·OH 生成量提高 2.3 倍，平均自由基浓度达 21.49 μmol/L。四环素在 120 s 内去除率达到 96.25%，较传统体系提升 81.25%，且传统体系表观速率仅为该体系的 7.14%，体现出显著深度氧化优势。",
        sections: [
          {
            id: "aq-module-3-section-1",
            label: "处理效果与关键指标",
            content:
              "臭氧微纳米气泡显著改善了传统臭氧体系“低溶解度、短半衰期、弱传质”的瓶颈，构建了高储氧与持续释放并存的反应环境。四环素降解呈现“0-30 s 快速反应 + 30-120 s 持续深度氧化”两阶段动力学特征，最终实现高效率去除与更强反应持续性。",
          },
          {
            id: "aq-module-3-section-2",
            label: "机制链条与产物演化",
            content:
              "该体系通过“传质强化-界面活化-多氧化剂协同”驱动污染物深度转化：气泡界面行为增强 O3 停留与传递，·OH 等自由基协同直接氧化；LC-MS 结果显示四环素经历脱甲基、脱羧与芳环断裂等并行路径，并持续向低 m/z、小分子、高极性产物演化，说明结构破坏更充分、潜在产物风险更低。",
          },
        ],
        images: [
          {
            src: "/research/aquaculture-high-density/module3-fig1.png",
            alt: "臭氧微纳米气泡降解四环素作用机理示意图",
            caption: "图1 臭氧微纳米气泡降解四环素的作用机理示意图",
            focusY: 50,
          },
        ],
      },
      "微纳米气泡灌溉对设施番茄种植的影响机制": {
        summary:
          "本研究以设施番茄为对象，基于地下加气滴灌系统，围绕不同生育期微纳米气泡灌溉对作物生长、产量品质与土壤肥力的协同影响开展系统评估。结果显示，微纳米气泡灌溉可显著提升株高与茎粗（分别 +8.27%、+13.48%），产量提升 23.98%，并提高可溶性固形物、可溶性糖和维生素 C（分别 +20.31%、+34.48%、+34.13%）。在土壤层面，加气一周后速效氮、磷、钾平均提升 41.30%、55.82%、49.90%，并进一步促进根系发育（根长、根表面积、根体积、根尖数平均增幅分别为 17.29%、22.63%、25.43%、12.47%）。综合比较表明，全生育期加气在增产提质方面最优。",
        sections: [
          {
            id: "aq-module-4-section-1",
            label: "处理效果与关键指标",
            content:
              "微纳米气泡地下滴灌可同步提升设施番茄生长势、产量与品质，形成“生长增强-产量提升-品质改善”的协同效应。与常规管理相比，全生育期加气处理在主要农艺与品质指标上表现最优，产量较其他阶段性加气方案进一步提高 10.04%-37.71%。",
          },
          {
            id: "aq-module-4-section-2",
            label: "作用机制与灌溉模式优化",
            content:
              "其机制路径表现为“土壤肥力恢复-根系能力增强-地上部增产提质”连续联动：微纳米气泡促进有机质转化与速效养分释放，改善根际水肥气环境并提升根系吸收能力，最终驱动作物生长与品质提升。综合产量、品质、植株与土壤指标，推荐全生育期采用微纳米气泡灌溉作为设施番茄的适宜管理模式。",
          },
        ],
        images: [
          {
            src: "/research/aquaculture-high-density/module4-fig1.png",
            alt: "不同加气水平对设施番茄产量及品质的影响",
            caption: "图1 不同加气水平的微纳米气泡灌溉对设施番茄产量及品质的影响",
            focusY: 50,
          },
          {
            src: "/research/aquaculture-high-density/module4-fig2.png",
            alt: "不同加气水平对设施番茄生长指标的影响",
            caption: "图2 不同加气水平的微纳米气泡水灌溉对设施番茄生长指标的影响",
            focusY: 50,
          },
          {
            src: "/research/aquaculture-high-density/module4-fig3.png",
            alt: "不同加气水平对土壤理化性质的影响",
            caption: "图3 不同加气水平的微纳米气泡灌溉对土壤理化性质的影响",
            focusY: 50,
          },
        ],
      },
      "微纳米气泡在芯片清洗领域的应用": {
        summary:
          "本研究面向芯片与精密玻璃基材清洗场景，评估微纳米气泡（MNBs）在降低超纯水消耗、减少化学清洗剂依赖和提升微污染去除效率方面的应用潜力。实验对比显示，MNBs 在无额外强化化学剂条件下可实现高效去污：对油污样品去油率可达 90.33%，对部分光刻胶污染在延长作用时间后清洗率可达 98.15%。显微图像与过程温度监测进一步表明，MNBs 能在微缝隙与复杂表面保持较强渗透与剥离能力，同时兼顾表面安全性与工艺稳定性。",
        sections: [
          {
            id: "aq-module-5-section-1",
            label: "处理效果与工程价值",
            content:
              "针对传统清洗“高耗水、强药剂、微尺度残留难去除”的痛点，微纳米气泡清洗展示出高去污效率与低化学负荷优势。实验结果显示，在典型油污与附着污染条件下，MNBs 方案实现接近甚至达到高强化化学清洗效果，有助于降低超纯水与药剂使用强度，契合绿色制造方向。",
          },
          {
            id: "aq-module-5-section-2",
            label: "作用机制与工艺适配",
            content:
              "其核心机制为“界面渗透 + 微尺度剥离 + 温和过程强化”：气泡在界面附近的破裂与局部流动可促进污染层松动和脱附，并对微细结构区域保持较强可达性。热像与显微证据表明，过程温升可控、污染残留显著减少，说明该技术具备面向精密表面清洗的可扩展应用基础。",
          },
        ],
        images: [
          {
            src: "/research/aquaculture-high-density/module5-fig1.png",
            alt: "微纳米气泡芯片清洗实验装置与系统示意",
            caption: "图1 微纳米气泡芯片清洗实验装置与系统示意",
            focusY: 50,
          },
          {
            src: "/research/aquaculture-high-density/module5-fig2.png",
            alt: "实验一步骤及不同介质清洗对比",
            caption: "图2 实验一流程及去油效果对比",
            focusY: 50,
          },
          {
            src: "/research/aquaculture-high-density/module5-fig3.png",
            alt: "实验一步骤结果与去油率对比",
            caption: "图3 不同清洗组去油率对比与结果分析",
            focusY: 50,
          },
          {
            src: "/research/aquaculture-high-density/module5-fig4.png",
            alt: "芯片清洗痛点与微纳米气泡优势",
            caption: "图4 芯片清洗痛点与微纳米气泡技术优势",
            focusY: 50,
          },
          {
            src: "/research/aquaculture-high-density/module5-fig5.png",
            alt: "实验二步骤与清洗率统计",
            caption: "图5 实验二流程与不同样品清洗率结果",
            focusY: 50,
          },
          {
            src: "/research/aquaculture-high-density/module5-fig6.png",
            alt: "显微图像与热像过程监测",
            caption: "图6 清洗前后显微图像及热像监测结果",
            focusY: 50,
          },
        ],
      },
    };

    const moduleMap: Record<string, string[]> = {
      "bubble-nucleation-equipment": [
        "气液混合流道结构对水中微纳米气泡的形成与粒径分布特性影响",
        "纳米气泡稳定性机制研究",
        "氧气/臭氧微纳米气泡一体机远程控制系统设计",
        "新型高效臭氧发生器研发与优化",
      ],
      "black-odorous-water-remediation": [
        "不同气源微纳米气泡对水中小球藻的抑制效果及作用机理",
        "水介质中臭氧微纳米气泡对含油污泥的破乳作用",
        "微纳米气泡灌溉促进盐碱土壤种植肥力提升机制研究",
        "微纳米气泡活化氧化剂促进VOCs高效治理",
      ],
      "aquaculture-high-density": [
        "循环水养殖系统水质净化与脱氮效果提升",
        "微纳米气泡对鲈鱼循环养殖系统水质稳定与鱼类生长性能的提升",
        "臭氧微纳米气泡对水中四环素的高效降解",
        "微纳米气泡灌溉对设施番茄种植的影响机制",
        "微纳米气泡在芯片清洗领域的应用",
      ],
    };

    const modules = moduleMap[item.slug] ?? [];
    const sectionTemplateBySlug: Record<string, string[]> = {
      "black-odorous-water-remediation": ["研究目标", "技术路径", "关键机制", "工程验证"],
      "aquaculture-high-density": ["研究对象", "实验设计", "关键结果", "应用转化"],
    };
    const defaultSectionTemplate = ["研究目标", "技术路径", "关键机制", "工程验证"];
    const sectionTemplate = sectionTemplateBySlug[item.slug] ?? defaultSectionTemplate;
    const moduleSectionMap = modules.map((moduleTitle, idx) => ({
      moduleTitle,
      moduleId: `module-${idx + 1}`,
      sections: sectionTemplate.map((name, sIdx) => ({
        id: `module-${idx + 1}-section-${sIdx + 1}`,
        label: `${name}（待补充）`,
      })),
    }));

    const sectionNavItems = modules.map((_, idx) => ({
      id: `module-${idx + 1}`,
      label: `板块${idx + 1}`,
    }));

    const metricsBySlug: Record<string, MetricItem[]> = {
      "bubble-nucleation-equipment": [
        { label: "研究模块", value: `${modules.length} 个` },
        { label: "技术主线", value: "成核—稳定" },
        { label: "核心议题", value: "流场—界面—控制" },
        { label: "工程指向", value: "机理—装备" },
      ],
      "black-odorous-water-remediation": [
        { label: "研究模块", value: `${modules.length} 个` },
        { label: "技术路线", value: "MNBs—氧化协同" },
        { label: "研究对象", value: "藻类—污泥—VOCs" },
        { label: "应用场景", value: "黑臭水体—土壤修复" },
      ],
      "aquaculture-high-density": [
        { label: "研究模块", value: `${modules.length} 个` },
        { label: "技术路线", value: "供氧—净化协同" },
        { label: "研究对象", value: "水质—鱼体—残留物" },
        { label: "应用场景", value: "循环水养殖—农业延伸" },
      ],
    };
    const metrics: MetricItem[] = metricsBySlug[item.slug] ?? [
      { label: "研究模块", value: `${Math.max(sections.length, 1)} 个` },
      { label: "技术路线", value: "机理—应用协同" },
      { label: "研究对象", value: "界面—传质—效能" },
      { label: "应用场景", value: item.group === "Applications" ? "工程应用" : "机理研究" },
    ];

    const introSecondary =
      item.positioningZh ||
      coreLines.slice(0, 2).join(" ").trim() ||
      "围绕机理与工程化应用，持续推进微纳米气泡技术在真实场景中的验证与转化。";

    return (
      <div className="min-h-screen bg-[var(--bg-default)]">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(129,140,248,0.10),transparent_60%),radial-gradient(circle_at_bottom,rgba(15,23,42,0.45),transparent_65%)]" />

        <ResearchHero
          titleZh={titleZh}
          titleEn={titleEn}
          introPrimary={briefZh}
          introSecondary={introSecondary}
          keywords={(item.keywords ?? []).slice(0, 6)}
          metrics={metrics}
          cover={cover}
          coverFocusY={coverFocusY}
        />

        <Container>
          <div className="mx-auto max-w-[1280px] px-0 py-10 md:py-16">
            <ResearchModuleSwitcher
              modules={modules.map((moduleTitle, idx) => {
                const moduleMeta = moduleSectionMap[idx];
                const override = moduleContentOverrides[moduleTitle];
                const fig = images[idx];
                return {
                  moduleId: moduleMeta.moduleId,
                  moduleTitle,
                  summary: override?.summary ?? "该板块已完成一级划分。你后续提供章节内容后，我会在该板块下补齐二级章节导航与对应图文。",
                  sections: override?.sections ?? moduleMeta.sections,
                  images: override?.images,
                  image:
                    override?.image ??
                    (fig
                      ? {
                          src: fig.src,
                          alt: fig.alt,
                          caption: fig.captionZh,
                          focusY: typeof fig.focusY === "number" ? fig.focusY : 45,
                        }
                      : undefined),
                };
              })}
            />
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
