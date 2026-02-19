// 研究方向数据模型

export type ResearchDirection = {
  slug: string;
  titleZh: string;
  titleEn?: string;
  briefZh?: string;
  keywords?: string[];
  bulletsZh?: string[];
  cover?: string;
  group?: string;
  category?: string;
  positioningZh?: string;
};

export const researchDirections: ResearchDirection[] = [
  {
    slug: "water-quality-safety",
    titleZh: "水质提升与安全保障",
    titleEn: "Water Quality Enhancement & Safety",
    briefZh: "围绕饮用水/再生水的消毒安全与水质提升，聚焦 O3-MNBs 的高效传质、残余活性与副产物风险边界，构建可用于工程放大的评价体系。",
    keywords: ["臭氧微纳米气泡", "水质安全", "消毒", "CT值", "副产物控制", "残余活性"],
    group: "Core",
    category: "Water Safety",
    positioningZh: "该方向是课题组面向真实水场景的安全性主线：以 O3-MNBs 为核心氧化/消毒单元，建立从溶解臭氧—自由基—灭活效果—副产物风险—能耗的闭环评价与工况窗口，为工程落地提供可复用的决策依据。",
  },
  {
    slug: "bubble-collapse-oh",
    titleZh: "气泡溃灭与·OH原位生成",
    titleEn: "Bubble Collapse & In-situ ·OH Generation",
    briefZh: "聚焦微纳米气泡界面物理化学与扰动条件下的反应活化，解析·OH等活性物种的原位生成证据链，并建立可量化、可复现实验方法与机理框架。",
    keywords: ["气泡界面", "·OH", "原位生成", "证据链", "探针/猝灭剂", "动力学"],
    group: "Core",
    category: "Mechanism",
    positioningZh: "该方向是课题组机理证据链主线：回答·OH到底从哪里来、在什么条件下最强、如何被可靠量化。它为其他应用方向提供可迁移的机理语言与验证工具。",
  },
  {
    slug: "surface-cleaning-removal",
    titleZh: "表面清洗与去除",
    titleEn: "Surface Cleaning & Removal",
    briefZh: "面向果蔬与材料表面清洗场景，将微纳米气泡的界面效应与臭氧氧化/杀菌能力结合，探索在更短时间、更低残留风险下提升去除效率并保持品质。",
    keywords: ["果蔬清洗", "臭氧微纳米气泡水", "生物膜", "农残", "品质保持", "CT值"],
    group: "Applications",
    category: "Food & Surface",
    positioningZh: "该方向是课题组强应用落地主线：把 O3-MNBs 的优势转换成可验证的工艺指标，用 CT 与风险边界控制把方案做成可执行的清洗 SOP。",
  },
  {
    slug: "agriculture-salt-alkali",
    titleZh: "农业高效种养与盐碱土修复",
    titleEn: "Efficient Agriculture & Saline-Alkali Soil Remediation",
    briefZh: "探索微纳米气泡在增氧、根际微环境调控、盐碱地改良等方面的作用机理与应用潜力，关注土壤理化-微生物-作物响应的系统耦合。",
    keywords: ["增氧", "根际", "盐碱土", "土壤理化", "作物抗逆", "微生物群落"],
    group: "Applications",
    category: "Agri-Tech",
    positioningZh: "该方向将 MNBs 的增氧与微环境调控能力用于农业场景，重点关注可量化指标与可放大施用方式。",
  },
  {
    slug: "equipment-development",
    titleZh: "水环境治理设备开发",
    titleEn: "Equipment Development for Water Environment Governance",
    briefZh: "围绕 O3-MNB 发生器与成套装备，开展结构设计、传质强化、在线监测与智能控制，建立可用于中试与工程化验证的模块化解决方案。",
    keywords: ["设备开发", "Venturi", "Swirl-Venturi", "传质系数KLa", "在线监测", "闭环控制"],
    group: "Core",
    category: "Engineering",
    positioningZh: "该方向是课题组工程化支撑主线：把机理与应用需求落到可制造、可运行、可监测的设备上。",
  },
];

export default researchDirections;
