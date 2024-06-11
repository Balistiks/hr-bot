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

    await callback.message.edit_text(text='text',
                        reply_markup=await keyboards.hr.get_applicant_keyboards(1))


@callbacks_router.callback_query(ApplicantState.page, F.data == 'prev_page')
@callbacks_router.callback_query(ApplicantState.page, F.data == 'next_page')
async def get_applicant_slider(callback: types.CallbackQuery, state: FSMContext):
    data = await state.get_data()
    
    page = get_page(callback.data, data['direction_page'])
    await state.update_data(direction_page=page)

    await callback.message.edit_text(
        text='text',
        reply_markup=await keyboards.hr.get_applicant_keyboards(page)
    )