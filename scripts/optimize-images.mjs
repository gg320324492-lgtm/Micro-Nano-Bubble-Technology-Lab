import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC_DIR = "assets-src"; // 原图仓库目录（不部署、公网不可访问）
const OUT_DIR = "public";     // 变体输出目录（进构建产物）

const SOURCE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);
const VARIANT_RE = /\.(thumb|main|full)\.webp$/i;

const COMMON_VARIANTS = [
  { suffix: "thumb", max: 640, quality: 72 },
  { suffix: "main", max: 1400, quality: 78 },
  { suffix: "full", max: 2200, quality: 82 },
];

// people 头像：thumb；-detail 大图另出 main（成员详情页用）
// images（荣誉证书等）：thumb（卡片）+ main（大图查看）
function variantsFor(relFromPublic) {
  if (relFromPublic.startsWith("people/")) {
    return /-detail\./.test(relFromPublic)
      ? [{ suffix: "main", max: 1400, quality: 78 }]
      : [{ suffix: "thumb", max: 256, quality: 72 }];
  }
  if (relFromPublic.startsWith("images/honors/")) {
    return [
      { suffix: "thumb", max: 640, quality: 72 },
      { suffix: "main", max: 1400, quality: 78 },
    ];
  }
  if (relFromPublic.startsWith("images/")) {
    return [{ suffix: "thumb", max: 640, quality: 72 }];
  }
  return COMMON_VARIANTS;
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

function outputPath(absSrc, relFromSrc, suffix) {
  const ext = path.extname(relFromSrc);
  const rel = relFromSrc.slice(0, -ext.length) + `.${suffix}.webp`;
  return path.join(ROOT, OUT_DIR, rel);
}

async function transform(srcAbs, destAbs, max, quality) {
  await fs.mkdir(path.dirname(destAbs), { recursive: true });
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

async function isFresh(srcAbs, destAbs, ext) {
  try {
    // 动图 GIF 的源文件偶有损坏头（sharp 读不动），生成过就不再重做
    if (ext === ".gif") {
      await fs.stat(destAbs);
      return true;
    }
    const [srcStat, destStat] = await Promise.all([fs.stat(srcAbs), fs.stat(destAbs)]);
    return destStat.mtimeMs >= srcStat.mtimeMs;
  } catch {
    return false;
  }
}

function toMB(bytes) {
  return (bytes / 1024 / 1024).toFixed(2);
}

async function main() {
  const srcRoot = path.join(ROOT, SRC_DIR);
  let sourceFiles = [];
  try {
    sourceFiles = await walk(srcRoot);
  } catch {
    console.error(`[images:optimize] ${SRC_DIR}/ 不存在，跳过（原图应放在 ${SRC_DIR}/ 下）`);
    return;
  }

  let generated = 0;
  let skipped = 0;
  let cached = 0;
  for (const srcAbs of sourceFiles) {
    const relFromSrc = path.relative(srcRoot, srcAbs).split(path.sep).join("/");
    const ext = path.extname(srcAbs).toLowerCase();
    for (const v of variantsFor(relFromSrc)) {
      const out = outputPath(srcAbs, relFromSrc, v.suffix);
      if (await isFresh(srcAbs, out, ext)) {
        cached += 1;
        continue;
      }
      try {
        await transform(srcAbs, out, v.max, v.quality);
        generated += 1;
      } catch (err) {
        skipped += 1;
        console.warn(`[skip] ${relFromSrc} -> ${v.suffix}: ${err?.message || err}`);
      }
    }
  }

  // 汇总 public 里参与站点的图片体积
  const stack = [path.join(ROOT, OUT_DIR)];
  let total = 0;
  while (stack.length) {
    const cur = stack.pop();
    const entries = await fs.readdir(cur, { withFileTypes: true });
    for (const entry of entries) {
      const p = path.join(cur, entry.name);
      if (entry.isDirectory()) stack.push(p);
      else if (entry.isFile() && /\.(webp|png|jpg|jpeg|gif|avif)$/i.test(entry.name)) {
        const st = await fs.stat(p);
        total += st.size;
      }
    }
  }

  console.log(`source images (${SRC_DIR}/): ${sourceFiles.length}`);
  console.log(`generated variants: ${generated}`);
  console.log(`cached variants: ${cached}`);
  console.log(`skipped variants: ${skipped}`);
  console.log(`public/ image total: ${toMB(total)} MB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
