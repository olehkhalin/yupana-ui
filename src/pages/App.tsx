import React from 'react';
import {
  Redirect, Route, Switch, useLocation,
} from 'react-router-dom';

import BaseLayout from 'layouts/BaseLayout';
import { components } from 'routes/components';
import { AppRoutes } from 'routes/main-routes';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <Switch>
      {
        components.map(({
          id, path, Component, ...rest
        }) => {
          if (location.pathname === '/') {
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
