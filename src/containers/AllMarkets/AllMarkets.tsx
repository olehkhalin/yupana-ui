import React, { useMemo } from 'react';
import BigNumber from 'bignumber.js';

import { getPreparedTokenObject } from 'utils/getPreparedTokenObject';
import { getPreparedPercentValue } from 'utils/getPreparedPercentValue';
import { Asset, MarketsAllQuery, useMarketsAllQuery } from 'generated/graphql';
import { Markets } from 'components/tables/containers/Markets';

type AllMarketsWrapperProps = {
  data?: MarketsAllQuery
  loading?: boolean
  className?: string
};

const AllMarketsWrapper: React.FC<AllMarketsWrapperProps> = ({
  data,
  loading,
  className,
}) => {
  const preparedData = useMemo(() => (data ? data.asset.map((el) => {
    const asset = getPreparedTokenObject(el as unknown as Asset);

    const totalSupply = new BigNumber(el.totalSupply).div(1e18);
    const supplyApy = getPreparedPercentValue(el as unknown as Asset, 'supply_apy');
    const numberOfSupplier = el.suppliersCount.aggregate?.count ?? 0;
    const totalBorrow = new BigNumber(el.totalBorrowed).div(1e18);
    const borrowApy = getPreparedPercentValue(el as unknown as Asset, 'borrow_apy');
    const numberOfBorrowers = el.borrowersCount.aggregate?.count ?? 0;

    return {
      yToken: el.ytoken,
      asset,
      totalSupply,
      supplyApy,
      numberOfSupplier,
      totalBorrow,
      borrowApy,
      numberOfBorrowers,
    };
  }) : []), [data]);

  return (
    <Markets
      data={preparedData}
      loading={loading}
      className={className}
    />
  );
};

type AllMarketsProps = {
  className?: string
};

export const AllMarkets: React.FC<AllMarketsProps> = ({
  className,
}) => {
  const { data, error, loading } = useMarketsAllQuery();

  if ((!data && !loading) || error) {
    return <></>;
  }

  return (
    <AllMarketsWrapper
      data={data}
      loading={loading}
      className={className}
    />
  );
};
