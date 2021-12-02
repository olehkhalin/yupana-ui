import React, { useEffect } from 'react';
import {
  Redirect, Route, Switch, useLocation,
} from 'react-router-dom';
import animateScrollTo from 'animated-scroll-to';

import BaseLayout from 'layouts/BaseLayout';
import { components } from 'routes/components';
import { AppRoutes } from 'routes/main-routes';

const App: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    animateScrollTo(window.pageYOffset - window.pageYOffset,
      { speed: 750, maxDuration: 1000, minDuration: 100 });
  }, [pathname]);

  return (
    <Switch>
      {
        components.map(({
          id, path, Component, ...rest
        }) => {
          if (pathname === '/') {
            return <Redirect key={id} to={AppRoutes.LENDING} />;
          }

          return (
            <Route
              exact
              path={path}
              key={id}
              {...rest}
              render={(props) => (
                <BaseLayout>
                  <Component {...props as any} />
                </BaseLayout>
              )}
            />
          );
        })
      }
      <Redirect to={AppRoutes.LENDING} />
    </Switch>
  );
};

export default App;
