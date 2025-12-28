# backend/app/routers/__init__.py
from .auth import router as auth
from .dashboard import router as dashboard
from .renewals import router as renewals
from .users import router as users
from .pricing import router as pricing
from .reports import router as reports

__all__ = [
    "auth",
    "dashboard",
    "renewals",
    "users",
    "pricing",
    "reports",
]
