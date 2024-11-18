import json

import aiohttp
from aiohttp import ContentTypeError

from . import url, headers


async def create(user: dict) -> dict:
    async with aiohttp.ClientSession(
        headers=headers
    ) as session:
        return await (await session.post(
            f'{url}/users',
            data=user
        )).json()


async def get_by_tg_id(tg_id: int) -> dict | None:
    async with aiohttp.ClientSession(
        headers=headers
    ) as session:
        try:
            return await (await session.get(
                f'{url}/users/byTgId',
                params={'tgId': tg_id}
            )).json()
        except ContentTypeError:
            return None


async def update(user: dict) -> dict:
    async with aiohttp.ClientSession(
        headers=headers
    ) as session:
        return await (await session.patch(
            f'{url}/users',
            data=user
        )).json()


async def get_all_studying() -> dict:
    async with aiohttp.ClientSession(
        headers=headers
    ) as session:
        return await (await session.get(
            f'{url}/users/studying',
        )).json()


async def reset(tg_id: int) -> dict:
    async with aiohttp.ClientSession(
        headers=headers
    ) as session:
        return await (await session.patch(
            f'{url}/users/{tg_id}/reset',
        )).json()
