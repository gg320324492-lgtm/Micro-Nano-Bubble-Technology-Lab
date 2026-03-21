// src/data/externalLinks.ts
// 外部链接导航配置

export type ExternalLink = {
  id: string;
  title: string;
  date?: string;
  description?: string;
  url: string;
  source?: string;
  tag?: string;
  thumbnail?: string;
  thumbnailFit?: "cover" | "contain";
};

function parseDateValue(date?: string): number {
  if (!date) return 0;
  const t = Date.parse(date);
  return Number.isNaN(t) ? 0 : t;
}

export function sortExternalLinksByDate(links: ExternalLink[]): ExternalLink[] {
  return [...links].sort((a, b) => {
    // 最新日期优先；无日期的条目自动排到后面
    const ta = parseDateValue(a.date);
    const tb = parseDateValue(b.date);
    if (ta !== tb) return tb - ta;
    return a.title.localeCompare(b.title, "zh");
  });
}

export const externalLinks: ExternalLink[] = [
  {
    id: "tianjin-daily-epaper-concept-verification-fund-20260318",
    title: "打造“利铲子” 挖出“金种子”",
    date: "2026-03-18",
    description:
      "天津日报数字报（2026-03-18｜要闻）。我市设立两只概念验证基金，探索超早期科创投资“天津模式”，聚焦破解科技成果转化“最初一公里”融资难题。",
    url: "https://epaper.tianjinwe.com/tjrb/html/2026-03/18/content_143078_3234592.htm",
    source: "天津日报数字报",
    tag: "媒体报道",
    thumbnail: "/images/media/tianjin-daily-logo.png",
    thumbnailFit: "contain",
  },
  {
    id: "tju-env-wangtianzi-concept-verification-fund-wechat",
    title:
      "环境学院王天志副教授谈科技成果转化：概念验证基金为科研成果从“0”到“1”铺路",
    date: "2026-03-15",
    description:
      "围绕天津市首批概念验证基金设立，解读成果转化早期的“试错成本”和“放大成本”痛点，并结合微纳米气泡技术的产业化前景阐述基金如何助力从“0”到“1”。",
    url: "https://mp.weixin.qq.com/s/2D2PWm3ynUrafGwpczNc5w",
    source: "微信公众平台（环境学院）",
    tag: "媒体报道",
    thumbnail: "/images/media/tju-env-wangtianzi-concept-verification-fund-wechat.png",
    thumbnailFit: "cover",
  },
  {
    id: "tjyun-concept-verification-fund-20260314",
    title: "概念验证基金成立 加快“金种子”长成“好苗子”",
    date: "2026-03-14",
    description:
      "2026-03-14 18:39｜天津广播电视台。天津设立首批概念验证基金，金融助力加快高校成果从概念验证阶段走向转化应用。",
    url: "https://www.app2020.tjyun.com/jyapp/system/2026/03/14/059224428.shtml",
    source: "津云APP / 天津广播电视台",
    tag: "媒体报道",
    thumbnail: "/images/media/tjyun-concept-verification-fund.png",
    thumbnailFit: "cover",
  },
  {
    id: "haitang-gold-seed-wechat",
    title: "当微纳米气泡遇上海棠「金种子」",
    date: "2025-04-01",
    description:
      "讲述王天志老师如何将微纳米气泡技术从实验室推向产业，并获得海棠金种子基金首轮 50 万元投资支持。",
    url: "https://mp.weixin.qq.com/s?__biz=MzI0ODM3NDI1OQ==&mid=2247504862&idx=1&sn=0d01afc6a8a0a3513966f0f950dfa712&chksm=e836b82f3ca9229bfa53018efc0787012df23fbfc59a65b952dd442b95db4d7d75a8c6e32d01&mpshare=1&scene=2&srcid=0401p1HU7NRGflkjPWMan8T8&sharer_shareinfo=5c9ca9fe4357e4fb462538f37ae6e6f6&sharer_shareinfo_first=5c9ca9fe4357e4fb462538f37ae6e6f6#rd",
    source: "微信公众平台",
    tag: "媒体报道",
    thumbnail: "/images/external-haitang-gold-seed.gif",
  },
  {
    id: "tju-high-value-achievement-wechat",
    title: "成果推介 | 天津大学高价值科技成果系列：王天志团队——微纳米气泡技术",
    date: "2026-01-20",
    description:
      "聚焦水环境治理与生态修复领域，系统介绍王天志团队微纳米气泡技术在黑臭水体治理、工业废水快速氧化、高密度养殖增氧、表面清洗等多场景中的痛点与技术优势。",
    url: "https://mp.weixin.qq.com/s/Dd5NzxyrpcnqTX-aV6fWrA",
    source: "微信公众平台",
    tag: "媒体报道",
    thumbnail: "/images/tju-ost-banner.png",
    thumbnailFit: "contain",
  },
  {
    id: "tju-iee-2025-mnb-team-wechat",
    title: "环境学院微纳米气泡团队产学研创新成果亮相2025国际工程教育发展大会新工科成果展",
    date: "2025-09-26",
    description:
      "在2025国际工程教育发展大会新工科成果展上，天津大学环境学院王天志副研究员团队研发的“微纳米气泡发生器”作为代表性科技成果集中展示，面向黑臭水体治理、高效农业、水产养殖等应用场景，突出展示了气泡粒径精准可控、原位自由基浓度高、运行稳定等技术优势。团队依托天津海棠基金加速成果转化，已建成年产能500台的自主生产线，合同金额近200万元，成为新工科背景下“产教融合、创新实践”的典型范例。",
    url: "https://mp.weixin.qq.com/s?__biz=Mzk0NjA5Njc2OA==&mid=2247503937&idx=1&sn=42dc93ef46266db35a691f3d4075c86d&chksm=c28dacaeae8dec28ebd14f17979d0438f8c9b42efb55ffadee1d6a54f6bcb193bcb1a25350f0&mpshare=1&scene=2&srcid=0926u7I8PMdz8Qk4R2CuoAvI&sharer_shareinfo=8c3f69f58e6f7bce137c4f6ec267cf05&sharer_shareinfo_first=8c3f69f58e6f7bce137c4f6ec267cf05#rd",
    source: "微信公众平台",
    tag: "媒体报道",
    thumbnail: "/images/tju-iee-2025-mnb-team.png",
    thumbnailFit: "cover",
  },
  {
    id: "tju-env-dangchang-rural-revitalization-20250812",
    title: "环境学院宕昌帮扶结硕果 助力乡村振兴显成效",
    date: "2025-08-12",
    description:
      "环境学院围绕人才帮扶、科技帮扶和教育帮扶精准发力，持续推进在甘肃宕昌县的定点帮扶工作，助力乡村振兴与绿色产业发展。",
    url: "https://mp.weixin.qq.com/s/TP7IFpLvdhrpQT4EXnhd6g",
    source: "微信公众平台",
    tag: "媒体报道",
    thumbnail: "/images/media/dangchang-rural-revitalization-20250812.png",
    thumbnailFit: "cover",
  },
  {
    id: "district-tech-bureau-tju-agri-exchange-20241202",
    title: "区科技局组织农业企业赴天津大学开展技术交流",
    date: "2024-12-02",
    description:
      "区科技局组织农业企业赴天津大学考察交流，围绕微纳米气泡发生装置与微生物土壤改良技术开展对接，推动技术试验与成果转化合作。",
    url: "https://mp.weixin.qq.com/s/wy2jJ7l4O1PRhIIAFZD7lw",
    source: "微信公众平台",
    tag: "媒体报道",
    thumbnail: "/images/media/district-tech-bureau-tju-agri-exchange-20241202.png",
    thumbnailFit: "cover",
  },
  {
    id: "gansu-dangchang-highland-vegetables-20240906",
    title: "陇南宕昌：高原夏菜绽放致富花",
    date: "2024-09-06",
    description:
      "宕昌县高原夏菜种植基地迎来收获季，报道提及依托天津大学环境学院王天志教授团队微纳米气泡灌溉等技术，推动设施蔬菜增产增效与乡村振兴。",
    url: "https://gansu.gscn.com.cn/system/2024/09/06/013198941.shtml",
    source: "中国甘肃网 / 宕昌县人民政府办公室",
    tag: "媒体报道",
    thumbnail: "/images/media/dangchang-highland-vegetables-20240906.png",
    thumbnailFit: "cover",
  },
  {
    id: "cej-mnbs-uv-bacillus-cereus-20251224",
    title: "天津大学的 Chemical Engineering Journal：紫外线照射下饮用水中蜡样芽孢杆菌微纳米气泡的消毒机制",
    date: "2025-12-24",
    description:
      "研究报道了微纳米气泡与紫外协同消毒系统对蜡样芽孢杆菌的强化灭活机制，第一作者杨慈，通讯作者王天志，通讯单位天津大学。",
    url: "https://mp.weixin.qq.com/s/umh5vqRVgcCPEYG_8fFBWw",
    source: "微信公众平台",
    tag: "媒体报道",
    thumbnail: "/images/media/cej-mnbs-uv-bacillus-cereus-20251224.png",
    thumbnailFit: "cover",
  },
  {
    id: "popular-science-lecture-zaojiacheng-20250409",
    title: "科普名师大讲堂 | “学研专家精准科普 科技赋能乡村振兴”造甲城镇专场活动",
    date: "2025-04-09",
    description:
      "区科协联合区科技局、造甲城镇政府开展专题讲座，王天志教授围绕纳米气泡技术在农业提质增效中的应用进行科普与技术指导。",
    url: "https://mp.weixin.qq.com/s/c9YPiXtHR68LKbiuJH3Jvg",
    source: "微信公众平台",
    tag: "媒体报道",
    thumbnail: "/images/media/popular-science-lecture-zaojiacheng-20250409.png",
    thumbnailFit: "cover",
  },
  {
    id: "nanhe-coldwater-fish-mnbs-20250629",
    title: "天津大学微纳米气泡技术赋能南河镇冷水鱼养殖产业",
    date: "2025-06-29",
    description:
      "天津大学—南河镇冷水鱼养殖示范基地投入使用，王天志教授介绍微纳米气泡增氧、臭氧尾水净化与“水肥气”一体化循环模式，助力产业升级与乡村振兴。",
    url: "https://mp.weixin.qq.com/s/3WYSNcouHrY7cDdSjSo4qA",
    source: "微信公众平台",
    tag: "媒体报道",
    thumbnail: "/images/media/nanhe-coldwater-fish-mnbs-20250629.png",
    thumbnailFit: "cover",
  },
  {
    id: "haitang-gold-seed-confirmed-investment-20250401",
    title: "确定投资50万！当微纳米气泡遇上海棠「金种子」",
    date: "2025-04-01",
    description:
      "聚焦王天志老师团队微纳米气泡技术从科研到产业化的路径，报道其获海棠金种子基金首轮50万元投资支持。",
    url: "https://mp.weixin.qq.com/s/k-nOVMUXxXccaJc3YbsaOA",
    source: "微信公众平台",
    tag: "媒体报道",
    thumbnail: "/images/media/haitang-gold-seed-confirmed-20250401.png",
    thumbnailFit: "cover",
  },
  {
    id: "mnbs-biofilm-mechanism-eswrt-20250312",
    title: "天津大学微纳气泡团队：减少水管壁77.87%生物膜形成的微纳气泡机制",
    date: "2025-03-12",
    description:
      "王天志副教授团队模拟供水管网系统，揭示不同气源微纳米气泡对生物膜抑制机制，其中氧气微纳米气泡可显著减少管壁生物膜形成。",
    url: "https://mp.weixin.qq.com/s/XDo8lYRav2CSje7IfcsyqA",
    source: "微信公众平台",
    tag: "媒体报道",
    thumbnail: "/images/media/mnbs-biofilm-mechanism-20250312.png",
    thumbnailFit: "contain",
  },
  {
    id: "jsjs-drinking-water-mnbs-20250708",
    title: "大家之言｜王天志：一种饮用水安全保障新技术：微纳米气泡",
    date: "2025-07-08",
    description:
      "《净水技术》“大家之言”栏目聚焦微纳米气泡技术在饮用水安全保障中的机理、应用路径与系统升级潜力。",
    url: "https://mp.weixin.qq.com/s/ZgKijbHw1ElSSj_lVkDM8A",
    source: "微信公众平台 / 净水技术",
    tag: "媒体报道",
    thumbnail: "/images/media/jsjs-drinking-water-mnbs-20250708.png",
    thumbnailFit: "contain",
  },
  {
    id: "h2-mnbs-microplastics-jwpe-20260321",
    title: "科研速递 | 王天志团队：氢微纳米气泡缓解聚苯乙烯微塑料毒性",
    date: "2026-03-21",
    description:
      "课题组在 Journal of Water Process Engineering 报道氢微纳米气泡水（H2-MNBW）在细胞与小鼠模型中缓解PS微塑料毒性的作用，DOI: 10.1016/j.jwpe.2026.109897。",
    url: "https://mp.weixin.qq.com/s/bYmxeZ3RhQgCGWXJMBiJsQ",
    source: "微信公众平台",
    tag: "媒体报道",
    thumbnail: "/images/media/h2-mnbs-microplastics-20260321.png",
    thumbnailFit: "cover",
  },
];

