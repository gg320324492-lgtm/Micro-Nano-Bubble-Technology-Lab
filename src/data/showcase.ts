// src/data/showcase.ts

export type ShowcasePhoto = {
  src: string;
  alt: string;
};

export type ShowcaseStory = {
  title: string;
  date?: string;
  tags?: string[];
  content: string;
};

export const showcasePhotos: ShowcasePhoto[] = [
  { src: "/showcase/dinner/g01.jpg", alt: "课题组风采 01" },
  { src: "/showcase/dinner/g02.jpg", alt: "课题组风采 02" },
  { src: "/showcase/dinner/g03.jpg", alt: "课题组风采 03" },
  { src: "/showcase/dinner/g04.jpg", alt: "课题组风采 04" },
  { src: "/showcase/dinner/g05.jpg", alt: "课题组风采 05" },
  { src: "/showcase/dinner/g06.jpg", alt: "课题组风采 06" },
  { src: "/showcase/dinner/g07.jpg", alt: "课题组风采 07" },
];

// 下面故事保持不变
export const showcaseStories: ShowcaseStory[] = [
  {
    title: "一张白板，拆出一条“结构—流动—气泡—反应”链路",
    date: "2026-02",
    tags: ["组会", "讨论", "方法论"],
    content:
      "一次例会上，我们把核心问题写在白板最上方：同样投加臭氧，为什么效果差异却很大？随后从流道结构、局部湍动、气泡粒径分布、溶解臭氧稳态与自由基生成逐层拆解，最终形成一条可验证路径：每一段都有对应指标、实验与拟合方法。",
  },
  {
    title: "阶段性节点：把数据讲清楚，比把数据做出来更难",
    date: "2026-01",
    tags: ["论文", "表达", "图表"],
    content:
      "我们反复对齐坐标、单位、误差棒、对比组；结论不仅要有绝对值与提升幅度，还要有可解释的机理支撑。最终的成就感来自：别人能一眼看懂你想表达什么。",
  },
  {
    title: "聚餐不是“和科研无关”，而是团队保持高能量的方式",
    date: "2025-12",
    tags: ["团建", "日常", "氛围"],
    content:
      "每次阶段性推进、每个新成员加入、每个难点解决，我们都愿意用一顿饭来庆祝。很多灵感并不发生在电脑前，而是在更放松的时刻自然冒出来。",
  },
];
