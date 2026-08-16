"""store Tata Fleet push deliveries

Revision ID: 20260816_0002
Revises: 20260810_0001
Create Date: 2026-08-16 15:20:00.000000
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


revision = "20260816_0002"
down_revision = "20260810_0001"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "tata_fleet_pushes",
        sa.Column("id", sa.BigInteger(), autoincrement=True, nullable=False),
        sa.Column("delivery_id", sa.String(length=128), nullable=False),
        sa.Column("payload_sha256", sa.String(length=64), nullable=False),
        sa.Column("event_count", sa.Integer(), nullable=False),
        sa.Column("payload", postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column("status", sa.String(length=32), nullable=False),
        sa.Column("received_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("delivery_id"),
    )
    op.create_index("ix_tata_fleet_pushes_delivery_id", "tata_fleet_pushes", ["delivery_id"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_tata_fleet_pushes_delivery_id", table_name="tata_fleet_pushes")
    op.drop_table("tata_fleet_pushes")
