import type { NextConfig } from "next";

const repo = "Micro-Nano-Bubble-Technology-Lab"; // 你的仓库名

const nextConfig: NextConfig = {
  output: "export",                 // 关键：生成 out/
  images: { unoptimized: true },    // 关键：GitHub Pages 不支持 next/image 优化服务

  // 关键：因为你是 project pages，网址会带 /仓库名/
  basePath: process.env.NODE_ENV === "production" ? `/${repo}` : "",
  assetPrefix: process.env.NODE_ENV === "production" ? `/${repo}/` : "",
};

export default nextConfig;
