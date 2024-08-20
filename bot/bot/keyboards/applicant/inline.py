from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.types.web_app_info import WebAppInfo

from bot.misc.configuration import conf

cities = [
    'Селятино',
    'Долгопрудный',
    'Звенигород',
    'Видное',
    'Калининград'
]

TRAINING_KEYBOARD = InlineKeyboardMarkup(
    inline_keyboard=[
        [
            InlineKeyboardButton(text='Пройти обучение', web_app=WebAppInfo(url=conf.bot.web_app_url))
        ]
    ]
)


CITIES_KEYBOARD = InlineKeyboardMarkup(
    inline_keyboard=[
        [InlineKeyboardButton(text=city, callback_data=city)] for city in cities
    ]
)


def get_channel_keyboard(channel_url: str, callback_data: str):
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text='Наш канал', url=channel_url)
            ],
            [
                InlineKeyboardButton(text='Продолжить', callback_data=callback_data)
            ]
        ]
    )


def get_continue_url_keyboard(text: str, url: str, callback_data: str):
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text=text, url=url)
            ],
            [
                InlineKeyboardButton(text='Продолжить', callback_data=callback_data)
            ]
        ]
    )


def get_continue_keyboard(callback_data: str,):
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text='Продолжить', callback_data=callback_data)
            ]
        ]
    )
