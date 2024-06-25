from .applicant import applicant_router
from .hr import hr_router

routers = (*hr_router, *applicant_router)
