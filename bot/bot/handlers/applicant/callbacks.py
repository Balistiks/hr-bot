from aiogram import Router, types, F
from aiogram.fsm.context import FSMContext

from bot import keyboards
from bot.services import users_service
from bot.states import RegisterState
from .messages import menu

callbacks_router = Router()


cities_videos = {
    'Селятино': 'https://drive.google.com/file/d/1sVQve9KvFkE-eQJepyRaOByRNa8fP67f/view?usp=share_link',
    'Долгопрудный': 'https://drive.google.com/file/d/13PSrrNkrpz-SJPk7KEIix9EH-kemIIe-/view?usp=share_link',
    'Калининград': 'https://drive.google.com/file/d/1DJW_DmUH6tuGygNjLGdjJM9ZM5C78J2t/view?usp=share_link',
    'Звенигород': 'https://drive.google.com/file/d/1BaWTt1n94nYPz1AufWc26soqXA7Y78Vh/view?usp=share_link',
    'Видное': 'https://drive.google.com/file/d/10qgkOjlCQLNWNSK72zMo32UjtdFJhiXo/view?usp=share_link',
}


@callbacks_router.callback_query(RegisterState.city)
async def get_city(callback: types.CallbackQuery, state: FSMContext):
    await callback.message.delete()
    data = await state.get_data()
    await users_service.create({
        'userName': callback.from_user.username,
        'tgId': callback.from_user.id,
        'name': data['name'],
        'phoneNumber': data['phone_number'],
        'city': callback.data
    })
    await state.clear()

    await callback.message.answer(
        '[Приветственное видео](https://drive.google.com/file/d/1v_EEKgyw5nruL6MWcj7zIYTHnok6c0Cp/view?usp=share_link)',
        parse_mode='MARKDOWN',
        reply_markup=keyboards.applicant.get_continue_keyboard('tg_channel')
    )


@callbacks_router.callback_query(F.data == 'tg_channel')
async def send_tg_channel(callback: types.CallbackQuery):
    await callback.message.delete()
    await callback.message.answer(
        '[Давай сверимся что вы подписаны на наш канал с вакансиями]('
        'https://drive.google.com/file/d/1alhaR1KPaZzLs_xexPmhUxK9DKgnQF54/view?usp=share_link)\n'
        '"Ссылка на канал"',
        parse_mode='MARKDOWN',
        reply_markup=keyboards.applicant.get_continue_keyboard('salon')
    )


@callbacks_router.callback_query(F.data == 'salon')
async def send_tg_channel(callback: types.CallbackQuery):
    await callback.message.delete()
    await callback.message.answer(
        '[Давайте посмотрим на наши салоны изнутри]('
        'https://drive.google.com/file/d/1sxSb2h8lptIsjVe8-psOHR1Cnks9tId5/view?usp=share_link)\n',
        parse_mode='MARKDOWN',
        reply_markup=keyboards.applicant.get_continue_keyboard('city')
    )


@callbacks_router.callback_query(F.data == 'city')
async def send_city(callback: types.CallbackQuery):
    await callback.message.delete()
    user = await users_service.get_by_tg_id(callback.from_user.id)
    await callback.message.answer(
        f'[{user["city"]} видео]({cities_videos[user['city']]})',
        parse_mode='MARKDOWN',
        reply_markup=keyboards.applicant.get_continue_keyboard('menu')
    )


@callbacks_router.callback_query(F.data == 'menu')
async def send_menu(callback: types.CallbackQuery, state: FSMContext):
    await callback.message.delete()
    await menu(callback.message, state)
