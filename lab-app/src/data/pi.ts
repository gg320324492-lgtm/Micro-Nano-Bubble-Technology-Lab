// PI (实验室主任) 数据模型

export type PiInfo = {
  nameZh: string;
  nameEn?: string;
  titleZh: string;
  titleEn?: string;
  affiliationZh: string;
  affiliationEn?: string;
  email: string;
  websiteZh: string;
  photo?: string;
  addressZh?: string;
  bioZh: string;
  educationZh?: string[];
  experienceZh?: string[];
  appointmentsZh?: string[];
  researchFocusZh?: string[];
  recruitmentZh?: string;
};

export const pi: PiInfo = {
  nameZh: "王天志",
  nameEn: "Tianzhi Wang",
  titleZh: "副教授（博导）",
  titleEn: "Associate Professor",
  affiliationZh: "天津大学 环境科学与工程学院",
  affiliationEn: "School of Environmental Science & Engineering, Tianjin University",
  email: "wangtianzhi@tju.edu.cn",
  websiteZh: "https://faculty.tju.edu.cn/226066/zh_CN/index.htm",
  photo: "/people/pi.jpg",
  addressZh: "天津市南开区卫津路92号（天津大学），邮编：300072",
  bioZh: "王天志，天津大学环境科学与工程学院副教授（博导）。聚焦微纳米气泡机理与工程应用，涵盖气泡溃灭与·OH原位形成、协同消毒与饮用水生物稳定性提升、表面清洗与水环境治理装备开发等方向。",
  researchFocusZh: [
    "微纳米气泡溃灭与·OH原位形成",
    "协同氯消毒与杀菌机制",
    "饮用水生物稳定性（AOC/BDOC）",
    "臭氧/纳米气泡水处理强化",
    "微纳米气泡装备与在线监测",
    "表面清洗与农业应用",
  ],
  educationZh: [
    "2009.9–2013.6 中国农业大学 农业水利工程 学士",
    "2013.9–2018.6 中国农业大学 农业水土工程 博士",
    "2016.11–2017.11 美国伊利诺伊大学香槟分校 联合培养博士",
    "2017.8–2017.10 美国哥伦比亚大学 Earth Engineering Center 交流生",
    "2018.8–2020.9 清华大学 环境科学 博士后",
  ],
  experienceZh: [
    "2020.9–2022.3 天津大学 环境科学与工程学院 助理研究员",
    "2022.3–2024.10 天津大学 环境科学与工程学院 副研究员",
  ],
  appointmentsZh: [
    "2025.2–2030.1 天津市宁河区产业高质量发展领衔专家",
    "2025.4–2029.3 《净水技术》期刊青年编委",
    "2024.4–2029.4 全国研究生教育评估监测专家库专家",
    "2024.3–2027.2 《Processes》期刊客座编辑",
  ],
  recruitmentZh: "团队常年招收硕士研究生3–4名、博士生1-2名及本科生若干，欢迎环境/市政/自动化/农业工程/化工/工业设计等背景同学加入。",
};

export default pi;
