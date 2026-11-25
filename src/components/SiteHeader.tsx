// src/components/SiteHeader.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/Container";
import { navItems as NAV } from "@/data/site";
import { assetPath } from "@/lib/assetPath";
import { useTheme } from "@/components/useTheme";

type NavItem = { href: string; zh: string; en: string };

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function SiteHeader({
  variant,
}: {
  variant?: "light" | "navy";
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollYRef = useRef(0);
  // 品牌区版式与尺寸（round 19 已选定并固化：R 版式（双 logo 白底方角）× XL）
  // 此前的 G/C/O 版式、切换器与 S/M/L 尺寸已移除
  const brandLayout = "raw" as const;
  const brandSize = "xl" as const;
  // navy 变体（方向 A 深海军蓝）：用户要求全站页眉统一——所有页面一律使用
  // navy 顶栏（品牌白字、深蓝导航、浅蓝 CTA）。variant 仍保留给个别页面强制指定。
  const isNavy = variant ? variant === "navy" : true;
  // 亮/暗主题切换
  const [theme, toggleTheme] = useTheme();

  // 抽屉打开时锁定 body 滚动
  useEffect(() => {
    if (!isNavy) return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, isNavy]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const lastY = lastScrollYRef.current;

      setScrolled(currentY > 20);

      if (open) {
        setHidden(false);
      } else if (currentY <= 40 || currentY < lastY) {
        setHidden(false);
      } else if (currentY > lastY + 4) {
        setHidden(true);
      }

      lastScrollYRef.current = currentY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  const navItems: NavItem[] = useMemo(() => {
    return NAV.filter((x) => x.href !== "/contact").map((x) => ({
      href: x.href,
      zh: x.zh,
      en: x.en,
    }));
  }, []);

  /* ── navy 变体：深蓝顶栏 + 手机抽屉侧边栏（方向 A 已确认稿） ── */
  if (isNavy) {
    return (
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden && !open ? -140 : 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className={`site-header site-header--navy fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "site-header--scrolled shadow-lg" : ""
        }`}
      >
        <div className="flex items-center gap-3 px-4 md:px-12 h-[4.5rem]">
          {/* 品牌（round 17：四版式 × 三尺寸切换，选定后固化） */}
          <Link
            href="/"
            className={`brand brand--${brandLayout} brand--${brandSize} flex items-center min-w-0`}
          >
            <span className="brand__logos flex items-center shrink-0">
              <Image
                src={assetPath("/logos/tju.png")}
                alt="Tianjin University"
                width={40}
                height={40}
                className="brand__logo brand__logo--tju"
                priority
              />
              <Image
                src={assetPath("/logos/lab.png")}
                alt="Micro & Nano Bubble Technology Lab"
                width={40}
                height={40}
                className="brand__logo brand__logo--lab"
                priority
              />
            </span>
            <span className="brand__textblock flex flex-col min-w-0">
              <span className="brand__title">天津大学 微纳米气泡课题组</span>
              <span className="brand__subtitle">Micro &amp; Nano Bubble Technology Lab</span>
            </span>
          </Link>

          {/* 桌面导航 */}
          <nav className="ml-auto hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative shrink-0 whitespace-nowrap px-3.5 py-2 rounded-md text-[0.875rem] font-medium transition-colors ${
                    active ? "text-[var(--navy-ink)]" : "text-[var(--navy-ink-dim)] hover:text-[var(--navy-ink)]"
                  }`}
                >
                  {/* 激活背景胶囊（morph 形变动效：胶囊从中心弹性展开） */}
                  {active ? (
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-md bg-[rgba(var(--navy-accent-rgb),0.16)]"
                      initial={{ opacity: 0, scaleX: 0.35 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ type: "spring", stiffness: 360, damping: 24 }}
                    />
                  ) : null}
                  <span className="relative z-10">{item.zh}</span>
                </Link>
              );
            })}
          </nav>

          {/* 桌面 CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-flex shrink-0 whitespace-nowrap ml-2 px-5 py-2 rounded-md text-[0.875rem] font-semibold bg-[var(--navy-cta-bg)] text-[var(--navy-cta-ink)] hover:bg-[var(--navy-accent-bright)] transition-colors"
          >
            联系我们
          </Link>

          {/* 手机端：联系 + 汉堡 */}
          <Link
            href="/contact"
            className="ml-auto md:hidden px-3.5 py-2 rounded-md text-[0.8125rem] font-semibold bg-[var(--navy-cta-bg)] text-[var(--navy-cta-ink)]"
          >
            联系
          </Link>
          {/* 主题切换按钮（亮/暗） */}
          <button
            type="button"
            className="w-9 h-9 shrink-0 inline-flex items-center justify-center rounded-lg border border-[var(--navy-line)] text-[var(--navy-ink-dim)] hover:text-[var(--navy-ink)] transition-colors"
            aria-label={theme === "dark" ? "切换到亮色主题" : "切换到暗色主题"}
            aria-pressed={theme === "light"}
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              // 太阳（当前暗色，点击切亮）
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              // 月亮（当前亮色，点击切暗）
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[0.3125rem] border border-[var(--navy-line)] rounded-lg"
            aria-label="打开菜单"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <i className="block w-4 h-0.5 bg-[var(--navy-ink)] rounded-sm" />
            <i className="block w-4 h-0.5 bg-[var(--navy-ink)] rounded-sm" />
            <i className="block w-4 h-0.5 bg-[var(--navy-ink)] rounded-sm" />
          </button>
        </div>

        {/* 手机抽屉侧边栏 */}
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                key="drawer-mask"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
                className="drawer-mask md:hidden"
                onClick={() => setOpen(false)}
              />
              <motion.aside
                key="drawer"
                initial={{ x: "102%" }}
                animate={{ x: 0 }}
                exit={{ x: "102%" }}
                transition={{ duration: 0.3, ease: [0.32, 0.72, 0.28, 1] }}
                className="drawer md:hidden"
                aria-label="站内导航"
              >
                <div className="drawer__head">
                  <Image
                    src={assetPath("/logos/tju.png")}
                    alt="Tianjin University"
                    width={28}
                    height={28}
                    className="h-[1.875rem] w-[1.875rem] rounded-[0.3125rem] bg-white p-px object-contain"
                  />
                  <Image
                    src={assetPath("/logos/lab.png")}
                    alt="Micro & Nano Bubble Technology Lab"
                    width={28}
                    height={28}
                    className="h-[1.875rem] w-[1.875rem] rounded-[0.3125rem] bg-white p-px object-contain"
                  />
                  <span className="drawer__head-zh">微纳米气泡课题组</span>
                  <button
                    type="button"
                    className="drawer__close"
                    aria-label="关闭菜单"
                    onClick={() => setOpen(false)}
                  >
                    ✕
                  </button>
                </div>
                <nav className="drawer__nav">
                  {NAV.map((item) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        data-active={active}
                        onClick={() => setOpen(false)}
                      >
                        {item.zh}
                        <em className="en not-italic">{item.en.toUpperCase()}</em>
                      </Link>
                    );
                  })}
                </nav>
                <div className="drawer__foot">
                  <Link
                    href="/research"
                    className="navy-btn navy-btn--main"
                    onClick={() => setOpen(false)}
                  >
                    查看研究方向 →
                  </Link>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </motion.header>
    );
  }

  /* ── light 变体：原有白色玻璃顶栏（其他页面继续使用） ── */
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: hidden && !open ? -140 : 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-[var(--border)] shadow-lg"
          : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Desktop */}
        <div className="hidden w-full min-h-[88px] items-center py-3 md:flex">
          {/* Left: Brand with university + lab */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-4 max-w-[48%]"
          >
            <Link href="/" className="flex items-center gap-3 min-w-0 group">
              {/* 左侧：双徽标（更接近示例图的留白与比例） */}
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-[var(--border)] shadow-sm">
                  <Image
                    src={assetPath("/logos/tju.png")}
                    alt="Tianjin University"
                    fill
                    className="object-contain p-0.5"
                    sizes="56px"
                    priority
                  />
                </div>
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-[var(--border)] shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent-secondary)]/10" />
                  <div className="relative h-full w-full">
                    <Image
                      src={assetPath("/logos/lab.png")}
                      alt="Micro & Nano Bubble Technology Lab"
                      fill
                      className="object-contain p-0.5"
                      sizes="56px"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* 右侧：中英文标题 */}
              <div className="flex flex-col leading-none">
                <div className="inline-block text-[1.4rem] md:text-[2rem] font-extrabold leading-[1.12] text-[var(--text)] whitespace-nowrap">
                  <span className="cn-calligraphy gradient-text mr-1 tracking-[0.22em]">
                    天津大学
                  </span>
                  <span className="text-[var(--accent)] tracking-[0.18em]">
                    微纳米气泡课题组
                  </span>
                </div>
                <div className="mt-1 hidden text-sm md:text-base text-[var(--text-secondary)] tracking-[0.02em] leading-tight whitespace-nowrap lg:inline-block">
                  Micro &amp; Nano Bubble Technology Lab, Tianjin University
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Middle: centered nav */}
          <nav className="flex-1 flex items-center justify-center gap-3 lg:gap-6 px-4">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="relative px-4 py-2 rounded-[var(--radius-sm)]"
                  >
                    <div className="flex flex-col items-center leading-tight">
                      <span
                        className={`text-sm md:text-base lg:text-[1.05rem] font-semibold transition-colors whitespace-nowrap ${
                          active
                            ? "text-[var(--accent)]"
                            : "text-[var(--text-secondary)] hover:text-[var(--accent)]"
                        }`}
                      >
                        {item.zh}
                      </span>
                      <span className="mt-0.5 hidden text-[11px] text-[var(--text-secondary)] tracking-wide lg:block whitespace-nowrap">
                        {item.en}
                      </span>
                    </div>
                    {active && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* Right: CTA */}
          <div className="ml-auto flex items-center">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] px-5 md:px-6 lg:px-7 py-2 text-xs md:text-sm lg:text-base font-semibold text-white shadow-md hover:shadow-lg transition-all"
              >
                <span className="relative z-10 whitespace-nowrap">
                  联系我们 / 加入我们
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex lg:hidden items-center justify-between gap-3 py-4">
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <div className="flex items-center gap-2">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-[var(--border)]">
                <Image
                  src={assetPath("/logos/tju.png")}
                  alt="Tianjin University"
                  fill
                  className="object-contain p-0.5"
                  sizes="48px"
                  priority
                />
              </div>
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-[var(--border)]">
                <Image
                  src={assetPath("/logos/lab.png")}
                  alt="Micro & Nano Bubble Technology Lab"
                  fill
                  className="object-contain p-0.5"
                  sizes="48px"
                  priority
                />
              </div>
            </div>
            <div className="min-w-0">
              <div className="text-sm font-extrabold text-[var(--text)] truncate">
                天津大学 <span className="text-[var(--accent)]">微纳米气泡课题组</span>
              </div>
              <div className="text-[10px] text-[var(--text-secondary)] truncate tracking-wide">
                Micro &amp; Nano Bubble Technology Lab, TJU
              </div>
            </div>
          </Link>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            className="relative rounded-[var(--radius-sm)] border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--accent-soft)] transition-all"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  关闭
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  菜单
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-[var(--border)] bg-white/95 backdrop-blur-xl overflow-hidden"
          >
            <Container className="py-6 space-y-2">
              <motion.a
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                href="https://www.tju.edu.cn/"
                target="_blank"
                rel="noreferrer"
                className="block rounded-[var(--radius-md)] border border-[var(--border)] px-4 py-3 text-sm text-[var(--text-secondary)] hover:bg-[var(--accent-soft)] transition-all"
              >
                天津大学官网
              </motion.a>
              {navItems.map((item, idx) => {
                const active = isActive(pathname, item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-[var(--radius-md)] px-4 py-3 text-sm transition-all ${
                        active
                          ? "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] text-white font-semibold shadow-md"
                          : "text-[var(--text-secondary)] hover:bg-[var(--accent-soft)]"
                      }`}
                    >
                      {item.zh} / {item.en}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 + navItems.length * 0.05 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="block rounded-[var(--radius-md)] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] px-4 py-3 text-sm font-semibold text-white text-center transition-all shadow-lg hover:shadow-xl"
                >
                  联系我们 / 加入我们
                </Link>
              </motion.div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
