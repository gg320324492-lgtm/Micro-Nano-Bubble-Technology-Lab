"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

type TabKey = "intro" | "results";

type Props = {
  introPanel: ReactNode;
  resultsPanel: ReactNode;
};

function getInitialTab(): TabKey {
  if (typeof window === "undefined") return "intro";
  const params = new URLSearchParams(window.location.search);
  return params.get("tab") === "results" ? "results" : "intro";
}

export default function AquacultureTabs({ introPanel, resultsPanel }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>(getInitialTab);

  const switchTab = (tab: TabKey) => {
    setActiveTab(tab);

    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    if (tab === "intro") {
      url.searchParams.delete("tab");
    } else {
      url.searchParams.set("tab", "results");
    }
    window.history.replaceState(null, "", url.toString());
  };

  return [
    <div
      key="aquaculture-tabs"
      className="mt-6 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/90 p-2 shadow-[var(--shadow-card)]"
    >
      <div className="grid grid-cols-2 gap-2">
        {[
          { key: "intro" as const, label: "基地介绍" },
          { key: "results" as const, label: "成果展示" },
        ].map((tab) => {
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => switchTab(tab.key)}
              className="relative inline-flex items-center justify-center rounded-xl px-3 py-2.5 text-sm font-semibold"
              aria-pressed={active}
            >
              {active ? (
                <motion.span
                  layoutId="aquaculture-tab-active"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] shadow-md"
                  transition={{ type: "spring", stiffness: 360, damping: 30 }}
                />
              ) : null}
              <span className={`relative z-10 ${active ? "text-white" : "text-[var(--text-secondary)]"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>,
    <AnimatePresence mode="wait" key="aquaculture-panels">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
      >
        {activeTab === "intro" ? introPanel : resultsPanel}
      </motion.div>
    </AnimatePresence>,
  ];
}
