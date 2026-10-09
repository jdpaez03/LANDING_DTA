import uuid

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.orm import Session

from .config import settings
from .database import Base, engine, get_db
from .models import Lead
from .schemas import LeadCreate, LeadOut, LeadQualify

Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_methods=["GET", "POST", "PATCH"],
    allow_headers=["*"],
)


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
