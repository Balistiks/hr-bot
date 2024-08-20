import re

from aiogram import Router, types, F
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

    message = await message.answer(
        'Загрузка 🔄',
        reply_markup=types.ReplyKeyboardRemove()
    )
    await message.answer_photo(
        photo=types.FSInputFile('files/photos/main.png'),
        caption='',
        reply_markup=keyboards.applicant.TRAINING_KEYBOARD
    )
    await message.delete()


@messages_router.message(CommandStart())
async def start_applicant(message: types.Message, state: FSMContext):
    await state.set_state(RegisterState.name)
    await message.answer_photo(types.FSInputFile('files/photos/name.png'),)


@messages_router.message(RegisterState.name)
async def get_registration_name(message: types.Message, state: FSMContext):
    await state.update_data(name=message.text)
    await state.set_state(RegisterState.phone_number)
    await message.answer_photo(
        types.FSInputFile('files/photos/phone.png'),
        reply_markup=keyboards.PHONE_KEYBOARD
    )


@messages_router.message(RegisterState.phone_number)
async def get_registration_phone(message: types.Message, state: FSMContext):
    if message.contact:
        if message.contact.user_id == message.from_user.id:
            await state.update_data(phone_number=message.contact.phone_number)
            await state.set_state(RegisterState.city)
            await message.answer(
                'Выберите интересующий вас город',
                reply_markup=keyboards.applicant.CITIES_KEYBOARD
            )

            # await menu(message, state)
