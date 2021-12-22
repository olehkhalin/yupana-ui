import React, { useMemo } from 'react';

import { STANDARD_PRECISION } from 'constants/default';
import { getTokenName } from 'utils/helpers/token';
import { convertUnits } from 'utils/helpers/amount';
import { LiquidationPositionsQuery, useLiquidationPositionsQuery } from 'generated/graphql';
import { LiquidationPositions as LiquidatationTable } from 'components/tables/components/desktop';

type LiquidationPositionsWrapperProps = {
  data?: LiquidationPositionsQuery
  className?: string
};

const LiquidationPositionsWrapper: React.FC<LiquidationPositionsWrapperProps> = ({
  data,
  className,
}) => {
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
    <LiquidatationTable
      data={preparedData}
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
  const { data, error } = useLiquidationPositionsQuery();

  if (!data || error) {
    return <></>;
  }

  return (
    <LiquidationPositionsWrapper
      data={data}
      className={className}
    />
  );
};
