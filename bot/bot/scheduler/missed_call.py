from aiogram import Bot, types

from datetime import datetime, timedelta

from apscheduler.schedulers.asyncio import AsyncIOScheduler

from bot.services import users_service


def scheduler_missed_call(tgid: int, apscheduler: AsyncIOScheduler):
    apscheduler.add_job(
        send_missed_call, 
        id=f'missed_call_{tgid}_1', 
        trigger='date', 
        run_date=datetime.now() + timedelta(days=1), 
        kwargs={'tgid': tgid}
    )
    apscheduler.add_job(
        send_missed_call, 
        id=f'missed_call_{tgid}_3', 
        trigger='date', 
        run_date=datetime.now() + timedelta(days=3), 
        kwargs={'tgid': tgid}
    )
    apscheduler.add_job(
        send_missed_call, 
        id=f'missed_call_{tgid}_7', 
        trigger='date', 
        run_date=datetime.now() + timedelta(days=7), 
        kwargs={'tgid': tgid}
    )
    apscheduler.add_job(
        get_status_lost, 
        id=f'status_lost_{tgid}', 
        trigger='date', 
        run_date=datetime.now() + timedelta(days=7), 
        kwargs={'tgid': tgid}
    )


async def send_missed_call(bot: Bot, tgid: int):
    photo_path = 'files/photos/not_answer.png'
    caption = ''
    await bot.send_photo(
        chat_id=tgid,
        photo=photo_path,
        caption=caption
    )


async def get_status_lost(tgid):
    user = await users_service.get_by_tg_id(tgid)
    await users_service.update({
        'id': user['id'],
        'status': 'потерян'
    })
