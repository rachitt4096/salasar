import hashlib
from ipaddress import ip_address
import json
import secrets
from typing import Any, Annotated

from fastapi import APIRouter, Depends, Header, HTTPException, Request, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.config import settings
from app.db.models import TataFleetPush
from app.db.session import get_db
from app.schemas.integrations import TataFleetPushResponse

router = APIRouter()


def _require_tata_fleet_enabled() -> str:
    if not settings.tata_fleet_webhook_enabled or not settings.tata_fleet_webhook_secret:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Tata Fleet push receiver is not enabled",
        )
    return settings.tata_fleet_webhook_secret


def _client_ip(request: Request) -> str | None:
    candidate = request.headers.get("x-real-ip")
    if not candidate and request.client:
        candidate = request.client.host
    if not candidate:
        return None
    try:
        return str(ip_address(candidate.strip()))
    except ValueError:
        return None


def _authenticate(request: Request, secret: str, authorization: str | None, webhook_token: str | None) -> None:
    if _client_ip(request) in settings.tata_fleet_allowed_ips:
        return

    bearer_token = None
    if authorization:
        scheme, _, credentials = authorization.partition(" ")
        if scheme.lower() == "bearer" and credentials:
            bearer_token = credentials

    provided_token = webhook_token or bearer_token
    if not provided_token or not secrets.compare_digest(provided_token, secret):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid webhook credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )


def _event_count(payload: dict[str, Any] | list[Any]) -> int:
    if isinstance(payload, list):
        return len(payload)
    for key in ("data", "events", "vehicles", "records"):
        value = payload.get(key)
        if isinstance(value, list):
            return len(value)
    return 1


def _delivery_id(payload: dict[str, Any] | list[Any], supplied_id: str | None, digest: str) -> str:
    if supplied_id:
        return supplied_id[:128]
    if isinstance(payload, dict):
        for key in ("deliveryId", "delivery_id", "eventId", "event_id", "messageId", "message_id"):
            value = payload.get(key)
            if isinstance(value, (str, int)) and str(value):
                return str(value)[:128]
    return digest


@router.get("/tata-fleet/push")
def tata_fleet_push_status() -> dict[str, str]:
    _require_tata_fleet_enabled()
    return {"status": "ready"}


@router.post(
    "/tata-fleet/push",
    response_model=TataFleetPushResponse,
    status_code=status.HTTP_200_OK,
)
async def receive_tata_fleet_push(
    request: Request,
    db: Annotated[Session, Depends(get_db)],
    authorization: Annotated[str | None, Header()] = None,
    x_webhook_token: Annotated[str | None, Header(alias="X-Webhook-Token")] = None,
    x_delivery_id: Annotated[str | None, Header(alias="X-Delivery-Id")] = None,
) -> TataFleetPushResponse:
    webhook_secret = _require_tata_fleet_enabled()
    _authenticate(request, webhook_secret, authorization, x_webhook_token)

    content_length = request.headers.get("content-length")
    if content_length and content_length.isdigit() and int(content_length) > settings.tata_fleet_max_payload_bytes:
        raise HTTPException(status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, detail="Payload is too large")

    raw_payload = await request.body()
    if not raw_payload or len(raw_payload) > settings.tata_fleet_max_payload_bytes:
        raise HTTPException(status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, detail="Payload is empty or too large")

    try:
        payload = json.loads(raw_payload)
    except (UnicodeDecodeError, json.JSONDecodeError) as error:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Payload must be valid JSON") from error

    if not isinstance(payload, (dict, list)):
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Payload must be a JSON object or array")

    payload_digest = hashlib.sha256(raw_payload).hexdigest()
    delivery_id = _delivery_id(payload, x_delivery_id, payload_digest)
    event_count = _event_count(payload)
    existing = db.query(TataFleetPush).filter(TataFleetPush.delivery_id == delivery_id).first()

    if existing:
        if existing.payload_sha256 != payload_digest:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Delivery ID was already used for a different payload",
            )
        return TataFleetPushResponse(
            status="accepted",
            delivery_id=delivery_id,
            duplicate=True,
            event_count=existing.event_count,
        )

    push = TataFleetPush(
        delivery_id=delivery_id,
        payload_sha256=payload_digest,
        event_count=event_count,
        payload=payload,
        status="received",
    )
    db.add(push)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        existing = db.query(TataFleetPush).filter(TataFleetPush.delivery_id == delivery_id).first()
        if existing and existing.payload_sha256 == payload_digest:
            return TataFleetPushResponse(
                status="accepted",
                delivery_id=delivery_id,
                duplicate=True,
                event_count=existing.event_count,
            )
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Duplicate delivery conflict")

    return TataFleetPushResponse(
        status="accepted",
        delivery_id=delivery_id,
        duplicate=False,
        event_count=event_count,
    )
