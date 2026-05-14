import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  container?: "default" | "wide" | "none";
  spacing?: "compact" | "default" | "spacious";
};

const spacingMap = {
  compact: "section-compact",
  default: "section",
  spacious: "section-spacious",
} as const;

const containerMap = {
  default: "site-container",
  wide: "site-container site-container-wide",
  none: "",
} as const;

export default function Section({
  children,
  className = "",
  container = "default",
  spacing = "default",
}: SectionProps) {
  return (
    <section className={`${spacingMap[spacing]} ${className}`.trim()}>
      <div className={containerMap[container]}>{children}</div>
    </section>
  );
}
