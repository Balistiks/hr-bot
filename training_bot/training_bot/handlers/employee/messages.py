from aiogram import Router, types
from aiogram.filters import CommandStart

from training_bot import keyboards
from training_bot.filters import IsEmployeeFilter

messages_router = Router()


@messages_router.message(CommandStart(), IsEmployeeFilter())
async def employee_menu(message: types.Message):
    await message.answer_photo(
        photo=types.FSInputFile('files/images/Цирюльникъ.png'),
        reply_markup=keyboards.employee.MENU_KEYBOARD
    )
