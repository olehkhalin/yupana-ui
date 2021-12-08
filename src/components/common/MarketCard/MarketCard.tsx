import React from 'react';
import cx from 'classnames';

import { MarketCardInterface } from 'types/market-card';
import { getUniqueKey } from 'utils/getUniqueKey';
import { getPrettyAmount } from 'utils/getPrettyAmount';
import { Preloader } from 'components/ui/Preloader';
import { SupplyLine } from 'components/common/SupplyLine';

import s from './MarketCard.module.sass';

type MarketCardProps = {
  loading?: boolean
  theme?: keyof typeof themeClasses
  className?: string
} & MarketCardInterface;

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const MarketCard: React.FC<MarketCardProps> = ({
  loading,
  totalAmount,
  volume24h,
  numberOfMembers,
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
        {!loading ? getPrettyAmount({ value: totalAmount, currency: '$' }) : <Preloader theme={theme} />}
      </div>

      <div className={s.row}>
        <div className={s.text}>
          {/* Top 3 markets */}
          {isPrimaryTheme ? '24H Supply Volume' : '24H Borrow Volume'}
        </div>
        <div className={s.value}>
          {!loading ? getPrettyAmount({ value: volume24h, currency: '$' }) : <Preloader />}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.text}>
          # of
          {` ${isPrimaryTheme ? 'Suppliers' : 'Borrowers'}`}
        </div>
        <div className={s.value}>
          {!loading ? getPrettyAmount({ value: numberOfMembers, dec: 0 }) : <Preloader />}
        </div>
      </div>

      <div className={s.caption}>
        Top 3 markets
      </div>
      <div className={s.wrapper}>
        {assets.map(({ volume24h: assetVolume24h, ...rest }) => (
          <SupplyLine
            key={getUniqueKey()}
            percent={assetVolume24h}
            token={rest}
            theme={isPrimaryTheme ? 'primary' : 'secondary'}
            loading={loading}
            className={s.progressBar}
          />
        ))}
      </div>
    </div>
  );
};
