import json

from datetime import datetime, timedelta

from aiogram import Router, types, F, Bot
from aiogram.fsm.context import FSMContext

from apscheduler.schedulers.asyncio import AsyncIOScheduler

from bot import keyboards
from bot.scheduler import scheduler_missed_call
from bot.states import StageCommentState

callbacks_router = Router()
        
        
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
async def get_status(callback: types.CallbackQuery, state: FSMContext, apscheduler: AsyncIOScheduler):
    status_callback = callback.data.split('-')[1]
    data = await state.get_data()
    tgid = data.get('current_tgid')

    with open('applicant.json', 'r+') as data_file:
        applicant_data = json.load(data_file)
        for applicant in applicant_data['applicant']:
            if str(applicant['tgid']) == tgid:
                applicant['status'] = status_callback
                break 
        data_file.seek(0)
        json.dump(applicant_data, data_file, indent=4)
        data_file.truncate()
        
    for job in apscheduler.get_jobs():
        if job.id.startswith(f'missed_call_{tgid}') or job.id == f'status_lost_{tgid}':
            apscheduler.remove_job(job.id)

    if status_callback == 'Недозвон':
        scheduler_missed_call(tgid, apscheduler)
        
    await callback.message.edit_text(
        text='Статус добавлен',
        reply_markup=keyboards.hr.BACK_LIST_KEYBOARD
    )


@callbacks_router.callback_query(F.data == 'comment')
async def set_comment(callback: types.CallbackQuery, state: FSMContext):
    await state.clear()
    await state.set_state(StageCommentState.comment)
    await callback.message.edit_text(text='Оставьте комментарий')
