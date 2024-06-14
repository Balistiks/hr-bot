import json

from datetime import datetime, timedelta

from aiogram import Router, types, F, Bot
from aiogram.fsm.context import FSMContext

from apscheduler.schedulers.asyncio import AsyncIOScheduler

from bot import keyboards
from bot.states import StageCommentState

callbacks_router = Router()


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


async def scheduler_missed_call(bot: Bot, chat_id: int):
    await bot.send_message(
        chat_id,
        'Привет, ты не ответил нашему HR,' 
        'свяжись с ним "ссылка на телеграм HR"'
        )
    
    
@callbacks_router.callback_query(F.data.startswith('tgid_'))
async def set_applicant_stage(callback: types.CallbackQuery, state: FSMContext):
    tgid = callback.data.split('_')[1]
    await state.update_data(current_tgid=tgid)
    
    with open('applicant.json') as data:
        applicant_data = json.load(data)
    
    for applicant in applicant_data['applicant']:
        if str(applicant['tgid']) == tgid:
            if str(applicant['stage']) == 'passed':
                await callback.message.edit_text(
                    text='Поставить статус',
                    reply_markup=await keyboards.hr.stages.get_status_keyboard(tgid)
                )
            else:
                await callback.message.edit_text(
                    text=f'Результаты этапа\n{applicant['name']}\nЭтап - {applicant['stage']}',
                    reply_markup=keyboards.hr.stages.STAGE_APPLICANT_KEYBOARD
                )
            break


@callbacks_router.callback_query(F.data.startswith('status-'))
async def get_status(callback: types.CallbackQuery, bot: Bot, state: FSMContext, apscheduler: AsyncIOScheduler):
    status_callback = callback.data.split('-')[1]
    data = await state.get_data()
    tgid = data.get('current_tgid')

    with open('applicant.json', 'r+') as data_file:
        applicant_data = json.load(data_file)

        for applicant in applicant_data['applicant']:
            if str(applicant['tgid']) == tgid:
                applicant['status'] = status_callback
                if status_callback == 'Недозвон':
                    apscheduler.add_job(scheduler_missed_call, trigger='date', run_date=datetime.now() + timedelta(seconds=10), kwargs={'bot': bot, 'chat_id': tgid})
                    apscheduler.add_job(scheduler_missed_call, trigger='date', run_date=datetime.now() + timedelta(seconds=20), kwargs={'bot': bot, 'chat_id': tgid})
                    apscheduler.add_job(scheduler_missed_call, trigger='date', run_date=datetime.now() + timedelta(seconds=30), kwargs={'bot': bot, 'chat_id': tgid})
                    apscheduler.add_job(get_status_lost, trigger='date', run_date=datetime.now() + timedelta(seconds=30), kwargs={'tgid': tgid})
                else:
                    apscheduler.remove_all_jobs()
                break
        
        data_file.seek(0)
        json.dump(applicant_data, data_file, indent=4)
        data_file.truncate()
        
    await callback.message.edit_text(
        text='Статус добавлен',
        reply_markup=keyboards.hr.BACK_LIST_KEYBOARD
    )


@callbacks_router.callback_query(F.data == 'comment')
async def set_comment(callback: types.CallbackQuery, state: FSMContext):
    await state.clear()
    await state.set_state(StageCommentState.comment)
    await callback.message.edit_text(text='Оставьте комментарий')
