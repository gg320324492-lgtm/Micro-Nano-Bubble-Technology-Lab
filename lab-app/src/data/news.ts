// 新闻动态数据模型

export type NewsItem = {
  id: string;
  date: string;
  titleZh: string;
  titleEn?: string;
  href?: string;
};

export const news: NewsItem[] = [
  {
    id: "n1",
    date: "2026-02",
    titleZh: "首届瑞德杯研究生学术论坛暨2025年终总结大会（通知）",
    titleEn: "RuiDe Cup Graduate Forum & 2025 Annual Summary Meeting (Notice)",
    href: "/news/20260206-annual-meeting.pdf",
  },
  {
    id: "n2",
    date: "2025-12",
    titleZh: "论文接收 / 会议报告",
    titleEn: "Paper accepted / conference talk",
  },
  {
    id: "n3",
    date: "2025-09",
    titleZh: "设备升级与实验平台迭代",
    titleEn: "Platform upgrade",
  },
];

export default news;
