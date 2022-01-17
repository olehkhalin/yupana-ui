import React, { useEffect, useMemo, useState } from 'react';

import { STANDARD_PRECISION } from 'constants/default';
import { getTokenName } from 'utils/helpers/token';
import { convertUnits } from 'utils/helpers/amount';
import { LiquidationPositionsQuery, useLiquidationPositionsLazyQuery } from 'generated/graphql';
import { LiquidationPositions as LiquidationTable } from 'components/tables/components/desktop';

type LiquidationPositionsWrapperProps = {
  data?: LiquidationPositionsQuery
  setOffset: (arg: number) => void
  className?: string
};

const LiquidationPositionsWrapper: React.FC<LiquidationPositionsWrapperProps> = ({
  data,
  setOffset,
  className,
}) => {
  const borrowersCount = useMemo(() => (
    data?.userAggregate.aggregate?.count ?? 1
  ),
  [data?.userAggregate.aggregate?.count]);

  const preparedData = useMemo(() => (data ? data.user.reduce((result: any[], el) => {
    if (el.borrowedAssets.length >= 1 && el.collateralAssets.length >= 1) {
      const borrowedAsset = el.borrowedAssets.map((asset) => getTokenName({
        name: asset.asset.tokens[0].name,
        symbol: asset.asset.tokens[0].symbol,
        id: asset.asset.tokenId,
        address: asset.asset.contractAddress,
      }));

      const collateralAsset = el.collateralAssets.map((asset) => getTokenName({
        name: asset.asset.tokens[0].name,
        symbol: asset.asset.tokens[0].symbol,
        id: asset.asset.tokenId,
        address: asset.asset.contractAddress,
      }));

      result.push({
        borrowerAddress: el.address,
        totalBorrowed: convertUnits(el.outstandingBorrow, STANDARD_PRECISION),
        borrowedAsset,
        collateralAsset,
        healthFactor: convertUnits(el.liquidationRatio, STANDARD_PRECISION),
      });
    }
    return result;
  }, []) : []), [data]);

  return (
    <LiquidationTable
      data={preparedData}
      setOffset={setOffset}
      pageSize={1}
      pageCount={borrowersCount}
      className={className}
    />
  );
};

type AllLiquidationPositionsProps = {
  className?: string
};

export const AllLiquidationPositions: React.FC<AllLiquidationPositionsProps> = ({
  className,
}) => {
  const [offset, setOffset] = useState<number>(0);

  const [fetchBorrowersData, { data, error, loading }] = useLiquidationPositionsLazyQuery({
    variables: {
      limit: 1,
      offset,
    },
  });

  useEffect(() => {
    fetchBorrowersData({
      variables: {
        limit: 1,
        offset,
      },
    });
  }, [fetchBorrowersData, offset]);

  if ((!data && !loading) || error) {
    return <></>;
  }

  return (
    <LiquidationPositionsWrapper
      data={data}
      setOffset={setOffset}
      className={className}
    />
  );
};
