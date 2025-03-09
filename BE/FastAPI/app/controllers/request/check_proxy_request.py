from pydantic import BaseModel

from app.common.utils.string_utils import to_camel_case


class CheckProxyRequest(BaseModel):
    ip_address: str | None = None
    mac_address: str | None = None

    class Config:
        alias_generator = to_camel_case
