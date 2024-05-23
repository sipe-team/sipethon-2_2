class HeartbeatService:
    def __init__(self):
        self.status = "OK"

    def get_status(self) -> dict:
        return {"status": self.status}
