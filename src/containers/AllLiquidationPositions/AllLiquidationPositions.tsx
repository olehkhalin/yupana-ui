import React, { useMemo, useState, useEffect } from 'react';
import BigNumber from 'bignumber.js';

import { getTokenName } from 'utils/getTokenName';
import { LiquidationPositionsQuery, useLiquidationPositionsQuery } from 'generated/graphql';
import { LiquidationPositions as LiquidatationTable } from 'components/tables/components/desktop';
import { ALL_LIQUIDATION_POSITIONS_LOADING_DATA } from 'components/tables/loading-preview/all-liquidation-positions';

type LiquidationPositionsWrapperProps = {
  data?: LiquidationPositionsQuery
  loading: boolean
  className?: string
};

const LiquidationPositionsWrapper: React.FC<LiquidationPositionsWrapperProps> = ({
  data,
  loading,
  className,
}) => {
  const preparedData = useMemo(() => (data && !loading ? data.user.reduce((result: any[], el) => {
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
  }, []) : []), [data, loading]);

  return (
    <LiquidatationTable
      data={loading ? ALL_LIQUIDATION_POSITIONS_LOADING_DATA : preparedData}
      loading={loading}
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

  // TODO: Delete later
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (!data || error) {
    return <></>;
  }

  return (
    <LiquidationPositionsWrapper
      data={data}
      loading={loading}
      className={className}
    />
  );
};
