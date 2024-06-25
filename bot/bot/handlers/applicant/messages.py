import re

from aiogram import Router, types
from aiogram.filters import CommandStart
from aiogram.fsm.context import FSMContext

from bot import keyboards
from bot.states import RegisterState
from bot.services import users_service
from bot.filter import RegisteredFilter

messages_router = Router()


@messages_router.message(CommandStart(), RegisteredFilter())
async def menu(message: types.Message, state: FSMContext):
    await state.clear()

    await message.answer_photo(
        photo=types.FSInputFile('files/chatademia.png'),
        caption='',
        reply_markup=keyboards.applicant.TRAINING_KEYBOARD
    )


@messages_router.message(CommandStart())
async def start_applicant(message: types.Message, state: FSMContext):
    await state.set_state(RegisterState.name)
    await message.answer('Как вас зовут?')


@messages_router.message(RegisterState.name)
async def get_registration_name(message: types.Message, state: FSMContext):
    await state.update_data(name=message.text)
    await state.set_state(RegisterState.phone_number)
    await message.answer('Введите ваш номер телефона?')


@messages_router.message(RegisterState.phone_number)
async def get_registration_phone(message: types.Message, state: FSMContext):
    if re.match(r'\+79(\d{9})$', message.text):
        data = await state.get_data()
        await state.update_data(phone_number=message.text)
        await users_service.create({
            'userName': message.from_user.username,
            'tgId': message.from_user.id,
            'name': data['name'],
            'phoneNumber': message.text
        })

        await menu(message, state)
    else:
        await message.answer(
            'Попробуйте ввести номер телефона еше раз\n'
            '\nПример: +79081234567'
        )
