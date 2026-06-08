# Micro-Nano-Bubble-Technology-Lab

微纳米气泡课题组实验室官网 - 静态网站

技术栈：Next.js 16 + React 19 + TypeScript，静态导出模式。

## 本地开发

```bash
npm install
npm run dev    # http://localhost:3000
```

## 部署

### 构建

**必须在本地 Windows 构建，严禁在云服务器（2核2G）上运行 `npm run build`**——Next.js 构建耗内存，2026-05-26 实测云服务器 OOM 卡死。

```bash
npm run build   # 产物输出到 out/ 目录
```

### 自动部署（推荐）

push 到 `main` 分支后，GitHub Actions 自动构建并部署到阿里云：

```bash
git push origin main
```

工作流：`.github/workflows/deploy.yml`（构建 → SCP 上传 → rsync 同步 → nginx reload）

需要配置 GitHub Secret：`DEPLOY_SSH_KEY`（部署私钥）

### 手动部署

```bash
npm run build
tar -czf deploy.tar.gz -C out .
scp deploy.tar.gz mnb-aliyun:/tmp/
ssh mnb-aliyun "mkdir -p /tmp/mnb-lab-out && tar -xzf /tmp/deploy.tar.gz -C /tmp/mnb-lab-out && sudo rsync -a --delete /tmp/mnb-lab-out/ /var/www/mnb-lab/ && sudo nginx -t && sudo systemctl reload nginx"
```

### 部署验证

```bash
curl -s -o /dev/null -w "HTTP %{http_code}" https://mnb-lab.cn/
# 应返回 200
```

## 服务器架构

- `mnb-lab.cn` 和 `agent.mnb-lab.cn` 共享同一台阿里云 2核2G 云服务器
- Nginx 通过 `server_name` 区分两个站点，配置在 `/etc/nginx/conf.d/default.conf`
- SSL 证书：Let's Encrypt，`certbot certonly --webroot` 管理
- SSH 别名：`mnb-aliyun`（deploy 用户，密钥 `~/.ssh/github_actions_deploy`）

## Nginx 配置要点

- HTML：`Cache-Control: no-cache`（防止旧 CSS/JS 引用 404）
- 静态资源（JS/CSS/图片/字体）：`Cache-Control: public, max-age=31536000, immutable`
- RSC `.txt` 文件：存在返回 200，不存在返回 204（避免 404 噪音）
- 字体 `.woff2`：`Content-Type: font/woff2`（显式声明 MIME 类型）

## 注意事项

- 图片优化由 `scripts/optimize-images.mjs` 自动处理
- 新增域名到 SSL 证书：`certbot certonly --webroot -w /var/www/certbot -d mnb-lab.cn -d www.mnb-lab.cn --expand`
- 云服务器资源有限，构建、压缩等重操作全部在本地完成
