import CopyButton from "@/components/CopyButton";

type CopyBlockProps = {
  label: string;
  value: string;
  multiline?: boolean;
};

export default function CopyBlock({ label, value, multiline = false }: CopyBlockProps) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white px-3.5 py-3 shadow-[0_1px_0_rgba(0,0,0,0.03)] md:px-4 md:py-3.5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-xs font-medium text-slate-500">{label}</div>
          <div className={multiline ? "mt-1 break-words text-sm text-slate-800" : "mt-1 break-words text-sm font-medium text-slate-800"}>
            {value}
          </div>
        </div>
        <CopyButton text={value} />
      </div>
    </div>
  );
}
