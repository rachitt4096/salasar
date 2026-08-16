from fastapi import APIRouter

from app.api.routes import auth, customers, dashboard, driver, goods, health, integrations, trips, vehicles

api_router = APIRouter()
api_router.include_router(health.router, tags=["health"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(trips.router, prefix="/trips", tags=["trips"])
api_router.include_router(vehicles.router, prefix="/vehicles", tags=["vehicles"])
api_router.include_router(goods.router, prefix="/goods", tags=["goods"])
api_router.include_router(customers.router, prefix="/customers", tags=["customers"])
api_router.include_router(driver.router, prefix="/driver", tags=["driver"])
api_router.include_router(integrations.router, prefix="/integrations", tags=["integrations"])
