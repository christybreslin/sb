"""Cut the red STUDIO BORNE wordmark out of the full logo artwork.

Usage: python3 scripts/extract-logo.py <source.jpg> <out.png>

The letters are the only saturated red in the artwork (near-zero green), while
the cream blob, tan outline and white ground all carry plenty of green, so the
green channel alone gives a clean, anti-aliased mask.
"""
import sys

from PIL import Image

src, out = sys.argv[1], sys.argv[2]
RED = (204, 0, 0)

im = Image.open(src).convert("RGB")
r, g, _ = im.split()
alpha = g.point(lambda v: max(0, min(255, round((150 - v) * 255 / 110))))
# ignore anything that is dark rather than red
alpha = Image.composite(alpha, Image.new("L", im.size, 0), r.point(lambda v: 255 if v > 120 else 0))

# Find horizontal bands of ink; the two tallest are STUDIO and BORNE, the
# shorter ones below are the tagline.
w, h = im.size
rows = alpha.resize((1, h), Image.BOX).load()
bands, start = [], None
for y in range(h):
    on = rows[0, y] > 2
    if on and start is None:
        start = y
    elif not on and start is not None:
        bands.append((start, y))
        start = None
bands = sorted(sorted(bands, key=lambda b: b[1] - b[0])[-2:])
top, bottom = bands[0][0], bands[1][1]

strip = alpha.crop((0, top, w, bottom))
left, _, right, _ = strip.getbbox()
mask = alpha.crop((left, top, right, bottom))

logo = Image.new("RGBA", mask.size, RED + (0,))
logo.putalpha(mask)
logo.save(out, optimize=True)
print(out, logo.size)
