from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton

STAGE_APPLICANT_KEYBOARD = InlineKeyboardMarkup(
    inline_keyboard=[
        [
            InlineKeyboardButton(text='Оставить комментарий', callback_data='comment')
        ],
        [
            InlineKeyboardButton(text='Назад', callback_data='hr')
        ]
    ]
)

STAGE_BACK_KEYBOARD = InlineKeyboardMarkup(
    inline_keyboard=[
        [
            InlineKeyboardButton(text='К списку', callback_data='hr')
        ]
    ]
)