import json
import datetime
import pandas as pd

from aiogram import Router, types, F
from aiogram.fsm.context import FSMContext

from bot import keyboards
from bot.services import employees_service
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

    users = (await employees_service.get_by_tg_id(callback.from_user.id))['users']

    await callback.message.delete()
    await callback.message.answer_photo(
        photo=types.FSInputFile('files/photos/main.png'),
        reply_markup=await keyboards.hr.get_applicant_keyboard(users, 1)
    )


@callbacks_router.callback_query(ApplicantState.page, F.data == 'prev_page')
@callbacks_router.callback_query(ApplicantState.page, F.data == 'next_page')
async def get_applicant_slider(callback: types.CallbackQuery, state: FSMContext):
    data = await state.get_data()

    page = get_page(callback.data, data['direction_page'])
    await state.update_data(direction_page=page)

    users = (await employees_service.get_by_tg_id(callback.from_user.id))['users']

    users_for_keyboard = []
    for user in users:
        if user['status'] != 'выходит на работу':
            users_for_keyboard.append(user)

    await callback.message.edit_reply_markup(
        reply_markup=await keyboards.hr.get_applicant_keyboard(users_for_keyboard, page)
    )


async def create_excel_applicant(tgid):
    applicants = (await employees_service.get_by_tg_id(tgid))['users']

    data_formatted = []
    for applicant in applicants:
        data_formatted.append({
            'Имя': applicant['name'],
            'Номер': applicant['phoneNumber'],
            'UserName': applicant['userName'],
            'tgid': applicant['tgId'],
            'Вакансия': applicant['answers'][0]['stage']['course'][0]['name'] if applicant['answers'] is not None and len(applicant['answers']) > 0 else '',
            'этап': applicant['stage']['number'] if applicant['stage'] is not None else '',
            'статус': applicant['status'],
            'Регистрация': datetime.datetime.strptime(applicant['registeredAt'], '%Y-%m-%dT%H:%M:%SZ'),
        })

    df = pd.DataFrame(data_formatted, columns=['Имя', 'Номер', 'UserName', 'tgid', 'Вакансия', 'этап', 'статус', 'Регистрация'])
    file_name = f'files/соискатели_{tgid}.xlsx'
    df.to_excel(file_name, index=False)

    return file_name


@callbacks_router.callback_query(F.data == 'excel_status')
async def get_excel_applicant(callback: types.CallbackQuery):
    await callback.message.delete()
    tgid = callback.from_user.id
    file_name = await create_excel_applicant(tgid)

    await callback.message.answer_document(
        types.FSInputFile(file_name),
        reply_markup=keyboards.hr.BACK_LIST_KEYBOARD)
