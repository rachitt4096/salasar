from pydantic import BaseModel

from app.schemas.common import IssueSeverity


class DriverProfile(BaseModel):
    id: str
    name: str
    phone: str
    truck_number: str
    truck_capacity: str
    duty_status: str


class DriverTripCard(BaseModel):
    trip_id: str
    goods_load_id: str
    material: str
    quantity: str
    route: str
    pickup_text: str
    drop_text: str
    customer_name: str
    amount: str
    status: str


class DriverHomeResponse(BaseModel):
    profile: DriverProfile
    active_trip: DriverTripCard
    today_trips: list[DriverTripCard]


class DriverIssueCreate(BaseModel):
    trip_id: str
    title: str
    detail: str
    severity: IssueSeverity


class DriverIssueResponse(BaseModel):
    id: str
    trip_id: str
    title: str
    detail: str
    severity: IssueSeverity
    status: str


class DriverMoneyItem(BaseModel):
    title: str
    amount: str
    status: str


class DriverMoneyResponse(BaseModel):
    cash_to_submit: str
    items: list[DriverMoneyItem]
