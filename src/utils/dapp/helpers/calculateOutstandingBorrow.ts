import BigNumber from "bignumber.js";

import { OraclePriceQuery } from "generated/graphql";
import { AssetsResponseData } from "types/asset";

export const calculateOutstandingBorrow = (
  borrowAssets: AssetsResponseData,
  pricesData: OraclePriceQuery
): BigNumber => {
  if (!borrowAssets || borrowAssets.length === 0) {
    return new BigNumber(0);
  }
  const prices = pricesData.oraclePrice;
  const borrowAssetsFiltered = borrowAssets.filter(
    ({ borrow }) => !new BigNumber(borrow).eq(0)
  );

  if (borrowAssetsFiltered.length === 0) {
    return new BigNumber(0);
  }

  let outstandingBorrow = new BigNumber(0);
  borrowAssetsFiltered.forEach((borrowAsset) => {
    const lastPriceObject = prices.find(
      ({ ytoken }) => ytoken === borrowAsset.yToken
    );
    if (!lastPriceObject) return;
    const lastPrice = new BigNumber(lastPriceObject.price);

    outstandingBorrow = outstandingBorrow.plus(
      borrowAsset.borrowWithInterest.multipliedBy(lastPrice)
    );
  });

  return outstandingBorrow;
};
