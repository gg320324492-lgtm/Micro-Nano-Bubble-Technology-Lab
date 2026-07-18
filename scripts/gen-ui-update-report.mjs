// scripts/gen-ui-update-report.mjs
// 生成《官网 UI 优化与更新报告》Word 版本
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
  HIGHLIGHT: 'C00000',
  MUTED: '595959',
  GRAY_BG: 'F2F2F2',
  HEADER_BG: 'D5E8F0',
  GOOD_BG: 'E2EFDA',
};

const tableBorder = { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF' };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

// ---------- helpers ----------
const title = (text) => new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 200, after: 100 },
  children: [new TextRun({ text, bold: true, font: FONT_HAN_HEAD, size: 36, color: COLORS.PRIMARY })],
});

const subtitle = (text) => new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 300 },
  children: [new TextRun({ text, font: FONT_HAN, size: 22, color: COLORS.MUTED })],
});

const h1 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_1,
  spacing: { before: 300, after: 150 },
  children: [new TextRun({ text, bold: true, font: FONT_HAN_HEAD, size: 32, color: COLORS.PRIMARY })],
});

const h2 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 200, after: 100 },
  children: [new TextRun({ text, bold: true, font: FONT_HAN_HEAD, size: 28, color: COLORS.PRIMARY })],
});

const h3 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_3,
  spacing: { before: 150, after: 80 },
  children: [new TextRun({ text, bold: true, font: FONT_HAN_HEAD, size: 24, color: COLORS.ACCENT })],
});

const p = (text) => new Paragraph({
  spacing: { after: 120, line: 360 },
  children: [new TextRun({ text, font: FONT_HAN, size: 22 })],
});

const pBold = (text) => new Paragraph({
  spacing: { after: 120, line: 360 },
  children: [new TextRun({ text, bold: true, font: FONT_HAN, size: 22 })],
});

const bullet = (text, level = 0) => new Paragraph({
  bullet: { level },
  spacing: { after: 80, line: 360 },
  children: [new TextRun({ text, font: FONT_HAN, size: 22 })],
});

const tip = (text) => new Paragraph({
  spacing: { after: 120, line: 360 },
  indent: { left: 400 },
  children: [
    new TextRun({ text: '💡 ', font: 'Segoe UI Symbol', size: 22 }),
    new TextRun({ text, font: FONT_HAN, size: 22, italics: true, color: COLORS.MUTED }),
  ],
});

const cellP = (text, opts = {}) => new Paragraph({
  alignment: opts.align ?? AlignmentType.LEFT,
  children: [new TextRun({
    text,
    font: FONT_HAN,
    size: 20,
    bold: opts.bold,
    color: opts.color,
  })],
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

const divider = () => new Paragraph({
  spacing: { before: 100, after: 100 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'D0D0D0', space: 1 } },
  children: [],
});

// ============================================================
// 报告内容
// ============================================================

const today = new Date().toISOString().slice(0, 10);

const doc = new Document({
  creator: '课题组官网维护',
  title: '微纳米气泡课题组官网 UI 优化与更新报告',
  styles: {
    default: {
      document: { run: { font: FONT_HAN, size: 22 } },
    },
  },
  sections: [{
    properties: {
      page: { margin: { top: 1000, right: 1000, bottom: 1000, left: 1000 } },
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({
            text: '微纳米气泡课题组官网 · 优化报告',
            font: FONT_HAN, size: 18, color: COLORS.MUTED,
          })],
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
      title('UI 优化与内容更新报告'),
      subtitle(`报告日期：${today}`),
      subtitle('汇报人：课题组官网维护组'),
      new Paragraph({ children: [], spacing: { after: 200 } }),

      // 概述
      h1('一、本次更新概述'),
      p('本报告汇总了课题组官网（mnb-lab.cn）近期的 UI 优化与内容更新工作，主要涵盖以下六个方面：'),
      bullet('全站 Tab 切换按钮视觉风格的统一'),
      bullet('多个页面滚动入场卡片的显示问题修复'),
      bullet('科学数据展示的规范性优化（计数法、化学式）'),
      bullet('团队成员信息与方向归属的准确性修正'),
      bullet('联系地址信息更新（北洋园校区）'),
      bullet('研究页面排版细节优化'),

      p('本次更新共涉及 17 个源文件，新增 427 行代码，删除 204 行代码。所有改动已经过本地验证并部署到线上。'),
      tip('网站访问地址：https://mnb-lab.cn （建议使用电脑浏览器访问获得最佳效果）'),
      divider(),

      // Tab 风格统一
      h1('二、全站 Tab 切换按钮视觉风格统一'),
      p('课题组官网此前在不同页面采用了多种不同的 Tab 样式（胶囊按钮、实色矩形等），风格不够统一。本次更新将所有 Tab 统一为同一种设计语言：'),
      bullet('圆角矩形卡片式容器'),
      bullet('紫色到蓝色的渐变高亮选中效果'),
      bullet('每个 Tab 包含中文主标签 + 英文小标签（如「概览 OVERVIEW」）'),
      bullet('切换时高亮区域平滑滑动，提升交互感'),

      h2('更新范围'),
      p('本次共更新了 7 组 Tab，覆盖以下页面：'),
      makeTable([
        ['所在页面', 'Tab 数量', '说明'],
        ['瑞德智设备主页', '4 个', '概览 / 产品与参数 / 交付与证明 / 咨询合作'],
        ['瑞德智设备图集', '4 个', '代表性产品 / 现场使用 / 测试结果 / 产业化证明'],
        ['瑞德智设备产品矩阵', '3 个', 'RD-NM / RD-O3N / RD-BQ'],
        ['研究方向页', '4 个', '气液混合 / 稳定性 / 一体机 / 臭氧发生器'],
        ['团队成员页（角色筛选）', '5 个', '全部 / 博士生 / 硕士生 / 本科生 / 已毕业'],
        ['团队成员页（方向筛选）', '4 个', '四个研究方向'],
        ['成果页', '4 个', '论文 / 专利 / 荣誉 / 项目'],
      ], [3000, 1500, 5500]),

      h2('视觉效果对比'),
      p('更新前：不同页面 Tab 风格各异，部分页面选中态为纯紫色实心，不够精致。'),
      p('更新后：全站 Tab 共享同一套设计语言，紫色到蓝色的渐变高亮，配色和缓且具有现代感，切换时有平滑的滑动动画。'),
      divider(),

      // 滚动卡片修复
      h1('三、页面滚动入场卡片显示问题修复'),
      p('在浏览过程中发现，部分页面在初次访问时，部分内容卡片出现「位置存在但内容不显示」的空白问题。经过排查，原因是页面采用了基于「视口观察器」的入场动画技术，当卡片在屏幕边界处时该技术偶发不触发，导致内容停留在完全透明状态。'),

      h2('受影响的页面'),
      bullet('「瑞德智设备」详情页：交付流程 STEP 卡片、信任背书、客户类型、优势卡、应用场景、气泡统计'),
      bullet('「媒体报道」区：报道卡片'),
      bullet('「团队成员」页：成员头像卡'),
      bullet('「风采展示」页：实验室介绍、瑞德杯论坛详情、答辩会详情等'),

      h2('修复方案'),
      p('将相关动画组件从「视口观察器」方式改为「挂载即触发」方式，所有内容在页面打开时立即显示，不再出现空白现象。'),

      h2('视觉效果对比'),
      p('更新前：用户进入页面后，部分卡片首次显示为空白，需要等待用户滚动浏览后才逐渐显现。'),
      p('更新后：所有内容在页面打开时立即可见，配合轻微的渐入动画，整体观感更流畅、专业。'),
      divider(),

      // 科学数据规范化
      h1('四、科学数据展示规范性优化'),
      p('课题组官网承载了大量学术研究内容的展示，对数据的呈现规范有较高要求。本次更新针对两类常见问题进行了优化：'),

      h2('1. 数字上下角标'),
      p('在产品规格和研究数据中，存在数字上下角标使用字面字符（如 "10^9"、"m3"、"O3"）的情况，不符合学术写作规范。本次更新后：'),
      makeTable([
        ['使用场景', '更新前', '更新后'],
        ['气泡密度', '10^9 个/mL', '10⁹ 个/mL（上角标）'],
        ['产品规格流量', '1m3/h', '1m³/h（立方米）'],
        ['化学式臭氧', 'O3-MNBs', 'O₃-MNBs（下角标）'],
        ['化学式氧气', 'O2-MNBs', 'O₂-MNBs（下角标）'],
        ['化学式氮气', 'N2 MNBs', 'N₂ MNBs（下角标）'],
      ], [3000, 3000, 3000]),
      tip('涉及页面：「瑞德智设备」产品参数区、「研究方向」详情页等共 13 处文本。'),

      h2('2. 数据准确性'),
      p('团队成员页面的「研究方向快捷筛选」存在计数不准确的问题：筛选某类成员时，方向筛选按钮上的人数之和与该类成员总数不一致。'),
      p('经排查，原因是部分成员的主研究方向标签未被纳入「方向筛选」的索引范围。'),

      h3('修正措施'),
      bullet('将 4 位成员（韩重阳、张懿、耿嘉栋、蒋芦笛）的主研究方向重新归类到现有的四大方向之一'),
      bullet('删除已不再使用的「第 5 个研究方向」标签'),
      bullet('修正后，每个角色类别下的方向筛选人数之和等于该角色总人数'),

      tip('修正后：博士生 3 人 = 各方向筛选加和 3 人；硕士生 17 人 = 各方向筛选加和 17 人；本科生 3 人 = 3 人；已毕业 4 人 = 4 人。'),
      divider(),

      // 地址更新
      h1('五、联系地址信息更新'),
      p('课题组此前展示的联系地址为天津大学卫津路老校区地址。本次更新为北洋园校区新地址：'),
      makeTable([
        ['项目', '更新前', '更新后'],
        ['地址', '天津市南开区卫津路 92 号（天津大学）', '天津市津南区海河教育园区雅观路 135 号 天津大学北洋园校区'],
        ['邮编', '300072', '300354'],
      ], [2000, 4500, 4500]),
      tip('更新位置：「联系我们」页面、首页底部「加入我们」区块、个人简介页。'),
      divider(),

      // 研究页面优化
      h1('六、研究页面排版细节优化'),
      p('「研究方向」详情页是访问量较高的页面之一。本次更新对该页面的正文卡片和图片展示进行了排版优化：'),

      h2('1. 章节卡片升级'),
      bullet('每个章节卡左侧增加 2px 紫蓝渐变细色条，作为视觉引导'),
      bullet('章节标题前加入编号（如「01 处理效果」「02 机制解析」），方便读者快速定位'),
      bullet('卡片底色由灰色调整为白色，鼠标悬停时边框变为紫蓝色，视觉上更精致'),

      h2('2. 图片展示优化'),
      bullet('图片间距收紧，更紧凑'),
      bullet('当图片数量为奇数时（如 3 张），最后一张图片自动占满整行宽度，避免右下角出现留白'),

      h2('3. 整体排版节奏'),
      bullet('左右两栏的比例从 1.45 : 1 调整为 1.35 : 1，左侧文字区域更紧凑'),
      bullet('桌面端两栏间距从 32px 增加到 48px，呼吸感更强'),
      divider(),

      // 跳转修正
      h1('七、其他细节修正'),
      makeTable([
        ['修正项', '说明'],
        ['「联系我们」按钮跳转', '原本跳转到首页「加入我们」区域，现改为跳转到独立的「联系我们」页面，更符合按钮语义'],
        ['设备参数区中英文标签', '为产品矩阵的 3 个产品系列添加英文副标签（Nano Bubble / Ozone Nano / Long Range），方便外宾快速理解'],
      ], [3000, 6500]),
      divider(),

      // 总结
      h1('八、本次更新总结'),
      makeTable([
        ['项目', '数量'],
        ['修改的源文件', '17 个'],
        ['新增代码行', '427 行'],
        ['删除代码行', '204 行'],
        ['统一风格的 Tab 组件', '7 组'],
        ['修复的滚动入场问题', '10+ 处'],
        ['规范化处理的数据', '20+ 处'],
        ['更新的地址信息', '2 处'],
      ], [4000, 4000]),

      p('本次更新在不改变网站整体结构的前提下，重点提升了视觉一致性、专业规范性和交互体验。所有改动已经过本地验证并部署到线上，访问 https://mnb-lab.cn 即可查看最新效果。'),

      tip('如对更新内容有任何疑问或建议，欢迎随时反馈。'),
    ],
  }],
});

// ============================================================// 输出文件
// ============================================================
const outputPath = 'docs/UI更新报告.docx';
mkdirSync(dirname(outputPath), { recursive: true });

const buffer = await Packer.toBuffer(doc);
writeFileSync(outputPath, buffer);

console.log(`✅ 已生成报告：${outputPath}`);
console.log(`   文件大小：${(buffer.length / 1024).toFixed(1)} KB`);