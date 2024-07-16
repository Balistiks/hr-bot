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


async def get_data_user(tg_id: int):
    builder = InlineKeyboardBuilder()
    user_data = await users_service.get_by_tg_id(tg_id)

    if user_data and 'answers' in user_data:
        questions = []
        for answer in user_data['answers']:
            if 'question' in answer:
                question = answer['question']
                questions.append(question)

        for question in questions:
            builder.add(InlineKeyboardButton(text=question['name'], callback_data=f'question_{question["id"]}'))

    builder.add(InlineKeyboardButton(text='Назад', callback_data='hr'))
    builder.adjust(1)
    markup = builder.as_markup()

    return markup


async def get_status_keyboard(status: str):
    builder = InlineKeyboardBuilder()
    builder.adjust(2)
    markup = builder.as_markup()

    markup.inline_keyboard.append([
        InlineKeyboardButton(text='Дозвон' if status == 'недозвон' else 'Недозвон',
                             callback_data='status-окончил курс' if status == 'недозвон' else 'status-недозвон'),
        InlineKeyboardButton(text='Перезвонит', callback_data='status-перезвонит')
    ])
    markup.inline_keyboard.append([
        InlineKeyboardButton(text='Думает', callback_data='status-думает'),
        InlineKeyboardButton(text='Испытательный срок', callback_data='status-испытательный срок')
    ])
    markup.inline_keyboard.append([
        InlineKeyboardButton(text='Выходит на работу', callback_data='status-выходит на работу')
    ])
    markup.inline_keyboard.append([
        InlineKeyboardButton(text='К списку', callback_data='hr')
    ])

    return markup
