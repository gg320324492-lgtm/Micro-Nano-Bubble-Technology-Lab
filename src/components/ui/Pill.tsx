import type { ReactNode } from "react";

type PillProps = {
  children: ReactNode;
  className?: string;
};

export default function Pill({ children, className = "" }: PillProps) {
  return (
    <div
      className={[
        "inline-flex w-full min-w-0 items-center justify-start overflow-hidden break-words",
        "rounded-full border border-[var(--border)] bg-[var(--accent-soft)] px-5 py-2.5",
        "text-[15px] font-semibold leading-5 text-[var(--text)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
