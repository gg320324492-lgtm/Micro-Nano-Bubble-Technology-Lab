"use client";

import { useEffect, useState } from "react";

export type Theme = "dark" | "light";
export type ThemeTransition = "a" | "b" | "c" | "d";

const STORAGE_KEY = "mnb-theme";

/**
 * 主题状态 hook：从 localStorage 读、写 html[data-theme]。
 * 服务端渲染返回 "dark"（默认），客户端挂载后同步 localStorage/系统偏好。
 * 切换动效已固化为 C · 圆形展开（html[data-theme-transition="c"] 由 layout 防闪白脚本设定）。
 */
export function useTheme(): [Theme, (e?: React.MouseEvent) => void] {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial =
      saved ||
      (window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark");
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  const toggle = (e?: React.MouseEvent) => {
    const next = theme === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      setTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    };

    const style = (document.documentElement.dataset.themeTransition ??
      "c") as ThemeTransition;
    const supportsVT =
      typeof document !== "undefined" && "startViewTransition" in document;

    // B/C/D 优先用 View Transition API；不支持时降级为 A 渐变
    if (supportsVT && style !== "a") {
      // C · 圆形展开：把按钮点击位置写入 CSS 变量，clip-path 从那里扩散
      if (style === "c" && e?.clientX != null) {
        const root = document.documentElement;
        root.style.setProperty("--vt-x", `${e.clientX}px`);
        root.style.setProperty("--vt-y", `${e.clientY}px`);
        root.style.setProperty(
          "--vt-r",
          `${Math.hypot(window.innerWidth, window.innerHeight)}px`
        );
      }
      (document as Document & { startViewTransition: (cb: () => void) => void }).startViewTransition(apply);
    } else {
      // A · 渐变：标记 transitioning 让 CSS transition 生效，结束后移除（避免常驻拖慢交互）
      const root = document.documentElement;
      root.dataset.transitioning = "1";
      apply();
      window.setTimeout(() => {
        delete root.dataset.transitioning;
      }, 500);
    }
  };

  return [theme, toggle];
}
