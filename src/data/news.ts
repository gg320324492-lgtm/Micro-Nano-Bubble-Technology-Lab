// src/data/news.ts

export type NewsItem = {
  id: string;
  date: string; // "2026-02"
  titleZh: string;
  titleEn?: string;

  // ✅ 新增：可选链接（用于点卡片/按钮打开 PDF）
  href?: string;
};

export const news: NewsItem[] = [
  {
    id: "n1",
    date: "2026-02",
    titleZh: "首届“瑞德杯”研究生学术论坛暨2025年终总结大会（通知）",
    titleEn: "RuiDe Cup Graduate Forum & 2025 Annual Summary Meeting (Notice)",
    // ✅ 请把你的PDF放到：public/news/20260206-annual-meeting.pdf
    href: "/news/20260206-annual-meeting.pdf",
  },
  {
    id: "n2",
    date: "2025-12",
    titleZh: "论文接收 / 会议报告（占位）",
    titleEn: "Paper accepted / conference talk (placeholder)",
  },
  {
    id: "n3",
    date: "2025-09",
    titleZh: "设备升级与实验平台迭代（占位）",
    titleEn: "Platform upgrade (placeholder)",
  },
];

export default news;
