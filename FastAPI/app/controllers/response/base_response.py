from datetime import datetime

from pydantic import BaseModel

from app.common.enum.message_type import MessageType
from app.common.utils.string_utils import to_camel_case


class BaseResponse(BaseModel):
    time_stamp: datetime = datetime.now()
    message_code: str | None = None
    message_type: MessageType | None = None
    message: str | None = None
    body: object | None = None
    error_list: dict | None = None

    class Config:
        alias_generator = to_camel_case
