# CLAUDE.md — Micro-Nano-Bubble Technology Lab

> 给 Claude / AI 助手的项目上下文。所有命令、约定、约束以本文档为准。

## Project

微纳米气泡课题组实验室官网 ([mnb-lab.cn](https://mnb-lab.cn))。

- **PI**：王天志（天津大学环境学院副教授 / 博导，瑞德智创新技术（天津）有限公司董事长）
- **栈**：Next.js 16 + React 19 + TypeScript + Tailwind CSS v4，static export
- **部署**：阿里云 2C2G 云服务器（60.205.93.8）+ Nginx + Let's Encrypt SSL

## Commands

```bash
npm install              # 首次或依赖更新
npm run dev              # http://localhost:3000（--webpack，国内可访问 Google Fonts）
npm run build            # 输出到 out/（含图片优化）
npm run images:optimize  # 仅跑图片优化
npm run lint             # ESLint
npm run test             # node --test src/lib/__tests__/*.test.mjs
```

环境要求：**Node.js 20+**。

> ⚠️ 必须使用 `--webpack`：Turbopack 国内无法访问 Google Fonts。

## Architecture

```
src/
├── app/                 # Next.js App Router
│   ├── page.tsx        # 首页
│   ├── research/       # 研究方向
│   ├── industrialization/[slug]/  # 产业基地详情
│   ├── people/         # 团队成员
│   ├── publications/   # 论文/专利
│   ├── news/           # 新闻
│   ├── honors/         # 荣誉墙
│   ├── showcase/       # 瑞德智设备展示
│   └── contact/        # 联系
├── components/          # 共享组件
│   ├── ClientOnly.tsx  # 水合保护包装（framer-motion 必须）
│   ├── HomeHeroCarousel.tsx
│   ├── PiCard.tsx
│   └── home/, ui/, motion/, contact/, research/, industrialization/
├── content/             # 内容数据
│   ├── reidDeviceShowcaseContent.ts  # 瑞德智设备文案（KPI / 产品 / 优势 / 客户）
│   └── aquaculturePdfFullData.ts
├── data/                # 结构化数据
│   ├── pi.ts            # PI 个人主页（bio / tags / 教育 / 工作 / 兼职 / 招生）
│   ├── people.ts        # 团队成员（mk() 工厂，含 PI/PhD/Master/Undergrad/Alumni）
│   ├── projects.ts      # 自主基金 + 项目列表
│   ├── publications.ts  # 论文
│   ├── patents.ts       # 专利
│   ├── honors.ts        # 荣誉墙
│   ├── externalLinks.ts # 媒体报道（按日期倒序自动排序）
│   ├── industrialization.ts  # 产业基地（aquaculture / reid-device-tianjin / black-odorous-water）
│   ├── contact.ts
│   └── site.ts
├── lib/                 # 工具函数（assetPath 等）
└── types/               # TypeScript 类型
deploy/
├── nginx/               # Nginx 配置参考（仅参考，服务器实际是两站点合一）
└── scripts/             # 服务端部署脚本
scripts/
├── optimize-images.mjs  # 图片三档（thumb 640 / main 1400 / full 2200）
├── gen-report.mjs       # Word 信息更新报告生成
├── gen-report-short.mjs # 简版报告生成
└── verify-showcase.mjs  # showcase 页面截图验证（输出到 verify-output/）
docs/                    # UPGRADE_PLAN.md / DEVELOPMENT.md / 信息更新报告.docx
public/
├── home/, people/, industrialization/, images/  # 静态资源
└── sitemap.xml          # 由 next-sitemap 生成（构建产物，不要手改）
```

## Key constraints

### 构建 & 部署
- **⚠️ 必须本地 Windows 构建** — 云服务器 (2C2G) 和 GitHub Actions Ubuntu runner 均会 OOM，Next.js 静默跳过子页面，只产首页和 404
- 服务器资源与 `agent.mnb-lab.cn` 共享，绝不能破坏它的 Nginx 配置
- Nginx 配置位于 `/etc/nginx/conf.d/default.conf`（两个站点共用一个文件）
- SSL 通过 Let's Encrypt certbot，自动续期（systemd timer）
- **只部署到阿里云（mnb-lab.cn），不再部署到 GitHub Pages**
- 构建产物（`out/`、`next-env.d.ts`、`public/sitemap.xml`、`tsconfig.tsbuildinfo`）会随 build 重新生成

### Deploy user sudo 权限
- ✅ NOPASSWD：`/usr/bin/rsync`, `/usr/sbin/nginx`, `/bin/systemctl`
- ❌ NO sudo：`tar`, `sed`, `tee` 等其他命令
- **`/var/www/mnb-lab/` 属主是 deploy 用户，rsync 不需要 sudo**
- `sudo nginx -t` 和 `sudo systemctl reload nginx` 需要 sudo

### 图片规格（关键）
| 规格 | 最大宽度 | 用途 |
|---|---|---|
| `thumb` | 640px | 列表卡片 / 缩略图 |
| `main` | 1400px | 页内正文插图 |
| `full` | 2200px | **首页轮播 / Hero / 全屏图**（**用 main 会模糊**） |

源图放 `.jpg`，同名 `.webp` 三档由 `npm run images:optimize` 生成。

## Deployment flow（手动部署 — GitHub Actions 构建不完整，已停用）

1. 本地 `npm run build` → `out/`
2. `tar -czf deploy.tar.gz -C out .`
3. `scp deploy.tar.gz mnb-aliyun:/tmp/`
4. SSH: `rm -rf /tmp/mnb-deploy-out && mkdir -p /tmp/mnb-deploy-out`
5. SSH: `tar -xzf /tmp/deploy.tar.gz -C /tmp/mnb-deploy-out/`
6. SSH: `rsync -a --delete /tmp/mnb-deploy-out/ /var/www/mnb-lab/`（deploy 用户拥有该目录，无需 sudo）
7. SSH: `sudo nginx -t && sudo systemctl reload nginx`
8. 验证：`curl -sI https://mnb-lab.cn/contact/` 等所有子页面均返回 200

### 一键部署命令
```bash
npm run build && tar -czf deploy.tar.gz -C out . && scp deploy.tar.gz mnb-aliyun:/tmp/ && ssh mnb-aliyun "rm -rf /tmp/mnb-deploy-out && mkdir -p /tmp/mnb-deploy-out && tar -xzf /tmp/deploy.tar.gz -C /tmp/mnb-deploy-out && rsync -a --delete /tmp/mnb-deploy-out/ /var/www/mnb-lab/ && sudo nginx -t && sudo systemctl reload nginx && echo 'DEPLOY OK'"
```

### 部署后必检
```bash
for path in /contact/ /people/ /news/ /research/ /publications/ /showcase/ /industrialization/ /honors/; do
  code=$(curl -sI "https://mnb-lab.cn$path" 2>/dev/null | grep "HTTP/1.1" | tail -1 | awk '{print $2}')
  echo "$path → $code"
done
# 所有 path 必须是 200
```

## SSH access
- Alias: `ssh mnb-aliyun`
- User: deploy
- Key: `~/.ssh/github_actions_deploy`
- Server: 60.205.93.8

## Nginx config (mnb-lab.cn)
- HTML: `Cache-Control: no-cache`（防止旧 CSS/JS preload 404）
- 静态资源: `Cache-Control: public, max-age=31536000, immutable` + `try_files $uri =404;`（缺失文件返回 404 而非回退到 index.html）
- 字体 (.woff2): 显式 `font/woff2` MIME type + `try_files $uri =404;`
- RSC `.txt` 文件: 存在 → 200，缺失 → 204（避免 Next.js 静态导出的 404 噪音）
- charset: `utf-8` for HTML/text/plain
- **注意**：仓库 `deploy/nginx/mnb-lab.cn.conf` 只是参考，**实际服务器配置包含 agent.mnb-lab.cn 和 mnb-lab.cn 两个 server 块**

## Content update patterns

### 团队成员
- 改 `src/data/people.ts`，用 `mk()` 工厂
- 新成员必须在 `public/people/` 下放头像（任意文件名一致即可，脚本会自动生成 thumb.webp）
- **新成员目前状态**：蒋芦笛 / 刘子煜（2025 级研二）+ 刘莫菲 / 吴怡霏（2026 级研一）使用紫色渐变占位头像

### PI 简介
- 改 `src/data/pi.ts`：bio / tags / education / work / service / recruit
- 教育经历 4 条（已移除哥伦比亚大学交流生条目，2026-07）

### 媒体报道
- 改 `src/data/externalLinks.ts`，**按 date 倒序自动排序**，无需手动排

### 产业基地
- 改 `src/data/industrialization.ts`：3 个 base（aquaculture / reid-device-tianjin / black-odorous-water）
- 瑞德智天津文案在 `src/content/reidDeviceShowcaseContent.ts`：KPI、信任背书、产品组（RD-NM / RD-O3N / RD-BQ）、优势卡、场景、客户类型

## Known issues (cannot fix)
- webhint: `-webkit-backdrop-filter` / `-webkit-text-size-adjust` — PostCSS 自动前缀
- webhint: `fetchpriority` — Next.js Image 组件自动生成
- webhint: CSS inline styles — framer-motion 动画库
- React #418 hydration — 已用 `suppressHydrationWarning` + `ClientOnly` 缓解
- GitHub Actions Ubuntu runner 构建会丢子页面（OOM） — 已改本地手动部署
