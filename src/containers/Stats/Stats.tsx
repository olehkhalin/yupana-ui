import React from 'react';

import { useLoading } from 'hooks/useLoading';
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
}) => {
  // TODO: Delete later
  const { loading } = useLoading();

  return (
    <section className={className}>
      <UserStat
        {...USER_STAT}
        loading={loading}
        className={s.stat}
      />
      <LimitLine
        percent={LIMIT_LINE.userBorrowLimitPercent}
        value={LIMIT_LINE.userBorrowLimit}
        title="Your Borrow Limit"
        loading={loading}
        className={s.limit}
      />
      <LimitLine
        percent={LIMIT_LINE.userLiquidationLimitPercent}
        value={LIMIT_LINE.userLiquidationLimit}
        title="Your Liquidation Limit"
        loading={loading}
        className={s.limit}
      />
    </section>
  );
};
