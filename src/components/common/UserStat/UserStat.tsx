import React from 'react';
import cx from 'classnames';

import { getPrettyAmount, getPrettyPercent } from 'utils/helpers/amount';
import { Preloader } from 'components/ui/Preloader';

import s from './UserStat.module.sass';

type UserStatProps = {
  userTotalSupply: number
  userTotalBorrow: number
  netApy: number
  loading: boolean
  className?: string
};

export const UserStat: React.FC<UserStatProps> = ({
  userTotalSupply,
  userTotalBorrow,
  netApy,
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
          ? getPrettyAmount({ value: userTotalSupply, currency: '$' })
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
          ? `${getPrettyPercent(netApy)}%`
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
          ? getPrettyAmount({ value: userTotalBorrow, currency: '$' })
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
