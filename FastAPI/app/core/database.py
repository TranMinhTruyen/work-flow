import os

from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
MONGODB_DATABASE = os.getenv("MONGODB_DATABASE")

if not MONGODB_URI:
    raise ValueError("MONGODB_URI is not set in .env file!")


def get_database():
    client = AsyncIOMotorClient(MONGODB_URI)
    return client[MONGODB_DATABASE]


def get_collection(collection_name: str):
    db = get_database()
    return db[collection_name]


def str_object_id(obj):
    return str(obj['_id'])
