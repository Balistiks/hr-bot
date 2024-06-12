from aiogram import Router, types
from aiogram.fsm.context import FSMContext

from bot import keyboards
from bot.states import StageCommentState

messages_router = Router()


@messages_router.message(StageCommentState.comment)
async def get_comment(message: types.Message, state: FSMContext):
    await state.update_data(comment=message.text)
    get_comment_stage = await state.get_data()
    await state.clear()
    await message.answer(text='Комментарий отправлен',
                         reply_markup=keyboards.hr.stages.STAGE_BACK_KEYBOARD)