from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.types.web_app_info import WebAppInfo

from bot.misc.configuration import conf

TRAINING_KEYBOARD = InlineKeyboardMarkup(
    inline_keyboard=[
        [
            InlineKeyboardButton(text='Пройти обучение', web_app=WebAppInfo(url=conf.bot.web_app_url))
        ]
    ]
)

CONTINUE_TO_WEB_APP = InlineKeyboardMarkup(
    inline_keyboard=[
        [
            InlineKeyboardButton(text='Продолжить', callback_data='continue_to_web_app')
        ]
    ]
)
