import json

from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.utils.keyboard import InlineKeyboardBuilder

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

async def get_status_keyboard(tgid):
    builder = InlineKeyboardBuilder()
    builder.adjust(2)
    markup = builder.as_markup()
    
    with open('applicant.json') as data_file:
        applicant_data = json.load(data_file)

    for applicant in applicant_data['applicant']:
        if str(applicant['tgid']) == tgid:
            current_status = applicant.get('status', '')
            break

    markup.inline_keyboard.append([
        InlineKeyboardButton(text='Дозвон' if current_status == 'missed_call' else 'Недозвон', 
                     callback_data='status-call' if current_status == 'missed_call' else 'status-missed_call'),
        InlineKeyboardButton(text='Перезвонит', callback_data='status-call_back')
    ])
    markup.inline_keyboard.append([
        InlineKeyboardButton(text='Думает', callback_data='status-thinks'),
        InlineKeyboardButton(text='Испытательный срок', callback_data='status-probation')
    ])
    markup.inline_keyboard.append([
        InlineKeyboardButton(text='Изменить статус', callback_data='#'),
        InlineKeyboardButton(text='Выходит на работу', callback_data='status-work')
    ])
    markup.inline_keyboard.append([
        InlineKeyboardButton(text='К списку', callback_data='hr')
    ])

    return markup