import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const TARGET_DIRS = [
  "public/home",
  "public/people",
  "public/research",
  "public/industrialization",
  "public/showcase",
];

const SOURCE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const VARIANT_RE = /\.(thumb|main|full)\.webp$/i;

const COMMON_VARIANTS = [
  { suffix: "thumb", max: 640, quality: 72 },
  { suffix: "main", max: 1400, quality: 78 },
  { suffix: "full", max: 2200, quality: 82 },
];

const AVATAR_VARIANTS = [{ suffix: "thumb", max: 256, quality: 72 }];

function isPeopleImage(absPath) {
  return absPath.includes(`${path.sep}public${path.sep}people${path.sep}`);
}

function isSourceImage(absPath) {
  const ext = path.extname(absPath).toLowerCase();
  if (!SOURCE_EXTS.has(ext)) return false;
  if (VARIANT_RE.test(absPath)) return false;
  return true;
}

async function walk(dirAbs) {
  const entries = await fs.readdir(dirAbs, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const p = path.join(dirAbs, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(p)));
    } else if (entry.isFile() && isSourceImage(p)) {
      files.push(p);
    }
  }

  return files;
}

function outputPath(absPath, suffix) {
  const ext = path.extname(absPath);
  return absPath.slice(0, -ext.length) + `.${suffix}.webp`;
}

async function transform(srcAbs, destAbs, max, quality) {
  await sharp(srcAbs, { limitInputPixels: false })
    .rotate()
    .resize({
      width: max,
      height: max,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality, effort: 4 })
    .toFile(destAbs);
}

function toMB(bytes) {
  return (bytes / 1024 / 1024).toFixed(2);
}

async function main() {
  const sourceFiles = [];

  for (const rel of TARGET_DIRS) {
    const abs = path.join(ROOT, rel);
    try {
      const stat = await fs.stat(abs);
      if (!stat.isDirectory()) continue;
      sourceFiles.push(...(await walk(abs)));
    } catch {
      // 忽略不存在目录
    }
  }

  let generated = 0;
  let skipped = 0;
  for (const srcAbs of sourceFiles) {
    const variants = isPeopleImage(srcAbs) ? AVATAR_VARIANTS : COMMON_VARIANTS;
    for (const v of variants) {
      const out = outputPath(srcAbs, v.suffix);
      try {
        await transform(srcAbs, out, v.max, v.quality);
        generated += 1;
      } catch (err) {
        skipped += 1;
        console.warn(`[skip] ${srcAbs} -> ${v.suffix}: ${err?.message || err}`);
      }
    }
  }

  // 汇总大小
  const allImageFiles = [];
  for (const rel of TARGET_DIRS) {
    const abs = path.join(ROOT, rel);
    try {
      const stat = await fs.stat(abs);
      if (!stat.isDirectory()) continue;
      const walked = await walk(abs);
      allImageFiles.push(...walked);
      // 额外收集衍生 webp
      const stack = [abs];
      while (stack.length) {
        const cur = stack.pop();
        const entries = await fs.readdir(cur, { withFileTypes: true });
        for (const entry of entries) {
          const p = path.join(cur, entry.name);
          if (entry.isDirectory()) stack.push(p);
          else if (entry.isFile() && VARIANT_RE.test(p)) allImageFiles.push(p);
        }
      }
    } catch {
      // ignore
    }
  }

  const uniq = Array.from(new Set(allImageFiles));
  let total = 0;
  for (const f of uniq) {
    const st = await fs.stat(f);
    total += st.size;
  }

  console.log(`optimized source images: ${sourceFiles.length}`);
  console.log(`generated variants: ${generated}`);
  console.log(`skipped variants: ${skipped}`);
  console.log(`optimized dirs image total: ${toMB(total)} MB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
