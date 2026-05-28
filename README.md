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

### 上传到云服务器

**方式一：MinIO 中转（推荐，无需免密 SSH）**

```bash
# 本地打包
tar -czf mnb-lab-build.tar.gz -C out .

# 上传到 MinIO
docker compose exec app python -c "
from app.config import settings
from minio import Minio
Minio(...).put_object(settings.MINIO_BUCKET, 'deploy/mnb-lab-build.tar.gz', ...)
"

# 云服务器下载并部署
wget http://127.0.0.1:9000/microbubble/deploy/mnb-lab-build.tar.gz -O /tmp/build.tar.gz
rm -rf /opt/Micro-Nano-Bubble-Technology-Lab/out/*
tar -xzf /tmp/build.tar.gz -C /opt/Micro-Nano-Bubble-Technology-Lab/out/
chown -R www-data:www-data /opt/Micro-Nano-Bubble-Technology-Lab/out/
```

**方式二：SCP（需要配置免密 SSH）**

```bash
scp -r out/* root@60.205.93.8:/opt/Micro-Nano-Bubble-Technology-Lab/out/
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
- 修改 Nginx 配置时必须确保不影响另一个站点，修改后 `nginx -t && nginx -s reload`

## 注意事项

- 图片优化由 `scripts/optimize-images.mjs` 自动处理（201MB+ 图片资源）
- 新增域名到 SSL 证书：`certbot certonly --webroot -w /var/www/certbot -d mnb-lab.cn -d www.mnb-lab.cn --expand`
- 云服务器资源有限，构建、压缩等重操作全部在本地完成
