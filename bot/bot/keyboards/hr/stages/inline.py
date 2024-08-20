import json

from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.utils.keyboard import InlineKeyboardBuilder

from bot.services import users_service


async def create_stage_applicant_keyboard(tg_id: int) -> InlineKeyboardMarkup:
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text='Назад', callback_data=f'tgid_{tg_id}')
            ]
        ]
    )
    return keyboard


async def get_data_user(tg_id: int):
    builder = InlineKeyboardBuilder()
    user_data = await users_service.get_by_tg_id(tg_id)

    if user_data and 'answers' in user_data:
        questions_and_answers = []
        for answer in user_data['answers']:
            print(len(answer['text']))
            if answer['text'] is not None or answer['text'] != '':
                print(answer['text'])
                question = answer['stage']
                questions_and_answers.append((question, answer['id']))

        for question, answer_id in questions_and_answers:
            builder.add(InlineKeyboardButton(
                text=question['name'],
                callback_data=f'question_{question["id"]}_answer_{answer_id}'
            ))

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
