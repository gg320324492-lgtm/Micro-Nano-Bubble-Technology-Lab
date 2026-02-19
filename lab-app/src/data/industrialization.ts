// 产业化基地数据模型

export type IndustrialBase = {
  slug: string;
  titleZh: string;
  titleEn?: string;
  briefZh: string;
  cover?: string;
  locationZh?: string;
  locationUrl?: string;
  monitorUrl?: string;
  highlightsZh?: string[];
  sections?: {
    titleZh: string;
    bodyZh: string;
    bulletsZh?: string[];
  }[];
};

export const industrialBases: IndustrialBase[] = [
  {
    slug: "aquaculture",
    titleZh: "水产养殖基地",
    titleEn: "Aquaculture Base",
    briefZh: "面向水产养殖场景，开展水质在线监测、增氧与水体调控等应用验证，形成监测—诊断—调控的闭环方案。",
    locationZh: "天津金谷兴农农业科技有限公司",
    locationUrl: "https://www.amap.com/?p=B0JB575BEM,38.93457879439492,117.34941646456716",
    monitorUrl: "http://1jj133ix41012.vicp.fun/#/screen",
    highlightsZh: [
      "在线监测：水温、溶氧(DO)、ORP、pH、电导率等",
      "数据可视化：大屏展示、趋势分析、告警联动",
      "工程验证：增氧与水质调控策略评估",
    ],
    sections: [
      {
        titleZh: "基地概况",
        bodyZh: "基地用于验证微纳米气泡在养殖水体中的增氧效率、分布均匀性与持续性，并结合在线监测数据，建立可解释、可复用的调控策略与运行边界。",
      },
      {
        titleZh: "监测与调控闭环",
        bodyZh: "以多参数传感—数据平台—策略输出—现场执行为主线，支持异常识别、工况诊断与联动控制。",
        bulletsZh: ["数据采集与清洗", "趋势与异常检测", "分级告警与联动策略", "现场执行与效果回传"],
      },
    ],
  },
  {
    slug: "reid-device-tianjin",
    titleZh: "瑞德智创新技术·天津--设备基地",
    titleEn: "Device Manufacturing Base",
    briefZh: "面向工程落地与产业化交付，开展微纳米气泡一体机与河道治理曝气系统的研发、生产、集成测试与应用验证。",
    locationZh: "瑞德智创新技术（天津）有限公司",
    locationUrl: "https://www.amap.com/place/B0M6HZ9FXW",
    highlightsZh: [
      "纯氧微纳米气泡一体机：高效增氧、低能耗",
      "臭氧微纳米气泡一体机：强化氧化/消毒",
      "空气微纳米气泡一体机：通用增氧/搅拌",
      "河道治理：长距离、低能耗、均匀曝气系统",
    ],
    sections: [
      {
        titleZh: "基地定位",
        bodyZh: "以可制造、可交付、可运维为目标，构建从结构设计、加工装配到整机测试的工程化闭环。",
      },
      {
        titleZh: "产品与系统能力",
        bodyZh: "围绕不同气源与处理目标，形成模块化产品序列与系统集成能力。",
        bulletsZh: ["一体机标准化与定制化", "集成测试与出厂验收", "现场安装调试与运维支持"],
      },
    ],
  },
];

export default industrialBases;
