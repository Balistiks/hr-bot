import re

from aiogram import Router, types
from aiogram.filters import Command
from aiogram.fsm.context import FSMContext

from bot import keyboards
from bot.states import ApplicantState

messages_router = Router()


@messages_router.message(Command('hr'))
async def start_hr(message: types.Message, state: FSMContext):
    await state.clear()
    await state.set_state(ApplicantState.page)

    await message.answer(text='text',
                        reply_markup=await keyboards.hr.get_applicant_keyboards(1))