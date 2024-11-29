from datetime import datetime
from typing import Generic, TypeVar

from pydantic import BaseModel

from app.common.utils.string_utils import to_camel_case

T = TypeVar('T')


class BaseRequest(BaseModel, Generic[T]):
    time_stamp: datetime | None = None
    language: str | None = None
    payload: T | None = None

    class Config:
        alias_generator = to_camel_case
