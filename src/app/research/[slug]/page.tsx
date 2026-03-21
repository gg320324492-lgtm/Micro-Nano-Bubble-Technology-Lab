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
      { label: "现有 Session", value: `${sections.length} 个` },
      { label: "图文证据", value: `${images.length} 张` },
      { label: "方向类型", value: "饮用水安全" },
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
                            "研究表明，不同气源（氮气、空气、氧气、臭氧）微纳米气泡通过抑制水中关键细菌的生长，降解水中有机质提升饮用水水质的生物稳定性，对水中BDOC、AOC和总菌的平均降解率分别达42.74%、49.49%和51.32%，空气气源条件下水中BDOC、AOC降解率和杀菌效率最高。水箱中总菌数变化比营养物质浓度变化滞后三周；此外，微纳米气泡处理可降低水中浊度、TDS，增加DO值。",
                        },
                        {
                          id: "water-module-1-section-2",
                          label: "微生物群落机制解析",
                          content:
                            "通过微生物群落测试，探讨了微纳米气泡对饮用水水质生物稳定性的提升机制，发现微纳米气泡不仅可以抑制水中关键细菌的生长，还对水中有机质具有较好的降解作用。其一，水中微纳米气泡对变形菌门（Proteobacteria）和浮霉菌门（Planctomycetota）的消杀效果较好，尤其是对变形菌门中的不动杆菌属（Acinetobacter）的消杀率可达到100%，经微纳米气泡处理可增加对微生物的氧化胁迫（Oxidative Stress），氧气MNBs对微生物的氧化胁迫程度最高，微生物在高浓度·OH下对活性氧耐受程度降低，有利于·OH对生物分子（脂质、蛋白质和核酸）的氧化损伤，抑制氨基酸运输和代谢功能、脂质转运和代谢功能、蛋白质转录功能以及蛋白质翻译后修饰功能，破坏细胞新陈代谢，从而杀灭微生物。其二，微纳米气泡溃灭后产生·OH可直接降解水体中的有机质，减少微生物的营养来源，从而抑制微生物的新陈代谢和活性。",
                        },
                      ],
                      images: [
                        {
                          src: "/research/water-quality-safety/module1-card-1.png",
                          alt: "微纳米气泡作用机制示意图",
                          caption: "不同气源微纳米气泡抑菌与有机物降解机制示意",
                          focusY: 50,
                        },
                        {
                          src: "/research/water-quality-safety/module1-card-2.png",
                          alt: "微生物群落与共现网络分析图",
                          caption: "微生物群落结构变化与共现网络特征",
                          focusY: 50,
                        },
                        {
                          src: "/research/water-quality-safety/module1-card-3.png",
                          alt: "BDOC、AOC与总菌变化及动力学分析图",
                          caption: "BDOC、AOC与总菌变化及降解动力学",
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
                            "研究表明，大肠杆菌的入侵造成饮用水水质下降，水中增加浊度5.19%、DO降低2.66%，水中细菌总数增加6.25%，对水中微生物群落造成消极影响，从而影响水中生物稳定性。大肠杆菌入侵使优势菌纲从α-变形菌纲（Alphaproteobacteria）变为γ变形菌纲（Gammaproteobacteria），微纳米气泡可促进·OH对微生物的氧化胁迫，抑制微生物的蛋白质转录（相对丰度降低7.89%）和能量产生与转换（降低6.68%），破坏其负责修复机制的DNA片段，抑制γ-变形菌纲（Gammaproteobacteria）及热水虫纲（Caldisericia）等的生存活动，导致前者相对丰度减小47.6%，后者完全消失。",
                        },
                        {
                          id: "water-module-1-card2-section-2",
                          label: "微纳米气泡处理下的水质恢复与灭活效应",
                          content:
                            "在大肠杆菌入侵事件发生后，微纳米气泡处理显著提升饮用水水质，水中浊度和TDS分别降低53.95%、8.46%，水中DO增加11.12%。其中，臭氧MNBs对浊度恢复效果最好（0.42NTU），氧气MNBs对DO提升效果最好（11.84mg/L）。MNBs处理对水中细菌具有较强的灭活作用，水中细菌总数降低66.53%；在大肠杆菌入侵事件发生后，微纳米气泡可通过降低微生物群落丰富度，平衡微生物群落多样性，抑制大肠杆菌成为优势菌。",
                        },
                      ],
                      images: [
                        {
                          src: "/research/water-quality-safety/module1-card2-bacteria-ecoli.png",
                          alt: "大肠杆菌入侵后细菌数量、降解率及回归分析",
                          caption: "入侵后细菌总量、大肠杆菌变化及降解动力学（阴影区为入侵后实验阶段）",
                          focusY: 50,
                        },
                        {
                          src: "/research/water-quality-safety/module1-card2-mnb-mechanism.png",
                          alt: "微纳米气泡对大肠杆菌入侵的调控机制示意",
                          caption: "氧化胁迫、胞内分子损伤与 BDOC/AOC、浊度及 DO 等水质响应",
                          focusY: 48,
                        },
                        {
                          src: "/research/water-quality-safety/module1-card2-cog-abundance.png",
                          alt: "微生物群落功能基因相对丰度",
                          caption: "不同样品间 COG 功能类别相对丰度对比",
                          focusY: 50,
                        },
                      ],
                    },
                    {
                      id: "water-module-1-stack-3",
                      cardTitle: "微纳米气泡处理下生物膜生长对二次供水管道水质的影响机制",
                      sections: [
                        {
                          id: "water-module-1-card3-section-1",
                          label: "实验体系与生物膜生长三阶段调控",
                          content:
                            "研究模拟了饮用水输配系统末端管道的水力条件，以探索不同气源微纳米气泡影响下的生物膜形成。为了进一步了解水质的变化，本研究评估了不同实验阶段生物膜的形态、组成、微生物群落和水质。因此，我们将生物膜形成分为三个阶段：缓慢生长阶段（0-27天）（SP）、快速生长阶段（27-42天）（RP）和动态稳定阶段（42-66天）（DP）。在缓慢生长和快速生长阶段，生物膜形成受到显著抑制，尤其是在将MNBs与氧气结合后，导致生物膜干重减少77.87%。MNBs调节生物膜生长的机制在每个阶段都不同。在SP阶段，发生物理阻隔和化学氧化，在RP阶段进行氧化失活，而在DP阶段吸附和冲刷占主导地位。",
                        },
                        {
                          id: "water-module-1-card3-section-2",
                          label: "物理—化学协同机制与水质效应",
                          content:
                            "MNBs主要通过物理冲击与化学氧化来调控生物膜的生长，MNBs处理可减少生物膜的胞外聚合物含量，改变生物膜的形貌结构以及生物膜中微生物群落的主要结构，使得优势菌群发生变化，其中关键菌浮霉菌门（Planctomycetes）的灭活率达到54.22%-61.66%。MNBs与氧气结合使用时，可在生物膜生长的早期和中期阶段显著抑制生物膜的形成。生物膜的形成明显减少，生物膜干重最多可减少77.87%。MNBs溃灭后产生·OH，故该处理可降低饮用水浊度，降低率为24.53%，同时还可提高饮用水中溶解氧18.8%，降低水中TOC浓度，降解率为87.93%。微生物会利用水中溶解氧和营养物质通过物理作用和化学作用在管壁附着生长，并产生EPS，生物膜生长过程中受到外界扰动时，会部分脱落，增加水中浊度水平。MNBs处理后水中浊度降低，·OH会降解水中营养物质，限制微生物营养来源，减缓生物膜的生长过程及其不可逆粘附过程。这些结果表明，MNBs在处理饮用水管网系统中的生物膜和改善饮用水质量方面具有巨大潜力。",
                        },
                      ],
                      images: [
                        {
                          src: "/research/water-quality-safety/module1-card3-biofilm-mechanism.png",
                          alt: "生物膜生长三阶段与微纳米气泡作用机制示意",
                          caption: "载体表面生物膜 SP/RP/DP 阶段及物理阻隔、·OH 氧化与冲刷等机制",
                          focusY: 45,
                        },
                        {
                          src: "/research/water-quality-safety/module1-card3-water-quality-lines.png",
                          alt: "羟基自由基、粒径、Zeta 电位、浊度与 TOC 随时间变化",
                          caption: "不同气源 MNBs 下 ·OH、气泡特性及浊度、TOC 等水质指标（66 天）",
                          focusY: 50,
                        },
                        {
                          src: "/research/water-quality-safety/module1-card3-microbiome-panels.png",
                          alt: "生物膜微生物群落组成与多样性分析",
                          caption: "门水平组成、PCoA、关键类群及不同阶段的 Alpha 多样性",
                          focusY: 50,
                        },
                      ],
                    },
                  ],
                },
                {
                  moduleId: "water-module-2",
                  moduleTitle: "微纳米气泡协同紫外对蜡样芽孢杆菌的消杀机制",
                  summary: "该板块内容占位中，后续补充。",
                  sections: [],
                },
                {
                  moduleId: "water-module-3",
                  moduleTitle: "微纳气泡对饮用水氯化消毒的增强机制：以大肠杆菌为例",
                  summary:
                    "以大肠杆菌为代表对象，解析微纳气泡与氯化消毒耦合过程中对灭活动力学、药剂利用效率与过程安全性的增强机制，形成可工程对接的参数窗口。",
                  sections: [],
                },
                {
                  moduleId: "water-module-4",
                  moduleTitle: "氢微纳米气泡对聚苯乙烯微塑料毒性的减轻机制",
                  summary:
                    "聚焦氢微纳米气泡对聚苯乙烯微塑料相关毒性效应的缓解路径，重点关注氧化应激、细胞损伤与环境行为变化，服务饮用水健康风险控制研究。",
                  sections: [],
                },
                {
                  moduleId: "water-module-5",
                  moduleTitle: "臭氧微纳米气泡穿透效应的饮用水膜过滤工艺优化",
                  summary:
                    "围绕臭氧微纳米气泡在膜过滤过程中的界面穿透与污染层调控作用，优化饮用水膜工艺的抗污染性能、运行稳定性与处理效率。",
                  sections: [],
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
    const moduleContentOverrides: Record<string, { summary: string; sections: { id: string; label: string }[]; image?: { src: string; alt?: string; caption?: string; focusY?: number } }> = {
      "气液混合流道结构对水中微纳米气泡的形成与粒径分布特性影响": {
        summary:
          "针对微纳米气泡生成过程中气液混合流道结构影响机制不清、导致粒径调控能耗高且连续性差的难题，本研究构建了 CFD‑VOF 与 Euler‑Euler 群体平衡模型耦合的多相流方法，实现了混合流道结构、流场特征与气泡粒径分布的协同表征与精准优化。研究揭示了气相高效剪切破碎在收缩段下游的窄带区域内集中发生，并明确了关键结构参数对切向速度与湍流耗散的主导作用，据此筛选出剪切强度、能量累积与高耗散区域匹配最优的流道构型。在此基础上，进一步建立了初始压力与粒径分布的响应关系，发现提升初始压力可有效增加水中气泡浓度，并显著驱动微米气泡向纳米尺度转化。研究成果为微纳米气泡发生器低能耗、高连续性的原位调控与工程化结构设计提供了系统的理论支撑。",
        sections: [],
        image: { src: "/research/bubble-nucleation-equipment/flow-channel-infographic.png", alt: "气液混合流道结构及气泡形成机理示意", caption: "流道结构主导调控，操作压力辅助调控", focusY: 45 },
      },
      "纳米气泡稳定性机制研究": {
        summary:
          "水中纳米气泡气-液界面处在表面张力与微观电荷约束力共同作用下形成了指向气泡内部的不对称力场，驱动水分子定向排列并形成致密的氢键网络，其对应的 U-T 耦合能峰值构成抑制气体扩散的“动态能垒”，可阻滞气泡内部压力驱动气体向外扩散过程。这种气体扩散与界面阻滞作用的博弈成为气泡稳定的关键。",
        sections: [],
        image: {
          src: "/research/bubble-nucleation-equipment/nanobubble-stability-mechanism.png",
          alt: "纳米气泡稳定性机制示意图",
          caption: "界面不对称力场驱动下的氢键网络与动态能垒机制",
          focusY: 50,
        },
      },
      "氧气/臭氧微纳米气泡一体机远程控制系统设计": {
        summary:
          "围绕氧气/臭氧微纳米气泡一体机的工程运行需求，系统设计“远程/自动启停 + 多档位流量控制”双核心控制策略。其一，通过远程控制或依据水中溶解氧（DO）浓度自动启停，实现设备从人工值守向无人值守、按需供氧转变，降低人工巡检负担与误操作风险，并在保障供氧效果的同时提升运行效率；面向工业级高功耗场景，按需运行通常可实现 30% 以上电费节省。其二，构建强/中/弱等多档位流量控制能力，以适配浅水池塘与深水河道等差异化工况，避免浅水区底泥扰动与深水区供氧不足，提升系统在不同工艺条件下的稳定性、可控性与产品化竞争力。",
        sections: [],
      },
      "新型高效臭氧发生器研发与优化": {
        summary:
          "臭氧作为高效绿色氧化剂，在水处理、烟气治理、食品加工、半导体制造等领域应用广泛。随着我国生态环保标准持续提升与“双碳”战略推进，高效、低能耗、高浓度臭氧制备技术已成为环境工程与等离子体应用领域的研究重点。目前工业臭氧制备以介质阻挡放电（DBD）技术为主，但传统臭氧发生器存在能效偏低、热损耗大、放电稳定性不足、材料与电源匹配性差等问题，制约了装备性能提升。近年来，国内外围绕高频脉冲电源、新型介电材料、高效热管理结构及放电工况优化等方向取得重要进展，相关研究为臭氧发生器性能提升提供了理论依据。然而，现有装备仍难以实现高浓度、高能效与长寿命的协同优化，国产设备与国际先进水平存在差距。因此，开展新型高效臭氧发生器的结构设计、电源优化与系统参数调控研究，对突破关键技术瓶颈、提升臭氧装备国产化水平、满足高端工业与环保治理需求具有重要意义。",
        sections: [],
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
    const moduleSectionMap = modules.map((moduleTitle, idx) => ({
      moduleTitle,
      moduleId: `module-${idx + 1}`,
      sections: (idx === 2 ? ["小章节1", "小章节2", "小章节3"] : ["小章节1", "小章节2", "小章节3", "小章节4"]).map((name, sIdx) => ({
        id: `module-${idx + 1}-section-${sIdx + 1}`,
        label: `${name}（待补充）`,
      })),
    }));

    const sectionNavItems = modules.map((_, idx) => ({
      id: `module-${idx + 1}`,
      label: `板块${idx + 1}`,
    }));

    const galleryCount = images.length;
    const hasVideo = Boolean(item.video?.src);
    const metrics: MetricItem[] =
      item.slug === "bubble-nucleation-equipment"
        ? [
            { label: "研究模块", value: "4 个" },
            {
              label: "实验平台",
              value: "Venturi 系",
            },
            {
              label: "多媒体证据",
              value: hasVideo ? `${galleryCount} 图 · 1 视频` : `${galleryCount} 图`,
            },
            {
              label: "体系主线",
              value: "机理—装备",
            },
          ]
        : [
            { label: "研究模块", value: `${Math.max(sections.length, 1)} 个` },
            { label: "图文证据", value: `${images.length} 张` },
            { label: "关键词", value: `${(item.keywords ?? []).length} 项` },
            { label: "应用导向", value: item.group === "Applications" ? "应用" : "机理" },
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
