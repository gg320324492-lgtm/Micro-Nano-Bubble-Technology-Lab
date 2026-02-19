import type { ReactNode } from "react";
import Badge from "@/components/ui/Badge";

type ListItemProps = {
  year?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  badges?: string[];
  action?: ReactNode;
  className?: string;
};

export default function ListItem({
  year,
  title,
  subtitle,
  description,
  badges,
  action,
  className = "",
}: ListItemProps) {
  return (
    <article
      className={[
        "rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-card)] p-5",
        className,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {year ? (
            <div className="inline-flex rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-xs font-semibold text-[var(--accent)]">
              {year}
            </div>
          ) : null}
          <div className="mt-2 text-lg font-semibold leading-snug text-[var(--text)]">{title}</div>
          {subtitle ? <div className="mt-1 text-sm text-[var(--muted)]">{subtitle}</div> : null}
          {description ? <div className="mt-2 text-sm text-[var(--text-secondary)]">{description}</div> : null}

          {badges?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {badges.map((b) => (
                <Badge key={b}>{b}</Badge>
              ))}
            </div>
          ) : null}
        </div>

        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </article>
  );
}
