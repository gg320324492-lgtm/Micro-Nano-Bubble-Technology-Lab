// src/app/industrialization/[slug]/page.tsx
// 顶部 = HeroClient（V2 已固化）；中下部 = BodyClient（A/B/C × 文字四档切换器）
// 旧通用分支 hero / AquacultureTabs / introPanel / resultsPanel 已删除（与 V2 顶部重复）
import Link from "next/link";

import Container from "@/components/Container";
import industrialBases, { IndustrialBase } from "@/data/industrialization";
import { toImageVariant } from "@/lib/imageVariant";
import { resolveAquacultureAssetPath } from "@/content/aquaculturePdfFullData";
import HeroClient, { type HeroStat, type HeroScene } from "./HeroClient";
import BodyClient, { type GalleryTopic, type BodyFigure } from "./BodyClient";

export const dynamicParams = false;
export function generateStaticParams() {
  return industrialBases.map((b) => ({ slug: String(b.slug) }));
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
                  <Link className="underline" href={`/industrialization/${String(b.slug)}/`}>
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
  const aquacultureData = isAquaculture
    ? (await import("@/content/aquaculturePdfFullData")).aquaculturePdfFullData
    : null;

  const findKeyNumber = (page: number, name: string) => {
    const pageData = aquacultureData?.pages.find((p) => p.page === page);
    return pageData?.keyNumbers.find((k) => k.name === name);
  };

  // 图集取图：按 src 匹配 gallery caption
  const galleryMap = new Map((base.gallery ?? []).map((g) => [g.src, g]));
  const pick = (src: string, alt: string): { src: string; alt: string; caption: string } => {
    const g = galleryMap.get(src);
    return { src, alt, caption: g?.captionZh ?? alt };
  };

  // ── 瑞德智设备基地 ────────────────────────────────────────────────
  if (isReidDevice) {
    const reidStats: HeroStat[] = [
      { label: "合同订单额", value: "近200万+" },
      { label: "标准交付周期", value: "15天" },
      { label: "客户复购率", value: "80%+" },
      { label: "产品型号", value: "14种" },
    ];
    // 成果展示：产品序列 / 性能测试 / 产业化证明 / 现场应用
    const reidFigures: BodyFigure[] = [
      {
        src: "/industrialization/reid-device-tianjin/g07.png",
        alt: "实验室微纳米气泡发生器",
        title: "RD-NM · 实验室发生器",
        caption: "小流量工况，适合试验段与精细化补氧，累计销售额约 15 万元。",
      },
      {
        src: "/industrialization/reid-device-tianjin/g08.png",
        alt: "工业微纳米气泡发生器",
        title: "RD-NM · 工业发生器",
        caption: "通用型机组，适配中小规模处理节点，累计销售额约 35 万元。",
      },
      {
        src: "/industrialization/reid-device-tianjin/g09.png",
        alt: "臭氧微纳米气泡一体机",
        title: "RD-O3N · 臭氧一体机",
        caption: "强化氧化/消毒，兼顾传质效率与运行安全，累计销售额约 80 万元。",
      },
      {
        src: "/industrialization/reid-device-tianjin/g10.png",
        alt: "长距离低能耗曝气机",
        title: "RD-BQ · 长距离曝气机",
        caption: "单段长距离均匀曝气，部署灵活，适用于黑臭水体与景观水体，累计销售额约 60 万元。",
      },
      {
        src: "/industrialization/reid-device-tianjin/g20.png",
        alt: "多功能一体式微纳米气泡发生器性能测试结果",
        title: "性能测试结果",
        caption: "多功能一体式微纳米气泡发生器出厂测试：覆盖流量、气泡密度、溶解氧提升等关键参数验证。",
      },
      {
        src: "/industrialization/reid-device-tianjin/g21.png",
        alt: "产业化证明材料（一）",
        title: "产业化证明 · 订单与交付",
        caption: "订单、交付与复购形成稳定转化闭环，合同金额累计 1000 万+。",
      },
      {
        src: "/industrialization/reid-device-tianjin/g22.png",
        alt: "产业化证明材料（二）",
        title: "产业化证明 · 营收增长",
        caption: "2025 年营收较 2024 年增长 20 倍以上，客户复购率 80%+。",
      },
    ];
    const reidGalleryTopics: GalleryTopic[] = [
      {
        title: "生产与装配",
        body: "基地拥有两条生产线，覆盖结构设计、加工装配到整机测试。焊接、管路、电控等关键工序在车间内完成，保证整机一致性与交付周期。",
        images: [
          pick("/industrialization/reid-device-tianjin/g01.jpg", "生产与装配现场"),
          pick("/industrialization/reid-device-tianjin/g03.jpg", "设备集成/打包与交付准备"),
        ],
      },
      {
        title: "厂区与标识",
        body: "厂区位于天津，门头与基地标识清晰可辨。海棠基金投资 350 万元支持产线建设与首批量产。",
        images: [
          pick("/industrialization/reid-device-tianjin/g02.jpg", "厂区/门头/基地标识"),
          pick("/industrialization/reid-device-tianjin/2.jpg", "厂区/车间/办公场景"),
          pick("/industrialization/reid-device-tianjin/3.jpg", "厂区/车间/办公场景"),
        ],
      },
      {
        title: "整机与关键部件",
        body: "臭氧/纯氧微纳米气泡一体机外观与面板一体化设计；关键部件涵盖控制、气路、水路，出厂前完成整机测试与调试。",
        images: [
          pick("/industrialization/reid-device-tianjin/g04.jpg", "臭氧/纯氧微纳米气泡一体机（外观与面板）"),
          pick("/industrialization/reid-device-tianjin/g05.jpg", "关键部件细节（控制/气路/水路）"),
          pick("/industrialization/reid-device-tianjin/g06.jpg", "整机测试与调试（出厂前验证）"),
        ],
      },
      {
        title: "现场应用与交付",
        body: "设备已交付污水处理、水产养殖、设施农业、河道治理等多类现场。从打包出厂到现场调试形成标准交付流程，平均 15 天完成落地准备。",
        images: [
          pick("/industrialization/reid-device-tianjin/g12.png", "治理项目应用点位"),
          pick("/industrialization/reid-device-tianjin/g13.png", "项目现场合影与交付"),
          pick("/industrialization/reid-device-tianjin/g14.png", "水体治理运行状态"),
          pick("/industrialization/reid-device-tianjin/g15.png", "设备应用示范"),
        ],
      },
      {
        title: "工况演示与讲解",
        body: "面向来访客户与合作伙伴开展工况演示与技术讲解，覆盖设备运行状态、气泡观测与典型场景应用效果。",
        images: [
          pick("/industrialization/reid-device-tianjin/g16.png", "工况演示与讲解"),
          pick("/industrialization/reid-device-tianjin/g17.png", "温室场景应用"),
          pick("/industrialization/reid-device-tianjin/g18.png", "设施农业点位"),
          pick("/industrialization/reid-device-tianjin/g19.png", "装备运行实拍"),
        ],
      },
    ];

    return (
      <main className="py-10 pb-20">
        <HeroClient
          d={{
            index: industrialBases.findIndex((b) => String(b.slug) === slug) + 1,
            titleZh: base.titleZh,
            titleEn: base.titleEn ?? "",
            brief: base.briefZh,
            cover: base.cover,
            locationZh: base.locationZh,
            locationUrl: base.locationUrl,
            highlights: base.highlightsZh ?? [],
            stats: reidStats,
          }}
        />
        <BodyClient
          sections={(base.sections ?? []).map((s) => ({ title: s.titleZh, body: s.bodyZh, bullets: s.bulletsZh ?? [] }))}
          figures={reidFigures}
          gallery={(base.gallery ?? []).map((g) => ({ src: g.src, alt: g.captionZh ?? base.titleZh, caption: g.captionZh }))}
          galleryTopics={reidGalleryTopics}
          techRouteLabel="成果展示"
        />
      </main>
    );
  }

  // ── 黑臭水体专属布局 ──────────────────────────────────────────────
  if (isBlackOdorous) {
    const boStats: HeroStat[] = [
      { label: "COD 削减", value: "21–28%" },
      { label: "氨氮削减", value: "≤93%" },
      { label: "叶绿素去除", value: "71.5%" },
      { label: "处理时长", value: "10 min" },
      { label: "总磷削减", value: "17–37%" },
      { label: "浊度下降", value: ">25%" },
    ];
    const boGalleryTopics: GalleryTopic[] = [
      {
        title: "现场巡检",
        body: "监利项目点位 A/B 现场巡检记录，覆盖治理前后的水质取样与工况核对。",
        images: [
          pick("/industrialization/black-odorous-water/gallery01.png", "现场巡检记录（监利项目点位A）"),
          pick("/industrialization/black-odorous-water/gallery02.png", "现场巡检记录（监利项目点位B）"),
        ],
      },
      {
        title: "治理前后对比",
        body: "治理前典型黑臭与底泥扰动状态，治理后河道断面水体明显转清，沿岸近景可直观对比。",
        images: [
          pick("/industrialization/black-odorous-water/gallery03.png", "治理前典型黑臭与底泥扰动状态"),
          pick("/industrialization/black-odorous-water/gallery04.png", "治理运行过程中的水面状态与曝气轨迹"),
          pick("/industrialization/black-odorous-water/gallery05.png", "治理后河道断面水体状态（沿岸近景）"),
        ],
      },
      {
        title: "作业现场",
        body: "静海独流镇项目现场作业照片，长距离低能耗曝气机在河道中持续运行。",
        images: [
          pick("/industrialization/black-odorous-water/gallery06.png", "静海独流镇项目现场作业照片"),
          pick("/industrialization/black-odorous-water/gallery07.png", "藻类富集与表层污染阶段状态"),
        ],
      },
      {
        title: "典型点位前后对比",
        body: "样点 1–3 前后对比：COD、氨氮、浊度、叶绿素等关键指标协同改善，观感与数据同步提升。",
        images: [
          pick("/industrialization/black-odorous-water/gallery08.png", "典型点位前后对比（样点1）"),
          pick("/industrialization/black-odorous-water/gallery09.png", "典型点位前后对比（样点2）"),
          pick("/industrialization/black-odorous-water/gallery10.png", "典型点位前后对比（样点3）"),
        ],
      },
    ];
    return (
      <main className="theme-navy py-10 pb-20">
        <HeroClient
          d={{
            index: industrialBases.findIndex((b) => String(b.slug) === slug) + 1,
            titleZh: base.titleZh,
            titleEn: base.titleEn ?? "",
            brief: base.briefZh,
            cover: base.cover,
            locationZh: base.locationZh,
            locationUrl: base.locationUrl,
            highlights: base.highlightsZh ?? [],
            stats: boStats,
          }}
        />
        <BodyClient
          sections={(base.sections ?? []).map((s) => ({ title: s.titleZh, body: s.bodyZh, bullets: s.bulletsZh ?? [] }))}
          gallery={(base.gallery ?? []).map((g) => ({ src: g.src, alt: g.captionZh ?? base.titleZh, caption: g.captionZh }))}
          galleryTopics={boGalleryTopics}
          techRouteLabel="治理成果"
        />
      </main>
    );
  }

  // ── 水产养殖基地（通用 → 仅 HeroClient + BodyClient，无旧 hero） ──
  const aqStats: HeroStat[] = [
    { label: "谷氨酸提升（鲜味）", value: findKeyNumber(1, "谷氨酸提升")?.valueText ?? "约74.5%" },
    { label: "T-SOD 提升（免疫）", value: findKeyNumber(1, "T-SOD提升")?.valueText ?? "约41.0%" },
    { label: "辣椒产量提升", value: findKeyNumber(2, "产量提升（养殖肥水）")?.valueText ?? "约112.2%" },
    { label: "折算养殖成本", value: findKeyNumber(3, "折算成本")?.valueText ?? "5.51元/斤鱼" },
  ];
  const heroScenes: HeroScene[] = [
    { src: toImageVariant("/industrialization/aquaculture/g22", "main"), alt: "基地现场 / 温室养殖圆池" },
    { src: toImageVariant("/industrialization/aquaculture/g06", "main"), alt: "基地内景 / 大棚种植与对比工况" },
    { src: toImageVariant("/industrialization/aquaculture/g26", "main"), alt: "养殖对象 / 成品鱼打样展示" },
    { src: toImageVariant("/industrialization/aquaculture/g27", "main"), alt: "全国智慧渔场布局分布图（Smart Aquaculture Network）" },
  ];

  // 成果图：PDF 三图 + 两张技术 slide，主题卡形式（与基地实拍同语言）
  const aqFigures = aquacultureData
    ? [
        {
          src: resolveAquacultureAssetPath(aquacultureData.figures[0]!.src),
          alt: aquacultureData.figures[0]!.caption,
          title: "鲈鱼品质提升",
          caption:
            "较市场鱼：溶菌酶提升约 30.3%，T-SOD 提升约 41.0%，谷氨酸提升约 74.5%，蛋白质提升约 17.3%——免疫与鲜味双提升。",
        },
        {
          src: resolveAquacultureAssetPath(aquacultureData.figures[1]!.src),
          alt: aquacultureData.figures[1]!.caption,
          title: "辣椒增产提质",
          caption:
            "养殖肥水与纳米气泡水灌溉：辣椒产量分别提升约 112.2% 与 104%，维生素 C 含量分别提升约 46.6% 与 20.6%。",
        },
        {
          src: resolveAquacultureAssetPath(aquacultureData.figures[2]!.src),
          alt: aquacultureData.figures[2]!.caption,
          title: "养殖成本核算",
          caption:
            "苗种 / 饲料 / 电力 / 人工合计 6337 元，总重 1150 斤，折算 5.51 元/斤鱼，较传统鲈鱼养殖成本降低 45%–54%。",
        },
        {
          src: "/industrialization/aquaculture/slide-high-density-nanobubble.png",
          alt: "纯氧纳米气泡技术用于高密度水产养殖",
          title: "纯氧纳米气泡 · 高密度养殖",
          caption:
            "养殖密度 150 kg/m³，较现有工厂化养殖提高约 50%；溶解氧长期稳定在 10 mg/L 左右，全程符合养殖水质标准。",
        },
        {
          src: "/industrialization/aquaculture/slide-water-quality-fish-quality.png",
          alt: "水质在线监测与鱼肉品质提升",
          title: "水质在线监测与鱼肉品质",
          caption:
            "多参数在线监测（水温 / 溶氧 / pH 等）联动智慧渔场平台；大棚组鱼肉蛋白质与谷氨酸含量显著高于市场对照鱼。",
        },
      ]
    : undefined;

  // 图集小主题：文字介绍 × 对应图片（替代一整面图片墙）
  const aqGalleryTopics: GalleryTopic[] = [
    {
      title: "基地外观",
      body: "天津大学纳米农业实验站以集装箱式舱体为核心，外观标注清晰，坐落在国家农业科技园区内。白色箱体与周边大棚、农田形成鲜明对比，从远处即可识别实验站位置。",
      images: [
        pick("/industrialization/aquaculture/g17.jpg", "基地外景 / 标牌与建筑"),
        pick("/industrialization/aquaculture/g13.jpg", "基地外景 / 标牌特写"),
        pick("/industrialization/aquaculture/g15.jpg", "基地外景 / 实验站全景"),
      ],
    },
    {
      title: "种植与养殖协同",
      body: "温室内一侧是鱼菜共生式种植槽与辣椒试种区，另一侧是高密度养殖圆池。养殖肥水经微纳米气泡处理后回用于种植，形成「一水两用」的种养闭环对比工况。",
      images: [
        pick("/industrialization/aquaculture/g24.jpg", "基地外景 / 大棚与种植区全景"),
        pick("/industrialization/aquaculture/g06.jpg", "基地内景 / 大棚种植与对比工况"),
        pick("/industrialization/aquaculture/g02.jpg", "设备布置 / 管路与曝气点"),
      ],
    },
    {
      title: "高密度养殖现场",
      body: "温室内布置多个蓝色养殖圆池，搭配一体化机柜与管路，养殖密度可达 150 kg/m³，较现有工厂化养殖提高约 50%。池内为加州鲈鱼，水面翻腾反映增氧与水流工况。",
      images: [
        pick("/industrialization/aquaculture/g22.jpg", "基地现场 / 温室养殖圆池"),
        pick("/industrialization/aquaculture/g23.jpg", "设备布置 / 一体化机柜与管路"),
        pick("/industrialization/aquaculture/g07.jpg", "现场维护 / 运维与巡检"),
        pick("/industrialization/aquaculture/g25.png", "养殖对象 / 高密度养殖池鱼群活体状态"),
      ],
    },
    {
      title: "养殖对象与品质",
      body: "以加州鲈鱼为主要养殖对象，从鱼苗到成品鱼打样全程可追溯。溶菌酶、T-SOD 等免疫指标与谷氨酸等鲜味指标较市场鱼显著提升，养殖成本折算约 5.51 元/斤鱼。",
      images: [
        pick("/industrialization/aquaculture/g08.jpg", "养殖对象 / 加州鲈鱼"),
        pick("/industrialization/aquaculture/g26.png", "养殖对象 / 成品鱼打样展示"),
      ],
    },
    {
      title: "配套与团队",
      body: "实验站内设商业模式洽谈区、团队成员展示墙、会议室与荣誉证书墙，兼顾科研办公、来访接待与成果展示功能。",
      images: [
        pick("/industrialization/aquaculture/g19.jpg", "基地配套 / 商业模式洽谈区"),
        pick("/industrialization/aquaculture/g21.jpg", "团队简介 / 团队成员展示墙"),
        pick("/industrialization/aquaculture/g20.jpg", "团队 / 会议室与综合展示"),
        pick("/industrialization/aquaculture/g18.jpg", "团队 / 荣誉证书与专利墙"),
      ],
    },
  ];

  return (
    <main className="py-10">
      <HeroClient
        d={{
          index: industrialBases.findIndex((b) => String(b.slug) === slug) + 1,
          titleZh: base.titleZh,
          titleEn: base.titleEn ?? "",
          brief: base.briefZh,
          cover: base.cover,
          locationZh: base.locationZh,
          locationUrl: base.locationUrl,
          highlights: base.highlightsZh ?? [],
          stats: aqStats,
        }}
        scenes={heroScenes}
      />
      <BodyClient
        sections={(base.sections ?? []).map((s) => ({ title: s.titleZh, body: s.bodyZh, bullets: s.bulletsZh ?? [] }))}
        figures={aqFigures}
        gallery={(base.gallery ?? []).map((g) => ({ src: g.src, alt: g.captionZh ?? base.titleZh, caption: g.captionZh }))}
        galleryTopics={aqGalleryTopics}
        techRouteLabel="成果展示"
      />
    </main>
  );
}
