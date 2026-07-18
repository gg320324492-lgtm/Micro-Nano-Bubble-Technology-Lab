"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

import LightboxViewer from "@/components/LightboxViewer";
import { assetPath } from "@/lib/assetPath";

export type ResearchModuleSection = {
  id: string;
  label: string;
  content?: string;
  images?: {
    src: string;
    alt?: string;
    caption?: string;
    focusY?: number;
  }[];
};

/** 同一板块下的独立内容卡片：左文 + 右图，与导航上的「板块」不同 */
export type ResearchModuleContentStack = {
  id: string;
  /** 本张卡片主标题（每张独立，勿与导航「板块」混用） */
  cardTitle: string;
  /** 可选：标题下一句短引子（不需要可省略，避免与下方小节标题重复） */
  stackSummary?: string;
  /** @deprecated 仅兼容旧数据；新布局请用 cardTitle */
  stackLabel?: string;
  hideSections?: boolean;
  sections: ResearchModuleSection[];
  image?: {
    src: string;
    alt?: string;
    caption?: string;
    focusY?: number;
  };
  images?: {
    src: string;
    alt?: string;
    caption?: string;
    focusY?: number;
  }[];
};

export type ResearchModuleCard = {
  moduleId: string;
  moduleTitle: string;
  summary: string;
  hideSections?: boolean;
  image?: {
    src: string;
    alt?: string;
    caption?: string;
    focusY?: number;
  };
  images?: {
    src: string;
    alt?: string;
    caption?: string;
    focusY?: number;
  }[];
  sections: ResearchModuleSection[];
  /** 若提供，则在同一板块内纵向堆叠多张独立卡片（每张自有左文+右图） */
  contentStacks?: ResearchModuleContentStack[];
};

type Props = {
  modules: ResearchModuleCard[];
};

function renderSectionColumn(hideSections: boolean | undefined, sections: ResearchModuleSection[]) {
  if (hideSections || !sections.length) return null;
  return (
    <div className="space-y-2.5">
      {sections.map((section, idx) => (
        <article
          key={section.id}
          className="group relative rounded-lg border border-[var(--border)] bg-white/65 py-3.5 pl-4 pr-4 transition-colors hover:border-[var(--accent)]/35 hover:bg-white"
        >
          {/* 左侧细色条 */}
          <span
            aria-hidden
            className="absolute bottom-3 left-0 top-3 w-[2px] rounded-r-full bg-gradient-to-b from-[var(--accent)] to-[var(--accent-secondary)]"
          />

          <header className="flex items-baseline gap-2">
            <span className="font-mono text-[11px] font-medium tabular-nums tracking-wider text-[var(--accent)]">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <h3 className="text-[14px] font-semibold tracking-tight text-[var(--text)]">
              {section.label}
            </h3>
          </header>

          {section.content ? (
            <p className="mt-2 text-[13px] leading-6 text-[var(--text-secondary)]">
              {section.content}
            </p>
          ) : null}

          {section.images?.length ? (
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {section.images.map((img, idx) => (
                <LightboxViewer
                  key={`${section.id}-image-${idx}`}
                  item={{
                    src: assetPath(img.src),
                    alt: img.alt || `${section.label}-${idx + 1}`,
                    caption: img.caption,
                    focusY: img.focusY ?? 45,
                  }}
                  aspect="4/3"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 24vw, 360px"
                />
              ))}
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}

function renderImageColumn(
  moduleId: string,
  moduleTitle: string,
  images: ResearchModuleContentStack["images"],
  image: ResearchModuleContentStack["image"],
  /** 仅当需要「多图占位」时传入；不传则沿用单块「图文内容整理中」 */
  emptyPlaceholderSlots?: number,
) {
  if (images?.length) {
    const isOdd = images.length % 2 === 1;
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {images.map((img, idx) => (
          <LightboxViewer
            key={`${moduleId}-image-${idx}`}
            item={{
              src: assetPath(img.src),
              alt: img.alt || `${moduleTitle}-${idx + 1}`,
              caption: img.caption,
              focusY: img.focusY ?? 45,
            }}
            aspect="4/3"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 24vw, 360px"
            figureClassName={isOdd && idx === images.length - 1 ? "sm:col-span-2" : ""}
          />
        ))}
      </div>
    );
  }
  if (image?.src) {
    return (
      <LightboxViewer
        item={{
          src: assetPath(image.src),
          alt: image.alt || moduleTitle,
          caption: image.caption,
          focusY: image.focusY ?? 45,
        }}
        aspect="4/3"
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 600px"
      />
    );
  }
  if (typeof emptyPlaceholderSlots === "number" && emptyPlaceholderSlots > 0) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: emptyPlaceholderSlots }, (_, idx) => (
          <div
            key={`${moduleId}-ph-${idx}`}
            className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--bg-elevated)]/60 px-4 text-center text-xs leading-relaxed text-[var(--muted)]"
          >
            示意图 / 数据图 {idx + 1}
            <br />
            <span className="text-[11px] opacity-80">占位，待补充</span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] text-sm text-[var(--muted)]">
      图文内容整理中
    </div>
  );
}

export default function ResearchModuleSwitcher({ modules }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = useMemo(() => modules[activeIndex] ?? modules[0], [modules, activeIndex]);
  const reduceMotion = useReducedMotion();

  if (!modules.length || !active) return null;

  const stacks = active.contentStacks;

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/95 p-4 shadow-[0_14px_32px_-24px_rgba(15,45,92,0.5)] md:p-5">
        <div className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent)]">
          板块导航
        </div>
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/90 p-2 shadow-[var(--shadow-card)]">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {modules.map((m, idx) => (
              <motion.button
                key={m.moduleId}
                type="button"
                onClick={() => setActiveIndex(idx)}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut", delay: idx * 0.04 }}
                whileTap={reduceMotion ? {} : { scale: 0.98 }}
                className="relative inline-flex items-start rounded-xl px-3 py-3 text-left text-sm font-semibold"
                aria-pressed={idx === activeIndex}
              >
                {idx === activeIndex ? (
                  <motion.span
                    layoutId="research-module-tab-active"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] shadow-md"
                    transition={{ type: "spring", stiffness: 360, damping: 30 }}
                  />
                ) : null}
                <span
                  className={`relative z-10 w-full leading-snug ${
                    idx === activeIndex ? "text-white" : "text-[var(--text-secondary)]"
                  }`}
                >
                  <span className="block whitespace-normal">
                    {`①②③④⑤⑥⑦⑧⑨⑩`.charAt(idx)} {m.moduleTitle}
                  </span>
                  <span
                    className={`mt-1 block text-[10px] font-bold uppercase tracking-widest ${
                      idx === activeIndex ? "text-white/80" : "text-[var(--muted)]"
                    }`}
                  >
                    Module {String(idx + 1).padStart(2, "0")}
                  </span>
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.moduleId}
          id={active.moduleId}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={
            stacks?.length
              ? "space-y-8"
              : "rounded-[24px] border border-[var(--border)] bg-[var(--bg-card)]/96 px-5 py-8 shadow-[0_14px_32px_-24px_rgba(15,45,92,0.5)] md:px-8 md:py-10"
          }
        >
          {stacks?.length ? (
            <div className="space-y-8">
              {stacks.map((stack) => (
                <div
                  key={stack.id}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/95 px-5 py-8 shadow-[0_14px_32px_-24px_rgba(15,45,92,0.45)] md:px-8 md:py-10"
                >
                  {/* 主标题通栏（整卡宽度）；图与左侧正文首行顶对齐 */}
                  <div className="space-y-6">
                    <div className="w-full border-b border-[var(--border)] pb-5">
                      <h2 className="block w-full max-w-none bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] bg-clip-text text-xl font-semibold leading-[1.2] tracking-tight text-transparent md:text-[clamp(1.2rem,1.4vw+0.55rem,1.85rem)]">
                        {stack.cardTitle || stack.stackLabel}
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start lg:gap-12">
                      <div className="min-w-0 space-y-4">
                        {stack.stackSummary ? (
                          <p className="text-sm leading-7 text-[var(--text-secondary)] md:text-[15px]">
                            {stack.stackSummary}
                          </p>
                        ) : null}
                        {renderSectionColumn(stack.hideSections, stack.sections)}
                      </div>
                      <div className="min-w-0 w-full self-start">
                        {renderImageColumn(
                          `${active.moduleId}-${stack.id}`,
                          active.moduleTitle,
                          stack.images,
                          stack.image,
                          !stack.images?.length && !stack.image?.src ? 3 : undefined,
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full space-y-6">
              <div className="w-full border-b border-[var(--border)] pb-5">
                <div className="text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--accent)]">
                  Module {activeIndex + 1}
                </div>
                <h2 className="mt-3 block w-full max-w-none bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] bg-clip-text text-xl font-semibold leading-[1.2] tracking-tight text-transparent md:mt-4 md:text-[clamp(1.2rem,1.4vw+0.55rem,1.85rem)]">
                  {active.moduleTitle}
                </h2>
              </div>
              {/* 图与下方简介/小节首行顶对齐 */}
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start lg:gap-12">
                <div className="min-w-0 space-y-5">
                  <p className="text-sm leading-7 text-[var(--text-secondary)] md:text-[15px]">{active.summary}</p>
                  {renderSectionColumn(active.hideSections, active.sections)}
                </div>
                <div className="min-w-0 w-full self-start">
                  {renderImageColumn(active.moduleId, active.moduleTitle, active.images, active.image)}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

