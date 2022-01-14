import React, { useEffect, useMemo } from 'react';
import BigNumber from 'bignumber.js';

import { useLoading } from 'hooks/useLoading';
import { COLLATERAL_PRECISION, STANDARD_PRECISION } from 'constants/default';
import { useAccountPkh } from 'utils/dapp';
import { convertUnits } from 'utils/helpers/amount';
import { LimitLine } from 'components/common/LimitLine';
import { UserStat } from 'components/common/UserStat';
import { GetUserStatsQuery, useGetUserStatsLazyQuery } from 'generated/graphql';

import s from './Stats.module.sass';

type StatsProps = {
  className?: string
};

type StatsInnerProps = {
  data: GetUserStatsQuery
} & StatsProps;

const StatsInner: React.FC<StatsInnerProps> = ({
  data,
  className,
}) => {
  const { loading } = useLoading();

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
      if (data.user.length) {
        const user = data.user[0];
        return ({
          netApy: +convertUnits(user.netApy, STANDARD_PRECISION).multipliedBy(1e2),
          borrowRatio: +(
            new BigNumber(1)
              .div(convertUnits(user.borrowRatio, STANDARD_PRECISION))
              .multipliedBy(1e2)
          ),
          maxCollateral: +convertUnits(user.maxCollateral, COLLATERAL_PRECISION),
          liquidationRatio: +(
            new BigNumber(1)
              .div(convertUnits(user.liquidationRatio, STANDARD_PRECISION))
              .multipliedBy(1e2)
          ),
          liquidationCollateral: +convertUnits(user.liquidationCollateral, COLLATERAL_PRECISION),
          totalSupply: +convertUnits(user.totalSupplyUsd, COLLATERAL_PRECISION),
          totalBorrow: +convertUnits(user.totalBorrowUsd, COLLATERAL_PRECISION),
        });
      }

      return {
        netApy: 0,
        borrowRatio: 0,
        maxCollateral: 0,
        liquidationRatio: 0,
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
        loading={loading}
        className={s.stat}
      />
      <LimitLine
        percent={borrowRatio}
        value={maxCollateral}
        title="Your Borrow Limit"
        loading={loading}
        className={s.limit}
      />
      <LimitLine
        percent={liquidationRatio}
        value={liquidationCollateral}
        title="Your Liquidation Limit"
        loading={loading}
        className={s.limit}
      />
    </section>
  );
};

export const Stats: React.FC<StatsProps> = ({
  className,
}) => {
  const accountPkh = useAccountPkh();
  const [fetch, { data }] = useGetUserStatsLazyQuery();

  useEffect(() => {
    fetch({
      variables: {
        account: accountPkh,
      },
    });
  }, [accountPkh, fetch]);

  if (!data || !accountPkh) {
    return <></>;
  }

  return (
    <StatsInner className={className} data={data} />
  );
};
