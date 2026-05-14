"use client";

import { useEffect, useMemo, useState } from "react";

type ModuleSection = {
  id: string;
  label: string;
};

type ModuleItem = {
  moduleId: string;
  moduleTitle: string;
  sections: ModuleSection[];
};

type Props = {
  modules: ModuleItem[];
  className?: string;
};

export default function DynamicChapterNav({ modules, className }: Props) {
  const [activeModuleId, setActiveModuleId] = useState(modules[0]?.moduleId ?? "");
  const [activeSectionId, setActiveSectionId] = useState("");

  const activeModule = useMemo(
    () => modules.find((m) => m.moduleId === activeModuleId) ?? modules[0],
    [modules, activeModuleId]
  );

  useEffect(() => {
    if (!modules.length) return;

    const moduleObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveModuleId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.15, 0.35, 0.6] }
    );

    modules.forEach((m) => {
      const el = document.getElementById(m.moduleId);
      if (el) moduleObserver.observe(el);
    });

    return () => moduleObserver.disconnect();
  }, [modules]);

  useEffect(() => {
    if (!activeModule?.sections?.length) return;

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveSectionId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.2, 0.4, 0.7] }
    );

    activeModule.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) sectionObserver.observe(el);
    });

    return () => sectionObserver.disconnect();
  }, [activeModule]);

  if (!modules.length) return null;

  return (
    <aside className={className}>
      <div className="sticky top-28 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/95 p-4 shadow-[0_14px_32px_-24px_rgba(15,45,92,0.5)]">
        <div className="mb-3 text-xs font-semibold tracking-[0.18em] uppercase text-[var(--accent)]">
          板块导航
        </div>
        <div className="space-y-1">
          {modules.map((m, idx) => {
            const active = m.moduleId === activeModuleId;
            return (
              <a
                key={m.moduleId}
                href={`#${m.moduleId}`}
                onClick={() => setActiveModuleId(m.moduleId)}
                className={`block rounded-md px-2 py-1 text-sm transition-colors ${
                  active ? "bg-[var(--accent-soft)] text-[var(--accent)] font-semibold" : "text-[var(--text-secondary)] hover:text-[var(--accent)]"
                }`}
              >
                板块{idx + 1}
              </a>
            );
          })}
        </div>

        <div className="my-3 h-px bg-[var(--border)]" />

        <div className="mb-2 text-xs font-semibold tracking-[0.18em] uppercase text-[var(--accent)]">
          章节导航
        </div>
        <div className="space-y-1">
          {activeModule.sections.map((s, idx) => {
            const active = activeSectionId === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`block rounded-md px-2 py-1 text-xs transition-colors ${
                  active ? "bg-[var(--accent-soft)] text-[var(--accent)]" : "text-[var(--muted)] hover:text-[var(--accent)]"
                }`}
              >
                章节{idx + 1}
              </a>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

