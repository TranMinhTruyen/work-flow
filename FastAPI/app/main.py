from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.controllers import auth_controller
from app.core.exception.exceptions_handle import work_flow_exception_handler
from app.core.exception.work_flow_exception import WorkFlowException

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(WorkFlowException, work_flow_exception_handler)

app.include_router(auth_controller.router)
