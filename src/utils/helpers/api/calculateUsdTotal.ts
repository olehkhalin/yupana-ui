import BigNumber from "bignumber.js";

import { ORACLE_PRICE_PRECISION, STANDARD_PRECISION } from "constants/defaults";
import { AssetsResponseData } from "types/asset";
import { OraclePriceQuery } from "generated/graphql";
import { convertUnits } from "utils/helpers/amount";

const fallbackValues = {
  totalUsdSupply: new BigNumber(0),
  totalUsdBorrowed: new BigNumber(0),
};

export const calculateUsdTotal = (
  assets: AssetsResponseData,
  pricesData: OraclePriceQuery
): {
  totalUsdSupply: BigNumber;
  totalUsdBorrowed: BigNumber;
} => {
  if (!assets || assets.length === 0) {
    return fallbackValues;
  }

  const prices = pricesData.oraclePrice;

  let totalUsdSupply = new BigNumber(0);
  let totalUsdBorrowed = new BigNumber(0);

  assets.forEach((asset) => {
    const lastPrice = prices.find(({ ytoken }) => ytoken === asset.yToken);
    if (!lastPrice) return;

    totalUsdSupply = totalUsdSupply.plus(
      convertUnits(
        convertUnits(asset.totalSupply, STANDARD_PRECISION).multipliedBy(
          asset.exchangeRate
        ),
        asset.asset.decimals
      )
        .multipliedBy(convertUnits(lastPrice.price, ORACLE_PRICE_PRECISION))
        .multipliedBy(lastPrice.decimals)
    );

    totalUsdBorrowed = totalUsdBorrowed.plus(
      convertUnits(
        convertUnits(asset.totalBorrowed, STANDARD_PRECISION),
        asset.asset.decimals
      )
        .multipliedBy(convertUnits(lastPrice.price, ORACLE_PRICE_PRECISION))
        .multipliedBy(lastPrice.decimals)
    );
  });

  return {
    totalUsdSupply,
    totalUsdBorrowed,
  };
};
