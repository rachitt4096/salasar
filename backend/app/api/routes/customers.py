from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import require_roles
from app.db.models import User
from app.db.session import get_db
from app.schemas.customer import CustomerDetail, CustomerListResponse, InvoiceShareResponse, OrderDetail
from app.services import store

router = APIRouter()


@router.get("", response_model=CustomerListResponse)
def list_customers(
    db: Annotated[Session, Depends(get_db)],
    _: Annotated[User, Depends(require_roles("owner", "manager"))],
) -> CustomerListResponse:
    return CustomerListResponse(items=store.list_customers(db))


@router.get("/orders/{order_id}", response_model=OrderDetail)
def get_order(
    order_id: str,
    db: Annotated[Session, Depends(get_db)],
    _: Annotated[User, Depends(require_roles("owner", "manager"))],
) -> OrderDetail:
    order = store.get_order(db, order_id)
    if order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.post("/orders/{order_id}/share-invoice", response_model=InvoiceShareResponse)
def share_invoice(
    order_id: str,
    db: Annotated[Session, Depends(get_db)],
    _: Annotated[User, Depends(require_roles("owner", "manager"))],
) -> InvoiceShareResponse:
    invoice = store.share_invoice(db, order_id)
    if invoice is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return invoice


@router.get("/{customer_id}", response_model=CustomerDetail)
def get_customer(
    customer_id: str,
    db: Annotated[Session, Depends(get_db)],
    _: Annotated[User, Depends(require_roles("owner", "manager"))],
) -> CustomerDetail:
    customer = store.get_customer(db, customer_id)
    if customer is None:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer
