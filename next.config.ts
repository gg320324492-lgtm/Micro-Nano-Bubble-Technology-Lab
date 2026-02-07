// next.config.ts
import type { NextConfig } from "next";

const repoName = "Micro-Nano-Bubble-Technology-Lab"; // ← 改成你的仓库名（大小写要一致）

const nextConfig: NextConfig = {
  // 关键：生成 out/，供 GitHub Pages 部署
  output: "export",

  // 建议：让路径更稳定（GitHub Pages 常用）
  trailingSlash: true,

  // GitHub Pages 不支持 Next Image 服务端优化，必须关掉
  images: {
    unoptimized: true,
  },

  // 关键：让资源在 /仓库名/ 下正常工作
  // 本地开发仍然是根路径，不受影响
  basePath: process.env.GITHUB_ACTIONS ? `/${repoName}` : "",
  assetPrefix: process.env.GITHUB_ACTIONS ? `/${repoName}/` : "",
};

export default nextConfig;
