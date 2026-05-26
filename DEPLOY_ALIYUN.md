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
