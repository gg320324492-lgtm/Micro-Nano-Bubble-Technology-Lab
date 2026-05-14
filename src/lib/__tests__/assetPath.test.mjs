// src/lib/__tests__/assetPath.test.mjs
import { describe, it } from "node:test";
import assert from "node:assert/strict";

const BASE_PATH = "";

function assetPath(src) {
  if (!src) return src;
  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:") ||
    src.startsWith("blob:")
  ) {
    return src;
  }
  const normalized = src.startsWith("/") ? src : `/${src}`;
  return `${BASE_PATH}${normalized}`;
}

describe("assetPath", () => {
  it("normalizes path without leading slash", () => {
    assert.equal(assetPath("images/a.jpg"), "/images/a.jpg");
  });

  it("preserves path with leading slash", () => {
    assert.equal(assetPath("/images/a.jpg"), "/images/a.jpg");
  });

  it("returns external URLs unchanged", () => {
    assert.equal(assetPath("https://example.com/a.jpg"), "https://example.com/a.jpg");
    assert.equal(assetPath("http://example.com/a.jpg"), "http://example.com/a.jpg");
  });

  it("returns data URIs unchanged", () => {
    assert.equal(assetPath("data:image/png;base64,abc"), "data:image/png;base64,abc");
  });

  it("returns blob URLs unchanged", () => {
    assert.equal(assetPath("blob:https://example.com/123"), "blob:https://example.com/123");
  });

  it("returns empty string for empty input", () => {
    assert.equal(assetPath(""), "");
  });
});
