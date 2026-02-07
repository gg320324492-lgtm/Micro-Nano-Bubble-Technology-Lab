// src/lib/assetPath.ts
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function assetPath(src?: string) {
  if (!src) return "";
  if (/^https?:\/\//i.test(src)) return src;

  const s = src.startsWith("/") ? src : `/${src}`;

  // 防止重复加前缀
  if (BASE_PATH && s.startsWith(`${BASE_PATH}/`)) return s;

  return `${BASE_PATH}${s}`;
}
