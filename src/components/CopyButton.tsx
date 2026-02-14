// src/components/CopyButton.tsx
"use client";

import { useEffect, useState } from "react";

export default function CopyButton({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();

    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch {
      // 忽略
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={onCopy}
        className={[
          "inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs text-slate-700 transition hover:bg-slate-50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300",
          className,
        ].join(" ")}
        aria-label="Copy"
      >
        复制
      </button>

      <div
        aria-live="polite"
        className={[
          "pointer-events-none fixed bottom-5 right-5 z-[120] rounded-2xl px-3.5 py-2 text-[13px] text-white",
          "bg-black/70 backdrop-blur",
          reduceMotion ? "" : "transition-all duration-200",
          copied
            ? "translate-y-0 opacity-100"
            : reduceMotion
              ? "hidden"
              : "translate-y-1 opacity-0",
        ].join(" ")}
      >
        已添加到剪贴板
      </div>
    </>
  );
}
