import React from 'react';
import cx from 'classnames';

import { MarketCard } from 'components/common/MarketCard';
import { MARKET_CARDS_BORROW, MARKET_CARDS_SUPPLY } from 'components/temp-data/market-card';

import s from './MarketCards.module.sass';

type MarketCardsProps = {
  className?: string
};

export const MarketCards: React.FC<MarketCardsProps> = ({
  className,
}) => (
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
