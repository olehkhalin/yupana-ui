import BigNumber from "bignumber.js";

import { STANDARD_PRECISION } from "constants/defaults";
import { OraclePriceQuery } from "generated/graphql";
import { AssetsResponseData } from "types/asset";

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
    ({ isCollateral, supply }) =>
      isCollateral && supply.gte(new BigNumber(10).pow(STANDARD_PRECISION))
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
      supplyAsset.supplyWithInterest
        .multipliedBy(lastPrice)
        .multipliedBy(supplyAsset.collateralFactor)
        .multipliedBy(assetTotal)
        .idiv(supplyAsset.totalSupply)
    );
    liquidationCollateral = liquidationCollateral.plus(
      supplyAsset.supplyWithInterest
        .multipliedBy(lastPrice)
        .multipliedBy(supplyAsset.liquidationThreshold)
        .multipliedBy(assetTotal)
        .idiv(supplyAsset.totalSupply)
    );
  });

  return {
    maxCollateral: maxCollateral.eq(0)
      ? new BigNumber(0)
      : maxCollateral.idiv(new BigNumber(10).pow(STANDARD_PRECISION)),
    liquidationCollateral: liquidationCollateral.eq(0)
      ? new BigNumber(0)
      : liquidationCollateral.idiv(new BigNumber(10).pow(STANDARD_PRECISION)),
  };
};
