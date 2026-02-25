import type { NextConfig } from "next";

const isPages = process.env.DEPLOY_TARGET === "pages";

const basePath = isPages ? "/Micro-Nano-Bubble-Technology-Lab" : "";
const assetPrefix = isPages ? "/Micro-Nano-Bubble-Technology-Lab/" : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // 指定项目根目录，避免上层目录存在 lockfile 时 Next 误判导致 dev 异常
  outputFileTracingRoot: process.cwd(),

  basePath,
  assetPrefix,

  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
