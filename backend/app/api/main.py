from app.api.routes import heartbeat
from fastapi import APIRouter

api_router = APIRouter()
api_router.include_router(heartbeat.router, tags=["heartbeat"])
