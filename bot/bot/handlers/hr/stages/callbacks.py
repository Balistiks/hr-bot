import json

from aiogram import Router, types, F
from aiogram.fsm.context import FSMContext

from bot import keyboards
from bot.states import StageCommentState

callbacks_router = Router()


@callbacks_router.callback_query(F.data.startswith('tgid_'))
async def set_status(callback: types.CallbackQuery, state: FSMContext):
    tgid = callback.data.split('_')[1]
    await state.update_data(current_tgid=tgid)
    with open('applicant.json') as data:
        applicant = json.load(data)
    
    for applicant in applicant['applicant']:
        if str(applicant['tgid']) == tgid and str(applicant['stage']) == 'passed':
            await callback.message.edit_text(
                text='Поставить статус',
                reply_markup= await keyboards.hr.stages.get_status_keyboard(tgid)
            )
            break
        elif str(applicant['tgid'])== tgid:
            applicant_name = applicant['name']
            applicant_stage = applicant['stage']
            await callback.message.edit_text(
                text='Результаты этапа\n'
                f'{applicant_name}\n'
                f'Этап - {applicant_stage}',
                reply_markup=keyboards.hr.stages.STAGE_APPLICANT_KEYBOARD)
            break


@callbacks_router.callback_query(F.data.startswith('status-'))
async def get_status(callback: types.CallbackQuery, state: FSMContext):
    status_callback = callback.data.split('-')[1]
    data = await state.get_data()
    tgid = data.get('current_tgid')

    with open('applicant.json', 'r+') as data_file:
        applicant_data = json.load(data_file)

        for applicant in applicant_data['applicant']:
            if str(applicant['tgid']) == tgid:
                applicant['status'] = status_callback
        
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
    

    