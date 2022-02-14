import BigNumber from "bignumber.js";

import { ORACLE_PRICE_PRECISION, STANDARD_PRECISION } from "constants/defaults";
import {
  OraclePriceQuery,
  useLiquidateQuery,
  useOraclePriceQuery,
} from "generated/graphql";
import { LiquidateDetailsResponse } from "types/liquidate-details";
import { convertUnits } from "utils/helpers/amount";

const prepareAsset = (
  asset: {
    __typename?: "asset";
    ytoken: number;
    contractAddress: string;
    isFa2: boolean;
    tokenId: number;
    tokens: Array<{
      __typename?: "token";
      name?: string | null | undefined;
      symbol?: string | null | undefined;
      thumbnail?: string | null | undefined;
      decimals: number;
    }>;
  },
  oraclePrices: OraclePriceQuery
) => {
  const assetInner = {
    contractAddress: asset.contractAddress,
    isFa2: asset.isFa2,
    tokenId: asset.isFa2 ? asset.tokenId : undefined,
    decimals: asset.tokens[0].decimals,
    name: asset.tokens[0].name,
    symbol: asset.tokens[0].symbol,
    thumbnail: asset.tokens[0].thumbnail,
  };
  const lastPrice = oraclePrices.oraclePrice.find(
    ({ ytoken }) => ytoken === asset.ytoken
  ) ?? {
    price: 0,
    decimals: 0,
  };
  const price = convertUnits(
    lastPrice.price,
    ORACLE_PRICE_PRECISION
  ).multipliedBy(lastPrice.decimals);
  return {
    asset: assetInner,
    price,
  };
};

export const useLiquidateDetails = (
  borrower: string
): LiquidateDetailsResponse => {
  const {
    data: liquidateInfo,
    loading: liquidateInfoLoading,
    error: liquidateInfoError,
  } = useLiquidateQuery({
    variables: {
      address: borrower,
    },
  });

  const {
    data: oraclePrices,
    loading: oraclePricesLoading,
    error: oraclePricesError,
  } = useOraclePriceQuery();

  if (!liquidateInfo || !liquidateInfo.user[0] || !oraclePrices) {
    return {
      data: null,
      loading: liquidateInfoLoading || oraclePricesLoading,
      error: !!liquidateInfoError || !!oraclePricesError,
    };
  }

  const user = liquidateInfo.user[0];

  const borrowerAddress = user.address;

  let totalBorrowUsd = new BigNumber(0);

  const healthFactor = new BigNumber(1)
    .div(convertUnits(user.liquidationRatio, STANDARD_PRECISION))
    .multipliedBy(1e2);

  const closeFactor = convertUnits(
    liquidateInfo.globalFactors[0].closeFactor,
    STANDARD_PRECISION
  );

  const liquidationIncentive = convertUnits(
    liquidateInfo.globalFactors[0].liquidationIncentive,
    STANDARD_PRECISION
  );

  const preparedBorrowedAssets = user.borrowedAssets.map(
    ({ asset, borrow }) => {
      const { asset: assetInner, price } = prepareAsset(asset, oraclePrices);

      totalBorrowUsd = totalBorrowUsd.plus(
        convertUnits(
          convertUnits(borrow, STANDARD_PRECISION),
          assetInner.decimals
        ).multipliedBy(price)
      );

      const amountOfBorrowed = convertUnits(borrow, STANDARD_PRECISION);
      const maxLiquidate = amountOfBorrowed.multipliedBy(closeFactor);

      return {
        yToken: asset.ytoken,
        asset: assetInner,
        price,
        amountOfBorrowed,
        maxLiquidate,
      };
    }
  );

  const preparedColateralAssets = user.collateralAssets.map(
    ({ asset, supply }) => {
      const { asset: assetInner, price } = prepareAsset(asset, oraclePrices);
      const amountOfSupplied = convertUnits(supply, STANDARD_PRECISION);
      return {
        yToken: asset.ytoken,
        asset: assetInner,
        price,
        amountOfSupplied,
      };
    }
  );

  return {
    data: {
      borrowerAddress,
      totalBorrowUsd,
      healthFactor,
      borrowedAssets: preparedBorrowedAssets,
      collateralAssets: preparedColateralAssets,
      liquidationIncentive,
    },
    loading: false,
    error: false,
  };
};
