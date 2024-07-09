from aiogram.types import ReplyKeyboardMarkup, KeyboardButton


PHONE_KEYBOARD = ReplyKeyboardMarkup(
    keyboard=[
        [
            KeyboardButton(text='Отправить номер телефона 📲', request_contact=True)
        ]
    ],
    resize_keyboard=True,
    one_time_keyboard=True
)
