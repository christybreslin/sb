"""Turns the client logos in scripts/client-logos/ into images for the Clients
line on the Studio page.

Each logo was taken from the client's own website. Each keeps its own colours:
any white ground around it is made transparent, then it is trimmed and saved
to public/clients/, and its size is written to lib/clients-data.json.

Run: python3 scripts/make-client-logos.py
"""
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "scripts" / "client-logos"
OUT = ROOT / "public" / "clients"
# Tallest a logo is ever shown, doubled for sharp screens.
MAX_HEIGHT = 240

def unwhite(im):
    """The colour and opacity that, laid over white, give each pixel."""
    out = []
    for r, g, b, _ in im.getdata():
        a = max(255 - r, 255 - g, 255 - b)
        if a == 0:
            out.append((0, 0, 0, 0))
            continue
        k = 255 / a
        out.append(tuple(round(255 - (255 - c) * k) for c in (r, g, b)) + (a,))
    clear = Image.new("RGBA", im.size)
    clear.putdata(out)
    return clear


sizes = {}
for path in sorted(SRC.iterdir()):
    logo = Image.open(path).convert("RGBA")
    if logo.getchannel("A").getextrema()[0] == 255:
        # No transparency: the logo is ink on a white ground. Lift the ink off
        # the white, so each pixel keeps its colour and the white goes clear.
        logo = unwhite(logo)
    box = logo.getchannel("A").point(lambda v: 255 if v > 24 else 0).getbbox()
    logo = logo.crop(box)
    if logo.height > MAX_HEIGHT:
        logo = logo.resize(
            (round(logo.width * MAX_HEIGHT / logo.height), MAX_HEIGHT), Image.LANCZOS
        )
    logo.save(OUT / f"{path.stem}.png", optimize=True)
    sizes[path.stem] = {"src": f"/clients/{path.stem}.png", "width": logo.width, "height": logo.height}
    print(path.stem, logo.size)

(ROOT / "lib" / "clients-data.json").write_text(json.dumps(sizes, indent=2) + "\n")
