import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.controllers import auth_controller
from app.core.exception.exceptions_handle import exceptions_handle

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

exceptions_handle(app)

app.include_router(auth_controller.router)

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
