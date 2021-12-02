import React, { useMemo } from 'react';
import BigNumber from 'bignumber.js';

import { getTokenName } from 'utils/getTokenName';
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
        totalBorrowed: new BigNumber(el.outstandingBorrow).div(1e18),
        borrowedAsset,
        collateralAsset,
        healthFactor: new BigNumber(el.liquidationRatio).div(1e18),
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

type LiquidationPositionsProps = {
  className?: string
};

export const LiquidationPositions: React.FC<LiquidationPositionsProps> = ({
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
