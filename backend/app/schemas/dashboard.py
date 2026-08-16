from pydantic import BaseModel


class DashboardMetric(BaseModel):
    label: str
    value: str
    hint: str


class DashboardResponse(BaseModel):
    active_trips: str
    delayed_trips: str
    idle_vehicles: str
    payments_remaining: str
    metrics: list[DashboardMetric]
