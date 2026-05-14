"use client";

import { useEffect, useRef, useState } from "react";

type LazyMountProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
};

const DEFAULT_ROOT_MARGIN_DESKTOP = "200px 0px";
const DEFAULT_ROOT_MARGIN_MOBILE = "50px 0px";

function useRootMargin(propMargin?: string) {
  const [margin, setMargin] = useState(DEFAULT_ROOT_MARGIN_DESKTOP);

  useEffect(() => {
    if (propMargin !== undefined) {
      setMargin(propMargin);
      return;
    }
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setMargin(mq.matches ? DEFAULT_ROOT_MARGIN_MOBILE : DEFAULT_ROOT_MARGIN_DESKTOP);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [propMargin]);

  return margin;
}

export default function LazyMount({
  children,
  fallback = null,
  rootMargin: rootMarginProp,
}: LazyMountProps) {
  const rootMargin = useRootMargin(rootMarginProp);
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
