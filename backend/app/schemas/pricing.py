# backend/app/schemas/pricing.py
from pydantic import BaseModel


class PricingBase(BaseModel):
    plan_name: str
    renewal_price: float
    description: str | None = None


class PricingOut(PricingBase):
    id: int

    class Config:
        from_attributes = True
