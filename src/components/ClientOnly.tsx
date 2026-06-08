"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * 仅在客户端渲染子元素，避免 framer-motion 动画导致的水合不匹配。
 * 服务端渲染时返回 fallback（默认 null），客户端挂载后渲染子元素。
 */
export default function ClientOnly({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{fallback}</>;
  return <>{children}</>;
}
