// src/data/news.ts

export type NewsContent = {
  theme?: string;
  objectives?: string;
  time?: string;
  location?: string;
  agenda?: { time: string; content: string; location?: string }[];
  reports?: { time: string; speaker: string; title: string }[];
  attendees?: string;
  supportOrg?: string;
};

export type NewsItem = {
  id: string;
  date: string; // "2026-02"
  titleZh: string;
  titleEn?: string;
  href?: string; // PDF 等外链
  slug?: string; // 有则跳转 /news/[slug]
  coverImage?: string; // 封面图路径，空则显示占位
  content?: NewsContent; // 详情页富内容
};

export const news: NewsItem[] = [
  {
    id: "n1",
    date: "2026-02",
    titleZh: "首届“瑞德杯”研究生学术论坛暨2025年终总结大会",
    titleEn: "RuiDe Cup Graduate Forum & 2025 Annual Summary Meeting",
    href: "/news/20260206-annual-meeting.pdf",
    slug: "2026-ruide-cup-forum",
    coverImage: "/news/ruide-cup-0.png",
    content: {
      theme:
        "本次会议聚焦微纳米气泡在环境工程、化学工程、自动化等方向的研究进展，推动研究生学术表达与团队协同，系统总结课题组2025年度工作，部署2026年度重点任务。",
      objectives:
        "本次会议旨在搭建高质量学术交流平台，促进研究生及不同研究方向之间的成果分享与方法互鉴；集中汇报课题组2025年度代表性论文、专利、项目与关键数据进展，系统呈现阶段性突破；依托「瑞德杯」报告评比机制，强化科研逻辑表达、答辩应对与学术规范训练；同步开展年度工作复盘与问题诊断，梳理目标完成情况、关键瓶颈、资源需求与改进路径；并在此基础上明确2026年度研究主线与分工安排，形成可执行的路线图、里程碑与工作计划。",
      time: "2026年2月8日（星期日）上午8:30",
      location: "天津大学北洋园校区环境学院 59楼 A217",
      agenda: [
        { time: "8:30-8:35", content: "开幕式", location: "59楼 A217" },
        { time: "8:35-12:10", content: "主题报告", location: "59楼 A217" },
        { time: "12:20-12:30", content: "颁发证书", location: "59楼 A217" },
        { time: "17:30-20:00", content: "晚餐" },
      ],
      reports: [
        { time: "8:35-8:50", speaker: "赵航佳", title: "水界面污染物行为的多尺度计算模拟" },
        { time: "8:50-9:05", speaker: "杨慈", title: "微纳米气泡协同紫外对蜡样芽孢杆菌消杀机制研究" },
        { time: "9:05-9:20", speaker: "余歆睿", title: "微纳米气泡对盐碱土壤资源化利用的作用机制与循环农业潜力研究" },
        { time: "9:20-9:35", speaker: "张宏魁", title: "年度科研工作总结与展望" },
        { time: "9:35-9:50", speaker: "陈金薪", title: "臭氧微纳米气泡对油泥破乳实验进展和下学期计划" },
        { time: "9:50-10:05", speaker: "王书馨", title: "磁絮凝在含油废水中的应用进展" },
        { time: "10:05-10:20", speaker: "李胜景", title: "微纳米气泡相关研究进展" },
        { time: "10:20-10:35", speaker: "刘子毅", title: "臭氧微纳米气泡前沿研究综述：界面反应场、ROS证据链与多场协同工程应用" },
        { time: "10:35-10:50", speaker: "吴孟铨", title: "16S rRNA 扩增子测序的原理、发展与应用" },
        { time: "10:50-11:05", speaker: "关小未", title: "微纳米气泡赋能的种养一体化高效生产模式构建——八里台大棚年度成果汇报" },
        { time: "11:05-11:20", speaker: "杜同贺", title: "分享与年度回顾" },
        { time: "11:20-11:35", speaker: "陈天祥", title: "高浓度臭氧微纳米气泡水在清洗过程中对果蔬的品质影响" },
        { time: "11:35-11:40", speaker: "韩重阳", title: "年度科研工作总结与展望" },
        { time: "11:40-11:45", speaker: "李锐远", title: "本年度研究总结与未来展望" },
        { time: "11:45-11:50", speaker: "胡小琪", title: "臭氧微纳米气泡对油泥破乳实验进展和下学期计划" },
        { time: "11:50-11:55", speaker: "宋洋", title: "基于臭氧微纳米气泡对膜污染的控制及饮用水处理的研究" },
        { time: "11:55-12:00", speaker: "耿嘉栋", title: "臭氧发生器应用现状及前景分析" },
        { time: "12:05-12:10", speaker: "蒋芦迪", title: "磁絮凝在含油废水中的应用进展" },
      ],
      attendees: "微纳米气泡课题组全组成员",
      supportOrg: "瑞德智创新技术(天津)有限公司",
    },
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
