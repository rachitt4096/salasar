from sqlalchemy.orm import Session

from app.core.security import get_password_hash
from app.db.models import Customer, DriverMoneyItem, FutureOrder, Order, Trip, User, Vehicle


def seed_database(db: Session) -> None:
    if db.query(User).first():
        return

    db.add_all(
        [
            User(
                id="owner_1",
                username="owner@salasar.local",
                password_hash=get_password_hash("owner123"),
                name="Rachit Sharma",
                role="owner",
                company="Salasar Logistics",
                phone="+91 98290 44120",
                is_active=True,
            ),
            User(
                id="driver_1",
                username="driver@salasar.local",
                password_hash=get_password_hash("driver123"),
                name="Rakesh Kumar",
                role="driver",
                company="Salasar Logistics",
                phone="+91 98290 11840",
                assigned_truck_number="RJ 14 GC 8241",
                truck_capacity="18 ton",
                license_number="RJ-2028-4419",
                home_base="Jaipur HQ",
                duty_status="on_duty",
                is_active=True,
            ),
        ]
    )

    db.add_all(
        [
            Vehicle(
                id="veh_1",
                truck_number="RJ 14 GC 8241",
                capacity="18 ton",
                state="running",
                assigned_driver="Rakesh Kumar",
                issue_summary=None,
                document_warning=None,
                location="Banas river yard",
                papers_status="All valid",
                driver_message=None,
            ),
            Vehicle(
                id="veh_2",
                truck_number="RJ 27 GB 9228",
                capacity="10 ton",
                state="maintenance",
                assigned_driver="Naresh Meena",
                issue_summary="Driver reported front tyre wear",
                document_warning="Insurance expires in 4 days",
                location="Factory loading point",
                papers_status="Insurance expiring soon",
                driver_message="Tyre vibration after 60 km/h",
            ),
        ]
    )

    customers = [
        Customer(
            id="shree-balaji-builders",
            name="Shree Balaji Builders",
            company="Shree Balaji Builders Pvt Ltd",
            contact_name="Mukesh Sharma",
            contact_phone="+91 98290 44120",
            address="Vaishali Nagar, Jaipur",
            site="Vaishali Nagar Site",
            material="Sand",
            quantity="22 ton",
            due_text="Today 5 PM",
            remaining_amount="₹18,400",
            assigned_truck="RJ 02 PB 3301",
            goods_amount="₹29,700",
            transport_amount="₹6,600",
            total_amount="₹36,300",
            total_business="₹1,10,100",
            total_paid="₹91,700",
            total_remaining="₹18,400",
        ),
        Customer(
            id="mahadev-construction",
            name="Mahadev Construction",
            company="Mahadev Construction Co.",
            contact_name="Dinesh Meena",
            contact_phone="+91 94140 77018",
            address="Mansarovar, Jaipur",
            site="Mansarovar Block C",
            material="Blocks",
            quantity="4,800 pcs",
            due_text="Tomorrow",
            remaining_amount="₹42,000",
            assigned_truck="RJ 27 GB 9228",
            goods_amount="₹1,48,800",
            transport_amount="₹14,800",
            total_amount="₹1,63,600",
            total_business="₹1,93,300",
            total_paid="₹1,51,300",
            total_remaining="₹42,000",
        ),
        Customer(
            id="rk-infra",
            name="R.K. Infra",
            company="R.K. Infra Projects",
            contact_name="Rajesh Verma",
            contact_phone="+91 99822 11880",
            address="Ajmer Road, Jaipur",
            site="Ajmer Road Plot",
            material="Cement",
            quantity="300 bags",
            due_text="12 Aug",
            remaining_amount="₹0",
            assigned_truck="RJ 14 GC 8241",
            goods_amount="₹1,23,000",
            transport_amount="₹8,900",
            total_amount="₹1,31,900",
            total_business="₹1,31,900",
            total_paid="₹1,31,900",
            total_remaining="₹0",
        ),
    ]
    db.add_all(customers)

    db.add_all(
        [
            Order(
                id="INV-2048",
                customer_id="shree-balaji-builders",
                material="Sand",
                quantity="22 ton",
                site="Vaishali Nagar Site",
                due_text="Today 5 PM",
                payment_status="partial",
                remaining_amount="₹18,400",
                goods_amount="₹29,700",
                transport_amount="₹6,600",
                total_amount="₹36,300",
                rate="₹1,650/t",
                date="10 Aug 2026",
                truck_number="RJ 02 PB 3301",
                driver_name="Vikram Singh",
                source="Banas river yard",
                note="Send before evening casting work.",
            ),
            Order(
                id="INV-2031",
                customer_id="shree-balaji-builders",
                material="Cement",
                quantity="180 bags",
                site="Vaishali Nagar Site",
                due_text="Paid",
                payment_status="paid",
                remaining_amount="₹0",
                goods_amount="₹73,800",
                transport_amount="₹0",
                total_amount="₹73,800",
                rate="₹410/bag",
                date="4 Aug 2026",
                truck_number="RJ 14 GC 8241",
                driver_name="Rakesh Kumar",
                source="Depot",
                note="Delivered at main gate.",
            ),
            Order(
                id="INV-2047",
                customer_id="mahadev-construction",
                material="Blocks",
                quantity="4,800 pcs",
                site="Mansarovar Block C",
                due_text="Tomorrow",
                payment_status="partial",
                remaining_amount="₹42,000",
                goods_amount="₹1,48,800",
                transport_amount="₹14,800",
                total_amount="₹1,63,600",
                rate="₹31/pc",
                date="10 Aug 2026",
                truck_number="RJ 27 GB 9228",
                driver_name="Naresh Meena",
                source="Factory",
                note="Unload at tower 2 side.",
            ),
            Order(
                id="INV-2046",
                customer_id="rk-infra",
                material="Cement",
                quantity="300 bags",
                site="Ajmer Road Plot",
                due_text="12 Aug",
                payment_status="paid",
                remaining_amount="₹0",
                goods_amount="₹1,23,000",
                transport_amount="₹8,900",
                total_amount="₹1,31,900",
                rate="₹410/bag",
                date="9 Aug 2026",
                truck_number="RJ 14 GC 8241",
                driver_name="Rakesh Kumar",
                source="Depot",
                note="Full advance received.",
            ),
        ]
    )

    db.add_all(
        [
            Trip(
                id="TR-2048",
                goods_load_id="GL-118",
                truck_number="RJ 14 GC 8241",
                driver_name="Rakesh Kumar",
                source="Banas river yard",
                destination="Jaipur stockyard",
                material="Sand",
                quantity="18 ton",
                status="active",
                eta_text="2h 20m remaining",
                payment_status="partial",
                goods_amount="₹29,700",
                transport_amount="₹6,600",
                total_amount="₹36,300",
                company_name="Shree Balaji Builders Pvt Ltd",
                fuel_required_liters=110,
                fuel_available_liters=70,
                distance_progress_percent=64,
                truck_capacity="18 ton",
            ),
            Trip(
                id="TR-2047",
                goods_load_id="GL-117",
                truck_number="RJ 27 GB 9228",
                driver_name="Naresh Meena",
                source="Factory",
                destination="Mahadev Construction",
                material="Blocks",
                quantity="3,200 pcs",
                status="loading",
                eta_text="Loading at origin",
                payment_status="partial",
                goods_amount="₹99,200",
                transport_amount="₹14,800",
                total_amount="₹1,14,000",
                company_name="Mahadev Construction Co.",
                fuel_required_liters=95,
                fuel_available_liters=90,
                distance_progress_percent=8,
                truck_capacity="10 ton",
            ),
        ]
    )

    db.add_all(
        [
            FutureOrder(id="fo_1", customer_name="Ganpati Developers", material="Sand", quantity="30 ton", due_date="14 Aug 2026"),
            FutureOrder(id="fo_2", customer_name="Arihant Homes", material="Blocks", quantity="6,000 pcs", due_date="16 Aug 2026"),
            FutureOrder(id="fo_3", customer_name="S.K. Traders", material="Cement", quantity="500 bags", due_date="18 Aug 2026"),
        ]
    )

    db.add_all(
        [
            DriverMoneyItem(id="money_1", title="Diesel advance", amount="₹5,000", status="paid"),
            DriverMoneyItem(id="money_2", title="Toll claim", amount="₹1,240", status="submit_bill"),
            DriverMoneyItem(id="money_3", title="Cash collected", amount="₹18,400", status="give_owner"),
        ]
    )

    db.commit()
