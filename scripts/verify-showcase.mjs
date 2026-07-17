// Verifies the live reid-device-tianjin showcase page after the
// trust-badge & cover image update.
//
// Checks:
//   1. Page returns 200 with the expected title and brief text.
//   2. Cover <img> resolves to /industrialization/reid-device-tianjin/cover.jpg
//      (NOT g02.jpg), and the image actually loads (status < 400, decoded).
//   3. The cover container has aspect-[4/3] applied (computed style assert),
//      and the rendered cover box has roughly the natural 4:3 ratio.
//   4. Trust badges show the updated values:
//        海棠基金投资：350万
//        生产线：2条
//        到账金额：200万元
//   5. Captures a full-page screenshot to ./verify-output.png for visual check.

import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const URL = "https://mnb-lab.cn/industrialization/reid-device-tianjin/";
const OUT_DIR = path.resolve("./verify-output");

function pad(s, n) { return String(s).padEnd(n); }

async function check(label, ok, detail = "") {
  const tag = ok ? "✅" : "❌";
  console.log(`${tag} ${pad(label, 40)} ${detail}`);
  return ok;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();

  const failures = [];
  const note = async (label, ok, detail) => {
    if (!(await check(label, ok, detail))) failures.push(label);
  };

  // Track network so we can verify the actual <img> src returns 200
  const imageResponses = [];
  page.on("response", (resp) => {
    const url = resp.url();
    if (/\/industrialization\/reid-device-tianjin\//.test(url)) {
      imageResponses.push({ url, status: resp.status() });
    }
  });

  console.log(`\n▶ Navigating to ${URL}\n`);
  const resp = await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
  await note("Page returns 200", resp && resp.status() === 200, `(got ${resp?.status()})`);

  // ---- 1. Title + brief ----
  const titleZh = (await page.locator("h1").first().textContent())?.trim();
  await note("H1 contains '瑞德智创新技术'", /瑞德智创新技术/.test(titleZh ?? ""), `(got "${titleZh}")`);
  await note("English subtitle present", /Device Manufacturing Base/.test((await page.locator("h1 ~ p").first().textContent()) ?? ""));

  // ---- 2. Cover image src & load ----
  const coverImg = page.locator("img").filter({
    has: page.locator("xpath=self::*[contains(@src, 'reid-device-tianjin')]"),
  });
  // The image may be served via Next's /_next/image optimizer; resolve via natural URL.
  const coverSrcRaw = await coverImg.first().getAttribute("src");
  await note(
    "Cover <img> src points to cover.*",
    /cover\.(jpg|webp|png)(\?|$)/.test(coverSrcRaw ?? ""),
    `(got "${coverSrcRaw}")`,
  );
  await note(
    "Cover src is NOT g02.jpg",
    !/g02/.test(coverSrcRaw ?? ""),
  );

  // Wait for the image to actually decode & verify natural width/height
  await coverImg.first().waitFor({ state: "visible", timeout: 10000 });
  const naturalSize = await coverImg.first().evaluate((img) => ({
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight,
    complete: img.complete,
  }));
  await note(
    "Cover <img> decoded (naturalWidth > 0)",
    naturalSize.naturalWidth > 0 && naturalSize.naturalHeight > 0,
    `(${naturalSize.naturalWidth}x${naturalSize.naturalHeight})`,
  );

  // ---- 3. Aspect ratio of cover container ----
  const coverBox = await coverImg.first().evaluate((img) => {
    const parent = img.closest("div");
    if (!parent) return null;
    const rect = parent.getBoundingClientRect();
    const style = window.getComputedStyle(parent);
    return {
      width: rect.width,
      height: rect.height,
      aspectRatio: style.aspectRatio,
      classes: parent.className,
    };
  });
  if (!coverBox) {
    await note("Cover container found", false);
  } else {
    await note("Cover container has aspect-[4/3] (CSS aspect-ratio)", coverBox.aspectRatio === "4 / 3", `(got "${coverBox.aspectRatio}")`);
    await note(
      "Rendered cover box ratio ≈ 4:3 (within 5%)",
      Math.abs(coverBox.width / coverBox.height - 4 / 3) < 0.05,
      `(W=${coverBox.width.toFixed(0)} H=${coverBox.height.toFixed(0)} ratio=${(coverBox.width / coverBox.height).toFixed(3)})`,
    );
  }

  // ---- 4. Trust badges ----
  // The badges are inline-flex <span> elements inside the 信任背书 section.
  const expectedBadges = [
    "海棠基金投资：350万",
    "生产线：2条",
    "到账金额：200万元",
  ];
  for (const badge of expectedBadges) {
    const found = await page.getByText(badge, { exact: false }).first().isVisible();
    await note(`Trust badge: ${badge}`, found);
  }

  // Make sure the OLD values are gone
  for (const stale of ["海棠基金投资：50万", "生产线：1条", "到账金额：95万"]) {
    const stillThere = await page.getByText(stale, { exact: false }).count();
    await note(`Stale value removed: ${stale}`, stillThere === 0, `(found ${stillThere})`);
  }

  // ---- 5. Static-asset network check ----
  console.log("\n▶ Image responses captured during load:");
  for (const r of imageResponses) {
    console.log(`   ${r.status === 200 ? "✅" : "❌"} ${r.status}  ${r.url}`);
    if (r.status >= 400) failures.push(`Asset ${r.url} returned ${r.status}`);
  }

  // ---- 6. Screenshots ----
  const fullPath = path.join(OUT_DIR, "showcase-full.png");
  await page.screenshot({ path: fullPath, fullPage: true });
  console.log(`\n📸 full-page screenshot → ${fullPath}`);

  const coverPath = path.join(OUT_DIR, "showcase-cover.png");
  // First hero panel
  const hero = page.locator("section").first();
  await hero.screenshot({ path: coverPath });
  console.log(`📸 hero screenshot    → ${coverPath}`);

  await browser.close();

  // ---- Verdict ----
  console.log("\n════════════════════════════════════════════");
  if (failures.length === 0) {
    console.log("✅ All checks passed.");
    process.exit(0);
  } else {
    console.log(`❌ ${failures.length} failure(s):`);
    failures.forEach((f) => console.log(`   - ${f}`));
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Verification crashed:", err);
  process.exit(2);
});
