"use client";

import { useEffect, useRef, useState } from "react";

type LazyMountProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
};

export default function LazyMount({
  children,
  fallback = null,
  rootMargin = "200px 0px",
}: LazyMountProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || mounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setMounted(true);
        observer.disconnect();
      },
      { root: null, rootMargin, threshold: 0.01 }
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, [mounted, rootMargin]);

  return <div ref={hostRef}>{mounted ? children : fallback}</div>;
}
