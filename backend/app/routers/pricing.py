# backend/app/routers/pricing.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models.pricing import Pricing
from ..schemas.pricing import PricingOut
from ..services.security import get_current_user

router = APIRouter()


@router.get("/pricing", response_model=list[PricingOut])
def list_pricing(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return db.query(Pricing).order_by(Pricing.id).all()
