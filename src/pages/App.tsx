import React, { FC } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { components } from "routes/components";
import { AppRoutes } from "routes/main-routes";
import { useInitialSetup } from "hooks/useInitialSetup";
import NotFound from "pages/not-found";

const App: FC = () => {
  const location = useLocation();

  useInitialSetup();

  if (location.pathname === "/") {
    return <Navigate to={AppRoutes.LENDING} />;
  }

  return (
    <Routes>
      {components.map(({ id, path, Component, ...rest }) => {
        return <Route key={id} path={path} element={<Component />} {...rest} />;
      })}

      <Route key={-1} path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
