import datetime

from aiogram import Bot

from bot.services import users_service


async def check_status(bot: Bot):
    users = await users_service.get_all_studying()
    print(users)
    for user in users:
        await check_status_daily(
            bot,
            int(user['tgId']),
            datetime.datetime.strptime(user['registeredAt'], '%Y-%m-%dT%H:%M:%S.%fZ')
        )


async def check_status_daily(bot: Bot, tgid, start_time):
    days_passed = (datetime.datetime.now() - start_time).days

    if days_passed == 3:
        await bot.send_message(
            chat_id=tgid,
            text='Нам не терпится пригласить вас на собеседование! Пожалуйста, завершите тестирование'
        )
    elif days_passed == 6:
        await bot.send_message(
            chat_id=tgid,
            text='Мы все еще ждем вашего присоединения в команду, скорее завершайте тестирование'
        )
