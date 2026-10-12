# LANDING_DTA — Torre Acqua

Lead-capture landing page for **Torre Acqua · Sonoma Club & Residences** (Monterrey, N.L.), by PAGA Desarrollos and Grupo DAGS. **Status: prototype.**

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
    main.py        FastAPI app: API routes, preview auth, serves the built site in production
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
deploy/            preview deployment: deploy.sh, systemd unit, setup notes
scripts/
  optimize_images.py   source images -> optimized webp copies
```

## Page structure

Immersive scenes (a render pinned full screen while short text scrolls over it) alternate with calm editorial sections:

| Section | Component | Notes |
|---|---|---|
| Hero | `Hero.jsx` | Full-screen `portada` render, headline, visit / prices CTAs |
| Origen | `Scenes.jsx` `OriginScene` | Brand origin over the tower render |
| Cifras | `Facts.jsx` | Key figures, count up when visible |
| Club Sonoma | `Scenes.jsx` `ClubScene` + `ClubMap.jsx` | Scene, then the real aerial photo with numbered facilities (`CLUB_MAP`) |
| Comunidad | `Community.jsx` | Timeline of the Sonoma towers (Vento → Stella) that fills up to Acqua, "Tu turno" (`COMMUNITY`, from the sales brochure p.8) |
| Formulario | `LeadStrip.jsx` `form-comunidad` | Short data-capture form |
| Vistas | `Scenes.jsx` `ViewScene` | Interior view render |
| Residencias | `Residences.jsx` | Type index, floor plan, areas; the CTA jumps to the next form with the typology attached |
| Formulario | `LeadStrip.jsx` `form-residencias` | Short data-capture form |
| Amenidades | `Scenes.jsx` `AmenitiesScene` | Walk-through: the pinned render crossfades lobby → game room → sports bar → cabanas |
| Galería | `Filmstrip.jsx` | Horizontal strip of every render, lightbox |
| Ubicación | `Scenes.jsx` `LocationScene` | Address, embedded Google map (`LOCATION.embedUrl`), link to Google Maps, nearby places |
| Contacto | `LeadStrip.jsx` `contacto` | Short data-capture form; target of the Contacto nav link and every CTA |
| Equipo | `Developers.jsx` | PAGA Desarrollos and Grupo DAGS; each logo links to its site (`DEVELOPERS`) |
| Preguntas | `Faq.jsx` | FAQ |

Every form on the page is the same `LeadForm.jsx`: name, WhatsApp, email and privacy consent, nothing else (data capture only). Once a visitor submits one, the others thank them instead of asking again (per tab, `sessionStorage`).

Shared pieces: `Scene.jsx` (pinned scene, optional render per beat), `Header.jsx` (transparent over dark areas, solid over light ones), `FloorIndicator.jsx` (PB → N50 counter while scrolling, desktop), `MobileBar.jsx` (fixed CTA bar on phones).

## Preview deployment

A private preview runs on the Linux laptop behind Tailscale Funnel with username and password:
**https://atlas.tail642bf8.ts.net:10000/** (credentials only in the server's `.env`). In production mode FastAPI
serves the built site and the API on one port (`STATIC_DIR`) and asks for HTTP Basic auth
(`PREVIEW_USER` / `PREVIEW_PASSWORD`; `/api/health` stays open). Deploy with `bash deploy/deploy.sh`; details in [`deploy/README.md`](deploy/README.md).

## Legal pages

| Path | Component | Content |
|---|---|---|
| `/aviso-de-privacidad` | `components/legal/PrivacyNotice.jsx` | Aviso de privacidad integral, structured on art. 15 of the LFPDPPP (DOF 20-mar-2025; authority: Secretaría Anticorrupción y Buen Gobierno) |
| `/aviso-legal` | `components/legal/LegalNotice.jsx` | The site is preliminary and conceptual; images, plans, areas and dates are illustrative; not an offer; club, brands, third-party links |

- Both are **drafts for legal review**. Missing facts come from `DATA_CONTROLLER` in `content.js` (company name, address, privacy email) and render as highlighted `[Pendiente: …]` until filled in.
- Every lead stores `privacy_version` (`PRIVACY_VERSION` in `content.js`). Bump it whenever the notice text changes.
- The hero shows a short "versión preliminar" note and the footer carries the long disclaimer (`PRELIMINARY_SHORT`, `PRELIMINARY_LONG`).
- Routing is a plain path check in `App.jsx`. Vite serves these paths in development, and FastAPI does in production mode (any path that isn't a real file gets `index.html`). Behind another web server, add the same fallback (nginx: `try_files $uri /index.html;`).

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
| POST | `/api/leads` | Create a lead. Returns `{ public_id }` |
| PATCH | `/api/leads/{public_id}` | Qualify a lead: `interest`, `purpose` (`vivir`/`invertir`), `is_broker`, `contact_time` (`manana`/`tarde`/`noche`). Not used by the page for now |

The API also accepts `intent` (`visita`, `brochure` or `precios`) and `message`; the page no longer sends them. Prices are never shown on the page; they are sent one-to-one by an advisor.

`POST /api/leads` body:

```json
{
  "name": "Nombre Apellido",
  "email": "correo@ejemplo.com",
  "phone": "8112345678",
  "interest": "Tipo A",
  "form_location": "contacto",
  "privacy_accepted": true,
  "privacy_version": "2026-10-08-preliminar",
  "utm_source": "meta",
  "utm_medium": "paid",
  "utm_campaign": "lanzamiento"
}
```

- `privacy_accepted` must be `true`, otherwise the request is rejected (422).
- `form_location` records which form sent the lead: `form-comunidad`, `form-residencias` or `contacto`.
- `privacy_version` records which version of the aviso was accepted (the frontend sends `PRIVACY_VERSION`).
- `intent`, `interest`, `message` and the `utm_*` fields are optional. The frontend reads the UTM values from the page URL (`?utm_source=...`) automatically, so ad links should include them.
- `website` is a hidden honeypot field. If it is filled, the API answers as if it succeeded but stores nothing.

## Lead capture setup

Settings in `frontend/src/content.js`:

| Setting | Effect |
|---|---|
| `CONTACT.whatsapp` | WhatsApp buttons (header, mobile bar, thank-you message). Hidden while `null` |
| `PRIVACY_URL` | Links the consent checkbox and footer to the aviso de privacidad |
| `FAQ` | Questions and answers. Add only confirmed answers |

Events pushed to `window.dataLayer` (`frontend/src/track.js`):

- `generate_lead`: a form was submitted, with `form_location` and `interest`.
- `whatsapp_click`: a WhatsApp link was tapped, with `location`.

No tag manager is installed: the site is a prototype and Google Tag Manager is not planned for now. The events are harmless without it and can feed whatever analytics tool is chosen later.

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

- Legal review of `/aviso-de-privacidad` and `/aviso-legal`, and the data for `DATA_CONTROLLER` (razón social, domicilio, correo de privacidad). Also check advertising rules for housing sales (e.g. NOM-247-SE-2021) before going live.
- Advisor phone/WhatsApp, email and showroom hours (being obtained).
- pagadesarrollos.com returned 403 Forbidden on 2026-10-08; the PAGA logo links there.
- Mini golf on the club map, if confirmed (top right of the aerial photo).
- Higher-resolution floor plans (current ones are ~360–960 px wide).
- Lead notification (email or CRM).
- For real campaigns: move from the laptop preview to a stable host (own domain, Postgres via `DATABASE_URL`).
