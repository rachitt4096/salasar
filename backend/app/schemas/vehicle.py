from datetime import datetime

from pydantic import BaseModel

from app.schemas.common import VehicleState


class VehicleSummary(BaseModel):
    id: str
    truck_number: str
    capacity: str
    state: VehicleState
    assigned_driver: str
    issue_summary: str | None = None
    document_warning: str | None = None


class VehicleDetail(VehicleSummary):
    location: str
    papers_status: str
    driver_message: str | None = None


class VehicleListResponse(BaseModel):
    items: list[VehicleDetail]


class VehicleLiveLocation(BaseModel):
    vehicle_id: str
    registration_number: str | None = None
    latitude: float
    longitude: float
    heading_degrees: int | None = None
    speed_kph: float | None = None
    ignition_on: bool | None = None
    vehicle_status: str | None = None
    gps_fix: bool | None = None
    reported_at: datetime


class VehicleLiveLocationListResponse(BaseModel):
    items: list[VehicleLiveLocation]
