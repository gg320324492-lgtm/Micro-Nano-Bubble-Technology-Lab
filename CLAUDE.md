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
2. Upload to server via MinIO transfer or SCP
3. Nginx serves static files from `/var/www/mnb-lab/`
