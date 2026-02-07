// next.config.ts
import type { NextConfig } from "next";

const repoName = "Micro-Nano-Bubble-Technology-Lab";
const isGh = process.env.GITHUB_ACTIONS === "true" || process.env.GITHUB_ACTIONS === "1";
const base = isGh ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  // GitHub Pages 必开：静态导出不走图片优化服务
  images: { unoptimized: true },

  // 让路由在 /仓库名/ 下工作
  basePath: base,

  // 让 _next 静态资源也在 /仓库名/ 下工作
  assetPrefix: isGh ? `${base}/` : "",

  // 关键：把 basePath 同步到前端代码里，供 assetPath() 使用
  env: {
    NEXT_PUBLIC_BASE_PATH: base,
  },
};

export default nextConfig;
