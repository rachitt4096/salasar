from pydantic import BaseModel

from app.schemas.common import MoneyBreakdown, TripStatus


class TripSummary(BaseModel):
    id: str
    goods_load_id: str | None = None
    truck_number: str
    driver_name: str
    source: str
    destination: str
    material: str
    quantity: str
    status: TripStatus
    eta_text: str
    payment_status: str
    money: MoneyBreakdown


class TripDetail(TripSummary):
    company_name: str
    fuel_required_liters: int
    fuel_available_liters: int
    distance_progress_percent: int
    truck_capacity: str


class TripListResponse(BaseModel):
    items: list[TripDetail]
