# LANDING_DTA — Torre Acqua

Lead-capture landing page for **Torre Acqua · Sonoma Club & Residences** (Monterrey, N.L.), by PAGA Desarrollos and Grupo DAGS.

## Stack

| Part | Tech |
|---|---|
| `backend/` | FastAPI + SQLAlchemy (SQLite locally, any `DATABASE_URL` in production) |
| `frontend/` | React 18 + Vite 6 |
| `context/` | Project source material: `ACQUA_CONTEXT.md` (approved copy and rules), brandbook and GVI schematic plans |

## Project structure

```
backend/
  app/
    main.py        FastAPI app, routes
    config.py      settings from env / .env
    database.py    SQLAlchemy engine and session
    models.py      Lead table
    schemas.py     request/response validation
  requirements.txt
  .env.example
frontend/
  src/
    content.js     all landing copy and data (edit text here)
    components/    one component per section
    index.css      brand tokens and styles
  public/          static assets: brand-*.svg, logos/ (developers), img/ (renders, planos)
  vite.config.js   dev proxy /api -> localhost:8000
```

## Page structure

Immersive scenes (a render pinned full screen while short text scrolls over it) alternate with calm editorial sections:

| Section | Component | Notes |
|---|---|---|
| Hero | `Hero.jsx` | Full-screen `portada` render, headline, visit / prices CTAs |
| Origen | `Scenes.jsx` `OriginScene` | Brand origin over the tower render |
| Cifras | `Facts.jsx` | Key figures, count up when visible |
| Club Sonoma | `Scenes.jsx` `ClubScene` + `ClubMap.jsx` | Scene, then the real aerial photo with numbered facilities (`CLUB_MAP`) |
| Vistas | `Scenes.jsx` `ViewScene` | Interior view render |
| Residencias | `Residences.jsx` | Type index, floor plan, areas, price/availability CTA |
| Amenidades | `Scenes.jsx` `AmenitiesScene` | Walk-through: the pinned render crossfades lobby → game room → sports bar → cabanas |
| Galería | `Filmstrip.jsx` | Horizontal strip of every render, lightbox |
| Ubicación | `Scenes.jsx` `LocationScene` | Address, Google Maps, nearby places |
| Desarrolladores | `Developers.jsx` | PAGA Desarrollos and Grupo DAGS with logos |
| Preguntas / Contacto | `Faq.jsx`, `Contact.jsx` | FAQ and the two-step lead form |

Shared pieces: `Scene.jsx` (pinned scene, optional render per beat), `Header.jsx` (transparent over dark areas, solid over light ones), `FloorIndicator.jsx` (PB → N50 counter while scrolling, desktop), `MobileBar.jsx` (fixed CTA bar on phones).

## Run locally

Requirements: Python 3.12+, Node 20+.

Backend (terminal 1):

```powershell
cd backend
python -m venv .venv
.venv\Scripts\python -m pip install -r requirements.txt
copy .env.example .env   # optional, defaults work locally
.venv\Scripts\python -m uvicorn app.main:app --reload --port 8000
```

Frontend (terminal 2):

```powershell
cd frontend
npm install
npm run dev
```

- Landing: http://localhost:5173
- API docs: http://localhost:8000/docs

## API

| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| POST | `/api/leads` | Create a lead (form step 1). Returns `{ public_id }` |
| PATCH | `/api/leads/{public_id}` | Optional step 2: `interest`, `purpose` (`vivir`/`invertir`), `is_broker`, `contact_time` (`manana`/`tarde`/`noche`) |

Step 1 also takes `intent`: `visita`, `brochure` or `precios`, meaning what the visitor asked to receive. Prices are never shown on the page; they are sent one-to-one by an advisor.

`POST /api/leads` body:

```json
{
  "name": "Nombre Apellido",
  "email": "correo@ejemplo.com",
  "phone": "8112345678",
  "interest": "Tipo A",
  "message": "opcional",
  "form_location": "hero",
  "privacy_accepted": true,
  "utm_source": "meta",
  "utm_medium": "paid",
  "utm_campaign": "lanzamiento"
}
```

- `privacy_accepted` must be `true`, otherwise the request is rejected (422).
- `form_location` records which form sent the lead (currently `contacto`).
- `interest`, `message` and the `utm_*` fields are optional. The frontend reads the UTM values from the page URL (`?utm_source=...`) automatically, so ad links should include them.
- `website` is a hidden honeypot field. If it is filled, the API answers as if it succeeded but stores nothing.

## Lead capture setup

Settings in `frontend/src/content.js`:

| Setting | Effect |
|---|---|
| `CONTACT.whatsapp` | WhatsApp buttons (mobile bar, thank-you message, final section). Hidden while `null` |
| `CONTACT.phone`, `CONTACT.email` | Shown in the header and final section when set |
| `PRIVACY_URL` | Links the consent checkbox and footer to the aviso de privacidad |
| `SHOWROOM` | Shows the sales-gallery block (address, hours, directions) in Contacto |
| `INTENTS` | The three things a visitor can ask for, with button text and thank-you copy |
| `FAQ` | Questions and answers. Add only confirmed answers |

Events pushed to `window.dataLayer` (`frontend/src/track.js`):

- `generate_lead`: step 1 submitted, with `form_location`, `intent` and `interest`.
- `lead_qualified`: step 2 submitted.
- `whatsapp_click`: a WhatsApp link was tapped, with `location`.

Add a Google Tag Manager container to `frontend/index.html` and trigger Meta Pixel / GA4 conversions from these events.

Leads are stored in `backend/leads.db` (ignored by git). Tables are created on startup; there are no migrations yet, so after a model change you must delete `leads.db` locally (consider Alembic before production).

## Content rules

Copy comes from `context/ACQUA_CONTEXT.md`. In short:

- No prices, appreciation, ROI/TIR, or Friends & Family terms.
- Renders and areas are illustrative. Keep the legal notice in the footer.
- Brand palette: `#043447` `#2B5C63` `#69ACB7` `#098B6A` `#CE9930` `#FFFFF8`.

## Images

Source images live in `context/`; the site uses optimized copies generated by a script:

| Source | Output | Used in |
|---|---|---|
| `context/RENDERS/` (not in git) | `frontend/public/img/renders/<name>-{800,1600,2400}.webp` | Hero, scenes, gallery |
| `context/AMENIDADES/` (not in git) | same folder (`gameroom`, `sportsbar`, `cabanas`) | Amenities walk-through, gallery |
| `context/CLUB/` (not in git) | same folder (`club-aerea`, kept at its native 1254 px too) | Club map |
| `context/PLANOS/<tipo>/tipo-*.png` | `frontend/public/img/planos/tipo-*.webp` | Residences |
| `context/LOGOS/` | `frontend/public/logos/` (prepared by hand, see below) | Developers |

```powershell
pip install pillow
python scripts/optimize_images.py
```

Re-run it after adding or replacing an image, then reference the new file in `frontend/src/content.js` (`RENDERS`, `AMENITY_RENDERS`, `CLUB_MAP`, `GALLERY`, `TYPOLOGIES[].plans`). Long source file names get a short web name in `NAMES` inside the script.

Developer logos: `paga-desarrollos.png` is the original with its white background made transparent; `grupo-dags.svg` is the light-background variant of the DAGS file (white letters set to the file's own `#444444`). Replace them if the developers provide official light-background versions.

Club map points (`CLUB_MAP.points`) are positions in % of the aerial photo. Casa Club y spa and the practice tee were confirmed by the client.

The `specs-*.png` area tables are **not** used as images. They are transcribed as `rooms` in `content.js`, numbered in the same order as the circles on each plan. If a plan changes, update both.

## Logo

The logo is never typed as text. It is the official vector extracted from the brandbook (`context/BRANDBOOK ACQUA_JULIO.pdf`, p.5):

- `frontend/src/components/logoPaths.js`: path data used by `<Logo variant="principal|horizontal|isotipo" />`, which takes its color from CSS `color`.
- `frontend/public/brand-*.svg`: the same three versions as standalone navy SVGs (`brand-isotipo.svg` is the favicon).

If the agency provides the original logo files (SVG/AI), replace these with them.

## Fonts

The whole site uses **Brandon Grotesque**, the only typeface, for headings, text, buttons and form. It loads from the Adobe Fonts kit `gdo1hpj` (`<link>` in `frontend/index.html`). The kit has weights **400 and 700** (with italics) only, so the CSS uses just those. To get more weights (e.g. Light 300 or Medium 500), add them to the kit in Adobe Fonts. The URL stays the same. If the kit is restricted to certain domains, add the production domain in Adobe Fonts before deploying.

The files in `context/FONT/` are an HvD trial version (no commercial use, no Spanish accents). Don't use them. That folder is git-ignored.

## Pending

- Advisor contact details (phone / WhatsApp / email).
- Aviso de privacidad (URL), showroom address/hours, Google Tag Manager / Meta Pixel IDs.
- Mini golf on the club map, if confirmed (top right of the aerial photo).
- Higher-resolution floor plans (current ones are ~360–960 px wide).
- Lead notification (email or CRM).
- Linux deployment: nginx serving `frontend/dist`, uvicorn under systemd, Postgres via `DATABASE_URL`, and `CORS_ORIGINS` set to the production domain.
