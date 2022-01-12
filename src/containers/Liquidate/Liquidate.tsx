/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import React, { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import cx from 'classnames';

import { useYToken, YTokenProvider } from 'providers/YTokenProvider';
import { useOraclePrices } from 'providers/OraclePricesProvider';
import { LiquidationSteps } from 'containers/LiquidationSteps';
import { COLLATERAL_PRECISION, STANDARD_PRECISION } from 'constants/default';
import { LiquidateUser, YToken } from 'types/liquidate';
import { TokenMetadataInterface } from 'types/token';
import { convertTokenPrice } from 'utils/helpers/amount/convertTokenPrice';
import { getTokenName } from 'utils/helpers/token';
import { convertUnits } from 'utils/helpers/amount';
import { Liquidate as LiquidateTableContainer } from 'components/tables/containers/Liquidate';
import { LiquidateQuery, useLiquidateQuery } from 'generated/graphql';

import s from './Liquidate.module.sass';

export type LiquidateStep = {
  borrowAsset: TokenMetadataInterface & YToken
  collateralAsset: TokenMetadataInterface & YToken
  amountToClose: BigNumber
  liquidationIncentive: BigNumber
  borrowAssetPrice: number
  collateralAssetPrice: number
};

type LiquidateProps = {
  data: LiquidateQuery | undefined
  className?: string
};

const LiquidateInner: React.FC<LiquidateProps> = ({
  data,
  className,
}) => {
  const { oraclePrices } = useOraclePrices();
  const { borrowYToken, collateralYToken } = useYToken();
  const [maxLiquidatePlusBonus, setMaxLiquidatePlusBonus] = useState<BigNumber | null>(null);
  const [liquidationStepData, setLiquidationStepData] = useState<LiquidateStep | null>(null);

  // Token prices in USD by Selected token in tables
  const borrowTokenOracle = useMemo(() => (
    oraclePrices && borrowYToken?.toString()
      ? {
        price: convertTokenPrice(oraclePrices[borrowYToken].price, oraclePrices[borrowYToken].decimals),
        decimals: oraclePrices[borrowYToken].decimals,
      }
      : undefined
  ), [borrowYToken, oraclePrices]);

  const collateralTokenOracle = useMemo(() => (
    oraclePrices && collateralYToken?.toString()
      ? {
        price: convertTokenPrice(oraclePrices[collateralYToken].price, oraclePrices[collateralYToken].decimals),
        decimals: oraclePrices[collateralYToken].decimals,
      }
      : undefined
  ), [collateralYToken, oraclePrices]);

  // Global data
  const user = data && data.user[0];
  const globalFactors = data && data.globalFactors[0];
  const liquidationIncentive = useMemo(
    () => new BigNumber(globalFactors?.liquidationIncentive).div(`1e${STANDARD_PRECISION}`), // 1.05
    [globalFactors?.liquidationIncentive],
  );

  // Prepare borrowed assets
  const prepareBorrowedAssets = useMemo(() => {
    const preparedMaxLiquidate = globalFactors ? new BigNumber(globalFactors.closeFactor)
      .div(`1e${STANDARD_PRECISION}`) : 1;

    if (user) {
      return user.borrowedAssets.map(({ asset, borrow }: any) => {
        // Get token price
        const { price, decimals } = {
          price: oraclePrices ? oraclePrices[asset.ytoken].price : new BigNumber(1),
          decimals: oraclePrices ? oraclePrices[asset.ytoken].decimals : 1,
        };
        const tokenPriceInUsd = +convertTokenPrice(price, decimals);

        // Values in a token
        const amountOfBorrowed = convertUnits(borrow, STANDARD_PRECISION)
          .div(decimals);
        const maxLiquidate = amountOfBorrowed.times(preparedMaxLiquidate);

        return ({
          asset: {
            yToken: asset.ytoken,
            name: asset.tokens[0].name,
            symbol: asset.tokens[0].symbol,
            id: asset.tokenId,
            address: asset.contractAddress,
            decimals: asset.tokens[0].decimals,
          },
          price: tokenPriceInUsd,
          amountOfBorrowed,
          maxLiquidate,
          maxLiquidateInUsd: maxLiquidate.times(tokenPriceInUsd),
        });
      });
    }
    return [];
  }, [globalFactors, oraclePrices, user]);

  // Find selected borrow token
  const selectedBorrowToken = useMemo(
    () => prepareBorrowedAssets.find(({ asset }) => asset.yToken === borrowYToken),
    [borrowYToken, prepareBorrowedAssets],
  );

  // Prepare collateral assets
  const prepareCollateralAsset = useMemo(() => {
    if (user) {
      return user.collateralAssets.map(({ asset, supply }: any) => {
        // Get token price
        const { price, decimals } = {
          price: oraclePrices ? oraclePrices[asset.ytoken].price : new BigNumber(1),
          decimals: oraclePrices ? oraclePrices[asset.ytoken].decimals : 1,
        };
        const tokenPriceInUsd = +convertTokenPrice(price, decimals);

        const amountOfSupplied = convertUnits(supply, STANDARD_PRECISION).div(decimals); // value in a token

        let maxBonus: BigNumber = new BigNumber(1); // value in a token
        if (selectedBorrowToken) {
          const { maxLiquidateInUsd } = selectedBorrowToken;
          const prepareSupply = new BigNumber(supply).div(`1e${STANDARD_PRECISION}`).div(decimals); // value in a token
          const borrowTokenAmount = maxLiquidateInUsd.div(tokenPriceInUsd); // value in a token

          // Counting maxBonus
          const maxLiquidate = BigNumber.min(borrowTokenAmount, prepareSupply); // value in a token
          maxBonus = maxLiquidate.times(liquidationIncentive.minus(1)); // maxLiquidate * 0.05
          setMaxLiquidatePlusBonus(maxLiquidate.times(liquidationIncentive)); // maxLiquidate * 1.05
        }

        return {
          asset: {
            yToken: asset.ytoken,
            name: asset.tokens[0].name,
            symbol: asset.tokens[0].symbol,
            id: asset.tokenId,
            address: asset.contractAddress,
            decimals: asset.tokens[0].decimals,
          },
          price: tokenPriceInUsd,
          amountOfSupplied,
          maxBonus,
        };
      });
    }
    return [];
  }, [liquidationIncentive, oraclePrices, selectedBorrowToken, user]);

  // Set data for liquidation step (step 3)
  useEffect(() => {
    if (maxLiquidatePlusBonus && collateralTokenOracle && borrowTokenOracle) {
      const amountToClose = maxLiquidatePlusBonus
        .times(collateralTokenOracle.price)
        .div(collateralTokenOracle.decimals)
        .div(borrowTokenOracle.price)
        .times(borrowTokenOracle.decimals);

      const selectBorrowYToken = prepareBorrowedAssets.find(({ asset }) => asset.yToken === borrowYToken);
      const selectCollateralYToken = prepareBorrowedAssets.find(({ asset }) => asset.yToken === collateralYToken);
      if (selectBorrowYToken && selectCollateralYToken) {
        const { asset: borrowAsset, price: borrowAssetPrice } = selectBorrowYToken;
        const { asset: collateralAsset, price: collateralAssetPrice } = selectCollateralYToken;
        setLiquidationStepData({
          borrowAsset,
          collateralAsset,
          amountToClose,
          liquidationIncentive,
          borrowAssetPrice,
          collateralAssetPrice,
        });
      }
    }
  }, [borrowTokenOracle, borrowYToken, collateralTokenOracle, collateralYToken, liquidationIncentive, maxLiquidatePlusBonus, prepareBorrowedAssets]);

  // Prepare all data for tables
  const { liquidate, borrowedAssets, collateralAssets }: LiquidateUser = useMemo(() => ({
    liquidate: [{
      borrowerAddress: user ? user.address : '',
      borrowedAssetsName: prepareBorrowedAssets.map(({ asset }) => getTokenName(asset)),
      collateralAssetsName: prepareCollateralAsset.map(({ asset }) => getTokenName(asset)),
      totalBorrowed: user ? +convertUnits(user.outstandingBorrow, COLLATERAL_PRECISION) : 1,
      healthFactor: user ? +convertUnits(
        user.liquidationRatio, STANDARD_PRECISION,
      ).toFixed(2) : 1,
    }],
    borrowedAssets: prepareBorrowedAssets,
    collateralAssets: prepareCollateralAsset,
  }), [prepareBorrowedAssets, prepareCollateralAsset, user]);

  // DEBUG
  useEffect(() => {
    console.log(JSON.stringify(liquidationStepData, null, 2));
  }, [liquidationStepData]);

  return (
    <>
      <LiquidateTableContainer
        data={liquidate}
        className={cx(s.table, className)}
      />
      <LiquidationSteps
        data={{
          borrowedAssets,
          collateralAssets,
          liquidate: liquidationStepData,
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
    <YTokenProvider>
      <LiquidateInner
        data={data}
      />
    </YTokenProvider>
  );
};
