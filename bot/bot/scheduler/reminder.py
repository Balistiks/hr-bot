import datetime
from aiogram import Bot
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from bot.services import users_service


async def send_message(bot: Bot, tgid, message_text):
    await bot.send_message(chat_id=tgid, text=message_text)


async def check_user_status(bot: Bot, tgid):
    user = await users_service.get_by_tg_id(tgid)
    status = user['status']

    if status == 'обучается':
        return True

    return False


async def check_status(bot: Bot, scheduler: AsyncIOScheduler):
    users = await users_service.get_all()
    for user in users:
        tgid = user['tgId']
        if await check_user_status(bot, tgid):
            start_time = datetime.datetime.fromtimestamp(user['registeredAt'])
            await check_status_daily(bot, tgid, start_time, scheduler)


async def check_status_daily(bot: Bot, tgid, start_time, scheduler: AsyncIOScheduler):
    days_passed = (datetime.datetime.now() - start_time).days

    if days_passed == 3:
        await send_message(bot, tgid,
                           'Нам не терпится пригласить вас на собеседование! Пожалуйста, завершите тестирование.')

    elif days_passed == 6:
        await send_message(bot, tgid,
                           'Мы все еще ждем вашего присоединения в команду, скорее завершайте тестирование.')

    scheduler.add_job(
        check_status_daily,
        'interval',
        days=1,
        id=f'reminder_{tgid}'
    )