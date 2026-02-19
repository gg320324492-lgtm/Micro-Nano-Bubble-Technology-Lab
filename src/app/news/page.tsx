import { news } from "@/data/news";

export default function NewsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-[var(--text)]">
          最新动态 <span className="text-[var(--muted)]">News</span>
        </h1>
        <p className="text-[var(--text-secondary)]">页面内容来自 src/data/news.ts。</p>
      </header>

      <section className="mt-8 space-y-3">
        {news.map((n) => (
          <div
            key={n.id}
            className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-card)] p-5 transition hover:border-[var(--border-strong)]"
          >
            <div className="text-xs text-[var(--muted)]">{n.date}</div>
            <div className="mt-1 font-medium text-[var(--text)]">{n.titleZh}</div>
            {n.titleEn ? (
              <div className="text-sm text-[var(--muted)]">{n.titleEn}</div>
            ) : null}
          </div>
        ))}
      </section>
    </main>
  );
}
