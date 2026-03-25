"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import LightboxGallery, { type GalleryItem } from "@/components/LightboxGallery";
import { buttonClassName } from "@/components/ui/Button";
import reidDeviceShowcaseContent from "@/content/reidDeviceShowcaseContent";
import type { IndustrialBase } from "@/data/industrialization";
import { assetPath } from "@/lib/assetPath";

type Props = {
  base: IndustrialBase;
};

type GalleryGroup = {
  title: string;
  items: GalleryItem[];
};

export default function ReidDeviceShowcase({ base }: Props) {
  const [activeGroup, setActiveGroup] = useState(
    reidDeviceShowcaseContent.productGroups[0]?.id ?? "rd-nm",
  );
  const [expandedModel, setExpandedModel] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "product" | "delivery" | "contact">("overview");
  const [moreScenesOpen, setMoreScenesOpen] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState<
    "featured-products" | "onsite-usage" | "performance-results" | "industrial-proof"
  >("featured-products");
  const reduceMotion = useReducedMotion();

  const currentGroup =
    reidDeviceShowcaseContent.productGroups.find((g) => g.id === activeGroup) ??
    reidDeviceShowcaseContent.productGroups[0];

  const galleryGroups = useMemo<GalleryGroup[]>(() => {
    const src = (i: number) => base.gallery?.[i]?.src ?? "";
    const cap = (i: number) => base.gallery?.[i]?.captionZh ?? "";
    const alt = (i: number) => base.gallery?.[i]?.alt ?? base.titleZh;

    return [
      {
        title: "代表性产品",
        items: [
          { src: src(6), caption: cap(6), alt: alt(6) },
          { src: src(7), caption: cap(7), alt: alt(7) },
          { src: src(9), caption: cap(9), alt: alt(9) },
          { src: src(8), caption: cap(8), alt: alt(8) },
        ].filter((x) => x.src),
      },
      {
        title: "产品现场使用",
        items: [
          { src: src(10), caption: cap(10), alt: alt(10) },
          { src: src(11), caption: cap(11), alt: alt(11) },
          { src: src(12), caption: cap(12), alt: alt(12) },
          { src: src(13), caption: cap(13), alt: alt(13) },
          { src: src(14), caption: cap(14), alt: alt(14) },
          { src: src(15), caption: cap(15), alt: alt(15) },
          { src: src(16), caption: cap(16), alt: alt(16) },
          { src: src(17), caption: cap(17), alt: alt(17) },
        ].filter((x) => x.src),
      },
      { title: "生产装配", items: [{ src: src(0), caption: cap(0), alt: alt(0) }].filter((x) => x.src) },
      { title: "整机外观", items: [{ src: src(3), caption: cap(3), alt: alt(3) }].filter((x) => x.src) },
      { title: "交付准备", items: [{ src: src(2), caption: cap(2), alt: alt(2) }].filter((x) => x.src) },
      { title: "部件细节", items: [{ src: src(4), caption: cap(4), alt: alt(4) }].filter((x) => x.src) },
      {
        title: "测试验证",
        items: [
          { src: src(18), caption: cap(18), alt: alt(18) },
        ].filter((x) => x.src),
      },
      {
        title: "产业化证明",
        items: [
          { src: src(19), caption: cap(19), alt: alt(19) },
          { src: src(20), caption: cap(20), alt: alt(20) },
        ].filter((x) => x.src),
      },
      { title: "现场应用", items: [{ src: src(1), caption: cap(1), alt: alt(1) }].filter((x) => x.src) },
    ];
  }, [base.gallery, base.titleZh]);
  const mergedGalleryItems = useMemo(
    () => galleryGroups.flatMap((group) => group.items),
    [galleryGroups],
  );
  const featuredProductsGalleryItems = useMemo(
    () =>
      galleryGroups
        .filter((group) => ["代表性产品"].includes(group.title))
        .flatMap((group) => group.items),
    [galleryGroups],
  );
  const onsiteUsageGalleryItems = useMemo(
    () =>
      galleryGroups
        .filter((group) => ["产品现场使用"].includes(group.title))
        .flatMap((group) => group.items),
    [galleryGroups],
  );
  const performanceResultsGalleryItems = useMemo(
    () =>
      galleryGroups
        .filter((group) => ["测试验证"].includes(group.title))
        .flatMap((group) => group.items),
    [galleryGroups],
  );
  const industrialProofGalleryItems = useMemo(
    () =>
      galleryGroups
        .filter((group) => ["产业化证明"].includes(group.title))
        .flatMap((group) => group.items),
    [galleryGroups],
  );

  return (
    <div className="space-y-8 md:space-y-10">
      <motion.section
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="panel-shell"
      >
        <div className="p-5 md:p-7">
          <div className="relative mb-5 h-56 w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] md:mb-6 md:h-72">
            {base.cover ? (
              <Image
                src={assetPath(base.cover)}
                alt={base.titleZh}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            ) : null}
          </div>

          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-[var(--text)] md:text-3xl">
                {base.titleZh}
              </h1>
              {base.titleEn ? <p className="mt-1 text-sm text-[var(--muted)]">{base.titleEn}</p> : null}
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{base.briefZh}</p>
              <p className="mt-3 text-sm font-medium text-[var(--text)]">{reidDeviceShowcaseContent.heroValue}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {reidDeviceShowcaseContent.kpiCards.map((kpi, idx) => (
                <motion.article
                  key={kpi.label}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.38, ease: "easeOut", delay: idx * 0.05 }}
                  whileHover={reduceMotion ? {} : { y: -4, scale: 1.01 }}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 transition-shadow hover:shadow-md"
                >
                  <div className="text-xs text-[var(--muted)]">{kpi.label}</div>
                  <div className="mt-1 text-2xl font-semibold text-[var(--text)]">{kpi.value}</div>
                  <div className="mt-1 text-xs text-[var(--text-secondary)]">{kpi.note}</div>
                </motion.article>
              ))}
            </div>

          </div>
        </div>
      </motion.section>

      <motion.section
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
        className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 md:p-5"
      >
        <div className="grid grid-cols-2 gap-3 md:mx-auto md:max-w-4xl md:grid-cols-4 md:gap-4">
          {[
            { id: "overview", label: "概览" },
            { id: "product", label: "产品与参数" },
            { id: "delivery", label: "交付与证明" },
            { id: "contact", label: "咨询合作" },
          ].map((tab, idx) => (
            <motion.button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as "overview" | "product" | "delivery" | "contact")}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: idx * 0.04 }}
              whileHover={reduceMotion ? {} : { y: -2, scale: 1.02 }}
              whileTap={reduceMotion ? {} : { scale: 0.98 }}
              className={[
                "rounded-full border px-5 py-2.5 text-base text-center transition md:px-6 md:py-3",
                activeTab === tab.id
                  ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--accent-soft)]",
              ].join(" ")}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {activeTab === "overview" ? (
            <motion.div
              key="tab-overview"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
              exit={reduceMotion ? {} : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="mt-4 space-y-4"
            >
            <section className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 md:p-5">
              <h2 className="text-lg font-semibold text-[var(--text)]">信任背书</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {reidDeviceShowcaseContent.trustBadges.map((x, idx) => (
                  <motion.span
                    key={x}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.65 }}
                    transition={{ duration: 0.25, ease: "easeOut", delay: idx * 0.03 }}
                    whileHover={reduceMotion ? {} : { y: -2 }}
                    className="inline-flex rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-3 py-1.5 text-xs text-[var(--text-secondary)]"
                  >
                    {x}
                  </motion.span>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 md:p-5">
              <h2 className="text-lg font-semibold text-[var(--text)]">目标客户</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {reidDeviceShowcaseContent.clientTypes.map((x, idx) => (
                  <motion.article
                    key={x.title}
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.3, ease: "easeOut", delay: idx * 0.04 }}
                    whileHover={reduceMotion ? {} : { y: -3 }}
                    className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 transition-shadow hover:shadow-md"
                  >
                    <div className="text-sm font-semibold text-[var(--text)]">{x.title}</div>
                    <div className="mt-2 text-sm text-[var(--text-secondary)]">{x.detail}</div>
                  </motion.article>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 md:p-5">
              <h2 className="text-lg font-semibold text-[var(--text)]">核心优势</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {reidDeviceShowcaseContent.advantageCards.map((x, idx) => (
                  <motion.article
                    key={x.title}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.32, ease: "easeOut", delay: idx * 0.04 }}
                    whileHover={reduceMotion ? {} : { y: -4, scale: 1.01 }}
                    className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 transition-shadow hover:shadow-md"
                  >
                    <div
                      className={[
                        "text-sm font-semibold",
                        idx % 4 === 0
                          ? "text-sky-300"
                          : idx % 4 === 1
                            ? "text-cyan-300"
                            : idx % 4 === 2
                              ? "text-violet-300"
                              : "text-emerald-300",
                      ].join(" ")}
                    >
                      {x.title}
                    </div>
                    <div className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{x.desc}</div>
                  </motion.article>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 md:p-5">
              <h2 className="text-lg font-semibold text-[var(--text)]">应用场景</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {reidDeviceShowcaseContent.topScenes.map((scene, idx) => (
                  <motion.article
                    key={scene.name}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.28 }}
                    transition={{ duration: 0.3, ease: "easeOut", delay: idx * 0.03 }}
                    whileHover={reduceMotion ? {} : { y: -4 }}
                    className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 transition-shadow hover:shadow-md"
                  >
                    <div className="text-base font-semibold text-[var(--text)]">{scene.name}</div>
                    <div className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{scene.value}</div>
                    <div className="mt-3 text-xs text-[var(--muted)]">{scene.recommend}</div>
                  </motion.article>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-3">
                <button
                  type="button"
                  onClick={() => setMoreScenesOpen((v) => !v)}
                  className="flex w-full items-center justify-between rounded-lg px-1 text-left text-sm font-medium text-[var(--text)]"
                >
                  <span>更多场景</span>
                  <span className="text-xs text-[var(--muted)]">{moreScenesOpen ? "收起" : "展开"}</span>
                </button>

                <AnimatePresence initial={false}>
                  {moreScenesOpen ? (
                    <motion.div
                      key="more-scenes-cards"
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={reduceMotion ? {} : { height: "auto", opacity: 1 }}
                      exit={reduceMotion ? {} : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {reidDeviceShowcaseContent.moreScenes.map((x, idx) => (
                          <motion.article
                            key={x}
                            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                            transition={{ duration: 0.24, ease: "easeOut", delay: idx * 0.025 }}
                            whileHover={reduceMotion ? {} : { y: -2 }}
                            className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-xs text-[var(--text-secondary)] transition-shadow hover:shadow-sm"
                          >
                            {x}
                          </motion.article>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </section>

            </motion.div>
          ) : null}

          {activeTab === "product" ? (
            <motion.div
              key="tab-product"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
              exit={reduceMotion ? {} : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="mt-4 space-y-4"
            >
            <section id="product-matrix" className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 md:p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-[var(--text)]">产品矩阵</h2>
                <div className="text-xs text-[var(--muted)]">按系列查看型号与适配场景</div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {reidDeviceShowcaseContent.productGroups.map((group) => (
                  <motion.button
                    key={group.id}
                    type="button"
                    onClick={() => {
                      setActiveGroup(group.id);
                      setExpandedModel(null);
                    }}
                    whileHover={reduceMotion ? {} : { y: -2, scale: 1.02 }}
                    whileTap={reduceMotion ? {} : { scale: 0.97 }}
                    className={[
                      "rounded-full border px-3 py-1.5 text-sm transition",
                      activeGroup === group.id
                        ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                        : "border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--accent-soft)]",
                    ].join(" ")}
                  >
                    {group.label}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait" initial={false}>
                {currentGroup ? (
                  <motion.div
                    key={currentGroup.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                    exit={reduceMotion ? {} : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                    className="mt-3"
                  >
                    <div className="mb-2 text-sm text-[var(--text-secondary)]">{currentGroup.subtitle}</div>
                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                      {currentGroup.products.map((p, idx) => {
                        const expanded = expandedModel === p.model;
                        return (
                          <motion.article
                            key={p.model}
                            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                            transition={{ duration: 0.28, ease: "easeOut", delay: idx * 0.03 }}
                            whileHover={reduceMotion ? {} : { y: -4 }}
                            className="group rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 transition hover:border-[var(--accent)]/50 hover:shadow-md"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="text-base font-semibold text-[var(--text)]">{p.model}</h3>
                                <div className="text-sm text-[var(--muted)]">{p.spec}</div>
                              </div>
                              <button
                                type="button"
                                onClick={() => setExpandedModel(expanded ? null : p.model)}
                                className="rounded-md border border-[var(--border)] px-2 py-1 text-xs text-[var(--text-secondary)] md:hidden"
                              >
                                {expanded ? "收起" : "展开"}
                              </button>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {p.scenes.map((tag) => (
                                <span key={`${p.model}-${tag}`} className="rounded-full bg-[var(--accent-soft)] px-2 py-1 text-xs text-[var(--accent)]">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <p
                              className={[
                                "mt-3 text-sm leading-6 text-[var(--text-secondary)]",
                                expanded ? "block" : "hidden md:block",
                              ].join(" ")}
                            >
                              {p.summary}
                            </p>
                          </motion.article>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </section>

            <section className="grid gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 md:grid-cols-3 md:p-5">
              {[
                { label: "气泡粒径", value: "50-1000nm" },
                { label: "气泡个数", value: "10^9 个/mL" },
                { label: "羟基自由基", value: "110-350 umol/L" },
              ].map((x, idx) => (
                <motion.article
                  key={x.label}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.3, ease: "easeOut", delay: idx * 0.04 }}
                  whileHover={reduceMotion ? {} : { y: -3 }}
                  className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-4"
                >
                  <div className="text-xs text-[var(--muted)]">{x.label}</div>
                  <div className="mt-1 text-2xl font-semibold text-[var(--text)]">{x.value}</div>
                </motion.article>
              ))}
            </section>
            </motion.div>
          ) : null}

          {activeTab === "delivery" ? (
            <motion.div
              key="tab-delivery"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
              exit={reduceMotion ? {} : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="mt-4 space-y-4"
            >
            <section className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 md:p-5">
              <h2 className="text-lg font-semibold text-[var(--text)]">工程交付流程</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-5">
                {reidDeviceShowcaseContent.deliverySteps.map((x, idx) => (
                  <motion.article
                    key={x.step}
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.3, ease: "easeOut", delay: idx * 0.04 }}
                    whileHover={reduceMotion ? {} : { y: -3 }}
                    className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 transition-shadow hover:shadow-md"
                  >
                    <div className="text-xs text-[var(--muted)]">STEP {x.step}</div>
                    <div className="mt-1 text-sm font-semibold text-[var(--text)]">{x.title}</div>
                    <div className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">{x.desc}</div>
                  </motion.article>
                ))}
              </div>
            </section>

            <section className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 md:p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-[var(--text)]">图集与证明材料</h2>
                <div className="text-xs text-[var(--muted)]">分类画廊 / 支持点击放大</div>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { id: "featured-products", label: "代表性产品" },
                  { id: "onsite-usage", label: "产品现场使用" },
                  { id: "performance-results", label: "性能测试结果" },
                  { id: "industrial-proof", label: "产业化证明" },
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    type="button"
                    onClick={() =>
                      setActiveGalleryTab(
                        tab.id as
                          | "featured-products"
                          | "onsite-usage"
                          | "performance-results"
                          | "industrial-proof",
                      )
                    }
                    whileHover={reduceMotion ? {} : { y: -2, scale: 1.02 }}
                    whileTap={reduceMotion ? {} : { scale: 0.98 }}
                    className={[
                      "rounded-full border px-3 py-1.5 text-sm transition",
                      activeGalleryTab === tab.id
                        ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                        : "border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--accent-soft)]",
                    ].join(" ")}
                  >
                    {tab.label}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeGalleryTab}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                  exit={reduceMotion ? {} : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                  className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-3"
                >
                  <LightboxGallery
                    items={
                      activeGalleryTab === "featured-products"
                        ? featuredProductsGalleryItems.length
                          ? featuredProductsGalleryItems
                          : mergedGalleryItems
                        : activeGalleryTab === "onsite-usage"
                          ? onsiteUsageGalleryItems.length
                            ? onsiteUsageGalleryItems
                            : mergedGalleryItems
                          : activeGalleryTab === "performance-results"
                            ? performanceResultsGalleryItems.length
                              ? performanceResultsGalleryItems
                              : mergedGalleryItems
                            : industrialProofGalleryItems.length
                              ? industrialProofGalleryItems
                              : mergedGalleryItems
                    }
                    layout="grid-3"
                    showHeader={false}
                  />
                </motion.div>
              </AnimatePresence>
            </section>

            </motion.div>
          ) : null}

          {activeTab === "contact" ? (
            <motion.div
              key="tab-contact"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
              exit={reduceMotion ? {} : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="mt-4"
            >
            <section className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5">
              <h2 className="text-xl font-semibold text-[var(--text)]">立即推进项目咨询</h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                面向环保、水处理、农业水产与工业客户，提供从选型到交付的完整支持。
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href="#product-matrix" className={buttonClassName("primary", "px-4 py-2 text-sm")} onClick={() => setActiveTab("product")}>
                  获取方案
                </a>
                <Link href="/#join" className={buttonClassName("secondary", "px-4 py-2 text-sm")}>
                  联系我们
                </Link>
                {base.locationUrl ? (
                  <a
                    href={base.locationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClassName("secondary", "px-4 py-2 text-sm")}
                  >
                    地图导航
                  </a>
                ) : null}
              </div>
            </section>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.section>
    </div>
  );
}

