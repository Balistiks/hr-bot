import asyncio
import logging
import sys

from aiogram import Bot

from redis.asyncio.client import Redis

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.jobstores.redis import RedisJobStore
from apscheduler_di import ContextSchedulerDecorator

from bot.misc.configuration import conf
from bot.scheduler import check_status

from bot.dispatcher import get_redis_storage, get_dispatcher


async def start_bot():
    bot = Bot(conf.bot.token)
    print(conf.redis.passwd)
    print(conf.redis.host)
    storage = get_redis_storage(
        redis=Redis(
            host=conf.redis.host,
            password=conf.redis.passwd,
            port=conf.redis.port,
        )
    )
    job_stores = {
    'default': RedisJobStore(
        jobs_key='dispatched_trips_jobs',
        run_times_key='dispatched_trips_running',
        host=conf.redis.host,
        port=conf.redis.port,
        password=conf.redis.passwd,
    )}
    scheduler = ContextSchedulerDecorator(AsyncIOScheduler(jobstores=job_stores))
    scheduler.ctx.add_instance(bot, declared_class=Bot)
    
    scheduler_status = AsyncIOScheduler(timezone='Asia/Vladivostok')
    scheduler_status.add_job(check_status, trigger='cron', day='*', kwargs={'bot': bot})

    dp = get_dispatcher(storage=storage, scheduler=scheduler)

    scheduler.start()
    scheduler_status.start()

    await dp.start_polling(
        bot,
        allowed_updates=dp.resolve_used_update_types(),
    )


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(start_bot())
