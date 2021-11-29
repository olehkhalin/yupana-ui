import React, { useMemo } from 'react';
import cx from 'classnames';

import { getPreparedTokenObject } from 'utils/getPreparedTokenObject';
import { MarketCard } from 'components/common/MarketCard';
import { MARKET_CARDS_BORROW, MARKET_CARDS_SUPPLY } from 'components/temp-data/market-card';

import s from './MarketCards.module.sass';
import {
  Token,
  useMarketsBorrowedInfoQuery,
  useMarketsSupplyInfoQuery,
} from '../../graphql';

type MarketCardsProps = {
  className?: string
};

export const MarketCards: React.FC<MarketCardsProps> = ({
  className,
}) => {
  const { data: supplyData, error: supplyError } = useMarketsSupplyInfoQuery();
  const { data: borrowedData, error: borrowedError } = useMarketsBorrowedInfoQuery();

  if (supplyError || borrowedError) {
    console.log('error', supplyError, borrowedError);
  }

  const preparedSupplyData = useMemo(() => {
    if (!supplyData) return null;

    const totalAmount = 0; // TODO: Change later
    const volume24h = +supplyData.dailyStats[0].supplyVolume;
    // const numberOfMembers = +data.dailyStats[0].supplyVolume;
    const numberOfMembers = 0; // TODO: Change later

    const assets = supplyData.token.map((el) => {
      const asset = getPreparedTokenObject(el as Token);

      const totalSupply = +el.asset.totalSupply;

      return {
        ...asset,
        volume24h: totalSupply,
      };
    });

    return {
      totalAmount,
      volume24h,
      numberOfMembers,
      assets,
    };
  }, [supplyData]);

  console.log('borrowedData', borrowedData);
  console.log('preparedSupplyData', preparedSupplyData);

  return (
    <div className={cx(s.root, className)}>
      <MarketCard
        {...MARKET_CARDS_SUPPLY}
        className={s.card}
      />
      <MarketCard
        {...MARKET_CARDS_BORROW}
        theme="secondary"
        className={s.card}
      />
    </div>
  );
};
