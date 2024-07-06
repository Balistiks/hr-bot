import math
import json

from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup
from aiogram.utils.keyboard import InlineKeyboardBuilder


BACK_LIST_KEYBOARD = InlineKeyboardMarkup(
    inline_keyboard=[
        [
            InlineKeyboardButton(text='К списку', callback_data='hr')
        ]
    ]
)


async def get_applicant_keyboard(applicants: list, current_page: int):
    builder = InlineKeyboardBuilder()
    builder.adjust(1)
    markup = builder.as_markup()

    count_applicant = len(applicants)
    total_pages = math.ceil(count_applicant / 5)
    start_index = (current_page - 1) * 5
    end_index = min(start_index + 5, count_applicant)

    for i in range(start_index, end_index):
        tg_id = applicants[i]['tgId']
        markup.inline_keyboard.append([
            InlineKeyboardButton(text=f'{applicants[i]['name']} - {applicants[i]['phoneNumber']}', callback_data=f'tgid_{tg_id}')
        ])

    prev_callback_data = 'prev_page' if current_page > 1 else '#'
    next_callback_data = 'next_page' if current_page < total_pages else '#'

    markup.inline_keyboard.append([
        InlineKeyboardButton(text='⬅️', callback_data=prev_callback_data),
        InlineKeyboardButton(text=f'{current_page}/{total_pages}', callback_data='#'),
        InlineKeyboardButton(text='➡️', callback_data=next_callback_data)
    ])
    markup.inline_keyboard.append([
        InlineKeyboardButton(text='Excel', callback_data='excel_status')
    ])

    return markup
