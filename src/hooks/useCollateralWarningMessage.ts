import { useMemo } from "react";
import BigNumber from "bignumber.js";

import { convertUnits } from "utils/helpers/amount";
import {
  COLLATERAL_PRECISION,
  ORACLE_PRICE_PRECISION,
  STANDARD_PRECISION,
} from "constants/defaults";
import { useOraclePriceQuery } from "generated/graphql";

import { useAssets } from "./useAssets";
import { useUserStats } from "./useUserStats";

export const useCollateralWarningMessage = (
  yToken: number,
  isCollateral: boolean
) => {
  const { data } = useAssets();
  const { data: oraclePrice } = useOraclePriceQuery();
  const { data: userStats } = useUserStats();

  const userTotalBorrow = useMemo(
    () =>
      userStats
        ? convertUnits(
            userStats.totalBorrowUsd,
            COLLATERAL_PRECISION
          ).decimalPlaces(2)
        : new BigNumber(0),
    [userStats]
  );

  if (!isCollateral) {
    return "";
  }

  if (data && data.supplyAssets && data.supplyAssets.length) {
    const supplyWithCollateral = data.supplyAssets.filter(
      (el) => el.isCollateral
    );

    if (!supplyWithCollateral.length) {
      return "";
    }

    const withoutCurrentToken = supplyWithCollateral.filter(
      (el) => el.yToken !== yToken
    );

    if (
      supplyWithCollateral.length === 1 &&
      !withoutCurrentToken.length &&
      isCollateral &&
      userTotalBorrow.gt(0)
    ) {
      return "Asset cover the borrow. You can't disable the collateral.";
    }

    const commonCollateralOfOtherAssets = withoutCurrentToken.reduce(
      (acc, currentAsset) => {
        const oracleData = oraclePrice?.oraclePrice.find(
          (asset) => asset.ytoken === currentAsset.yToken
        ) ?? {
          price: new BigNumber(0),
          precision: 0,
        };

        const price = convertUnits(
          convertUnits(currentAsset.supply, STANDARD_PRECISION),
          currentAsset.asset.decimals
        )
          .multipliedBy(
            convertUnits(oracleData.price, ORACLE_PRICE_PRECISION).multipliedBy(
              oracleData.precision
            )
          )
          .multipliedBy(
            convertUnits(currentAsset.collateralFactor, STANDARD_PRECISION)
          );

        return acc.plus(price);
      },
      new BigNumber(0)
    );

    const otherAssetsCanCoverTheBorrow =
      commonCollateralOfOtherAssets.gte(userTotalBorrow);

    return !otherAssetsCanCoverTheBorrow
      ? "On the current asset you can't disable the collateral. Other assets can't cover the borrow."
      : "";
  }

  return "";
};
