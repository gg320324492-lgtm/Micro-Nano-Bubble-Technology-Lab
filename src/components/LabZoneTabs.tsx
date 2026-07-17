"use client";

import { Fragment, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type LabZoneKey = "display" | "experiment" | "pilot";

type TabDef = {
  key: LabZoneKey;
  label: string;
  badge: string;
};

const TABS: TabDef[] = [
  { key: "display", label: "展示区", badge: "Display" },
  { key: "experiment", label: "试验区", badge: "Experiment" },
  { key: "pilot", label: "中试区", badge: "Pilot" },
];

type Props = {
  displayPanel: ReactNode;
  experimentPanel: ReactNode;
  pilotPanel: ReactNode;
};

function getInitialTab(): LabZoneKey {
  if (typeof window === "undefined") return "display";
  const hash = window.location.hash.replace(/^#/, "");
  if (hash === "lab-display" || hash === "lab-experiment" || hash === "lab-pilot") {
    const map: Record<string, LabZoneKey> = {
      "lab-display": "display",
      "lab-experiment": "experiment",
      "lab-pilot": "pilot",
    };
    return map[hash];
  }
  return "display";
}

export default function LabZoneTabs({
  displayPanel,
  experimentPanel,
  pilotPanel,
}: Props) {
  const [activeTab, setActiveTab] = useState<LabZoneKey>(getInitialTab);

  const switchTab = (tab: LabZoneKey) => {
    setActiveTab(tab);
    if (typeof window === "undefined") return;
    const hashMap: Record<LabZoneKey, string> = {
      display: "lab-display",
      experiment: "lab-experiment",
      pilot: "lab-pilot",
    };
    const url = new URL(window.location.href);
    url.hash = hashMap[tab];
    window.history.replaceState(null, "", url.toString());
  };

  const panelFor = (key: LabZoneKey): ReactNode => {
    switch (key) {
      case "display":
        return displayPanel;
      case "experiment":
        return experimentPanel;
      case "pilot":
        return pilotPanel;
    }
  };

  return (
    <Fragment>
      {/* 顶部 Tab 导航 */}
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/90 p-2 shadow-[var(--shadow-card)]">
        <div className="grid grid-cols-3 gap-2">
          {TABS.map((tab) => {
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => switchTab(tab.key)}
                className="relative inline-flex items-center justify-center rounded-xl px-3 py-3 text-sm font-semibold"
                aria-pressed={active}
              >
                {active ? (
                  <motion.span
                    layoutId="lab-zone-tab-active"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] shadow-md"
                    transition={{ type: "spring", stiffness: 360, damping: 30 }}
                  />
                ) : null}
                <span
                  className={`relative z-10 text-center leading-tight ${
                    active ? "text-white" : "text-[var(--text-secondary)]"
                  }`}
                >
                  <span className="block">{tab.label}</span>
                  <span
                    className={`mt-0.5 block text-[10px] font-bold uppercase tracking-widest ${
                      active ? "text-white/80" : "text-[var(--muted)]"
                    }`}
                  >
                    {tab.badge}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 内容面板 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="mt-6"
        >
          {panelFor(activeTab)}
        </motion.div>
      </AnimatePresence>
    </Fragment>
  );
}