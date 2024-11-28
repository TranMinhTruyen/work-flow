from fastapi import Request
from fastapi.encoders import jsonable_encoder
from starlette.responses import JSONResponse

from app.common.enum.message_type import MessageType
from app.controllers.response.base_response import BaseResponse
from app.core.exception.work_flow_exception import WorkFlowException


async def work_flow_exception_handler(request: Request, exc: WorkFlowException) -> JSONResponse:
    response: BaseResponse = BaseResponse()
    response.message_code = exc.http_status.value
    response.message_type = MessageType.ERROR.value
    response.error_list = exc.error_detail.message
    return JSONResponse(
        status_code=exc.http_status.value,
        content=jsonable_encoder(response),
    )
