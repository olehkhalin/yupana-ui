import React, { useEffect, useMemo } from 'react';
import BigNumber from 'bignumber.js';

import { useAccountPkh } from 'utils/dapp';
import { LimitLine } from 'components/common/LimitLine';
import { UserStat } from 'components/common/UserStat';
import { useGetUserStatsLazyQuery } from 'generated/graphql';

import s from './Stats.module.sass';

type StatsProps = {
  className?: string
};

const StatsInner: React.FC<StatsProps & { accountPkh: string }> = ({
  className,
  accountPkh,
}) => {
  const [fetch, { data }] = useGetUserStatsLazyQuery();

  useEffect(() => {
    fetch({
      variables: {
        account: accountPkh,
      },
    });
  }, [accountPkh, fetch]);

  // Get user main stats
  const {
    netApy,
    borrowRatio,
    maxCollateral,
    liquidationRatio,
    liquidationCollateral,
    totalSupply,
    totalBorrow,
  } = useMemo(
    () => {
      if (data && data.user.length) {
        const user = data.user[0];
        return ({
          netApy: Number(new BigNumber(user.netApy).div(1e18)),
          borrowRatio: user.borrowRatio,
          maxCollateral: Number(new BigNumber(user.maxCollateral).div(1e18)),
          liquidationRatio: user.liquidationRatio,
          liquidationCollateral: Number(new BigNumber(user.liquidationCollateral).div(1e18)),
          totalSupply: Number(new BigNumber(user.totalSupplyUsd).div(1e18)),
          totalBorrow: Number(new BigNumber(user.totalBorrowUsd).div(1e18)),
        });
      }

      return {
        netApy: 0,
        borrowRatio: '0',
        maxCollateral: 0,
        liquidationRatio: '0',
        liquidationCollateral: 0,
        totalSupply: 0,
        totalBorrow: 0,
      };
    },
    [data],
  );

  return (
    <section className={className}>
      <UserStat
        userTotalSupply={totalSupply}
        userTotalBorrow={totalBorrow}
        netApy={netApy}
        className={s.stat}
      />
      <LimitLine
        percent={borrowRatio > 100 ? 100 : borrowRatio}
        value={maxCollateral}
        title="Your Borrow Limit"
        className={s.limit}
      />
      <LimitLine
        percent={liquidationRatio > 100 ? 100 : liquidationRatio}
        value={liquidationCollateral}
        title="Your Liquidation Limit"
        className={s.limit}
      />
    </section>
  );
};

export const Stats: React.FC<StatsProps> = ({
  className,
}) => {
  const accountPkh = useAccountPkh();

  if (!accountPkh) {
    return <></>;
  }

  return <StatsInner className={className} accountPkh={accountPkh} />;
};
