import datetime

from aiogram import Bot

from bot.services import users_service


async def check_status(bot: Bot):
    users = await users_service.get_all_studying()
    print(users)
    for user in users:
        date = datetime.datetime.strptime(user['registeredAt'], '%Y-%m-%dT%H:%M:%S.%fZ')
        date.replace(hour=0, minute=0, second=0, microsecond=0)
        await check_status_daily(
            bot,
            int(user['tgId']),
            datetime.datetime.strptime(user['registeredAt'], '%Y-%m-%dT%H:%M:%S.%fZ')
        )


async def check_status_daily(bot: Bot, tgid, start_time):
    days_passed = (datetime.datetime.today() - start_time).days

    print(f'{tgid} {days_passed}')

    try:
        if days_passed == 1:
            await bot.send_message(
                chat_id=tgid,
                text='Нам не терпится пригласить вас на собеседование! Пожалуйста, завершите тестирование'
            )
        elif days_passed == 2:
            await bot.send_message(
                chat_id=tgid,
                text='Мы все еще ждем вашего присоединения в команду, скорее завершайте тестирование'
            )
    except Exception as e:
        print(e)
