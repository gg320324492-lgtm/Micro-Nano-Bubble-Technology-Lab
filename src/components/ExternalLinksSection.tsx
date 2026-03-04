// src/components/ExternalLinksSection.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { ExternalLink } from "@/data/externalLinks";

type Props = {
  links: ExternalLink[];
};

export default function ExternalLinksSection({ links }: Props) {
  if (!links?.length) return null;

  return (
    <section
      aria-labelledby="external-links-heading"
      className="relative rounded-[var(--radius-xl)] border border-[var(--border)] bg-white/80 backdrop-blur-sm shadow-[var(--shadow-card)] px-6 py-8 md:px-10 md:py-10"
    >
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[var(--accent-soft)]/40 via-transparent to-[var(--accent-secondary)]/20 opacity-70" />
      <div className="relative z-10 space-y-6">
        <div className="text-center space-y-3">
          <p className="inline-flex items-center rounded-full bg-[var(--accent-soft)] px-4 py-1 text-xs font-semibold tracking-widest text-[var(--accent)] uppercase">
            External Links
          </p>
          <h2
            id="external-links-heading"
            className="text-2xl md:text-3xl font-bold gradient-text"
          >
            媒体报道
          </h2>
          <p className="mx-auto max-w-2xl text-sm md:text-base text-[var(--text-secondary)]">
            了解我们在外部平台上的更多故事、报道与合作机会。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              className="group h-full"
            >
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] transition-all hover:border-[var(--accent)] hover:shadow-[var(--shadow-hover)]"
              >
                <div className="relative h-32 w-full overflow-hidden bg-[var(--bg-elevated)]">
                  {item.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className={`h-full w-full ${
                        item.thumbnailFit === "contain" ? "object-contain" : "object-cover"
                      } transition-transform duration-300 group-hover:scale-105`}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-[var(--muted)]">
                      外部链接
                    </div>
                  )}
                  {item.tag ? (
                    <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                      {item.tag}
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col space-y-2 px-4 py-4">
                  <h3 className="line-clamp-2 text-sm md:text-base font-semibold text-[var(--text)] group-hover:text-[var(--accent)]">
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p className="line-clamp-3 text-xs md:text-sm text-[var(--muted)]">
                      {item.description}
                    </p>
                  ) : null}
                  {item.source ? (
                    <p className="mt-auto text-[11px] uppercase tracking-wide text-[var(--muted)]">
                      {item.source}
                    </p>
                  ) : null}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

