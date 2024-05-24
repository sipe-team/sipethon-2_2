from app.api.routes import heartbeat, scenario

from fastapi import APIRouter

api_router = APIRouter()
api_router.include_router(heartbeat.router, tags=["heartbeat"])
api_router.include_router(scenario.router, tags=["scenario"])
