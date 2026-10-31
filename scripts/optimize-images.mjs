// Pre-renders every image in public/images as WebP at a few widths, so the
// static site can serve sizes that fit the screen instead of the originals.
// Output: public/img-opt/<path>-<width>.webp. Skips files already up to date.
// Also writes src/data/blur.json: a tiny blurred preview per image, shown
// while the real file loads.
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Keep in sync with OPT_WIDTHS in src/lib/imageLoader.ts.
const WIDTHS = [320, 640, 1080, 1600, 2560];
const SRC_DIR = "public/images";
const OUT_DIR = "public/img-opt";
const BLUR_FILE = "src/data/blur.json";
const EXT = /\.(png|jpe?g|webp|avif)$/i;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (EXT.test(entry.name)) yield full;
  }
}

// CI restores img-opt from a cache keyed on the source images' hash, and a
// fresh checkout makes every source look newer, so there existence is enough.
async function isFresh(out, srcMtime) {
  try {
    const { mtimeMs } = await stat(out);
    return Boolean(process.env.CI) || mtimeMs >= srcMtime;
  } catch {
    return false;
  }
}

let made = 0;
const blur = {};
for await (const file of walk(SRC_DIR)) {
  const rel = path.relative(SRC_DIR, file).replace(EXT, "");
  const srcMtime = (await stat(file)).mtimeMs;
  for (const width of WIDTHS) {
    const out = path.join(OUT_DIR, `${rel}-${width}.webp`);
    if (await isFresh(out, srcMtime)) continue;
    await mkdir(path.dirname(out), { recursive: true });
    await sharp(file)
      // WebP tops out at 16383px a side; very tall sheets get capped.
      .resize({ width, height: 16383, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 72 })
      .toFile(out);
    made++;
  }
  // Built from the smallest rendition, so it costs next to nothing.
  const tiny = await sharp(path.join(OUT_DIR, `${rel}-${WIDTHS[0]}.webp`))
    .resize({ width: 16 })
    .webp({ quality: 50 })
    .toBuffer();
  blur[`/${path.relative("public", file)}`] = `data:image/webp;base64,${tiny.toString("base64")}`;
}

const sorted = Object.fromEntries(Object.entries(blur).sort(([a], [b]) => a.localeCompare(b)));
const json = `${JSON.stringify(sorted, null, 2)}\n`;
const previous = await readFile(BLUR_FILE, "utf8").catch(() => "");
if (json !== previous) await writeFile(BLUR_FILE, json);
console.log(`optimize-images: ${made} file(s) written`);
