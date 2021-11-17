import React from 'react';
import cx from 'classnames';

import { getPrettyAmount } from 'utils/getPrettyAmount';
import { LimitLine } from 'components/common/LimitLine';

import s from './UserStat.module.sass';

type UserStatProps = {
  userSupplyBalance: number
  userBorrowBalance: number
  userBorrowLimit: number
  userBorrowLimitPercent: number
  userLiquidationLimit: number
  userLiquidationLimitPercent: number
  userNetApy: number
  className?: string
};

export const UserStat: React.FC<UserStatProps> = ({
  userSupplyBalance,
  userBorrowBalance,
  userBorrowLimit,
  userBorrowLimitPercent,
  userLiquidationLimit,
  userLiquidationLimitPercent,
  userNetApy,
  className,
}) => (
  <section className={cx(s.root, className)}>
    <div className={s.stat}>
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

    <LimitLine
      percent={userBorrowLimitPercent}
      value={userBorrowLimit}
      title="Your Borrow Limit"
      className={s.limit}
    />
    <LimitLine
      percent={userLiquidationLimitPercent}
      value={userLiquidationLimit}
      title="Your Liquidation Limit"
      className={s.limit}
    />
  </section>
);
