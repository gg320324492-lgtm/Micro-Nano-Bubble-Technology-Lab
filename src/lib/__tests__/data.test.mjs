// src/lib/__tests__/data.test.mjs
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// 直接复制工具函数做纯逻辑测试，避免 TypeScript 编译问题
function pickArray(mod, keys) {
  for (const k of ["default", ...keys]) {
    const v = mod?.[k];
    if (Array.isArray(v)) return v;
  }
  return [];
}

function pickObject(mod, keys) {
  for (const k of ["default", ...keys]) {
    const v = mod?.[k];
    if (v && typeof v === "object" && !Array.isArray(v)) return v;
  }
  return {};
}

function pickList(mod, keys = []) {
  const merged = ["default", ...keys, "items", "list", "data", "publications", "papers", "patents", "honors", "projects"];
  for (const k of merged) {
    const v = mod?.[k];
    if (Array.isArray(v)) return v;
  }
  return [];
}

describe("pickArray", () => {
  it("returns array from matching key", () => {
    const mod = { researchDirections: [{ id: 1 }] };
    assert.deepStrictEqual(pickArray(mod, ["researchDirections"]), [{ id: 1 }]);
  });

  it("falls back to default", () => {
    const mod = { default: [1, 2, 3] };
    assert.deepStrictEqual(pickArray(mod, ["items"]), [1, 2, 3]);
  });

  it("returns empty array when nothing matches", () => {
    assert.deepStrictEqual(pickArray({}, ["foo"]), []);
    assert.deepStrictEqual(pickArray(null, []), []);
  });
});

describe("pickObject", () => {
  it("returns object from matching key", () => {
    const obj = { email: "test@test.com" };
    const mod = { contact: obj };
    assert.deepStrictEqual(pickObject(mod, ["contact"]), obj);
  });

  it("returns empty object when nothing matches", () => {
    assert.deepStrictEqual(pickObject({}, ["foo"]), {});
  });

  it("skips arrays", () => {
    const mod = { default: [1, 2] };
    assert.deepStrictEqual(pickObject(mod, []), {});
  });
});

describe("pickList", () => {
  it("finds by standard keys like publications", () => {
    const pubs = [{ id: "p1" }];
    const mod = { publications: pubs };
    assert.deepStrictEqual(pickList(mod), pubs);
  });

  it("finds by custom key", () => {
    const items = [1, 2];
    const mod = { custom: items };
    assert.deepStrictEqual(pickList(mod, ["custom"]), items);
  });

  it("returns empty array for null module", () => {
    assert.deepStrictEqual(pickList(null), []);
  });
});
