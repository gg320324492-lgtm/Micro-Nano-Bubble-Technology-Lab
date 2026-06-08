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
- Build on local Windows only — cloud server (2C2G Aliyun) OOMs on `npm run build`
- Server shares resources with `agent.mnb-lab.cn`, never break its Nginx config
- Nginx config lives at `/etc/nginx/conf.d/default.conf` on server
- SSL via Let's Encrypt certbot, auto-renews via systemd timer
- Only deploy to Alibaba Cloud (mnb-lab.cn), no GitHub Pages

## Deployment flow (GitHub Actions auto-deploy)
1. `git push origin main` → GitHub Actions triggers
2. Actions: `npm ci && npm run build`
3. Actions: SCP upload to server `/tmp/mnb-lab-deploy/`
4. Actions: SSH → `sudo rsync --delete` to `/var/www/mnb-lab/`
5. Actions: `sudo nginx -t && sudo systemctl reload nginx`

### Manual deploy
```bash
npm run build
tar -czf deploy.tar.gz -C out .
scp deploy.tar.gz mnb-aliyun:/tmp/
ssh mnb-aliyun "mkdir -p /tmp/mnb-lab-out && tar -xzf /tmp/deploy.tar.gz -C /tmp/mnb-lab-out && sudo rsync -a --delete /tmp/mnb-lab-out/ /var/www/mnb-lab/ && sudo nginx -t && sudo systemctl reload nginx"
```

## SSH access
- Alias: `ssh mnb-aliyun`
- User: deploy
- Key: `~/.ssh/github_actions_deploy`
- Server: 60.205.93.8

## Nginx config (mnb-lab.cn)
- HTML: `Cache-Control: no-cache` (防止旧资源引用 404)
- Static assets: `Cache-Control: public, max-age=31536000, immutable`
- Fonts (.woff2): explicit `font/woff2` MIME type + `X-Content-Type-Options: nosniff`
- RSC .txt files: exist → 200, missing → 204 (避免 Next.js 静态导出的 404 噪音)
- charset: `utf-8` for HTML/text/plain

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
