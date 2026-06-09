# CLAUDE.md — Micro-Nano-Bubble Technology Lab

## Project
微纳米气泡课题组实验室官网 (mnb-lab.cn), Next.js 16 + React 19 + TypeScript, static export.

## Commands
```bash
npm run dev       # http://localhost:3000
npm run build     # outputs to out/ (必须用 --webpack，Turbopack 国内无法访问 Google Fonts)
npm run lint      # ESLint
npm run test      # node --test src/lib/__tests__/*.test.mjs
```

## Architecture
- `src/app/` — Next.js App Router pages
- `src/components/` — shared React components (含 ClientOnly 水合包装器)
- `src/content/` — content-driven page data
- `src/data/` — structured data (industrialization, people, publications)
- `src/lib/` — utilities (assetPath, image optimization helpers)
- `src/types/` — TypeScript type definitions
- `deploy/nginx/` — Nginx config for mnb-lab.cn
- `scripts/` — build-time scripts (image optimization)

## Key constraints
- **⚠️ 必须本地 Windows 构建** — 云服务器 (2C2G) 和 GitHub Actions Ubuntu runner 均会 OOM，Next.js 静默跳过子页面，只产首页和 404
- Server shares resources with `agent.mnb-lab.cn`, never break its Nginx config
- Nginx config lives at `/etc/nginx/conf.d/default.conf` on server（两个站点共用一个文件）
- SSL via Let's Encrypt certbot, auto-renews via systemd timer
- Only deploy to Alibaba Cloud (mnb-lab.cn), no GitHub Pages

## Deployment flow（手动部署 —— GitHub Actions 构建不完整，已停用）
1. 本地 `npm run build` → `out/`
2. `tar -czf deploy.tar.gz -C out .`
3. `scp deploy.tar.gz mnb-aliyun:/tmp/`
4. SSH: `tar -xzf /tmp/mnb-deploy.tar.gz -C /tmp/mnb-deploy-out/`
5. SSH: `rsync -a --delete /tmp/mnb-deploy-out/ /var/www/mnb-lab/`（deploy 用户拥有该目录，无需 sudo）
6. SSH: `sudo nginx -t && sudo systemctl reload nginx`
7. 验证: `curl -sI https://mnb-lab.cn/contact/` 等页面均返回 200

### 一键部署命令
```bash
npm run build && tar -czf deploy.tar.gz -C out . && scp deploy.tar.gz mnb-aliyun:/tmp/ && ssh mnb-aliyun "rm -rf /tmp/mnb-deploy-out && mkdir -p /tmp/mnb-deploy-out && tar -xzf /tmp/mnb-deploy.tar.gz -C /tmp/mnb-deploy-out && rsync -a --delete /tmp/mnb-deploy-out/ /var/www/mnb-lab/ && sudo nginx -t && sudo systemctl reload nginx && echo 'DEPLOY OK'"
```

## SSH access
- Alias: `ssh mnb-aliyun`
- User: deploy
- Key: `~/.ssh/github_actions_deploy`
- Server: 60.205.93.8

## Nginx config (mnb-lab.cn)
- HTML: `Cache-Control: no-cache` (防止旧资源引用 404)
- Static assets: `Cache-Control: public, max-age=31536000, immutable` + `try_files $uri =404;` (缺失文件返回 404 而非回退到 index.html)
- Fonts (.woff2): explicit `font/woff2` MIME type + `try_files $uri =404;`
- RSC .txt files: exist → 200, missing → 204 (避免 Next.js 静态导出的 404 噪音)
- charset: `utf-8` for HTML/text/plain
- **注意**: 仓库 `deploy/nginx/mnb-lab.cn.conf` 只是参考，实际服务器配置包含 agent.mnb-lab.cn 和 mnb-lab.cn 两个 server 块

## Deploy user sudo permissions
- ✅ NOPASSWD: `/usr/bin/rsync`, `/usr/sbin/nginx`, `/bin/systemctl`
- ❌ NO sudo: `tar`, `sed`, `tee`, 其他命令需要密码
- **`/var/www/mnb-lab/` 属主是 deploy 用户，rsync 不需要 sudo**
- `sudo nginx -t` 和 `sudo systemctl reload nginx` 需要 sudo

## Image variants (critical)
- `thumb` (max 640px) — list cards / thumbnails
- `main` (max 1400px) — in-page content images
- `full` (max 2200px) — **hero/carousel/full-screen images ONLY**
- Using `main` on full-screen images causes blurriness at high resolutions

## Known issues (cannot fix)
- webhint: `-webkit-backdrop-filter` / `-webkit-text-size-adjust` — PostCSS auto-generated prefixes
- webhint: `fetchpriority` — Next.js Image component auto-generated
- webhint: CSS inline styles — framer-motion animation library
- React #418 hydration — mitigated with `suppressHydrationWarning` + `ClientOnly` wrapper
