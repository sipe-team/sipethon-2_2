import os

from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()


class Settings(BaseSettings):
    API_V1_STR: str = "/v1"
    PROJECT_NAME: str = os.getenv("PROJECT_NAME")
    HOST: str = os.getenv("HOST")
    PORT: int = os.getenv("PORT")


settings = Settings()
