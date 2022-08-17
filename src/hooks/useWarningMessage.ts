import { useMemo } from "react";
import BigNumber from "bignumber.js";

import {
  COLLATERAL_PRECISION,
  ORACLE_PRICE_PRECISION,
  STANDARD_PRECISION,
} from "constants/defaults";
import { useOraclePriceQuery } from "generated/graphql";
import { AssetType } from "types/asset";
import { convertUnits } from "utils/helpers/amount";

import { CreditProcessModalEnum } from "./useCreditProcessModal";
import { useAssets } from "./useAssets";
import { useUserStats } from "./useUserStats";

export const useWarningMessage = ({
  type,
  dynamicBorrowLimitUsed,
  amount,
  asset,
  maxAmount,
  yToken,
  isCollateral,
}: {
  type: CreditProcessModalEnum | undefined;
  dynamicBorrowLimitUsed: BigNumber;
  asset: AssetType;
  amount: BigNumber;
  maxAmount: BigNumber;
  yToken?: number;
  isCollateral?: boolean;
}) => {
  const warnings = [];

  if (
    type === CreditProcessModalEnum.BORROW &&
    dynamicBorrowLimitUsed.gte(80)
  ) {
    warnings.push("Beware of the Liquidation Risk");
  }

  const mutezAmount = new BigNumber(convertUnits(amount, -asset.decimals));
  const isMaxAmount = mutezAmount.eq(
    maxAmount.decimalPlaces(0, BigNumber.ROUND_DOWN)
  );
  if (type === CreditProcessModalEnum.BORROW && isMaxAmount) {
    warnings.push(
      "Due to the complexity of calculations, MAX Borrow feature may produce an invalid result. In that case, set a slightly lower value."
    );
  }

  const { data: assets } = useAssets();
  const { data: oraclePrices } = useOraclePriceQuery();
  const { data: userStats } = useUserStats();

  const userTotalBorrow = useMemo(() => {
    if (type !== CreditProcessModalEnum.WITHDRAW) {
      return new BigNumber(0);
    }

    return userStats
      ? convertUnits(
          userStats.totalBorrowUsd,
          COLLATERAL_PRECISION
        ).decimalPlaces(2)
      : new BigNumber(0);
  }, [type, userStats]);

  const isEnoughOtherSupply = useMemo(() => {
    if (type !== CreditProcessModalEnum.WITHDRAW) {
      return false;
    }
    const commonCollateralOfOtherAssets = assets
      ? assets.supplyAssets
          .filter((el) => el.isCollateral)
          .filter((el) => el.yToken !== yToken)
          .reduce((acc, currentAsset) => {
            const oracleData = oraclePrices?.oraclePrice.find(
              (asset) => asset.ytoken === currentAsset.yToken
            ) ?? {
              price: new BigNumber(0),
              precision: 0,
            };

            const price = convertUnits(
              convertUnits(currentAsset.supplyWithInterest, STANDARD_PRECISION),
              currentAsset.asset.decimals
            )
              .multipliedBy(
                convertUnits(
                  oracleData.price,
                  ORACLE_PRICE_PRECISION
                ).multipliedBy(oracleData.precision)
              )
              .multipliedBy(
                convertUnits(currentAsset.collateralFactor, STANDARD_PRECISION)
              );

            return acc.plus(price);
          }, new BigNumber(0))
      : new BigNumber(0);

    return commonCollateralOfOtherAssets.gte(userTotalBorrow);
  }, [assets, oraclePrices, type, userTotalBorrow, yToken]);

  if (
    type === CreditProcessModalEnum.WITHDRAW &&
    isMaxAmount &&
    !isEnoughOtherSupply &&
    yToken !== undefined &&
    isCollateral
  ) {
    warnings.push(
      "Due to the complexity of calculations, MAX Withdraw in case of use as collateral feature may produce an invalid result. In that case, set a slightly lower value."
    );
  }

  return warnings.length > 0 ? warnings : undefined;
};
