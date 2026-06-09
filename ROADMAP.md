# Roadmap — Micro-Nano-Bubble Technology Lab

## Done
- [x] 官网基础架构 (Next.js 16 静态导出 + Nginx 部署)
- [x] 首页轮播 + 研究方向/产业化/团队成员/荣誉/新闻各页面
- [x] 响应式适配 (桌面 + 移动端)
- [x] 图片优化管线 (WebP 多尺寸 + 懒加载)
- [x] SSL/HTTPS (Let's Encrypt + Nginx 443)
- [x] sitemap.xml 自动生成
- [x] B站乡村振兴视频报道
- [x] Nginx 部署路径统一为 /var/www/mnb-lab，清理历史残留目录
- [x] 轮播图模糊修复：main(1400px) → full(2200px)
- [x] GitHub Actions 自动部署到阿里云 (deploy.yml)
- [x] 移除 GitHub Pages 部署，仅保留阿里云
- [x] webhint 修复：Content-Type charset、woff2 MIME 类型、表单 id/name
- [x] webhint 修复：HTML no-cache、字体 Cache-Control、X-Content-Type-Options
- [x] webhint 修复：RSC 文件 204 响应、select 无障碍 aria-label
- [x] React #418 水合错误修复 (ClientOnly 包装 framer-motion)
- [x] Nginx 静态资源 block 添加 try_files $uri =404; (防 404 回退到 index.html)
- [x] 修复服务器 Nginx Cache-Control (public,max-age=180 → no-cache)
- [x] 确认 GitHub Actions 构建不完整 (Ubuntu OOM 丢子页面)，改手动部署

## In Progress

## Planned
- [ ] 图片进一步压缩 (>201MB 资源优化)
- [ ] 剩余 webhint 警告处理（框架生成的前缀/fetchpriority，无法修复）
- [ ] 在本地 CI 环境构建 + 自动 rsync（替代 GitHub Actions）
