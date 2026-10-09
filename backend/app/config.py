from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "Torre ACQUA API"
    database_url: str = "sqlite:///./leads.db"
    # Comma-separated list of allowed origins for the frontend
    cors_origins: str = "http://localhost:5173"

    # Production: folder with the built frontend (frontend/dist). When set, this app serves
    # the site and the API from one port. Leave empty in development (Vite serves the site).
    static_dir: str = ""

    # Private preview: when both are set, every request needs HTTP Basic auth with these
    preview_user: str = ""
    preview_password: str = ""

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


settings = Settings()
