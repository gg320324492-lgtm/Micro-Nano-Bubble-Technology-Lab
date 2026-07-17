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

export const showcaseStories: ShowcaseStory[] = [];

/* -------------------------------------------------------------------------- */
/*  分组图集：实验室 / 瑞德杯-学术会 / 答辩会                                    */
/* -------------------------------------------------------------------------- */

export type GalleryPhoto = {
  src: string;
  alt: string;
  caption?: string;
  focusY?: number;
};

export type GalleryCategoryId = "lab" | "ruide-cup" | "defense";

export type GalleryCategory = {
  id: GalleryCategoryId;
  badge: string;
  titleZh: string;
  titleEn: string;
  description: string;
  photos: GalleryPhoto[];
};

export const galleryCategories: GalleryCategory[] = [
  {
    id: "lab",
    badge: "Lab",
    titleZh: "实验室",
    titleEn: "Lab & Team",
    description:
      "天津大学微纳米气泡实验室坐落于环境科学与工程学院，配备气泡发生、粒径表征、水处理与水产养殖等多套自主研发的实验系统。这里既是同学们开展科研的「主阵地」，也是课题组日常交流、文献讨论与想法碰撞的家园。",
    photos: [
      {
        src: "/showcase/lab/g01.jpg",
        alt: "实验室全景与团队介绍墙",
        caption: "实验室全景：研究环境与团队介绍墙",
      },
      {
        src: "/showcase/lab/g02.jpg",
        alt: "实验室全景",
        caption: "实验室全景：自主搭建的微纳米气泡生成与水处理实验装置一览",
      },
      {
        src: "/showcase/lab/g03.jpg",
        alt: "实验设备一角",
        caption: "实验设备一角：气泡发生、循环水及在线监测系统",
      },
      {
        src: "/showcase/lab/g04.jpg",
        alt: "实验室门牌",
        caption: "实验室门牌：天津大学微纳米气泡实验室",
      },
      {
        src: "/showcase/lab/g05.jpg",
        alt: "荣誉墙、论文墙与专利墙",
        caption: "荣誉墙 · 论文墙 · 专利墙：科研产出与团队成果",
      },
      {
        src: "/showcase/lab/g06.jpg",
        alt: "研究方向展区",
        caption: "研究方向展区：四大研究领域的图文介绍",
      },
    ],
  },
  {
    id: "ruide-cup",
    badge: "Conference",
    titleZh: "瑞德杯研究生学术论坛",
    titleEn: "Ruide Cup Graduate Academic Forum",
    description:
      "首届「瑞德杯」研究生学术论坛暨微纳米气泡课题组年终总结大会顺利举行。课题组同学通过口头报告、海报展示等形式分享一年来的科研成果，并与校内外专家、兄弟院校师生深入交流，多名同学获评优秀报告。",
    photos: [
      {
        src: "/showcase/ruide-cup/g01.jpg",
        alt: "首届瑞德杯研究生学术论坛暨课题组年终总结大会",
        caption: "首届「瑞德杯」研究生学术论坛暨课题组年终总结大会",
      },
      {
        src: "/showcase/ruide-cup/g02.jpg",
        alt: "颁奖环节",
        caption: "现场颁奖环节：课题组同学获评优秀报告奖",
      },
      {
        src: "/showcase/ruide-cup/g03.jpg",
        alt: "学术报告现场",
        caption: "学术报告现场：同学汇报最新研究进展",
      },
      {
        src: "/showcase/ruide-cup/g04.jpg",
        alt: "课题组合影",
        caption: "课题组合影：集体亮相学术论坛",
      },
      {
        src: "/showcase/ruide-cup/g05.jpg",
        alt: "海报展示与交流",
        caption: "海报展示与交流：与同行深入讨论研究思路",
      },
      {
        src: "/showcase/ruide-cup/g07.jpg",
        alt: "自由讨论",
        caption: "自由讨论：跨方向碰撞思想火花",
      },
      {
        src: "/showcase/ruide-cup/g08.jpg",
        alt: "论坛闭幕",
        caption: "论坛闭幕：期待下一届再相聚",
      },
    ],
  },
  {
    id: "defense",
    badge: "Defense",
    titleZh: "学位论文答辩",
    titleEn: "Thesis Defense",
    description:
      "课题组定期组织硕博学位论文答辩会。近年来，多名研究生顺利通过答辩、获得学位，并继续在微纳米气泡技术领域深造或走上工作岗位；每一次答辩既是个人的里程碑，也是课题组薪火相传的见证。",
    photos: [
      {
        src: "/showcase/defense/g01.jpg",
        alt: "天津大学环境科学与工程学院硕博士学位论文答辩会",
        caption:
          "天津大学环境科学与工程学院硕博士学位论文答辩会现场",
      },
      {
        src: "/showcase/defense/g02.jpg",
        alt: "答辩委员与课题组合影",
        caption: "答辩委员与课题组合影",
      },
      {
        src: "/showcase/defense/g03.jpg",
        alt: "答辩现场留念",
        caption: "答辩现场留念",
      },
      {
        src: "/showcase/defense/g04.jpg",
        alt: "答辩委员会合影",
        caption: "答辩委员会合影",
      },
      {
        src: "/showcase/defense/g05.jpg",
        alt: "个人答辩留念",
        caption: "个人答辩留念",
      },
      {
        src: "/showcase/defense/g06.jpg",
        alt: "与导师合影",
        caption: "与导师合影：感谢悉心指导",
      },
      {
        src: "/showcase/defense/g07.jpg",
        alt: "课题组合影",
        caption: "课题组合影：薪火相传",
      },
      {
        src: "/showcase/defense/g08.jpg",
        alt: "答辩后交流",
        caption: "答辩后交流：与评委深入探讨",
      },
      {
        src: "/showcase/defense/g09.jpg",
        alt: "学位授予时刻",
        caption: "学位授予时刻",
      },
      {
        src: "/showcase/defense/g10.jpg",
        alt: "庆祝合影",
        caption: "庆祝合影",
      },
      {
        src: "/showcase/defense/g11.jpg",
        alt: "答辩会圆满结束",
        caption: "答辩会圆满结束",
      },
    ],
  },
];
