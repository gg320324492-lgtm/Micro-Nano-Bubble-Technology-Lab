# Roadmap — Micro-Nano-Bubble Technology Lab

> 📅 最后更新：2026-07-17

## Done

### 基础架构
- [x] 官网基础架构 (Next.js 16 静态导出 + Nginx 部署)
- [x] 首页轮播 + 研究方向 / 产业化 / 团队成员 / 荣誉 / 新闻各页面
- [x] 响应式适配（桌面 + 移动端）
- [x] 图片优化管线（WebP 多尺寸 + 懒加载）
- [x] SSL/HTTPS（Let's Encrypt + Nginx 443）
- [x] sitemap.xml 自动生成（next-sitemap）
- [x] Nginx 部署路径统一为 `/var/www/mnb-lab`，清理历史残留目录

### 部署 & CI
- [x] ~~GitHub Actions 自动部署到阿里云（deploy.yml）~~ — **已停用，Ubuntu runner OOM**
- [x] 移除 GitHub Pages 部署，仅保留阿里云
- [x] 改手动部署流程（本地 Windows 构建 → tar → scp → rsync → reload nginx）
- [x] 一键部署命令封装（见 [README.md](./README.md)）
- [x] 部署验证脚本（必须校验所有子页面 200）

### Bug 修复
- [x] 轮播图模糊修复：main(1400px) → full(2200px)
- [x] React #418 水合错误修复（`ClientOnly` 包装 framer-motion，`SiteFooter` / `PiCard` 等）
- [x] Nginx 静态资源 block 添加 `try_files $uri =404;`（防 404 回退到 index.html）
- [x] 修复服务器 Nginx `Cache-Control`（`public,max-age=180` → `no-cache`）
- [x] 确认 GitHub Actions 构建不完整（Ubuntu OOM 丢子页面），改手动部署

### webhint / 性能
- [x] Content-Type charset、woff2 MIME 类型、表单 id/name
- [x] HTML no-cache、字体 Cache-Control、X-Content-Type-Options
- [x] RSC 文件 204 响应、select 无障碍 aria-label
- [x] CSS 兼容性 + 性能优化（移除 Expires 头、统一 Cache-Control）

### 内容更新
- [x] B 站乡村振兴视频报道（2026-05）
- [x] 津云新闻报道（2026-05）
- [x] 碳湾对话 ×2（2026-04）
- [x] 天津日报概念验证基金报道（2026-03）
- [x] 宣怀学院《科创导师》专栏访谈（2026-07-10）
- [x] 王天志 PI bio 更新（按最新口径：天使轮 1550 万 / 估值 7000 万）
- [x] 教育经历整理：移除哥伦比亚大学交流生条目
- [x] 2026-2027 学年成员更新：4 名新成员（蒋芦笛、刘子煜、刘莫菲、吴怡霏）；3 名硕士毕业；2 名升博（韩重阳、张宏魁）
- [x] 新成员占位头像生成（紫色渐变 + 首字母）
- [x] 张宏魁研究方向更新（无抗生素高密度养殖）
- [x] 2026 京津冀环境综合治理国家科技重大专项 4 个课题入库（`projects.ts`）
- [x] 新增自主基金：「高性能低能耗微纳气泡发生装备设计与产业落地（2026XS32-0028）」
- [x] 自主基金标题用词统一：「产业基地」→「产业落地」
- [x] 荣誉墙更新：`honor-03` 标题改为「首届天津大学青年科创奖（2025）」，并附证书图
- [x] 信任背书数据更新：海棠基金 350 万 / 生产线 2 条 / 到账金额 200 万元
- [x] 产业化页面移除「打开监测大屏」按钮（数据 + 组件 + 类型 5 处）
- [x] 水产养殖图集扩容：追加 12 张基地新图（g08-g19），共 19 张
- [x] 鱼图批量旋转（g08-g12）保证横向（头朝左）
- [x] 瑞德智天津设备基地封面图替换为厂区全景（g02.jpg）
- [x] showcase 封面容器改用 `aspect-[4/3]`，按原图比例完整展示

### 工具脚本
- [x] `scripts/optimize-images.mjs` — 图片自动优化（thumb / main / full）
- [x] `scripts/gen-report.mjs` — Word 信息更新报告生成
- [x] `scripts/gen-report-short.mjs` — 简版报告生成
- [x] `scripts/verify-showcase.mjs` — 设备展示页截图验证（截图存 `verify-output/`）

## In Progress

## Planned
- [ ] 图片进一步压缩（>201 MB 资源优化，JPEGs/PNG 仍有压减空间）
- [ ] 剩余 webhint 警告处理（框架生成的前缀/`fetchpriority`，无法修复）
- [ ] 在本地 CI 环境构建 + 自动 rsync（替代 GitHub Actions）
- [ ] 新成员正式照片替换（蒋芦笛 / 刘子煜 / 刘莫菲 / 吴怡霏，当前为紫色渐变占位）
- [ ] 校友页 / 历史成员归档（雒培媛等已毕业成员的持续追踪）
- [ ] 团队页交互增强：研究方向筛选、年级排序
- [ ] SEO 进一步优化（结构化数据 / Open Graph / 中文站点名）
