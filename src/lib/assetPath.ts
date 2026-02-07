// src/lib/assetPath.ts
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * 把 public 资源路径自动加上 basePath
 * 例：/logos/a.png  -> /Micro-Nano-Bubble-Technology-Lab/logos/a.png
 */
export function assetPath(p: string): string {
  if (!p) return p;

  // 外链不动
  if (/^(https?:)?\/\//.test(p) || p.startsWith("data:") || p.startsWith("blob:"))
    return p;

  // 已经带 base 的不重复加
  if (base && (p === base || p.startsWith(`${base}/`))) return p;

  const normalized = p.startsWith("/") ? p : `/${p}`;
  return `${base}${normalized}`;
}
