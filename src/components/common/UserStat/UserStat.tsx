import React from 'react';
import cx from 'classnames';

import { getPrettyAmount } from 'utils/getPrettyAmount';

import s from './UserStat.module.sass';

type UserStatProps = {
  userSupplyBalance: number
  userBorrowBalance: number
  userNetApy: number
  className?: string
};

export const UserStat: React.FC<UserStatProps> = ({
  userSupplyBalance,
  userBorrowBalance,
  userNetApy,
  className,
}) => (
  <div className={cx(s.root, className)}>
    <div className={s.item}>
      <div className={s.title}>
        Your Supply Balance:
      </div>
      <div className={s.value}>
        {getPrettyAmount({ value: userSupplyBalance, currency: '$' })}
      </div>
    </div>

    <div className={s.item}>
      <div className={s.title}>
        Net APY:
      </div>
      <div className={s.value}>
        {`${userNetApy}%`}
      </div>
    </div>

    <div className={s.item}>
      <div className={s.title}>
        Your Borrow Balance:
      </div>
      <div className={s.value}>
        {getPrettyAmount({ value: userBorrowBalance, currency: '$' })}
      </div>
    </div>
  </div>
);