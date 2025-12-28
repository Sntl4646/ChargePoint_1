# backend/app/models/renewal.py
from sqlalchemy import Column, Integer, String, Float, Date, DateTime
from sqlalchemy.sql import func
from ..database import Base


class Renewal(Base):
    __tablename__ = "renewals"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String, nullable=False)
    contract_id = Column(String, nullable=False)
    value = Column(Float, nullable=False)
    renewal_date = Column(Date, nullable=False)
    status = Column(String, default="pending")
    owner_email = Column(String, nullable=False)

    usage_last_year = Column(Float, nullable=True)
    benefits = Column(String, nullable=True)
    offer_text = Column(String, nullable=True)
    churn_risk = Column(String, nullable=True)

    subscription_start = Column(Date, nullable=True)
    subscription_end = Column(Date, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
