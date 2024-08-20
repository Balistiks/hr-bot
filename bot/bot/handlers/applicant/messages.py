import re

from aiogram import Router, types, F
from aiogram.filters import CommandStart
from aiogram.fsm.context import FSMContext

from bot import keyboards
from bot.states import RegisterState
from bot.services import users_service
from bot.filter import RegisteredFilter
from bot.misc import functions

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
    message = await message.answer(
        'Как вас зовут? 🤔'
    )
    await state.update_data(last_message_id=message.message_id)


@messages_router.message(RegisterState.name)
async def get_registration_name(message: types.Message, state: FSMContext):
    data = await state.get_data()
    await message.delete()
    await functions.delete_message(message.bot, message.chat.id, data['last_message_id'])

    await state.set_state(RegisterState.phone_number)
    await state.update_data(name=message.text)
    message = await message.answer(
        'Отправьте свой контакт 📲',
        reply_markup=keyboards.PHONE_KEYBOARD
    )
    await state.update_data(last_message_id=message.message_id)


@messages_router.message(RegisterState.phone_number)
async def get_registration_phone(message: types.Message, state: FSMContext):
    await message.delete()
    if message.contact:
        if message.contact.user_id == message.from_user.id:
            data = await state.get_data()
            await functions.delete_message(message.bot, message.chat.id, data['last_message_id'])
            await state.update_data(phone_number=message.contact.phone_number)
            await state.set_state(RegisterState.city)
            await message.answer(
                'Выберите город, в котором хотите работать 📍',
                reply_markup=keyboards.applicant.CITIES_KEYBOARD
            )

            # await menu(message, state)
