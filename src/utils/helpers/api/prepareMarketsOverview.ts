import BigNumber from "bignumber.js";

import { COLLATERAL_PRECISION } from "constants/defaults";
import { convertUnits } from "utils/helpers/amount";
import { MarketOverviewQuery } from "generated/graphql";

export const prepareMarketsOverview = (
  data: MarketOverviewQuery,
  isSupply = true
) => {
  const totalAmount = convertUnits(
    data.assetAggregate.aggregate?.sum?.[
      isSupply ? "usdSupply" : "usdBorrow"
    ] ?? "0",
    COLLATERAL_PRECISION
  );

  const numberOfMembers = isSupply
    ? +(data.suppliersCount.aggregate?.count ?? "0")
    : +(data.borowersCount.aggregate?.count ?? "0");

  const volume24h =
    data.dailyStats && data.dailyStats.length
      ? convertUnits(
          data.dailyStats[0][isSupply ? "supplyVolume" : "borrowVolume"],
          COLLATERAL_PRECISION
        )
      : new BigNumber(0);

  const assets = data[isSupply ? "supplyAssets" : "borrowAssets"].map((el) => {
    const asset = {
      contractAddress: el.contractAddress,
      isFa2: el.isFa2,
      tokenId: el.tokenId,
      decimals: el.tokens[0].decimals,
      name: el.tokens[0].name,
      symbol: el.tokens[0].symbol,
      thumbnail: el.tokens[0].thumbnail,
    };
    const assetVolume24h = convertUnits(
      // @ts-ignore
      el[isSupply ? "usdSupply" : "usdBorrow"],
      COLLATERAL_PRECISION
    )
      .div(totalAmount)
      .multipliedBy(1e2);

    return {
      asset,
      volume24h: assetVolume24h,
    };
  });

  return {
    totalAmount,
    volume24h,
    numberOfMembers,
    assets,
  };
};
