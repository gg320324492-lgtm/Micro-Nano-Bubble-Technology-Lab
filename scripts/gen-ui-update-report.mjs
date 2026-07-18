// scripts/gen-ui-update-report.mjs
// 生成《官网更新与优化报告》Word 版本（覆盖昨晚以来的全部改动）
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
      title('微纳米气泡课题组官网'),
      title('更新与优化报告'),
      subtitle(`报告周期：2026-07-18 晚 ~ 2026-07-19　汇报人：课题组官网维护组`),

      p(''),

      // 一、整体概述
      h1('一、本次更新整体概述'),
      p('本报告汇总了过去约 30 小时内的全部更新工作，按时间顺序共 4 个提交：'),
      makeTable([
        ['提交时间', '提交标识', '主题'],
        ['07-18 20:02', '2156934', '4 位新成员头像照片替换（占位图→真实照片）'],
        ['07-18 20:22', '9cf49e7', '瑞德杯议程讲师姓名修正（杨慧→杨慈、蒋卢迪→蒋芦笛）'],
        ['07-18 23:40', '08cfb41', '专利/软著补全 22 项；水产基地图集调整；黑臭封面更换'],
        ['07-19 02:38', '890eb67', 'UI 大改：Tab 统一、滚动修复、上下角标、地址更新等'],
      ], [2200, 1800, 5500]),
      p('其中第四项（UI 大改）是本会话的主要工作，其余三项为前一晚的延续。所有改动均已部署到线上（https://mnb-lab.cn）。'),

      // 二、团队成员头像
      h1('二、团队成员头像照片更新'),
      p('团队成员页面此前有 4 位新成员（蒋芦笛、刘莫菲、刘子煜、吴怡霏）使用紫色渐变占位头像。本次更新为这 4 位成员替换为真实头像照片：'),
      makeTable([
        ['姓名', '原占位头像大小', '新真实照片大小', '照片内容'],
        ['蒋芦笛', '约 7 KB', '48 KB', '新成员证件照'],
        ['刘莫菲', '约 11 KB', '1.1 MB', '新成员证件照'],
        ['刘子煜', '约 9 KB', '70 KB', '新成员证件照'],
        ['吴怡霏', '约 9 KB', '240 KB', '新成员证件照'],
      ], [2200, 2200, 2200, 3000]),

      // 三、瑞德杯议程修正
      h1('三、瑞德杯议程讲师姓名修正'),
      p('在「媒体与风采」页面的瑞德杯议程中，发现 2 处讲师姓名错误：'),
      bullet('「杨慧」应为「杨慈」'),
      bullet('「蒋卢迪」应为「蒋芦笛」（同团队成员蒋芦笛）'),
      p('上述姓名已在「新闻详情」等其它地方出现时是正确的，仅「媒体与风采」页议程一处出错。本次统一修正。'),

      // 四、专利数据补全
      h1('四、专利/软著数据补全（22 项）'),
      p('对照《知识产权证书纯文字整理.docx》，对专利数据进行了系统性补全：'),
      bullet('补全数量：发明专利 5 项 + 实用新型 13 项 + 软件著作权 4 项 = 共 22 项'),
      bullet('新增字段：category（专利类别）、inventors（发明人）、assignee（申请人/权利人）、certificateNo（证书号）、applicationDate（申请日）、publicationNo（授权公告号）、applicationNo（申请号）、note（备注）'),
      bullet('编号统一为「ZL YYYY T NNNNN.X」国家标准格式'),

      h2('专利详情展示优化'),
      p('在「成果」页面的专利 Tab 中，为每条专利增加了「详细信息」折叠块，点击展开后可见：发明人、申请人、证书号、授权公告号、申请日、申请号等完整字段，与之前论文 Tab 的「更多信息」交互保持一致。'),

      // 五、图集调整
      h1('五、图集调整与封面更新'),
      h2('1. 水产养殖基地图集（净增 0 张，删 3 增 3）'),
      makeTable([
        ['操作', '图片编号', '内容说明'],
        ['删除', 'g01', '原图内容为「鱼」实拍，与养殖场景重复'],
        ['删除', 'g04', '原图内容为「辣椒」，与基地无关'],
        ['删除', 'g05', '原图内容为「塑料袋」，非基地实景'],
        ['新增', 'g25', '高密度养殖池鱼群活体状态'],
        ['新增', 'g26', '成品鱼打样展示'],
        ['新增', 'g27', '全国智慧渔场布局分布图'],
      ], [1500, 1500, 6500]),
      p('同时调整了图集顺序：「设备布置 / 管路与曝气点」与「温室养殖圆池」交换位置，让图片浏览节奏更合理。'),

      h2('2. 水产基地详情页：新增 1+2 hero band'),
      p('仿照瑞德智设备基地的排版，在水产养殖基地封面下方新增了「1+2 hero band」并排两张基地场景图：'),
      bullet('左图：全国智慧渔场布局分布图（g27）'),
      bullet('右图：成品鱼打样展示（g26）'),
      p('效果：增强首屏视觉冲击力，让访客在进入页面后立即了解基地的整体规模与代表性成果。'),

      h2('3. 黑臭水体治理基地封面更换'),
      p('原封面替换为新的「臭氧微纳米气泡一体机现场」实景照（来自桌面 4.png），更直观地展示核心装备。'),

      // 六、内容文案
      h1('六、其它内容文案微调'),
      makeTable([
        ['调整位置', '调整内容'],
        ['瑞德智设备 - 信任背书', '团队规模：全职3+兼职16 → 全职7+兼职10'],
        ['瑞德智设备 - 信任背书', '到账金额：200万元 → 合同金额：1000万+'],
        ['媒体与风采 - 实验室卡片', '文案细节优化'],
        ['媒体与风采 - 答辩会卡片', '文案细节优化'],
      ], [3500, 6000]),

      // 七、UI 大改
      h1('七、UI 大改（本会话主要工作）'),

      h2('1. Tab 视觉风格统一（7 组）'),
      p('全站不同页面原 Tab 风格各异，本次统一为「圆角卡片 + 紫蓝渐变 + 中英对照」设计语言，切换时高亮区域平滑滑动。'),
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

      h2('2. 滚动入场卡片空白修复（11 处）'),
      p('原方案使用「视口观察器」技术实现卡片渐入动画，遇到卡片刚挂载就处于屏幕边界处时偶发不触发，导致内容停留在完全透明状态。修复方案：改为「挂载即触发」方式，所有内容在页面打开时立即可见。'),
      bullet('瑞德智设备主页：工程交付 5 STEP 卡片、信任背书、客户类型、核心优势、应用场景、气泡统计、图集 Tab 按钮'),
      bullet('媒体报道区：报道卡片'),
      bullet('团队成员页：成员头像卡片'),
      bullet('风采展示页：实验室 / 瑞德杯 / 答辩会详情卡片'),

      h2('3. 学术数据展示规范化'),
      makeTable([
        ['场景', '更新前', '更新后'],
        ['气泡密度', '10^9 个/mL', '10⁹ 个/mL'],
        ['产品规格（8 处）', '1m3/h', '1m³/h'],
        ['化学式臭氧（7 处）', 'O3-MNBs', 'O₃-MNBs'],
        ['化学式氧气（5 处）', 'O2-MNBs', 'O₂-MNBs'],
        ['化学式氮气（6 处）', 'N2 MNBs', 'N₂ MNBs'],
      ], [2800, 3000, 3500]),

      h2('4. 团队成员方向归属修正'),
      p('原先 4 位成员主研究方向标签未被「方向筛选」索引，导致筛选人数加和 ≠ 实际人数。修正后 4 类成员筛选加和 = 实际人数（博士生 3 / 硕士生 17 / 本科生 3 / 已毕业 4）。'),
      note('人员调整', '韩重阳、张懿、耿嘉栋 归到「气泡成核过程调控与设备研发」；蒋芦笛 归到「黑臭水体无药剂低能耗治理」；删除已废弃的第 5 个研究方向标签。'),

      h2('5. 联系地址更新（北洋园校区）'),
      makeTable([
        ['项目', '更新前', '更新后'],
        ['地址', '天津市南开区卫津路 92 号（天津大学）', '天津市津南区海河教育园区雅观路 135号 天津大学北洋园校区'],
        ['邮编', '300072', '300354'],
      ], [2000, 4500, 4500]),
      p('更新位置：「联系我们」独立页面、首页底部「加入我们」区块、个人简介页。'),
      p('排版优化：地址从单行渲染改为三行（第 1 行地址、第 2 行校区、第 3 行邮编小灰字），避免「校区名」被浏览器换行截断。'),

      h2('6. 其他修正'),
      bullet('「联系我们」按钮：跳转目标从「/#join」改为「/contact」，按钮语义对齐'),
      bullet('研究页面章节卡：左侧加 2px 紫蓝渐变色条 + 章节前加编号（如「01 处理效果」）'),
      bullet('研究页面图片展示：奇数张时最后一张自动满宽，避免右下角留白'),
      bullet('研究页面两栏比例：1.45 : 1 → 1.35 : 1，间距 gap-8 → gap-12，呼吸感更强'),

      // 八、统计
      h1('八、本次更新汇总'),
      makeTable([
        ['项目', '数量'],
        ['修改的源文件', '25+ 个'],
        ['新增/替换图片', '4 张头像 + 3 张水产新图 + 1 张黑臭封面'],
        ['删除图片', '3 张（g01/g04/g05）'],
        ['补全专利数据', '22 项'],
        ['统一风格的 Tab 组件', '7 组'],
        ['修复的滚动入场问题', '11 处'],
        ['规范化处理的数据', '20+ 处'],
        ['更新的地址信息', '2 处文件 × 1 处数据'],
      ], [4000, 5500]),

      p(''),
      p('如对更新内容有任何疑问或建议，欢迎随时反馈。'),
    ],
  }],
});

const outputPath = 'docs/官网更新报告.docx';
mkdirSync(dirname(outputPath), { recursive: true });

const buffer = await Packer.toBuffer(doc);
writeFileSync(outputPath, buffer);

console.log(`✅ 已生成报告：${outputPath}`);
console.log(`   文件大小：${(buffer.length / 1024).toFixed(1)} KB`);