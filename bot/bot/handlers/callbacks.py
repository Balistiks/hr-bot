import aiogram

from aiogram import Router, types, F
from aiogram.fsm.context import FSMContext

from bot import keyboards
from bot.states import ApplicantState

callbacks_router = Router()


def get_page(callback_data: str, prev_page: int, max_pages: int):
    if callback_data == 'next_page':
        page = prev_page + 1
    elif callback_data == 'prev_page':
        page = prev_page - 1
    else:
        page = prev_page

    if page < 1:
        page = 1
    if page > max_pages:
        page = max_pages
    return page


@callbacks_router.callback_query(ApplicantState.page, F.data == 'prev_page')
@callbacks_router.callback_query(ApplicantState.page, F.data == 'next_page')
async def get_applicant_slider(callback: types.CallbackQuery, state: FSMContext):
    await state.set_state(ApplicantState.page)
    data = await state.get_data()
    print(data)
    try:
        page = get_page(callback.data, data['direction_page'], 2)
    except KeyError:
        page = 2
    
    await state.update_data(direction_page=page)

    try:
        await callback.message.edit_text(text='text',
                                         reply_markup=await keyboards.get_applicant_keyboards(page))
    except aiogram.exceptions.TelegramBadRequest:
        pass