import json

from datetime import datetime, timedelta

from aiogram import Router, types, F, Bot
from aiogram.fsm.context import FSMContext

from apscheduler.schedulers.asyncio import AsyncIOScheduler

from bot import keyboards
from bot.scheduler import scheduler_missed_call
from bot.states import StageCommentState
from bot.services import users_service, employees_service, headers

callbacks_router = Router()
        
        
@callbacks_router.callback_query(F.data.startswith('tgid_'))
async def set_applicant_stage(callback: types.CallbackQuery, state: FSMContext):
    tgid = callback.data.split('_')[1]
    await state.update_data(current_tgid=tgid)

    user = await users_service.get_by_tg_id(int(tgid))
    if user['status'] != 'обучается':
        await callback.message.edit_media(
            media=types.InputMediaPhoto(
                media=types.FSInputFile('files/photos/main.png'),
                caption='Поставить статус',
            ),
            reply_markup=await keyboards.hr.stages.get_status_keyboard(user['status'])
        )
    else:
        await callback.message.edit_media(
            media=types.InputMediaPhoto(
                media=types.FSInputFile('files/photos/main.png'),
                caption=f'{user['name']}\n'
                        f'\nРезультаты этапа:\n'
                        f'Этап - {user['status']}\n'
                        + (f'Вакансия - {user['course']['name']}' if user['course'] is not None else ''),
            ),
            reply_markup=await keyboards.hr.stages.get_data_user(tgid)
        )


@callbacks_router.callback_query(F.data.startswith('question_'))
async def get_data_state(callback: types.CallbackQuery):
    data = callback.data.split('_')
    question_id = int(data[1])

    tg_id = callback.from_user.id
    user_data = await users_service.get_by_tg_id(tg_id)

    if user_data and 'answers' in user_data:
        question_text = None
        answer_text = None
        file_path = None

        for answer in user_data['answers']:
            if 'question' in answer and answer['question']['id'] == question_id:
                question_text = answer['question']['text']
                answer_text = answer['text']
                if 'file' in answer and answer['file'] and 'path' in answer['file']:
                    file_path = types.URLInputFile(
                        headers=headers,
                        url=f"http://back:3000/api/files/{answer['file']['path']}",
                        filename=answer['file']['path']
                    )
                else:
                    file_path = None

            if file_path:
                await callback.message.edit_media(
                    media=types.InputMediaDocument(
                        media=file_path,
                        caption=f'Вопрос: {question_text}\nОтвет: {answer_text}'
                    ),
                    reply_markup=await keyboards.hr.stages.create_stage_applicant_keyboard(tg_id)
                )
            else:
                await callback.message.edit_caption(
                    caption=f'Вопрос: {question_text}\nОтвет: {answer_text}',
                    reply_markup=await keyboards.hr.stages.create_stage_applicant_keyboard(tg_id)
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
        
    await callback.message.edit_caption(
        caption='Статус изменен',
        reply_markup=keyboards.hr.BACK_LIST_KEYBOARD
    )


@callbacks_router.callback_query(F.data == 'comment')
async def set_comment(callback: types.CallbackQuery, state: FSMContext):
    await state.set_state(StageCommentState.comment)
    await callback.message.edit_caption(caption='Оставьте комментарий')
