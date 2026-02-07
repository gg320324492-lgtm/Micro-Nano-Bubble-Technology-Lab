// src/lib/assetPath.ts
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * 把 public 里的资源路径统一加上 basePath
 * - "/home/a.jpg" -> "/Micro-Nano-Bubble-Technology-Lab/home/a.jpg"
 * - "https://xxx" 直接原样返回
 */
export function assetPath(src?: string) {
  if (!src) return "";
  if (/^https?:\/\//i.test(src)) return src; // 外链不处理

  const s = src.startsWith("/") ? src : `/${src}`;
  return `${BASE_PATH}${s}`;
}
