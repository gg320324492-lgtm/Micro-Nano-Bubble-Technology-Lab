import type { ButtonHTMLAttributes, ReactNode } from "react";

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  children: ReactNode;
  count?: number;
  size?: "md" | "sm";
};

export default function Chip({
  active = false,
  children,
  count,
  size = "md",
  className = "",
  ...rest
}: ChipProps) {
  const sizeClass =
    size === "sm" ? "px-3 py-1.5 text-[13px]" : "px-4 py-2 text-[15px]";

  return (
    <button
      type="button"
      className={[
        "inline-flex items-center rounded-full border font-semibold whitespace-nowrap transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-1",
        sizeClass,
        active
          ? "border-slate-900 bg-slate-900 text-white"
          : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50",
        className,
      ].join(" ")}
      {...rest}
    >
      <span className="min-w-0 overflow-hidden text-ellipsis">{children}</span>
      {typeof count === "number" ? (
        <span
          className={[
            "ml-2 text-[12px] font-medium",
            active ? "text-white/70" : "text-slate-500",
          ].join(" ")}
        >
          ({count})
        </span>
      ) : null}
    </button>
  );
}
