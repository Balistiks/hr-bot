from aiogram import Router, types, F
from aiogram.fsm.context import FSMContext

from bot import keyboards
from bot.services import users_service
from bot.states import RegisterState
from bot.misc.configuration import conf

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
    await state.set_state(None)
    await state.update_data(city=callback.data)

    await callback.message.answer(
        'Привет, меня зовут Тимур! \n'
        '\nЯ генеральный директор федеральной сети салонов красоты "ЦирюльникЪ" 💅🏽\n'
        '\nЗаписал для тебя видео, в котором хочу поближе познакомить тебя с компанией 🤝',
        reply_markup=keyboards.applicant.get_continue_url_keyboard(
            'Посмотреть видео',
            'https://drive.google.com/file/d/1v_EEKgyw5nruL6MWcj7zIYTHnok6c0Cp/view?usp=share_link',
            'tg_channel'
        )
    )


@callbacks_router.callback_query(F.data == 'tg_channel')
async def send_tg_channel(callback: types.CallbackQuery):
    await callback.message.delete()
    await callback.message.answer(
        'Давай сверимся, что ты подписан на наш канал с вакансиями 📱',
        reply_markup=keyboards.applicant.get_channel_keyboard(conf.bot.channel_url, 'salon')
    )


@callbacks_router.callback_query(F.data == 'salon')
async def send_salon(callback: types.CallbackQuery):
    user_channel_status = await callback.bot.get_chat_member(chat_id=conf.bot.channel, user_id=callback.from_user.id)
    if user_channel_status.status != 'left':
        await callback.message.delete()
        await callback.message.answer(
            'Давай посмотрим на наши салоны изнутри 📷',
            reply_markup=keyboards.applicant.get_continue_url_keyboard(
                'Посмотреть',
                'https://drive.google.com/file/d/1sxSb2h8lptIsjVe8-psOHR1Cnks9tId5/view?usp=share_link',
                'city',
            )
        )
    else:
        await send_tg_channel(callback)


@callbacks_router.callback_query(F.data == 'city')
async def send_city(callback: types.CallbackQuery, state: FSMContext):
    data = await state.get_data()
    await callback.message.delete()
    await callback.message.answer(
        'Видео про твой город 📍',
        reply_markup=keyboards.applicant.get_continue_url_keyboard(
            'Посмотреть',
            cities_videos[data['city']],
            'menu',
        )
    )


@callbacks_router.callback_query(F.data == 'menu')
async def send_menu(callback: types.CallbackQuery, state: FSMContext):
    await callback.message.delete()
    data = await state.get_data()
    await users_service.create({
        'userName': callback.from_user.username,
        'tgId': callback.from_user.id,
        'name': data['name'],
        'phoneNumber': data['phone_number'],
        'city': data['city']
    })
    await state.clear()
    await menu(callback.message, state)
