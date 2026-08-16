from typing import Any, Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import require_roles
from app.db.models import TataFleetPush, User
from app.db.session import get_db
from app.schemas.vehicle import VehicleDetail, VehicleLiveLocation, VehicleLiveLocationListResponse, VehicleListResponse
from app.services import store

router = APIRouter()


def _number(value: object) -> float | None:
    if isinstance(value, bool):
        return None
    if isinstance(value, (int, float)):
        return float(value)
    if isinstance(value, str):
        try:
            return float(value)
        except ValueError:
            return None
    return None


def _integer(value: object) -> int | None:
    number = _number(value)
    return int(number) if number is not None else None


def _telemetry_records(payload: dict[str, Any] | list[Any]) -> list[dict[str, Any]]:
    if isinstance(payload, list):
        return [item for item in payload if isinstance(item, dict)]
    if not isinstance(payload, dict):
        return []
    if "gpsLatitude" in payload or "gpsLongitude" in payload:
        return [payload]
    for key in ("data", "events", "vehicles", "records"):
        nested = payload.get(key)
        if isinstance(nested, list):
            return [item for item in nested if isinstance(item, dict)]
    return []


def _live_location(record: dict[str, Any], received_at: object) -> VehicleLiveLocation | None:
    latitude = _number(record.get("gpsLatitude"))
    longitude = _number(record.get("gpsLongitude"))
    vehicle_id = record.get("vehicleId") or record.get("registrationNumber")
    if latitude is None or longitude is None or not -90 <= latitude <= 90 or not -180 <= longitude <= 180:
        return None
    if not isinstance(vehicle_id, (str, int)) or not str(vehicle_id).strip():
        return None
    return VehicleLiveLocation(
        vehicle_id=str(vehicle_id).strip(),
        registration_number=_string(record.get("registrationNumber")),
        latitude=latitude,
        longitude=longitude,
        heading_degrees=_integer(record.get("gpsCourseInDegrees")),
        speed_kph=_number(record.get("speed")),
        ignition_on=_boolean(record.get("ignitionOn")),
        vehicle_status=_string(record.get("vehicleStatus")),
        gps_fix=_boolean(record.get("gpsFix")),
        reported_at=received_at,
    )


def _string(value: object) -> str | None:
    return str(value).strip() if isinstance(value, (str, int, float)) and str(value).strip() else None


def _boolean(value: object) -> bool | None:
    if isinstance(value, bool):
        return value
    if isinstance(value, str) and value.lower() in {"true", "false"}:
        return value.lower() == "true"
    return None


@router.get("", response_model=VehicleListResponse)
def list_vehicles(
    db: Annotated[Session, Depends(get_db)],
    _: Annotated[User, Depends(require_roles("owner", "manager"))],
) -> VehicleListResponse:
    return VehicleListResponse(items=store.list_vehicles(db))


@router.get("/live-locations", response_model=VehicleLiveLocationListResponse)
def list_live_locations(
    db: Annotated[Session, Depends(get_db)],
    _: Annotated[User, Depends(require_roles("owner", "manager"))],
) -> VehicleLiveLocationListResponse:
    pushes = db.query(TataFleetPush).order_by(TataFleetPush.received_at.desc()).limit(5_000).all()
    locations: dict[str, VehicleLiveLocation] = {}
    for push in pushes:
        for record in _telemetry_records(push.payload):
            location = _live_location(record, push.received_at)
            if location and location.vehicle_id not in locations:
                locations[location.vehicle_id] = location
    return VehicleLiveLocationListResponse(items=list(locations.values()))


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
