# 微纳气泡实验室网站 - 项目扫描与升级方案

> 基于对 `lab-site` 全项目的扫描结果整理，包含技术栈、路由、组件、样式、性能与可维护性分析，以及 UI 重构策略、目录建议、风险点、迁移步骤与验收清单。

---

## 一、项目扫描结果

### 1.1 技术栈

| 类别 | 技术 | 版本 | 说明 |
|------|------|------|------|
| 框架 | Next.js | 16.1.6 | App Router，`output: "export"` 静态导出 |
| UI | React | 19.2.3 | 函数式组件 + Hooks |
| 语言 | TypeScript | ^5 | 严格模式，`@/*` 路径别名 |
| 样式 | Tailwind CSS | ^4 | 仅 PostCSS 插件，无 tailwind.config，主题在 globals.css `@theme inline` |
| 动画 | Framer Motion | ^12.23.12 | 当前未在代码中直接使用；自研 Reveal/ImageReveal |
| 图片 | Sharp | ^0.34.4 | 构建时脚本 `scripts/optimize-images.mjs` |
| 部署 | GitHub Pages | - | basePath 支持 `Micro-Nano-Bubble-Technology-Lab`，`images.unoptimized: true` |

**构建相关**：`npm run build` = 先执行 `images:optimize` 再 `next build`，产物在 `out/`，带 `trailingSlash: true`。

---

### 1.2 页面路由

| 路径 | 类型 | 说明 |
|------|------|------|
| `/` | 静态 | 首页：轮播 + PI + 研究方向 + 成果摘要 + 新闻 + 联系摘要 |
| `/research` | 静态 | 研究列表（分组：核心 / 应用），LazyMount 卡片 |
| `/research/[slug]` | 静态 | 研究详情，`generateStaticParams` 来自 research 数据 |
| `/industrialization` | 静态 | 产业化基地列表 |
| `/industrialization/[slug]` | 静态 | 基地详情，aquaculture 有 AquacultureTabs + PDF 数据 |
| `/publications` | 客户端 | 成果页，Tab：论文 / 专利 / 荣誉，搜索与年份筛选，URL `?tab=` |
| `/people` | 客户端 | 成员页，角色/标签筛选，仅学生与已毕业 |
| `/showcase` | 静态 | 风采展示：轮播 + 课题组简介卡片 |
| `/news` | 静态 | 最新动态列表（**未在主导航中露出**，仅数据来自 news.ts） |
| `/contact` | 静态 | 联系与加入我们（**部分硬编码**，与 data/contact 未完全统一） |
| `/honors` | 重定向 | `redirect("/publications?tab=honors")` |

**路由小结**：App Router 结构清晰；动态路由均用 `generateStaticParams`；`/news` 与主导航脱节；contact 页数据与 `data/contact` 存在重复/不一致。

---

### 1.3 组件结构

```
src/components/
├── Container.tsx          # 布局：site-container
├── SiteHeader.tsx        # 主导航（含移动端菜单，"use client"）
├── SiteFooter.tsx        # 页脚（取 contact 数据）
├── HomeHeroCarousel.tsx  # 首页轮播（client）
├── SimpleCarousel.tsx    # 通用轮播（client）
├── PiCard.tsx            # 首页 PI 卡片（client）
├── PeopleCard.tsx        # 成员卡片（client）
├── PublicImage.tsx       # 封装 Next/Image + assetPath + variant
├── LightboxGallery.tsx   # 图集 + 灯箱（client）
├── AquacultureTabs.tsx   # 产业化 aquaculture 的 Tab（client）
├── CopyButton.tsx        # 复制按钮（client）
├── LazyMount.tsx         # 基于 IntersectionObserver 的懒挂载（client）
├── ui/
│   ├── Button.tsx        # 含 buttonClassName 导出
│   ├── Card.tsx
│   ├── Section.tsx       # section + 容器/间距配置
│   ├── Heading.tsx
│   ├── Badge.tsx, Chip.tsx, Pill.tsx
│   ├── ListItem.tsx
│   ├── CopyBlock.tsx
│   └── ...
└── motion/
    ├── Reveal.tsx        # 入场动画（自研，非 Framer）
    └── ImageReveal.tsx   # 图片入场
```

**问题摘要**：
- **数据兼容层重复**：`pickArray` / `pickObject` / `pickList` 在 `page.tsx`、`SiteFooter` 等多处实现，逻辑相似未抽到 `lib/`。
- **Client 边界偏多**：Header、轮播、筛选页等合理；部分可考虑服务端渲染 + 客户端 hydration 缩小 client bundle。
- **无组件索引**：无 `components/index.ts` 等 barrel，导入路径分散。
- **PublicImage 与直接 Image**：部分页面直接用 `next/image` + `assetPath` + `toImageVariant`，未统一用 `PublicImage`。

---

### 1.4 样式系统

- **入口**：`src/app/globals.css`，`@import "tailwindcss"`；PostCSS 仅 `@tailwindcss/postcss`。
- **主题**：CSS 变量在 `:root` 定义（如 `--bg`, `--surface`, `--accent`），在 `@theme inline` 中映射为 Tailwind 语义（`--color-bg` 等）；部分组件用 `var(--xxx)`，部分用 Tailwind 类（如 `text-[var(--text)]`、`bg-[var(--accent-soft)]`）。
- **布局类**：`.site-container`、`.site-container-wide`、`.section`、`.section-compact`、`.section-spacious` 在 globals.css 中定义，与 Tailwind 混用。
- **字体**：body 使用系统栈；Header 使用 `Ma_Shan_Zheng`（next/font/google）。
- **问题**：
  - 语义色混用：既有 `text-muted-foreground`、`bg-background`（Tailwind 主题），也有 `text-[var(--muted)]`、`border-[var(--border)]`，长期易不一致。
  - 产业化/研究详情页内大量硬编码 Tailwind 色（如 `sky-200`、`teal-950`），与全局 CSS 变量未统一。
  - 重复的圆角/阴影：如 `rounded-2xl`、`rounded-3xl`、`shadow-sm` 分散，未形成少量设计 token。

---

### 1.5 性能瓶颈与优化点

| 问题 | 位置/原因 | 建议 |
|------|-----------|------|
| 图片未用 Next 优化 | `next.config`: `images.unoptimized: true`（静态导出限制） | 保持现状；依赖构建脚本生成 thumb/main/full；确保关键图用 `priority`/`fetchPriority`（已部分使用）。 |
| 首屏 JS 体积 | Header、首页轮播、Reveal 等均为 client，且无路由级 code splitting 文档 | 对非首屏组件（如 LightboxGallery、AquacultureTabs）使用 `next/dynamic` 懒加载。 |
| 数据与模块体积 | `content/aquaculturePdfFullData.ts` 单文件较大，与 industrialization 详情强耦合 | 仅 aquaculture 详情页按需加载该数据（动态 import 或拆成 JSON + 按 slug 加载）。 |
| 首页数据拉取 | 首页同步 import 多个 data 模块（publications、research、news、contact） | 可接受；若后续数据膨胀，可考虑按路由拆分或边缘缓存。 |
| LazyMount 使用范围 | 仅 research 列表使用 LazyMount | 列表/长页面可推广 LazyMount 或使用原生 `loading="lazy"` 图片 + 占位。 |

---

### 1.6 可维护性问题

1. **数据层**
   - `pickArray` / `pickObject` / `pickList` 分散在多处，应统一到 `lib/data.ts` 或类似模块，并统一 data 文件的导出约定（default vs named）。
   - contact 数据：`contact/page.tsx` 部分硬编码，Footer 用 `data/contact`，容易不同步。
   - 类型：部分使用 `AnyRecord`、`any`（如首页、publications 的 pick 函数），建议为各 data 模块定义明确类型并导出。

2. **路由与导航**
   - `/news` 未在 `navItems` 中，若仍需要该页应在 site 配置中补链或明确“仅内链/下线”。
   - `/honors` 仅做重定向，可保留并在文档中说明。

3. **组件与样式**
   - 产业化详情页、研究详情页内联 theme 对象（如 `coverOverlay`、`cardBorder`）较长，可抽成 `lib/themePresets` 或按模块的 CSS 类集合。
   - 按钮/链接样式：既有 `buttonClassName`，也有内联 `rounded-full bg-[var(--accent)]...`，建议统一为少量 UI 变体（如 primary / secondary / ghost）。

4. **依赖**
   - 已安装 Framer Motion 但未在代码中使用；若以 Reveal/ImageReveal 为主，可考虑移除依赖或明确“保留供后续复杂动效”。

---

## 二、升级方案概览

- **UI 重构**：统一设计 token、减少内联主题、收敛组件 API。
- **目录与数据**：抽数据工具、统一 contact、明确类型。
- **性能**：懒加载大组件与大数据、保持现有图片策略。
- **迁移**：分阶段、可回滚、每步有验收。

---

## 三、UI 重构策略

### 3.1 设计 Token 统一

- 在 `globals.css` 中保留并强化 `:root` 与 `@theme inline`，**逐步弃用**页面内硬编码的 Tailwind 色（如 `sky-200`、`teal-950`）。
- 新增少量语义 token（可选）：
  - 如 `--card-bg`、`--card-border`、`--overlay-gradient-core`、`--overlay-gradient-apps`，供研究/产业化详情页复用。
- 圆角/阴影：约定 2–3 级（如 card、modal、hero），用 CSS 变量或 Tailwind 的 theme 扩展，避免到处写 `rounded-2xl`/`rounded-3xl` 混用。

### 3.2 组件规范

- **按钮/链接**：统一通过 `Button` 或 `buttonClassName` 的变体（primary / secondary / outline / ghost），页面中不再写长串 `className`。
- **卡片**：列表卡、详情卡、KPI 卡统一用 `Card` + 可选 `variant`（default / soft / bordered），减少内联 `rounded-2xl border ... shadow-sm`。
- **图片**：全站统一使用 `PublicImage`（或封装后的同一组件），内部处理 `assetPath`、`toImageVariant`、`unoptimized`。
- **Section/Heading**：保持 `Section` + `Heading` 作为页面区块标准，避免再新增 ad-hoc 的 section 类。

### 3.3 主题与详情页

- 将研究详情页的 `theme` 对象（core vs applications）抽到 `lib/themePresets.ts` 或 `styles/researchTheme.ts`，按 `group` 或 `tone` 返回。
- 产业化详情页的 `sectionThemes` 等也可抽成预设，页面只引用 key，减少重复字符串。

### 3.4 动画

- 保持现有 Reveal/ImageReveal 作为默认入场动画；若后续需要更复杂序列，再引入 Framer Motion 或保留依赖并逐步替换。
- 避免在列表项上过度使用 delay（如 `delay={index * 0.05}`）导致首屏等待感，可设上限或仅对首屏外使用。

---

## 四、目录结构建议

在现有基础上做**最小侵入**的调整，便于迁移与回滚：

```
src/
├── app/                    # 保持现有，仅做局部替换
├── components/
│   ├── ui/                 # 保持，统一从 ui 导出常用项
│   ├── motion/             # 保持
│   ├── layout/             # 可选：Header、Footer、Container 移入
│   └── index.ts            # 可选：barrel 导出公共组件
├── data/                   # 保持，补充类型与导出约定
├── content/                # 保持，大数据考虑按 slug 或按需加载
├── lib/
│   ├── assetPath.ts
│   ├── imageVariant.ts
│   ├── data.ts             # 新增：pickArray / pickObject / pickList 统一
│   ├── peopleTheme.ts      # 已有
│   └── themePresets.ts     # 新增：研究/产业化详情页 theme 预设
├── styles/                 # 可选：仅当拆出多文件时
│   └── tokens.css          # 从 globals 拆出的 token（可选）
└── types/                  # 可选：全局共享类型
    └── data.d.ts           # 各 data 模块的导出类型
```

**不建议**：大规模移动页面、重命名路由、合并 app 与其它根目录，以免影响 basePath 与现有部署。

---

## 五、风险点

| 风险 | 说明 | 缓解 |
|------|------|------|
| 静态导出与图片 | 关闭 `unoptimized` 需 Next Image 优化，与 `output: "export"` 不兼容 | 保持当前方案；优化脚本与 variant 路径保持一致。 |
| basePath 与链接 | 所有内部 Link、assetPath 依赖 `NEXT_PUBLIC_BASE_PATH` | 重构时不改 href 生成逻辑；CI 中保留 GITHUB_ACTIONS 测试。 |
| 数据导出形式变更 | 统一 pick 逻辑可能要求 data 文件统一 default export | 先实现兼容 both 的 pick，再逐步迁移 data 文件。 |
| 样式回归 | 用 token 替换内联色可能造成视觉偏差 | 按页面分批替换，每批做截图或视觉抽查。 |
| 客户端边界 | 将部分“use client”改为服务端可能影响交互 | 仅对纯展示区块尝试；筛选、Tab、轮播保持 client。 |

---

## 六、迁移步骤（分阶段）

### 阶段 0：准备（1–2 天）

- 在 docs 中记录当前各页面的“主截图”或关键状态（可选）。
- 确认 CI 与 `npm run build` 在 main 分支绿色。
- 创建分支 `chore/upgrade-plan` 或按功能分支推进。

### 阶段 1：数据与类型（约 2–3 天）

1. 新增 `src/lib/data.ts`，实现并导出 `pickArray`、`pickObject`、`pickList`（兼容 default + named）。
2. 首页、people、publications、SiteFooter 等改为从 `@/lib/data` 引用，删除本地重复实现。
3. 为 `data/contact`、`data/news` 等补充/导出类型；contact 页改为完全从 `data/contact` 读取，去掉硬编码。
4. 验收：首页、people、publications、contact、Footer 展示与修改前一致；TypeScript 无新增错误。

### 阶段 2：样式与主题收敛（约 2–3 天）

1. 在 `globals.css` 中增加 2–3 个语义 token（如 card、overlay），不删现有变量。
2. 将研究详情页的 theme 对象抽到 `lib/themePresets.ts`，页面改为引用。
3. 产业化详情页的 `sectionThemes` 等抽到同一文件或单独 preset。
4. 验收：研究/产业化详情页视觉无变化；Lint 通过。

### 阶段 3：组件统一（约 2–3 天）

1. 全站图片：逐步将直接使用 `Image` + `assetPath` + `toImageVariant` 的替换为 `PublicImage`（或统一封装）。
2. 按钮：主要 CTA 与次要按钮统一用 `Button` / `buttonClassName` 变体，替换长串 class。
3. 卡片：列表与详情中的“白底圆角边框”区块逐步改为 `Card` + 统一 variant。
4. 验收：各页面功能与样式一致；无控制台报错。

### 阶段 4：性能与懒加载（约 1–2 天）

1. `LightboxGallery`、`AquacultureTabs` 等非首屏组件用 `next/dynamic` 懒加载。
2. `aquaculturePdfFullData` 仅在 `industrialization/aquaculture` 详情页动态 import，其它基地不加载。
3. 验收：构建产物体积可对比；首屏 LCP/CLS 无恶化（可做简单 Lighthouse 对比）。

### 阶段 5：导航与收尾（约 1 天）

1. 决定 `/news` 是否入主导航；若入，在 `data/site.ts` 的 `navItems` 中增加并同步 Header/Footer。
2. 可选：增加 `components/index.ts` 导出常用组件，逐步改为从 `@/components` 引用。
3. 依赖：若确认不用 Framer Motion，从 package.json 移除并删除相关配置；否则在 README 中注明“预留”。
4. 更新 `docs/DEVELOPMENT.md` 与本文档，标注已完成的项。

---

## 七、验收清单

### 功能与展示

- [ ] 首页：轮播、PI、研究方向、成果摘要、新闻、联系区块正常；链接正确。
- [ ] 研究列表与详情：分组、封面、图集、灯箱、返回链接正常；主题色与现有一致。
- [ ] 产业化列表与详情：基地卡片、aquaculture Tab、PDF 数据与图表、成本表、链接正常。
- [ ] 成果页：三个 Tab 切换、搜索、年份筛选、URL `?tab=` 同步、DOI 等链接正确。
- [ ] 成员页：角色/标签筛选、搜索、人数统计、卡片标签点击筛选正常。
- [ ] 风采展示：轮播与简介卡片正常。
- [ ] 联系页：邮箱、地址、链接、复制按钮正常；数据与 Footer 一致。
- [ ] 导航与页脚：所有 nav 链接、basePath 下可访问；移动端菜单正常。

### 构建与部署

- [ ] `npm run build` 成功；`out/` 生成且包含预期 HTML/资源。
- [ ] `GITHUB_ACTIONS=1` 时 basePath 正确，本地与 Pages 访问路径一致。
- [ ] 图片优化脚本运行无报错；thumb/main/full 路径与代码使用一致。

### 代码质量

- [ ] TypeScript 严格模式无新增错误；data 相关类型可从 `lib/data` 或 data 模块推断。
- [ ] ESLint 通过；无新增 `any` 或未处理类型。
- [ ] 数据层：无重复的 pick 实现；contact 单一数据源。

### 性能（可选）

- [ ] 首屏关键图片带 `priority`/`fetchPriority`；大组件已懒加载。
- [ ] 若做 Lighthouse：LCP、CLS 与升级前相当或更好。

---

## 八、附录：快速参考

- **路由汇总**：`/`、`/research`、`/research/[slug]`、`/industrialization`、`/industrialization/[slug]`、`/publications`、`/people`、`/showcase`、`/news`、`/contact`、`/honors`（重定向）。
- **关键配置**：`next.config.ts`（output export、basePath、images unoptimized）、`postcss.config.mjs`、`globals.css`（Tailwind + theme）。
- **数据入口**：`src/data/*.ts`、`src/content/aquaculturePdfFullData.ts`；导航与站点元数据 `data/site.ts`。

---

*文档版本：1.0 | 与项目扫描日期一致*
