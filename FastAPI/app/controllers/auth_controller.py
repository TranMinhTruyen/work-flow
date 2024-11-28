from http import HTTPStatus

from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from starlette.responses import JSONResponse

from app.common.enum.message_type import MessageType
from app.controllers.response.base_response import BaseResponse

router = APIRouter(
    tags=["Auth"],
    prefix="/auth",
)


@router.get(path="/test")
async def root() -> JSONResponse:
    response: BaseResponse = BaseResponse()
    response.message_code = HTTPStatus.OK.value
    response.message_type = MessageType.SUCCESS.value
    return JSONResponse(
        status_code=HTTPStatus.OK.value,
        content=jsonable_encoder(response)
    )
