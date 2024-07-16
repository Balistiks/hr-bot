from aiogram import Router, types
from aiogram.fsm.context import FSMContext

from bot import keyboards
from bot.states import StageCommentState
from bot.services import comments_service, employees_service, users_service

messages_router = Router()


@messages_router.message(StageCommentState.comment)
async def get_comment(message: types.Message, state: FSMContext):
    data = await state.get_data()

    employee = await employees_service.get_by_tg_id(message.from_user.id)
    user = await users_service.get_by_tg_id(data['current_tgid'])

    await comments_service.create({
        'text': message.text,
        'employee': employee['id'],
        'user': user['id'],
        'question': data['question_id']
    })
    await message.answer(text='Комментарий отправлен',
                         reply_markup=keyboards.hr.BACK_LIST_KEYBOARD)
