from pydantic import BaseModel


class ErrorDetail(BaseModel):
    message: dict | None = None
