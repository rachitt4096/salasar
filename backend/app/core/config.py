from pydantic import field_validator, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Salasar API"
    app_version: str = "0.1.0"
    api_prefix: str = "/api/v1"
    environment: str = "development"
    database_url: str = "postgresql+psycopg://postgres:postgres@localhost:5432/salasar"
    jwt_secret: str = "change-me"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 480
    cors_origins: list[str] = ["http://localhost:8081", "http://localhost:8082"]
    tata_fleet_webhook_enabled: bool = False
    tata_fleet_webhook_secret: str | None = None
    tata_fleet_max_payload_bytes: int = 1_048_576

    model_config = SettingsConfigDict(
        env_file=".env",
        env_prefix="SALASAR_",
        extra="ignore",
    )

    @field_validator("database_url", mode="before")
    @classmethod
    def use_psycopg_driver(cls, value: object) -> object:
        if not isinstance(value, str):
            return value
        if value.startswith("postgres://"):
            return value.replace("postgres://", "postgresql+psycopg://", 1)
        if value.startswith("postgresql://"):
            return value.replace("postgresql://", "postgresql+psycopg://", 1)
        return value

    @model_validator(mode="after")
    def validate_production_settings(self) -> "Settings":
        if self.tata_fleet_webhook_enabled:
            if not self.tata_fleet_webhook_secret:
                raise ValueError("SALASAR_TATA_FLEET_WEBHOOK_SECRET is required when Tata Fleet push is enabled")
            if len(self.tata_fleet_webhook_secret) < 32:
                raise ValueError("SALASAR_TATA_FLEET_WEBHOOK_SECRET must be at least 32 characters")

        if self.environment.lower() not in {"production", "prod"}:
            return self

        if self.jwt_secret == "change-me":
            raise ValueError("SALASAR_JWT_SECRET must be set to a unique secret in production")
        if not self.cors_origins:
            raise ValueError("SALASAR_CORS_ORIGINS must list the allowed frontend origins in production")
        if any(origin.startswith("http://localhost") for origin in self.cors_origins):
            raise ValueError("SALASAR_CORS_ORIGINS cannot include localhost in production")
        return self


settings = Settings()
