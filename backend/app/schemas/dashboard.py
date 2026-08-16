from pydantic import BaseModel


class DashboardMetric(BaseModel):
    label: str
    value: str
    hint: str


class DashboardSummaryCard(BaseModel):
    label: str
    value: str
    hint: str
    icon: str
    tone: str


class DashboardAttentionItem(BaseModel):
    title: str
    detail: str
    action: str
    icon: str
    tone: str


class DashboardBusinessMetric(BaseModel):
    label: str
    value: str
    hint: str
    icon: str
    tone: str


class DashboardResponse(BaseModel):
    active_trips: str
    delayed_trips: str
    idle_vehicles: str
    payments_remaining: str
    metrics: list[DashboardMetric]
    greeting_name: str
    summary_cards: list[DashboardSummaryCard]
    protection_count: int
    protection_amount: str
    attention_items: list[DashboardAttentionItem]
    business_metrics: list[DashboardBusinessMetric]
