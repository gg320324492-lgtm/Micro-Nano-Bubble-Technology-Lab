// src/components/CopyButton.tsx
"use client";

import { useState } from "react";

export default function CopyButton({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // 忽略
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className={[
        "inline-flex items-center rounded-full border px-3 py-1.5 text-xs transition",
        "hover:bg-gray-50",
        className,
      ].join(" ")}
      aria-label="Copy"
    >
      {copied ? "已复制" : "复制"}
    </button>
  );
}
