import React from 'react';
import cx from 'classnames';

import { useCurrency } from 'providers/CurrencyProvider';
import { MarketCardInterface } from 'types/market-card';
import { getUniqueKey } from 'utils/helpers';
import { getPrettyAmount } from 'utils/helpers/amount';
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
  totalAmount,
  volume24h,
  numberOfMembers,
  assets,
  theme = 'primary',
  className,
}) => {
  const { convertPriceByBasicCurrency } = useCurrency();

  const isPrimaryTheme = theme === 'primary';

  return (
    <div className={cx(s.root, themeClasses[theme], className)}>
      <div className={s.title}>
        {isPrimaryTheme ? 'Total supply:' : 'Total borrow:'}
      </div>
      <div className={s.amount}>
        {convertPriceByBasicCurrency(totalAmount)}
      </div>

      <div className={s.row}>
        <div className={s.text}>
          {/* Top 3 markets */}
          {isPrimaryTheme ? '24H Supply Volume' : '24H Borrow Volume'}
        </div>
        <div className={s.value}>
          {convertPriceByBasicCurrency(volume24h)}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.text}>
          # of
          {` ${isPrimaryTheme ? 'Suppliers' : 'Borrowers'}`}
        </div>
        <div className={s.value}>
          {getPrettyAmount({ value: numberOfMembers, dec: 0 })}
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
            className={s.progressBar}
          />
        ))}
      </div>
    </div>
  );
};
