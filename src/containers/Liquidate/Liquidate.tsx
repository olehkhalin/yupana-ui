import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import cx from 'classnames';

import { LiquidationSteps } from 'containers/LiquidationSteps';
import { COLLATERAL_PRECISION, STANDARD_PRECISION } from 'constants/default';
import { LiquidateUser } from 'types/liquidate';
import { getTokenName } from 'utils/helpers/token';
import { convertUnits } from 'utils/helpers/amount';
import { Liquidate as LiquidateTableContainer } from 'components/tables/containers/Liquidate';
import { LiquidateQuery, useLiquidateQuery } from 'generated/graphql';

import s from './Liquidate.module.sass';

type LiquidateProps = {
  data: LiquidateQuery | undefined
  className?: string
};

const LiquidateInner: React.FC<LiquidateProps> = ({
  data,
  className,
}) => {
  const preparedData: LiquidateUser = useMemo(() => {
    const user = data && data.user[0];
    const globalFactors = data && data.globalFactors[0];
    const preparedMaxLiquidate = new BigNumber(globalFactors?.closeFactor ?? 1)
      .div(`1e${STANDARD_PRECISION}`);

    const prepareBorrowedAssets = user ? user.borrowedAssets.map(({ asset, borrow }: any) => {
      const amountOfBorrowed = convertUnits(borrow, STANDARD_PRECISION)
        .div(asset.tokens[0].decimals);

      const maxLiquidate = amountOfBorrowed.times(preparedMaxLiquidate);

      return ({
        asset: {
          name: asset.tokens[0].name,
          symbol: asset.tokens[0].symbol,
          id: asset.tokenId,
          address: asset.contractAddress,
        },
        price: 1,
        amountOfBorrowed,
        maxLiquidate,
      });
    }) : [];

    const prepareCollateralAsset = user ? user.collateralAssets.map(({ asset, supply }: any) => ({
      asset: {
        name: asset.tokens[0].name,
        symbol: asset.tokens[0].symbol,
        id: asset.tokenId,
        address: asset.contractAddress,
      },
      price: 1,
      amountOfSupplied: convertUnits(supply, STANDARD_PRECISION).div(asset.tokens[0].decimals),
      maxBonus: 1,
    })) : [];

    return {
      liquidate: [{
        borrowerAddress: user ? user.address : '',
        borrowedAssetsName: prepareBorrowedAssets.map(({ asset }) => getTokenName(asset)),
        collateralAssetsName: prepareCollateralAsset.map(({ asset }) => getTokenName(asset)),
        totalBorrowed: +convertUnits(user?.outstandingBorrow, COLLATERAL_PRECISION),
        healthFactor: +convertUnits(
          user?.liquidationRatio, STANDARD_PRECISION,
        ).toFixed(2),
      }],
      borrowedAssets: prepareBorrowedAssets,
      suppliedAssets: prepareCollateralAsset,
    };
  }, [data]);

  return (
    <>
      <LiquidateTableContainer
        data={preparedData.liquidate}
        className={cx(s.table, className)}
      />
      <LiquidationSteps
        data={{
          borrowedAssets: preparedData.borrowedAssets,
          suppliedAssets: preparedData.suppliedAssets,
        }}
      />
    </>
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
