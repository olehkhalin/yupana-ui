import React from 'react';
import cx from 'classnames';

import { useCurrency } from 'providers/CurrencyProvider';
import { getPrettyPercent } from 'utils/helpers/amount';
import { Preloader } from 'components/ui/Preloader';

import s from './UserStat.module.sass';

type UserStatProps = {
  userTotalSupply: number | undefined
  userTotalBorrow: number | undefined
  netApy: number | undefined
  loading: boolean
  className?: string
};

export const UserStat: React.FC<UserStatProps> = ({
  userTotalSupply,
  userTotalBorrow,
  netApy,
  loading,
  className,
}) => {
  const { convertPriceByBasicCurrency } = useCurrency();

  return (
    <div className={cx(s.root, className)}>
      <div className={s.item}>
        <div className={s.title}>
          Your Supply Balance:
        </div>
        <div className={s.value}>
          {!loading
            ? convertPriceByBasicCurrency(userTotalSupply ?? 0)
            : (
              <Preloader
                theme="primary"
                sizeT="medium"
              />
            )}
        </div>
      </div>

      <div className={s.item}>
        <div className={s.title}>
          Net APY:
        </div>
        <div className={s.value}>
          {!loading
            ? getPrettyPercent(netApy ?? 0)
            : (
              <Preloader
                theme="tertiary"
                sizeT="medium"
              />
            )}
        </div>
      </div>

      <div className={s.item}>
        <div className={s.title}>
          Your Borrow Balance:
        </div>
        <div className={s.value}>
          {!loading
            ? convertPriceByBasicCurrency(userTotalBorrow ?? 0)
            : (
              <Preloader
                theme="secondary"
                sizeT="medium"
              />
            )}
        </div>
      </div>
    </div>
  );
};
