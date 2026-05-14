// src/content/aquaculturePdfFullData.ts
// 《大棚鱼和辣椒简介.pdf》数据逐条整理（仅包含PDF中明确写出的数据）

export type PdfSource = { file: string; page: number };

export type FigureAsset = {
  id: string; // Fig.R1...
  src: string; // public 路径
  caption: string;
  source: PdfSource;
};

export type ChartMeta = {
  id: string; // Chart.R1A...
  title: string; // 指标名
  unit: string;
  groups: string[]; // 柱状图分组名称
  yAxisTicks?: number[]; // 坐标轴刻度（从图中可读）
  note?: string;
  source: PdfSource;
};

export type CostRow = {
  item: string;
  usage: string;
  unitPrice: string;
  costYuan: number;
  source: PdfSource;
};

export const aquaculturePdfFullData = {
  meta: {
    docTitle: "大棚鱼和辣椒简介",
    fileName: "大棚鱼和辣椒简介.pdf",
    totalPages: 3,
    pdfPublicPath: "/industrialization/aquaculture/results/大棚鱼和辣椒简介.pdf",
  },

  figures: [
    {
      id: "Fig.R1",
      src: "/industrialization/aquaculture/results/Fig_R1_fish.png",
      caption: "鲈鱼品质提升（溶菌酶、T-SOD、蛋白质、谷氨酸：市场 vs 大棚）",
      source: { file: "大棚鱼和辣椒简介.pdf", page: 1 },
    },
    {
      id: "Fig.R2",
      src: "/industrialization/aquaculture/results/Fig_R2_pepper.png",
      caption: "农作物增产提质（辣椒：产量/维生素C/水分/辣椒碱素；含现场对比照片）",
      source: { file: "大棚鱼和辣椒简介.pdf", page: 2 },
    },
    {
      id: "Fig.R3",
      src: "/industrialization/aquaculture/results/Fig_R3_cost.png",
      caption: "成本计算（苗种/饲料/电力/人工；合计6337元；折算5.51元/斤鱼）",
      source: { file: "大棚鱼和辣椒简介.pdf", page: 3 },
    },
  ] as FigureAsset[],

  pages: [
    {
      page: 1,
      sectionTitle: "鲈鱼品质提升",
      textBlocks: [
        "与市场鱼相比：",
        "（1）大棚组鱼体溶菌酶含量提升约30.3%；总超氧化物歧化酶（T-SOD）活性提升约41.0%，整体表明大棚养殖鱼的免疫与抗氧化能力更强，健康状态更好；",
        "（2）大棚组鱼肉蛋白质含量提升约17.3%；同时，大棚组谷氨酸含量（鲜味主要来源）提升约74.5%，表明鱼肉营养更足，鲜味更突出。",
      ],
      keyNumbers: [
        { name: "溶菌酶提升", valueText: "约30.3%", baseline: "市场鱼", source: { file: "大棚鱼和辣椒简介.pdf", page: 1 } },
        { name: "T-SOD提升", valueText: "约41.0%", baseline: "市场鱼", source: { file: "大棚鱼和辣椒简介.pdf", page: 1 } },
        { name: "蛋白质提升", valueText: "约17.3%", baseline: "市场鱼", source: { file: "大棚鱼和辣椒简介.pdf", page: 1 } },
        { name: "谷氨酸提升", valueText: "约74.5%", baseline: "市场鱼", source: { file: "大棚鱼和辣椒简介.pdf", page: 1 } },
      ],
    },

    {
      page: 2,
      sectionTitle: "农作物增产提质（辣椒）",
      textBlocks: [
        "以清水组为对照：",
        "（1）养殖肥水和纳米气泡水灌溉使辣椒产量分别提升约112.2%和103.0%，均显著增产；",
        "（2）品质方面，养殖肥水和纳米气泡水灌溉使维生素C含量分别提升约46.6%和20.6%，同时水分含量分别提高约2.37%和2.14%，增产的同时兼顾品质提升！",
        "不同水源处理下植株生长态势差异显著，养殖肥水表现最优！",
      ],
      keyNumbers: [
        { name: "产量提升（养殖肥水）", valueText: "约112.2%", baseline: "清水组", source: { file: "大棚鱼和辣椒简介.pdf", page: 2 } },
        { name: "产量提升（纳米气泡水）", valueText: "约103.0%", baseline: "清水组", source: { file: "大棚鱼和辣椒简介.pdf", page: 2 } },
        { name: "维生素C提升（养殖肥水）", valueText: "约46.6%", baseline: "清水组", source: { file: "大棚鱼和辣椒简介.pdf", page: 2 } },
        { name: "维生素C提升（纳米气泡水）", valueText: "约20.6%", baseline: "清水组", source: { file: "大棚鱼和辣椒简介.pdf", page: 2 } },
        { name: "水分提升（养殖肥水）", valueText: "约2.37%", baseline: "清水组", source: { file: "大棚鱼和辣椒简介.pdf", page: 2 } },
        { name: "水分提升（纳米气泡水）", valueText: "约2.14%", baseline: "清水组", source: { file: "大棚鱼和辣椒简介.pdf", page: 2 } },
      ],
      photoGroupLabels: ["养殖肥水", "纳米气泡水", "清水"],
    },

    {
      page: 3,
      sectionTitle: "成本计算",
      textBlocks: [
        "基地现有鱼1300条，总量1150斤，合计养殖成本为5.51元/斤鱼，较传统鲈鱼养殖成本（10-12元/斤鱼）降低45%~54%；饲料使用率为0.42斤饲料/斤鱼，较传统鲈鱼饲料使用率（0.9-1.2斤饲料/斤鱼）降低53%~65%！",
      ],
      keyNumbers: [
        { name: "鱼数量", valueText: "1300条", source: { file: "大棚鱼和辣椒简介.pdf", page: 3 } },
        { name: "总量", valueText: "1150斤", source: { file: "大棚鱼和辣椒简介.pdf", page: 3 } },
        { name: "总成本", valueText: "6337元", source: { file: "大棚鱼和辣椒简介.pdf", page: 3 } },
        { name: "折算成本", valueText: "5.51元/斤鱼", source: { file: "大棚鱼和辣椒简介.pdf", page: 3 } },
        { name: "较传统成本降低", valueText: "45%~54%", baseline: "10-12元/斤鱼", source: { file: "大棚鱼和辣椒简介.pdf", page: 3 } },
        { name: "饲料使用率（料比）", valueText: "0.42斤饲料/斤鱼", baseline: "传统0.9-1.2", source: { file: "大棚鱼和辣椒简介.pdf", page: 3 } },
        { name: "料比降低", valueText: "53%~65%", baseline: "0.9-1.2 vs 0.42", source: { file: "大棚鱼和辣椒简介.pdf", page: 3 } },
      ],
    },
  ],

  chartMeta: [
    {
      id: "Chart.R1A",
      title: "溶菌酶",
      unit: "U/ml",
      groups: ["市场", "大棚"],
      yAxisTicks: [0, 50, 100, 150, 200, 250],
      note: "柱状图含显著性标记（**）",
      source: { file: "大棚鱼和辣椒简介.pdf", page: 1 },
    },
    {
      id: "Chart.R1B",
      title: "T-SOD",
      unit: "U/ml",
      groups: ["市场", "大棚"],
      yAxisTicks: [0, 20, 40, 60],
      note: "柱状图含显著性标记（**）",
      source: { file: "大棚鱼和辣椒简介.pdf", page: 1 },
    },
    {
      id: "Chart.R1C",
      title: "蛋白质",
      unit: "%",
      groups: ["市场", "大棚"],
      yAxisTicks: [0, 5, 10, 15, 20, 25, 30],
      note: "柱状图含显著性标记（**）",
      source: { file: "大棚鱼和辣椒简介.pdf", page: 1 },
    },
    {
      id: "Chart.R1D",
      title: "谷氨酸",
      unit: "μmol/gprot",
      groups: ["市场", "大棚"],
      yAxisTicks: [0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800],
      note: "柱状图含显著性标记（**）",
      source: { file: "大棚鱼和辣椒简介.pdf", page: 1 },
    },
    {
      id: "Chart.R2A",
      title: "产量",
      unit: "kg",
      groups: ["养殖肥水", "纳米气泡水", "清水"],
      yAxisTicks: [0, 20, 40, 60, 80, 100, 120],
      note: "柱状图含显著性标记（* / **）",
      source: { file: "大棚鱼和辣椒简介.pdf", page: 2 },
    },
    {
      id: "Chart.R2B",
      title: "维生素C",
      unit: "mg/100g",
      groups: ["养殖肥水", "纳米气泡水", "清水"],
      yAxisTicks: [0, 20, 40, 60, 80, 100, 120],
      note: "柱状图含显著性标记（* / **）",
      source: { file: "大棚鱼和辣椒简介.pdf", page: 2 },
    },
    {
      id: "Chart.R2C",
      title: "水分",
      unit: "%",
      groups: ["养殖肥水", "纳米气泡水", "清水"],
      yAxisTicks: [80, 85, 90, 95, 100],
      note: "柱状图含显著性标记（*）",
      source: { file: "大棚鱼和辣椒简介.pdf", page: 2 },
    },
    {
      id: "Chart.R2D",
      title: "辣椒碱素",
      unit: "%",
      groups: ["养殖肥水", "纳米气泡水", "清水"],
      yAxisTicks: [0, 0.2, 0.4, 0.6, 0.8],
      note: "柱状图含显著性标记（*）",
      source: { file: "大棚鱼和辣椒简介.pdf", page: 2 },
    },
  ] as ChartMeta[],

  costTable: [
    { item: "苗种", usage: "1300条", unitPrice: "1元/条", costYuan: 1300, source: { file: "大棚鱼和辣椒简介.pdf", page: 3 } },
    { item: "饲料", usage: "240Kg", unitPrice: "15元/Kg", costYuan: 3600, source: { file: "大棚鱼和辣椒简介.pdf", page: 3 } },
    { item: "电力", usage: "637度", unitPrice: "1元/度", costYuan: 637, source: { file: "大棚鱼和辣椒简介.pdf", page: 3 } },
    { item: "人工", usage: "四个月", unitPrice: "200元/月", costYuan: 800, source: { file: "大棚鱼和辣椒简介.pdf", page: 3 } },
  ] as CostRow[],

  conclusions: [
    {
      text: "基地现有鱼1300条，总量1150斤，合计养殖成本为5.51元/斤鱼。",
      source: { file: "大棚鱼和辣椒简介.pdf", page: 3 },
    },
    {
      text: "较传统鲈鱼养殖成本（10-12元/斤鱼）降低45%~54%。",
      source: { file: "大棚鱼和辣椒简介.pdf", page: 3 },
    },
    {
      text: "饲料使用率为0.42斤饲料/斤鱼，较传统（0.9-1.2斤饲料/斤鱼）降低53%~65%。",
      source: { file: "大棚鱼和辣椒简介.pdf", page: 3 },
    },
  ],
} as const;

/**
 * 兼容路径：你提供的数据路径含 /results/，
 * 当前仓库文件位于 /industrialization/aquaculture/ 下。
 */
export function resolveAquacultureAssetPath(src: string): string {
  if (!src) return src;
  return src.replace(
    "/industrialization/aquaculture/results/",
    "/industrialization/aquaculture/",
  );
}
