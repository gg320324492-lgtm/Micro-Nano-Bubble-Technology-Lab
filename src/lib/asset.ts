// src/lib/asset.ts
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** 给 /xxx 这种路径自动加上 basePath（仅 GH Pages 部署时 BASE 才有值） */
export function assetPath(p?: string) {
  if (!p) return p;
  if (/^https?:\/\//.test(p)) return p; // 外链不动

  const path = p.startsWith("/") ? p : `/${p}`;

  // 避免重复拼接
  if (BASE && (path === BASE || path.startsWith(`${BASE}/`))) return path;

  return `${BASE}${path}`;
}
