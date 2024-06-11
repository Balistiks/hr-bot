from aiogram.fsm.state import StatesGroup, State


class StageCommentState(StatesGroup):
    comment = State()