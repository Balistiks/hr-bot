import aiohttp

from . import url, headers


async def create(comment: dict) -> dict:
    async with aiohttp.ClientSession(
        headers=headers
    ) as session:
        return await (await session.post(
            f'{url}/comments',
            data=comment
        )).json()
