import React from 'react';
import cx from 'classnames';

import { getPrettyPercent } from 'utils/helpers/amount';
import { Preloader } from 'components/ui/Preloader';

import { useCurrency } from 'providers/CurrencyProvider';
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
          {!loading && userTotalSupply
            ? convertPriceByBasicCurrency(userTotalSupply)
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
          {!loading && netApy
            ? getPrettyPercent(netApy)
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
          {!loading && userTotalBorrow
            ? convertPriceByBasicCurrency(userTotalBorrow)
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
