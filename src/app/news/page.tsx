import { news } from "@/data/news";

export default function NewsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">
          最新动态 <span className="text-gray-500">News</span>
        </h1>
        <p className="text-gray-600">页面内容来自 src/data/news.ts。</p>
      </header>

      <section className="mt-8 space-y-3">
        {news.map((n) => (
          <div key={n.id} className="rounded-xl border p-5">
            <div className="text-xs text-gray-500">{n.date}</div>
            <div className="mt-1 font-medium">{n.titleZh}</div>
            {n.titleEn ? <div className="text-sm text-gray-500">{n.titleEn}</div> : null}
          </div>
        ))}
      </section>
    </main>
  );
}
