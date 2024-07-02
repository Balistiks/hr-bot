from aiogram import types
from aiogram.filters import Filter

from training_bot.services import students_service


class RegisteredFilter(Filter):
    async def __call__(self, message: types.Message) -> bool:
        return await students_service.get_by_tg_id(message.from_user.id) is not None
