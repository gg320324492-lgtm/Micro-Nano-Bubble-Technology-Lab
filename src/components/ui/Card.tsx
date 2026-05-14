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
        "rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-card)]",
        "transition duration-200 backdrop-blur-sm",
        "hover:border-[var(--border-strong)]",
        className,
      ].join(" ")}
    >
      {children}
    </Tag>
  );
}
