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
      className="mt-6 rounded-2xl border border-slate-200 bg-white/90 p-2 shadow-sm"
    >
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => switchTab("intro")}
          className={[
            "inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition",
            activeTab === "intro"
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200",
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
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200",
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
