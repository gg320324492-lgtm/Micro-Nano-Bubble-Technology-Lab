// src/components/SiteHeader.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/Container";
import { navItems as NAV } from "@/data/site";
import { assetPath } from "@/lib/assetPath";

type NavItem = { href: string; zh: string; en: string };

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: NavItem[] = useMemo(() => {
    return NAV.filter((x) => x.href !== "/contact").map((x) => ({
      href: x.href,
      zh: x.zh,
      en: x.en,
    }));
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-[var(--border)] shadow-lg"
          : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Desktop */}
        <div className="relative hidden min-h-[88px] items-center py-3 md:flex">
          {/* Left: Brand with university + lab */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-4"
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
                <div className="mt-1 inline-block text-sm md:text-base text-[var(--text-secondary)] tracking-[0.02em] leading-tight whitespace-nowrap">
                  Micro &amp; Nano Bubble Technology Lab, Tianjin University
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Middle: centered nav */}
          <nav className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-6">
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
                        className={`text-base md:text-[1.05rem] font-semibold transition-colors ${
                          active
                            ? "text-[var(--accent)]"
                            : "text-[var(--text-secondary)] hover:text-[var(--accent)]"
                        }`}
                      >
                        {item.zh}
                      </span>
                      <span className="mt-0.5 text-[11px] text-[var(--text-secondary)] tracking-wide">
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
                className="relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] px-7 py-2.5 text-sm md:text-base font-semibold text-white shadow-md hover:shadow-lg transition-all"
              >
                <span className="relative z-10 whitespace-nowrap">
                  联系我们 / 加入我们
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center justify-between gap-3 py-4">
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
            className="md:hidden border-t border-[var(--border)] bg-white/95 backdrop-blur-xl overflow-hidden"
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
