import datetime

from dateutil import parser
from aiogram import Bot
from apscheduler.schedulers.asyncio import AsyncIOScheduler

from bot.services import users_service


async def send_message(bot: Bot, tgid, message_text):
    await bot.send_message(chat_id=tgid, text=message_text)


async def check_user_status(tgid):
    user = await users_service.get_by_tg_id(tgid)
    status = user['status']
    return status == 'обучается'


async def check_status(bot: Bot):
    users = await users_service.get_all_studying()
    print(users)
    for user in users:
        tgid = int(user['tgId'])
        registered_at = user['registeredAt']
        start_time = parser.isoparse(registered_at) if isinstance(registered_at, str) else datetime.datetime.fromtimestamp(registered_at)
        await check_status_daily(bot, tgid, start_time)


async def check_status_daily(bot: Bot, tgid, start_time):
    now = datetime.datetime.now(datetime.timezone.utc)
    days_passed = (now - start_time).days

    if days_passed == 3:
        await send_message(bot, tgid,
                           'Нам не терпится пригласить вас на собеседование! Пожалуйста, завершите тестирование.')
    elif days_passed == 6:
        await send_message(bot, tgid, 'Мы все еще ждем вашего присоединения в команду, скорее завершайте тестирование.')
