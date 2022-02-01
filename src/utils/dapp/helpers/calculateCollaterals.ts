import BigNumber from "bignumber.js";

import { OraclePriceQuery } from "generated/graphql";
import { AssetsResponseData } from "types/asset";
import { STANDARD_PRECISION } from "constants/defaults";

type CalculateCollateralsResponse = {
  maxCollateral: BigNumber;
  liquidationCollateral: BigNumber;
};

const calculateCollateralsFallback = {
  maxCollateral: new BigNumber(0),
  liquidationCollateral: new BigNumber(0),
};

export const calculateCollaterals = (
  supplyAssets: AssetsResponseData,
  pricesData: OraclePriceQuery
): CalculateCollateralsResponse => {
  if (!supplyAssets || supplyAssets.length === 0) {
    return calculateCollateralsFallback;
  }
  const prices = pricesData.oraclePrice;
  const supplyAssetsFiltered = supplyAssets.filter(
    ({ isCollateral }) => isCollateral
  );

  if (supplyAssetsFiltered.length === 0) {
    return calculateCollateralsFallback;
  }

  let maxCollateral = new BigNumber(0);
  let liquidationCollateral = new BigNumber(0);
  supplyAssetsFiltered.forEach((supplyAsset) => {
    const lastPriceObject = prices.find(
      ({ ytoken }) => ytoken === supplyAsset.yToken
    );
    if (!lastPriceObject) return;
    const lastPrice = new BigNumber(lastPriceObject.price);

    const assetTotal = supplyAsset.totalLiquid
      .plus(supplyAsset.totalBorrowed)
      .minus(supplyAsset.reserves);
    maxCollateral = maxCollateral.plus(
      supplyAsset.supply
        .multipliedBy(lastPrice)
        .multipliedBy(supplyAsset.collateralFactor)
        .multipliedBy(assetTotal)
        .div(supplyAsset.totalSupply)
    );
    liquidationCollateral = liquidationCollateral.plus(
      supplyAsset.supply
        .multipliedBy(lastPrice)
        .multipliedBy(supplyAsset.liquidationThreshold)
        .multipliedBy(assetTotal)
        .div(supplyAsset.totalSupply)
    );
  });

  return {
    maxCollateral: maxCollateral.eq(0)
      ? new BigNumber(0)
      : maxCollateral.div(new BigNumber(10).pow(STANDARD_PRECISION)),
    liquidationCollateral: liquidationCollateral.eq(0)
      ? new BigNumber(0)
      : liquidationCollateral.div(new BigNumber(10).pow(STANDARD_PRECISION)),
  };
};
