from typing import Literal

from pydantic import BaseModel, EmailStr, Field

Intent = Literal["visita", "brochure", "precios"]


class LeadCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=30)
    intent: Intent | None = None
    interest: str | None = Field(default=None, max_length=60)
    message: str | None = Field(default=None, max_length=2000)
    # Which form on the page sent it (hero, final, …)
    form_location: str | None = Field(default=None, max_length=30)
    # Consent to the aviso de privacidad is mandatory
    privacy_accepted: Literal[True]
    # Which version of the aviso de privacidad was accepted (proof of consent)
    privacy_version: str | None = Field(default=None, max_length=40)
    utm_source: str | None = Field(default=None, max_length=100)
    utm_medium: str | None = Field(default=None, max_length=100)
    utm_campaign: str | None = Field(default=None, max_length=100)
    # Honeypot: hidden in the UI, so only bots fill it
    website: str | None = Field(default=None, max_length=200)


class LeadQualify(BaseModel):
    """Optional step 2. Only the fields sent are updated."""

    interest: str | None = Field(default=None, max_length=60)
    purpose: Literal["vivir", "invertir"] | None = None
    is_broker: bool | None = None
    contact_time: Literal["manana", "tarde", "noche"] | None = None


class LeadOut(BaseModel):
    # public_id lets the same browser complete step 2; the numeric id is never exposed
    public_id: str
