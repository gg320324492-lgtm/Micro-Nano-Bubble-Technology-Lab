import CopyButton from "@/components/CopyButton";

type CopyBlockProps = {
  label: string;
  value: string;
  multiline?: boolean;
};

export default function CopyBlock({ label, value, multiline = false }: CopyBlockProps) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-card)] px-3.5 py-3 md:px-4 md:py-3.5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-xs font-medium text-[var(--muted)]">{label}</div>
          <div className={multiline ? "mt-1 break-words text-sm text-[var(--text)]" : "mt-1 break-words text-sm font-medium text-[var(--text)]"}>
            {value}
          </div>
        </div>
        <CopyButton text={value} />
      </div>
    </div>
  );
}
