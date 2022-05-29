import BigNumber from "bignumber.js";

import { ORACLE_PRICE_PRECISION, STANDARD_PRECISION } from "constants/defaults";
import {
  OraclePriceQuery,
  useLiquidateQuery,
  useOraclePriceQuery,
} from "generated/graphql";
import { LiquidateDetailsResponse } from "types/liquidate-details";
import { convertUnits } from "utils/helpers/amount";

import { useAssetsMetadata } from "./useAssetsMetadata";

const preparePrice = (yToken: number, oraclePrices: OraclePriceQuery) => {
  const lastPrice = oraclePrices.oraclePrice.find(
    ({ ytoken }) => ytoken === yToken
  ) ?? {
    price: 0,
    decimals: 0,
  };
  return convertUnits(lastPrice.price, ORACLE_PRICE_PRECISION);
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
    data: assetsMetadata,
    loading: assetsMetadataLoading,
    error: assetsMetadataError,
  } = useAssetsMetadata();

  const {
    data: oraclePrices,
    loading: oraclePricesLoading,
    error: oraclePricesError,
  } = useOraclePriceQuery();

  if (!liquidateInfo || !oraclePrices || !assetsMetadata) {
    return {
      data: null,
      loading:
        liquidateInfoLoading || oraclePricesLoading || assetsMetadataLoading,
      error:
        !!liquidateInfoError || !!oraclePricesError || !!assetsMetadataError,
    };
  }

  if (!(liquidateInfo.user.length > 0) || !liquidateInfo.user[0]) {
    return {
      data: null,
      loading: false,
      error: true,
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
      const metadata = assetsMetadata.find(
        ({ contractAddress }) => contractAddress === asset.contractAddress
      )!;

      const price = preparePrice(asset.ytoken, oraclePrices);

      totalBorrowUsd = totalBorrowUsd.plus(
        convertUnits(
          convertUnits(borrow, STANDARD_PRECISION),
          metadata.decimals
        ).multipliedBy(price)
      );

      const amountOfBorrowed = convertUnits(borrow, STANDARD_PRECISION);
      const maxLiquidate = amountOfBorrowed.multipliedBy(closeFactor);

      return {
        yToken: asset.ytoken,
        asset: metadata,
        price,
        amountOfBorrowed,
        maxLiquidate,
      };
    }
  );

  const preparedColateralAssets = user.collateralAssets.map(
    ({ asset, supply }) => {
      const metadata = assetsMetadata.find(
        ({ contractAddress }) => contractAddress === asset.contractAddress
      )!;

      const price = preparePrice(asset.ytoken, oraclePrices);
      const amountOfSupplied = convertUnits(supply, STANDARD_PRECISION);

      return {
        yToken: asset.ytoken,
        asset: metadata,
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
