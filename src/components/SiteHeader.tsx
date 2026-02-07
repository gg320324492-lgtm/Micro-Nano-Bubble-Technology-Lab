// src/components/SiteHeader.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import Container from "@/components/Container";
import { site, navItems as NAV } from "@/data/site";
import { assetPath } from "@/lib/assetPath";

type NavItem = { href: string; zh: string; en: string };

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems: NavItem[] = useMemo(() => {
    return NAV.filter((x) => x.href !== "/contact").map((x) => ({
      href: x.href,
      zh: x.zh,
      en: x.en,
    }));
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto w-full max-w-screen-2xl px-6">
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center gap-8 h-[96px]">
          <div className="flex items-center justify-start min-w-0">
            <div className="flex items-center gap-4 min-w-0">
              <a
                href="https://www.tju.edu.cn/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center"
                aria-label="Tianjin University"
                title="天津大学"
              >
                <div className="relative h-12 w-12 overflow-hidden rounded-full border bg-white">
                  <Image
                    src={assetPath("/logos/tju.png")}
                    alt="Tianjin University Logo"
                    fill
                    className="object-contain p-1"
                    sizes="48px"
                    priority
                  />
                </div>
              </a>

              <Link href="/" className="flex items-center gap-4 min-w-0">
                <div className="relative h-12 w-12 shrink-0">
                  <Image
                    src={assetPath("/logos/lab.png")}
                    alt="Lab Logo"
                    fill
                    className="object-contain"
                    sizes="48px"
                    priority
                  />
                </div>

                <div className="min-w-0 max-w-[520px] leading-tight">
                  <div className="text-2xl font-extrabold tracking-wide text-gray-900 truncate">
                    微纳米气泡课题组
                  </div>
                  <div className="text-base text-gray-500 truncate">{site.nameEn}</div>
                </div>
              </Link>
            </div>
          </div>

          <nav className="flex items-center justify-center gap-10">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "relative text-center transition",
                    "flex flex-col items-center justify-center",
                    "py-1",
                    active ? "text-gray-900" : "text-gray-600 hover:text-gray-900",
                    active
                      ? "after:absolute after:left-0 after:-bottom-2 after:h-[3px] after:w-full after:rounded-full after:bg-gray-900"
                      : "after:absolute after:left-0 after:-bottom-2 after:h-[3px] after:w-0 after:rounded-full after:bg-gray-900 after:transition-all hover:after:w-full",
                  ].join(" ")}
                >
                  <div className="text-base font-semibold leading-[1.1]">{item.zh}</div>
                  <div className="text-sm text-gray-500 leading-[1.1]">{item.en}</div>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-end">
            <Link
              href="/contact"
              className="whitespace-nowrap rounded-full bg-black px-6 py-3 text-base font-medium text-white hover:bg-black/90 transition"
            >
              联系我们 / 加入我们
            </Link>
          </div>
        </div>

        <div className="md:hidden flex items-center justify-between gap-4 py-4">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border bg-white">
              <Image
                src={assetPath("/logos/tju.png")}
                alt="Tianjin University Logo"
                fill
                className="object-contain p-1"
                sizes="40px"
                priority
              />
            </div>
            <div className="relative h-10 w-10 shrink-0">
              <Image
                src={assetPath("/logos/lab.png")}
                alt="Lab Logo"
                fill
                className="object-contain"
                sizes="40px"
                priority
              />
            </div>
            <div className="min-w-0">
              <div className="text-base font-semibold text-gray-900 truncate">微纳米气泡课题组</div>
              <div className="text-xs text-gray-500 truncate">{site.nameEn}</div>
            </div>
          </Link>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border px-4 py-2.5 text-sm hover:bg-gray-50 transition"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "关闭" : "菜单"}
          </button>
        </div>
      </div>

      {open ? (
        <div className="md:hidden border-t bg-white">
          <Container className="py-4 space-y-2">
            <a
              href="https://www.tju.edu.cn/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-xl border px-4 py-3 hover:bg-gray-50 transition"
            >
              <span className="text-base text-gray-700">天津大学官网</span>
              <div className="relative h-12 w-12 overflow-hidden rounded-full border bg-white">
                <Image
                  src={assetPath("/logos/tju.png")}
                  alt="Tianjin University Logo"
                  fill
                  className="object-contain p-1"
                  sizes="48px"
                  priority
                />
              </div>
            </a>

            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={[
                    "block rounded-xl px-4 py-3 text-base border transition",
                    active ? "bg-black text-white border-black" : "bg-white text-gray-700 hover:bg-gray-50",
                  ].join(" ")}
                >
                  {item.zh} / {item.en}
                </Link>
              );
            })}

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block rounded-xl bg-black px-4 py-3 text-base font-medium text-white text-center hover:bg-black/90 transition"
            >
              联系我们 / 加入我们
            </Link>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
