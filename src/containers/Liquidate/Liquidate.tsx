/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import React, { useMemo } from 'react';
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
  const { yTokenValue } = useYToken();

  const preparedData: LiquidateUser = useMemo(() => {
    const user = data && data.user[0];
    const globalFactors = data && data.globalFactors[0];
    const preparedMaxLiquidate = new BigNumber(globalFactors?.closeFactor ?? 1)
      .div(`1e${STANDARD_PRECISION}`);

    const prepareBorrowedAssets = user ? user.borrowedAssets.map(({ asset, borrow }: any) => {
      const oraclePrice = {
        price: oraclePrices ? oraclePrices[asset.ytoken].price : new BigNumber(1),
        decimals: oraclePrices ? oraclePrices[asset.ytoken].decimals : 1,
      };
      const amountOfBorrowed = convertUnits(borrow, STANDARD_PRECISION)
        .div(oraclePrice.decimals);
      const maxLiquidate = amountOfBorrowed.times(preparedMaxLiquidate);
      const pricePerToken = oraclePrices ? +convertTokenPrice(oraclePrice.price, oraclePrice.decimals) : 1;

      return ({
        asset: {
          yToken: asset.ytoken,
          name: asset.tokens[0].name,
          symbol: asset.tokens[0].symbol,
          id: asset.tokenId,
          address: asset.contractAddress,
        },
        price: pricePerToken,
        amountOfBorrowed,
        maxLiquidate,
        maxLiquidateInUsd: maxLiquidate.times(convertTokenPrice(oraclePrice.price, oraclePrice.decimals)),
      });
    }) : [];

    const selectedBorrowToken = prepareBorrowedAssets.find(({ asset }) => asset.yToken === yTokenValue);

    const prepareCollateralAsset = user ? user.collateralAssets.map(({ asset, supply }: any) => {
      const oraclePrice = {
        price: oraclePrices ? oraclePrices[asset.ytoken].price : new BigNumber(1),
        decimals: oraclePrices ? oraclePrices[asset.ytoken].decimals : 1,
      };
      const amountOfSupplied = convertUnits(supply, STANDARD_PRECISION).div(oraclePrice.decimals);
      const pricePerToken = oraclePrices ? +convertTokenPrice(oraclePrice.price, oraclePrice.decimals) : 1;

      // Counting maxBonus
      let maxBonus: BigNumber = new BigNumber(1);

      if (selectedBorrowToken) {
        const { maxLiquidateInUsd } = selectedBorrowToken;

        // !Test formula for maxBonus
        const prepareSupply = new BigNumber(supply).div(`1e${STANDARD_PRECISION}`).div(oraclePrice.decimals);
        const tokenAmount = maxLiquidateInUsd.div(convertTokenPrice(oraclePrice.price, oraclePrice.decimals));

        const maxLiquidate = BigNumber.min(tokenAmount, prepareSupply);

        const liquidationIncentive = new BigNumber(globalFactors?.liquidationIncentive).div(`1e${STANDARD_PRECISION}`);
        maxBonus = maxLiquidate.times(liquidationIncentive.minus(1));

        // TODO: Research Sophia formuals
        // const supplyWithIncentive = prepareSupply.times(liquidationIncentive);
        // if (maxLiquidate.lt(supplyWithIncentive)) {
        //   maxBonus = maxLiquidate.times(liquidationIncentive.minus(1));
        // } else if (maxLiquidate.gt(supplyWithIncentive)) {
        //   maxBonus = prepareSupply.div(liquidationIncentive).times(liquidationIncentive.minus(1));
        // }
      }

      return {
        asset: {
          name: asset.tokens[0].name,
          symbol: asset.tokens[0].symbol,
          id: asset.tokenId,
          address: asset.contractAddress,
        },
        price: pricePerToken,
        amountOfSupplied,
        maxBonus, // TODO: Update later
      };
    }) : [];

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
  }, [data, oraclePrices, yTokenValue]);

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
