import BigNumber from "bignumber.js";

import {
  AllAssetsQuery,
  OraclePriceQuery,
  UserSupplyAssetsQuery,
} from "generated/graphql";
import { STANDARD_PRECISION } from "constants/defaults";

export const calculateMaxCollateral = (
  assetsData: AllAssetsQuery,
  pricesData: OraclePriceQuery,
  supplyAssetsData: UserSupplyAssetsQuery
): BigNumber => {
  if (!assetsData || !pricesData || !supplyAssetsData) {
    return new BigNumber(0);
  }
  const assets = assetsData.asset;
  const prices = pricesData.oraclePrice;
  const supplyAssets = supplyAssetsData.userSupply.filter(
    ({ entered }) => entered
  );

  if (supplyAssets.length === 0) {
    return new BigNumber(0);
  }

  let maxCollateral = new BigNumber(0);
  supplyAssets.forEach((supplyAsset) => {
    const asset = assets.find(({ ytoken }) => ytoken === supplyAsset.assetId);
    if (!asset) return;

    const lastPriceObject = prices.find(
      ({ ytoken }) => ytoken === supplyAsset.assetId
    );
    if (!lastPriceObject) return;
    const lastPrice = new BigNumber(lastPriceObject.price);

    const assetTotal = new BigNumber(asset.totalLiquid)
      .plus(asset.totalBorrowed)
      .minus(asset.reserves);
    maxCollateral = maxCollateral.plus(
      new BigNumber(supplyAsset.supply)
        .multipliedBy(lastPrice)
        .multipliedBy(asset.collateralFactor)
        .multipliedBy(assetTotal)
        .div(asset.totalSupply)
        .div(new BigNumber(10).pow(STANDARD_PRECISION))
    );
  });

  return maxCollateral;
};
