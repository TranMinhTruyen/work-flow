from fastapi import APIRouter

router = APIRouter(
    tags=["Auth"],
    prefix="/auth",
)

@router.get("/")
async def root():
    return {"message": "Hello World"}
