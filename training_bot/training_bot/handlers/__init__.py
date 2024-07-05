from .employee import employee_router
from .students import students_router

routers = (*employee_router, *students_router)
