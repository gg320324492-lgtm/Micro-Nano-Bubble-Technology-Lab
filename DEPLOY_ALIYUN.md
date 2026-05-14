# Deploy to Aliyun (Static Export + Nginx)

## Server prerequisites
- Ubuntu
- Node.js 20+ + npm
- nginx + rsync + git

## One-time nginx config
Copy `deploy/nginx/mnb-lab.cn.conf` to:
- /etc/nginx/sites-available/mnb-lab.cn.conf
Enable:
- ln -sf /etc/nginx/sites-available/mnb-lab.cn.conf /etc/nginx/sites-enabled/mnb-lab.cn.conf
Disable default:
- rm -f /etc/nginx/sites-enabled/default
Reload:
- nginx -t && systemctl reload nginx

## Deploy / Update
Run on server:
- bash deploy/scripts/server_deploy.sh
