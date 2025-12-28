# backend/app/routers/dashboard.py
from datetime import date, timedelta

from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from ..database import get_db
from ..models.renewal import Renewal
from ..services.security import get_current_user
from ..models.user import User

router = APIRouter()


def _update_expired_status(db: Session):
    today = date.today()
    expired = (
        db.query(Renewal)
        .filter(
            Renewal.subscription_end < today,
            Renewal.status != "expired",
        )
        .all()
    )
    for item in expired:
        item.status = "expired"
    if expired:
        db.commit()


@router.get("/summary")
def dashboard_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    _update_expired_status(db)

    q = db.query(Renewal)
    if not current_user.is_admin:
        q = q.filter(Renewal.owner_email == current_user.email)

    today = date.today()
    in_30 = today + timedelta(days=30)

    total_renewals = q.count()
    revenue_pipeline = (
        q.with_entities(func.coalesce(func.sum(Renewal.value), 0.0))
        .scalar()
        or 0.0
    )
    upcoming_30_days = (
        q.filter(
            Renewal.renewal_date >= today,
            Renewal.renewal_date <= in_30,
        ).count()
    )

    closed_renewals = q.filter(Renewal.status == "closed").count()
    expired_renewals = q.filter(Renewal.status == "expired").count()
    in_progress_renewals = q.filter(
        Renewal.status == "in_progress"
    ).count()
    pending_renewals = q.filter(Renewal.status == "pending").count()

    return {
        "total_renewals": total_renewals,
        "revenue_pipeline": revenue_pipeline,
        "upcoming_30_days": upcoming_30_days,
        "closed_renewals": closed_renewals,
        "expired_renewals": expired_renewals,
        "in_progress_renewals": in_progress_renewals,
        "pending_renewals": pending_renewals,
    }
