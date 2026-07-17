# Micro-Nano-Bubble-Technology-Lab

微纳米气泡课题组实验室官网 ([mnb-lab.cn](https://mnb-lab.cn)) — 静态网站

技术栈：**Next.js 16** + **React 19** + **TypeScript** + **Tailwind CSS v4**，静态导出 (`output: "export"`)。

> 📌 最近一次更新：2026-07-17（详见 [ROADMAP.md](./ROADMAP.md)）

---

## 目录

- [项目概览](#项目概览)
- [本地开发](#本地开发)
- [内容管理速查](#内容管理速查)
- [部署](#部署)
- [服务器架构](#服务器架构)
- [Nginx 配置要点](#nginx-配置要点)
- [故障排查](#故障排查)
- [相关文档](#相关文档)

---

## 项目概览

### 站点结构（页面与数据驱动）

| 路由 | 页面 | 主要数据 |
|---|---|---|
| `/` | 首页（轮播 + 研究方向/产业化/团队/荣誉/新闻） | `src/content/`, `src/components/home/` |
| `/research/` | 研究方向 | `src/data/research.ts` |
| `/industrialization/` | 产业基地列表 | `src/data/industrialization.ts` |
| `/industrialization/[slug]/` | 产业基地详情 | `src/data/industrialization.ts` + `src/content/reidDeviceShowcaseContent.ts` |
| `/showcase/` | 瑞德智设备展示 | `src/content/reidDeviceShowcaseContent.ts` |
| `/people/` | 团队成员 | `src/data/people.ts` |
| `/publications/` | 论文与专利 | `src/data/publications.ts`, `src/data/patents.ts` |
| `/news/` | 新闻动态 | `src/data/externalLinks.ts` |
| `/honors/` | 荣誉墙 | `src/data/honors.ts` |
| `/contact/` | 联系我们 | `src/data/contact.ts` |

### 主要内容来源

- **PI 个人简介**：[王天志](https://faculty.tju.edu.cn/226066/zh_CN/index.htm) — 天津大学环境学院副教授（博导）、瑞德智创新技术（天津）有限公司董事长
- **研究方向**：6 大方向（气泡溃灭与·OH 原位形成、水质提升、表面清洗、水肥气一体化、CO₂ 纳米气泡固碳、水环境治理设备）
- **科研项目**：自主基金 5 项 + 项目列表 15 项（含 2026 京津冀环境综合治理国家科技重大专项 4 个课题）
- **团队规模**：2 名博士生 + 13 名硕士研究生 + 3 名本科生 + 4 名已毕业校友
- **媒体报道**：津云新闻、B 站《乡村振兴怎么干》、碳湾对话、宣怀学院《科创导师》专栏、天津日报等

### 目录结构

```
lab-site/
├── public/                  # 静态资源
│   ├── home/               # 首页轮播图
│   ├── people/             # 团队成员头像
│   ├── industrialization/  # 产业基地图集（含 g01-g19）
│   ├── images/             # 媒体缩略图、荣誉证书
│   └── ...
├── src/
│   ├── app/                # Next.js App Router 页面
│   │   ├── page.tsx        # 首页
│   │   ├── research/       # 研究方向
│   │   ├── industrialization/[slug]/  # 产业基地详情
│   │   ├── people/         # 团队成员
│   │   ├── publications/   # 论文/专利
│   │   ├── news/           # 新闻
│   │   ├── honors/         # 荣誉墙
│   │   ├── showcase/       # 设备展示
│   │   └── contact/        # 联系
│   ├── components/         # 共享组件
│   │   ├── ClientOnly.tsx  # 水合保护包装
│   │   ├── HomeHeroCarousel.tsx
│   │   ├── PiCard.tsx
│   │   └── ...
│   ├── content/            # 内容数据
│   │   ├── reidDeviceShowcaseContent.ts
│   │   └── aquaculturePdfFullData.ts
│   ├── data/               # 结构化数据
│   │   ├── pi.ts           # PI 个人主页数据
│   │   ├── people.ts       # 团队成员
│   │   ├── projects.ts     # 项目列表
│   │   ├── publications.ts # 论文
│   │   ├── patents.ts      # 专利
│   │   ├── honors.ts       # 荣誉
│   │   ├── externalLinks.ts# 媒体报道
│   │   ├── industrialization.ts  # 产业基地
│   │   ├── contact.ts
│   │   └── site.ts
│   ├── lib/                # 工具函数
│   └── types/              # TypeScript 类型定义
├── deploy/
│   ├── nginx/              # Nginx 配置参考
│   └── scripts/            # 服务端部署脚本
├── scripts/
│   ├── optimize-images.mjs # 图片优化（thumb/main/full）
│   ├── gen-report.mjs      # Word 信息更新报告生成
│   ├── gen-report-short.mjs# 简版报告生成
│   └── verify-showcase.mjs # 设备展示页截图验证
├── docs/                   # 详细开发/部署文档
├── public/sitemap.xml      # 由 next-sitemap 生成
└── package.json
```

---

## 本地开发

**环境要求**：Node.js **20+** + npm

```bash
npm install
npm run dev      # http://localhost:3000（使用 --webpack，国内可访问）
```

### 常用命令

| 命令 | 说明 |
|---|---|
| `npm run dev` | 启动开发服务器（http://localhost:3000） |
| `npm run build` | 生产构建（含图片优化 → `out/`） |
| `npm run images:optimize` | 仅优化图片 |
| `npm run lint` | ESLint 检查 |
| `npm run test` | 运行 `src/lib/__tests__/*.test.mjs` |
| `npm run start` | 启动生产服务器（仅调试用） |

> ⚠️ **必须使用 `--webpack`**：Turbopack 在国内无法访问 Google Fonts。

---

## 内容管理速查

大部分日常更新只需修改 `src/data/` 与 `src/content/` 下的文件，无需改组件代码。

### 修改 PI 简介
编辑 [`src/data/pi.ts`](./src/data/pi.ts)：bio / tags / education / work / service / recruit。

### 增减团队成员
编辑 [`src/data/people.ts`](./src/data/people.ts)：使用 `mk()` 工厂；新成员需在 `public/people/` 下放置头像（自动生成 thumb.webp）。

### 增减项目/荣誉/论文
- 项目：[`src/data/projects.ts`](./src/data/projects.ts)
- 荣誉：[`src/data/honors.ts`](./src/data/honors.ts)
- 论文：[`src/data/publications.ts`](./src/data/publications.ts)
- 专利：[`src/data/patents.ts`](./src/data/patents.ts)

### 媒体/新闻报道
编辑 [`src/data/externalLinks.ts`](./src/data/externalLinks.ts)：按日期倒序自动排序。

### 产业基地
编辑 [`src/data/industrialization.ts`](./src/data/industrialization.ts)：
- 新增基地 → 添加 `slug` 数组项，封面与图集放入 `public/industrialization/<slug>/`
- 设备展示（瑞德智天津）文案在 [`src/content/reidDeviceShowcaseContent.ts`](./src/content/reidDeviceShowcaseContent.ts)

### 图片规范

构建时由 [`scripts/optimize-images.mjs`](./scripts/optimize-images.mjs) 自动生成 3 档：

| 规格 | 最大宽度 | 用途 |
|---|---|---|
| `thumb` | 640px | 列表卡片、缩略图 |
| `main` | 1400px | 页内正文插图 |
| `full` | 2200px | **首页轮播 / Hero / 全屏图**（使用 main 会模糊） |

源图放 `.jpg`，同名 `.webp` 三档由脚本生成。

---

## 部署

### ⚠️ 重要：必须在本地 Windows 构建

**GitHub Actions 和云服务器均无法完整构建此项目。** Next.js 16 静态导出在资源受限环境下会 OOM，静默跳过除首页外的所有子页面（只产 `index.html` 和 `404.html`）。

2026-06-09 实测 GitHub Actions ubuntu-latest runner 构建结果：首页和 404 存在，`/contact/`、`/news/`、`/people/` 等所有子页面缺失。

### 构建

```bash
npm run build   # 产物输出到 out/ 目录
```

### 一键部署命令

```bash
npm run build && tar -czf deploy.tar.gz -C out . && scp deploy.tar.gz mnb-aliyun:/tmp/ && ssh mnb-aliyun "rm -rf /tmp/mnb-deploy-out && mkdir -p /tmp/mnb-deploy-out && tar -xzf /tmp/deploy.tar.gz -C /tmp/mnb-deploy-out && rsync -a --delete /tmp/mnb-deploy-out/ /var/www/mnb-lab/ && sudo nginx -t && sudo systemctl reload nginx && echo 'DEPLOY OK'"
```

### 部署验证（必须！）

```bash
# 验证首页
curl -sI https://mnb-lab.cn/ | grep HTTP

# 验证所有子页面（GitHub Actions 构建会静默丢页面）
for path in /contact/ /people/ /news/ /research/ /publications/ /showcase/ /industrialization/ /honors/; do
  code=$(curl -sI "https://mnb-lab.cn$path" 2>/dev/null | grep "HTTP/1.1" | tail -1 | awk '{print $2}')
  echo "$path → $code"
done
```

> 每次部署后**必须验证子页面**，不能只看首页。

### GitHub Actions（已停用）

`.github/workflows/deploy-aliyun.yml` 保留在仓库但**不可靠**——Ubuntu runner 构建不完整，已确认会丢失子页面。仅用于触发通知，实际部署必须手动执行。

---

## 服务器架构

- `mnb-lab.cn` 和 `agent.mnb-lab.cn` 共享同一台阿里云 2核2G 云服务器（60.205.93.8）
- Nginx 通过 `server_name` 区分两个站点，配置在 `/etc/nginx/conf.d/default.conf`
- SSL 证书：Let's Encrypt，`certbot certonly --webroot` 管理，自动续期（systemd timer）
- SSH 别名：`mnb-aliyun`（deploy 用户，密钥 `~/.ssh/github_actions_deploy`）
- `/var/www/mnb-lab/` 属主为 deploy 用户，rsync 部署无需 sudo

### Deploy 用户 sudo 权限

| 命令 | 是否需要 sudo |
|---|---|
| `/usr/bin/rsync` | ✅ NOPASSWD |
| `/usr/sbin/nginx` | ✅ NOPASSWD |
| `/bin/systemctl` | ✅ NOPASSWD |
| 其他（tar / sed / tee / …） | ❌ 不允许 |

---

## Nginx 配置要点

- **HTML**：`Cache-Control: no-cache`（防止旧 CSS/JS 引用 404）
- **静态资源**（JS/CSS/图片/字体）：`Cache-Control: public, max-age=31536000, immutable` + `try_files $uri =404;`
- **RSC `.txt` 文件**：存在返回 200，不存在返回 204（避免 404 噪音）
- **字体 `.woff2`**：`Content-Type: font/woff2`（显式声明 MIME 类型）
- **charset**：`utf-8` for HTML/text/plain

> ⚠️ 仓库 `deploy/nginx/` 只是参考，实际服务器配置包含 `agent.mnb-lab.cn` 和 `mnb-lab.cn` 两个 server 块，**不要在本地用参考配置覆盖线上**。

---

## 故障排查

| 症状 | 原因 | 解决 |
|---|---|---|
| CSS MIME type 'text/html' | 静态资源 404 时 Nginx 回退到 index.html | 确保 `try_files $uri =404;` 在静态资源 location 中 |
| JS/CSS 404 | 部署不完整或 chunk hash 不匹配 | 验证 `index.html` 引用的 hash 与磁盘文件一致 |
| 子页面 403 | 目录存在但 `index.html` 缺失 | 重新完整部署（本地构建的 `out/`） |
| 刷新后仍报错 | 浏览器缓存了旧 HTML | 硬刷新 `Ctrl+Shift+R` 或无痕窗口访问 |
| GitHub Actions 子页面丢失 | Ubuntu runner OOM | 改用本地 Windows 手动部署 |

---

## 注意事项

- 图片优化由 `scripts/optimize-images.mjs` 自动处理
- 新增域名到 SSL 证书：`certbot certonly --webroot -w /var/www/certbot -d mnb-lab.cn -d www.mnb-lab.cn --expand`
- 云服务器资源有限，构建、压缩等重操作全部在本地完成
- 每次部署后**必须验证子页面**
- 不要在 PR/本地触碰 `next-env.d.ts` / `public/sitemap.xml` / `tsconfig.tsbuildinfo`（构建产物）

---

## 相关文档

- [ROADMAP.md](./ROADMAP.md) — 项目演进路线图与已完成事项
- [DEPLOY_ALIYUN.md](./DEPLOY_ALIYUN.md) — 阿里云服务器初始化与 SSL 配置
- [docs/](./docs/) — 升级方案、信息更新报告（Word）等详细资料
- [CLAUDE.md](./CLAUDE.md) — 给 Claude/AI 助手的项目上下文（部署命令、架构、约束）
