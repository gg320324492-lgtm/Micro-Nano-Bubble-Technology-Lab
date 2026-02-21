import Link from "next/link";
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

      <section className="mt-8 space-y-4">
        {news.map((n) => {
          const cardClass = "block rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-6 transition hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-hover)] group";
          const inner = (
            <>
              <div className="text-xs font-bold text-[var(--muted)]">{n.date}</div>
              <div className="mt-1 font-medium text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">{n.titleZh}</div>
              {n.titleEn ? (
                <div className="mt-1 text-sm text-[var(--muted)]">{n.titleEn}</div>
              ) : null}
            </>
          );
          return n.slug ? (
            <Link key={n.id} href={`/news/${n.slug}`} className={cardClass}>
              {inner}
            </Link>
          ) : (
            <div key={n.id} className={cardClass}>
              {inner}
            </div>
          );
        })}
      </section>
    </main>
  );
}
