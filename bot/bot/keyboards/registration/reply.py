from aiogram.types import ReplyKeyboardMarkup, KeyboardButton

SEND_CONTACT = ReplyKeyboardMarkup(
    keyboard=[
        [
            KeyboardButton(text='Отправить контакт 📲', request_contact=True)
        ]
    ],
    resize_keyboard=True,
    one_time_keyboard=True
)