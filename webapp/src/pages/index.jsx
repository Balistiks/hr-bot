import {lazy} from "react";
import {Route, Routes} from "react-router-dom";

const IndexPage = lazy(() => import("./index-page"));
const VacancyPage = lazy(() => import("./vacancy-page"));

const pagesRoutes = {
    index: '/',
    vacancy: '/vacancy'
}

const pages = [
    {path: pagesRoutes.index, component: <IndexPage/>, exact: true},
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