import json

from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.utils.keyboard import InlineKeyboardBuilder

from bot.services import users_service

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


async def get_status_keyboard(status: str):
    builder = InlineKeyboardBuilder()
    builder.adjust(2)
    markup = builder.as_markup()

    markup.inline_keyboard.append([
        InlineKeyboardButton(text='Дозвон' if status == 'недозвон' else 'Недозвон',
                             callback_data='status-окончил курс' if status == 'недозвон' else 'status-недозвон'),
        InlineKeyboardButton(text='Перезвонит', callback_data='status-Перезвонит')
    ])
    markup.inline_keyboard.append([
        InlineKeyboardButton(text='Думает', callback_data='status-Думает'),
        InlineKeyboardButton(text='Испытательный срок', callback_data='status-Испытательный срок')
    ])
    markup.inline_keyboard.append([
        InlineKeyboardButton(text='Изменить статус', callback_data='#'),
        InlineKeyboardButton(text='Выходит на работу', callback_data='status-Выходит на работу')
    ])
    markup.inline_keyboard.append([
        InlineKeyboardButton(text='К списку', callback_data='hr')
    ])

    return markup
