// Resize full-size originals into web-ready files in public/gallery/ and write
// lib/gallery-data.json (size, blur placeholder, which set a photo belongs to,
// and whether text over it should be light or dark).
//
// Two sets: "feed" is everything on The Feed, from the Drive download in
// inspo/; "studio" is the handful in images/ used on the Studio page. A photo
// in both is kept once, as "feed".
//
// Usage: node scripts/optimize-images.mjs

import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SETS = [
  { set: "studio", dir: "images", max: 2400 },
  { set: "feed", dir: "inspo/drive-download-20261007T134724Z-1-001", max: 1600 },
];
const OUT = "public/gallery";

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

// Whether text over the bottom-left of the photo, where the client's name
// sits, should be light or dark.
async function captionTone(input) {
  const N = 48;
  const px = await input.clone().resize(N, N, { fit: "fill" }).removeAlpha().raw().toBuffer();
  let luminance = 0;
  let n = 0;
  for (let y = Math.ceil(N * 0.82); y < N; y++)
    for (let x = 0; x <= N * 0.7; x++) {
      const i = (y * N + x) * 3;
      luminance += (0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) / 255;
      n++;
    }
  return luminance / n < 0.6 ? "light" : "dark";
}

// "VM32839 (2).jpg" -> "vm32839-2"
const slug = (file) =>
  path.parse(file).name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const data = {};
for (const { set, dir, max } of SETS) {
  for (const file of (await readdir(dir)).filter((f) => /\.jpe?g$/i.test(f)).sort()) {
    const id = slug(file);
    if (data[id] && data[id].file !== file && data[id].set === set)
      throw new Error(`Two files in ${dir} share the id ${id}`);
    const input = sharp(path.join(dir, file)).rotate();

    const { width, height } = await input
      .clone()
      .resize({ width: max, height: max, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(path.join(OUT, `${id}.jpg`));

    const blur = await input.clone().resize(16).jpeg({ quality: 50 }).toBuffer();

    data[id] = {
      src: `/gallery/${id}.jpg`,
      file,
      set,
      width,
      height,
      blurDataURL: `data:image/jpeg;base64,${blur.toString("base64")}`,
      tone: await captionTone(input),
    };
    console.log(set, id, `${width}x${height}`);
  }
}

await writeFile("lib/gallery-data.json", JSON.stringify(data, null, 2) + "\n");
