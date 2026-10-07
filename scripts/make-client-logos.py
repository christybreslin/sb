"""Turns the client logos in scripts/client-logos/ into single-colour images
for the Clients line on the Studio page.

Each logo was taken from the client's own website. Here it is reduced to its
shape, trimmed, coloured the site's soft brown and saved to public/clients/,
and its size is written to lib/clients-data.json.

Run: python3 scripts/make-client-logos.py
"""
import json
from pathlib import Path
from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "scripts" / "client-logos"
OUT = ROOT / "public" / "clients"
BROWN = (0x7A, 0x5A, 0x40)
# Tallest a logo is ever shown, doubled for sharp screens.
MAX_HEIGHT = 240

sizes = {}
for path in sorted(SRC.iterdir()):
    im = Image.open(path).convert("RGBA")
    alpha = im.getchannel("A")
    if alpha.getextrema()[0] == 255:
        # No transparency: the logo is dark ink on a white ground, so the
        # darker a pixel, the more solid it becomes.
        ink = ImageChops.invert(im.convert("L"))
        alpha = ink.point(lambda v: min(255, int(v * 2.4)))
    box = alpha.point(lambda v: 255 if v > 24 else 0).getbbox()
    alpha = alpha.crop(box)
    if alpha.height > MAX_HEIGHT:
        alpha = alpha.resize(
            (round(alpha.width * MAX_HEIGHT / alpha.height), MAX_HEIGHT), Image.LANCZOS
        )
    logo = Image.new("RGBA", alpha.size, BROWN + (0,))
    logo.putalpha(alpha)
    logo.save(OUT / f"{path.stem}.png", optimize=True)
    sizes[path.stem] = {"src": f"/clients/{path.stem}.png", "width": logo.width, "height": logo.height}
    print(path.stem, logo.size)

(ROOT / "lib" / "clients-data.json").write_text(json.dumps(sizes, indent=2) + "\n")
