from http import HTTPStatus

from fastapi import APIRouter
from fastapi.responses import JSONResponse

from app.common.enum.message_type import MessageType
from app.common.utils.response_utils import ok_response
from app.controllers.request.base_request import BaseRequest
from app.controllers.request.check_proxy_request import CheckProxyRequest
from app.controllers.response.base_response import BaseResponse
from app.controllers.response.check_proxy_response import CheckProxyResponse

router = APIRouter(
    tags=["Auth"],
    prefix="/auth",
)


@router.post(path="/check-proxy", response_model=BaseResponse[CheckProxyResponse])
async def check_proxy(request: BaseRequest[CheckProxyRequest]) -> JSONResponse:
    return ok_response(
        message_code=HTTPStatus.OK.value,
        message_type=MessageType.SUCCESS,
        message="Success request",
        body=request
    )
