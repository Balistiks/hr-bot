from .messages import messages_router
from .callbacks import callbacks_router
from .stages import stages_router

hr_router = [messages_router,
             callbacks_router,
             *stages_router]