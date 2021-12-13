import React from 'react';

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
      title="Your Borrow Limit"
      description="A maximum loan amount, or loan limit, describes the total amount of money that an applicant is authorized to borrow."
      theme="tertiary"
      className={s.limit}
    />
    <LimitLine
      text="Your Liquidation Limit"
      percent={LIMIT_LINE.userLiquidationLimitPercent}
      value={LIMIT_LINE.userLiquidationLimit}
      title="Your Liquidation Limit"
      description="The maximum loan amount, or credit limit, describes the total amount of money after which the borrower will be liquidated."
      theme="tertiary"
      className={s.limit}
    />
  </section>
);
