# backend/app/schemas/renewal.py
from pydantic import BaseModel
from datetime import date


class RenewalBase(BaseModel):
    customer_name: str
    contract_id: str
    value: float
    renewal_date: date
    status: str


class RenewalCreate(RenewalBase):
    pass


class RenewalOut(RenewalBase):
    id: int
    owner_email: str
    usage_last_year: float | None = None
    benefits: str | None = None
    offer_text: str | None = None
    churn_risk: str | None = None
    subscription_start: date | None = None
    subscription_end: date | None = None

    class Config:
        from_attributes = True
