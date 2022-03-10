import { useMemo } from "react";
import BigNumber from "bignumber.js";

import { AssetType } from "types/asset";
import { COLLATERAL_PRECISION, STANDARD_PRECISION } from "constants/defaults";
import { convertUnits } from "utils/helpers/amount";

import { useUserStats } from "./useUserStats";
import { useAssets } from "./useAssets";
import { CreditProcessModalEnum } from "./useCreditProcessModal";

export const useBorrowWarningMessage = (
  asset: AssetType,
  type?: CreditProcessModalEnum
) => {
  const { data } = useAssets();
  const { data: userStats } = useUserStats();

  const userTotalSupply = useMemo(
    () =>
      userStats
        ? convertUnits(
            userStats.totalSupplyUsd,
            COLLATERAL_PRECISION
          ).decimalPlaces(asset.decimals)
        : new BigNumber(0),
    [asset.decimals, userStats]
  );

  const isCollateralExist = useMemo(
    () => data?.assets.some((asset) => asset.isCollateral),
    [data?.assets]
  );

  const everySuppliedAssetWithoutCollateral = useMemo(
    () =>
      data?.supplyAssets
        .filter(({ supply }) =>
          supply.gte(new BigNumber(10).pow(STANDARD_PRECISION))
        )
        .every((asset) => !asset.isCollateral) ?? false,
    [data?.supplyAssets]
  );

  return useMemo(() => {
    const isBorrowModal = type === CreditProcessModalEnum.BORROW;
    if (isBorrowModal) {
      if (userTotalSupply.lte(0)) {
        return "Please, supply some asset to borrow.";
      }
      if (
        (isBorrowModal &&
          isCollateralExist &&
          everySuppliedAssetWithoutCollateral) ||
        everySuppliedAssetWithoutCollateral ||
        (isBorrowModal && !isCollateralExist && userTotalSupply.lte(0))
      ) {
        return "Please, enable collateral to borrow.";
      }
    }

    return undefined;
  }, [
    isCollateralExist,
    everySuppliedAssetWithoutCollateral,
    type,
    userTotalSupply,
  ]);
};
