"""Makes the picture shown when a link to the site is shared (WhatsApp,
iMessage, LinkedIn and so on): the sb logo on linen beside the straw-hat
photo, inside the same thin frame as the site's pages.

The logo is drawn from the paths in components/Logo.tsx, which are only
straight lines, at four times the size and then scaled down for smooth edges.

Run: python3 scripts/make-share-image.py
"""
import re
from pathlib import Path
from PIL import Image, ImageDraw, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "share.jpg"
W, H = 1200, 630
LINEN = (247, 244, 237)
CHARCOAL = (72, 65, 60)
BRICK = (169, 52, 39)
SS = 4  # drawn this many times larger, then scaled down

logo_src = (ROOT / "components" / "Logo.tsx").read_text()
ink = re.search(r'export const INK = "([^"]+)"', logo_src).group(1)
ball = re.search(r'export const BALL = "([^"]+)"', logo_src).group(1)
box = [float(v) for v in re.search(r'LOGO_BOX = "([^"]+)"', logo_src).group(1).split()]


def shapes(d):
    """Each closed shape in a path of M, L and Z commands, as a list of points."""
    return [
        [tuple(map(float, p.split(","))) for p in re.findall(r"-?[\d.]+,-?[\d.]+", part)]
        for part in d.split("Z")
        if part.strip()
    ]


canvas = Image.new("RGB", (W * SS, H * SS), LINEN)

# The photo fills the right half, greyscale and fading in from its left edge,
# as in the home page hero.
photo = Image.open(ROOT / "public" / "studio" / "hero-straw-hat.jpg")
photo = ImageOps.grayscale(photo).convert("RGB")
photo = ImageOps.fit(photo, (W * SS // 2, H * SS), centering=(0.5, 0.08))
fade = Image.linear_gradient("L").rotate(90).resize((photo.width // 5, photo.height))
mask = Image.new("L", photo.size, 255)
mask.paste(fade, (0, 0))
canvas.paste(photo, (W * SS // 2, 0), mask)

# The logo, centred in the left half.
draw = ImageDraw.Draw(canvas)
logo_h = 300 * SS
scale = logo_h / box[3]
ox = W * SS // 4 - box[2] * scale / 2
oy = (H * SS - logo_h) / 2
place = lambda pts: [((x - box[0]) * scale + ox, (y - box[1]) * scale + oy) for x, y in pts]
outer, *holes = shapes(ink)
draw.polygon(place(outer), fill=CHARCOAL)
for hole in holes:
    draw.polygon(place(hole), fill=LINEN)
for part in shapes(ball):
    draw.polygon(place(part), fill=BRICK)

# The thin frame just inside the edge.
inset = 18 * SS
draw.rectangle([inset, inset, W * SS - inset, H * SS - inset], outline=(181, 176, 168), width=SS)

canvas.resize((W, H), Image.LANCZOS).save(OUT, quality=88, optimize=True)
print(f"saved {OUT.relative_to(ROOT)}")
