from aiogram import types
from aiogram.filters import Filter

from bot.services import users_service


class RegisteredFilter(Filter):
    async def __call__(self, message: types.Message) -> bool:
        return await users_service.get_by_tg_id(message.from_user.id) is not None
