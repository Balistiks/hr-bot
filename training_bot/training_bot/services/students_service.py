import aiohttp
from aiohttp import ContentTypeError

from . import url, headers


async def get_by_tg_id(tg_id: int) -> dict | None:
    async with aiohttp.ClientSession(
        headers=headers
    ) as session:
        try:
            return await (await session.get(
                f'{url}/students/byTgId',
                params={'tgId': tg_id}
            )).json()
        except ContentTypeError:
            return None


async def create(tg_id: int) -> dict:
    async with aiohttp.ClientSession(
        headers=headers
    ) as session:
        return await (await session.post(
            f'{url}/students',
            json={
                'tgId': tg_id
            }
        )).json()
