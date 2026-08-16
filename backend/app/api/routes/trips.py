from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import require_roles
from app.db.models import User
from app.db.session import get_db
from app.schemas.trip import TripDetail, TripListResponse
from app.services import store

router = APIRouter()


@router.get("", response_model=TripListResponse)
def list_trips(
    db: Annotated[Session, Depends(get_db)],
    _: Annotated[User, Depends(require_roles("owner", "manager", "driver"))],
) -> TripListResponse:
    return TripListResponse(items=store.list_trips(db))


@router.get("/{trip_id}", response_model=TripDetail)
def get_trip(
    trip_id: str,
    db: Annotated[Session, Depends(get_db)],
    _: Annotated[User, Depends(require_roles("owner", "manager", "driver"))],
) -> TripDetail:
    trip = store.get_trip(db, trip_id)
    if trip is None:
        raise HTTPException(status_code=404, detail="Trip not found")
    return trip
