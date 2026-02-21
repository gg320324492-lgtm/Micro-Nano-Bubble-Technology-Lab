import type { NextConfig } from "next";

const repoName = "Micro-Nano-Bubble-Technology-Lab";
const isGh = process.env.GITHUB_ACTIONS === "true" || process.env.GITHUB_ACTIONS === "1";
const base = isGh ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // 指定项目根目录，避免上层目录存在 lockfile 时 Next 误判导致 dev 异常
  outputFileTracingRoot: process.cwd(),

  basePath: base,
  assetPrefix: isGh ? `${base}/` : "",

  env: {
    NEXT_PUBLIC_BASE_PATH: base,
  },
};

export default nextConfig;
