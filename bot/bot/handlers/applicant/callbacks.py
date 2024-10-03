from aiogram import Router, types, F
from aiogram.fsm.context import FSMContext

from bot import keyboards
from bot.services import users_service
from bot.states import RegisterState
from bot.misc.configuration import conf

from .messages import menu

callbacks_router = Router()


cities_videos = {
    'Селятино': 'https://vk.com/video-109222908_456239897',
    'Долгопрудный': 'https://vk.com/clip-109222908_456239915',
    'Калининград': 'https://vk.com/clip-118559346_456239175',
    'Звенигород': 'https://vk.com/video-109222908_456239892',
    'Видное': 'https://vk.com/clip-130473966_456239913',
}


@callbacks_router.callback_query(RegisterState.city)
async def get_city(callback: types.CallbackQuery, state: FSMContext):
    await callback.message.delete()
    await state.set_state(None)
    await state.update_data(city=callback.data)

    await callback.message.answer_photo(
        photo=types.FSInputFile(
            'files/photos/timur.jpg',
        ),
        caption='Привет, меня зовут Тимур Ильдусович! \n'
        '\nЯ генеральный директор федеральной сети салонов красоты "ЦирюльникЪ" 💅🏽\n'
        '\nЗаписал для тебя видео, в котором хочу поближе познакомить тебя с компанией 🤝',
        reply_markup=keyboards.applicant.get_continue_url_keyboard(
            'Посмотреть видео',
            'https://vk.com/video-109222908_456239893',
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
            'Знакомство с нашим директором по персоналу - Ольгой 👋🏻',
            reply_markup=keyboards.applicant.get_continue_url_keyboard(
                'Посмотреть',
                'https://vk.com/video-109222908_456239918',
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
