from aiogram import Router, types
from aiogram.filters import CommandStart
from aiogram.fsm.context import FSMContext

from bot import keyboards
from bot.states import RegisterState

messages_router = Router()


@messages_router.message(CommandStart())
async def start_handler(message: types.Message, state: FSMContext):
    await state.set_state(RegisterState.name)
    await message.answer('Как вас зовут?')


@messages_router.message(RegisterState.name)
async def get_registration_name(message: types.Message, state: FSMContext):
    await state.update_data(name=message.text)
    await state.set_state(RegisterState.phone_number)
    await message.answer('Введите ваш номер телефона?',
                         reply_markup=keyboards.registration.SEND_CONTACT)


@messages_router.message(RegisterState.phone_number)
async def get_registration_phone(message: types.Message, state: FSMContext):
    await state.update_data(phone_number=message.text)
    get_data_registration = await state.get_data()
    await state.clear()


@messages_router.message(RegisterState.phone_number)
async def get_registration_name(message: types.Message, state: FSMContext):
    await message.answer_photo(
            photo=types.FSInputFile('files/chatademia.png'),
            caption='',
            reply_markup=keyboards.TRAINING_KEYBOARD
        )