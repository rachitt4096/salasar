from pydantic import BaseModel


class MeResponse(BaseModel):
    id: str
    name: str
    role: str
    company: str


class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
