import Link from "next/link";

import Container from "@/components/Container";
import NewsGalleryCarousel from "@/components/NewsGalleryCarousel";
import { news } from "@/data/news";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return news.filter((n) => n.slug).map((n) => ({ slug: n.slug! }));
}

export default async function NewsDetailPage(props: PageProps) {
  const { slug } = await props.params;

  const item = news.find((n) => n.slug === slug);

  if (!item) {
    return (
      <Container>
        <main className="mx-auto max-w-3xl px-6 py-12">
          <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-8">
            <h1 className="text-2xl font-semibold text-[var(--text)]">未找到该动态</h1>
            <p className="mt-2 text-[var(--text-secondary)]">
              当前 slug：<span className="font-mono">{slug}</span> 未匹配到数据。
            </p>
            <div className="mt-8">
              <Link
                href="/"
                className="rounded-xl bg-[var(--accent)] px-4 py-2 text-sm text-white hover:bg-[var(--accent-hover)]"
              >
                返回首页
              </Link>
            </div>
          </div>
        </main>
      </Container>
    );
  }

  const c = item.content;

  const galleryImages =
    item.slug === "2026-ruide-cup-forum"
      ? [
          { src: "/news/ruide-cup-0.png", alt: "首届瑞德杯研究生学术论坛集体合影" },
          { src: "/news/ruide-cup-1.png", alt: "瑞德杯论坛现场照片 1" },
          { src: "/news/ruide-cup-2.png", alt: "瑞德杯论坛现场照片 2" },
          { src: "/news/ruide-cup-3.png", alt: "瑞德杯论坛现场照片 3" },
        ]
      : item.coverImage?.trim()
      ? [{ src: item.coverImage, alt: item.titleZh }]
      : [];

  return (
    <Container>
      <main className="mx-auto max-w-4xl px-6 py-12 md:py-14">
        <Link
          href="/"
          className="mb-8 shrink-0 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2 text-sm font-semibold text-[var(--text)] shadow-sm hover:border-[var(--accent)]/40 hover:bg-[var(--accent-soft)]"
        >
          ← 返回首页
        </Link>

        {/* 顶部大图轮播区域 */}
        <section className="relative mb-10 md:mb-14 w-screen left-1/2 -translate-x-1/2">
          <div className="mx-auto max-w-6xl px-6">
            <div className="relative aspect-[4/3] md:aspect-[16/9] rounded-[var(--radius-2xl)] overflow-hidden bg-[var(--bg-elevated)] shadow-[0_22px_60px_rgba(15,23,42,0.26)]">
              <NewsGalleryCarousel images={galleryImages} />
            </div>
          </div>
        </section>

        {/* 标题区 */}
        <header className="mb-12 text-center md:text-left">
          <div className="text-xs md:text-sm font-bold text-[var(--accent-secondary)] mb-3 tracking-wide">
            {item.date}
          </div>
          <h1 className="text-base md:text-lg lg:text-xl font-bold text-[var(--text)] gradient-text leading-tight">
            {item.titleZh}
          </h1>
          {item.titleEn ? (
            <p className="mt-4 text-base md:text-lg text-[var(--muted)] max-w-3xl leading-relaxed">
              {item.titleEn}
            </p>
          ) : null}
        </header>

        {/* 富内容 */}
        {c && (
          <article className="space-y-10 md:space-y-12 text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
            {c.theme ? (
              <section>
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-8 w-1 rounded-full bg-[var(--accent)]" />
                  <h2 className="text-xl md:text-2xl font-semibold text-[var(--text)]">
                    一、会议主题
                  </h2>
                </div>
                <p>{c.theme}</p>
              </section>
            ) : null}

            {c.objectives ? (
              <section>
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-8 w-1 rounded-full bg-[var(--accent)]" />
                  <h2 className="text-xl md:text-2xl font-semibold text-[var(--text)]">
                    二、会议目标
                  </h2>
                </div>
                <p>{c.objectives}</p>
              </section>
            ) : null}

            {(c.time || c.location) ? (
              <section>
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-8 w-1 rounded-full bg-[var(--accent)]" />
                  <h2 className="text-xl md:text-2xl font-semibold text-[var(--text)]">
                    三、会议时间与地点
                  </h2>
                </div>
                <div className="space-y-2">
                  {c.time ? <p><span className="font-medium text-[var(--text)]">时间：</span>{c.time}</p> : null}
                  {c.location ? <p><span className="font-medium text-[var(--text)]">地点：</span>{c.location}</p> : null}
                </div>
              </section>
            ) : null}

            {c.agenda && c.agenda.length > 0 ? (
              <section>
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-8 w-1 rounded-full bg-[var(--accent)]" />
                  <h2 className="text-xl md:text-2xl font-semibold text-[var(--text)]">
                    四、会议议程
                  </h2>
                </div>
                <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)]/60 shadow-sm">
                  <table className="w-full border-collapse text-sm md:text-base">
                    <thead>
                      <tr className="bg-[var(--bg-elevated)]/80">
                        <th className="border-b border-[var(--border)] px-4 py-3 text-left font-semibold text-[var(--text)]">时间</th>
                        <th className="border-b border-[var(--border)] px-4 py-3 text-left font-semibold text-[var(--text)]">内容</th>
                        <th className="border-b border-[var(--border)] px-4 py-3 text-left font-semibold text-[var(--text)]">地点</th>
                      </tr>
                    </thead>
                    <tbody>
                      {c.agenda.map((row, i) => (
                        <tr key={i} className="odd:bg-transparent even:bg-[var(--bg-elevated)]/60">
                          <td className="px-4 py-3 align-top whitespace-nowrap">{row.time}</td>
                          <td className="px-4 py-3 align-top">{row.content}</td>
                          <td className="px-4 py-3 align-top whitespace-nowrap">{row.location ?? "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : null}

            {c.reports && c.reports.length > 0 ? (
              <section>
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-8 w-1 rounded-full bg-[var(--accent)]" />
                  <h2 className="text-xl md:text-2xl font-semibold text-[var(--text)]">
                    五、会议报告
                  </h2>
                </div>
                <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)]/60 shadow-sm">
                  <table className="w-full border-collapse text-sm md:text-base">
                    <thead>
                      <tr className="bg-[var(--bg-elevated)]/80">
                        <th className="border-b border-[var(--border)] px-4 py-3 text-left font-semibold text-[var(--text)]">时间</th>
                        <th className="border-b border-[var(--border)] px-4 py-3 text-left font-semibold text-[var(--text)]">报告人</th>
                        <th className="border-b border-[var(--border)] px-4 py-3 text-left font-semibold text-[var(--text)]">题目</th>
                      </tr>
                    </thead>
                    <tbody>
                      {c.reports.map((row, i) => (
                        <tr key={i} className="odd:bg-transparent even:bg-[var(--bg-elevated)]/60">
                          <td className="px-4 py-3 align-top whitespace-nowrap">{row.time}</td>
                          <td className="px-4 py-3 align-top whitespace-nowrap">{row.speaker}</td>
                          <td className="px-4 py-3 align-top">{row.title}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : null}

            {c.attendees ? (
              <section>
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-8 w-1 rounded-full bg-[var(--accent)]" />
                  <h2 className="text-xl md:text-2xl font-semibold text-[var(--text)]">
                    六、参会人员
                  </h2>
                </div>
                <p>{c.attendees}</p>
              </section>
            ) : null}

            {c.supportOrg ? (
              <section>
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-8 w-1 rounded-full bg-[var(--accent)]" />
                  <h2 className="text-xl md:text-2xl font-semibold text-[var(--text)]">
                    七、支持单位
                  </h2>
                </div>
                <p>{c.supportOrg}</p>
              </section>
            ) : null}
          </article>
        )}

      </main>
    </Container>
  );
}
