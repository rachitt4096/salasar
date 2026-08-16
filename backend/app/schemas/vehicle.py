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
