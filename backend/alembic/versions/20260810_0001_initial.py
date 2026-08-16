"""initial schema

Revision ID: 20260810_0001
Revises:
Create Date: 2026-08-10 11:10:00.000000
"""

from alembic import op
import sqlalchemy as sa


revision = "20260810_0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.String(length=64), primary_key=True),
        sa.Column("username", sa.String(length=120), nullable=False, unique=True),
        sa.Column("password_hash", sa.String(length=255), nullable=False),
        sa.Column("name", sa.String(length=120), nullable=False),
        sa.Column("role", sa.String(length=32), nullable=False),
        sa.Column("company", sa.String(length=120), nullable=True),
        sa.Column("phone", sa.String(length=32), nullable=True),
        sa.Column("assigned_truck_number", sa.String(length=32), nullable=True),
        sa.Column("truck_capacity", sa.String(length=32), nullable=True),
        sa.Column("license_number", sa.String(length=64), nullable=True),
        sa.Column("home_base", sa.String(length=120), nullable=True),
        sa.Column("duty_status", sa.String(length=32), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
    )

    op.create_table(
        "vehicles",
        sa.Column("id", sa.String(length=64), primary_key=True),
        sa.Column("truck_number", sa.String(length=32), nullable=False, unique=True),
        sa.Column("capacity", sa.String(length=32), nullable=False),
        sa.Column("state", sa.String(length=32), nullable=False),
        sa.Column("assigned_driver", sa.String(length=120), nullable=False),
        sa.Column("issue_summary", sa.String(length=255), nullable=True),
        sa.Column("document_warning", sa.String(length=255), nullable=True),
        sa.Column("location", sa.String(length=255), nullable=False),
        sa.Column("papers_status", sa.String(length=255), nullable=False),
        sa.Column("driver_message", sa.String(length=255), nullable=True),
    )

    op.create_table(
        "customers",
        sa.Column("id", sa.String(length=64), primary_key=True),
        sa.Column("name", sa.String(length=120), nullable=False),
        sa.Column("company", sa.String(length=120), nullable=False),
        sa.Column("contact_name", sa.String(length=120), nullable=False),
        sa.Column("contact_phone", sa.String(length=32), nullable=False),
        sa.Column("address", sa.String(length=255), nullable=False),
        sa.Column("site", sa.String(length=255), nullable=False),
        sa.Column("material", sa.String(length=32), nullable=False),
        sa.Column("quantity", sa.String(length=64), nullable=False),
        sa.Column("due_text", sa.String(length=64), nullable=False),
        sa.Column("remaining_amount", sa.String(length=32), nullable=False),
        sa.Column("assigned_truck", sa.String(length=32), nullable=False),
        sa.Column("goods_amount", sa.String(length=32), nullable=False),
        sa.Column("transport_amount", sa.String(length=32), nullable=False),
        sa.Column("total_amount", sa.String(length=32), nullable=False),
        sa.Column("total_business", sa.String(length=32), nullable=False),
        sa.Column("total_paid", sa.String(length=32), nullable=False),
        sa.Column("total_remaining", sa.String(length=32), nullable=False),
    )

    op.create_table(
        "orders",
        sa.Column("id", sa.String(length=64), primary_key=True),
        sa.Column("customer_id", sa.String(length=64), sa.ForeignKey("customers.id"), nullable=False),
        sa.Column("material", sa.String(length=32), nullable=False),
        sa.Column("quantity", sa.String(length=64), nullable=False),
        sa.Column("site", sa.String(length=255), nullable=False),
        sa.Column("due_text", sa.String(length=64), nullable=False),
        sa.Column("payment_status", sa.String(length=32), nullable=False),
        sa.Column("remaining_amount", sa.String(length=32), nullable=False),
        sa.Column("goods_amount", sa.String(length=32), nullable=False),
        sa.Column("transport_amount", sa.String(length=32), nullable=False),
        sa.Column("total_amount", sa.String(length=32), nullable=False),
        sa.Column("rate", sa.String(length=32), nullable=False),
        sa.Column("date", sa.String(length=64), nullable=False),
        sa.Column("truck_number", sa.String(length=32), nullable=False),
        sa.Column("driver_name", sa.String(length=120), nullable=False),
        sa.Column("source", sa.String(length=255), nullable=False),
        sa.Column("note", sa.String(length=255), nullable=False),
    )

    op.create_table(
        "trips",
        sa.Column("id", sa.String(length=64), primary_key=True),
        sa.Column("goods_load_id", sa.String(length=64), nullable=True),
        sa.Column("truck_number", sa.String(length=32), nullable=False),
        sa.Column("driver_name", sa.String(length=120), nullable=False),
        sa.Column("source", sa.String(length=255), nullable=False),
        sa.Column("destination", sa.String(length=255), nullable=False),
        sa.Column("material", sa.String(length=32), nullable=False),
        sa.Column("quantity", sa.String(length=64), nullable=False),
        sa.Column("status", sa.String(length=32), nullable=False),
        sa.Column("eta_text", sa.String(length=64), nullable=False),
        sa.Column("payment_status", sa.String(length=32), nullable=False),
        sa.Column("goods_amount", sa.String(length=32), nullable=False),
        sa.Column("transport_amount", sa.String(length=32), nullable=False),
        sa.Column("total_amount", sa.String(length=32), nullable=False),
        sa.Column("company_name", sa.String(length=120), nullable=False),
        sa.Column("fuel_required_liters", sa.Integer(), nullable=False),
        sa.Column("fuel_available_liters", sa.Integer(), nullable=False),
        sa.Column("distance_progress_percent", sa.Integer(), nullable=False),
        sa.Column("truck_capacity", sa.String(length=32), nullable=False),
    )

    op.create_table(
        "future_orders",
        sa.Column("id", sa.String(length=64), primary_key=True),
        sa.Column("customer_name", sa.String(length=120), nullable=False),
        sa.Column("material", sa.String(length=32), nullable=False),
        sa.Column("quantity", sa.String(length=64), nullable=False),
        sa.Column("due_date", sa.String(length=64), nullable=False),
    )

    op.create_table(
        "driver_money_items",
        sa.Column("id", sa.String(length=64), primary_key=True),
        sa.Column("title", sa.String(length=120), nullable=False),
        sa.Column("amount", sa.String(length=32), nullable=False),
        sa.Column("status", sa.String(length=64), nullable=False),
    )

    op.create_table(
        "driver_issues",
        sa.Column("id", sa.String(length=64), primary_key=True),
        sa.Column("trip_id", sa.String(length=64), nullable=False),
        sa.Column("title", sa.String(length=120), nullable=False),
        sa.Column("detail", sa.String(length=255), nullable=False),
        sa.Column("severity", sa.String(length=32), nullable=False),
        sa.Column("status", sa.String(length=32), nullable=False),
    )


def downgrade() -> None:
    op.drop_table("driver_issues")
    op.drop_table("driver_money_items")
    op.drop_table("future_orders")
    op.drop_table("trips")
    op.drop_table("orders")
    op.drop_table("customers")
    op.drop_table("vehicles")
    op.drop_table("users")
