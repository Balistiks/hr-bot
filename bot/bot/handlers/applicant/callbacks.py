from aiogram import Router, types, F
from aiogram.fsm.context import FSMContext

from bot import keyboards

callbacks_router = Router()


@callbacks_router.callback_query(F.data == 'continue_to_web_app')
async def menu_callback(callback: types.CallbackQuery, state: FSMContext):
    await state.clear()

    await callback.message.delete()

    message = await callback.message.answer(
        'Загрузка 🔄',
        reply_markup=types.ReplyKeyboardRemove()
    )
    await callback.message.answer_photo(
        photo=types.FSInputFile('files/photos/main.png'),
        caption='',
        reply_markup=keyboards.applicant.TRAINING_KEYBOARD
    )
    await message.delete()