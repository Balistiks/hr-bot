from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton


MENU_KEYBOARD = InlineKeyboardMarkup(
    inline_keyboard=[
        [
            InlineKeyboardButton(text='Обчение', callback_data='0')
        ]
    ]
)
