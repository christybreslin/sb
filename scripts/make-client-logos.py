"""Turns the client logos in scripts/client-logos/ into images for the Clients
line on the Studio page.

Each logo was taken from the client's own website. Each keeps its own colours:
any plain ground around it (white, or the pale blue behind Harriet and Hera) is
made transparent, then it is trimmed and saved to public/clients/, and its size
is written to lib/clients-data.json. A logo that only exists in white (Queen)
is set in charcoal, or it would vanish on the beige band.

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

# Logos that only come in white, and the colour to set them in instead.
RECOLOUR = {"queen-rose": (72, 65, 60)}


def unground(im):
    """The colour and opacity that, laid over the logo's plain ground, give each
    pixel. The ground is the colour of the top left corner."""
    ground = im.getpixel((0, 0))[:3]
    out = []
    for px in im.getdata():
        a = max(round((g - c) * 255 / g) if g else 0 for c, g in zip(px[:3], ground))
        if a <= 0:
            out.append((0, 0, 0, 0))
            continue
        k = 255 / a
        out.append(tuple(max(0, round(g - (g - c) * k)) for c, g in zip(px[:3], ground)) + (min(a, 255),))
    clear = Image.new("RGBA", im.size)
    clear.putdata(out)
    return clear


sizes = {}
for path in sorted(SRC.iterdir()):
    logo = Image.open(path).convert("RGBA")
    if logo.getchannel("A").getextrema()[0] == 255:
        # No transparency: the logo is ink on a plain ground. Lift the ink off
        # the ground, so each pixel keeps its colour and the ground goes clear.
        logo = unground(logo)
    if path.stem in RECOLOUR:
        ink = Image.new("RGBA", logo.size, RECOLOUR[path.stem] + (255,))
        ink.putalpha(logo.getchannel("A"))
        logo = ink
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
