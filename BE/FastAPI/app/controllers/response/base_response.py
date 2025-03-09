from datetime import datetime
from typing import Generic, TypeVar

from pydantic import BaseModel

from app.common.enum.message_type import MessageType
from app.common.utils.string_utils import to_camel_case

T = TypeVar('T')


class BaseResponse(BaseModel, Generic[T]):
    time_stamp: datetime = datetime.now()
    message_code: int | str | None = None
    message_type: MessageType | None = None
    message: str | None = None
    body: T | object | None = None
    error_list: dict | None = None

    class Config:
        alias_generator = to_camel_case
