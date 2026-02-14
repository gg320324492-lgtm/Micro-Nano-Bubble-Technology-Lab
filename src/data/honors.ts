// src/data/honors.ts

export type Honor = {
  id: string;
  year?: number;
  title: string;
  titleZh?: string;
  titleEn?: string;
};

export const honors: Honor[] = [
  { id: "honor-01", title: "全国博士后创新创业大赛天津赛区二等奖" },
  { id: "honor-02", year: 2025, title: "2025年天津留学回国人员创业启动专项入选者" },
  { id: "honor-03", year: 2025, title: "天津大学高水平自然科学类科技创新奖—青年科创奖（2025）" },
  { id: "honor-04", title: "环境科学技术一等奖" },
  { id: "honor-05", title: "天津海棠金种子基金获得者" },
  { id: "honor-06", year: 2023, title: "2023年度中国生态环境十大科技进展" },
  { id: "honor-07", title: "水利先进实用技术" },
  { id: "honor-08", title: "第二十届中国专利优秀奖获奖" },
  { id: "honor-09", title: "第七届“深水杯”全国大学生给排水科技创新大赛一等奖" },
  { id: "honor-10", title: "第七届教育部“第七届直属高校创新试验典型项目”创新试验类第一名" },
];

export default honors;
