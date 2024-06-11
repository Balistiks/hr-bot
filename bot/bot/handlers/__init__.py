from .applicant import applicant_router
from .hr import hr_router

routers = (*applicant_router, *hr_router)
