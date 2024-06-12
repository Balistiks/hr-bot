import json

from aiogram import Router, types, F
from aiogram.fsm.context import FSMContext

from bot import keyboards
from bot.states import StageCommentState

callbacks_router = Router()


@callbacks_router.callback_query(F.data.startswith('tgid_'))
async def handle_tgid_callback(callback: types.CallbackQuery, state: FSMContext):
    tgid = callback.data.split('_')[1]
    with open('applicant.json') as data:
        applicant = json.load(data)
    
    for applicant in applicant['applicant']:
        if str(applicant['tgid']) == tgid:
            applicant_name = applicant['name']
            applicant_stage = applicant['stage']
            break

    await callback.message.edit_text(
        text='Результаты этапа\n'
                f'{applicant_name}\n'
                f'Этап - {applicant_stage}',
                reply_markup=keyboards.hr.stages.STAGE_APPLICANT_KEYBOARD)


@callbacks_router.callback_query(F.data == 'comment')
async def set_comment(callback: types.CallbackQuery, state: FSMContext):
    await state.clear()
    await state.set_state(StageCommentState.comment)
    await callback.message.edit_text(text='Оставьте комментарий')
    

    