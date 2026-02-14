import type { NextConfig } from "next";

const repoName = "Micro-Nano-Bubble-Technology-Lab";
const isGh = process.env.GITHUB_ACTIONS === "true" || process.env.GITHUB_ACTIONS === "1";
const base = isGh ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  // output: "export", // Commented out to enable API routes
  trailingSlash: true,
  images: { unoptimized: true },

  basePath: base,
  assetPrefix: isGh ? `${base}/` : "",

  env: {
    NEXT_PUBLIC_BASE_PATH: base,
  },
};

export default nextConfig;
