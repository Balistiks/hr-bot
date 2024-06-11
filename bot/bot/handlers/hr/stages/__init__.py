from .messages import messages_router
from .callbacks import callbacks_router

stages_router = [messages_router, callbacks_router]