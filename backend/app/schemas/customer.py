from pydantic import BaseModel

from app.schemas.common import MoneyBreakdown, PaymentStatus


class CustomerSummary(BaseModel):
    id: str
    name: str
    material: str
    quantity: str
    site: str
    due_text: str
    remaining_amount: str
    assigned_truck: str
    money: MoneyBreakdown


class CustomerOrderSummary(BaseModel):
    id: str
    material: str
    quantity: str
    site: str
    due_text: str
    payment_status: PaymentStatus
    remaining_amount: str
    money: MoneyBreakdown


class CustomerDetail(CustomerSummary):
    company: str
    contact_name: str
    contact_phone: str
    address: str
    total_business: str
    total_paid: str
    total_remaining: str
    orders: list[CustomerOrderSummary]


class OrderDetail(CustomerOrderSummary):
    customer_id: str
    customer_name: str
    rate: str
    date: str
    truck_number: str
    driver_name: str
    source: str
    note: str


class CustomerListResponse(BaseModel):
    items: list[CustomerSummary]


class InvoiceShareResponse(BaseModel):
    order_id: str
    channel: str
    message: str
