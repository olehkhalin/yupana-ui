import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { COLLATERAL_PRECISION, STANDARD_PRECISION } from 'constants/default';
import { convertUnits } from 'utils/helpers/amount';
import { getTokenName } from 'utils/helpers/token';
import { Liquidate as LiquidateTableContainer } from 'components/tables/containers/Liquidate';
import { LiquidateQuery, useLiquidateQuery } from 'generated/graphql';

type LiquidateProps = {
  data: LiquidateQuery | undefined
  className?: string
};

type UserData = {
  borrowedAsset: string[]
  collateralAsset: string[]
  borrowerAddress: string
  totalBorrowed: number
  healthFactor: number
};

const LiquidateInner: React.FC<LiquidateProps> = ({
  data,
  className,
}) => {
  const preparedData: UserData[] = useMemo(() => {
    const user = data && data.user[0];

    return user ? [{
      borrowedAsset: user.borrowedAssets.map(({ asset }: any) => getTokenName({
        name: asset.tokens[0].name,
        symbol: asset.tokens[0].symbol,
        id: asset.tokenId,
        address: asset.contractAddress,
      })),
      collateralAsset: user.collateralAssets.map(({ asset }: any) => getTokenName({
        name: asset.tokens[0].name,
        symbol: asset.tokens[0].symbol,
        id: asset.tokenId,
        address: asset.contractAddress,
      })),
      borrowerAddress: user.address,
      totalBorrowed: +convertUnits(user.outstandingBorrow, COLLATERAL_PRECISION),
      healthFactor: +convertUnits(
        user.liquidationRatio, STANDARD_PRECISION,
      ).toFixed(2),
    }] : [];
  }, [data]);

  return (
    <LiquidateTableContainer
      data={preparedData}
      className={className}
    />
  );
};

export const Liquidate: React.FC = () => {
  const { borrower }: { borrower: string } = useParams();

  const { data, error } = useLiquidateQuery({
    variables: {
      address: borrower,
    },
  });

  if (!data || error) {
    return <></>;
  }

  return (
    <LiquidateInner
      data={data}
    />
  );
};
