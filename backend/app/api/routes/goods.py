from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import require_roles
from app.db.models import User
from app.db.session import get_db
from app.schemas.goods import GoodsOverviewResponse
from app.services import store

router = APIRouter()


@router.get("", response_model=GoodsOverviewResponse)
def goods_overview(
    db: Annotated[Session, Depends(get_db)],
    _: Annotated[User, Depends(require_roles("owner", "manager"))],
) -> GoodsOverviewResponse:
    return store.get_goods_overview(db)
