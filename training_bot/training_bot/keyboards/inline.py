from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo

from training_bot.misc.configuration import conf

MENU_KEYBOARD = InlineKeyboardMarkup(
    inline_keyboard=[
        [
            InlineKeyboardButton(text='Обчение', web_app=WebAppInfo(url=f'{conf.bot.webapp_url}/external'))
        ]
    ]
)
