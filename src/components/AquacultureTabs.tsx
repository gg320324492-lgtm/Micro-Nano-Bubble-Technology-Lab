"use client";

import { useEffect, useState, type ReactNode } from "react";

type TabKey = "intro" | "results";

type Props = {
  introPanel: ReactNode;
  resultsPanel: ReactNode;
};

export default function AquacultureTabs({ introPanel, resultsPanel }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>("intro");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    setActiveTab(tab === "results" ? "results" : "intro");
  }, []);

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
      className="mt-6 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-2"
    >
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => switchTab("intro")}
          className={[
            "inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition",
            activeTab === "intro"
              ? "bg-[var(--accent)] text-[var(--bg-deep)]"
              : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--accent-soft)]",
          ].join(" ")}
          aria-pressed={activeTab === "intro"}
        >
          基地介绍
        </button>
        <button
          type="button"
          onClick={() => switchTab("results")}
          className={[
            "inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition",
            activeTab === "results"
              ? "bg-[var(--accent)] text-[var(--bg-deep)]"
              : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--accent-soft)]",
          ].join(" ")}
          aria-pressed={activeTab === "results"}
        >
          成果展示
        </button>
      </div>
    </div>,
    <div key={`aquaculture-panel-${activeTab}`}>
      {activeTab === "intro" ? introPanel : resultsPanel}
    </div>,
  ];
}
