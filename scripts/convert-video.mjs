import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import ffmpegPath from "ffmpeg-static";

function usage() {
  console.log(
    [
      "Usage:",
      "  node scripts/convert-video.mjs <inputPath> <outputRelativePath>",
      "",
      "Example:",
      '  node scripts/convert-video.mjs "c:\\\\Users\\\\admin\\\\Desktop\\\\t2-0.5.avi" "public/research/bubble-nucleation-equipment/t2-0.5.mp4"',
    ].join("\n"),
  );
}

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: "inherit" });
    p.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} exited with code ${code}`));
    });
  });
}

async function main() {
  const [, , inputRaw, outRelRaw] = process.argv;
  if (!inputRaw || !outRelRaw) {
    usage();
    process.exit(1);
  }

  if (!ffmpegPath) {
    throw new Error("ffmpeg-static did not provide a binary for this platform.");
  }

  const input = path.resolve(inputRaw);
  const outAbs = path.resolve(process.cwd(), outRelRaw);
  const outDir = path.dirname(outAbs);

  await fs.mkdir(outDir, { recursive: true });

  // H.264 + AAC for broad browser support
  const args = [
    "-y",
    "-i",
    input,
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-preset",
    "veryfast",
    "-crf",
    "23",
    "-c:a",
    "aac",
    "-b:a",
    "128k",
    "-movflags",
    "+faststart",
    outAbs,
  ];

  console.log(`[video] converting:\n  in : ${input}\n  out: ${outAbs}`);
  await run(ffmpegPath, args);
  console.log("[video] done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

