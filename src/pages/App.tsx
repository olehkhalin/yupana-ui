import React, { useEffect, useMemo } from 'react';
import {
  Redirect, Route, Switch, useLocation,
} from 'react-router-dom';
import animateScrollTo from 'animated-scroll-to';
import BigNumber from 'bignumber.js';
import useSWR from 'swr';

import { fetchTezosPrice } from 'utils/helpers/getTezosPrice';
import { useAccountPkh } from 'utils/dapp';
import {
  useOraclePricesQuery,
  useUserBorrowedYTokensLazyQuery,
} from 'generated/graphql';
import {
  OraclePricesProvider,
  OraclePricesType,
  useOraclePrices,
} from 'providers/OraclePricesProvider';
import { useCurrency } from 'providers/CurrencyProvider';
import {
  UserBorrowedYTokensProvider,
  useUserBorrowedYTokens,
} from 'providers/UserBorrowedYTokensProvider';
import BaseLayout from 'layouts/BaseLayout';
import { components } from 'routes/components';
import { AppRoutes } from 'routes/main-routes';
import NotFound from 'pages/not-found';

const AppInner = () => {
  const { pathname } = useLocation();

  const {
    data: allTezosData,
  } = useSWR(
    ['tezos-price'],
    fetchTezosPrice,
    { refreshInterval: 30000 },
  );

  useEffect(() => {
    animateScrollTo(window.pageYOffset - window.pageYOffset,
      { speed: 750, maxDuration: 1000, minDuration: 100 });
  }, [pathname]);

  const accountPkh = useAccountPkh();
  const { data: oraclePricesData } = useOraclePricesQuery();
  const [fetch, { data: userBorrowedYTokensData }] = useUserBorrowedYTokensLazyQuery();

  const { setOraclePrices } = useOraclePrices();
  const { setTezosPrice } = useCurrency();
  const { setUserBorrowedYTokens } = useUserBorrowedYTokens();

  const preparedOraclePrices = useMemo(() => {
    if (!oraclePricesData) return null;

    const newObj: OraclePricesType = {};

    oraclePricesData.oraclePrice.forEach((el) => {
      newObj[el.ytoken] = {
        price: new BigNumber(el.price),
        decimals: new BigNumber(el.decimals),
      };
    });

    return newObj;
  }, [oraclePricesData]);

  const preparedUserBorrowedYTokens = useMemo(() => (
    userBorrowedYTokensData
      ? userBorrowedYTokensData.userBorrow.map(({ asset: { ytoken } }) => (ytoken))
      : []
  ), [userBorrowedYTokensData]);

  useEffect(() => {
    fetch({
      variables: {
        account: accountPkh,
      },
    });
  }, [accountPkh, fetch]);

  useEffect(() => {
    if (preparedOraclePrices) {
      setOraclePrices(preparedOraclePrices);
    }
  }, [preparedOraclePrices, setOraclePrices]);

  // Prepare tezos price
  useEffect(() => {
    if (allTezosData) {
      const tezosPrice = new BigNumber(allTezosData.value.computedPrice).div(1e6);
      setTezosPrice(+tezosPrice);
    }
  }, [allTezosData, setTezosPrice]);

  useEffect(() => {
    setUserBorrowedYTokens(preparedUserBorrowedYTokens);
  }, [preparedUserBorrowedYTokens, setUserBorrowedYTokens]);

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
      <Route component={NotFound} />
    </Switch>
  );
};

const App: React.FC = () => (
  <OraclePricesProvider>
    <UserBorrowedYTokensProvider>
      <AppInner />
    </UserBorrowedYTokensProvider>
  </OraclePricesProvider>
);

export default App;
