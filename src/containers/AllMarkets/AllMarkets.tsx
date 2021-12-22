import React, { useMemo } from 'react';

import { STANDARD_PRECISION } from 'constants/default';
import { getPreparedTokenObject } from 'utils/helpers/token';
import { convertUnits, getPreparedPercentValue } from 'utils/helpers/amount';
import { Asset, MarketsAllQuery, useMarketsAllQuery } from 'generated/graphql';
import { Markets } from 'components/tables/containers/Markets';

type AllMarketsWrapperProps = {
  data?: MarketsAllQuery
  className?: string
};

const AllMarketsWrapper: React.FC<AllMarketsWrapperProps> = ({
  data,
  className,
}) => {
  const preparedData = useMemo(() => (data ? data.asset.map((el) => {
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
  }) : []), [data]);

  return (
    <Markets
      data={preparedData}
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
  const { data, error } = useMarketsAllQuery();

  if (!data || error) {
    return <></>;
  }

  return (
    <AllMarketsWrapper
      data={data}
      className={className}
    />
  );
};
