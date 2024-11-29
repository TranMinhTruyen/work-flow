from http import HTTPStatus

from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from app.common.enum.message_type import MessageType
from app.controllers.response.base_response import BaseResponse


def ok_response(
        message_code: int | str | None = None,
        message_type: MessageType | None = None,
        message: str | None = None,
        body: object | None = None
) -> JSONResponse:
    response: BaseResponse = BaseResponse[type(body)]()
    response.message_code = message_code
    response.message_type = message_type
    response.message = message
    response.body = body
    return JSONResponse(
        status_code=HTTPStatus.OK.value,
        content=jsonable_encoder(response),
        media_type="application/json"
    )


def error_response(
        message_code: int | str | None = None,
        message_type: MessageType | None = None,
        message: str | None = None,
        error_list: dict | None = None
) -> JSONResponse:
    response: BaseResponse = BaseResponse()
    response.message_code = message_code
    response.message_type = message_type
    response.message = message
    response.error_list = error_list
    return JSONResponse(
        status_code=int(message_code),
        content=jsonable_encoder(response),
        media_type="application/json"
    )
