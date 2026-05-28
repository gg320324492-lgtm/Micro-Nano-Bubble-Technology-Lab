# CLAUDE.md — Micro-Nano-Bubble Technology Lab

## Project
微纳米气泡课题组实验室官网 (mnb-lab.cn), Next.js 16 + React 19 + TypeScript, static export.

## Commands
```bash
npm run dev       # http://localhost:3000
npm run build     # outputs to out/
npm run lint      # ESLint
npm run test      # node --test src/lib/__tests__/*.test.mjs
```

## Architecture
- `src/app/` — Next.js App Router pages
- `src/components/` — shared React components
- `src/content/` — content-driven page data
- `src/data/` — structured data (industrialization, people, publications)
- `src/lib/` — utilities (assetPath, image optimization helpers)
- `src/types/` — TypeScript type definitions
- `deploy/nginx/` — Nginx config (HTTPS + HTTP/2, Let's Encrypt)
- `deploy/scripts/` — server deploy scripts
- `scripts/` — build-time scripts (image optimization)

## Key constraints
- Build on local Windows only — cloud server (2C2G Aliyun) OOMs on `npm run build`
- Server shares resources with `agent.mnb-lab.cn`, never break its Nginx config
- Nginx config lives at `/etc/nginx/conf.d/` on server, uses `server_name` to split sites
- SSL via Let's Encrypt certbot, auto-renews via systemd timer

## Deployment flow
1. `npm run build` locally → `out/` directory
2. Package: `tar -czf deploy.tar.gz -C out .`
3. Upload: `scp deploy.tar.gz deploy@60.205.93.8:/tmp/`
4. Extract: `rm -rf /var/www/mnb-lab/* && tar -xzf /tmp/deploy.tar.gz -C /var/www/mnb-lab/`
5. Reload: `sudo nginx -t && sudo systemctl reload nginx`
6. Nginx serves from `/var/www/mnb-lab/` (single canonical path, no duplicates)

## Image variants (critical)
- `thumb` (max 640px) — list cards / thumbnails
- `main` (max 1400px) — in-page content images
- `full` (max 2200px) — **hero/carousel/full-screen images ONLY**
- Using `main` on full-screen images causes blurriness at high resolutions
