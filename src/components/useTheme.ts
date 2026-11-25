"use client";

import { useEffect, useState } from "react";

export type Theme = "dark" | "light";

/**
 * 主题状态 hook：从 localStorage 读、写 html[data-theme]。
 * 服务端渲染返回 "dark"（默认），客户端挂载后同步 localStorage/系统偏好。
 */
export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("mnb-theme") as Theme | null;
    const initial =
      saved ||
      (window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark");
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("mnb-theme", next);
  };

  return [theme, toggle];
}
