export type ReidProduct = {
  model: string;
  spec: string;
  scenes: string[];
  summary: string;
};

export type ReidProductGroup = {
  id: "rd-nm" | "rd-o3n" | "rd-bq";
  label: string;
  subtitle: string;
  products: ReidProduct[];
};

export type ReidScene = {
  name: string;
  value: string;
  recommend: string;
};

export type ReidClientType = {
  title: string;
  detail: string;
};

export const reidDeviceShowcaseContent = {
  heroValue: "从实验室技术到工程交付，15天内完成设备交付与现场落地准备。",
  kpiCards: [
    { label: "合同订单额", value: "近200万+", note: "累计签订合同规模" },
    { label: "标准交付周期", value: "15天", note: "支持快速选型与排产" },
    { label: "客户复购率", value: "80%+", note: "持续合作与复购验证" },
    { label: "产品型号", value: "14种", note: "覆盖发生器/一体机/曝气系统" },
  ],
  trustBadges: [
    "成立时间：2024-09-29",
    "海棠基金投资：50万",
    "团队规模：全职3人 + 兼职16人",
    "生产线：1条",
    "到账金额：95万",
    "营收增长：2025较2024增长20倍+",
  ],
  productGroups: [
    {
      id: "rd-nm",
      label: "RD-NM",
      subtitle: "微纳米气泡发生器",
      products: [
        { model: "RD-NM-0.2", spec: "200L/h", scenes: ["水产", "农业"], summary: "小流量工况，适合试验段与精细化补氧。" },
        { model: "RD-NM-1", spec: "1m3/h", scenes: ["污水", "饮用水"], summary: "通用型机组，适配中小规模处理节点。" },
        { model: "RD-NM-2", spec: "2m3/h", scenes: ["水处理", "养殖"], summary: "兼顾处理效率与运行稳定性。" },
        { model: "RD-NM-4", spec: "4m3/h", scenes: ["工业清洗", "灌溉"], summary: "中高负荷连续运行场景优选。" },
        { model: "RD-NM-6", spec: "6m3/h", scenes: ["工程项目", "系统集成"], summary: "面向规模化交付的高通量型号。" },
      ],
    },
    {
      id: "rd-o3n",
      label: "RD-O3N",
      subtitle: "臭氧纳米气泡一体机",
      products: [
        { model: "RD-O3N-0.2", spec: "200L/h", scenes: ["医疗消毒", "实验验证"], summary: "小规模臭氧纳米气泡强化氧化/灭菌。" },
        { model: "RD-O3N-1", spec: "1m3/h", scenes: ["饮用水", "食品"], summary: "兼顾臭氧传质效率与运行安全。" },
        { model: "RD-O3N-2", spec: "2m3/h", scenes: ["污水处理", "工业"], summary: "应对中等污染负荷的强化处理需求。" },
        { model: "RD-O3N-4", spec: "4m3/h", scenes: ["园区工程", "工艺改造"], summary: "适配连续工况与多单元协同运行。" },
        { model: "RD-O3N-6", spec: "6m3/h", scenes: ["大型项目", "平台化交付"], summary: "面向工程化项目的大流量一体机。" },
      ],
    },
    {
      id: "rd-bq",
      label: "RD-BQ",
      subtitle: "长距离低能耗曝气机",
      products: [
        { model: "RD-BQ-5", spec: "500m", scenes: ["河道", "景观水体"], summary: "单段长距离均匀曝气，部署灵活。" },
        { model: "RD-BQ-10", spec: "2*500m", scenes: ["黑臭水体", "湖库"], summary: "双段覆盖，兼顾治理效率与能耗。" },
        { model: "RD-BQ-15", spec: "3*500m", scenes: ["支流治理", "生态修复"], summary: "多段扩展，适配复杂水域走向。" },
        { model: "RD-BQ-20", spec: "4*500m", scenes: ["规模化治理", "市政项目"], summary: "高覆盖长度，适合持续维稳场景。" },
      ],
    },
  ] as ReidProductGroup[],
  advantageCards: [
    { title: "气泡粒径可控", desc: "稳定产生 50-1000nm 微纳米气泡，按场景调节粒径分布。" },
    { title: "高气泡密度", desc: "气泡个数可达 10^9 个/mL，强化传质与反应效率。" },
    { title: "自由基强化", desc: "原位羟基自由基 110-350 umol/L，提升氧化与消杀效果。" },
    { title: "多气源切换", desc: "支持纯氧/臭氧/空气等多气源方案快速切换。" },
    { title: "占地紧凑", desc: "模块化结构，便于在厂区或现场快速部署。" },
    { title: "自主知识产权", desc: "核心装备具备自主知识产权与技术迭代能力。" },
    { title: "操作友好", desc: "配置清晰的人机界面，降低培训与运维门槛。" },
    { title: "交付导向设计", desc: "可制造、可交付、可运维的一体化工程思路。" },
  ],
  topScenes: [
    { name: "污水处理", value: "强化氧化与增氧并行，提升污染物去除效率。", recommend: "推荐：RD-O3N-2 / RD-BQ-10" },
    { name: "饮用水净化", value: "提高氧化消毒效率，兼顾出水稳定性。", recommend: "推荐：RD-O3N-1 / RD-NM-1" },
    { name: "水产养殖", value: "提升溶氧与水体活性，降低应激风险。", recommend: "推荐：RD-NM-2 / RD-NM-4" },
    { name: "农业灌溉", value: "改善水体活化与输配效率，提升利用率。", recommend: "推荐：RD-NM-1 / RD-NM-2" },
    { name: "医疗消毒", value: "提供稳定氧化与灭菌支持，适配敏感场景。", recommend: "推荐：RD-O3N-0.2 / RD-O3N-1" },
    { name: "工业清洗", value: "用于脱脂与表面清洁，降低化学剂依赖。", recommend: "推荐：RD-NM-4 / RD-O3N-2" },
  ] as ReidScene[],
  moreScenes: [
    "病害防治",
    "食品加工",
    "饮料生产",
    "水疗康复",
    "化学反应促进",
    "空气净化",
  ],
  deliverySteps: [
    { step: "01", title: "需求沟通", desc: "明确水质目标、处理规模与部署边界。" },
    { step: "02", title: "方案选型", desc: "给出设备组合、型号与参数建议。" },
    { step: "03", title: "生产装配", desc: "按交付清单完成制造、集成与排产。" },
    { step: "04", title: "出厂测试", desc: "执行整机调试、性能验证与验收记录。" },
    { step: "05", title: "现场调试与运维", desc: "支持安装调试、培训交接与运行保障。" },
  ],
  clientTypes: [
    { title: "环保与水处理企业", detail: "污水厂、运维商、水处理公司" },
    { title: "农业与水产客户", detail: "灌溉企业、养殖基地、设施农业" },
    { title: "食品与饮料企业", detail: "工艺水处理、消毒与品质保障" },
    { title: "医疗与健康行业", detail: "消毒灭菌与高标准水处理需求" },
    { title: "工业制造客户", detail: "清洗脱脂与过程强化应用" },
    { title: "科研与设备合作方", detail: "高校院所、环保设备制造商" },
  ] as ReidClientType[],
  proofSections: [
    { title: "产业化证明", desc: "订单、交付与复购形成稳定转化闭环。" },
    { title: "性能测试", desc: "覆盖出厂测试与关键参数验证流程。" },
    { title: "现场效果", desc: "支持现场部署、调试和持续运维回访。" },
  ],
};

export default reidDeviceShowcaseContent;
