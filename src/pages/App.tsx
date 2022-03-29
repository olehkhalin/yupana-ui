import React, { FC, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import animateScrollTo from "animated-scroll-to";

import { client } from "utils/client";
import { AnalyticsEventCategory } from "utils/analytics/analytics-event";
import { useOnBlock, useTezos } from "utils/dapp";
import { components } from "routes/components";
import { AppRoutes } from "routes/main-routes";
import { useInitialSetup } from "hooks/useInitialSetup";
import { useMatchMutate } from "hooks/useMatchMutate";
import NotFound from "pages/not-found";
import { useAnalytics } from "hooks/useAnalytics";

const App: FC = () => {
  const location = useLocation();
  const { pathname } = useLocation();
  const tezos = useTezos();
  const matchMutate = useMatchMutate();
  const { pageEvent } = useAnalytics();

  useInitialSetup();

  useOnBlock(tezos, [
    () =>
      client
        .refetchQueries({
          include: "active",
        })
        .catch(console.error),
    () => matchMutate("asset-wallet-amount"),
  ]);

  useEffect(() => {
    animateScrollTo(window.pageYOffset - window.pageYOffset, {
      speed: 750,
      maxDuration: 1000,
      minDuration: 100,
    });
  }, [pathname]);

  useEffect(() => {
    pageEvent(
      pathname.split("/")[1].toUpperCase(),
      AnalyticsEventCategory.OPEN_PAGE
    );
  }, [pageEvent, pathname]);

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
