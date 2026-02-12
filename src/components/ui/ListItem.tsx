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
        "rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--surface)] p-5",
        "shadow-[var(--shadow)]",
        className,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {year ? <div className="text-sm text-[color:var(--muted)]">{year}</div> : null}
          <div className="mt-2 text-lg font-semibold leading-snug text-[color:var(--text)]">{title}</div>
          {subtitle ? <div className="mt-1 text-sm text-[color:var(--muted)]">{subtitle}</div> : null}
          {description ? <div className="mt-2 text-sm text-[color:var(--muted)]">{description}</div> : null}

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
