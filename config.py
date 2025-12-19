from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./hip_hop_foundation.db"
    SECRET_KEY: str = "your-secret-key-here-change-this-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    ADMIN_EMAIL: str = "admin@hiphopfoundation.org"
    ADMIN_PASSWORD: str = "adminpassword123"

    class Config:
        env_file = ".env"


settings = Settings()