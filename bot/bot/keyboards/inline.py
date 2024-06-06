from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton


TRAINING_KEYBOARD = InlineKeyboardMarkup(
    inline_keyboard=[
        [
            InlineKeyboardButton(text='Пройти обучение', callback_data='#training')
        ]
    ]
)