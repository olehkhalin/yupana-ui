import React from 'react';
import cx from 'classnames';

import { getPrettyPercent } from 'utils/helpers/amount';

import { useCurrency } from 'providers/CurrencyProvider';
import s from './UserStat.module.sass';

type UserStatProps = {
  userTotalSupply: number
  userTotalBorrow: number
  netApy: number
  className?: string
};

export const UserStat: React.FC<UserStatProps> = ({
  userTotalSupply,
  userTotalBorrow,
  netApy,
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
          {convertPriceByBasicCurrency(userTotalSupply)}
        </div>
      </div>

      <div className={s.item}>
        <div className={s.title}>
          Net APY:
        </div>
        <div className={s.value}>
          {getPrettyPercent(netApy)}
        </div>
      </div>

      <div className={s.item}>
        <div className={s.title}>
          Your Borrow Balance:
        </div>
        <div className={s.value}>
          {convertPriceByBasicCurrency(userTotalBorrow)}
        </div>
      </div>
    </div>
  );
};
