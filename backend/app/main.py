import base64
import mimetypes
import secrets
import uuid
from pathlib import Path

from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, Response
from fastapi.staticfiles import StaticFiles
from sqlalchemy import select
from sqlalchemy.orm import Session

from .config import settings
from .database import Base, engine, get_db
from .models import Lead
from .schemas import LeadCreate, LeadOut, LeadQualify

Base.metadata.create_all(bind=engine)

# Not every OS registry knows these; without them images would be served as text/plain
mimetypes.add_type("image/webp", ".webp")
mimetypes.add_type("image/svg+xml", ".svg")

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_methods=["GET", "POST", "PATCH"],
    allow_headers=["*"],
)


@app.middleware("http")
async def preview_auth(request: Request, call_next):
    """Private preview: HTTP Basic auth on everything when PREVIEW_USER/PREVIEW_PASSWORD are set."""
    if not (settings.preview_user and settings.preview_password) or request.url.path == "/api/health":
        return await call_next(request)
    header = request.headers.get("authorization", "")
    if header.startswith("Basic "):
        try:
            user, _, password = base64.b64decode(header[6:]).decode().partition(":")
        except (ValueError, UnicodeDecodeError):
            user, password = "", ""
        if secrets.compare_digest(user, settings.preview_user) and secrets.compare_digest(password, settings.preview_password):
            return await call_next(request)
    return Response("Acceso restringido", status_code=401, headers={"WWW-Authenticate": 'Basic realm="Torre Acqua"'})


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/leads", response_model=LeadOut, status_code=201)
def create_lead(payload: LeadCreate, db: Session = Depends(get_db)):
    # Honeypot filled: answer like a success so the bot moves on, but store nothing
    if payload.website:
        return LeadOut(public_id=str(uuid.uuid4()))

    lead = Lead(**payload.model_dump(exclude={"website"}))
    db.add(lead)
    db.commit()
    return LeadOut(public_id=lead.public_id)


@app.patch("/api/leads/{public_id}", response_model=LeadOut)
def qualify_lead(public_id: str, payload: LeadQualify, db: Session = Depends(get_db)):
    lead = db.scalar(select(Lead).where(Lead.public_id == public_id))
    if lead is None:
        raise HTTPException(status_code=404, detail="Lead not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(lead, field, value)
    db.commit()
    return LeadOut(public_id=lead.public_id)


# Production: serve the built frontend. Registered last so /api routes win.
if settings.static_dir:
    dist = Path(settings.static_dir).resolve()
    app.mount("/assets", StaticFiles(directory=dist / "assets"), name="assets")

    @app.get("/{path:path}", include_in_schema=False)
    def frontend(path: str):
        # Real files (images, logos, favicon) are served as is; any other path gets index.html
        # so client-side routes like /aviso-de-privacidad work on reload
        file = (dist / path).resolve()
        if path and file.is_file() and dist in file.parents:
            return FileResponse(file)
        return FileResponse(dist / "index.html")
