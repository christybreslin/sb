"""Takes the photos used on the approved design boards out of the Claude Design
export and saves them to public/studio/ under readable names.

The export is a page bundle: each board is itself a bundle packed inside the
outer one, and each file in a bundle is base64 (often gzipped) in a JSON
manifest keyed by an id. The ids below are the ones the boards' <img> tags use.

Run: python3 scripts/extract-design-assets.py
"""
import base64
import gzip
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
EXPORT = ROOT / "Studio Borne – website.html"
OUT = ROOT / "public" / "studio"

NAMES = {
    "d88c1f07-9ca9-4bf2-8279-57caae871e49": "hero-straw-hat",
    "8ab211b1-f94b-498e-80eb-916d4fca8574": "who-founders",
    "ee8500f9-0d4c-4617-a20e-78cd1e9f4f85": "who-laptop",
    "d2eeb4e8-1e73-47d8-9c89-89600a5f77ef": "what-sitting-room",
    "cd4e282b-c364-4f03-8537-d543d7775bbf": "why-waiter",
    "a91b8487-a5a4-41fb-98c0-e10959ea73e5": "hello-founders",
    # From the studio, in the order the board gives them.
    "70fde947-dd8f-4c8d-b480-560366961d6e": "reel-01",
    "8fdc5194-18ff-4b0e-8a3b-09eb8dc7ab9e": "reel-02",
    "77d7dd4f-3edb-4f92-a938-06f69771b7f0": "reel-03",
    "ffc6b474-d56b-47a9-bdc1-fab2b9e18d6a": "reel-04",
    "8fbe2aec-2e10-4e22-8f40-0f8f3050a944": "reel-05",
    "d6ed4a70-dcfc-4ff6-b0e6-1867117b0c9a": "reel-06",
    "a3c11f56-8b9f-4334-b93b-fc5e40151773": "reel-07",
    "24ccac49-ea4a-484b-a89e-13765e05dbab": "reel-08",
    "62fd6078-55f1-416f-ad85-1fc599c02de2": "reel-09",
    "053c7cd7-09f8-4cda-8cbd-e3636ce63337": "reel-10",
    "b43cffb8-27fe-4123-973a-d876a4987e4f": "reel-11",
    "8bac7db2-c97c-4f09-ad4c-e2aebfe86e8b": "reel-12",
    "cac619c8-7234-4c00-ad7c-29a03cf95b5e": "reel-13",
    "62f02b93-be92-4099-a337-2808595be2fe": "reel-14",
    "75f4fab2-fe23-429b-8402-0d97f2469766": "reel-15",
    "d8fb6e52-d992-4395-abc2-b4bf7a5c4b5f": "reel-16",
    "a50cbb31-4a4e-4a8a-b7b6-3f1b1ef21024": "reel-17",
    "1392a2bb-9d9b-4d75-a541-e515d1ea299e": "reel-18",
    "5d13a4e4-ac4e-4098-8e6b-dd9c08ca80e7": "reel-19",
    "dda39d85-c7b3-4ba2-ba08-e5bf1fa81c91": "reel-20",
}


def manifest(html):
    m = re.search(r'<script type="__bundler/manifest">(.*?)</script>', html, re.S)
    files = {}
    for key, entry in json.loads(m.group(1)).items():
        data = base64.b64decode(entry["data"])
        if entry.get("compressed"):
            data = gzip.decompress(data)
        files[key] = (entry["mime"], data)
    return files


def walk(html, found):
    for key, (mime, data) in manifest(html).items():
        if mime == "text/html":
            walk(data.decode("utf-8"), found)
        elif key in NAMES:
            found[key] = data


found = {}
walk(EXPORT.read_text(encoding="utf-8"), found)
OUT.mkdir(parents=True, exist_ok=True)
for key, name in NAMES.items():
    (OUT / f"{name}.jpg").write_bytes(found[key])
print(f"saved {len(found)} of {len(NAMES)} photos to {OUT.relative_to(ROOT)}")
