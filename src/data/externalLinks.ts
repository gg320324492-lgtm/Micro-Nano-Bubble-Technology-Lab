// src/data/externalLinks.ts
// 外部链接导航配置

export type ExternalLink = {
  id: string;
  title: string;
  description?: string;
  url: string;
  source?: string;
  tag?: string;
  thumbnail?: string;
  thumbnailFit?: "cover" | "contain";
};

export const externalLinks: ExternalLink[] = [
  {
    id: "tianjin-daily-epaper-concept-verification-fund-20260318",
    title: "打造“利铲子” 挖出“金种子”",
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
    description:
      "在2025国际工程教育发展大会新工科成果展上，天津大学环境学院王天志副研究员团队研发的“微纳米气泡发生器”作为代表性科技成果集中展示，面向黑臭水体治理、高效农业、水产养殖等应用场景，突出展示了气泡粒径精准可控、原位自由基浓度高、运行稳定等技术优势。团队依托天津海棠基金加速成果转化，已建成年产能500台的自主生产线，合同金额近200万元，成为新工科背景下“产教融合、创新实践”的典型范例。",
    url: "https://mp.weixin.qq.com/s?__biz=Mzk0NjA5Njc2OA==&mid=2247503937&idx=1&sn=42dc93ef46266db35a691f3d4075c86d&chksm=c28dacaeae8dec28ebd14f17979d0438f8c9b42efb55ffadee1d6a54f6bcb193bcb1a25350f0&mpshare=1&scene=2&srcid=0926u7I8PMdz8Qk4R2CuoAvI&sharer_shareinfo=8c3f69f58e6f7bce137c4f6ec267cf05&sharer_shareinfo_first=8c3f69f58e6f7bce137c4f6ec267cf05#rd",
    source: "微信公众平台",
    tag: "媒体报道",
    thumbnail: "/images/tju-iee-2025-mnb-team.png",
    thumbnailFit: "cover",
  },
];

