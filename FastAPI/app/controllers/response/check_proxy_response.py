from pydantic import BaseModel

from app.common.utils.string_utils import to_camel_case


class CheckProxyResponse(BaseModel):
    role: str | None = None

    class Config:
        alias_generator = to_camel_case
