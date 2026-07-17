"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type ShowcaseTabKey = "showcase" | "lab" | "ruide-cup" | "defense";

type TabDef = {
  key: ShowcaseTabKey;
  label: string;
  badge: string;
};

const TABS: TabDef[] = [
  { key: "showcase", label: "风采展示", badge: "Showcase" },
  { key: "lab", label: "实验室", badge: "Lab" },
  { key: "ruide-cup", label: "瑞德杯学术论坛", badge: "Conference" },
  { key: "defense", label: "学位论文答辩", badge: "Defense" },
];

type Props = {
  showcasePanel: ReactNode;
  labPanel: ReactNode;
  ruideCupPanel: ReactNode;
  defensePanel: ReactNode;
};

function getInitialTab(): ShowcaseTabKey {
  if (typeof window === "undefined") return "showcase";
  const hash = window.location.hash.replace(/^#/, "");
  if (hash === "lab" || hash === "ruide-cup" || hash === "defense") return hash;
  return "showcase";
}

export default function ShowcaseTabs({
  showcasePanel,
  labPanel,
  ruideCupPanel,
  defensePanel,
}: Props) {
  const [activeTab, setActiveTab] = useState<ShowcaseTabKey>(getInitialTab);

  const switchTab = (tab: ShowcaseTabKey) => {
    setActiveTab(tab);
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.hash = tab === "showcase" ? "showcase-tabs" : tab;
    window.history.replaceState(null, "", url.toString());
  };

  const panelFor = (key: ShowcaseTabKey): ReactNode => {
    switch (key) {
      case "showcase":
        return showcasePanel;
      case "lab":
        return labPanel;
      case "ruide-cup":
        return ruideCupPanel;
      case "defense":
        return defensePanel;
    }
  };

  return [
    /* 顶部 Tab 导航 */
    <div
      key="showcase-tabs"
      id="showcase-tabs"
      className="scroll-mt-[120px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/90 p-2 shadow-[var(--shadow-card)]"
    >
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
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
                  layoutId="showcase-tab-active"
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
    </div>,

    /* 内容面板 */
    <AnimatePresence mode="wait" key="showcase-panels">
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
    </AnimatePresence>,
  ];
}