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

  // 代表性产品（含销售额）
  { src: "/industrialization/reid-device-tianjin/g07.png", captionZh: "实验室微纳米气泡发生器（销售额：15万）" },
  { src: "/industrialization/reid-device-tianjin/g08.png", captionZh: "工业微纳米气泡发生器（销售额：35万）" },
  { src: "/industrialization/reid-device-tianjin/g09.png", captionZh: "臭氧微纳米气泡一体机（销售额：80万）" },
  { src: "/industrialization/reid-device-tianjin/g10.png", captionZh: "长距离低能耗曝气机（销售额：60万）" },

  // 产品现场使用
  { src: "/industrialization/reid-device-tianjin/g12.png", captionZh: "治理项目应用点位" },
  { src: "/industrialization/reid-device-tianjin/g13.png", captionZh: "项目现场合影与交付" },
  { src: "/industrialization/reid-device-tianjin/g14.png", captionZh: "水体治理运行状态" },
  { src: "/industrialization/reid-device-tianjin/g15.png", captionZh: "设备应用示范" },
  { src: "/industrialization/reid-device-tianjin/g16.png", captionZh: "工况演示与讲解" },
  { src: "/industrialization/reid-device-tianjin/g17.png", captionZh: "温室场景应用" },
  { src: "/industrialization/reid-device-tianjin/g18.png", captionZh: "设施农业点位" },
  { src: "/industrialization/reid-device-tianjin/g19.png", captionZh: "装备运行实拍" },
  { src: "/industrialization/reid-device-tianjin/g20.png", captionZh: "多功能一体式微纳米气泡发生器性能测试结果" },
  { src: "/industrialization/reid-device-tianjin/g21.png", captionZh: "产业化证明材料（一）" },
  { src: "/industrialization/reid-device-tianjin/g22.png", captionZh: "产业化证明材料（二）" },
],

  },

  {
    slug: "black-odorous-water",
    titleZh: "黑臭水体治理与水生态稳定提升",
    titleEn: "Black-Odorous Water Remediation & Ecological Stabilization",
    briefZh:
      "依托自主研发的长距离低能耗曝气机与臭氧微纳米气泡一体机，我们面向黑臭河道、水库、景观湖及富营养化支流，提供兼顾“快速降污、持续增氧、控藻除臭、长效稳水”的综合治理方案。该技术路线能够围绕 COD、氨氮、总磷、浊度、叶绿素等关键指标进行协同改善，既适用于前期需要迅速提升观感和削减污染负荷的项目，也适用于治理后期需要稳定水质、抑制返黑返臭的持续维稳场景。",

    // 先占位的图片与场景介绍，后续可替换为实景照片
    cover: "/industrialization/black-odorous-water/cover.png",

    locationZh: "黑臭河道、水库、景观湖及富营养化支流等典型水环境治理场景",

    highlightsZh: [
      "臭氧微纳米气泡快速降污",
      "长距离低能耗曝气持续增氧",
      "黑臭河道与富营养化水体治理",
      "底泥内源抑制与返黑返臭控制",
      "快速见效与长效稳水协同",
    ],

    sections: [
      {
        titleZh: "核心概览",
        bodyZh:
          "黑臭河道、景观湖泊与水库支流普遍存在有机污染负荷高、氨氮超标、藻类繁殖和底层缺氧等复合问题，单一工艺往往只能“局部见效”。针对这一痛点，我们构建“臭氧微纳米气泡快速减负 + 长距离低能耗曝气持续维稳”的协同路线。\n\n前端通过臭氧微纳米气泡在短时间内强化传质与氧化反应，快速削减 COD、氨氮、异味与藻类压力，改善黑臭感和透明度；后端通过连续底部曝气维持溶解氧、恢复好氧微生物活性并抑制底泥内源释放，降低返黑返臭风险。\n\n该路线本质上是“上覆水净化-底层稳氧-内源控制”闭环治理，可根据水域类型灵活组合船载巡航、定点处理与常态化增氧网络，兼顾短期考核效果与长期生态稳定。",
        bulletsZh: [
          "前端快治：臭氧微纳米气泡快速降污、控藻除臭",
          "后端稳水：低能耗曝气持续增氧、抑制内源释放",
          "闭环机理：上覆水净化 + 底层稳氧 + 内源控制",
          "工程适配：巡航作业、定点强化、常态化维稳可组合",
        ],
      },
      {
        titleZh: "成果概览",
        bodyZh:
          "多点位样品测试表明，臭氧微纳米气泡对有机污染、氨氮污染和藻类指标均具有稳定改善能力。在 5 处不同类型水体中，COD 下降约 21%-28%，氨氮下降约 28%-93%，总磷下降约 17%-37%，浊度整体下降 25% 以上，叶绿素整体下降 50% 以上。\n\n典型案例中，慈溪观城河道样品经 10 分钟处理后，COD 由 92 mg/L 降至 73 mg/L，氨氮由 66.75 mg/L 降至 44.66 mg/L，浊度由 31.3 NTU 降至 25.3 NTU，叶绿素由 47.32 μg/L 降至 13.47 μg/L（去除率 71.53%）。\n\n在后续维稳阶段，长距离低能耗曝气可持续维持底层溶解氧，支撑有机物降解、氮循环与底泥内源抑制，为治理成果巩固和反弹风险控制提供基础设施支撑。",
        bulletsZh: [
          "5 处不同类型水体测试中，COD 下降约 21%-28%，氨氮下降约 28%-93%",
          "总磷下降约 17%-37%，浊度整体下降 25% 以上，叶绿素整体下降 50% 以上",
          "典型案例 10 分钟处理后，叶绿素去除率达到 71.53%",
          "长距离低能耗曝气系统可作为长效稳水基础设施，降低反弹风险",
        ],
      },
      {
        titleZh: "适用场景与展示价值",
        bodyZh:
          "该技术适用于黑臭河道、景观湖泊、水库支流、富营养化水体及藻华高发水域等复杂场景。相较单一工艺，其核心优势在于“快治+稳水”协同：前期快速改善观感和污染负荷，后期通过持续增氧巩固生态环境，减少返黑返臭。\n\n从展示与工程价值看，该方案具备较强落地性，可根据目标水域特征匹配处理方式与运行强度，在保障治理效率的同时兼顾能耗与运维成本，适合示范项目复制推广。",
        bulletsZh: [
          "适用于黑臭河道、景观湖泊、水库支流及富营养化水体",
          "快速见效：短时间改善黑臭、浊度与藻类问题",
          "长效稳水：持续增氧抑制返黑返臭",
          "工程可落地：兼顾治理效率、能耗与运维成本",
        ],
      },
    ],

    gallery: [
      { src: "/industrialization/black-odorous-water/gallery01.png", captionZh: "现场巡检记录（监利项目点位A）" },
      { src: "/industrialization/black-odorous-water/gallery02.png", captionZh: "现场巡检记录（监利项目点位B）" },
      { src: "/industrialization/black-odorous-water/gallery03.png", captionZh: "治理前典型黑臭与底泥扰动状态" },
      { src: "/industrialization/black-odorous-water/gallery04.png", captionZh: "治理运行过程中的水面状态与曝气轨迹" },
      { src: "/industrialization/black-odorous-water/gallery05.png", captionZh: "治理后河道断面水体状态（沿岸近景）" },
      { src: "/industrialization/black-odorous-water/gallery06.png", captionZh: "静海独流镇项目现场作业照片" },
      { src: "/industrialization/black-odorous-water/gallery07.png", captionZh: "藻类富集与表层污染阶段状态" },
      { src: "/industrialization/black-odorous-water/gallery08.png", captionZh: "典型点位前后对比（样点1）" },
      { src: "/industrialization/black-odorous-water/gallery09.png", captionZh: "典型点位前后对比（样点2）" },
      { src: "/industrialization/black-odorous-water/gallery10.png", captionZh: "典型点位前后对比（样点3）" },
    ],
  },
];

export default industrialBases;
