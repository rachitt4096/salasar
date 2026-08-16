from __future__ import annotations

from uuid import uuid4

from sqlalchemy.orm import Session, joinedload

from app.core.security import create_access_token, verify_password
from app.db.models import Customer, DriverIssue, DriverMoneyItem, FutureOrder, Order, Trip, User, Vehicle
from app.schemas.auth import LoginRequest, MeResponse, TokenResponse
from app.schemas.common import MoneyBreakdown
from app.schemas.customer import CustomerDetail, CustomerOrderSummary, CustomerSummary, InvoiceShareResponse, OrderDetail
from app.schemas.dashboard import DashboardMetric, DashboardResponse
from app.schemas.driver import DriverHomeResponse, DriverIssueCreate, DriverIssueResponse, DriverMoneyItem as DriverMoneyItemSchema, DriverMoneyResponse, DriverProfile, DriverTripCard
from app.schemas.goods import FutureOrderCard, GoodsCustomerCard, GoodsOverviewResponse, GoodsTruckCard
from app.schemas.trip import TripDetail
from app.schemas.vehicle import VehicleDetail


def login(db: Session, payload: LoginRequest) -> TokenResponse | None:
    user = db.query(User).filter(User.username == payload.username).first()
    if user is None or not verify_password(payload.password, user.password_hash):
        return None
    return TokenResponse(access_token=create_access_token(user.id, user.role), role=user.role)


def get_me(user: User) -> MeResponse:
    return MeResponse(
        id=user.id,
        name=user.name,
        role=user.role,
        company=user.company or "Salasar Logistics",
    )


def get_dashboard(db: Session) -> DashboardResponse:
    trips = db.query(Trip).all()
    vehicles = db.query(Vehicle).all()
    partial_orders = db.query(Order).filter(Order.payment_status != "paid").all()
    active_count = sum(1 for trip in trips if trip.status in {"active", "loading"})
    delayed_count = sum(1 for trip in trips if trip.status == "delayed")
    idle_count = sum(1 for vehicle in vehicles if vehicle.state in {"idle", "available"})
    return DashboardResponse(
        active_trips=str(active_count),
        delayed_trips=str(delayed_count),
        idle_vehicles=str(idle_count),
        payments_remaining=_sum_money(order.remaining_amount for order in partial_orders),
        metrics=[
            DashboardMetric(label="Today", value="8", hint="Scheduled trips"),
            DashboardMetric(label="Completed", value="19", hint="This week"),
            DashboardMetric(label="Driver issues", value=str(db.query(DriverIssue).count()), hint="Need follow-up"),
        ],
    )


def list_trips(db: Session) -> list[TripDetail]:
    return [_trip_to_schema(item) for item in db.query(Trip).order_by(Trip.id.desc()).all()]


def get_trip(db: Session, trip_id: str) -> TripDetail | None:
    trip = db.get(Trip, trip_id)
    return _trip_to_schema(trip) if trip else None


def list_vehicles(db: Session) -> list[VehicleDetail]:
    return [_vehicle_to_schema(item) for item in db.query(Vehicle).order_by(Vehicle.truck_number).all()]


def get_vehicle(db: Session, vehicle_id: str) -> VehicleDetail | None:
    vehicle = db.get(Vehicle, vehicle_id)
    return _vehicle_to_schema(vehicle) if vehicle else None


def list_customers(db: Session) -> list[CustomerSummary]:
    customers = db.query(Customer).order_by(Customer.name).all()
    return [_customer_summary_schema(item) for item in customers]


def get_customer(db: Session, customer_id: str) -> CustomerDetail | None:
    customer = (
        db.query(Customer)
        .options(joinedload(Customer.orders))
        .filter(Customer.id == customer_id)
        .first()
    )
    if customer is None:
        return None
    return CustomerDetail(
        **_customer_summary_schema(customer).model_dump(),
        company=customer.company,
        contact_name=customer.contact_name,
        contact_phone=customer.contact_phone,
        address=customer.address,
        total_business=customer.total_business,
        total_paid=customer.total_paid,
        total_remaining=customer.total_remaining,
        orders=[_order_summary_schema(order) for order in customer.orders],
    )


def get_order(db: Session, order_id: str) -> OrderDetail | None:
    order = db.query(Order).filter(Order.id == order_id).first()
    if order is None:
        return None
    customer = db.get(Customer, order.customer_id)
    if customer is None:
        return None
    return OrderDetail(
        **_order_summary_schema(order).model_dump(),
        customer_id=customer.id,
        customer_name=customer.name,
        rate=order.rate,
        date=order.date,
        truck_number=order.truck_number,
        driver_name=order.driver_name,
        source=order.source,
        note=order.note,
    )


def share_invoice(db: Session, order_id: str) -> InvoiceShareResponse | None:
    order = get_order(db, order_id)
    if order is None:
        return None
    message = (
        f"Invoice {order.id} for {order.customer_name}: "
        f"{order.material} {order.quantity}, goods {order.money.goods_amount}, "
        f"transport {order.money.transport_amount}, total {order.money.total_amount}, "
        f"remaining {order.remaining_amount}."
    )
    return InvoiceShareResponse(order_id=order.id, channel="whatsapp_or_pdf", message=message)


def get_goods_overview(db: Session) -> GoodsOverviewResponse:
    customers = list_customers(db)
    future_orders = db.query(FutureOrder).order_by(FutureOrder.due_date).all()
    trips = db.query(Trip).order_by(Trip.id.desc()).all()
    return GoodsOverviewResponse(
        customers=[
            GoodsCustomerCard(
                id=item.id,
                customer_name=item.name,
                material=item.material,
                quantity=item.quantity,
                due_text=item.due_text,
                remaining_amount=item.remaining_amount,
                assigned_truck=item.assigned_truck,
                site=item.site,
                money=item.money,
            )
            for item in customers
        ],
        future_orders=[
            FutureOrderCard(
                customer_name=item.customer_name,
                material=item.material,
                quantity=item.quantity,
                due_date=item.due_date,
            )
            for item in future_orders
        ],
        truck_loads=[
            GoodsTruckCard(
                goods_load_id=item.goods_load_id or "-",
                trip_id=item.id,
                truck_number=item.truck_number,
                driver_name=item.driver_name,
                source=item.source,
                destination=item.destination,
                material=item.material,
                quantity=item.quantity,
                status=item.status,
                money=_money(item.goods_amount, item.transport_amount, item.total_amount),
            )
            for item in trips
        ],
    )


def get_driver_home(db: Session, user: User) -> DriverHomeResponse:
    driver_trips = db.query(Trip).filter(Trip.driver_name == user.name).order_by(Trip.id.desc()).all()
    active_trip = next((trip for trip in driver_trips if trip.status in {"active", "loading"}), driver_trips[0])
    return DriverHomeResponse(
        profile=DriverProfile(
            id=user.id,
            name=user.name,
            phone=user.phone or "",
            truck_number=user.assigned_truck_number or "",
            truck_capacity=user.truck_capacity or "",
            duty_status=user.duty_status or "off_duty",
        ),
        active_trip=_driver_trip_schema(active_trip),
        today_trips=[_driver_trip_schema(item) for item in driver_trips[:3]],
    )


def get_driver_money(db: Session) -> DriverMoneyResponse:
    items = db.query(DriverMoneyItem).order_by(DriverMoneyItem.id).all()
    return DriverMoneyResponse(
        cash_to_submit="₹18,400",
        items=[DriverMoneyItemSchema(title=item.title, amount=item.amount, status=item.status) for item in items],
    )


def create_driver_issue(db: Session, payload: DriverIssueCreate) -> DriverIssueResponse:
    issue = DriverIssue(
        id=f"issue_{uuid4().hex[:8]}",
        trip_id=payload.trip_id,
        title=payload.title,
        detail=payload.detail,
        severity=payload.severity,
        status="reported",
    )
    db.add(issue)
    db.commit()
    db.refresh(issue)
    return DriverIssueResponse(
        id=issue.id,
        trip_id=issue.trip_id,
        title=issue.title,
        detail=issue.detail,
        severity=issue.severity,
        status=issue.status,
    )


def _money(goods_amount: str, transport_amount: str, total_amount: str) -> MoneyBreakdown:
    return MoneyBreakdown(goods_amount=goods_amount, transport_amount=transport_amount, total_amount=total_amount)


def _customer_summary_schema(customer: Customer) -> CustomerSummary:
    return CustomerSummary(
        id=customer.id,
        name=customer.name,
        material=customer.material,
        quantity=customer.quantity,
        site=customer.site,
        due_text=customer.due_text,
        remaining_amount=customer.remaining_amount,
        assigned_truck=customer.assigned_truck,
        money=_money(customer.goods_amount, customer.transport_amount, customer.total_amount),
    )


def _order_summary_schema(order: Order) -> CustomerOrderSummary:
    return CustomerOrderSummary(
        id=order.id,
        material=order.material,
        quantity=order.quantity,
        site=order.site,
        due_text=order.due_text,
        payment_status=order.payment_status,
        remaining_amount=order.remaining_amount,
        money=_money(order.goods_amount, order.transport_amount, order.total_amount),
    )


def _trip_to_schema(item: Trip) -> TripDetail:
    return TripDetail(
        id=item.id,
        goods_load_id=item.goods_load_id,
        truck_number=item.truck_number,
        driver_name=item.driver_name,
        source=item.source,
        destination=item.destination,
        material=item.material,
        quantity=item.quantity,
        status=item.status,
        eta_text=item.eta_text,
        payment_status=item.payment_status,
        money=_money(item.goods_amount, item.transport_amount, item.total_amount),
        company_name=item.company_name,
        fuel_required_liters=item.fuel_required_liters,
        fuel_available_liters=item.fuel_available_liters,
        distance_progress_percent=item.distance_progress_percent,
        truck_capacity=item.truck_capacity,
    )


def _vehicle_to_schema(item: Vehicle) -> VehicleDetail:
    return VehicleDetail(
        id=item.id,
        truck_number=item.truck_number,
        capacity=item.capacity,
        state=item.state,
        assigned_driver=item.assigned_driver,
        issue_summary=item.issue_summary,
        document_warning=item.document_warning,
        location=item.location,
        papers_status=item.papers_status,
        driver_message=item.driver_message,
    )


def _driver_trip_schema(item: Trip) -> DriverTripCard:
    status_label = "active" if item.status == "active" else ("next" if item.status == "loading" else item.status)
    return DriverTripCard(
        trip_id=item.id,
        goods_load_id=item.goods_load_id or "-",
        material=item.material,
        quantity=item.quantity,
        route=f"{item.source} to {item.destination}",
        pickup_text=item.eta_text,
        drop_text=item.destination,
        customer_name=item.company_name,
        amount=item.total_amount,
        status=status_label,
    )


def _sum_money(values) -> str:
    total = 0
    for value in values:
        digits = value.replace("₹", "").replace(",", "").strip()
        try:
            total += int(float(digits))
        except ValueError:
            continue
    return f"₹{total:,}"
