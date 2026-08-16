from pydantic import BaseModel

from app.schemas.common import MoneyBreakdown


class GoodsCustomerCard(BaseModel):
    id: str
    customer_name: str
    material: str
    quantity: str
    due_text: str
    remaining_amount: str
    assigned_truck: str
    site: str
    money: MoneyBreakdown


class FutureOrderCard(BaseModel):
    customer_name: str
    material: str
    quantity: str
    due_date: str


class GoodsTruckCard(BaseModel):
    goods_load_id: str
    trip_id: str
    truck_number: str
    driver_name: str
    source: str
    destination: str
    material: str
    quantity: str
    status: str
    money: MoneyBreakdown


class GoodsOverviewResponse(BaseModel):
    customers: list[GoodsCustomerCard]
    future_orders: list[FutureOrderCard]
    truck_loads: list[GoodsTruckCard]
