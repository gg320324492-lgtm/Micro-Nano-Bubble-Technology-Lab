// src/components/SiteFooter.tsx
import Link from "next/link";
import Container from "@/components/Container";
import * as contactModule from "@/data/contact";
import { navItems } from "@/data/site";

type ContactLike = {
  email?: string;
  addressZh?: string;
  address?: string;
  websiteZh?: string;
  website?: string;
};

function pickObject(mod: Record<string, unknown>, keys: string[]): ContactLike {
  for (const k of ["default", ...keys]) {
    const v = mod?.[k];
    if (v && typeof v === "object" && !Array.isArray(v)) return v as ContactLike;
  }
  return {};
}

export default function SiteFooter() {
  const contact = pickObject(contactModule as unknown as Record<string, unknown>, ["contact", "contacts"]);
  const footerNavItems = navItems.filter((item) => item.href !== "/contact");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-[#1f417a] bg-[#0f2d5c] text-[#dce8ff]">
      <Container className="py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="text-sm font-semibold text-white">
              微纳米气泡课题组
            </div>
            <div className="mt-1 text-xs text-[#bcd1f7]">
              Micro & Nano Bubble Technology Lab
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#dce8ff]">
              聚焦微纳米气泡技术的机理研究、装备开发与多场景应用。
            </p>
          </div>

          {/* Nav */}
          <div>
            <div className="text-sm font-semibold text-white">导航</div>
            <div className="mt-3 grid gap-2 text-sm text-[#dce8ff]">
              {footerNavItems.map((item) => (
                <Link key={item.href} className="hover:underline hover:text-[#93c5fd]" href={item.href}>
                  {item.zh} {item.en}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-sm font-semibold text-white">联系</div>
            <div className="mt-3 space-y-2 text-sm text-[#dce8ff]">
              <div>
                <span className="text-[#bcd1f7]">Email：</span>
                {contact.email ?? ""}
              </div>
              <div>
                <span className="text-[#bcd1f7]">Address：</span>
                {contact.addressZh ?? contact.address ?? ""}
              </div>
              <div>
                <span className="text-[#bcd1f7]">Website：</span>
                {contact.websiteZh ?? contact.website ?? ""}
              </div>
            </div>

            <div className="mt-4">
              <Link
                href="/contact"
                className="inline-flex rounded-xl border border-[#6f92ca] px-3 py-2 text-sm font-medium text-white hover:bg-[#1a3b73]"
              >
                联系我们 / Join Us
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[#2a4f8d] pt-6 text-xs text-[#bcd1f7] md:flex-row md:items-center md:justify-between">
          <div>© {year} Micro & Nano Bubble Technology Lab. All rights reserved.</div>
          <div className="flex gap-4">
            <Link className="hover:underline hover:text-[#93c5fd]" href="/">
              Home
            </Link>
            <Link className="hover:underline hover:text-[#93c5fd]" href="/publications">
              Publications
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
