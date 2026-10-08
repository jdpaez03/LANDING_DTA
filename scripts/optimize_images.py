"""Convert source images in context/ into web-ready files in frontend/public/img/.

Renders (large PNG) -> WebP at several widths for srcset.
Floor plans (small PNG) -> WebP at native size, transparency flattened onto white.

Run from the repo root:  python scripts/optimize_images.py
Requires Pillow (pip install pillow).
"""
from pathlib import Path

from PIL import Image

Image.MAX_IMAGE_PIXELS = None

ROOT = Path(__file__).resolve().parent.parent
SRC_RENDERS = ROOT / "context" / "RENDERS"
SRC_PLANS = ROOT / "context" / "PLANOS"
OUT_RENDERS = ROOT / "frontend" / "public" / "img" / "renders"
OUT_PLANS = ROOT / "frontend" / "public" / "img" / "planos"

RENDER_WIDTHS = (800, 1600, 2400)
QUALITY = 78


def save_webp(im: Image.Image, path: Path) -> None:
    im.save(path, "WEBP", quality=QUALITY, method=6)
    print(f"  {path.relative_to(ROOT)}  {im.size[0]}x{im.size[1]}  {path.stat().st_size // 1024} KB")


def renders() -> None:
    OUT_RENDERS.mkdir(parents=True, exist_ok=True)
    for src in sorted(SRC_RENDERS.glob("*.png")):
        im = Image.open(src).convert("RGB")
        for w in RENDER_WIDTHS:
            if w > im.width:
                continue
            h = round(im.height * w / im.width)
            save_webp(im.resize((w, h), Image.LANCZOS), OUT_RENDERS / f"{src.stem}-{w}.webp")


def plans() -> None:
    OUT_PLANS.mkdir(parents=True, exist_ok=True)
    # Only the floor plans; the specs-*.png tables are transcribed as data in frontend/src/content.js
    for src in sorted(SRC_PLANS.glob("*/tipo-*.png")):
        im = Image.open(src).convert("RGBA")
        flat = Image.new("RGB", im.size, "white")
        flat.paste(im, mask=im.split()[3])
        save_webp(flat, OUT_PLANS / f"{src.stem}.webp")


if __name__ == "__main__":
    print("Renders:")
    renders()
    print("Plans:")
    plans()
