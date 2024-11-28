from http import HTTPStatus

from app.core.exception.error_detail import ErrorDetail


class WorkFlowException(Exception):
    error_detail: ErrorDetail
    http_status: HTTPStatus

    def __init__(self, error_detail: ErrorDetail, http_status: HTTPStatus):
        self.http_status = http_status
        self.error_detail = error_detail
