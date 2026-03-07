"use client";

import type React from "react";
import { useEffect, useState } from "react";

type NavItem = {
  id: string;
  label: string;
};

type Props = {
  items: readonly NavItem[];
};

export default function SectionScrollNav({ items }: Props) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!items.length) return;

    const handleClickHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setActiveId(hash);
      }
    };

    const hoverHandlers = new Map<string, (event: Event) => void>();

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => {
            const aTop = (a.target as HTMLElement).offsetTop;
            const bTop = (b.target as HTMLElement).offsetTop;
            return aTop - bTop;
          });

        if (visible[0]) {
          const id = (visible[0].target as HTMLElement).id;
          if (id) {
            setActiveId(id);
          }
        }
      },
      {
        root: null,
        threshold: 0.3,
        rootMargin: "-40% 0px -50% 0px",
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;

      observer.observe(el);

      // 鼠标移动到对应主题区域时，也同步高亮导航
      const handleEnter = () => {
        setActiveId(item.id);
      };
      hoverHandlers.set(item.id, handleEnter);
      el.addEventListener("pointerenter", handleEnter);
    });

    window.addEventListener("hashchange", handleClickHash);

    return () => {
      observer.disconnect();

       // 清理悬停监听
      items.forEach((item) => {
        const el = document.getElementById(item.id);
        const handler = hoverHandlers.get(item.id);
        if (el && handler) {
          el.removeEventListener("pointerenter", handler);
        }
      });

      window.removeEventListener("hashchange", handleClickHash);
    };
  }, [items]);

  const scrollToSection =
    (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (typeof window === "undefined") return;

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
      const url = new URL(window.location.href);
      url.hash = id;
      window.history.replaceState(null, "", url.toString());
    }
  };

  return (
    <nav className="relative mb-10 md:mb-12">
      {/* 移动端：顶部横向导航 */}
      <div className="mx-auto flex max-w-[720px] flex-wrap justify-center gap-2 rounded-full bg-white/60 px-2 py-1.5 text-[13px] shadow-sm backdrop-blur-md md:hidden">
        {items.map((navItem) => {
          const isActive =
            activeId === navItem.id || (!activeId && items[0]?.id === navItem.id);
          const baseCls =
            "group inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] transition-colors whitespace-nowrap";
          const inactiveCls =
            "text-[var(--text-secondary)] hover:bg-[var(--accent-soft)]/80 hover:text-[var(--accent)]";
          const activeCls =
            "bg-[var(--accent-soft)]/80 text-[var(--accent)]";

          return (
            <a
              key={navItem.id}
              href={`#${navItem.id}`}
              onClick={scrollToSection(navItem.id)}
              className={[baseCls, isActive ? activeCls : inactiveCls].join(" ")}
            >
              <span
                className={[
                  "h-1.5 w-1.5 rounded-full transition-colors",
                  isActive
                    ? "bg-[var(--accent)]"
                    : "bg-[var(--accent-soft)]/70 group-hover:bg-[var(--accent)]",
                ].join(" ")}
              />
              <span className="truncate">{navItem.label}</span>
            </a>
          );
        })}
      </div>

      {/* 桌面端：右侧垂直悬浮导航（跟随视口） */}
      <div className="pointer-events-none hidden md:block">
        <div className="fixed right-10 top-1/2 z-30 -translate-y-1/2 lg:right-12">
          <div className="pointer-events-auto flex w-[220px] flex-col gap-1.5 rounded-[24px] border border-violet-100/60 bg-white/75 px-4 py-4 shadow-[0_16px_40px_rgba(120,110,180,0.10)] backdrop-blur-md">
            <div className="px-0 pb-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.18em] text-violet-500/80">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span>章节导航</span>
              </div>
            </div>
            <div className="mt-1 flex flex-col gap-1.5">
              {items.map((navItem) => {
                const isActive =
                  activeId === navItem.id || (!activeId && items[0]?.id === navItem.id);
                const baseCls =
                  "group flex items-center gap-2 rounded-[10px] px-2.5 py-1.5 text-[13px] leading-snug text-left whitespace-nowrap transition-colors duration-200";
                const inactiveCls =
                  "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]/60 hover:text-[var(--accent)]";
                const activeCls =
                  "bg-[var(--accent-soft)]/40 text-[var(--accent)]";

                return (
                  <a
                    key={navItem.id}
                    href={`#${navItem.id}`}
                    onClick={scrollToSection(navItem.id)}
                    className={[baseCls, isActive ? activeCls : inactiveCls].join(" ")}
                  >
                    <span
                      className={[
                        "h-1 w-1.5 rounded-full transition-colors",
                        isActive
                          ? "bg-[var(--accent)]"
                          : "bg-[var(--border)] group-hover:bg-[var(--accent)]",
                      ].join(" ")}
                    />
                    <span className="truncate">{navItem.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

