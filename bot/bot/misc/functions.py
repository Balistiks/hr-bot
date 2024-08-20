from aiogram import Bot
from aiogram.exceptions import TelegramBadRequest


async def delete_message(bot: Bot, chat_id: int,message_id: int):
    try:
        await bot.delete_message(chat_id, message_id)
    except TelegramBadRequest as e:
        print(e)