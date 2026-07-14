// src/data/honors.ts

export type Honor = {
  id: string;
  year?: number;
  title: string;
  titleZh?: string;
  titleEn?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export const honors: Honor[] = [
  { id: "honor-01", title: "全国博士后创新创业大赛天津赛区二等奖" },
  { id: "honor-02", year: 2025, title: "2025年天津留学回国人员创业启动专项入选者" },
  {
    id: "honor-03",
    year: 2025,
    title: "首届天津大学高水平自然科学类科技创新奖—青年科创奖（2025）",
    imageSrc: "/images/honors/honor-2025-tju-young-innovation-award.png",
    imageAlt: "首届天津大学高水平自然科学类科技创新奖—青年科创奖（2025）荣誉证书",
  },
  { id: "honor-04", title: "环境科学技术一等奖" },
  { id: "honor-05", title: "天津海棠金种子基金获得者" },
  {
    id: "honor-06",
    year: 2023,
    title: "2023年度中国生态环境十大科技进展",
    imageSrc: "/images/honors/honor-2023-eco-top10-certificate.png",
    imageAlt: "2023年度中国生态环境十大科技进展证书",
  },
  { id: "honor-07", title: "水利先进实用技术" },
  { id: "honor-08", title: "第二十届中国专利优秀奖获奖" },
  {
    id: "honor-09",
    title: "第七届“深水杯”全国大学生给排水科技创新大赛一等奖",
    imageSrc: "/images/honors/honor-2024-shenshuibei-first-prize.png",
    imageAlt: "第七届“深水杯”全国大学生给排水科技创新大赛一等奖荣誉证书",
  },
  { id: "honor-10", title: "第七届教育部“第七届直属高校创新试验典型项目”创新试验类第一名" },
  { id: "honor-11", year: 2026, title: "「天开创聚津门」全国大学生智能科技创新创业挑战赛一等奖" },
  { id: "honor-12", year: 2024, title: "天津大学科技创新领军人才（启明计划）" },
  { id: "honor-13", year: 2023, title: "陆海水域微小有害生物应急处置技术装备与工程应用，中国环境科学学会，环境科学技术一等奖（9/15）" },
  { id: "honor-14", year: 2023, title: "陆海水域藻华与微小有害生物高效绿色防控新技术装备及工程应用，2023年度中国生态环境十大科技进展（10/18）" },
  { id: "honor-15", year: 2022, title: "首届天津市「零碳生活·绿色梦想」创新大赛二等奖" },
];

export default honors;
