import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: "article" | "div" | "section";
};

export default function Card({ children, className = "", as = "article" }: CardProps) {
  const Tag = as;
  return (
    <Tag
      className={[
        "rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--surface)]",
        "shadow-[var(--shadow)] transition duration-200",
        "hover:-translate-y-0.5",
        className,
      ].join(" ")}
    >
      {children}
    </Tag>
  );
}
