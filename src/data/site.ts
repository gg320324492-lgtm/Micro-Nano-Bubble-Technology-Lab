// src/data/site.ts

export const site = {
  nameZh: "微纳米气泡课题组",
  nameEn: "Micro & Nano Bubble Technology Lab",
  taglineZh:
    "聚焦微纳米气泡技术的机理研究、装备开发与多场景应用，面向饮用水安全、环境治理与智能化工程系统。",
  taglineEn:
    "Mechanisms, devices, and applications of micro/nano bubbles for drinking water safety, environmental remediation, and intelligent engineering systems.",
};

export const navItems = [
  { href: "/", zh: "首页", en: "Home" },
  { href: "/research", zh: "研究", en: "Research" },
  { href: "/industrialization", zh: "产业化", en: "Industrialization" },
  { href: "/publications", zh: "成果", en: "Publications" }, // ✅ 成果入口保留
  { href: "/people", zh: "成员", en: "People" },

  // ✅ 原“动态 / News” -> 改为 “风采展示 / Showcase”
  { href: "/showcase", zh: "风采展示", en: "Showcase" },

  { href: "/contact", zh: "联系/加入", en: "Contact & Join Us" },
] as const;
