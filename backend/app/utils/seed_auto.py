# backend/app/utils/seed_auto.py
import random
from datetime import date, timedelta

from sqlalchemy.orm import Session

from ..database import SessionLocal, engine, Base
from ..models.user import User
from ..models.renewal import Renewal
from ..models.pricing import Pricing
from ..services.security import get_password_hash
from ..config import settings


def auto_seed():
    """
    Idempotent seed:
      - 1 admin (from .env)
      - 10 users: user1..user10 (password Welcome@123)
      - 3 pricing plans
      - ~1000 renewal rows across users
    """
    Base.metadata.create_all(bind=engine)

    db: Session = SessionLocal()
    try:
        # Users
        if not db.query(User).first():
            admin = User(
                email=settings.ADMIN_EMAIL,
                full_name="Administrator",
                hashed_password=get_password_hash(settings.ADMIN_PASSWORD),
                is_admin=True,
                is_active=True,
            )
            db.add(admin)

            for i in range(1, 11):
                u = User(
                    email=f"user{i}@example.com",
                    full_name=f"User {i}",
                    hashed_password=get_password_hash("Welcome@123"),
                    is_admin=False,
                    is_active=True,
                )
                db.add(u)

        # Pricing
        if not db.query(Pricing).first():
            plans = [
                (
                    "Essentials",
                    100.0,
                    120.0,
                    "Core features for small teams.",
                ),
                (
                    "Business",
                    500.0,
                    550.0,
                    "Advanced analytics and priority support.",
                ),
                (
                    "Enterprise",
                    2000.0,
                    2200.0,
                    "Custom SLAs and dedicated CSM.",
                ),
            ]
            for name, base, renew, desc in plans:
                db.add(
                    Pricing(
                        plan_name=name,
                        base_price=base,
                        renewal_price=renew,
                        description=desc,
                    )
                )

        # Renewals
        if not db.query(Renewal).first():
            users = db.query(User).filter(User.is_admin == False).all()
            if users:
                total = 1000
                for i in range(total):
                    owner = random.choice(users)
                    start = date.today() - timedelta(
                        days=random.randint(30, 400)
                    )
                    end = start + timedelta(days=365)
                    status = random.choice(
                        ["pending", "in_progress", "closed", "expired"]
                    )
                    today = date.today()
                    if end < today:
                        status = "expired"

                    db.add(
                        Renewal(
                            customer_name=f"Company-{i+1}",
                            contract_id=f"CNT-{i+1:04d}",
                            value=random.randint(5000, 100000),
                            renewal_date=end,
                            status=status,
                            owner_email=owner.email,
                            usage_last_year=round(
                                random.uniform(0.5, 1.5), 2
                            ),
                            benefits="Priority support; Volume discounts",
                            offer_text="Renew now and save 10%",
                            churn_risk=random.choice(
                                ["low", "medium", "high"]
                            ),
                            subscription_start=start,
                            subscription_end=end,
                        )
                    )

        db.commit()
    finally:
        db.close()
