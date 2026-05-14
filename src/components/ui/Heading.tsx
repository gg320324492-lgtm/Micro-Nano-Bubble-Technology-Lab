import type { ReactNode } from "react";

type HeadingProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
  subtitleClassName?: string;
};

export default function Heading({
  title,
  subtitle,
  as = "h2",
  className = "",
  subtitleClassName = "",
}: HeadingProps) {
  const Tag = as;

  return (
    <div className={className}>
      <Tag>{title}</Tag>
      {subtitle ? (
        <p className={`mt-3 max-w-4xl text-base leading-7 ${subtitleClassName}`.trim()}>{subtitle}</p>
      ) : null}
    </div>
  );
}
