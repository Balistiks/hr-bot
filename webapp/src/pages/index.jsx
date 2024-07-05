import {lazy} from "react";
import {Route, Routes} from "react-router-dom";

const IndexPage = lazy(() => import("./index-page"));
const IndexExternalPage = lazy(() => import("./index-external-page"));
const ExternalCoursePage = lazy(() => import("./external-course-page"));
const VacancyPage = lazy(() => import("./vacancy-page"));

const pagesRoutes = {
    index: '/',
    indexExternal: '/external',
    externalCoursePage: '/external/course/:id',
    vacancy: '/vacancy/:id'
}

const pages = [
    {path: pagesRoutes.index, component: <IndexPage/>, exact: true},
    {path: pagesRoutes.indexExternal, component: <IndexExternalPage/>, exact: true},
    {path: pagesRoutes.externalCoursePage, component: <ExternalCoursePage/>, exact: true},
    {path: pagesRoutes.vacancy, component: <VacancyPage/>, exact: true},
]

const Routing = () => {
  return (
      <Routes>
          {pages.map((route) => (
              <Route
                  element={route.component}
                  path={route.path}
                  exact={route.exact}
                  key={route.path}
              />
          ))}
      </Routes>
  )
}

export default Routing;