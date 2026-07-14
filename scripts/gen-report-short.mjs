// scripts/gen-report-short.mjs
// 简版报告 — 适合老师快速浏览

import { writeFileSync } from 'node:fs';
import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle,
  WidthType, ShadingType, VerticalAlign, PageNumber, PageBreak,
} from 'docx';

const FONT_HAN = '宋体';
const FONT_HAN_HEAD = '黑体';
const COLORS = {
  PRIMARY: '1F4E79',
  ACCENT: '2E7D32',
  WARN: 'C62828',
  GRAY_BG: 'F5F5F5',
  HEADER_BG: 'D5E8F0',
};

const tableBorder = { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF' };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

const h1 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_1,
  spacing: { before: 360, after: 180 },
  children: [new TextRun({ text, bold: true, font: FONT_HAN_HEAD, color: COLORS.PRIMARY })],
});
const h2 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 240, after: 120 },
  children: [new TextRun({ text, bold: true, font: FONT_HAN_HEAD, color: '2F5496' })],
});
const p = (text, opts = {}) => new Paragraph({
  spacing: { after: 100 },
  children: [new TextRun({ text, font: FONT_HAN, size: 22, ...opts })],
});
const pRuns = (runs) => new Paragraph({
  spacing: { after: 100 },
  children: runs.map((r) => (typeof r === 'string'
    ? new TextRun({ text: r, font: FONT_HAN, size: 22 })
    : new TextRun({ font: FONT_HAN, size: 22, ...r }))),
});
const bullet = (text) => new Paragraph({
  spacing: { after: 60 },
  bullet: { level: 0 },
  children: [new TextRun({ text, font: FONT_HAN, size: 22 })],
});

const cellP = (text, opts = {}) => new Paragraph({
  alignment: opts.align ?? AlignmentType.LEFT,
  children: [new TextRun({ text, font: FONT_HAN, size: 20, bold: opts.bold, color: opts.color })],
});

const makeTable = (rows, widths) => new Table({
  columnWidths: widths,
  margins: { top: 60, bottom: 60, left: 100, right: 100 },
  rows: rows.map((cells, rowIdx) => new TableRow({
    tableHeader: rowIdx === 0,
    children: cells.map((cell, colIdx) => new TableCell({
      borders: cellBorders,
      width: { size: widths[colIdx], type: WidthType.DXA },
      shading: rowIdx === 0
        ? { fill: COLORS.HEADER_BG, type: ShadingType.CLEAR }
        : undefined,
      verticalAlign: VerticalAlign.CENTER,
      children: [cellP(cell.content, cell.textOpts ?? {})],
    })),
  })),
});

// ---------- 内容 ----------
const headerBlock = () => [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
    children: [new TextRun({ text: '微纳米气泡课题组官网', bold: true, size: 48, font: FONT_HAN_HEAD, color: COLORS.PRIMARY })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 360 },
    children: [new TextRun({ text: '信息更新简报（2026-07-14）', bold: true, size: 32, font: FONT_HAN_HEAD, color: COLORS.PRIMARY })],
  }),
  pRuns([
    { text: '更新依据：', bold: true },
    '《天津大学环境科学与工程学院-王天志-简历.pdf》 · ',
    { text: 'Git 提交：', bold: true },
    '687263e · ',
    { text: '线上：', bold: true },
    'https://mnb-lab.cn/ ',
    { text: '已生效', color: COLORS.ACCENT, bold: true },
  ]),
];

const summarySection = () => [
  h1('一、本次更新一览'),
  pRuns([
    '共更新 ',
    { text: '6', bold: true, color: COLORS.ACCENT },
    ' 个数据文件 + 首页 PI 卡片，新增 ',
    { text: '15', bold: true, color: COLORS.ACCENT },
    ' 项内容、修正 ',
    { text: '1', bold: true, color: COLORS.ACCENT },
    ' 条数据，重构 PI 数据流为单一数据源。',
  ]),
  makeTable([
    [{ content: '类别' }, { content: '新增' }, { content: '修正 / 补充' }],
    [{ content: '个人简介' }, { content: '瑞德智董事长身份、融资 1550 万、估值 7000 万' }, { content: '6 项研究方向按简历原文重写' }],
    [{ content: '工作经历' }, { content: '瑞德智董事长、清华苏州院技术骨干' }, { content: '讲师/副教授时间线补充完整' }],
    [{ content: '学术兼职' }, { content: '启明计划、首届青年科创奖' }, { content: '—' }],
    [{ content: '科研项目' }, { content: '4 项 2026 年京津冀国家科技重大专项' }, { content: '—' }],
    [{ content: '论文' }, { content: '2 篇 2026 年论文（J Hazardous Materials、Processes）' }, { content: 'pub-2025-02 卷期号 153782→163782' }],
    [{ content: '专利' }, { content: '4 项新专利（含 ZL 2025 2 0304785.5 曝气管）' }, { content: '—' }],
    [{ content: '荣誉' }, { content: '5 项新荣誉（天开创聚津门、启明计划等）' }, { content: '—' }],
  ], [1300, 4500, 3560]),
];

const detailSection = () => [
  h1('二、具体变更详情'),

  h2('1. 个人简介新增'),
  bullet('「瑞德智创新技术（天津）有限公司董事长」身份'),
  bullet('融资 1550 万元（天津海棠基金 + 西青区金种子基金）'),
  bullet('技术估值 7000 万元'),

  h2('2. 研究方向（按简历原文 6 项）'),
  bullet('微纳米气泡水中气泡溃灭与·OH 原位形成过程研究'),
  bullet('微纳米气泡用于水质提升机制研究'),
  bullet('基于微纳米气泡技术的表面清洗研究'),
  bullet('基于水肥气一体化的高效农业种植与水产养殖'),
  bullet('二氧化碳纳米气泡提升藻类固碳效能机制研究 ← 新增'),
  bullet('基于微纳米气泡技术的水环境治理设备开发'),

  h2('3. 新增科研项目（4 项京津冀国家科技重大专项）'),
  makeTable([
    [{ content: '编号' }, { content: '课题名称' }, { content: '时间' }],
    [{ content: '2026ZD1208903-01' }, { content: '水体致黑臭固体有机废弃物快速上浮与高效低耗收集装备' }, { content: '2026/06–2030/05' }],
    [{ content: '2026ZD1208904-03' }, { content: '粒径自适应微纳米气泡的泥/水界面生境原位改善技术' }, { content: '2026/06–2030/05' }],
    [{ content: '2026ZD1208905-05' }, { content: '内源释放型黑臭水体原位修复技术集成及示范' }, { content: '2026/06–2030/05' }],
    [{ content: '2026ZD1208905-07' }, { content: '复合污染型黑臭水体综合治理技术集成与示范' }, { content: '2026/06–2030/05' }],
  ], [2200, 5800, 1360]),

  h2('4. 新增论文（2 篇 2026 年）'),
  makeTable([
    [{ content: '期刊' }, { content: '卷期 / 文章号' }, { content: '题目' }],
    [{ content: 'Journal of Hazardous Materials' }, { content: '513, 142456' }, { content: '甲苯氧化（O₃-MNBs + H₂O₂）' }],
    [{ content: 'Processes' }, { content: '14, 1093' }, { content: '四环素氧化（O₃-MNBs）' }],
  ], [3000, 1900, 4460]),

  h2('5. 新增专利（4 项）'),
  makeTable([
    [{ content: '专利号' }, { content: '名称' }],
    [{ content: 'ZL 2025 2 0304785.5' }, { content: '一种长距离低能耗的曝气管及曝气系统' }],
    [{ content: '202421612345.8' }, { content: '一种一体式微纳米气泡发生装置' }],
    [{ content: '202421637582.X' }, { content: '一种低功耗水质监测仪' }],
    [{ content: '202421637580.0' }, { content: '一种多电源水质监测仪' }],
  ], [3000, 6360]),

  h2('6. 新增荣誉（5 项）'),
  makeTable([
    [{ content: '年份' }, { content: '奖项' }],
    [{ content: '2026' }, { content: '「天开创聚津门」全国大学生智能科技创新创业挑战赛一等奖' }],
    [{ content: '2024' }, { content: '天津大学科技创新领军人才（启明计划）' }],
    [{ content: '2023' }, { content: '陆海水域微小有害生物应急处置技术装备，环境科学技术一等奖' }],
    [{ content: '2023' }, { content: '陆海水域藻华与微小有害生物高效绿色防控，2023 年度中国生态环境十大科技进展' }],
    [{ content: '2022' }, { content: '首届天津市「零碳生活·绿色梦想」创新大赛二等奖' }],
  ], [1200, 8160]),
];

const notesSection = () => [
  h1('三、代码优化'),
  bullet('pi.ts 与 PiCard.tsx 重构为单一数据源（消除 80 行重复硬编码）'),
  bullet('未来修改 PI 信息只需改 pi.ts 一处'),

  h1('四、待您确认'),
  pRuns([
    { text: '联系邮箱：', bold: true },
    '按您指示 ',
    { text: '未改动', color: COLORS.WARN, bold: true },
    '（仍为 zhaohangjia@tju.edu.cn）。如需改为 wangtianzhi@tju.edu.cn，请告知。',
  ]),
  pRuns([
    { text: '线上部署：', bold: true },
    'push 后 GitHub Actions ',
    { text: '已自动部署到 https://mnb-lab.cn/', color: COLORS.ACCENT, bold: true },
    '，经 curl 验证新内容已生效。',
  ]),

  new Paragraph({
    alignment: AlignmentType.RIGHT,
    spacing: { before: 480 },
    children: [new TextRun({ text: '报告生成：2026-07-14', font: FONT_HAN, size: 20, color: '666666' })],
  }),
];

const doc = new Document({
  creator: 'Micro-Nano-Bubble Technology Lab',
  title: '微纳米气泡课题组官网 - 信息更新简报',
  styles: {
    default: { document: { run: { font: FONT_HAN, size: 22 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 32, bold: true, color: COLORS.PRIMARY, font: FONT_HAN_HEAD },
        paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 26, bold: true, color: '2F5496', font: FONT_HAN_HEAD },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 } },
    ],
  },
  sections: [{
    properties: {
      page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } },
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: '微纳米气泡课题组官网 · 信息更新简报', font: FONT_HAN, size: 18, color: '888888' })],
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: '第 ', font: FONT_HAN, size: 18, color: '888888' }),
            new TextRun({ children: [PageNumber.CURRENT], font: FONT_HAN, size: 18, color: '888888' }),
            new TextRun({ text: ' 页 / 共 ', font: FONT_HAN, size: 18, color: '888888' }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], font: FONT_HAN, size: 18, color: '888888' }),
            new TextRun({ text: ' 页', font: FONT_HAN, size: 18, color: '888888' }),
          ],
        })],
      }),
    },
    children: [
      ...headerBlock(),
      ...summarySection(),
      ...detailSection(),
      ...notesSection(),
    ],
  }],
});

const buffer = await Packer.toBuffer(doc);
const outPath = 'g:/Micro-Nano-Bubble-Technology-Lab-main/Micro-Nano-Bubble-Technology-Lab-main/docs/微纳米气泡课题组官网-信息更新简报-2026-07-14.docx';
writeFileSync(outPath, buffer);
console.log('✓ Generated:', outPath);
console.log('  Size:', (buffer.length / 1024).toFixed(1), 'KB');
