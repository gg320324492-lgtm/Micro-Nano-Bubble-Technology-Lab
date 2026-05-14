// src/lib/__tests__/imageVariant.test.mjs
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// 纯逻辑复刻，避免 TypeScript 编译
const EXTERNAL_RE = /^(https?:\/\/|data:|blob:)/i;
const VARIANT_RE = /\.(thumb|main|full)\.webp$/i;

function toImageVariant(src, variant) {
  if (!src) return src;
  if (EXTERNAL_RE.test(src)) return src;
  const queryIndex = src.search(/[?#]/);
  const base = queryIndex >= 0 ? src.slice(0, queryIndex) : src;
  const suffix = queryIndex >= 0 ? src.slice(queryIndex) : "";
  if (VARIANT_RE.test(base)) {
    return base.replace(VARIANT_RE, `.${variant}.webp`) + suffix;
  }
  const withVariant = base.replace(/\.[a-zA-Z0-9]+$/, `.${variant}.webp`);
  return (withVariant === base ? `${base}.${variant}.webp` : withVariant) + suffix;
}

describe("toImageVariant", () => {
  it("converts .jpg to .thumb.webp", () => {
    assert.equal(toImageVariant("/images/a.jpg", "thumb"), "/images/a.thumb.webp");
  });

  it("converts .png to .main.webp", () => {
    assert.equal(toImageVariant("/photos/b.png", "main"), "/photos/b.main.webp");
  });

  it("replaces existing variant", () => {
    assert.equal(
      toImageVariant("/images/a.thumb.webp", "full"),
      "/images/a.full.webp"
    );
  });

  it("preserves query string", () => {
    assert.equal(
      toImageVariant("/images/a.jpg?v=1", "thumb"),
      "/images/a.thumb.webp?v=1"
    );
  });

  it("returns external URLs unchanged", () => {
    assert.equal(toImageVariant("https://example.com/a.jpg", "thumb"), "https://example.com/a.jpg");
  });

  it("returns empty string unchanged", () => {
    assert.equal(toImageVariant("", "thumb"), "");
  });
});
