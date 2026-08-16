from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import require_roles
from app.db.models import User
from app.db.session import get_db
from app.schemas.vehicle import VehicleDetail, VehicleListResponse
from app.services import store

router = APIRouter()


@router.get("", response_model=VehicleListResponse)
def list_vehicles(
    db: Annotated[Session, Depends(get_db)],
    _: Annotated[User, Depends(require_roles("owner", "manager"))],
) -> VehicleListResponse:
    return VehicleListResponse(items=store.list_vehicles(db))


@router.get("/{vehicle_id}", response_model=VehicleDetail)
def get_vehicle(
    vehicle_id: str,
    db: Annotated[Session, Depends(get_db)],
    _: Annotated[User, Depends(require_roles("owner", "manager"))],
) -> VehicleDetail:
    vehicle = store.get_vehicle(db, vehicle_id)
    if vehicle is None:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return vehicle
