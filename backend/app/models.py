import uuid
from datetime import datetime, timezone

from sqlalchemy import Boolean, DateTime, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from .database import Base


class Lead(Base):
    __tablename__ = "leads"

    id: Mapped[int] = mapped_column(primary_key=True)
    # Unguessable id handed to the browser so step 2 can update this lead only
    public_id: Mapped[str] = mapped_column(String(36), unique=True, index=True, default=lambda: str(uuid.uuid4()))

    # Step 1
    name: Mapped[str] = mapped_column(String(120))
    email: Mapped[str] = mapped_column(String(255), index=True)
    phone: Mapped[str] = mapped_column(String(30))
    intent: Mapped[str | None] = mapped_column(String(20), nullable=True)  # visita | brochure | precios
    interest: Mapped[str | None] = mapped_column(String(60), nullable=True)
    message: Mapped[str | None] = mapped_column(Text, nullable=True)
    form_location: Mapped[str | None] = mapped_column(String(30), nullable=True)
    privacy_accepted: Mapped[bool] = mapped_column(Boolean, default=False)
    privacy_version: Mapped[str | None] = mapped_column(String(40), nullable=True)

    # Step 2 (optional qualification)
    purpose: Mapped[str | None] = mapped_column(String(20), nullable=True)  # vivir | invertir
    is_broker: Mapped[bool | None] = mapped_column(Boolean, nullable=True)
    contact_time: Mapped[str | None] = mapped_column(String(20), nullable=True)

    utm_source: Mapped[str | None] = mapped_column(String(100), nullable=True)
    utm_medium: Mapped[str | None] = mapped_column(String(100), nullable=True)
    utm_campaign: Mapped[str | None] = mapped_column(String(100), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
