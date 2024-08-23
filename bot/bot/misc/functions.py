from aiogram import Bot
from aiogram.exceptions import TelegramBadRequest

import pandas as pd


async def delete_message(bot: Bot, chat_id: int,message_id: int):
    try:
        await bot.delete_message(chat_id, message_id)
    except TelegramBadRequest as e:
        print(e)


async def get_excel(user: dict):
    columns = ['Имя', 'Номер', 'UserName', 'tgId', 'Вакансия']

    data_formatted = {
        'Имя': user['name'],
        'Номер': user['phoneNumber'],
        'UserName': user['userName'],
        'tgId': user['tgId'],
        'Вакансия': user['answers'][0]['stage']['course'][0]['name'],
    }

    for answer in user['answers']:
        if len(answer['text']) != 0:
            data_formatted[answer['stage']['name']] = answer['text']
            columns.append(answer['stage']['name'])

    df = pd.DataFrame(data_formatted, columns=columns, index=[0])
    file_name = f'Соискатель_{user["tgId"]}.xlsx'
    df.to_excel(file_name, index=False)
    return file_name
