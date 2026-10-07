// Render the blob cursors as PNGs at 1x and 2x, so they stay sharp on Retina
// screens (Chrome rasterises SVG cursors at 1x and scales them up).
//
// Usage: node scripts/make-cursors.mjs

import sharp from "sharp";

const BLOB =
  "M317 36C428 30 532 96 556 210C580 324 546 470 428 534C310 598 156 574 84 470C12 366 24 208 108 118C168 54 236 41 317 36Z";

// Same shapes, sizes and colours as the cursors in studio-b/app/globals.css.
const cursors = [
  { name: "blob", size: 18, attrs: `fill="#BC3A12"` },
  { name: "blob-link", size: 26, attrs: `fill="#F0E3C8" stroke="#BC3A12" stroke-width="36"` },
];

for (const c of cursors) {
  for (const scale of [1, 2]) {
    const px = c.size * scale;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 600 600"><path d="${BLOB}" ${c.attrs}/></svg>`;
    const file = `public/cursors/${c.name}${scale === 2 ? "@2x" : ""}.png`;
    await sharp(Buffer.from(svg)).png().toFile(file);
    console.log(file, `${px}px`);
  }
}
