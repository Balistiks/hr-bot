from aiogram import types
from aiogram.filters import Filter

from bot.services import employees_service


class IsEmployeeFilter(Filter):
    async def __call__(self, message: types.Message) -> bool:
        print(await employees_service.get_by_tg_id(message.from_user.id))
        return await employees_service.get_by_tg_id(message.from_user.id) is not None
