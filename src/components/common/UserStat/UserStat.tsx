import React from 'react';
import cx from 'classnames';

import { getPrettyAmount } from 'utils/getPrettyAmount';
import { LimitLine } from 'components/common/LimitLine';

import s from './UserStat.module.sass';

type UserStatProps = {
  className?: string
};

export const UserStat: React.FC<UserStatProps> = ({
  className,
}) => {
  // Data from API
  const {
    userSupplyBalance,
    userBorrowBalance,
    userBorrowLimit,
    userBorrowLimitPercent,
    userLiquidationLimit,
    userLiquidationLimitPercent,
    userNetApy,
  } = {
    userSupplyBalance: 231631,
    userBorrowBalance: 41981,
    userBorrowLimit: 192141,
    userBorrowLimitPercent: 21.45,
    userLiquidationLimit: 219124,
    userLiquidationLimitPercent: 48.12,
    userNetApy: 38.12,
  };

  return (
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
};
