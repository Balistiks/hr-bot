import json

from datetime import datetime, timedelta

from aiogram import Router, types, F, Bot
from aiogram.fsm.context import FSMContext

from apscheduler.schedulers.asyncio import AsyncIOScheduler

from bot import keyboards
from bot.scheduler import scheduler_missed_call
from bot.states import StageCommentState
from bot.services import users_service, employees_service

callbacks_router = Router()
        
        
@callbacks_router.callback_query(F.data.startswith('tgid_'))
async def set_applicant_stage(callback: types.CallbackQuery, state: FSMContext):
    tgid = callback.data.split('_')[1]
    await state.update_data(current_tgid=tgid)

    user = await users_service.get_by_tg_id(int(tgid))
    if user['status'] != 'обучается':
        await callback.message.edit_text(
            text='Поставить статус',
            reply_markup=await keyboards.hr.stages.get_status_keyboard(user['status'])
        )
    else:
        await callback.message.edit_text(
            text=f'Результаты этапа\n{user['name']}\nЭтап - {user['status']}',
            reply_markup=keyboards.hr.stages.STAGE_APPLICANT_KEYBOARD
        )


@callbacks_router.callback_query(F.data.startswith('status-'))
async def get_status(callback: types.CallbackQuery, state: FSMContext, apscheduler: AsyncIOScheduler):
    status_callback = callback.data.split('-')[1]
    data = await state.get_data()
    tgid = data.get('current_tgid')

    user = await users_service.get_by_tg_id(int(tgid))
    await users_service.update({
        'id': user['id'],
        'status': status_callback
    })
        
    for job in apscheduler.get_jobs():
        if job.id.startswith(f'missed_call_{tgid}') or job.id == f'status_lost_{tgid}':
            apscheduler.remove_job(job.id)

    if status_callback == 'недозвон':
        scheduler_missed_call(tgid, apscheduler)
    elif status_callback == 'Выходит на работу':
        await employees_service.create({
            'tgId': callback.from_user.id
        })
        
    await callback.message.edit_text(
        text='Статус изменен',
        reply_markup=keyboards.hr.BACK_LIST_KEYBOARD
    )


@callbacks_router.callback_query(F.data == 'comment')
async def set_comment(callback: types.CallbackQuery, state: FSMContext):
    await state.set_state(StageCommentState.comment)
    await callback.message.edit_text(text='Оставьте комментарий')
