import json

from aiogram import Bot

from datetime import datetime, timedelta

from apscheduler.schedulers.asyncio import AsyncIOScheduler


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
    await bot.send_message(
        tgid,
        'Привет, ты не ответил нашему HR,' 
        'свяжись с ним "ссылка на телеграм HR"'
    )


async def get_status_lost(tgid):
    with open('applicant.json', 'r+') as data_file:
        applicant_data = json.load(data_file)
        
        for applicant in applicant_data['applicant']:
            if str(applicant['tgid']) == tgid:
                applicant['status'] = 'Потерян'
                break
            
        data_file.seek(0)
        json.dump(applicant_data, data_file, indent=4)
        data_file.truncate()