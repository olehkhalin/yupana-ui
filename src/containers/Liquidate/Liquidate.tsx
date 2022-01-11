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
import { LiquidateUser } from 'types/liquidate';
import { convertTokenPrice } from 'utils/helpers/amount/convertTokenPrice';
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
  const { oraclePrices } = useOraclePrices();
  const { borrowYToken, collateralYToken } = useYToken();
  const [maxLiquidatePlusBonus, setMaxLiquidatePlusBonus] = useState<BigNumber | null>(null);
  const [stepThreeData, setStepThreeData] = useState<any>(null);

  // Token prices in USD by Selected token in tables
  const borrowTokenPrice = useMemo(() => (
    oraclePrices && borrowYToken?.toString()
      ? convertTokenPrice(oraclePrices[borrowYToken].price, oraclePrices[borrowYToken].decimals)
      : undefined
  ), [borrowYToken, oraclePrices]);

  const collateralTokenPrice = useMemo(() => (
    oraclePrices && collateralYToken?.toString()
      ? convertTokenPrice(oraclePrices[collateralYToken].price, oraclePrices[collateralYToken].decimals)
      : undefined
  ), [collateralYToken, oraclePrices]);

  // Global data
  const user = data && data.user[0];
  const globalFactors = data && data.globalFactors[0];

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
          const liquidationIncentive = new BigNumber(globalFactors?.liquidationIncentive).div(`1e${STANDARD_PRECISION}`); // 1.05
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
          },
          price: tokenPriceInUsd,
          amountOfSupplied,
          maxBonus,
        };
      });
    }
    return [];
  }, [globalFactors?.liquidationIncentive, oraclePrices, selectedBorrowToken, user]);

  // Set data for step 3
  useEffect(() => {
    if (maxLiquidatePlusBonus && collateralTokenPrice && borrowTokenPrice) {
      const amountToClose = maxLiquidatePlusBonus.times(collateralTokenPrice).div(borrowTokenPrice);
      setStepThreeData({
        amountToClose,
        ...prepareBorrowedAssets.find(({ asset }) => asset.yToken === borrowYToken),
      });
    }
  }, [borrowTokenPrice, borrowYToken, collateralTokenPrice, maxLiquidatePlusBonus, prepareBorrowedAssets]);

  // Prepare all data
  const preparedData: LiquidateUser = useMemo(() => ({
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
    suppliedAssets: prepareCollateralAsset,
  }), [prepareBorrowedAssets, prepareCollateralAsset, user]);

  // DEBUG
  useEffect(() => {
    console.log(JSON.stringify(stepThreeData, null, 2));
  }, [stepThreeData]);

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
    <YTokenProvider>
      <LiquidateInner
        data={data}
      />
    </YTokenProvider>
  );
};
