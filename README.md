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
  public/          static assets (favicon, future renders/fonts)
  vite.config.js   dev proxy /api -> localhost:8000
```

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
| POST | `/api/leads` | Create a lead |

`POST /api/leads` body:

```json
{
  "name": "Nombre Apellido",
  "email": "correo@ejemplo.com",
  "phone": "8112345678",
  "interest": "Tipo A",
  "message": "opcional",
  "utm_source": "meta",
  "utm_medium": "paid",
  "utm_campaign": "lanzamiento"
}
```

`interest`, `message` and the `utm_*` fields are optional. The frontend reads the UTM values from the page URL (`?utm_source=...`) automatically, so ad links should include them.

Leads are stored in `backend/leads.db` (ignored by git). Tables are created on startup; there are no migrations yet, so after a model change you must delete `leads.db` locally (consider Alembic before production).

## Content rules

Copy comes from `context/ACQUA_CONTEXT.md`. In short:

- No prices, appreciation, ROI/TIR, or Friends & Family terms.
- Renders and areas are illustrative. Keep the legal notice in the footer.
- Brand palette: `#043447` `#2B5C63` `#69ACB7` `#098B6A` `#CE9930` `#FFFFF8`.

## Fonts

The brand font is **Brandon Grotesque**, but it is not used yet. The files in `context/FONT/` are a trial version: personal use only, and missing Spanish accents. That folder is git-ignored. The site uses Cormorant Garamond (headings) and Jost (text), the same pair as the brochure.

To switch to Brandon Grotesque, get a web license (HvD Fonts, MyFonts or Adobe Fonts), put the `.woff2` files in `frontend/public/fonts/` and add `@font-face` rules. The CSS font stack already lists `'Brandon Grotesque'` first.

## Pending

- Advisor contact details (phone / WhatsApp / email).
- Renders: the drop-shaped placeholders in `Concept` and `Amenities` accept an image `src`.
- Floor plans for each typology.
- Lead notification (email or CRM) and spam protection.
- Linux deployment: nginx serving `frontend/dist`, uvicorn under systemd, Postgres via `DATABASE_URL`, and `CORS_ORIGINS` set to the production domain.
