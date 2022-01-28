import React, { FC, useCallback, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { useGlobalFactorsLazyQuery } from "generated/graphql";
import { components } from "routes/components";
import { AppRoutes } from "routes/main-routes";
import NotFound from "pages/not-found";
import { useOnBlock, useTezos } from "../utils/dapp";

const App: FC = () => {
  const tezos = useTezos();
  const location = useLocation();

  // Set global factors
  const [fetchGlobalFactors] = useGlobalFactorsLazyQuery();
  const updateData = useCallback(() => {
    fetchGlobalFactors();
  }, [fetchGlobalFactors]);
  useEffect(() => {
    fetchGlobalFactors();
  }, [fetchGlobalFactors]);

  useOnBlock(tezos, [updateData]);

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
