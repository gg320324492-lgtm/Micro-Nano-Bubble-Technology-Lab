import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border border-[color:var(--border)]",
        "bg-white/80 px-2.5 py-1 text-xs text-[color:var(--muted)]",
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
