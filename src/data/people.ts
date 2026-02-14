// src/data/people.ts

export type PersonRole =
  | "PI"
  | "Faculty"
  | "Staff"
  | "PhD"
  | "Master"
  | "Undergrad"
  | "Alumni";

export type Person = {
  id: string;
  role: PersonRole;

  nameZh: string;
  nameEn: string;

  titleZh: string;
  orgZh: string;

  introZh: string;
  tags?: string[];

  avatar?: string;

  // ✅ 新增：入学年级（显示为 “2025级”）
  cohort?: number;

  email?: string;
  homepage?: string;
};

function mk(
  id: string,
  role: PersonRole,
  nameZh: string,
  nameEn: string,
  topicZh: string,
  tags: string[],
  cohort: number,
  ext: "jpg" | "png" = "jpg"
): Person {
  const titleMap: Record<PersonRole, string> = {
    PI: "教授 / 博导",
    Faculty: "教师",
    Staff: "工作人员",
    PhD: "博士研究生",
    Master: "硕士研究生",
    Undergrad: "本科生",
    Alumni: "已毕业",
  };

  return {
    id,
    role,
    nameZh,
    nameEn,
    titleZh: titleMap[role],
    orgZh: "天津大学",
    introZh: topicZh,
    tags,
    cohort,
    avatar: `/people/${id}.${ext}`,
  };
}

// 五大方向（主方向 tag）
const TAG_WQ = "水质提升与安全保障";
const TAG_OH = "气泡溃灭与·OH原位生成";
const TAG_CLEAN = "表面清洗与去除";
const TAG_AGRI = "农业高效种养与盐碱土修复";
const TAG_EQUIP = "水环境治理设备开发";

export const people: Person[] = [
  // 博士生（2025级）
  mk(
    "zhaohangjia",
    "PhD",
    "赵航佳",
    "Hangjia Zhao",
    "面向饮用水安全，研究微纳米气泡协同消毒与生物稳定性提升机制。",
    [TAG_WQ, "饮用水安全", "生物稳定性"],
    2025
  ),

  // 硕士生（2025级）
  mk(
    "dutonghe",
    "Master",
    "杜同贺",
    "Tonghe Du",
    "围绕污染控制与水质提升，开展微纳米气泡强化工艺研究与数据分析。",
    [TAG_WQ, "水质提升", "微纳米气泡"],
    2025
  ),
  mk(
    "chentianxiang",
    "Master",
    "陈天祥",
    "Tianxiang Chen",
    "构建微纳米气泡清洗/去除工艺并评估关键去污指标。",
    [TAG_CLEAN, "表面清洗", "去除工艺"],
    2025
  ),
  mk(
    "zhangyi",
    "Master",
    "张懿",
    "Yi Zhang",
    "面向智能化运行，探索发生器参数优化与在线监测/控制思路。",
    [TAG_EQUIP, "运行优化", "在线监测"],
    2025
  ),
  mk(
    "gengjiadong",
    "Master",
    "耿嘉栋",
    "Jiadong Geng",
    "面向工程化落地，参与发生器结构优化与系统集成验证。",
    [TAG_EQUIP, "装备开发", "系统集成"],
    2025
  ),

  // 硕士生（2024级）
  mk(
    "chenjinxin",
    "Master",
    "陈金薪",
    "Jinxin Chen",
    "解析气泡溃灭过程的界面活化特征与·OH生成动力学。",
    [TAG_OH, "自由基", "界面反应"],
    2024
  ),
  mk(
    "donghaoyu",
    "Master",
    "董昊宇",
    "Haoyu Dong",
    "探索微纳米气泡在农业水-土环境中的增效应用与评价方法。",
    [TAG_AGRI, "农业应用", "水-土环境"],
    2024
  ),
  mk(
    "guanxiaowei",
    "Master",
    "关小未",
    "Xiaowei Guan",
    "关注盐碱土改良与高效种养场景中的微纳米气泡应用路径。",
    [TAG_AGRI, "盐碱土修复", "种养系统"],
    2024
  ),
  mk(
    "huxiaoqi",
    "Master",
    "胡小琪",
    "Xiaoqi Hu",
    "研究微纳米气泡协同消毒及其对耐受菌控制的效果与机理。",
    [TAG_WQ, "消毒/抑菌", "微生物控制"],
    2024
  ),
  mk(
    "lishengjing",
    "Master",
    "李胜景",
    "Shengjing Li",
    "聚焦灌溉系统生物堵塞机理与微纳米气泡缓堵策略评估。",
    [TAG_AGRI, "生物堵塞", "灌溉系统"],
    2024
  ),
  mk(
    "liuziyi",
    "Master",
    "刘子毅",
    "Ziyi Liu",
    "构建水质提升工艺的评价体系与实验数据处理流程。",
    [TAG_WQ, "过程评价", "数据分析"],
    2024
  ),
  mk(
    "songyang",
    "Master",
    "宋洋",
    "Yang Song",
    "研究微纳米气泡对管网生物膜及水质稳定性的影响与控制策略。",
    [TAG_WQ, "生物稳定性", "管网生物膜"],
    2024
  ),
  mk(
    "wangshuxin",
    "Master",
    "王书馨",
    "Shuxin Wang",
    "探索微纳米气泡在农业灌溉与土壤修复中的工程化应用方法。",
    [TAG_AGRI, "农业应用", "土壤修复"],
    2024
  ),
  mk(
    "wumengquan",
    "Master",
    "吴孟铨",
    "Mengquan Wu",
    "研究溃灭诱导自由基生成与传质强化的关键影响因素。",
    [TAG_OH, "气泡溃灭", "传质强化"],
    2024
  ),

  // 硕士生（2023级）
  mk(
    "hanchongyang",
    "Master",
    "韩重阳",
    "Chongyang Han",
    "面向设备开发，推进发生器与供气/供水单元的工程优化与验证。",
    [TAG_EQUIP, "装备研发", "工程验证"],
    2023
  ),
  mk(
    "liruiyuan",
    "Master",
    "李锐远",
    "Ruiyuan Li",
    "研究微纳米气泡在管网生物膜控制与水质稳定性提升中的作用。",
    [TAG_WQ, "生物膜控制", "管网系统"],
    2023
  ),
  mk(
    "yangci",
    "Master",
    "杨慈",
    "Ci Yang",
    "评估微纳米气泡对水质指标与微生物风险因子的调控效果。",
    [TAG_WQ, "水质保障", "风险因子"],
    2023
  ),
  mk(
    "yuxinrui",
    "Master",
    "余歆睿",
    "Xinrui Yu",
    "围绕饮用水生物稳定性评价与控制策略开展实验与分析。",
    [TAG_WQ, "AOC/BDOC", "生物稳定性"],
    2023
  ),
  mk(
    "zhanghongkui",
    "Master",
    "张宏魁",
    "Hongkui Zhang",
    "探索微纳米气泡在设施农业与盐碱土修复场景中的增效机制。",
    [TAG_AGRI, "设施农业", "盐碱土修复"],
    2023
  ),

  // 本科生（2022级）
  mk(
    "jiaqi",
    "Undergrad",
    "贾琦",
    "Qi Jia",
    "参与表面清洗去除实验与指标测定，协助数据整理与记录。",
    [TAG_CLEAN, "实验辅助", "数据整理"],
    2022
  ),

  // 本科生（2023级）
  mk(
    "zhouzhichao",
    "Undergrad",
    "周之超",
    "Zhichao Zhou",
    "参与表面污染去除实验与数据整理，支持文献调研与材料准备。",
    [TAG_CLEAN, "表面去除", "文献调研"],
    2023
  ),
  mk(
    "dengguoxiang",
    "Undergrad",
    "邓国祥",
    "Guoxiang Deng",
    "参与溃灭与自由基相关实验辅助与基础数据分析。",
    [TAG_OH, "实验辅助", "数据分析"],
    2023
  ),

  // ✅ 已毕业成员（新增：雒培媛）
  mk(
    "luopeiyuan",
    "Alumni",
    "雒培媛",
    "Peiyuan Luo",
    "曾参与微纳米气泡相关研究与实验工作，现于同济大学攻读博士。",
    [TAG_WQ, "微纳米气泡", "水处理"],
    2022
  ),
];

export default people;
