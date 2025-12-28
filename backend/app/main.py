# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routers import auth, dashboard, renewals, users, pricing, reports
from .utils.seed_auto import auto_seed


def create_app() -> FastAPI:
    app = FastAPI(title="Renewal Management API")

    origins = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Create tables + seed dummy data
    Base.metadata.create_all(bind=engine)
    auto_seed()

    # Routers
    app.include_router(auth.router, prefix="/auth", tags=["auth"])
    app.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
    # renewals & payments are mounted at root paths: /renewals, /payments/...
    app.include_router(renewals.router, tags=["renewals"])
    app.include_router(users.router, tags=["users"])
    app.include_router(pricing.router, tags=["pricing"])
    app.include_router(reports.router, tags=["reports"])

    @app.get("/health")
    def health():
        return {"status": "ok"}

    return app


app = create_app()
