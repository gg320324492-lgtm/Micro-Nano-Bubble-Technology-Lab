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

  highlightsZh?: string[];
  sections?: IndustrialSection[];
  gallery?: IndustrialImage[];
};

export const industrialBases: IndustrialBase[] = [
  {
    slug: "aquaculture",
    titleZh: "天津大学纳米农业实验站·天津--水产养殖基地",
    titleEn: "Aquaculture Base (Tianjin Univ. Nano-Agri Experimental Station)",
    briefZh:
      "面向水产养殖场景，开展水质在线监测、增氧与水体调控等应用验证，形成“监测—诊断—调控”的闭环方案。",

    cover: "/industrialization/aquaculture/g17.full.webp",

    // ✅ 高德地图导航（用你给的链接，放在代码里）
    locationZh: "天津金谷兴农农业科技有限公司（高德地图导航）",
    locationUrl:
      "https://www.amap.com/?p=B0JB575BEM,38.93457879439492,117.34941646456716,%E5%A4%A9%E6%B4%A5%E9%87%91%E8%B0%B7%E5%85%B4%E5%86%9C%E5%86%9C%E4%B8%9A%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8,%E5%9B%BD%E5%AE%B6%E5%86%9C%E4%B8%9A%E7%A7%91%E6%8A%80%E5%9B%AD%E5%8C%BA(%E7%A7%91%E6%8A%80%E5%A4%A7%E9%81%93)",

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

    // ✅ 18 张图集（按"外景→设施→设备→运行→数据→维护→养殖对象→配套→团队/荣誉"的叙事顺序排列）
    gallery: [
      // —— 外景与全景（先建立基地印象）
      { src: "/industrialization/aquaculture/g17.jpg", captionZh: "基地外景 / 标牌与建筑" },
      { src: "/industrialization/aquaculture/g13.jpg", captionZh: "基地外景 / 标牌特写" },
      { src: "/industrialization/aquaculture/g15.jpg", captionZh: "基地外景 / 实验站全景" },
      { src: "/industrialization/aquaculture/g24.jpg", captionZh: "基地外景 / 大棚与种植区全景" },

      // —— 进入基地：温室与设施
      { src: "/industrialization/aquaculture/g06.jpg", captionZh: "基地内景 / 大棚种植与对比工况" },
      { src: "/industrialization/aquaculture/g02.jpg", captionZh: "设备布置 / 管路与曝气点" },

      // —— 设备、传感与运行
      { src: "/industrialization/aquaculture/g23.jpg", captionZh: "设备布置 / 一体化机柜与管路" },
      { src: "/industrialization/aquaculture/g22.jpg", captionZh: "基地现场 / 温室养殖圆池" },

      // —— 数据平台与运维
      { src: "/industrialization/aquaculture/g07.jpg", captionZh: "现场维护 / 运维与巡检" },

      // —— 养殖对象
      { src: "/industrialization/aquaculture/g08.jpg", captionZh: "养殖对象 / 加州鲈鱼" },
      { src: "/industrialization/aquaculture/g25.png", captionZh: "养殖对象 / 高密度养殖池鱼群活体状态" },
      { src: "/industrialization/aquaculture/g26.png", captionZh: "养殖对象 / 成品鱼打样展示" },

      // —— 业务配套与团队
      { src: "/industrialization/aquaculture/g19.jpg", captionZh: "基地配套 / 商业模式洽谈区" },
      { src: "/industrialization/aquaculture/g21.jpg", captionZh: "团队简介 / 团队成员展示墙" },
      { src: "/industrialization/aquaculture/g20.jpg", captionZh: "团队 / 会议室与综合展示" },
      { src: "/industrialization/aquaculture/g18.jpg", captionZh: "团队 / 荣誉证书与专利墙" },
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
          "瑞德智创新技术（天津）有限公司成立于 2024 年 9 月，海棠基金投资 350 万元，是课题组微纳米气泡技术工程化落地的制造与交付基地。以「可制造、可交付、可运维」为目标，构建从结构设计、加工装配到整机测试的工程化闭环，支撑多场景设备选型与规模化应用。",
        bulletsZh: ["海棠基金投资 350 万", "全职 7 人 + 兼职 10 人", "两条生产线", "合同金额 1000 万+"],
      },
      {
        titleZh: "产品与系统能力",
        bodyZh:
          "围绕不同气源与处理目标，形成 RD-NM 微纳米气泡发生器、RD-O3N 臭氧纳米气泡一体机、RD-BQ 长距离低能耗曝气机三大产品序列，共 14 种型号，覆盖实验室到大型工程的全流量段需求。",
        bulletsZh: ["RD-NM 微纳米气泡发生器", "RD-O3N 臭氧纳米气泡一体机", "RD-BQ 长距离低能耗曝气机", "一体机标准化与定制化"],
      },
      {
        titleZh: "技术优势",
        bodyZh:
          "核心装备具备自主知识产权：气泡粒径 50–1000nm 可控，气泡个数可达 10⁹ 个/mL，原位羟基自由基 110–350 μmol/L；支持纯氧/臭氧/空气多气源快速切换，模块化结构便于现场快速部署与运维。",
        bulletsZh: ["气泡粒径可控 50–1000nm", "高气泡密度 10⁹ 个/mL", "自由基强化 110–350 μmol/L", "多气源切换 / 占地紧凑"],
      },
      {
        titleZh: "交付与客户",
        bodyZh:
          "标准交付周期 15 天，客户复购率 80% 以上。交付流程覆盖需求沟通、方案选型、生产装配、出厂测试到现场调试与运维。客户覆盖环保水处理、农业水产、食品饮料、医疗健康、工业制造与科研合作六大方向。",
        bulletsZh: ["需求沟通 → 方案选型 → 生产装配", "出厂测试 → 现场调试与运维", "2025 营收较 2024 增长 20 倍+", "复购率 80%+"],
      },
      {
        titleZh: "工况演示与讲解",
        bodyZh:
          "面向来访客户与合作伙伴开展工况演示与技术讲解，覆盖设备运行状态、气泡观测与典型场景应用效果，直观呈现设备在温室、设施农业与野外河道等场景的运行表现。",
        bulletsZh: ["设备运行状态演示", "气泡观测与讲解", "温室与设施农业应用", "野外河道工况实测"],
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

  // ✅ 顶部 1+2 hero band 用的第二/第三张封面图
  { src: "/industrialization/reid-device-tianjin/2.jpg", captionZh: "厂区/车间/办公场景 — 待补充" },
  { src: "/industrialization/reid-device-tianjin/3.jpg", captionZh: "厂区/车间/办公场景 — 待补充" },
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
          "针对黑臭河道、景观湖泊与水库支流有机负荷高、氨氮超标、藻类繁殖与底层缺氧等复合问题，单一工艺往往只能“局部见效”。我们构建“臭氧微纳米气泡快速减负 + 长距离低能耗曝气持续维稳”的协同路线，前端快速削减污染、后端稳氧控内源，形成“上覆水净化-底层稳氧-内源控制”闭环治理，可按水域类型灵活组合，兼顾短期考核效果与长期生态稳定。",
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
          "在 5 处不同类型水体的多点位样品测试中，臭氧微纳米气泡对有机污染、氨氮和藻类指标均实现稳定改善；典型案例经 10 分钟处理后，叶绿素去除率达 71.53%。后续以长距离低能耗曝气持续维持底层溶解氧，支撑有机物降解与内源抑制，为治理成果巩固和反弹风险控制提供设施支撑。",
        bulletsZh: [
          "COD 下降约 21%-28%，氨氮下降约 28%-93%",
          "总磷下降约 17%-37%，浊度整体下降 25% 以上，叶绿素整体下降 50% 以上",
          "典型案例（慈溪观城河道）10 分钟处理即显著改善黑臭与藻类",
          "长距离低能耗曝气构建长效稳水基础设施，降低反弹风险",
        ],
      },
      {
        titleZh: "适用场景与展示价值",
        bodyZh:
          "适用于黑臭河道、景观湖泊、水库支流、富营养化水体及藻华高发水域。相较单一工艺，其核心优势在于“快治+稳水”协同——前期快速改善观感与污染负荷，后期持续增氧巩固生态、减少返黑返臭。方案落地性强，可按目标水域特征匹配处理方式与运行强度，兼顾治理效率、能耗与运维成本，适合示范项目复制推广。",
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
