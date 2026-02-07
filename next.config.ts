import type { NextConfig } from "next";

const repoName = "Micro-Nano-Bubble-Technology-Lab"; // 仓库名必须完全一致（大小写也一致）

const nextConfig: NextConfig = {
  // 关键：静态导出，GitHub Pages 需要
  output: "export",
  trailingSlash: true,

  // GitHub Pages 必开（不然 next/image 会出问题）
  images: { unoptimized: true },

  // 让资源路径在 /仓库名/ 下正确工作（仅部署到 Pages 时启用）
  basePath: process.env.GITHUB_ACTIONS ? `/${repoName}` : "",
  assetPrefix: process.env.GITHUB_ACTIONS ? `/${repoName}/` : "",
};

export default nextConfig;
