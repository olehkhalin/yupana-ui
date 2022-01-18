import React, { useEffect, useMemo } from 'react';
import BigNumber from 'bignumber.js';

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
  data: GetUserStatsQuery | undefined
  loading: boolean
} & StatsProps;

const StatsInner: React.FC<StatsInnerProps> = ({
  data,
  loading,
  className,
}) => {
  const prepareData = useMemo(
    () => {
      if (data && data.user.length) {
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
      return undefined;
    },
    [data],
  );

  return (
    <section className={className}>
      <UserStat
        userTotalSupply={prepareData?.totalSupply}
        userTotalBorrow={prepareData?.totalBorrow}
        netApy={prepareData?.netApy}
        loading={loading}
        className={s.stat}
      />
      <LimitLine
        percent={prepareData?.borrowRatio}
        value={prepareData?.maxCollateral}
        title="Your Borrow Limit"
        loading={loading}
        className={s.limit}
      />
      <LimitLine
        percent={prepareData?.liquidationRatio}
        value={prepareData?.liquidationCollateral}
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
  const [fetch, { data, loading }] = useGetUserStatsLazyQuery();

  useEffect(() => {
    if (accountPkh) {
      fetch({
        variables: {
          account: accountPkh,
        },
      });
    }
  }, [accountPkh, fetch]);

  if (!accountPkh && !loading) {
    return <></>;
  }

  return (
    <StatsInner
      data={data}
      loading={loading}
      className={className}
    />
  );
};
