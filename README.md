# Micro-Nano-Bubble-Technology-Lab

微纳米气泡课题组实验室官网 - 静态网站

技术栈：Next.js 16 + React 19 + TypeScript，静态导出模式。

## 本地开发

```bash
npm install
npm run dev    # http://localhost:3000
```

## 部署

### ⚠️ 重要：必须在本地 Windows 构建

**GitHub Actions 和云服务器均无法完整构建此项目。** Next.js 16 静态导出在资源受限环境下会 OOM，静默跳过除首页外的所有子页面（只产 `index.html` 和 `404.html`）。2026-06-09 实测 GitHub Actions ubuntu-latest runner 构建结果：首页和 404 存在，`/contact/`、`/news/`、`/people/` 等所有子页面缺失。

### 构建

```bash
npm run build   # 产物输出到 out/ 目录
```

### 手动部署（唯一可靠方式）

```bash
npm run build
tar -czf deploy.tar.gz -C out .
scp deploy.tar.gz mnb-aliyun:/tmp/
ssh mnb-aliyun "rm -rf /tmp/mnb-deploy-out && mkdir -p /tmp/mnb-deploy-out && tar -xzf /tmp/mnb-deploy.tar.gz -C /tmp/mnb-deploy-out && rsync -a --delete /tmp/mnb-deploy-out/ /var/www/mnb-lab/ && sudo nginx -t && sudo systemctl reload nginx"
```

### 部署验证

```bash
# 验证首页
curl -sI https://mnb-lab.cn/ | grep HTTP

# 验证所有子页面（必须！GitHub Actions 构建会静默丢页面）
for path in /contact/ /people/ /news/ /research/ /publications/ /showcase/ /industrialization/; do
  code=$(curl -sI "https://mnb-lab.cn$path" 2>/dev/null | grep "HTTP/1.1" | tail -1 | awk '{print $2}')
  echo "$path → $code"
done
```

### GitHub Actions（已停用）

`.github/workflows/deploy-aliyun.yml` 保留在仓库但**不可靠**——Ubuntu runner 构建不完整，已确认会丢失子页面。仅用于触发通知，实际部署必须手动执行。

## 服务器架构

- `mnb-lab.cn` 和 `agent.mnb-lab.cn` 共享同一台阿里云 2核2G 云服务器
- Nginx 通过 `server_name` 区分两个站点，配置在 `/etc/nginx/conf.d/default.conf`
- SSL 证书：Let's Encrypt，`certbot certonly --webroot` 管理
- SSH 别名：`mnb-aliyun`（deploy 用户，密钥 `~/.ssh/github_actions_deploy`）
- `/var/www/mnb-lab/` 属主为 deploy 用户，rsync 部署无需 sudo

## Nginx 配置要点

- HTML：`Cache-Control: no-cache`（防止旧 CSS/JS 引用 404）
- 静态资源（JS/CSS/图片/字体）：`Cache-Control: public, max-age=31536000, immutable` + `try_files $uri =404;`
- RSC `.txt` 文件：存在返回 200，不存在返回 204（避免 404 噪音）
- 字体 `.woff2`：`Content-Type: font/woff2`（显式声明 MIME 类型）

## 故障排查

| 症状 | 原因 | 解决 |
|---|---|---|
| CSS MIME type 'text/html' | 静态资源 404 时 Nginx 回退到 index.html | 确保 `try_files $uri =404;` 在静态资源 location 中 |
| JS/CSS 404 | 部署不完整或 chunk hash 不匹配 | 验证 `index.html` 引用的 hash 与磁盘文件一致 |
| 子页面 403 | 目录存在但 `index.html` 缺失 | 重新完整部署（本地构建的 `out/`） |
| 刷新后仍报错 | 浏览器缓存了旧 HTML | 硬刷新 `Ctrl+Shift+R` 或无痕窗口访问 |

## 注意事项

- 图片优化由 `scripts/optimize-images.mjs` 自动处理
- 新增域名到 SSL 证书：`certbot certonly --webroot -w /var/www/certbot -d mnb-lab.cn -d www.mnb-lab.cn --expand`
- 云服务器资源有限，构建、压缩等重操作全部在本地完成
- 每次部署后**必须验证子页面**，不能只看首页
