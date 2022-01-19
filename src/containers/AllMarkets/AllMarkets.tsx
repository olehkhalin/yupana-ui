import React, { useMemo } from 'react';

import { STANDARD_PRECISION } from 'constants/default';
import { getPreparedTokenObject } from 'utils/helpers/token';
import { convertUnits, getPreparedPercentValue } from 'utils/helpers/amount';
import { Asset, MarketsAllQuery, useMarketsAllQuery } from 'generated/graphql';
import { Markets } from 'components/tables/containers/Markets';
import { ALL_MARKETS_LOADING_DATA } from 'components/tables/loading-preview/all-markets-loading';

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
  const preparedData = useMemo(() => (data && !loading ? data.asset.map((el) => {
    const asset = getPreparedTokenObject(el as unknown as Asset);

    const totalSupply = convertUnits(el.totalSupply, STANDARD_PRECISION);
    const supplyApy = getPreparedPercentValue(el as unknown as Asset, 'supply_apy');
    const numberOfSupplier = el.suppliersCount.aggregate?.count ?? 0;
    const totalBorrow = convertUnits(el.totalBorrowed, STANDARD_PRECISION);
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
  }) : ALL_MARKETS_LOADING_DATA), [data, loading]);

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
  const { data, loading, error } = useMarketsAllQuery();

  if ((!data && !loading) || error) {
    return (
      <>
      </>
    );
  }

  return (
    <AllMarketsWrapper
      data={data}
      loading={loading}
      className={className}
    />
  );
};
