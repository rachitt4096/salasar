from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_roles
from app.db.models import User
from app.db.session import get_db
from app.schemas.driver import DriverHomeResponse, DriverIssueCreate, DriverIssueResponse, DriverMoneyResponse
from app.services import store

router = APIRouter()


@router.get("/home", response_model=DriverHomeResponse)
def driver_home(
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(require_roles("driver"))],
) -> DriverHomeResponse:
    return store.get_driver_home(db, current_user)


@router.get("/money", response_model=DriverMoneyResponse)
def driver_money(
    db: Annotated[Session, Depends(get_db)],
    _: Annotated[User, Depends(require_roles("driver"))],
) -> DriverMoneyResponse:
    return store.get_driver_money(db)


@router.post("/issues", response_model=DriverIssueResponse, status_code=201)
def create_driver_issue(
    payload: DriverIssueCreate,
    db: Annotated[Session, Depends(get_db)],
    _: Annotated[User, Depends(get_current_user)],
) -> DriverIssueResponse:
    return store.create_driver_issue(db, payload)
