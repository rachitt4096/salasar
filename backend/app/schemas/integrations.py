from pydantic import BaseModel


class TataFleetPushResponse(BaseModel):
    status: str
    delivery_id: str
    duplicate: bool
    event_count: int
