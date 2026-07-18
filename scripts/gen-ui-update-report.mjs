// scripts/gen-ui-update-report.mjs
// 生成《官网更新与优化报告》Word 版本
// Usage: node scripts/gen-ui-update-report.mjs

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle,
  WidthType, ShadingType, VerticalAlign, PageNumber,
} from 'docx';

const FONT_HAN = '宋体';
const FONT_HAN_HEAD = '黑体';

const COLORS = {
  PRIMARY: '1F4E79',
  ACCENT: '2E7D32',
  MUTED: '595959',
  HEADER_BG: 'D5E8F0',
  HIGHLIGHT: 'C00000',
};

const tableBorder = { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF' };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

// ---------- helpers ----------
const title = (text) => new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 200, after: 80 },
  children: [new TextRun({ text, bold: true, font: FONT_HAN_HEAD, size: 36, color: COLORS.PRIMARY })],
});

const subtitle = (text) => new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [new TextRun({ text, font: FONT_HAN, size: 22, color: COLORS.MUTED })],
});

const h1 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_1,
  spacing: { before: 240, after: 100 },
  children: [new TextRun({ text, bold: true, font: FONT_HAN_HEAD, size: 30, color: COLORS.PRIMARY })],
});

const h2 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 160, after: 80 },
  children: [new TextRun({ text, bold: true, font: FONT_HAN_HEAD, size: 26, color: COLORS.PRIMARY })],
});

const p = (text) => new Paragraph({
  spacing: { after: 100, line: 320 },
  children: [new TextRun({ text, font: FONT_HAN, size: 22 })],
});

const bullet = (text) => new Paragraph({
  bullet: { level: 0 },
  spacing: { after: 60, line: 320 },
  children: [new TextRun({ text, font: FONT_HAN, size: 22 })],
});

const note = (label, text) => new Paragraph({
  spacing: { after: 100, line: 320 },
  indent: { left: 360 },
  children: [
    new TextRun({ text: `${label}：`, font: FONT_HAN, size: 22, bold: true, color: COLORS.HIGHLIGHT }),
    new TextRun({ text, font: FONT_HAN, size: 22, italics: true, color: COLORS.MUTED }),
  ],
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
      shading: rowIdx === 0 ? { fill: COLORS.HEADER_BG, type: ShadingType.CLEAR } : undefined,
      verticalAlign: VerticalAlign.CENTER,
      children: [cellP(typeof cell === 'object' ? cell.content : cell, cell)],
    })),
  })),
});

// ============================================================
// 报告内容
// ============================================================

const today = new Date().toISOString().slice(0, 10);

const doc = new Document({
  creator: '课题组官网维护',
  title: '微纳米气泡课题组官网 更新与优化报告',
  sections: [{
    properties: { page: { margin: { top: 900, right: 900, bottom: 900, left: 900 } } },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: '微纳米气泡课题组官网 · 更新与优化报告', font: FONT_HAN, size: 18, color: COLORS.MUTED })],
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
      // 封面
      title('微纳米气泡课题组官网'),
      title('更新与优化报告'),
      subtitle(`报告日期：${today}　汇报人：课题组官网维护组`),
      p(''),

      // 一、概述
      h1('一、本次更新概述'),
      p('本轮更新共涉及 17 个源文件、新增 427 行 / 删除 204 行代码，全部已部署到线上（https://mnb-lab.cn）。改动涵盖以下 5 类：'),
      bullet('① 全站 7 组 Tab 视觉风格统一'),
      bullet('② 11 处滚动入场卡片空白问题修复'),
      bullet('③ 学术数据展示规范化（上下角标 + 方向归属）'),
      bullet('④ 联系地址更新（北洋园校区）+ 三行排版'),
      bullet('⑤ 研究页面章节排版优化 + 代码清理'),

      // 二、Tab 视觉风格统一
      h1('二、Tab 视觉风格统一（7 组）'),
      p('不同页面原 Tab 风格各异，本次统一为「圆角卡片 + 紫蓝渐变 + 中英对照」设计语言，切换时高亮区域平滑滑动。'),
      makeTable([
        ['所在页面', 'Tab 内容'],
        ['瑞德智设备主页', '概览 / 产品与参数 / 交付与证明 / 咨询合作'],
        ['瑞德智设备 - 图集分类', '代表性产品 / 现场使用 / 测试结果 / 产业化证明'],
        ['瑞德智设备 - 产品矩阵', 'RD-NM / RD-O3N / RD-BQ'],
        ['研究方向页', '气液混合 / 稳定性 / 一体机 / 臭氧发生器'],
        ['团队成员页（角色）', '全部 / 博士生 / 硕士生 / 本科生 / 已毕业'],
        ['团队成员页（方向）', '四大研究方向'],
        ['成果页', '论文 / 专利 / 荣誉 / 项目'],
      ], [3500, 6000]),

      // 三、滚动空白修复
      h1('三、滚动入场卡片空白修复（11 处）'),
      p('原方案使用「视口观察器」技术实现卡片渐入动画，遇到卡片刚挂载就处于屏幕边界处时偶发不触发，导致内容停留在完全透明状态。'),
      p('修复方案：改为「挂载即触发」方式，所有内容在页面打开时立即可见。'),
      bullet('瑞德智设备主页：工程交付 5 STEP 卡片、信任背书、客户类型、核心优势、应用场景、气泡统计、图集 Tab 按钮'),
      bullet('媒体报道区：报道卡片'),
      bullet('团队成员页：成员头像卡片'),
      bullet('风采展示页：实验室 / 瑞德杯 / 答辩会详情卡片'),

      // 四、学术数据规范化
      h1('四、学术数据展示规范化'),
      h2('1. 数字上下角标'),
      makeTable([
        ['场景', '更新前', '更新后'],
        ['气泡密度', '10^9 个/mL', '10⁹ 个/mL'],
        ['产品规格（8 处）', '1m3/h', '1m³/h'],
        ['化学式臭氧（7 处）', 'O3-MNBs', 'O₃-MNBs'],
        ['化学式氧气（5 处）', 'O2-MNBs', 'O₂-MNBs'],
        ['化学式氮气（6 处）', 'N2 MNBs', 'N₂ MNBs'],
      ], [2800, 3000, 3500]),

      h2('2. 团队成员方向归属修正'),
      p('原先 4 位成员主研究方向标签未被「方向筛选」索引，导致筛选人数加和 ≠ 实际人数。修正后 4 类成员筛选加和 = 实际人数（博士生 3 / 硕士生 17 / 本科生 3 / 已毕业 4）。'),
      note('人员调整', '韩重阳、张懿、耿嘉栋 归到「气泡成核过程调控与设备研发」；蒋芦笛 归到「黑臭水体无药剂低能耗治理」；删除已废弃的第 5 个研究方向标签。'),

      // 五、地址更新
      h1('五、联系地址更新（北洋园校区）'),
      makeTable([
        ['项目', '更新前', '更新后'],
        ['地址', '天津市南开区卫津路 92 号（天津大学）', '天津市津南区海河教育园区雅观路 135号 天津大学北洋园校区'],
        ['邮编', '300072', '300354'],
      ], [2000, 4500, 4500]),
      p('更新位置：「联系我们」独立页面、首页底部「加入我们」区块、个人简介页。'),
      p('排版优化：地址从单行渲染改为三行（第 1 行地址、第 2 行校区、第 3 行邮编小灰字），避免「校区名」被浏览器换行截断。'),

      // 六、其他
      h1('六、其他修正'),
      bullet('「联系我们」按钮：跳转目标从「/#join」（首页锚点）改为「/contact」（独立页面），按钮语义对齐'),
      bullet('研究页面章节卡：左侧加 2px 紫蓝渐变色条 + 章节前加编号（如「01 处理效果」）'),
      bullet('研究页面图片展示：奇数张时最后一张自动满宽，避免右下角留白'),
      bullet('研究页面两栏比例：1.45 : 1 → 1.35 : 1，间距 gap-8 → gap-12，呼吸感更强'),
      bullet('代码清理：删除已不再使用的「第 5 个研究方向」标签常量'),
      p(''),
      p('如对更新内容有任何疑问或建议，欢迎随时反馈。'),
    ],
  }],
});

// ============================================================
// 输出文件
// ============================================================
const outputPath = 'docs/官网更新报告.docx';
mkdirSync(dirname(outputPath), { recursive: true });

const buffer = await Packer.toBuffer(doc);
writeFileSync(outputPath, buffer);

console.log(`✅ 已生成报告：${outputPath}`);
console.log(`   文件大小：${(buffer.length / 1024).toFixed(1)} KB`);