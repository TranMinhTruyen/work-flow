from enum import Enum


class MessageType(Enum):
    SUCCESS = "SUCCESS"
    ERROR = "ERROR"
    WARNING = "WARNING"
    INFO = "INFO"

    def __init__(self, message: str):
        self._message = message

    @property
    def message(self):
        return self._message
