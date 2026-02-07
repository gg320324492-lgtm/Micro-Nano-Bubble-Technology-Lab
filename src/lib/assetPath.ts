// src/lib/assetPath.ts
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * 给 public 下的静态资源路径自动补 basePath
 * - 支持 "/images/a.jpg" 或 "images/a.jpg"
 * - 外链 / data / blob 不处理
 */
export function assetPath(src: string) {
  if (!src) return src;

  // 外链 / data / blob 不处理
  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:") ||
    src.startsWith("blob:")
  ) {
    return src;
  }

  const normalized = src.startsWith("/") ? src : `/${src}`;
  return `${BASE_PATH}${normalized}`;
}

export default assetPath;
