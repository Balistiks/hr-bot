import math
import json

from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.utils.keyboard import InlineKeyboardBuilder


TRAINING_KEYBOARD = InlineKeyboardMarkup(
    inline_keyboard=[
        [
            InlineKeyboardButton(text='Пройти обучение', callback_data='#training')
        ]
    ]
)


async def get_applicant_keyboards(current_page: int):
    builder = InlineKeyboardBuilder()
    builder.adjust(1)
    markup = builder.as_markup()

    with open('applicant.json') as data:
        applicant = json.load(data)

    count_applicant = len(applicant['applicant'])
    start_index = (current_page - 1) * 5
    end_index = min(start_index + 5, count_applicant)
    
    for i in range(start_index, end_index):
        markup.inline_keyboard.append([
            InlineKeyboardButton(text=applicant['applicant'][i]['name'], callback_data='#')
        ])

    if start_index - 5 >= 0 or end_index < count_applicant:
        markup.inline_keyboard.append([
            InlineKeyboardButton(text='⬅️', callback_data='prev_page'),
            InlineKeyboardButton(text=f'{current_page}/{math.ceil(count_applicant / 5)}', callback_data='#'),
            InlineKeyboardButton(text='➡️', callback_data='next_page')
        ])

    return markup
