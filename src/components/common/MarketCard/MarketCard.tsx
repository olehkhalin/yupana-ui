import React from 'react';
import BigNumber from 'bignumber.js';
import cx from 'classnames';

import { TokenMetadataInterface } from 'types/token';
import { getUniqueKey } from 'utils/helpers';
import { getPrettyAmount } from 'utils/helpers/amount';
import { Preloader } from 'components/ui/Preloader';
import { SupplyLine } from 'components/common/SupplyLine';

import s from './MarketCard.module.sass';

type MarketCardProps = {
  loading?: boolean
  theme?: keyof typeof themeClasses
  totalAmount: BigNumber | number | undefined
  volume24h: BigNumber | number | undefined
  numberOfMembers: number | undefined
  assets: (TokenMetadataInterface & {
    volume24h: number
  })[] | undefined
  className?: string
};

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
        {!loading && totalAmount
          ? getPrettyAmount({ value: totalAmount, currency: '$' })
          : (
            <Preloader
              theme={theme}
              sizeT="medium"
              className={s.amountPreloader}
            />
          )}
      </div>

      <div className={s.row}>
        <div className={s.text}>
          {isPrimaryTheme ? '24H Supply Volume' : '24H Borrow Volume'}
        </div>
        <div className={s.value}>
          {!loading && volume24h?.toString()
            ? getPrettyAmount({ value: volume24h, currency: '$' })
            : (
              <Preloader
                className={s.valuePreloader}
              />
            )}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.text}>
          # of
          {` ${isPrimaryTheme ? 'Suppliers' : 'Borrowers'}`}
        </div>
        <div className={s.value}>
          {!loading && numberOfMembers
            ? getPrettyAmount({ value: numberOfMembers, dec: 0 })
            : (
              <Preloader
                className={s.valuePreloader}
              />
            )}
        </div>
      </div>

      <div className={s.caption}>
        Top 3 markets
      </div>
      <div className={s.wrapper}>
        {!loading
          && assets && assets.length ? assets.map(({ volume24h: assetVolume24h, ...rest }) => (
            <SupplyLine
              key={getUniqueKey()}
              percent={assetVolume24h}
              token={rest}
              loading={loading}
              className={s.progressBar}
            />
          )) : (
            <>
              <SupplyLine
                loading={loading}
                className={s.progressBar}
              />
              <SupplyLine
                loading={loading}
                className={s.progressBar}
              />
              <SupplyLine
                loading={loading}
                className={s.progressBar}
              />
            </>
          )}
      </div>
    </div>
  );
};
