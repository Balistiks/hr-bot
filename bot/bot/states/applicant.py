from aiogram.fsm.state import StatesGroup, State


class ApplicantState(StatesGroup):
    page = State()