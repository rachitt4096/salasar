from datetime import datetime
from typing import Any

from sqlalchemy import BigInteger, Boolean, DateTime, ForeignKey, Integer, String, func
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    username: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    role: Mapped[str] = mapped_column(String(32), nullable=False)
    company: Mapped[str | None] = mapped_column(String(120))
    phone: Mapped[str | None] = mapped_column(String(32))
    assigned_truck_number: Mapped[str | None] = mapped_column(String(32))
    truck_capacity: Mapped[str | None] = mapped_column(String(32))
    license_number: Mapped[str | None] = mapped_column(String(64))
    home_base: Mapped[str | None] = mapped_column(String(120))
    duty_status: Mapped[str | None] = mapped_column(String(32))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)


class Vehicle(Base):
    __tablename__ = "vehicles"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    truck_number: Mapped[str] = mapped_column(String(32), unique=True, nullable=False)
    capacity: Mapped[str] = mapped_column(String(32), nullable=False)
    state: Mapped[str] = mapped_column(String(32), nullable=False)
    assigned_driver: Mapped[str] = mapped_column(String(120), nullable=False)
    issue_summary: Mapped[str | None] = mapped_column(String(255))
    document_warning: Mapped[str | None] = mapped_column(String(255))
    location: Mapped[str] = mapped_column(String(255), nullable=False)
    papers_status: Mapped[str] = mapped_column(String(255), nullable=False)
    driver_message: Mapped[str | None] = mapped_column(String(255))


class Customer(Base):
    __tablename__ = "customers"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    company: Mapped[str] = mapped_column(String(120), nullable=False)
    contact_name: Mapped[str] = mapped_column(String(120), nullable=False)
    contact_phone: Mapped[str] = mapped_column(String(32), nullable=False)
    address: Mapped[str] = mapped_column(String(255), nullable=False)
    site: Mapped[str] = mapped_column(String(255), nullable=False)
    material: Mapped[str] = mapped_column(String(32), nullable=False)
    quantity: Mapped[str] = mapped_column(String(64), nullable=False)
    due_text: Mapped[str] = mapped_column(String(64), nullable=False)
    remaining_amount: Mapped[str] = mapped_column(String(32), nullable=False)
    assigned_truck: Mapped[str] = mapped_column(String(32), nullable=False)
    goods_amount: Mapped[str] = mapped_column(String(32), nullable=False)
    transport_amount: Mapped[str] = mapped_column(String(32), nullable=False)
    total_amount: Mapped[str] = mapped_column(String(32), nullable=False)
    total_business: Mapped[str] = mapped_column(String(32), nullable=False)
    total_paid: Mapped[str] = mapped_column(String(32), nullable=False)
    total_remaining: Mapped[str] = mapped_column(String(32), nullable=False)

    orders: Mapped[list["Order"]] = relationship(back_populates="customer", cascade="all, delete-orphan")


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    customer_id: Mapped[str] = mapped_column(ForeignKey("customers.id"), nullable=False)
    material: Mapped[str] = mapped_column(String(32), nullable=False)
    quantity: Mapped[str] = mapped_column(String(64), nullable=False)
    site: Mapped[str] = mapped_column(String(255), nullable=False)
    due_text: Mapped[str] = mapped_column(String(64), nullable=False)
    payment_status: Mapped[str] = mapped_column(String(32), nullable=False)
    remaining_amount: Mapped[str] = mapped_column(String(32), nullable=False)
    goods_amount: Mapped[str] = mapped_column(String(32), nullable=False)
    transport_amount: Mapped[str] = mapped_column(String(32), nullable=False)
    total_amount: Mapped[str] = mapped_column(String(32), nullable=False)
    rate: Mapped[str] = mapped_column(String(32), nullable=False)
    date: Mapped[str] = mapped_column(String(64), nullable=False)
    truck_number: Mapped[str] = mapped_column(String(32), nullable=False)
    driver_name: Mapped[str] = mapped_column(String(120), nullable=False)
    source: Mapped[str] = mapped_column(String(255), nullable=False)
    note: Mapped[str] = mapped_column(String(255), nullable=False)

    customer: Mapped[Customer] = relationship(back_populates="orders")


class Trip(Base):
    __tablename__ = "trips"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    goods_load_id: Mapped[str | None] = mapped_column(String(64))
    truck_number: Mapped[str] = mapped_column(String(32), nullable=False)
    driver_name: Mapped[str] = mapped_column(String(120), nullable=False)
    source: Mapped[str] = mapped_column(String(255), nullable=False)
    destination: Mapped[str] = mapped_column(String(255), nullable=False)
    material: Mapped[str] = mapped_column(String(32), nullable=False)
    quantity: Mapped[str] = mapped_column(String(64), nullable=False)
    status: Mapped[str] = mapped_column(String(32), nullable=False)
    eta_text: Mapped[str] = mapped_column(String(64), nullable=False)
    payment_status: Mapped[str] = mapped_column(String(32), nullable=False)
    goods_amount: Mapped[str] = mapped_column(String(32), nullable=False)
    transport_amount: Mapped[str] = mapped_column(String(32), nullable=False)
    total_amount: Mapped[str] = mapped_column(String(32), nullable=False)
    company_name: Mapped[str] = mapped_column(String(120), nullable=False)
    fuel_required_liters: Mapped[int] = mapped_column(Integer, nullable=False)
    fuel_available_liters: Mapped[int] = mapped_column(Integer, nullable=False)
    distance_progress_percent: Mapped[int] = mapped_column(Integer, nullable=False)
    truck_capacity: Mapped[str] = mapped_column(String(32), nullable=False)


class FutureOrder(Base):
    __tablename__ = "future_orders"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    customer_name: Mapped[str] = mapped_column(String(120), nullable=False)
    material: Mapped[str] = mapped_column(String(32), nullable=False)
    quantity: Mapped[str] = mapped_column(String(64), nullable=False)
    due_date: Mapped[str] = mapped_column(String(64), nullable=False)


class DriverMoneyItem(Base):
    __tablename__ = "driver_money_items"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    title: Mapped[str] = mapped_column(String(120), nullable=False)
    amount: Mapped[str] = mapped_column(String(32), nullable=False)
    status: Mapped[str] = mapped_column(String(64), nullable=False)


class DriverIssue(Base):
    __tablename__ = "driver_issues"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    trip_id: Mapped[str] = mapped_column(String(64), nullable=False)
    title: Mapped[str] = mapped_column(String(120), nullable=False)
    detail: Mapped[str] = mapped_column(String(255), nullable=False)
    severity: Mapped[str] = mapped_column(String(32), nullable=False)
    status: Mapped[str] = mapped_column(String(32), nullable=False)


class TataFleetPush(Base):
    __tablename__ = "tata_fleet_pushes"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    delivery_id: Mapped[str] = mapped_column(String(128), unique=True, nullable=False, index=True)
    payload_sha256: Mapped[str] = mapped_column(String(64), nullable=False)
    event_count: Mapped[int] = mapped_column(Integer, nullable=False)
    payload: Mapped[dict[str, Any] | list[Any]] = mapped_column(JSONB, nullable=False)
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="received")
    received_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
