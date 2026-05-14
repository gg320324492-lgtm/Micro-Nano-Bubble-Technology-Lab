import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-[var(--radius-sm)] border border-[var(--border-strong)]",
        "bg-[var(--accent-soft)] px-2.5 py-1 text-xs text-[var(--accent)]",
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
