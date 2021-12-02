import React, { useMemo } from 'react';

import { getPreparedTokenObject } from 'utils/getPreparedTokenObject';
import { getPreparedPercentValue } from 'utils/getPreparedPercentValue';
import { Markets } from 'components/tables/containers/Markets';

import { Token, useAllMarketsQueryQuery } from '../../graphql';

type AllMarketsProps = {
  className?: string
};

export const AllMarkets: React.FC<AllMarketsProps> = ({
  className,
}) => {
  const { data, loading, error } = useAllMarketsQueryQuery();

  if (error) {
    console.log('error', error);
  }

  const preparedData = useMemo(() => (data ? data.token.map((el) => {
    const asset = getPreparedTokenObject(el as Token);

    const totalSupply = +el.asset.totalSupply;
    const totalBorrow = +el.asset.totalBorrowed;
    const supplyApy = getPreparedPercentValue(el as Token, 'supply_apy');
    const borrowApy = getPreparedPercentValue(el as Token, 'borrow_apy');
    const numberOfSupplier = 0;
    const numberOfBorrowers = 0;

    return {
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
