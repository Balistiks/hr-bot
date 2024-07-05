from aiogram import Bot
from aiohttp import web

from web.misc.configuration import conf

routes = web.RouteTableDef()

bot = Bot(conf.bot.token)


@routes.post('/users/date')
async def send_status(request):
    auth = request.headers['Authorization']
    if auth.split(' ')[0] == 'Bearer':
        token = auth.split(' ')[1]
        if token == conf.bot.secret_token:
            data = await request.json()
            await bot.send_message(
                data['employeeTgId'],
                f'Соискатель {data["name"]}:\n'
                f'Телефон: {data["phoneNumber"]}\n'
                f'\nВыбрал дату созвона: {data["date"]}'
            )
            return web.Response()
    return web.Response(status=403)
