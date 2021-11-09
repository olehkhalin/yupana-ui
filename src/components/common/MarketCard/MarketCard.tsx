import React from 'react';
import cx from 'classnames';

import { MarketCardInterface } from 'types/market-card';
import { getUniqueKey } from 'utils/getUniqueKey';
import { getPrettyPrice } from 'utils/getPrettyPrice';
import { SupplyLine } from 'components/common/SupplyLine';

import s from './MarketCard.module.sass';

type MarketCardProps = {
  theme?: keyof typeof themeClasses
  className?: string
} & MarketCardInterface;

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const MarketCard: React.FC<MarketCardProps> = ({
  totalSupply,
  totalBorrow,
  supplyVolume24h,
  borrowVolume24h,
  numberOfSuppliers,
  numberOfBorrowers,
  assets,
  theme = 'primary',
  className,
}) => {
  const isPrimaryTheme = theme === 'primary';

  return (
    <div className={cx(s.root, themeClasses[theme], className)}>
      <div className={s.title}>
        {isPrimaryTheme ? 'Total supply:' : 'Total borrow:'}
      </div>
      <div className={s.amount}>
        {`$${isPrimaryTheme ? getPrettyPrice(totalSupply) : getPrettyPrice(totalBorrow)}`}
      </div>

      <div className={s.row}>
        <div className={s.text}>
          {`24H ${isPrimaryTheme ? 'Supply' : 'Borrow'} Volume`}
        </div>
        <div className={s.value}>
          {`$${isPrimaryTheme ? getPrettyPrice(supplyVolume24h) : getPrettyPrice(borrowVolume24h)}`}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.text}>
          # of
          {` ${isPrimaryTheme ? 'Suppliers' : 'Borrowers'}`}
        </div>
        <div className={s.value}>
          {`${isPrimaryTheme ? getPrettyPrice(numberOfSuppliers) : getPrettyPrice(numberOfBorrowers)}`}
        </div>
      </div>

      <div className={s.caption}>
        {`24H ${isPrimaryTheme ? 'Supply' : 'Borrow'} Volume`}
      </div>
      <div className={s.wrapper}>
        {assets.map(({ supplyVolume24h: tokenSupply, borrowVolume24h: tokenBorrow, ...rest }) => (
          <SupplyLine
            key={getUniqueKey()}
            percent={isPrimaryTheme ? tokenSupply : tokenBorrow}
            token={rest}
            theme={isPrimaryTheme ? 'primary' : 'secondary'}
            className={s.progressBar}
          />
        ))}
      </div>
    </div>
  );
};
