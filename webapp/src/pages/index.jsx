import {lazy} from "react";
import {Route, Routes} from "react-router-dom";

const IndexPage = lazy(() => import("./index-page"));

const pagesRoutes = {
    index: '/'
}

const pages = [
    {path: pagesRoutes.index, component: <IndexPage/>, exact: true},
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