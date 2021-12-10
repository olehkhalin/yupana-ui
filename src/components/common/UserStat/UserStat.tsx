import React from 'react';
import cx from 'classnames';

import { getPrettyAmount } from 'utils/getPrettyAmount';
import { Preloader } from 'components/ui/Preloader';

import s from './UserStat.module.sass';

type UserStatProps = {
  userSupplyBalance: number
  userBorrowBalance: number
  userNetApy: number
  loading: boolean
  className?: string
};

export const UserStat: React.FC<UserStatProps> = ({
  userSupplyBalance,
  userBorrowBalance,
  userNetApy,
  loading,
  className,
}) => (
  <div className={cx(s.root, className)}>
    <div className={s.item}>
      <div className={s.title}>
        Your Supply Balance:
      </div>
      <div className={s.value}>
        {!loading
          ? getPrettyAmount({ value: userSupplyBalance, currency: '$' })
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
          ? `${userNetApy}%`
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
          ? getPrettyAmount({ value: userBorrowBalance, currency: '$' })
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
