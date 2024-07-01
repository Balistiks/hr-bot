import aiohttp
from aiohttp import ContentTypeError

from . import url, headers


async def get_by_tg_id(tg_id: int) -> dict | None:
    async with aiohttp.ClientSession(
        headers=headers
    ) as session:
        try:
            return await (await session.get(
                f'{url}/employees/byTgId',
                params={'tgId': tg_id}
            )).json()
        except ContentTypeError:
            return None


async def create(employee: dict) -> dict | None:
    async with aiohttp.ClientSession(
        headers=headers
    ) as session:
        return await (await session.post(
            f'{url}/employees',
            json=employee
        )).json()
