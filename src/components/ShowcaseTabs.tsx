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
    /* 顶部 Tab 导航 — A 胶囊（已固化；B/C/D 与切换器已移除） */
    <div
      key="showcase-tabs"
      id="showcase-tabs"
      className="scroll-mt-[120px]"
    >
      <div className="sw-tabs sw-tabs--a">
        {TABS.map((tab) => {
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => switchTab(tab.key)}
              className="sw-a__btn"
              aria-pressed={active}
            >
              {active ? (
                <motion.span
                  layoutId="sw-a-active"
                  className="sw-a__bg"
                  transition={{ type: "spring", stiffness: 360, damping: 30 }}
                />
              ) : null}
              <span className={`sw-a__text ${active ? "is-on" : ""}`}>
                <span className="block">{tab.label}</span>
                <span className="sw-a__badge">{tab.badge}</span>
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