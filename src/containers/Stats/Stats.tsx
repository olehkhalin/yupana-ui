import React from 'react';

import { LIMIT_LINES } from 'constants/popups/limit-lines';
import { LimitLine } from 'components/common/LimitLine';
import { UserStat } from 'components/common/UserStat';
import { LIMIT_LINE } from 'components/temp-data/limit-line';
import { USER_STAT } from 'components/temp-data/user-stat';

import s from './Stats.module.sass';

type StatsProps = {
  className?: string
};

export const Stats: React.FC<StatsProps> = ({
  className,
}) => (
  <section className={className}>
    <UserStat
      {...USER_STAT}
      className={s.stat}
    />
    <LimitLine
      text="Your Borrow Limit"
      percent={LIMIT_LINE.userBorrowLimitPercent}
      value={LIMIT_LINE.userBorrowLimit}
      title={LIMIT_LINES.borrowLimit.title}
      description={LIMIT_LINES.borrowLimit.description}
      buttonText={LIMIT_LINES.borrowLimit.buttonText}
      theme="secondary"
      className={s.limit}
    />
    <LimitLine
      text="Your Liquidation Limit"
      percent={LIMIT_LINE.userLiquidationLimitPercent}
      value={LIMIT_LINE.userLiquidationLimit}
      title={LIMIT_LINES.liquidationLimit.title}
      description={LIMIT_LINES.liquidationLimit.desciption}
      buttonText={LIMIT_LINES.liquidationLimit.buttonText}
      theme="secondary"
      className={s.limit}
    />
  </section>
);
