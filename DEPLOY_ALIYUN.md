# Deploy to Aliyun (Static Export + Nginx + HTTPS)

## Server prerequisites
- Ubuntu
- Node.js 20+ + npm
- nginx + rsync + git
- certbot (for SSL)

## SSL certificate (one-time)

```bash
# Install certbot
apt install -y certbot python3-certbot-nginx

# Obtain certificate (nginx must be running with port 80 accessible)
certbot --nginx -d mnb-lab.cn -d www.mnb-lab.cn

# Certificate auto-renews via systemd timer (installed by default)
systemctl status certbot.timer
```

## One-time nginx config
Copy `deploy/nginx/mnb-lab.cn.conf` to either:
- `/etc/nginx/sites-available/mnb-lab.cn.conf` (Ubuntu/Debian)
- `/etc/nginx/conf.d/mnb-lab.cn.conf` (generic)

Enable and reload:
```bash
ln -sf /etc/nginx/sites-available/mnb-lab.cn.conf /etc/nginx/sites-enabled/mnb-lab.cn.conf
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

> **Warning**: `agent.mnb-lab.cn` runs on the same server. Do NOT remove or overwrite its config in `/etc/nginx/conf.d/`. Always run `nginx -t` before reloading.

## Deploy / Update
Run on server:
```bash
bash deploy/scripts/server_deploy.sh
```

## Verify

```bash
curl -s -o /dev/null -w "HTTP %{http_code} -> %{redirect_url}\n" http://mnb-lab.cn/
# Expected: HTTP 301 -> https://mnb-lab.cn/

curl -s -o /dev/null -w "HTTP %{http_code}\n" https://mnb-lab.cn/
# Expected: HTTP 200
```

## Certificate renewal sanity check

`mnb-lab.cn` 证书用 webroot 方式续期，要求 80 端口 server 块里有
`location /.well-known/acme-challenge/ { root /var/www/certbot; }`，
且该 location 必须先于 301 跳转命中。若配置被改动过，用 dry-run 验证：

```bash
certbot renew --dry-run --cert-name mnb-lab.cn
# Expected: "all simulated renewals succeeded"

# 2026-08 事故复盘：该 location 在多次 nginx 配置改动中丢失，
# 80 端口全部 301 到 HTTPS → 验证返回 index.html → 续期静默失败 → 证书过期 10 天。
# certbot.timer 只会每天重试并写日志，不会报警，续期改动后务必 dry-run。
```
