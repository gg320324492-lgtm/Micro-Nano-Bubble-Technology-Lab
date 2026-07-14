// src/data/pi.ts
// PI 个人主页数据 — 由 src/components/PiCard.tsx 直接消费

export type PiTimelineItem = { time: string; text: string };

export type PiInfo = {
  nameZh: string;
  nameEn: string;

  title: string;
  org: string;

  email: string;
  homepage: string;
  avatar: string;

  addr: string;
  bio: string;

  // ✅ 首页 PI 卡片下方"研究方向"标签（按简历原文）
  tags: string[];

  // ✅ 教育 / 工作 / 学术兼职 三个时间线
  education: PiTimelineItem[];
  work: PiTimelineItem[];
  service: PiTimelineItem[];

  // ✅ 招生信息
  recruit: string;
};

export const pi: PiInfo = {
  nameZh: "王天志",
  nameEn: "Tianzhi Wang",

  title: "副教授（博导）",
  org: "天津大学 环境科学与工程学院",

  email: "zhaohangjia@tju.edu.cn",
  homepage: "https://faculty.tju.edu.cn/226066/zh_CN/index.htm",
  avatar: "/people/pi.jpg",

  addr: "天津市南开区卫津路92号（天津大学），邮编：300072",
  bio:
    “王天志，天津大学环境科学与工程学院副教授(博导)、瑞德智创新技术(天津)有限公司董事长。聚焦微纳米气泡技术领域前沿研究与应用，注重理论创新与技术转化，形成”技术突破商业转化”特色科研体系，构建了完整的微纳米气泡技术自主知识产权体系，创办企业获得主流资本的天使轮投资，融资1550万元，技术估值7000万元。”,

  // ✅ 研究方向（按简历原文 6 项）
  tags: [
    "微纳米气泡水中气泡溃灭与·OH 原位形成过程研究",
    "微纳米气泡用于水质提升机制研究",
    "基于微纳米气泡技术的表面清洗研究",
    "基于水肥气一体化的高效农业种植与水产养殖",
    "二氧化碳纳米气泡提升藻类固碳效能机制研究",
    "基于微纳米气泡技术的水环境治理设备开发",
  ],

  education: [
    { time: "2009.09 - 2013.07", text: "中国农业大学 - 水利与土木工程学院 - 本科" },
    { time: "2013.09 - 2018.07", text: "中国农业大学 - 水利与土木工程学院 - 硕博连读 博士" },
    { time: "2016.11 - 2017.11", text: "美国伊利诺伊香槟分校 - 农业与生物工程学院 - 联合培养博士" },
    { time: "2017.08 - 2017.10", text: "美国哥伦比亚大学 - Earth Engineering Center - 交流生" },
    { time: "2018.08 - 2020.09", text: "清华大学 - 环境学院 - 博士后" },
  ],

  work: [
    { time: "2018.08 - 2020.09", text: "清华大学 - 环境学院 - 博士后" },
    { time: "2018.10 - 2020.07", text: "清华苏州环境创新研究院 - 水循环利用创新研究团队 - 技术骨干" },
    { time: "2020.09 - 2022.03", text: "天津大学 - 环境科学与工程学院 - 讲师" },
    { time: "2022.03 至 今", text: "天津大学 - 环境科学与工程学院 - 副教授" },
    { time: "2024.09 至 今", text: "瑞德智创新技术（天津）有限公司 - 董事长" },
  ],

  service: [
    { time: "2024.03 - 2027.02", text: "《Processes》期刊客座编辑" },
    { time: "2024.04 - 2029.04", text: "全国研究生教育评估监测专家库专家" },
    { time: "2024", text: "天津大学科技创新领军人才（启明计划）" },
    { time: "2025.02 - 2030.01", text: "天津市宁河区产业高质量发展「领衔专家」" },
    { time: "2025.04 - 2029.03", text: "《净水技术》期刊青年编委" },
    { time: "2025", text: "首届天津大学青年科创奖" },
  ],

  recruit:
    "团队常年招收硕士研究生3–4名、博士生1–2名及本科生若干，欢迎环境/市政/自动化/农业工程/化工/工业设计等背景同学加入。",
};

export default pi;
