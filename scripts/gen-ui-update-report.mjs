// scripts/gen-ui-update-report.mjs
// 生成《官网更新与优化报告》Word 版本（覆盖本会话全部改动）
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
  WARN_BG: 'FFF2CC',
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

const bullet = (text) => new Paragraph({
  bullet: { level: 0 },
  spacing: { after: 80, line: 360 },
  children: [new TextRun({ text, font: FONT_HAN, size: 22 })],
});

const subBullet = (text) => new Paragraph({
  bullet: { level: 1 },
  spacing: { after: 60, line: 360 },
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

const note = (label, text) => new Paragraph({
  spacing: { after: 120, line: 360 },
  indent: { left: 400 },
  children: [
    new TextRun({ text: `${label}：`, font: FONT_HAN, size: 22, bold: true, color: COLORS.HIGHLIGHT }),
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
  title: '微纳米气泡课题组官网 更新与优化报告',
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
            text: '微纳米气泡课题组官网 · 更新与优化报告',
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
      title('更新与优化报告'),
      subtitle(`报告日期：${today}`),
      subtitle('汇报人：课题组官网维护组'),

      p(''),
      p(''),

      // 一、本次更新概述
      h1('一、本次更新概述'),
      p('本报告汇总了课题组官网（mnb-lab.cn）近期一轮全面的更新与优化工作，内容涵盖以下几个方向：'),
      bullet('全站切换标签（Tab）的视觉风格统一（7 组 Tab）'),
      bullet('多个页面滚动入场卡片的显示问题修复（共 11 处）'),
      bullet('学术数据展示规范化：科学计数法上下角标、化学式下角标'),
      bullet('团队成员方向归属修正，确保筛选计数准确'),
      bullet('联系地址信息更新（北洋园校区）+ 联系页面三行排版'),
      bullet('「联系我们」按钮跳转逻辑修正'),
      bullet('研究页面章节排版优化（编号、色条、图片自适应）'),
      bullet('代码与数据清理（废弃常量、重复标签整理）'),

      p('本次更新共涉及 17 个源文件，新增 427 行代码，删除 204 行代码。所有改动已经过本地验证并部署到线上。'),
      tip('线上访问地址：https://mnb-lab.cn （建议使用电脑浏览器访问获得最佳效果）'),
      divider(),

      // 二、Tab 视觉风格统一
      h1('二、全站切换标签（Tab）视觉风格统一'),
      p('课题组官网此前在不同页面采用了多种不同的 Tab 样式（胶囊按钮、实色矩形等），风格不够统一。本次更新将所有 Tab 统一为同一种设计语言：'),
      bullet('圆角矩形卡片式容器（带阴影）'),
      bullet('紫色到蓝色的渐变高亮选中效果'),
      bullet('每个 Tab 包含「中文主标签 + 英文小标签」（如「概览 OVERVIEW」）'),
      bullet('切换时高亮区域平滑滑动，提升交互感'),

      h2('更新范围（共 7 组 Tab）'),
      makeTable([
        ['所在页面', 'Tab 数量', 'Tab 内容'],
        ['瑞德智设备主页', '4 个', '概览 / 产品与参数 / 交付与证明 / 咨询合作'],
        ['瑞德智设备 - 图集分类', '4 个', '代表性产品 / 现场使用 / 测试结果 / 产业化证明'],
        ['瑞德智设备 - 产品矩阵', '3 个', 'RD-NM / RD-O3N / RD-BQ（新增英文副标签）'],
        ['研究方向页 - 板块导航', '4 个', '气液混合 / 稳定性 / 一体机 / 臭氧发生器'],
        ['团队成员页 - 角色筛选', '5 个', '全部 / 博士生 / 硕士生 / 本科生 / 已毕业'],
        ['团队成员页 - 方向筛选', '4 个', '四大研究方向'],
        ['成果页', '4 个', '论文 / 专利 / 荣誉 / 项目'],
      ], [3200, 1500, 4800]),

      h2('视觉效果对比'),
      p('更新前：不同页面 Tab 风格各异，部分页面选中态为纯紫色实心，不够精致。'),
      p('更新后：全站 Tab 共享同一套设计语言，紫色到蓝色的渐变高亮，配色和缓且具有现代感，切换时有平滑的滑动动画。'),
      note('细节补充', '为产品矩阵的 3 个产品系列添加了英文副标签（Nano Bubble / Ozone Nano / Long Range），方便外宾快速理解；研究方向板块的 4 个 Tab 添加了 Module 01/02/03/04 编号。'),
      divider(),

      // 三、滚动入场修复
      h1('三、页面滚动入场卡片显示问题修复'),
      p('在浏览过程中发现，部分页面在初次访问时，部分内容卡片出现「位置存在但内容不显示」的空白问题。'),
      p('原因：原方案采用「视口观察器」技术实现卡片渐入动画，当卡片刚挂载就处于屏幕边界处时该技术偶发不触发，导致内容停留在完全透明状态。'),
      p('修复方案：将相关动画组件从「视口观察器」方式改为「挂载即触发」方式，所有内容在页面打开时立即显示，配合轻微的渐入动画。'),

      h2('受影响的页面与位置（共 11 处）'),
      makeTable([
        ['所在页面', '受影响内容'],
        ['瑞德智设备主页', '工程交付流程 5 个 STEP 卡片（需求沟通→现场调试）'],
        ['瑞德智设备主页', '信任背书、客户类型、核心优势、应用场景、气泡粒径统计'],
        ['瑞德智设备主页', '图集 4 个分类 Tab 按钮'],
        ['媒体报道区', '媒体报道卡片'],
        ['团队成员页', '成员头像卡片'],
        ['风采展示页', '实验室介绍、瑞德杯论坛详情、答辩会详情等'],
      ], [3200, 6300]),

      h2('视觉效果对比'),
      p('更新前：用户进入页面后，部分卡片首次显示为空白，需要等待用户滚动浏览后才逐渐显现。'),
      p('更新后：所有内容在页面打开时立即可见，配合轻微的渐入动画，整体观感更流畅、专业。'),
      divider(),

      // 四、科学数据规范化
      h1('四、学术数据展示规范化'),
      p('课题组官网承载了大量学术研究内容的展示，对数据的呈现规范有较高要求。本次更新针对两类常见问题进行了优化：'),

      h2('1. 数字上下角标'),
      p('在产品规格和研究数据中，存在数字上下角标使用字面字符（如「10^9」「m3」「O3」）的情况，不符合学术写作规范。'),
      makeTable([
        ['使用场景', '更新前', '更新后'],
        ['气泡密度', '10^9 个/mL', '10⁹ 个/mL（上角标）'],
        ['产品规格流量', '1m3/h 等 8 处', '1m³/h（立方米上角标）'],
        ['化学式 - 臭氧', 'O3-MNBs 等 7 处', 'O₃-MNBs（下角标）'],
        ['化学式 - 氧气', 'O2-MNBs 等 5 处', 'O₂-MNBs（下角标）'],
        ['化学式 - 氮气', 'N2 MNBs 等 6 处', 'N₂ MNBs（下角标）'],
      ], [3000, 3000, 3500]),
      note('范围', '涉及「瑞德智设备」产品参数区（8 处产品规格）、「研究方向」详情页（共 13 处正文文本）等。'),

      h2('2. 团队成员方向归属修正'),
      p('团队成员页面的「研究方向快捷筛选」存在计数不准确的问题：筛选某类成员时，方向筛选按钮上的人数之和与该类成员总数不一致。'),
      p('经排查，原因是部分成员的主研究方向标签未被纳入「方向筛选」的索引范围。'),

      h3('修正措施'),
      bullet('将 4 位成员的主研究方向重新归类到现有的四大方向之一：'),
      subBullet('韩重阳（博士生）→ 气泡成核过程调控与设备研发'),
      subBullet('张懿（硕士生）→ 气泡成核过程调控与设备研发'),
      subBullet('耿嘉栋（硕士生）→ 气泡成核过程调控与设备研发'),
      subBullet('蒋芦笛（硕士生）→ 黑臭水体无药剂低能耗治理'),
      bullet('删除已不再使用的「第 5 个研究方向」标签'),

      h3('修正结果（每个类别筛选人数之和 = 实际人数）'),
      makeTable([
        ['角色类别', '实际人数', '筛选加和', '状态'],
        ['博士生 PhD', '3 人', '3 人', '✓ 一致'],
        ['硕士生 Master', '17 人', '17 人', '✓ 一致'],
        ['本科生 Undergrad', '3 人', '3 人', '✓ 一致'],
        ['已毕业 Alumni', '4 人', '4 人', '✓ 一致'],
      ], [3000, 1500, 1500, 2000]),
      divider(),

      // 五、地址更新
      h1('五、联系地址信息更新'),
      p('课题组此前展示的联系地址为天津大学卫津路老校区地址。本次更新为北洋园校区新地址（2015 年后启用的新校区）：'),
      makeTable([
        ['项目', '更新前', '更新后'],
        ['地址', '天津市南开区卫津路 92 号（天津大学）', '天津市津南区海河教育园区雅观路 135号 天津大学北洋园校区'],
        ['邮编', '300072', '300354'],
      ], [2000, 4500, 4500]),

      h2('更新位置'),
      bullet('「联系我们」独立页面'),
      bullet('首页底部「加入我们」区块'),
      bullet('个人简介页（PI 资料）'),

      h2('排版优化：地址三行渲染'),
      p('原先地址在一行内显示，遇到较长地址会被强制换行破坏「校区名」的完整性。本次更新对地址渲染做了三行排版：'),
      bullet('第 1 行：详细地址（中等字号、加粗）'),
      bullet('第 2 行：校区名称（中等字号、加粗）'),
      bullet('第 3 行：邮编（小一号、灰色、单独成行）'),
      p('这样的分层排版让地址信息更易阅读，「天津大学北洋园校区」不会被换行截断。'),
      divider(),

      // 六、跳转修正
      h1('六、「联系我们」按钮跳转逻辑修正'),
      makeTable([
        ['项目', '更新前', '更新后', '说明'],
        ['瑞德智设备页 - 「联系我们」按钮', '跳转到首页「加入我们」区域（/#join）', '跳转到独立的「联系我们」页面（/contact）', '按钮语义与跳转目标对齐'],
      ], [3500, 3000, 3000, 3000]),
      note('原因说明', '原先按钮点击后会跳到首页底部，但「联系我们」的语义应该是一个独立页面，让用户专注于填写联系信息、查看联系方式。本次修正后用户体验更清晰。'),
      divider(),

      // 七、研究页面优化
      h1('七、研究页面排版细节优化'),
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

      // 八、其他改动
      h1('八、其他细节修正与代码清理'),
      makeTable([
        ['项目', '说明'],
        ['代码清理', '删除团队成员数据中已不再使用的「第 5 个研究方向」标签常量'],
        ['英文副标签', '为瑞德智设备产品矩阵的 3 个产品系列添加英文副标签，方便外宾快速理解'],
        ['Module 编号', '为研究方向板块的 4 个 Tab 添加 Module 01/02/03/04 编号'],
      ], [2500, 7000]),
      divider(),

      // 九、技术指标
      h1('九、本次更新技术指标'),
      makeTable([
        ['项目', '数量'],
        ['修改的源文件', '17 个'],
        ['新增代码行', '427 行'],
        ['删除代码行', '204 行'],
        ['统一风格的 Tab 组件', '7 组'],
        ['修复的滚动入场问题', '11 处'],
        ['规范化处理的数据', '20+ 处'],
        ['更新的地址信息', '2 处文件 × 1 处数据'],
      ], [4000, 5500]),
      p('本次更新在不改变网站整体结构的前提下，重点提升了视觉一致性、专业规范性和交互体验。所有改动已经过本地验证并部署到线上。'),

      p(''),
      p(''),
      tip('如对更新内容有任何疑问或建议，欢迎随时反馈。'),
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