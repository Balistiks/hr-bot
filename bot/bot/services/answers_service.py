import aiohttp

from . import url, headers


async def get_by_id(answer_id: int) -> dict:
    async with aiohttp.ClientSession(
        headers=headers
    ) as session:
        return await (await session.get(
            f'{url}/answers/{answer_id}',
        )).json()
