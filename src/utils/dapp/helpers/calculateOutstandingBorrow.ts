import BigNumber from "bignumber.js";

import {
  AllAssetsQuery,
  OraclePriceQuery,
  UserBorrowAssetsQuery,
} from "generated/graphql";

export const calculateOutstandingBorrow = (
  assetsData: AllAssetsQuery,
  pricesData: OraclePriceQuery,
  borrowAssetsData: UserBorrowAssetsQuery
): BigNumber => {
  if (!assetsData || !pricesData || !borrowAssetsData) {
    return new BigNumber(0);
  }
  const assets = assetsData.asset;
  const prices = pricesData.oraclePrice;
  const borrowAssets = borrowAssetsData.userBorrow.filter(
    ({ borrow }) => !new BigNumber(borrow).eq(0)
  );

  if (borrowAssets.length === 0) {
    return new BigNumber(0);
  }

  let outstandingBorrow = new BigNumber(0);
  borrowAssets.forEach((borrowAsset) => {
    const asset = assets.find(({ ytoken }) => ytoken === borrowAsset.assetId);
    if (!asset) return;

    const lastPriceObject = prices.find(
      ({ ytoken }) => ytoken === borrowAsset.assetId
    );
    if (!lastPriceObject) return;
    const lastPrice = new BigNumber(lastPriceObject.price);

    outstandingBorrow = outstandingBorrow.plus(
      new BigNumber(
        new BigNumber(borrowAsset.borrow).plus(0) // TODO: Replace with borrow.accrued_interest
      ).multipliedBy(lastPrice)
    );
  });

  return outstandingBorrow;
};
