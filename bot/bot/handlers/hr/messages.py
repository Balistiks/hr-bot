import re

from aiogram import Router, types
from aiogram.filters import CommandStart
from aiogram.fsm.context import FSMContext

from bot import keyboards
from bot.states import ApplicantState
from bot.filter import IsEmployeeFilter
from bot.services import employees_service

messages_router = Router()


@messages_router.message(CommandStart(), IsEmployeeFilter())
async def start_hr(message: types.Message, state: FSMContext):
    await state.clear()
    await state.update_data(direction_page=1)
    await state.set_state(ApplicantState.page)

    users = (await employees_service.get_by_tg_id(message.from_user.id))['users']

    await message.answer_photo(
        photo=types.FSInputFile('files/main.png'),
        reply_markup=await keyboards.hr.get_applicant_keyboard(users, 1)
    )
