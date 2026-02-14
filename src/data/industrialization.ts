// src/data/industrialization.ts

export type IndustrialImage = {
  src: string; // 例如：/industrialization/aquaculture/g01.jpg
  alt?: string;
  captionZh?: string;
};

export type IndustrialSection = {
  titleZh: string;
  bodyZh: string;
  bulletsZh?: string[];
};

export type IndustrialBase = {
  slug: string; // 路由：/industrialization/[slug]
  titleZh: string;
  titleEn?: string;
  briefZh: string;

  cover?: string;

  // 位置（支持外链到高德/百度）
  locationZh?: string;
  locationUrl?: string;

  // 监测大屏（外链按钮，不动）
  monitorUrl?: string;

  highlightsZh?: string[];
  sections?: IndustrialSection[];
  gallery?: IndustrialImage[];
};

export const industrialBases: IndustrialBase[] = [
  {
    slug: "aquaculture",
    titleZh: "水产养殖基地",
    titleEn: "Aquaculture Base",
    briefZh:
      "面向水产养殖场景，开展水质在线监测、增氧与水体调控等应用验证，形成“监测—诊断—调控”的闭环方案。",

    cover: "/industrialization/aquaculture/cover.jpg",

    // ✅ 高德地图导航（用你给的链接，放在代码里）
    locationZh: "天津金谷兴农农业科技有限公司（高德地图导航）",
    locationUrl:
      "https://www.amap.com/?p=B0JB575BEM,38.93457879439492,117.34941646456716,%E5%A4%A9%E6%B4%A5%E9%87%91%E8%B0%B7%E5%85%B4%E5%86%9C%E5%86%9C%E4%B8%9A%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8,%E5%9B%BD%E5%AE%B6%E5%86%9C%E4%B8%9A%E7%A7%91%E6%8A%80%E5%9B%AD%E5%8C%BA(%E7%A7%91%E6%8A%80%E5%A4%A7%E9%81%93)",

    // ✅ 监测大屏（按钮不动）
    monitorUrl: "http://1jj133ix41012.vicp.fun/#/screen",

    highlightsZh: [
      "在线监测：水温、溶氧（DO）、ORP、pH、电导率等",
      "数据可视化：大屏展示、趋势分析、告警联动",
      "工程验证：增氧与水质调控策略评估",
    ],

    sections: [
      {
        titleZh: "基地概况",
        bodyZh:
          "基地用于验证微纳米气泡在养殖水体中的增氧效率、分布均匀性与持续性，并结合在线监测数据，建立可解释、可复用的调控策略与运行边界。",
      },
      {
        titleZh: "监测与调控闭环",
        bodyZh:
          "以“多参数传感—数据平台—策略输出—现场执行”为主线，支持异常识别、工况诊断与联动控制，为养殖水体稳定运行与风险预警提供支撑。",
        bulletsZh: ["数据采集与清洗", "趋势与异常检测", "分级告警与联动策略", "现场执行与效果回传"],
      },
      {
        titleZh: "应用验证方向",
        bodyZh:
          "围绕溶氧提升、水体气味与浊度改善、应激风险降低等目标，结合季节与负荷变化开展长期运行评价与对比测试。",
      },
    ],

    // ✅ 7 张图集（加上封面一共 8 张）
    gallery: [
      { src: "/industrialization/aquaculture/g01.jpg", captionZh: "基地现场 / 池塘环境" },
      { src: "/industrialization/aquaculture/g02.jpg", captionZh: "设备布置 / 管路与曝气点" },
      { src: "/industrialization/aquaculture/g03.jpg", captionZh: "传感器安装 / 在线监测节点" },
      { src: "/industrialization/aquaculture/g04.jpg", captionZh: "运行过程 / 气泡与水体状态" },
      { src: "/industrialization/aquaculture/g05.jpg", captionZh: "平台大屏 / 数据可视化界面" },
      { src: "/industrialization/aquaculture/g06.jpg", captionZh: "对比测试 / 不同工况效果" },
      { src: "/industrialization/aquaculture/g07.jpg", captionZh: "现场维护 / 运维与巡检" },
    ],
  },

  {
    slug: "reid-device-tianjin",
    // ✅ 你要求的新名字
    titleZh: "瑞德智创新技术·天津--设备基地",
    titleEn: "Device Manufacturing Base (Reid Zhichuang, Tianjin)",
    briefZh:
      "面向工程落地与产业化交付，开展微纳米气泡一体机与河道治理曝气系统的研发、生产、集成测试与应用验证，覆盖纯氧/臭氧/空气等多气源方案。",

    cover: "/industrialization/reid-device-tianjin/cover.jpg",

    locationZh: "瑞德智创新技术（天津）有限公司（高德地图导航）",
    locationUrl: "https://www.amap.com/place/B0M6HZ9FXW",

    highlightsZh: [
      "纯氧微纳米气泡一体机：高效增氧、低能耗，适配高需氧工况",
      "臭氧微纳米气泡一体机：强化氧化/消毒，兼顾传质效率与运行安全",
      "空气微纳米气泡一体机：通用增氧/搅拌/水体修复，维护成本友好",
      "河道治理：长距离、低能耗、均匀曝气系统，适用于黑臭水体与景观水体改善",
    ],

    sections: [
      {
        titleZh: "基地定位",
        bodyZh:
          "以“可制造、可交付、可运维”为目标，构建从结构设计、加工装配到整机测试的工程化闭环，支撑多场景设备选型与规模化应用。",
      },
      {
        titleZh: "产品与系统能力",
        bodyZh:
          "围绕不同气源与处理目标，形成模块化产品序列与系统集成能力，并在典型场景下开展性能、能耗与可靠性评估。",
        bulletsZh: ["一体机标准化与定制化", "集成测试与出厂验收", "现场安装调试与运维支持"],
      },
    ],

    // ✅ 图集 3 张（加上封面共 4 张）
    gallery: [
  { src: "/industrialization/reid-device-tianjin/g01.jpg", captionZh: "生产与装配现场" },
  { src: "/industrialization/reid-device-tianjin/g02.jpg", captionZh: "厂区/门头/基地标识" },
  { src: "/industrialization/reid-device-tianjin/g03.jpg", captionZh: "设备集成/打包与交付准备" },

  // ✅ 新增的三张
  { src: "/industrialization/reid-device-tianjin/g04.jpg", captionZh: "臭氧/纯氧微纳米气泡一体机（外观与面板）" },
  { src: "/industrialization/reid-device-tianjin/g05.jpg", captionZh: "关键部件细节（控制/气路/水路）" },
  { src: "/industrialization/reid-device-tianjin/g06.jpg", captionZh: "整机测试与调试（出厂前验证）" },
],

  },
];

export default industrialBases;
