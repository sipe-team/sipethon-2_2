from app.services.heartbeat import HeartbeatService

from fastapi import APIRouter

router = APIRouter()
heartbeat_service = HeartbeatService()

@router.get("/healthz", status_code=200)
def healthz() -> dict:
    """
    Healthz
    """
    return heartbeat_service.get_status()

