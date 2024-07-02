from aiogram import Router, types
from aiogram.filters import CommandStart

from training_bot import keyboards

messages_router = Router()


@messages_router.message(CommandStart())
async def start_handler(message: types.Message):
    await message.answer_photo(
        photo=types.FSInputFile('files/images/Цирюльникъ.png'),
        reply_markup=keyboards.MENU_KEYBOARD
    )
