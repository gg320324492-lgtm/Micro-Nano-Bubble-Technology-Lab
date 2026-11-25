"use client";

// 产业化主界面 · 版式 A（编号大图清单）已固化，宽度 108rem
// 此前的 B/C/D 版式与切换器已移除（round 15 选定 A × 108）
// 交互：每个基地整块（文字区 + 图片）均为 Link，点击任意处进入详情页
import Image from "next/image";
import Link from "next/link";

import { toImageVariant } from "@/lib/imageVariant";

export type IzpBase = {
  slug: string;
  titleZh: string;
  titleEn?: string;
  briefZh: string;
  cover?: string;
  locationZh?: string;
  locationUrl?: string;
  highlightsZh?: string[];
};

/* ── 基地封面图 ── */
function BaseCover({ src, alt }: { src?: string; alt: string }) {
  if (!src) {
    return <div className="izp-cover izp-cover--empty" aria-hidden="true" />;
  }
  return (
    <div className="izp-cover">
      <Image
        src={toImageVariant(src, "main")}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 36vw"
        className="izp-cover__img"
      />
    </div>
  );
}

export default function IndustrializationClient({ bases }: { bases: IzpBase[] }) {
  return (
    <div className="theme-navy">
      <div className="izp-page">
        <header className="izp-hero">
          <span className="izp-kicker">INDUSTRIALIZATION · 产业化</span>
          <h1 className="izp-h1">从实验室机理到工程交付的三个基地</h1>
          <p className="izp-lede">
            围绕应用验证基地与示范场景，展示微纳米气泡技术在水产养殖、装备制造与水环境治理中的工程化落地与运行数据。
          </p>
          <div className="izp-headrule" />
        </header>

        <div className="izpA-list">
          {bases.map((b, i) => (
            <section key={b.slug} className="izpA-row">
              <span className="izpA-no">{String(i + 1).padStart(2, "0")}</span>

              {/* 文字区：整块可点击进入详情（位置外链单独保留，不嵌套） */}
              <div className="izpA-body">
                <span className="izp-cat">BASE {String(i + 1).padStart(2, "0")}</span>
                <h2 className="izp-title">
                  <Link href={`/industrialization/${b.slug}/`} className="izp-title__link">
                    {b.titleZh}
                  </Link>
                </h2>
                {b.titleEn ? <p className="izp-en">{b.titleEn}</p> : null}
                <p className="izp-brief">{b.briefZh}</p>

                {b.locationZh ? (
                  <p className="izp-loc">
                    <span className="izp-loc__label">位置</span>
                    {b.locationUrl ? (
                      <a
                        href={b.locationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="izp-loc__link"
                      >
                        {b.locationZh} ↗
                      </a>
                    ) : (
                      b.locationZh
                    )}
                  </p>
                ) : null}

                {b.highlightsZh?.length ? (
                  <ul className="izp-points">
                    {b.highlightsZh.slice(0, 3).map((x) => (
                      <li key={x} className="izp-point">
                        {x}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <Link href={`/industrialization/${b.slug}/`} className="izp-more izp-more--link">
                  查看基地详情 <span aria-hidden="true">→</span>
                </Link>
              </div>

              {/* 图片区：整块可点击进入详情 */}
              <Link
                href={`/industrialization/${b.slug}/`}
                className="izpA-media"
                aria-label={`进入基地详情：${b.titleZh}`}
              >
                <BaseCover src={b.cover} alt={b.titleZh} />
              </Link>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
