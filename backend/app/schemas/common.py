from typing import Literal

from pydantic import BaseModel

PaymentStatus = Literal["paid", "partial", "unpaid"]
TripStatus = Literal["active", "loading", "completed", "delayed", "unassigned"]
VehicleState = Literal["running", "idle", "available", "broken", "maintenance"]
IssueSeverity = Literal["low", "medium", "high", "critical"]


class MoneyBreakdown(BaseModel):
    goods_amount: str
    transport_amount: str
    total_amount: str
