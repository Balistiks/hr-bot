from aiogram import Router, types
from aiogram.filters import CommandStart

from training_bot import keyboards
from training_bot.filters import RegisteredFilter
from training_bot.services import students_service

messages_router = Router()


@messages_router.message(CommandStart(), RegisteredFilter())
async def menu(message: types.Message):
    await message.answer_photo(
        photo=types.FSInputFile('files/images/Цирюльникъ.png'),
        reply_markup=keyboards.MENU_KEYBOARD
    )


@messages_router.message(CommandStart())
async def register(message: types.Message):
    await students_service.create(message.from_user.id)

    await menu(message)
