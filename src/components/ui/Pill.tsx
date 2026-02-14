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
        "rounded-full border border-slate-200/80 bg-white/70 px-5 py-2.5",
        "text-[15px] font-semibold leading-5 text-slate-800",
        "backdrop-blur shadow-[0_1px_0_rgba(0,0,0,0.03)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
