import React from 'react';
import cx from 'classnames';

import { getPrettyAmount, getPrettyPercent } from 'utils/helpers/amount';

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
}) => (
  <div className={cx(s.root, className)}>
    <div className={s.item}>
      <div className={s.title}>
        Your Supply Balance:
      </div>
      <div className={s.value}>
        {getPrettyAmount({ value: userTotalSupply, currency: '$' })}
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
        {getPrettyAmount({ value: userTotalBorrow, currency: '$' })}
      </div>
    </div>
  </div>
);
