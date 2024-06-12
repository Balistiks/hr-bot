import math
import json

from aiogram.types import InlineKeyboardButton
from aiogram.utils.keyboard import InlineKeyboardBuilder


async def get_applicant_keyboard(current_page: int):
    builder = InlineKeyboardBuilder()
    builder.adjust(1)
    markup = builder.as_markup()

    with open('applicant.json') as data_file:
        applicant = json.load(data_file)

    count_applicant = len(applicant['applicant'])
    total_pages = math.ceil(count_applicant / 5)
    start_index = (current_page - 1) * 5
    end_index = min(start_index + 5, count_applicant)

    for i in range(start_index, end_index):
        tgid = applicant['applicant'][i]['tgid']
        markup.inline_keyboard.append([
            InlineKeyboardButton(text=applicant['applicant'][i]['name'], callback_data=f'tgid_{tgid}')
        ])

    prev_callback_data = 'prev_page' if current_page > 1 else '#'
    next_callback_data = 'next_page' if current_page < total_pages else '#'

    markup.inline_keyboard.append([
        InlineKeyboardButton(text='⬅️', callback_data=prev_callback_data),
        InlineKeyboardButton(text=f'{current_page}/{total_pages}', callback_data='#'),
        InlineKeyboardButton(text='➡️', callback_data=next_callback_data)
    ])

    return markup