import React, { useMemo } from 'react';
import cx from 'classnames';
import BigNumber from 'bignumber.js';

import { getPreparedTokenObject } from 'utils/getPreparedTokenObject';
import { Asset, MarketOverviewQuery, useMarketOverviewQuery } from 'generated/graphql';
import { MarketCard } from 'components/common/MarketCard';

import s from './MarketCards.module.sass';

const prepareObject = (data: MarketOverviewQuery, isSupply = true) => {
  const totalAmount = new BigNumber(
    data.assetAggregate.aggregate?.sum?.[isSupply ? 'totalSupply' : 'totalBorrowed'] ?? '0',
  ).div(1e18);
  const numberOfMembers = isSupply
    ? +(data.suppliersCount.aggregate?.count ?? '0')
    : +(data.borowersCount.aggregate?.count ?? '0');

  const volume24h = +data.dailyStats[0][isSupply ? 'supplyVolume' : 'borrowVolume'];
  // TODO: Change when api will be updated

  const assets = data[isSupply ? 'supplyAssets' : 'borrowAssets'].map((el) => {
    const asset = getPreparedTokenObject(el as Asset);
    // @ts-ignore
    const assetVolume24h = new BigNumber(el[isSupply ? 'totalSupply' : 'totalBorrowed'])
      .div(1e18)
      .multipliedBy(1e2)
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
  const { data, error, loading } = useMarketOverviewQuery();

  if (!data || error) {
    return <></>;
  }

  return (
    <div className={cx(s.root, className)}>
      <MarketCardsWrapper data={data} loading={loading} />
    </div>
  );
};
