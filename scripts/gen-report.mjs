// scripts/gen-report.mjs
// 生成《微纳米气泡课题组官网 - 信息更新报告》Word 版本
// Usage: node scripts/gen-report.mjs

import { writeFileSync } from 'node:fs';
import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel, BorderStyle,
  WidthType, ShadingType, VerticalAlign, PageNumber, PageBreak,
  TableOfContents,
} from 'docx';

const FONT_HAN = '宋体';
const FONT_HAN_HEAD = '黑体';
const FONT_EN = 'Arial';

const COLORS = {
  PRIMARY: '1F4E79',
  ACCENT: '2E7D32',
  MUTED: '666666',
  GRAY_BG: 'F2F2F2',
  HEADER_BG: 'D5E8F0',
};

const tableBorder = { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF' };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

// ---------- helpers ----------
const h1 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_1,
  children: [new TextRun({ text, bold: true, font: FONT_HAN_HEAD })],
});
const h2 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  children: [new TextRun({ text, bold: true, font: FONT_HAN_HEAD })],
});
const h3 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_3,
  children: [new TextRun({ text, bold: true, font: FONT_HAN_HEAD })],
});
const p = (text, opts = {}) => new Paragraph({
  spacing: { after: 120 },
  children: [new TextRun({ text, font: FONT_HAN, size: 22, ...opts })],
});
const pRuns = (runs, opts = {}) => new Paragraph({
  spacing: { after: 120 },
  children: runs.map((r) => (typeof r === 'string'
    ? new TextRun({ text: r, font: FONT_HAN, size: 22 })
    : new TextRun({ font: FONT_HAN, size: 22, ...r }))),
  ...opts,
});

const cellP = (text, opts = {}) => new Paragraph({
  alignment: opts.align ?? AlignmentType.LEFT,
  children: [new TextRun({ text, font: FONT_HAN, size: 20, bold: opts.bold, color: opts.color })],
});

const makeTable = (rows, widths, headerShade = COLORS.HEADER_BG) => new Table({
  columnWidths: widths,
  margins: { top: 80, bottom: 80, left: 100, right: 100 },
  rows: rows.map((cells, rowIdx) => new TableRow({
    tableHeader: rowIdx === 0,
    children: cells.map((cell, colIdx) => new TableCell({
      borders: cellBorders,
      width: { size: widths[colIdx], type: WidthType.DXA },
      shading: rowIdx === 0
        ? { fill: headerShade, type: ShadingType.CLEAR }
        : (cell.bg ? { fill: cell.bg, type: ShadingType.CLEAR } : undefined),
      verticalAlign: VerticalAlign.CENTER,
      children: Array.isArray(cell.content)
        ? cell.content.map((t) => cellP(t.text, t))
        : [cellP(cell.content ?? cell, cell.textOpts ?? {})],
    })),
  })),
});

const newBadge = '🆕';
const changeBadge = '🔄';
const keepBadge = '✅';

// ---------- sections ----------
const headerBlock = () => new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 0, after: 240 },
  children: [new TextRun({
    text: '微纳米气泡课题组官网',
    bold: true, size: 56, font: FONT_HAN_HEAD, color: COLORS.PRIMARY,
  })],
});
const subtitleBlock = () => new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 480 },
  children: [new TextRun({
    text: '信息更新报告（完整版）',
    bold: true, size: 36, font: FONT_HAN_HEAD, color: COLORS.PRIMARY,
  })],
});
const metaBlock = () => {
  const meta = [
    ['更新日期', '2026-07-14'],
    ['更新依据', '《天津大学环境科学与工程学院-王天志-简历.pdf》'],
    ['更新范围', 'src/data/ 下 6 个数据文件 + 首页 PI 卡片组件'],
    ['Git 提交', '687263e feat(data): 根据王天志老师最新简历更新个人信息和成果列表'],
    ['远端推送', '✅ main 1272b4b..687263e'],
    ['线上验证', '✅ https://mnb-lab.cn/ 已包含本次更新内容'],
  ];
  return new Table({
    columnWidths: [1800, 7560],
    margins: { top: 100, bottom: 100, left: 0, right: 0 },
    rows: meta.map(([k, v]) => new TableRow({
      children: [
        new TableCell({
          borders: cellBorders,
          width: { size: 1800, type: WidthType.DXA },
          shading: { fill: COLORS.GRAY_BG, type: ShadingType.CLEAR },
          children: [cellP(k, { bold: true })],
        }),
        new TableCell({
          borders: cellBorders,
          width: { size: 7560, type: WidthType.DXA },
          children: [cellP(v)],
        }),
      ],
    })),
  });
};

const sec1 = () => [
  h1('一、PI 个人主页'),
  p('数据文件: src/data/pi.ts · 展示组件: src/components/PiCard.tsx'),

  h2('1.1 基本信息'),
  makeTable([
    [{ content: '项目' }, { content: '状态' }, { content: '说明' }],
    [{ content: '姓名 / 英文名' }, { content: '王天志 / Tianzhi Wang' }, { content: '未变' }],
    [{ content: '职称' }, { content: '副教授（博导）' }, { content: '未变' }],
    [{ content: '邮箱' }, { content: 'zhaohangjia@tju.edu.cn' }, { content: '未改动（按指示保留）' }],
    [{ content: '主页' }, { content: 'https://faculty.tju.edu.cn/226066/zh_CN/index.htm' }, { content: '未变' }],
    [{ content: '地址' }, { content: '天津市南开区卫津路92号（天津大学），邮编 300072' }, { content: '未变' }],
  ], [2200, 4000, 3160]),

  h2('1.2 个人简介'),
  pRuns([
    { text: '新增内容：', bold: true, color: COLORS.ACCENT },
    '明确「瑞德智创新技术（天津）有限公司董事长」身份；融入「技术突破-商业转化」特色科研体系描述；补充产业化关键数据：',
    { text: '天津海棠基金 + 西青区金种子基金、融资 1550 万元、技术估值 7000 万元', bold: true, color: COLORS.ACCENT },
    '。',
  ]),

  h2('1.3 研究方向（按简历原文 6 项重写）'),
  makeTable([
    [{ content: '#' }, { content: '研究方向' }, { content: '状态' }],
    [{ content: '1' }, { content: '微纳米气泡水中气泡溃灭与·OH 原位形成过程研究' }, { content: changeBadge + ' 重写' }],
    [{ content: '2' }, { content: '微纳米气泡用于水质提升机制研究' }, { content: changeBadge + ' 重写' }],
    [{ content: '3' }, { content: '基于微纳米气泡技术的表面清洗研究' }, { content: changeBadge + ' 重写' }],
    [{ content: '4' }, { content: '基于水肥气一体化的高效农业种植与水产养殖' }, { content: changeBadge + ' 重写' }],
    [{ content: '5' }, { content: '二氧化碳纳米气泡提升藻类固碳效能机制研究' }, { content: newBadge + ' 新增', textOpts: { color: COLORS.ACCENT, bold: true } }],
    [{ content: '6' }, { content: '基于微纳米气泡技术的水环境治理设备开发' }, { content: changeBadge + ' 重写' }],
  ], [600, 7200, 1560]),

  h2('1.4 教育经历（4 项）'),
  new Paragraph({ numbering: { reference: 'edu', level: 0 }, children: [new TextRun({ text: '2009.09–2013.07  中国农业大学 水利与土木工程学院 本科', font: FONT_HAN, size: 22 })] }),
  new Paragraph({ numbering: { reference: 'edu', level: 0 }, children: [new TextRun({ text: '2013.09–2018.07  中国农业大学 水利与土木工程学院 硕博连读 博士', font: FONT_HAN, size: 22 })] }),
  new Paragraph({ numbering: { reference: 'edu', level: 0 }, children: [new TextRun({ text: '2016.11–2017.11  美国伊利诺伊香槟分校 农业与生物工程学院 联合培养博士', font: FONT_HAN, size: 22 })] }),
  new Paragraph({ numbering: { reference: 'edu', level: 0 }, children: [new TextRun({ text: '2017.08–2017.10  美国哥伦比亚大学 Earth Engineering Center 交流生', font: FONT_HAN, size: 22 })] }),

  h2('1.5 工作经历（补充至 5 段完整时间线）'),
  makeTable([
    [{ content: '时间' }, { content: '单位' }, { content: '职务' }, { content: '状态' }],
    [{ content: '2018.08–2020.09' }, { content: '清华大学 环境学院' }, { content: '博士后' }, { content: keepBadge }],
    [{ content: '2018.10–2020.07' }, { content: '清华苏州环境创新研究院' }, { content: '水循环团队 技术骨干' }, { content: newBadge + ' 新增', textOpts: { color: COLORS.ACCENT, bold: true } }],
    [{ content: '2020.09–2022.03' }, { content: '天津大学 环境学院' }, { content: '讲师（修正原『助理研究员』）' }, { content: changeBadge + ' 修正' }],
    [{ content: '2022.03 至今' }, { content: '天津大学 环境学院' }, { content: '副教授' }, { content: changeBadge }],
    [{ content: '2024.09 至今' }, { content: '瑞德智创新技术（天津）有限公司' }, { content: '董事长' }, { content: newBadge + ' 新增', textOpts: { color: COLORS.ACCENT, bold: true } }],
  ], [1900, 2700, 3400, 1360]),

  h2('1.6 学术兼职（6 项）'),
  makeTable([
    [{ content: '时间' }, { content: '兼职' }, { content: '状态' }],
    [{ content: '2024.03–2027.02' }, { content: '《Processes》期刊客座编辑' }, { content: keepBadge }],
    [{ content: '2024.04–2029.04' }, { content: '全国研究生教育评估监测专家库专家' }, { content: keepBadge }],
    [{ content: '2024' }, { content: '天津大学科技创新领军人才（启明计划）' }, { content: newBadge + ' 新增', textOpts: { color: COLORS.ACCENT, bold: true } }],
    [{ content: '2025.02–2030.01' }, { content: '天津市宁河区产业高质量发展「领衔专家」' }, { content: keepBadge }],
    [{ content: '2025.04–2029.03' }, { content: '《净水技术》期刊青年编委' }, { content: keepBadge }],
    [{ content: '2025' }, { content: '首届天津大学青年科创奖' }, { content: newBadge + ' 新增', textOpts: { color: COLORS.ACCENT, bold: true } }],
  ], [2200, 5800, 1360]),

  h2('1.7 招生信息'),
  p('未变：团队常年招收硕士研究生3–4名、博士生1–2名及本科生若干，欢迎环境/市政/自动化/农业工程/化工/工业设计等背景同学加入。'),
];

const sec2 = () => [
  h1('二、科研项目（src/data/projects.ts）'),
  h2('2.1 自主基金（4 项已有，全部按简历核对）'),
  makeTable([
    [{ content: '项目编号' }, { content: '课题名称' }, { content: '时间' }],
    [{ content: '2025XCG-0007' }, { content: '纳米级可控与多气源转换的微纳米气泡发生器' }, { content: '2025/01–2025/12' }],
    [{ content: '2024XQM-0038' }, { content: '启明计划：微纳米气泡水中·OH 原位生成' }, { content: '2024/01–2025/12' }],
    [{ content: '2023XJS-0043' }, { content: '微纳米气泡湮灭生成羟基自由基的机制' }, { content: '2023/01–2023/12' }],
    [{ content: '2022XSU-0030' }, { content: '加氧滴灌对海南大棚西瓜增产提质' }, { content: '2022/01–2022/12' }],
  ], [2000, 5800, 1560]),

  h2('2.2 项目列表 — 新增 4 项京津冀国家科技重大专项'),
  makeTable([
    [{ content: '编号' }, { content: '课题名称' }, { content: '时间' }],
    [{ content: '2026ZD1208903-01' }, { content: '水体致黑臭固体有机废弃物快速上浮与高效低耗收集装备' }, { content: '2026/06–2030/05' }],
    [{ content: '2026ZD1208904-03' }, { content: '粒径自适应微纳米气泡的泥/水界面生境原位改善技术' }, { content: '2026/06–2030/05' }],
    [{ content: '2026ZD1208905-05' }, { content: '内源释放型黑臭水体原位修复技术集成及示范' }, { content: '2026/06–2030/05' }],
    [{ content: '2026ZD1208905-07' }, { content: '复合污染型黑臭水体综合治理技术集成与示范' }, { content: '2026/06–2030/05' }],
  ], [2400, 5400, 1560]),

  h2('2.3 已在库的 2025 年京津冀专项（核对一致）'),
  p('2025ZD1204603-06 多气源在线切换微纳米曝气系统设备研发与应用（2025/09–2029/08）'),

  h2('2.4 乡村振兴专项'),
  p('2021 宕昌县农业施肥对小流域水体污染的影响及施肥量控制阈值研究'),
];

const sec3 = () => [
  h1('三、论文发表（src/data/publications.ts）'),
  h2('3.1 新增 2 篇 2026 年论文'),
  makeTable([
    [{ content: '#' }, { content: '期刊' }, { content: '卷期 / 文章号' }, { content: 'DOI' }],
    [{ content: 'pub-2026-00' }, { content: 'Journal of Hazardous Materials' }, { content: '2026, 513, 142456' }, { content: '10.1016/j.jhazmat.2026.142456' }],
    [{ content: 'pub-2026-06' }, { content: 'Processes' }, { content: '2026, 14, 1093' }, { content: '10.3390/pr14061093' }],
  ], [1500, 3000, 2700, 2160]),

  p('pub-2026-00：Tianzhi Wang 等. Catalyst-free aqueous-phase oxidation of toluene by ozone micro-nanobubbles coupled with H₂O₂ via interfacial reactive oxygen species'),
  p('pub-2026-06：Ruiyuan Li, Tianzhi Wang* 等. Mechanisms of Enhancing Tetracycline Oxidation in Wastewater by Ozone Micro-Nano Bubbles'),

  h2('3.2 修正 1 项'),
  pRuns([
    'pub-2025-02：CEJ 卷期号 ',
    { text: '515, 153782 → 515, 163782', bold: true, color: COLORS.ACCENT },
    '（与简历原文对齐）',
  ]),

  h2('3.3 简历中 1–14 篇论文核对'),
  p('全部已在库中，无需新增。中文期刊 2 篇亦已在库。'),
];

const sec4 = () => [
  h1('四、专利（src/data/patents.ts）'),
  h2('4.1 新增 4 项专利'),
  makeTable([
    [{ content: '编号' }, { content: '专利名称' }, { content: '专利号' }],
    [{ content: 'pat-23' }, { content: '一种长距离低能耗的曝气管及曝气系统' }, { content: 'ZL 2025 2 0304785.5' }],
    [{ content: 'pat-24' }, { content: '一种一体式微纳米气泡发生装置' }, { content: '202421612345.8' }],
    [{ content: 'pat-25' }, { content: '一种低功耗水质监测仪' }, { content: '202421637582.X' }],
    [{ content: 'pat-26' }, { content: '一种多电源水质监测仪' }, { content: '202421637580.0' }],
  ], [1200, 5800, 2360]),

  h2('4.2 简历中其余 10 项专利'),
  p('全部已在库中。'),
];

const sec5 = () => [
  h1('五、主要奖励（src/data/honors.ts）'),
  h2('5.1 新增 5 项'),
  makeTable([
    [{ content: '年份' }, { content: '奖项' }],
    [{ content: '2026' }, { content: '「天开创聚津门」全国大学生智能科技创新创业挑战赛一等奖' }],
    [{ content: '2024' }, { content: '天津大学科技创新领军人才（启明计划）' }],
    [{ content: '2023' }, { content: '陆海水域微小有害生物应急处置技术装备与工程应用，环境科学技术一等奖（9/15）' }],
    [{ content: '2023' }, { content: '陆海水域藻华与微小有害生物高效绿色防控新技术装备及工程应用，2023 年度中国生态环境十大科技进展（10/18）' }],
    [{ content: '2022' }, { content: '首届天津市「零碳生活·绿色梦想」创新大赛二等奖' }],
  ], [1200, 8160]),

  h2('5.2 已在库'),
  new Paragraph({ numbering: { reference: 'honor', level: 0 }, children: [new TextRun({ text: '2025 天津大学青年科创奖、天津留学回国人员创业启动专项', font: FONT_HAN, size: 22 })] }),
  new Paragraph({ numbering: { reference: 'honor', level: 0 }, children: [new TextRun({ text: '2024 第七届「深水杯」全国一等奖', font: FONT_HAN, size: 22 })] }),
  new Paragraph({ numbering: { reference: 'honor', level: 0 }, children: [new TextRun({ text: '2023 中国生态环境十大科技进展', font: FONT_HAN, size: 22 })] }),
  new Paragraph({ numbering: { reference: 'honor', level: 0 }, children: [new TextRun({ text: '2022 教育部直属高校创新试验典型项目第一名', font: FONT_HAN, size: 22 })] }),
  new Paragraph({ numbering: { reference: 'honor', level: 0 }, children: [new TextRun({ text: '2018 第二十届中国专利优秀奖', font: FONT_HAN, size: 22 })] }),
  new Paragraph({ numbering: { reference: 'honor', level: 0 }, children: [new TextRun({ text: '2017 水利先进实用技术', font: FONT_HAN, size: 22 })] }),
];

const sec6 = () => [
  h1('六、代码重构（额外优化）'),
  h2('6.1 问题'),
  pRuns([
    'src/data/pi.ts 之前定义了 100+ 行数据但',
    { text: '没有任何组件引用', bold: true, color: 'C62828' },
    '（死代码），而 PiCard.tsx 用 useMemo 硬编码 80+ 行相同数据——两处必须同步维护，极易遗漏。',
  ]),

  h2('6.2 方案 A 实施'),
  new Paragraph({ numbering: { reference: 'refac', level: 0 }, children: [new TextRun({ text: 'pi.ts 重构为单一数据源，类型 PiInfo / PiTimelineItem 与组件消费格式对齐', font: FONT_HAN, size: 22 })] }),
  new Paragraph({ numbering: { reference: 'refac', level: 0 }, children: [new TextRun({ text: 'PiCard.tsx 改为 import { pi } from "@/data/pi"，直接使用', font: FONT_HAN, size: 22 })] }),
  new Paragraph({ numbering: { reference: 'refac', level: 0 }, children: [new TextRun({ text: '移除 useMemo 包裹与未使用的 Link 导入', font: FONT_HAN, size: 22 })] }),

  h2('6.3 收益'),
  p('未来修改 PI 信息只需改 pi.ts 一处，PiCard 自动同步。'),
];

const sec7 = () => [
  h1('七、验证与构建'),
  makeTable([
    [{ content: '检查项' }, { content: '结果' }, { content: '说明' }],
    [{ content: 'npm run build' }, { content: '✅ 成功', textOpts: { color: COLORS.ACCENT, bold: true } }, { content: '42/42 静态页面' }],
    [{ content: 'npx tsc --noEmit' }, { content: '✅ 无类型错误', textOpts: { color: COLORS.ACCENT, bold: true } }, { content: '' }],
    [{ content: 'npm run lint' }, { content: '⚠️ 7 个原有错误', textOpts: { color: 'F57C00', bold: true } }, { content: 'MediaSection.tsx 等，与本次更新无关' }],
    [{ content: 'Git 提交' }, { content: '✅ 687263e', textOpts: { color: COLORS.ACCENT, bold: true } }, { content: '' }],
    [{ content: 'Git 推送' }, { content: '✅ main 1272b4b..687263e', textOpts: { color: COLORS.ACCENT, bold: true } }, { content: '' }],
    [{ content: '本地预览' }, { content: '✅ http://localhost:3000/', textOpts: { color: COLORS.ACCENT, bold: true } }, { content: 'dev server 运行中' }],
    [{ content: '线上验证' }, { content: '✅ https://mnb-lab.cn/', textOpts: { color: COLORS.ACCENT, bold: true } }, { content: '已含本次更新内容' }],
  ], [2400, 3400, 3560]),
];

const sec8 = () => [
  h1('八、变更文件清单'),
  makeTable([
    [{ content: '#' }, { content: '文件' }, { content: '变更类型' }],
    [{ content: '1' }, { content: 'src/data/pi.ts' }, { content: '重构（重写为单一数据源 + 简历信息）' }],
    [{ content: '2' }, { content: 'src/data/contact.ts' }, { content: '核对（邮箱按指示未改）' }],
    [{ content: '3' }, { content: 'src/data/publications.ts' }, { content: '新增 2 篇 + 修正 1 篇' }],
    [{ content: '4' }, { content: 'src/data/projects.ts' }, { content: '新增 4 项' }],
    [{ content: '5' }, { content: 'src/data/patents.ts' }, { content: '新增 4 项' }],
    [{ content: '6' }, { content: 'src/data/honors.ts' }, { content: '新增 5 项' }],
    [{ content: '7' }, { content: 'src/components/PiCard.tsx' }, { content: '改为从 pi.ts 读取' }],
    [{ content: '8' }, { content: 'next-env.d.ts, public/sitemap.xml, tsconfig.tsbuildinfo' }, { content: '构建自动产物同步' }],
  ], [600, 4000, 4760]),
];

const sec9 = () => [
  h1('九、待您确认事项'),
  makeTable([
    [{ content: '事项' }, { content: '状态' }, { content: '说明' }],
    [{ content: '联系邮箱' }, { content: '未改动', textOpts: { bold: true } }, { content: '按指示保留 zhaohangjia@tju.edu.cn。如需改为 wangtianzhi@tju.edu.cn，请告知。' }],
    [{ content: '官网部署' }, { content: '已完成', textOpts: { color: COLORS.ACCENT, bold: true } }, { content: 'push 后 GitHub Actions 自动部署到 https://mnb-lab.cn/ 已验证' }],
    [{ content: 'deploy.tar.gz' }, { content: '未提交', textOpts: { bold: true } }, { content: '237 MB 部署包未纳入版本控制，建议后续加入 .gitignore' }],
  ], [1500, 1500, 6360]),

  new Paragraph({
    alignment: AlignmentType.RIGHT,
    spacing: { before: 480, after: 120 },
    children: [new TextRun({ text: '报告生成时间：2026-07-14', font: FONT_HAN, size: 20, color: COLORS.MUTED })],
  }),
  new Paragraph({
    alignment: AlignmentType.RIGHT,
    children: [new TextRun({ text: '本地预览地址：http://localhost:3000/', font: FONT_HAN, size: 20, color: COLORS.MUTED })],
  }),
  new Paragraph({
    alignment: AlignmentType.RIGHT,
    children: [new TextRun({ text: '线上官网地址：https://mnb-lab.cn/', font: FONT_HAN, size: 20, color: COLORS.MUTED })],
  }),
];

// ---------- Document ----------
const doc = new Document({
  creator: 'Micro-Nano-Bubble Technology Lab',
  title: '微纳米气泡课题组官网 - 信息更新报告',
  description: '2026-07-14 根据王天志老师简历更新',
  styles: {
    default: { document: { run: { font: FONT_HAN, size: 22 } } },
    paragraphStyles: [
      { id: 'Title', name: 'Title', basedOn: 'Normal',
        run: { size: 56, bold: true, color: COLORS.PRIMARY, font: FONT_HAN_HEAD },
        paragraph: { spacing: { before: 240, after: 120 }, alignment: AlignmentType.CENTER } },
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 32, bold: true, color: COLORS.PRIMARY, font: FONT_HAN_HEAD },
        paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 28, bold: true, color: '2F5496', font: FONT_HAN_HEAD },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 24, bold: true, color: COLORS.PRIMARY, font: FONT_HAN_HEAD },
        paragraph: { spacing: { before: 180, after: 80 }, outlineLevel: 2 } },
    ],
  },
  numbering: {
    config: [
      { reference: 'edu', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: 'honor', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: 'refac', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ],
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        pageNumbers: { start: 1, formatType: 'decimal' },
      },
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: '微纳米气泡课题组官网 · 信息更新报告（2026-07-14）', font: FONT_HAN, size: 18, color: COLORS.MUTED })],
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: '第 ', font: FONT_HAN, size: 18, color: COLORS.MUTED }),
            new TextRun({ children: [PageNumber.CURRENT], font: FONT_HAN, size: 18, color: COLORS.MUTED }),
            new TextRun({ text: ' 页 / 共 ', font: FONT_HAN, size: 18, color: COLORS.MUTED }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], font: FONT_HAN, size: 18, color: COLORS.MUTED }),
            new TextRun({ text: ' 页', font: FONT_HAN, size: 18, color: COLORS.MUTED }),
          ],
        })],
      }),
    },
    children: [
      headerBlock(),
      subtitleBlock(),
      metaBlock(),
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { after: 240 },
        children: [new TextRun({ text: '目录', bold: true, size: 36, font: FONT_HAN_HEAD, color: COLORS.PRIMARY })],
      }),
      new TableOfContents('目录', { hyperlink: true, headingStyleRange: '1-2' }),
      new Paragraph({ children: [new PageBreak()] }),
      ...sec1(),
      ...sec2(),
      ...sec3(),
      ...sec4(),
      ...sec5(),
      ...sec6(),
      ...sec7(),
      ...sec8(),
      ...sec9(),
    ],
  }],
});

const buffer = await Packer.toBuffer(doc);
const outPath = 'g:/Micro-Nano-Bubble-Technology-Lab-main/Micro-Nano-Bubble-Technology-Lab-main/docs/微纳米气泡课题组官网-信息更新报告-2026-07-14.docx';
writeFileSync(outPath, buffer);
console.log('✓ Generated:', outPath);
console.log('  Size:', (buffer.length / 1024).toFixed(1), 'KB');
