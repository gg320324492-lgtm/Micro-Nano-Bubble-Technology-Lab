// src/components/SiteHeader.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { Ma_Shan_Zheng } from "next/font/google";
import Container from "@/components/Container";
import { site, navItems as NAV } from "@/data/site";
import { assetPath } from "@/lib/assetPath";

type NavItem = { href: string; zh: string; en: string };

const maShanZheng = Ma_Shan_Zheng({
  weight: "400",
  display: "swap",
  preload: false,
});

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
      <div className="w-full px-8 2xl:px-12">
        {/* Desktop: 左品牌贴左 + 导航绝对居中 + CTA 贴右 */}
        <div className="relative hidden min-h-[96px] items-center py-3 md:flex">
          {/* Left: Brand */}
          <div className="flex items-center justify-start">
            <div className="flex items-center gap-4">
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

              {/* Lab logo + Title */}
              <Link href="/" className="flex items-center gap-4">
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

                {/* ✅ Desktop：中文行定宽，英文行按同宽两端对齐 */}
                <div className="flex max-w-[920px] flex-col justify-center">
                  <div className="inline-block w-fit min-w-0">
                    <div className="flex w-max flex-nowrap items-baseline gap-3 leading-[1.05] tracking-tight text-slate-900">
                      <span
                        className={`${maShanZheng.className} whitespace-nowrap text-[30px] font-normal tracking-[0.06em] text-slate-900 sm:text-[36px]`}
                      >
                        天津大学
                      </span>
                      <span className="whitespace-nowrap text-[30px] font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-[38px]">
                        微纳米气泡课题组
                      </span>
                    </div>

                    <div className="mt-1 w-full text-justify text-[13px] font-medium leading-[1.25] text-slate-600 [text-align-last:justify] [text-justify:inter-word] sm:text-[16px] font-serif">
                      Micro &amp; Nano Bubble Technology Lab, Tianjin University
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Middle: Nav (center) */}
          <nav className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-10 lg:gap-12">
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
                      ? "after:absolute after:left-0 after:-bottom-3 after:h-[2px] after:w-full after:rounded-full after:bg-gray-900"
                      : "after:absolute after:left-0 after:-bottom-3 after:h-[2px] after:w-0 after:rounded-full after:bg-gray-900 after:transition-all hover:after:w-full",
                  ].join(" ")}
                >
                  <div className="whitespace-nowrap text-[18px] font-semibold leading-[1.1] tracking-[0.02em]">
                    {item.zh}
                  </div>
                  <div className="hidden lg:block whitespace-nowrap text-[12px] text-gray-400 leading-[1.1]">
                    {item.en}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Right: CTA */}
          <div className="ml-auto flex items-center justify-end">
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
            <div className="flex min-w-0 flex-col justify-center">
              <div className="flex min-w-0 flex-wrap items-baseline gap-2 leading-[1.05] tracking-tight text-slate-900">
                <span
                  className={`${maShanZheng.className} whitespace-nowrap text-[24px] font-normal tracking-[0.05em] text-slate-900`}
                >
                  天津大学
                </span>
                <span className="text-[24px] font-extrabold leading-[1.05] tracking-tight text-slate-900">
                  微纳米气泡课题组
                </span>
              </div>
              <div className="mt-1 truncate text-[12px] font-medium leading-[1.25] text-slate-600 font-serif">
                Micro &amp; Nano Bubble Technology Lab, Tianjin University
              </div>
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
