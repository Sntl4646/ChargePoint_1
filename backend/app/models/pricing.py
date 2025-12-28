# backend/app/models/pricing.py
from sqlalchemy import Column, Integer, String, Float
from ..database import Base


class Pricing(Base):
    __tablename__ = "pricing"

    id = Column(Integer, primary_key=True)
    plan_name = Column(String, unique=True)
    base_price = Column(Float)
    renewal_price = Column(Float)
    description = Column(String, nullable=True)
