import BigNumber from "bignumber.js";

import { ORACLE_PRICE_PRECISION, STANDARD_PRECISION } from "constants/defaults";
import { MarketsDetailsQuery } from "generated/graphql";
import { convertUnits } from "utils/helpers/amount";
import { AssetType } from "../../../types/asset";

const convertFromSecsToYear = (amount: BigNumber.Value) =>
  new BigNumber(amount).multipliedBy(60 * 60 * 24 * 365);

export const prepareMarketsDetails = (
  data: MarketsDetailsQuery,
  assetsMetadata: AssetType[],
  exchangeRate: BigNumber
) => {
  // Token details
  const el = data.asset[0];

  const asset = assetsMetadata.find(
    ({ contractAddress, tokenId }) =>
      contractAddress === el.contractAddress &&
      (el.isFa2 ? tokenId === el.tokenId : true)
  )!;

  const yAsset = {
    contractAddress: el.contractAddress,
    isFa2: el.isFa2,
    tokenId: el.tokenId,
    decimals: el.tokens[0].decimals,
    name: el.tokens[0].name,
    symbol: el.tokens[0].symbol,
    thumbnail: el.tokens[0].thumbnail,
  };
  const price = convertUnits(
    data.oraclePrice[0].price,
    ORACLE_PRICE_PRECISION
  ).multipliedBy(data.oraclePrice[0].precision);
  const totalSupply = convertUnits(
    convertUnits(el.totalSupply, STANDARD_PRECISION).multipliedBy(exchangeRate),
    asset.decimals,
    true
  ).multipliedBy(price);
  const supplyApy = convertUnits(
    el.rates[0].supply_apy,
    STANDARD_PRECISION
  ).multipliedBy(1e2);
  const numberOfSupplier = el.suppliersCount.aggregate?.count ?? 0;
  const totalBorrow = convertUnits(
    convertUnits(el.totalBorrowed, STANDARD_PRECISION),
    asset.decimals,
    true
  );
  const borrowApy = convertUnits(
    el.rates[0].borrow_apy,
    STANDARD_PRECISION
  ).multipliedBy(1e2);
  const numberOfBorrowers = el.borrowersCount.aggregate?.count ?? 0;

  // Market details
  const availableLiquidity = convertUnits(
    convertUnits(el.totalLiquid, STANDARD_PRECISION),
    asset.decimals,
    true
  );
  const utilisationRate = convertUnits(
    el.rates[0].utilization_rate,
    STANDARD_PRECISION
  ).multipliedBy(1e2);
  const collateralFactor = convertUnits(
    el.collateralFactor,
    STANDARD_PRECISION
  ).multipliedBy(1e2);
  const liquidationThreshold = convertUnits(
    el.liquidationThreshold,
    STANDARD_PRECISION
  ).multipliedBy(1e2);
  const liquidationBonus = convertUnits(
    data!.globalFactors[0].liquidationIncentive,
    STANDARD_PRECISION
  )
    .minus(1)
    .multipliedBy(100);
  const reserves = convertUnits(
    convertUnits(el.reserves, STANDARD_PRECISION),
    asset.decimals,
    true
  ).multipliedBy(price);
  const reserveFactor = convertUnits(
    el.reserveFactor,
    STANDARD_PRECISION
  ).multipliedBy(1e2);

  // Interest rate model
  const baseRatePerYear = convertUnits(
    convertFromSecsToYear(el.interestModel.rate),
    STANDARD_PRECISION
  ).multipliedBy(1e2);
  const multiplierPerYear = convertUnits(
    convertFromSecsToYear(el.interestModel.multiplier),
    STANDARD_PRECISION
  );
  const jumpMultiplierPerYear = convertUnits(
    convertFromSecsToYear(el.interestModel.jumpMultiplier),
    STANDARD_PRECISION
  );
  const kink = convertUnits(
    el.interestModel.kink,
    STANDARD_PRECISION
  ).multipliedBy(1e2);

  const chartSupply = el.possibleApys[0].supplyApys.map(
    (apy: string, i: number) => ({
      x: i,
      y: +convertUnits(apy, STANDARD_PRECISION).multipliedBy(1e2),
    })
  );
  const chartBorrow = el.possibleApys[0].borrowApys.map(
    (apy: string, i: number) => ({
      x: i,
      y: +convertUnits(apy, STANDARD_PRECISION).multipliedBy(1e2),
    })
  );

  const maxFromData = Math.max(
    chartSupply[chartSupply.length - 1].y,
    chartBorrow[chartBorrow.length - 1].y
  );

  const finalUtilRate =
    maxFromData > 70
      ? maxFromData > 100
        ? +(maxFromData / 1e2).toFixed(0) * 100 + 100
        : 100
      : 70;

  const chartUtilizationRate = Array.from({ length: 101 }, (_, i) => ({
    x: i,
    y: finalUtilRate,
  }));

  const chartData = [
    {
      label: "Borrow APY",
      data: chartBorrow,
    },
    {
      label: "Supply APY",
      data: chartSupply,
    },
    {
      label: "Utilization rate",
      data: chartUtilizationRate,
    },
  ];

  console.log("chartData", chartData);

  return {
    asset,
    yAsset,
    price,
    tokenDetails: [
      {
        yToken: el.ytoken,
        totalSupply,
        supplyApy,
        numberOfSupplier,
        totalBorrow: totalBorrow.multipliedBy(price),
        borrowApy,
        numberOfBorrowers,
      },
    ],
    marketDetails: {
      availableLiquidity,
      totalBorrow,
      utilisationRate,
      collateralFactor,
      liquidationThreshold,
      liquidationBonus,
      reserves,
      reserveFactor,
      minted: totalSupply,
      exchangeRate: exchangeRate.decimalPlaces(
        asset.decimals,
        BigNumber.ROUND_DOWN
      ),
    },
    interestRateModel: {
      currentUtilizationRate: utilisationRate,
      baseRatePerYear,
      multiplierPerYear,
      jumpMultiplierPerYear,
      kink,
      chartData,
    },
  };
};
