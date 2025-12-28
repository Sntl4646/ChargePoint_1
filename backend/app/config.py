from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DB_HOST: str = "localhost"
    DB_PORT: int = 5432
    DB_NAME: str = "postgres"
    DB_USER: str = "postgres"
    DB_PASS: str = "Welcome@123"
    JWT_SECRET: str = "SECRET123"
    JWT_ALGO: str = "HS256"
    ADMIN_EMAIL: str = "admin@example.com"
    ADMIN_PASSWORD: str = "Welcome@123"

    class Config:
        env_file = ".env"

settings = Settings()
