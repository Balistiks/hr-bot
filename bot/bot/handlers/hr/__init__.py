from .messages import messages_router
from .callbacks import callbacks_router

hr_router = [messages_router, callbacks_router]