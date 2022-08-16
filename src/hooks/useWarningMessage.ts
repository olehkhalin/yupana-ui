import BigNumber from "bignumber.js";

import { AssetType } from "types/asset";
import { convertUnits } from "utils/helpers/amount";

import { CreditProcessModalEnum } from "./useCreditProcessModal";

export const useWarningMessage = ({
  type,
  dynamicBorrowLimitUsed,
  amount,
  asset,
  maxAmount,
}: {
  type: CreditProcessModalEnum | undefined;
  dynamicBorrowLimitUsed: BigNumber;
  asset: AssetType;
  amount: BigNumber;
  maxAmount: BigNumber;
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

  return warnings.length > 0 ? warnings : undefined;
};
