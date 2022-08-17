import React, { FC, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import animateScrollTo from "animated-scroll-to";

import { client } from "utils/client";
import { useOnBlock, useTezos } from "utils/dapp";
import { components } from "routes/components";
import { AppRoutes } from "routes/main-routes";
import { useInitialSetup } from "hooks/useInitialSetup";
import { useMatchMutate } from "hooks/useMatchMutate";
import NotFound from "pages/not-found";

const App: FC = () => {
  const { pathname } = useLocation();
  const tezos = useTezos();
  const matchMutate = useMatchMutate();

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

  if (pathname === "/") {
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
