"""Convert source images in context/ into web-ready files in frontend/public/img/.

Renders (large PNG/JPG in RENDERS, AMENIDADES, CLUB) -> WebP at several widths for srcset.
Images narrower than the largest width also get a copy at their native width.
Floor plans (small PNG) -> WebP at native size, transparency flattened onto white.

Run from the repo root:  python scripts/optimize_images.py
Requires Pillow (pip install pillow).
"""
from pathlib import Path

from PIL import Image

Image.MAX_IMAGE_PIXELS = None

ROOT = Path(__file__).resolve().parent.parent
SRC_RENDER_DIRS = [ROOT / "context" / d for d in ("RENDERS", "AMENIDADES", "CLUB")]
SRC_PLANS = ROOT / "context" / "PLANOS"
OUT_RENDERS = ROOT / "frontend" / "public" / "img" / "renders"
OUT_PLANS = ROOT / "frontend" / "public" / "img" / "planos"

RENDER_WIDTHS = (800, 1600, 2400)
QUALITY = 78

# Short web names for source files whose names are long or carry spaces/accents
NAMES = {
    "Torre_Acqua_portada_sin_texto": "portada",
    "amenidad-gameroom": "gameroom",
    "amenidad-sportsbar": "sportsbar",
    "Aerial View of Forest Sports Campus": "club-aerea",
}


def save_webp(im: Image.Image, path: Path) -> None:
    im.save(path, "WEBP", quality=QUALITY, method=6)
    print(f"  {path.relative_to(ROOT)}  {im.size[0]}x{im.size[1]}  {path.stat().st_size // 1024} KB")


def renders() -> None:
    OUT_RENDERS.mkdir(parents=True, exist_ok=True)
    sources = [p for d in SRC_RENDER_DIRS if d.exists() for p in d.iterdir()
               if p.suffix.lower() in {".png", ".jpg", ".jpeg"}]
    for src in sorted(sources):
        name = NAMES.get(src.stem, src.stem)
        im = Image.open(src).convert("RGB")
        widths = [w for w in RENDER_WIDTHS if w <= im.width]
        if im.width < RENDER_WIDTHS[-1] and im.width not in widths:
            widths.append(im.width)  # keep full native resolution available
        for w in widths:
            h = round(im.height * w / im.width)
            save_webp(im.resize((w, h), Image.LANCZOS), OUT_RENDERS / f"{name}-{w}.webp")


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
