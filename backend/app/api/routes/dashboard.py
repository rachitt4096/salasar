from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import require_roles
from app.db.models import User
from app.db.session import get_db
from app.schemas.dashboard import DashboardResponse
from app.services import store

router = APIRouter()


@router.get("", response_model=DashboardResponse)
def owner_dashboard(
    db: Annotated[Session, Depends(get_db)],
    _: Annotated[User, Depends(require_roles("owner", "manager"))],
) -> DashboardResponse:
    return store.get_dashboard(db)
