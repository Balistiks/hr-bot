import json
import pandas as pd

from aiogram import Router, types, F
from aiogram.fsm.context import FSMContext

from bot import keyboards
from bot.states import ApplicantState

callbacks_router = Router()


def get_page(callback_data, current_page):
    if callback_data == 'prev_page':
        return current_page - 1
    elif callback_data == 'next_page':
        return current_page + 1
    return current_page


@callbacks_router.callback_query(F.data == 'hr')
async def start_hr(callback: types.CallbackQuery, state: FSMContext):
    await state.clear()
    await state.update_data(direction_page=1)
    await state.set_state(ApplicantState.page)
    
    await callback.message.delete()
    await callback.message.answer(text='text',
                        reply_markup=await keyboards.hr.get_applicant_keyboard(1))


@callbacks_router.callback_query(ApplicantState.page, F.data == 'prev_page')
@callbacks_router.callback_query(ApplicantState.page, F.data == 'next_page')
async def get_applicant_slider(callback: types.CallbackQuery, state: FSMContext):
    data = await state.get_data()
    
    page = get_page(callback.data, data['direction_page'])
    await state.update_data(direction_page=page)

    await callback.message.edit_text(
        text='text',
        reply_markup=await keyboards.hr.get_applicant_keyboard(page)
    )


async def create_excel_applicant():
    with open('applicant.json') as data_file:
        applicant = json.load(data_file)
        
    data_applicant = applicant['applicant']
    
    data_formatted = []
    for applicant in data_applicant:
        data_formatted.append({
            'Имя': applicant['name'],
            'Номер': applicant['phone'],
            'UserName': applicant['UserName'],
            'tgid': applicant['tgid'],
            'курс': applicant['course'],
            'этап': applicant['stage'],
            'статус': applicant['status']
        })
    
    df = pd.DataFrame(data_formatted,
                      columns=['Имя', 'Номер', 'UserName', 'tgid', 'курс', 'этап', 'статус'])
    df.to_excel('files/applicant_status.xlsx', index=False)


@callbacks_router.callback_query(F.data == 'excel_status')
async def get_excel_applicant(callback: types.CallbackQuery):
    await callback.message.delete()
    await create_excel_applicant()
    
    await callback.message.answer_document(
        types.FSInputFile('files/applicant_status.xlsx'),
        reply_markup=keyboards.hr.BACK_LIST_KEYBOARD)