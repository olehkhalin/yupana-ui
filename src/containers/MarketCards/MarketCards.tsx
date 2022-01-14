import React, { useMemo } from 'react';
import cx from 'classnames';
import BigNumber from 'bignumber.js';

import { useLoading } from 'hooks/useLoading';
import { STANDARD_PRECISION } from 'constants/default';
import { getPreparedTokenObject } from 'utils/helpers/token';
import { convertUnits } from 'utils/helpers/amount';
import { Asset, MarketOverviewQuery, useMarketOverviewQuery } from 'generated/graphql';
import { MarketCard } from 'components/common/MarketCard';

import s from './MarketCards.module.sass';

const prepareObject = (data: MarketOverviewQuery, isSupply = true) => {
  const totalAmount = convertUnits(
    data.assetAggregate.aggregate?.sum?.[isSupply ? 'totalSupply' : 'totalBorrowed'] ?? '0',
    STANDARD_PRECISION,
  );
  const numberOfMembers = isSupply
    ? +(data.suppliersCount.aggregate?.count ?? '0')
    : +(data.borowersCount.aggregate?.count ?? '0');
  const volume24h = data.dailyStats
    // TODO: Research decimals: div(10e26)
    && data.dailyStats.length ? +(new BigNumber(data.dailyStats[0][isSupply ? 'supplyVolume' : 'borrowVolume']).div(1e26)) : 0;
  // TODO: Change when api will be updated

  const assets = data[isSupply ? 'supplyAssets' : 'borrowAssets'].map((el) => {
    const asset = getPreparedTokenObject(el as Asset);
    const assetVolume24h = convertUnits(
      // @ts-ignore
      el[isSupply ? 'totalSupply' : 'totalBorrowed'],
      STANDARD_PRECISION,
    ).multipliedBy(1e2)
      .div(totalAmount);

    return {
      ...asset,
      volume24h: +assetVolume24h,
    };
  });

  return {
    totalAmount,
    volume24h,
    numberOfMembers,
    assets,
  };
};

type MarketCardsWrapperProps = {
  data: MarketOverviewQuery
  loading?: boolean
};

const MarketCardsWrapper: React.FC<MarketCardsWrapperProps> = ({
  data,
  loading,
}) => {
  const preparedData = useMemo(() => ({
    supply: prepareObject(data),
    borrow: prepareObject(data, false),
  }), [data]);

  return (
    <>
      <MarketCard
        {...preparedData.supply}
        loading={loading}
        className={s.card}
      />
      <MarketCard
        {...preparedData.borrow}
        loading={loading}
        theme="secondary"
        className={s.card}
      />
    </>
  );
};

type MarketCardsProps = {
  className?: string
};

export const MarketCards: React.FC<MarketCardsProps> = ({
  className,
}) => {
  const { data, error } = useMarketOverviewQuery();

  // TODO: Delete later
  const { loading } = useLoading();

  if (!data || error) {
    return (
      <></>
    );
  }

  return (
    <div className={cx(s.root, className)}>
      <MarketCardsWrapper data={data} loading={loading} />
    </div>
  );
};
