from fastapi import FastAPI, Request
from starlette.responses import JSONResponse

from app.common.enum.message_type import MessageType
from app.common.utils.response_utils import error_response
from app.core.exception.work_flow_exception import WorkFlowException


def exceptions_handle(app: FastAPI) -> None:

    @app.exception_handler(WorkFlowException)
    async def work_flow_exception_handler(request: Request, exc: WorkFlowException) -> JSONResponse:
        return error_response(
            message_code=exc.http_status.value,
            message_type=MessageType.ERROR,
            message="Server has error!",
            error_list=exc.error_detail.message
        )
