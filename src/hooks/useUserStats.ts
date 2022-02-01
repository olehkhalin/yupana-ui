import BigNumber from "bignumber.js";

import { useOraclePriceQuery } from "generated/graphql";

import { useAssets } from "./useAssets";

export const useUserStats = () => {
  const {
    data: allAssets,
    loading: allAssetsLoading,
    error: allAssetsError,
  } = useAssets();

  const {
    data: oraclePrices,
    loading: oraclePricesLoading,
    error: oraclePricesError,
  } = useOraclePriceQuery();

  if (allAssetsError || oraclePricesError) {
    return {
      data: null,
      loading: false,
      error: true,
    };
  }

  if (!allAssets || !oraclePrices) {
    return {
      data: null,
      loading: allAssetsLoading || oraclePricesLoading,
      error: false,
    };
  }

  let totalNet = new BigNumber(0);
  let totalSupplyUsd = new BigNumber(0);
  let totalBorrowUsd = new BigNumber(0);

  allAssets.assets.forEach((asset) => {
    let supplyUsdAmount = new BigNumber(0);
    let borrowUsdAmount = new BigNumber(0);

    const lastPrice = oraclePrices.oraclePrice.find(
      ({ ytoken }) => ytoken === asset.yToken
    );
    if (lastPrice) {
      supplyUsdAmount = asset.supply.multipliedBy(lastPrice.price);
      borrowUsdAmount = asset.borrowWithInterest.multipliedBy(lastPrice.price);
    }

    totalSupplyUsd = totalSupplyUsd.plus(supplyUsdAmount);
    totalBorrowUsd = totalBorrowUsd.plus(borrowUsdAmount);

    if (asset.rates) {
      const net = supplyUsdAmount
        .multipliedBy(asset.rates.supplyApy)
        .minus(borrowUsdAmount.multipliedBy(asset.rates.borrowApy));
      totalNet = totalNet.plus(net);
    }
  });

  let netApy = new BigNumber(0);
  if (totalNet.gt(0)) {
    netApy = totalNet.div(totalSupplyUsd);
  } else if (totalNet.lt(0)) {
    netApy = totalNet.div(totalBorrowUsd);
  }

  return {
    data: {
      totalSupplyUsd,
      totalBorrowUsd,
      netApy,
    },
    loading: false,
    error: false,
  };
};
